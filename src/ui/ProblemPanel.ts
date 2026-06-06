import Phaser from 'phaser';
import { Theme } from '../theme';
import type { Problem } from '../math/types';
import { checkAnswer } from '../math/index';
import { drawDiagram } from './Diagram';

export interface ProblemPanelOpts {
  problem: Problem;
  width: number;
  onAnswered: (correct: boolean) => void;
  compact?: boolean; // timed sabotage mode: auto-advance, minimal chrome
}

// Renders one problem with the right input UI and reports correctness.
export class ProblemPanel {
  container: Phaser.GameObjects.Container;
  private scene: Phaser.Scene;
  private problem: Problem;
  private opts: ProblemPanelOpts;
  private entry = '';
  private entryText?: Phaser.GameObjects.Text;
  private feedback!: Phaser.GameObjects.Text;
  private hintsShown = 0;
  private hintText!: Phaser.GameObjects.Text;
  private answered = false;
  private keyHandler?: (e: KeyboardEvent) => void;
  private interactive: Phaser.GameObjects.GameObject[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number, opts: ProblemPanelOpts) {
    this.scene = scene;
    this.opts = opts;
    this.problem = opts.problem;
    this.container = scene.add.container(x, y);
    this.build();
  }

  private build() {
    const { width } = this.opts;
    const p = this.problem;

    // Prompt
    const prompt = this.scene.add
      .text(0, 0, p.prompt, {
        fontFamily: 'Trebuchet MS', fontSize: '20px', color: Theme.css.text,
        align: 'center', wordWrap: { width: width - 40 },
      })
      .setOrigin(0.5, 0);
    this.container.add(prompt);
    let cursorY = prompt.height + 14;

    // Diagram
    if (p.diagram) {
      const dia = drawDiagram(this.scene, p.diagram, 0, cursorY + 70);
      this.container.add(dia);
      cursorY += 160;
    }

    // Hint + feedback text holders
    this.hintText = this.scene.add
      .text(0, cursorY, '', { fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.warn, align: 'center', wordWrap: { width: width - 40 } })
      .setOrigin(0.5, 0);
    this.container.add(this.hintText);
    cursorY += 26;

    // Input area
    if (p.type === 'multiple-choice') {
      cursorY = this.buildChoices(cursorY);
    } else if (p.type === 'numeric') {
      cursorY = this.buildKeypad(cursorY);
    } else {
      cursorY = this.buildConstructed(cursorY);
    }

    // Feedback line
    this.feedback = this.scene.add
      .text(0, cursorY + 8, '', { fontFamily: 'Trebuchet MS', fontSize: '16px', color: Theme.css.good, align: 'center', wordWrap: { width: width - 30 } })
      .setOrigin(0.5, 0);
    this.container.add(this.feedback);

    // Hint button (only before answering, and only if hints exist)
    if (!this.opts.compact && p.hints.length) {
      const hint = this.smallButton(-width / 2 + 70, -18, '💡 Hint', Theme.warn, () => {
        if (this.answered) return;
        const h = p.hints[Math.min(this.hintsShown, p.hints.length - 1)];
        this.hintsShown++;
        this.hintText.setText(h);
      });
      this.container.add(hint);
    }
  }

  // ---- multiple choice ----
  private buildChoices(y: number): number {
    const choices = this.problem.choices ?? [];
    choices.forEach((choice, i) => {
      const by = y + i * 44;
      const btn = this.choiceButton(0, by, choice, () => this.submit(choice));
      this.container.add(btn);
    });
    return y + choices.length * 44;
  }

  // ---- numeric: on-screen keypad + physical keyboard ----
  private buildKeypad(y: number): number {
    const display = this.scene.add.rectangle(0, y + 4, 200, 38, 0x0a0f24).setStrokeStyle(2, Theme.accent);
    this.entryText = this.scene.add
      .text(0, y + 4, '_', { fontFamily: 'Trebuchet MS', fontSize: '22px', color: Theme.css.accent })
      .setOrigin(0.5);
    this.container.add(display);
    this.container.add(this.entryText);

    const keys = ['7', '8', '9', '/', '4', '5', '6', '-', '1', '2', '3', '.', '0', '⌫', '↵'];
    const cols = 4;
    const kw = 50, kh = 36, gap = 6;
    const startX = -((cols * (kw + gap)) - gap) / 2 + kw / 2;
    let ky = y + 32;
    keys.forEach((k, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const kx = startX + col * (kw + gap);
      const yy = ky + row * (kh + gap);
      const color = k === '↵' ? Theme.good : k === '⌫' ? Theme.bad : Theme.bgPanelLight;
      const btn = this.keyButton(kx, yy, kw, kh, k, color, () => this.onKey(k));
      this.container.add(btn);
    });

    // physical keyboard support
    this.keyHandler = (e: KeyboardEvent) => {
      if (this.answered) return;
      if (/^[0-9]$/.test(e.key)) this.onKey(e.key);
      else if (e.key === '/' || e.key === '.' || e.key === '-') this.onKey(e.key);
      else if (e.key === 'Backspace') this.onKey('⌫');
      else if (e.key === 'Enter') this.onKey('↵');
    };
    window.addEventListener('keydown', this.keyHandler);

    return ky + 4 * (kh + gap);
  }

