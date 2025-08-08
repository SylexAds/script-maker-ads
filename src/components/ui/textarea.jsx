import React from "react";
export function Textarea({ rows = 3, ...props }) { return <textarea rows={rows} {...props} className={`textarea ${props.className || ""}`} />; }
