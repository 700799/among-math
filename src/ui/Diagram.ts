import Phaser from 'phaser';
import { Theme } from '../theme';
import type { DiagramSpec } from '../math/types';

// Draws a declarative DiagramSpec into a container using Phaser Graphics.
// Returns a container centered roughly on (cx, cy). No image assets needed.
export function drawDiagram(scene: Phaser.Scene, spec: DiagramSpec, cx: number, cy: number): Phaser.GameObjects.Container {
  const c = scene.add.container(cx, cy);
  const g = scene.add.graphics();
  c.add(g);

  switch (spec.kind) {
    case 'coordinate': {
      const size = 150;
      const max = spec.max ?? 6;
      const step = size / max;
      g.fillStyle(0x0a0f24, 1).fillRect(-size / 2, -size / 2, size, size);
      g.lineStyle(1, Theme.wall, 0.7);
      for (let i = 0; i <= max; i++) {
        g.lineBetween(-size / 2 + i * step, -size / 2, -size / 2 + i * step, size / 2);
        g.lineBetween(-size / 2, -size / 2 + i * step, size / 2, -size / 2 + i * step);
      }
      // axes
      g.lineStyle(2, Theme.textDim, 1);
      g.lineBetween(-size / 2, size / 2, size / 2, size / 2); // x
      g.lineBetween(-size / 2, -size / 2, -size / 2, size / 2); // y
      const toX = (x: number) => -size / 2 + x * step;
      const toY = (y: number) => size / 2 - y * step;
      for (const p of spec.points) {
        const px = toX(p.x);
        const py = toY(p.y);
        const dot = scene.add.circle(px, py, 5, Theme.accent);
        c.add(dot);
        if (p.label) {
          const t = scene.add.text(px + 6, py - 16, p.label, { fontSize: '13px', color: Theme.css.warn });
          c.add(t);
        }
      }
      break;
    }
    case 'prism': {
      // simple isometric-ish box with labels
      const u = 8;
      const w = spec.w * u, h = spec.h * u, l = spec.l * u;
      const dx = l * 0.5, dy = l * 0.3;
      g.lineStyle(2, Theme.accent, 1);
      g.fillStyle(Theme.bgPanelLight, 1);
      // front face
      g.fillRect(-w / 2, -h / 2, w, h);
      g.strokeRect(-w / 2, -h / 2, w, h);
      // top
      g.beginPath();
      g.moveTo(-w / 2, -h / 2);
      g.lineTo(-w / 2 + dx, -h / 2 - dy);
      g.lineTo(w / 2 + dx, -h / 2 - dy);
      g.lineTo(w / 2, -h / 2);
      g.closePath(); g.strokePath();
      // side
      g.beginPath();
      g.moveTo(w / 2, -h / 2);
      g.lineTo(w / 2 + dx, -h / 2 - dy);
      g.lineTo(w / 2 + dx, h / 2 - dy);
      g.lineTo(w / 2, h / 2);
      g.closePath(); g.strokePath();
      const lab = (s: string, x: number, y: number) =>
        c.add(scene.add.text(x, y, s, { fontSize: '12px', color: Theme.css.text }).setOrigin(0.5));
      lab(`w=${spec.w}`, 0, h / 2 + 12);
      lab(`h=${spec.h}`, -w / 2 - 16, 0);
      lab(`l=${spec.l}`, w / 2 + dx / 2 + 4, -h / 2 - dy - 10);
      break;
    }
    case 'fractionBar': {
      const drawBar = (parts: number, shaded: number, oy: number) => {
        const bw = 160, bh = 26;
        const pw = bw / parts;
        for (let i = 0; i < parts; i++) {
          g.fillStyle(i < shaded ? Theme.accent : Theme.bgPanelLight, 1);
          g.fillRect(-bw / 2 + i * pw, oy, pw - 2, bh);
          g.lineStyle(1, Theme.bg, 1);
          g.strokeRect(-bw / 2 + i * pw, oy, pw - 2, bh);
        }
        c.add(scene.add.text(bw / 2 + 8, oy + bh / 2, `${shaded}/${parts}`, { fontSize: '14px', color: Theme.css.text }).setOrigin(0, 0.5));
      };
      if (spec.second) {
        drawBar(spec.parts, spec.shaded, -32);
        drawBar(spec.second.parts, spec.second.shaded, 6);
      } else {
        drawBar(spec.parts, spec.shaded, -13);
      }
      break;
    }
    case 'numberLine': {
      const w = 220;
      const range = spec.max - spec.min;
      g.lineStyle(2, Theme.textDim, 1);
      g.lineBetween(-w / 2, 0, w / 2, 0);
      for (let i = 0; i <= spec.ticks; i++) {
        const x = -w / 2 + (w / spec.ticks) * i;
        g.lineBetween(x, -6, x, 6);
        const val = spec.min + (range / spec.ticks) * i;
        if (i % Math.ceil(spec.ticks / 6) === 0) {
          c.add(scene.add.text(x, 12, String(+val.toFixed(2)), { fontSize: '11px', color: Theme.css.textDim }).setOrigin(0.5, 0));
        }
      }
      if (spec.mark !== undefined) {
        const mx = -w / 2 + (w * (spec.mark - spec.min)) / range;
        c.add(scene.add.circle(mx, 0, 6, Theme.warn));
      }
      break;
    }
    case 'shape': {
      g.lineStyle(3, Theme.accent, 1).fillStyle(Theme.bgPanelLight, 1);
      const s = 60;
      switch (spec.shape) {
        case 'square': g.fillRect(-s / 2, -s / 2, s, s); g.strokeRect(-s / 2, -s / 2, s, s); break;
        case 'rectangle': g.fillRect(-s, -s / 2, s * 2, s); g.strokeRect(-s, -s / 2, s * 2, s); break;
        case 'rhombus': case 'parallelogram': {
          const pts = spec.shape === 'rhombus'
            ? [[0, -s / 2], [s / 2, 0], [0, s / 2], [-s / 2, 0]]
            : [[-s, -s / 2], [s * 0.6, -s / 2], [s, s / 2], [-s * 0.6, s / 2]];
          drawPoly(g, pts); break;
        }
        case 'trapezoid': drawPoly(g, [[-s, s / 2], [s, s / 2], [s * 0.5, -s / 2], [-s * 0.5, -s / 2]]); break;
        case 'triangle': drawPoly(g, [[0, -s / 2], [s / 2, s / 2], [-s / 2, s / 2]]); break;
      }
      break;
    }
    case 'barModel': {
      const bw = 200, bh = 24, pw = bw / spec.segments;
      for (let i = 0; i < spec.segments; i++) {
        g.fillStyle(i < spec.labeled ? Theme.good : Theme.bgPanelLight, 1);
        g.fillRect(-bw / 2 + i * pw, -bh / 2, pw - 2, bh);
        g.lineStyle(1, Theme.bg, 1);
        g.strokeRect(-bw / 2 + i * pw, -bh / 2, pw - 2, bh);
      }
      break;
    }
  }
  return c;
}

function drawPoly(g: Phaser.GameObjects.Graphics, pts: number[][]) {
  g.beginPath();
  g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
  g.closePath();
  g.fillPath();
  g.strokePath();
}
