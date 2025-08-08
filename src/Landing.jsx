import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2, FileText, Download, Rocket, CheckCircle2, MousePointerClick, BarChart3, Copy, Github, Star, ArrowRight } from "lucide-react";

const features = [
  { icon: <Wand2 className="w-5 h-5" />, title: "Hooks percutants", desc: "Génère des accroches optimisées pour Meta / TikTok / YouTube en 3 secondes." },
  { icon: <FileText className="w-5 h-5" />, title: "Structures prêtes à tourner", desc: "UGC, Facecam, Atelier : plans, ordre, et messages déjà pensés." },
  { icon: <Copy className="w-5 h-5" />, title: "Copie en un clic", desc: "Copie le hook, la structure, ou tout le script d'un bouton." },
  { icon: <Download className="w-5 h-5" />, title: "Export .txt/CSV", desc: "Exporte tes variantes pour les partager avec l'équipe ou un monteur." },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Sector presets", desc: "Restaurants, Bijoux, Avocats… des templates orientés conversion." },
  { icon: <MousePointerClick className="w-5 h-5" />, title: "CTA intelligents", desc: "CTA adaptés au contexte avec bénéfice clair et urgence maîtrisée." },
];

const steps = [
  { num: 1, title: "Décris ton offre", desc: "Produit, persona, douleurs, preuve sociale. 20 secondes max." },
  { num: 2, title: "Génère 5 variantes", desc: "Hooks + structure + shotlist prêts à filmer." },
  { num: 3, title: "Export & tourne", desc: "Copie/Export .txt (CSV à venir) et passe en tournage." },
];

