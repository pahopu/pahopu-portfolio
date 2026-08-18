"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export const DynamicFavicon = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const href = resolvedTheme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg";
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon'][data-dynamic]");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      link.setAttribute("data-dynamic", "true");
      document.head.appendChild(link);
    }
    link.href = href;
  }, [resolvedTheme]);

  return null;
};
