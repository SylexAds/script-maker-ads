import React from "react";
export function Switch({ checked, onCheckedChange }) {
  return (
    <label className="switch cursor-pointer select-none">
      <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange?.(e.target.checked)} className="mr-2" />
      <span>{checked ? "On" : "Off"}</span>
    </label>
  );
}