const faqs = [
  { q: "C'est gratuit ?", a: "Oui. L'outil est open-source et déployable gratuitement sur Vercel." },
  { q: "Je peux l'utiliser pour TikTok ?", a: "Oui, la structure est pensée pour formats courts (9:16) et scroll stoppers." },
  { q: "Je peux ajouter mes propres presets ?", a: "Oui, ajoute-les dans le code (ou bientôt via UI)." },
  { q: "Ça gère les langues ?", a: "Français/Anglais intégrés. D'autres langues sont simples à ajouter." },
  { q: "Besoin d'un back-end ?", a: "Non. C'est une app front 100% client-side. Zéro base de données nécessaire." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50 text-neutral-900">
      <Nav />
      <Hero />
      <Logos />
      <FeatureGrid />
      <HowItWorks />
      <Promo />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Script Maker Ads</span>
          <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 border">v1</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="#features" className="text-sm hover:underline">Fonctionnalités</a>
          <a href="#how" className="text-sm hover:underline">Comment ça marche</a>
          <a href="#faq" className="text-sm hover:underline">FAQ</a>
          <a href="/app" className="text-sm hover:underline">Essayer</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Générez des <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500">scripts vidéo</span> qui convertissent.
          </h1>
          <p className="mt-4 text-lg text-neutral-700 max-w-xl">
            Hooks percutants, structures prêtes à tourner, shotlists claires. Spécialement conçu pour Meta, TikTok et YouTube Shorts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/app" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white shadow-sm">
              <Rocket className="w-4 h-4" /> Essayer maintenant
            </a>
            <a href="#features" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border">
              <ArrowRight className="w-4 h-4" /> Voir les fonctionnalités
            </a>
          </div>
          <ul className="mt-6 text-sm text-neutral-600 grid sm:grid-cols-2 gap-2">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Gratuit & open-source</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Aucune inscription</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 100% front-end</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Prêt pour la prod</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border shadow-md p-4">
          <div className="rounded-xl border bg-neutral-50 p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm"><Sparkles className="w-4 h-4" /> Script Maker — Aperçu</div>
              <div className="text-xs text-neutral-500">v1</div>
            </div>
            <div className="grid gap-2 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded-lg bg-white border"><div className="text-[11px] text-neutral-500">Offre</div><div className="font-medium">Menu entrecôte 29€</div></div>
                <div className="p-2 rounded-lg bg-white border"><div className="text-[11px] text-neutral-500">Persona</div><div className="font-medium">Gourmets 25–45</div></div>
                <div className="p-2 rounded-lg bg-white border"><div className="text-[11px] text-neutral-500">Plateforme</div><div className="font-medium">Meta</div></div>
              </div>
              <div className="p-2 rounded-lg bg-white border"><div className="text-[11px] text-neutral-500">Hook généré</div><div className="font-medium">(Attends.) Comment transformer une entrecôte 29€ en soirées complètes…</div></div>
              <div className="p-2 rounded-lg bg-white border"><div className="text-[11px] text-neutral-500">Shotlist</div><div className="font-medium">Plan 1 close-up — Plan 2 preuve — Plan 3 démo — CTA</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Logos() { return (
  <section className="py-8">
    <div className="max-w-6xl mx-auto px-4 opacity-80">
      <p className="text-sm text-neutral-500 mb-4">Pensé pour des workflows performance :</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 [&>div]:rounded-xl [&>div]:border [&>div]:bg-white [&>div]:py-3 [&>div]:text-center [&>div]:text-xs">
        <div>Meta Ads</div><div>TikTok Ads</div><div>YouTube Shorts</div><div>Vercel</div><div>Vite</div><div>Tailwind</div>
      </div>
    </div>
  </section>
); }

function FeatureGrid() { return (
  <section id="features" className="py-16 border-t bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold">Fonctionnalités</h2>
      <p className="text-neutral-600 mt-2 max-w-2xl">Tout ce qu'il faut pour écrire vite, bien, et filmer sans se perdre.</p>
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {features.map((f, i) => (
          <div key={i} className="p-4 rounded-2xl border bg-neutral-50">
            <div className="flex items-center gap-2 text-sm font-semibold"><span className="inline-flex p-2 rounded-xl bg-white border">{f.icon}</span>{f.title}</div>
            <p className="text-sm text-neutral-600 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
); }

function HowItWorks() { return (
  <section id="how" className="py-16">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-[1fr_1.2fr] gap-10 items-center">
      <div>
        <h2 className="text-3xl font-bold">Comment ça marche</h2>
        <p className="text-neutral-600 mt-2 max-w-xl">De l'idée au script prêt à tourner, en moins d'une minute.</p>
        <ol className="mt-6 space-y-4">
          {steps.map((s) => (
            <li key={s.num} className="flex gap-4">
              <div className="mt-1 w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-semibold">{s.num}</div>
              <div><div className="font-semibold">{s.title}</div><div className="text-sm text-neutral-600">{s.desc}</div></div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex gap-3">
          <a href="/app" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white shadow-sm"><Rocket className="w-4 h-4" /> Ouvrir l'app</a>
          <a href="#faq" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border">En savoir plus</a>
        </div>
      </div>
      <div className="p-4 rounded-2xl border bg-white shadow-sm">
        <pre className="text-sm whitespace-pre-wrap leading-6 bg-neutral-50 border rounded-xl p-4">{`// Exemple de hook généré
(Attends.) Comment transformer une entrecôte 29€ en résultats concrets.
Si tu veux des réservations cette semaine, voici comment on fait.

// Shotlist rapide
- Plan 1: Pattern break / close-up produit
- Plan 2: Cut preuve (avis/avant-après)
- Plan 3: Démo bénéfice concret
- Plan 4: Logo + CTA à l'écran`}</pre>
      </div>
    </div>
  </section>
); }

function Promo() { return (
  <section className="py-16 bg-neutral-50 border-t">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-semibold">Déployez en 60 secondes</h3>
        <p className="text-neutral-600 mt-2">Hébergez gratuitement sur Vercel. Chaque modification de code déploie automatiquement une nouvelle version.</p>
        <ul className="text-sm text-neutral-700 mt-4 space-y-2">
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Déploiement auto depuis GitHub</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Preview URLs pour valider avant prod</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Aucun serveur à gérer</li>
        </ul>
      </div>
      <div className="p-4 rounded-2xl border bg-white shadow-sm">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-neutral-50 border"><div className="text-neutral-500 text-xs">Preset</div><div className="font-semibold">Restaurant</div></div>
          <div className="p-3 rounded-xl bg-neutral-50 border"><div className="text-neutral-500 text-xs">Langue</div><div className="font-semibold">FR/EN</div></div>
          <div className="p-3 rounded-xl bg-neutral-50 border"><div className="text-neutral-500 text-xs">Durée</div><div className="font-semibold">15–60s</div></div>
          <div className="p-3 rounded-xl bg-neutral-50 border"><div className="text-neutral-500 text-xs">Export</div><div className="font-semibold">.txt / CSV*</div></div>
        </div>
        <div className="text-xs text-neutral-500 mt-2">* CSV arrive très bientôt.</div>
      </div>
    </div>
  </section>
); }

function Testimonials() { return (
  <section className="py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-end justify-between gap-4">
        <div><h3 className="text-2xl font-semibold">Ils l'utilisent au quotidien</h3><p className="text-neutral-600">Créatifs, media buyers, fondateurs…</p></div>
        <div className="text-xs text-neutral-500">Avis fictifs pour démo</div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {[1,2,3].map((i) => (
          <div key={i} className="p-4 rounded-2xl border bg-white">
            <div className="flex items-center gap-2 text-amber-500">{Array.from({ length: 5 }).map((_, idx) => <Star key={idx} className="w-4 h-4" />)}</div>
            <p className="mt-3 text-sm text-neutral-700">« Je gagne 30 minutes par script, et les hooks arrêtent vraiment le scroll. »</p>
            <div className="mt-3 text-sm font-semibold">Responsable Acquisition — Paris</div>
          </div>
        ))}
      </div>
    </div>
  </section>
); }

function FAQ() { return (
  <section id="faq" className="py-16 border-t bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <h3 className="text-2xl font-semibold">FAQ</h3>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {faqs.map((f, i) => (
          <div key={i} className="p-4 rounded-2xl border bg-neutral-50">
            <div className="font-semibold">{f.q}</div>
            <div className="text-sm text-neutral-600 mt-1">{f.a}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
); }

function CTA() { return (
  <section id="try" className="py-16">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h3 className="text-3xl font-bold">Prêt à écrire des scripts qui convertissent ?</h3>
      <p className="text-neutral-600 mt-2">Ouvre l'app et génère tes 5 premières variantes en moins d'une minute.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <a href="/app" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-black text-white shadow"><Rocket className="w-5 h-5" /> Ouvrir l'app</a>
        <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border"><Github className="w-5 h-5" /> Voir le code</a>
      </div>
      <div className="text-xs text-neutral-500 mt-3">Déploiement gratuit sur Vercel, aucune carte bancaire requise.</div>
    </div>
  </section>
); }

function Footer() { return (
  <footer className="border-t py-8">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
      <div className="flex items-center gap-2 text-neutral-800"><Sparkles className="w-4 h-4" /> Script Maker Ads</div>
      <div className="flex items-center gap-4">
        <a href="#features" className="hover:underline">Fonctionnalités</a>
        <a href="#how" className="hover:underline">Guide</a>
        <a href="#faq" className="hover:underline">FAQ</a>
      </div>
      <div>© {new Date().getFullYear()} Script Maker Ads</div>
    </div>
  </footer>
); }
