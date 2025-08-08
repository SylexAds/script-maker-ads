import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Copy, RefreshCw, Sparkles, Trash2 } from "lucide-react";
import { Button } from "./components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card.jsx";
import { Input } from "./components/ui/input.jsx";
import { Textarea } from "./components/ui/textarea.jsx";
import { Label } from "./components/ui/label.jsx";
import { Switch } from "./components/ui/switch.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select.jsx";

const nl = (s) => s.trim().replace(/[ \t]+/g, " ");
const clip = async (text) => { try { await navigator.clipboard.writeText(text); return true; } catch { return false; } };

const PRESETS = {
  restaurant: { name: "Restaurant Gastronomique", offer: "Menu unique entrecôte frites, servi en deux fois, 29€", persona: "Parisiens 25-45 ans, gourmets, cherchent une expérience haut de gamme accessible", pains: "Peu de temps, peur d'être déçus, veulent un spot fiable pour une occasion sans prise de tête", tone: "Direct, chic, appétissant, zéro blabla", cta: "Réserve ta table en 10s" },
  jewelry: { name: "Bijoux artisanaux", offer: "Bague en argent forgée à partir d'une pièce ancienne française", persona: "Amateurs d'objets symboliques, 28-55 ans, sensibles au savoir-faire et à l'histoire", pains: "Marre du bijou générique, veulent de la signification et de la qualité durable", tone: "Élégant, incarné, chargé de sens", cta: "Découvre la collection et commande en ligne" },
  law: { name: "Cabinet d'avocat", offer: "Formation Google Ads pour avocats + accompagnement à l'acquisition de dossiers", persona: "Avocats TPE/PME, débordés, veulent des dossiers qualifiés sans y passer des heures", pains: "CPL trop cher, dossiers peu qualifiés, manque de visibilité locale", tone: "Factuel, autorité calme, orienté résultats", cta: "Réserve un diagnostic gratuit de 20 minutes" },
};

const HOOK_TEMPLATES = [
  ({ bigClaim, pain, proof, patternBreak }) => `(${patternBreak}) ${bigClaim}. ${pain ? "Si " + pain + "," : ""} voici comment on fait, concrètement.`,
  ({ bigClaim, pain, proof }) => `${bigClaim} — ${proof}. ${pain ? "Stop à " + pain + "." : ""}`,
  ({ bigClaim, persona, platform }) => `${persona ? persona + "," : ""} arrête de scroller. ${bigClaim} (${platform}).`,
  ({ bigClaim }) => `Avant / Après: ${bigClaim}. Tu veux le script exact ?`,
  ({ bigClaim, urgency }) => `${bigClaim}. ${urgency} — détails dans 20 secondes.`,
];

const STRUCTURES = {
  UGC: ["Hook visuel (3s) + promesse","Preuve rapide (résultat, avis, image atelier)","Story courte: problème → déclic → solution","Zoom produit (bénéfice concret, 1-2 features max)","CTA personnalisé (action + bénéfice court)"],
  Facecam: ["Accroche frontale + pattern break","Pourquoi c'est différent en 1 phrase","Démonstration / preuve","Bénéfice clé reformulé","CTA clair + urgence douce"],
  Atelier: ["Plan fabrication (ASMR light)","Phrase signature de la marque","Histoire en 1 phrase (origine, symbolique)","Preuve sociale (avis/ou media)","CTA discret et élégant"],
};

const CTAS = { default: ["Réserve maintenant — 10 secondes suffisent","Découvre la collection et commande en ligne","Prends ton diagnostic gratuit (places limitées)","Clique pour voir les modèles disponibles aujourd'hui","Dispo cette semaine — je réserve ma table"] };

function generateHooks({ offer, persona, pains, proof, platform, tone, duration, language }) {
  const bigClaim = language === "en" ? `How we turn ${offer.toLowerCase()} into results` : `Comment transformer ${offer.toLowerCase()} en résultats concrets`;
  const urgency = language === "en" ? "Only this week" : "Seulement cette semaine";
  const patternBreak = language === "en" ? "Wait." : "Attends.";
  const pain = pains?.split(/[.;\n]/)[0]?.trim();
  return HOOK_TEMPLATES.map((tpl) => tpl({ bigClaim, pain, proof: proof || (language === "en" ? "Real clients, real metrics" : "Vrais clients, vraies métriques"), persona: persona?.split(/[,\n]/)[0], platform, urgency, patternBreak }));
}

