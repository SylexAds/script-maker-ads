import React from "react";
export function Label({ children, className = "" }) { return <label className={`label ${className}`}>{children}</label>; }
