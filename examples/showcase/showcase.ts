/**
 * Showcase behavior: renders the wordmark through the real design package
 * and paints token swatches from the actual custom-property values,
 * proving the CSS API (not a copy) drives the reference.
 */
import { renderWordmark } from "@starintel/design/wordmark";
import "@starintel/design/css/tokens.css";
import "@starintel/design/css/base.css";
import "@starintel/design/css/layout.css";
import "@starintel/design/css/components.css";
import "@starintel/design/css/motion.css";

const brand = document.querySelector<HTMLElement>("[data-wordmark]");
if (brand) brand.replaceChildren(renderWordmark({ size: "sm", compact: true }));
const hero = document.querySelector<HTMLElement>("[data-wordmark-lg]");
if (hero) hero.replaceChildren(renderWordmark({ size: "lg" }));
const foot = document.querySelector<HTMLElement>("[data-wordmark-sm]");
if (foot) foot.replaceChildren(renderWordmark({ size: "sm", compact: true }));

// Active nav state
const path = location.hash || "#tokens";
for (const a of document.querySelectorAll<HTMLAnchorElement>(".si-topbar__nav a")) {
  if (a.getAttribute("href") === path) a.setAttribute("aria-current", "page");
}

interface Swatch {
  token: string;
  label: string;
}

const groups: { title: string; swatches: Swatch[] }[] = [
  {
    title: "background",
    swatches: [
      { token: "--si-bg-canvas", label: "canvas" },
      { token: "--si-bg-surface", label: "surface" },
      { token: "--si-bg-raised", label: "raised" },
      { token: "--si-bg-highlight", label: "highlight" },
    ],
  },
  {
    title: "text",
    swatches: [
      { token: "--si-text-bright", label: "bright" },
      { token: "--si-text-primary", label: "primary" },
      { token: "--si-text-secondary", label: "secondary" },
      { token: "--si-text-muted", label: "muted" },
    ],
  },
  {
    title: "accent",
    swatches: [
      { token: "--si-accent-primary", label: "gold" },
      { token: "--si-accent-strong", label: "gold strong" },
      { token: "--si-accent-dim", label: "gold dim" },
      { token: "--si-accent-secondary", label: "telemetry" },
    ],
  },
  {
    title: "status",
    swatches: [
      { token: "--si-status-success", label: "success" },
      { token: "--si-status-warning", label: "warning" },
      { token: "--si-status-danger", label: "danger" },
      { token: "--si-status-info", label: "info" },
    ],
  },
];

const rootStyle = getComputedStyle(document.documentElement);
const wrap = document.getElementById("swatches");
if (wrap) {
  for (const g of groups) {
    const col = document.createElement("div");
    col.className = "si-panel";
    const head = document.createElement("p");
    head.className = "si-metric__label";
    head.textContent = g.title;
    col.append(head);
    for (const s of g.swatches) {
      const row = document.createElement("div");
      row.style.cssText = "display:flex;align-items:center;gap:0.6rem;margin:0.3rem 0";
      const sw = document.createElement("span");
      const value = rootStyle.getPropertyValue(s.token).trim();
      sw.style.cssText = `width:1.4rem;height:1.4rem;border-radius:3px;border:1px solid var(--si-border-strong);background:var(${s.token});flex:none`;
      const name = document.createElement("span");
      name.className = "mono";
      name.style.fontSize = "0.72rem";
      name.textContent = s.label;
      const val = document.createElement("span");
      val.className = "mono faint";
      val.style.fontSize = "0.68rem";
      val.textContent = value;
      row.append(sw, name, val);
      col.append(row);
    }
    wrap.append(col);
  }
}

const scale = document.getElementById("spacing-scale");
if (scale) {
  for (const name of ["--si-space-1", "--si-space-2", "--si-space-3", "--si-space-4", "--si-space-5", "--si-space-6", "--si-space-7", "--si-space-8"]) {
    const bar = document.createElement("div");
    bar.style.cssText = `width:calc(var(${name}) * 4);height:1.4rem;background:var(--si-accent-dim);border-radius:2px;position:relative`;
    bar.title = name;
    const label = document.createElement("span");
    label.className = "mono faint";
    label.style.cssText = "position:absolute;top:-1.35rem;left:0;font-size:0.6rem";
    label.textContent = name.replace("--si-space-", "");
    bar.append(label);
    scale.append(bar);
  }
}
