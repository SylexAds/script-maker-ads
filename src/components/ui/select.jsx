import React from "react";
export function Select({ value, onValueChange, children }) {
  return <div className="select">{children({ value, onValueChange })}</div>;
}
export function SelectTrigger({ children, className = "" }) { return <div className={`input cursor-pointer ${className}`}>{children}</div>; }
export function SelectValue({ value }) { return <span>{value || "Sélectionner..."}</span>; }
export function SelectContent({ children }) { return <div className="mt-2 space-y-2">{children}</div>; }
export function SelectItem({ value, children, onSelect }) {
  return <button className="w-full text-left px-3 py-2 border rounded-lg hover:bg-neutral-50" onClick={() => onSelect?.(value)}>{children}</button>;
}