function buildScript({ style, offer, persona, pains, tone, platform, duration, language, cta, proof, includeShotlist }) {
  const hooks = generateHooks({ offer, persona, pains, proof, platform, tone, duration, language });
  const structure = STRUCTURES[style] || STRUCTURES.UGC;
  const chosenCTA = cta || CTAS.default[0];
  const lines = [];
  lines.push(`# Hook (0-${Math.min(3, Math.max(2, Math.round(duration/5))) }s)\n${hooks[0]}`);
  structure.forEach((step) => { lines.push(`\n# ${step}\n- ${nl(tone)}\n- ${nl(proof || "" )}`); });
  lines.push(`\n# CTA\n${chosenCTA}`);
  if (includeShotlist) { lines.push(`\n# Shotlist rapide\n- Plan 1: Pattern break / close-up produit\n- Plan 2: Cut preuve (avis/avant-après)\n- Plan 3: Démo bénéfice concret\n- Plan 4: Logo + CTA à l'écran`); }
  return lines.join("\n");
}

function generateVariants(payload, count = 4) {
  const variants = []; const styles = Object.keys(STRUCTURES);
  for (let i = 0; i < count; i++) { const style = styles[i % styles.length]; variants.push({ id: `${Date.now()}-${i}`, title: `${style} — Variante ${i + 1}`, content: buildScript({ ...payload, style }) }); }
  return variants;
}

