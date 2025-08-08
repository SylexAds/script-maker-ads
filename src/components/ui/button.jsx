import React from "react";
export function Button({ children, variant = "primary", className = "", ...props }) {
  const map = { primary: "btn btn-primary", secondary: "btn btn-secondary", outline: "btn btn-outline", destructive: "btn btn-danger" };
  return <button className={`${map[variant] || map.primary} ${className}`} {...props}>{children}</button>;
}