  private onKey(k: string) {
    if (this.answered) return;
    if (k === '⌫') this.entry = this.entry.slice(0, -1);
    else if (k === '↵') { this.submit(this.entry); return; }
    else if (this.entry.length < 8) this.entry += k;
    this.entryText?.setText(this.entry || '_');
  }

  // ---- constructed response: think, reveal, self-check ----
  private buildConstructed(y: number): number {
    const note = this.scene.add
      .text(0, y, 'Think it through, then check your reasoning.', { fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim })
      .setOrigin(0.5, 0);
    this.container.add(note);

    let revealed = false;
    const model = this.scene.add
      .text(0, y + 26, '', { fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.text, align: 'center', wordWrap: { width: this.opts.width - 40 } })
      .setOrigin(0.5, 0);
    this.container.add(model);

    const reveal = this.smallButton(0, y + 24, '🔎 Reveal model answer', Theme.accent, () => {
      if (revealed) return;
      revealed = true;
      model.setText(this.problem.explanation);
      gotIt.setVisible(true);
      review.setVisible(true);
      reveal.setVisible(false);
    });
    this.container.add(reveal);

    const gotIt = this.smallButton(-90, y + 150, '✅ I explained it!', Theme.good, () => this.submit('__self_correct__', true))
      .setVisible(false);
    const review = this.smallButton(90, y + 150, '🔁 I will review', Theme.warn, () => this.submit('__self_review__', false))
      .setVisible(false);
    this.container.add(gotIt);
    this.container.add(review);

    return y + 190;
  }

  // ---- submission + feedback ----
  private submit(raw: string, forced?: boolean) {
    if (this.answered) return;
    this.answered = true;
    const correct = forced !== undefined ? forced : checkAnswer(this.problem, raw);

    if (this.opts.compact) {
      // timed mode: brief flash, then advance
      this.feedback.setText(correct ? '✅ Fixed!' : `❌ Ans: ${this.problem.answer}`).setColor(correct ? Theme.css.good : Theme.css.bad);
      this.scene.time.delayedCall(550, () => this.finish(correct));
      return;
    }

    this.feedback
      .setText(correct ? '✅ Correct! Nice work!' : `❌ Not quite. Here is how:`)
      .setColor(correct ? Theme.css.good : Theme.css.bad);

    // Show explanation, then a Next button.
    const exp = this.scene.add
      .text(0, this.feedback.y + 26, this.problem.explanation, {
        fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim, align: 'center', wordWrap: { width: this.opts.width - 30 },
      })
      .setOrigin(0.5, 0);
    this.container.add(exp);

    const next = this.smallButton(0, exp.y + exp.height + 22, 'Next  ▶', Theme.good, () => this.finish(correct));
    this.container.add(next);

    // disable further input
    this.interactive.forEach((o) => (o as any).disableInteractive?.());
  }

  private finish(correct: boolean) {
    this.cleanup();
    this.opts.onAnswered(correct);
  }

  cleanup() {
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    this.keyHandler = undefined;
  }

  destroy() {
    this.cleanup();
    this.container.destroy();
  }

  // ---- small UI builders ----
  private choiceButton(x: number, y: number, label: string, onClick: () => void): Phaser.GameObjects.Container {
    const w = this.opts.width - 80;
    const bg = this.scene.add.rectangle(0, 0, w, 38, Theme.bgPanelLight).setStrokeStyle(2, Theme.wall).setInteractive({ useHandCursor: true });
    const txt = this.scene.add.text(0, 0, label, { fontFamily: 'Trebuchet MS', fontSize: '17px', color: Theme.css.text }).setOrigin(0.5);
    bg.on('pointerover', () => bg.setFillStyle(Theme.accentDim));
    bg.on('pointerout', () => bg.setFillStyle(Theme.bgPanelLight));
    bg.on('pointerdown', onClick);
    this.interactive.push(bg);
    return this.scene.add.container(x, y, [bg, txt]);
  }

  private keyButton(x: number, y: number, w: number, h: number, label: string, color: number, onClick: () => void): Phaser.GameObjects.Container {
    const bg = this.scene.add.rectangle(0, 0, w, h, color).setStrokeStyle(1, Theme.wall).setInteractive({ useHandCursor: true });
    const txt = this.scene.add.text(0, 0, label, { fontFamily: 'Trebuchet MS', fontSize: '18px', color: '#eaf2ff' }).setOrigin(0.5);
    bg.on('pointerdown', onClick);
    bg.on('pointerover', () => bg.setAlpha(0.85));
    bg.on('pointerout', () => bg.setAlpha(1));
    this.interactive.push(bg);
    return this.scene.add.container(x, y, [bg, txt]);
  }

  private smallButton(x: number, y: number, label: string, color: number, onClick: () => void): Phaser.GameObjects.Container {
    const w = Math.max(120, label.length * 11 + 24);
    const bg = this.scene.add.rectangle(0, 0, w, 34, color).setStrokeStyle(1, Theme.text, 0.3).setInteractive({ useHandCursor: true });
    const txt = this.scene.add.text(0, 0, label, { fontFamily: 'Trebuchet MS', fontSize: '15px', color: '#06121f', fontStyle: 'bold' }).setOrigin(0.5);
    bg.on('pointerover', () => bg.setScale(1.05));
    bg.on('pointerout', () => bg.setScale(1));
    bg.on('pointerdown', onClick);
    this.interactive.push(bg);
    return this.scene.add.container(x, y, [bg, txt]);
  }
}
