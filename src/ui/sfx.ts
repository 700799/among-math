import { load } from '../data/progress';

// ---------------------------------------------------------------------------
// Tiny WebAudio synth — all sounds generated in code, zero audio assets.
// Every call respects the saved mute flag.
// ---------------------------------------------------------------------------

let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  try {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, dur: number, opts?: { type?: OscillatorType; delay?: number; gain?: number; slide?: number }) {
  if (load().muted) return;
  const a = ac();
  if (!a) return;
  const t0 = a.currentTime + (opts?.delay ?? 0);
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = opts?.type ?? 'sine';
  osc.frequency.setValueAtTime(freq, t0);
  if (opts?.slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + opts.slide), t0 + dur);
  const peak = opts?.gain ?? 0.12;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(a.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

export const sfx = {
  click() {
    tone(660, 0.06, { type: 'square', gain: 0.05 });
  },
  correct() {
    tone(523, 0.12, { type: 'triangle' });
    tone(784, 0.16, { type: 'triangle', delay: 0.09 });
  },
  wrong() {
    tone(196, 0.22, { type: 'sawtooth', gain: 0.07, slide: -60 });
  },
  coin() {
    tone(988, 0.07, { type: 'square', gain: 0.06 });
    tone(1319, 0.12, { type: 'square', gain: 0.06, delay: 0.06 });
  },
  taskDone() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.14, { type: 'triangle', delay: i * 0.09 }));
  },
  fanfare() {
    [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.18, { type: 'triangle', delay: i * 0.13, gain: 0.14 }));
  },
  alarm() {
    tone(440, 0.25, { type: 'sawtooth', gain: 0.07 });
    tone(330, 0.25, { type: 'sawtooth', gain: 0.07, delay: 0.3 });
    tone(440, 0.25, { type: 'sawtooth', gain: 0.07, delay: 0.6 });
  },
};