export default function App() {
  const [presetKey, setPresetKey] = useState("restaurant");
  const [form, setForm] = useState({ offer: PRESETS.restaurant.offer, persona: PRESETS.restaurant.persona, pains: PRESETS.restaurant.pains, tone: PRESETS.restaurant.tone, platform: "Meta", duration: 30, language: "fr", cta: PRESETS.restaurant.cta, proof: "+1200 réservations générées en 90 jours", includeShotlist: true });
  const [variants, setVariants] = useState([]);

  useEffect(() => { const saved = localStorage.getItem("scriptmaker.state"); if (saved) { try { const p = JSON.parse(saved); setForm(p.form || form); setVariants(p.variants || []); } catch {} } }, []);
  useEffect(() => { localStorage.setItem("scriptmaker.state", JSON.stringify({ form, variants })); }, [form, variants]);

  const onPreset = (key) => { const p = PRESETS[key]; setPresetKey(key); setForm((f) => ({ ...f, offer: p.offer, persona: p.persona, pains: p.pains, tone: p.tone, cta: p.cta })); };
  const payload = useMemo(() => form, [form]);
  const onGenerate = () => { const v = generateVariants(payload, 5); setVariants(v); };
  const exportAll = () => {
    const header = `Script Maker Ads — export (${new Date().toLocaleString()})`;
    const body = variants.map((v) => `\n====================\n${v.title}\n====================\n\n${v.content}\n`).join("\n");
    const fname = `scripts_${Date.now()}.txt`;
    const blob = new Blob([header + "\n" + body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = fname; a.click(); URL.revokeObjectURL(url);
  };
  const clearAll = () => setVariants([]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3"><Sparkles className="w-6 h-6" /><h1 className="text-2xl font-semibold">Script Maker Ads</h1><span className="text-xs px-2 py-1 rounded-full bg-neutral-100 border">v1</span></div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={exportAll} disabled={!variants.length}>Export .txt</Button>
            <Button variant="destructive" onClick={clearAll} disabled={!variants.length}>Vider</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 grid md:grid-cols-[360px_1fr] gap-6">
        <Card className="self-start sticky top-20">
          <CardHeader><CardTitle>Paramètres</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Preset secteur</Label>
              <Select value={presetKey} onValueChange={(v) => onPreset(v)}>{({ value, onValueChange }) => (
                <div>
                  <SelectTrigger className="mt-1"><SelectValue value={presetKey} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant" onSelect={(v) => onValueChange(v)}>Restaurant</SelectItem>
                    <SelectItem value="jewelry" onSelect={(v) => onValueChange(v)}>Bijoux artisanaux</SelectItem>
                    <SelectItem value="law" onSelect={(v) => onValueChange(v)}>Avocats</SelectItem>
                  </SelectContent>
                </div>
              )}</Select>
            </div>

            <div><Label>Offre / Produit</Label><Input value={form.offer} onChange={(e) => setForm({ ...form, offer: e.target.value })} /></div>
            <div><Label>Persona (résumé)</Label><Textarea rows={2} value={form.persona} onChange={(e) => setForm({ ...form, persona: e.target.value })} /></div>
            <div><Label>Douleurs / freins</Label><Textarea rows={2} value={form.pains} onChange={(e) => setForm({ ...form, pains: e.target.value })} /></div>
            <div><Label>Ton</Label><Input value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })} /></div>

            <div className="grid grid-cols-2 gap-3">
              <div><Label>Plateforme</Label>
                <Select value={form.platform} onValueChange={(v) => setForm({ ...form, platform: v })}>{({ onValueChange }) => (
                  <div>
                    <SelectTrigger className="mt-1"><SelectValue value={form.platform} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Meta" onSelect={(v) => onValueChange(v)}>Meta</SelectItem>
                      <SelectItem value="TikTok" onSelect={(v) => onValueChange(v)}>TikTok</SelectItem>
                      <SelectItem value="YouTube" onSelect={(v) => onValueChange(v)}>YouTube</SelectItem>
                    </SelectContent>
                  </div>
                )}</Select>
              </div>
              <div><Label>Durée (s)</Label><Input type="number" min={10} max={90} value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })} /></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div><Label>Langue</Label>
                <Select value={form.language} onValueChange={(v) => setForm({ ...form, language: v })}>{({ onValueChange }) => (
                  <div>
                    <SelectTrigger className="mt-1"><SelectValue value={form.language} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr" onSelect={(v) => onValueChange(v)}>Français</SelectItem>
                      <SelectItem value="en" onSelect={(v) => onValueChange(v)}>English</SelectItem>
                    </SelectContent>
                  </div>
                )}</Select>
              </div>
              <div><Label>CTA (optionnel)</Label><Input value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} placeholder="Sinon auto" /></div>
            </div>

            <div><Label>Preuve / Social proof</Label><Input value={form.proof} onChange={(e) => setForm({ ...form, proof: e.target.value })} /></div>

            <div className="flex items-center justify-between border rounded-lg p-3">
              <div><Label>Inclure une shotlist</Label><p className="text-xs text-neutral-500">Liste des plans pour tourner rapidement</p></div>
              <Switch checked={form.includeShotlist} onCheckedChange={(v) => setForm({ ...form, includeShotlist: v })} />
            </div>

            <div className="flex gap-2"><Button className="w-full" onClick={onGenerate}>Générer 5 variantes</Button></div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {variants.length === 0 ? (<EmptyState onGenerate={onGenerate} />) : (
            <div className="grid md:grid-cols-2 gap-4">
              {variants.map((v) => (
                <motion.div key={v.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-2"><CardTitle className="text-base">{v.title}</CardTitle></CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <pre className="text-sm whitespace-pre-wrap leading-6 bg-neutral-50 border rounded p-3 max-h-80 overflow-auto">{v.content}</pre>
                      <div className="flex gap-2 mt-3">
                        <Button variant="secondary" onClick={() => clip(v.content)}>Copier</Button>
                        <Button onClick={() => { const fname = v.title.replace(/[^a-z0-9-_]/gi, "_") + ".txt"; const blob = new Blob([v.content], { type: "text/plain;charset=utf-8" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = fname; a.click(); URL.revokeObjectURL(url); }}>Exporter</Button>
                        <Button variant="outline" onClick={() => { const one = generateVariants(payload, 1)[0]; setVariants((prev) => prev.map((x) => x.id === v.id ? { ...x, content: one.content } : x)); }}>Regénérer</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 pb-10 pt-6 text-sm text-neutral-500 flex items-center justify-between">
        <span>Conseil: commence par 3 plans, 1 bénéfice, 1 CTA. Pas plus.</span>
        <span>© {new Date().getFullYear()} Script Maker Ads</span>
      </footer>
    </div>
  );
}

function EmptyState({ onGenerate }) {
  return (
    <div className="card border-dashed">
      <div className="card-content py-12 text-center space-y-4">
        <h2 className="text-xl font-semibold">Génère tes 5 premières variantes</h2>
        <p className="text-neutral-600 max-w-xl mx-auto">Entres ton offre, ton persona et ta preuve. Je crée des hooks, une structure claire et une shotlist pour tourner vite. Idéal Meta/TikTok/YouTube Shorts.</p>
        <Button onClick={onGenerate} className="mt-2">Générer maintenant</Button>
      </div>
    </div>
  );
}
