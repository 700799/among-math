import Phaser from 'phaser';
import { Theme } from '../theme';
import type { Problem, Solution } from '../math/types';
import { checkAnswer } from '../math/index';
import { drawDiagram } from './Diagram';
import { sfx } from './sfx';

export type PanelMode = 'practice' | 'drill' | 'test';

export interface ProblemPanelOpts {
  problem: Problem;
  width: number;
  onAnswered: (correct: boolean) => void;
  // practice: hints + full multi-method solutions (default)
  // drill:    timed sabotage — brief flash w/ answer, auto-advance
  // test:     MAP simulation — no hints, brief ✅/❌ flash, NO answer reveal
  mode?: PanelMode;
}

// Local Y where the practice-mode "Next" / constructed-response buttons sit —
// safely inside the 540px task modal (panel sits 70px below the modal top).
const FOOTER_Y = 430;

// Renders one problem with the right input UI and reports correctness.
// In practice mode, answering clears the inputs and shows the full worked
// solutions with a "Way 1 | Way 2 | Way 3" method switcher.
export class ProblemPanel {
  container: Phaser.GameObjects.Container;
  private scene: Phaser.Scene;
  private problem: Problem;
  private opts: ProblemPanelOpts;
  private mode: PanelMode;
  private entry = '';
  private entryText?: Phaser.GameObjects.Text;
  private feedback!: Phaser.GameObjects.Text;
  private hintsShown = 0;
  private hintText!: Phaser.GameObjects.Text;
  private answered = false;
  private keyHandler?: (e: KeyboardEvent) => void;
  private interactive: Phaser.GameObjects.GameObject[] = [];
  private inputArea!: Phaser.GameObjects.Container;   // cleared when results show
  private headerArea!: Phaser.GameObjects.Container;  // prompt + diagram (also cleared)
  private resultsArea?: Phaser.GameObjects.Container;
  private methodBody?: Phaser.GameObjects.Container;
  private tabButtons: Phaser.GameObjects.Rectangle[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number, opts: ProblemPanelOpts) {
    this.scene = scene;
    this.opts = opts;
    this.mode = opts.mode ?? 'practice';
    this.problem = opts.problem;
    this.container = scene.add.container(x, y);
    this.build();
  }

  private build() {
    const { width } = this.opts;
    const p = this.problem;
    this.headerArea = this.scene.add.container(0, 0);
    this.inputArea = this.scene.add.container(0, 0);
    this.container.add(this.headerArea);
    this.container.add(this.inputArea);

    // Prompt
    const prompt = this.scene.add
      .text(0, 0, p.prompt, {
        fontFamily: 'Trebuchet MS', fontSize: '20px', color: Theme.css.text,
        align: 'center', wordWrap: { width: width - 40 },
      })
      .setOrigin(0.5, 0);
    this.headerArea.add(prompt);
    let cursorY = prompt.height + 14;

    // Diagram
    if (p.diagram) {
      const dia = drawDiagram(this.scene, p.diagram, 0, cursorY + 70);
      this.headerArea.add(dia);
      cursorY += 160;
    }

    // Hint + feedback text holders
    this.hintText = this.scene.add
      .text(0, cursorY, '', { fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.warn, align: 'center', wordWrap: { width: width - 40 } })
      .setOrigin(0.5, 0);
    this.inputArea.add(this.hintText);
    cursorY += 26;

    // Input area
    if (p.type === 'multiple-choice') {
      cursorY = this.buildChoices(cursorY);
    } else if (p.type === 'numeric') {
      cursorY = this.buildKeypad(cursorY);
    } else {
      cursorY = this.buildConstructed(cursorY);
    }

    // Feedback line (used by drill/test flashes)
    this.feedback = this.scene.add
      .text(0, cursorY + 8, '', { fontFamily: 'Trebuchet MS', fontSize: '16px', color: Theme.css.good, align: 'center', wordWrap: { width: width - 30 } })
      .setOrigin(0.5, 0);
    this.container.add(this.feedback);

    // Hint button — practice mode only (real MAP gives no hints)
    if (this.mode === 'practice' && p.hints.length) {
      const hint = this.smallButton(-width / 2 + 70, -18, '💡 Hint', Theme.warn, () => {
        if (this.answered) return;
        sfx.click();
        const h = p.hints[Math.min(this.hintsShown, p.hints.length - 1)];
        this.hintsShown++;
        this.hintText.setText(h);
      });
      this.inputArea.add(hint);
    }
  }

  // ---- multiple choice ----
  private buildChoices(y: number): number {
    const choices = this.problem.choices ?? [];
    choices.forEach((choice, i) => {
      const by = y + i * 44;
      const btn = this.choiceButton(0, by, choice, () => this.submit(choice));
      this.inputArea.add(btn);
    });
    return y + choices.length * 44;
  }

  // ---- numeric: on-screen keypad + physical keyboard ----
  private buildKeypad(y: number): number {
    const display = this.scene.add.rectangle(0, y + 4, 200, 38, 0x0a0f24).setStrokeStyle(2, Theme.accent);
    this.entryText = this.scene.add
      .text(0, y + 4, '_', { fontFamily: 'Trebuchet MS', fontSize: '22px', color: Theme.css.accent })
      .setOrigin(0.5);
    this.inputArea.add(display);
    this.inputArea.add(this.entryText);

    const keys = ['7', '8', '9', '/', '4', '5', '6', '-', '1', '2', '3', '.', '0', ' ', '⌫', '↵'];
    const cols = 4;
    const kw = 50, kh = 36, gap = 6;
    const startX = -((cols * (kw + gap)) - gap) / 2 + kw / 2;
    const ky = y + 32;
    keys.forEach((k, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const kx = startX + col * (kw + gap);
      const yy = ky + row * (kh + gap);
      const color = k === '↵' ? Theme.good : k === '⌫' ? Theme.bad : Theme.bgPanelLight;
      const label = k === ' ' ? '␣' : k;
      const btn = this.keyButton(kx, yy, kw, kh, label, color, () => this.onKey(k));
      this.inputArea.add(btn);
    });

    // physical keyboard support
    this.keyHandler = (e: KeyboardEvent) => {
      if (this.answered) return;
      if (/^[0-9]$/.test(e.key)) this.onKey(e.key);
      else if (e.key === '/' || e.key === '.' || e.key === '-' || e.key === ' ') this.onKey(e.key);
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
    else if (this.entry.length < 10) this.entry += k;
    this.entryText?.setText(this.entry.length ? this.entry : '_');
  }

  // ---- constructed response: think, reveal full solutions, self-check ----
  private buildConstructed(y: number): number {
    const note = this.scene.add
      .text(0, y, 'Say your answer OUT LOUD or write it down — then check yourself.', {
        fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim, align: 'center', wordWrap: { width: this.opts.width - 60 },
      })
      .setOrigin(0.5, 0);
    this.inputArea.add(note);

    const reveal = this.smallButton(0, y + 44, '🔎 Reveal the ways to solve it', Theme.accent, () => {
      sfx.click();
      // Swap the prompt+inputs for the full solution view, then self-check.
      this.inputArea.setVisible(false);
      this.showSolutions('🔎 Model answer — did your explanation match?', Theme.css.accent, [
        { label: '✅ I explained it!', color: Theme.good, onClick: () => this.submit('__self_correct__', true) },
        { label: '🔁 I will review', color: Theme.warn, onClick: () => this.submit('__self_review__', false) },
      ]);
    });
    this.inputArea.add(reveal);

    return y + 80;
  }

  // ---- submission + feedback ----
  private submit(raw: string, forced?: boolean) {
    if (this.answered) return;
    this.answered = true;
    const correct = forced !== undefined ? forced : checkAnswer(this.problem, raw);

    if (correct) sfx.correct(); else sfx.wrong();

    if (this.mode === 'drill') {
      // timed mode: brief flash WITH the answer, then advance
      this.feedback.setText(correct ? '✅ Fixed!' : `❌ Ans: ${this.problem.answer}`).setColor(correct ? Theme.css.good : Theme.css.bad);
      this.scene.time.delayedCall(650, () => this.finish(correct));
      return;
    }

    if (this.mode === 'test') {
      // MAP simulation: lock in, no answer reveal (kid reviews missed at the end)
      this.feedback.setText(correct ? '✅' : '❌  (saved for review)').setColor(correct ? Theme.css.good : Theme.css.bad);
      this.scene.time.delayedCall(600, () => this.finish(correct));
      return;
    }

    // Practice/review: clear the inputs and teach with the full solutions.
    if (forced !== undefined) {
      // constructed-response self-check: solutions are already on screen
      this.finish(correct);
      return;
    }
    this.cleanupKeys();
    this.inputArea.setVisible(false);
    this.interactive.forEach((o) => (o as Phaser.GameObjects.Shape).disableInteractive?.());

    const banner = correct
      ? '✅ Correct! Nice work — check out the different ways below:'
      : `❌ Not quite — the answer is ${this.problem.answer}. Learn ALL the ways:`;
    this.showSolutions(banner, correct ? Theme.css.good : Theme.css.bad, [
      { label: 'Next  ▶', color: Theme.good, onClick: () => this.finish(correct) },
    ]);
  }

  // Replace the panel content with: banner, takeaway, method tabs, worked
  // steps for the selected method, and footer buttons.
  private showSolutions(
    banner: string,
    bannerColor: string,
    buttons: { label: string; color: number; onClick: () => void }[]
  ) {
    const { width } = this.opts;
    const p = this.problem;
    // Hide the diagram too — solution steps are written self-contained, and
    // this guarantees even 3-method solutions fit inside the modal.
    this.headerArea.setVisible(false);

    this.resultsArea?.destroy();
    this.resultsArea = this.scene.add.container(0, 0);
    this.container.add(this.resultsArea);

    let y = 0;
    const bannerText = this.scene.add
      .text(0, y, banner, {
        fontFamily: 'Trebuchet MS', fontSize: '17px', color: bannerColor, fontStyle: 'bold',
        align: 'center', wordWrap: { width: width - 40 },
      })
      .setOrigin(0.5, 0);
    this.resultsArea.add(bannerText);
    y += bannerText.height + 8;

    // Restate the question small, so the steps make sense without scrolling up.
    const mini = this.scene.add
      .text(0, y, p.prompt, {
        fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.textDim,
        align: 'center', wordWrap: { width: width - 60 },
      })
      .setOrigin(0.5, 0);
    this.resultsArea.add(mini);
    y += mini.height + 10;

    // Method tabs (only when there's more than one way)
    const sols = p.solutions;
    let selected = 0;
    this.tabButtons = [];
    if (sols.length > 1) {
      const tabW = 110, gap = 10;
      const totalW = sols.length * tabW + (sols.length - 1) * gap;
      sols.forEach((_, i) => {
        const tx = -totalW / 2 + tabW / 2 + i * (tabW + gap);
        const bg = this.scene.add.rectangle(tx, y + 16, tabW, 30, i === 0 ? Theme.accent : Theme.bgPanelLight)
          .setStrokeStyle(1, Theme.wall)
          .setInteractive({ useHandCursor: true });
        const label = this.scene.add.text(tx, y + 16, `Way ${i + 1}`, {
          fontFamily: 'Trebuchet MS', fontSize: '14px', color: i === 0 ? '#06121f' : Theme.css.text, fontStyle: 'bold',
        }).setOrigin(0.5);
        bg.on('pointerdown', () => {
          if (selected === i) return;
          sfx.click();
          selected = i;
          this.tabButtons.forEach((b, j) => {
            b.setFillStyle(j === i ? Theme.accent : Theme.bgPanelLight);
            (b.getData('label') as Phaser.GameObjects.Text).setColor(j === i ? '#06121f' : Theme.css.text);
          });
          renderMethod(i);
        });
        bg.setData('label', label);
        this.tabButtons.push(bg);
        this.resultsArea!.add(bg);
        this.resultsArea!.add(label);
      });
      y += 40;
    }

    const bodyTop = y + 6;
    const renderMethod = (i: number) => {
      this.methodBody?.destroy();
      this.methodBody = this.scene.add.container(0, 0);
      this.resultsArea!.add(this.methodBody);
      const sol: Solution = sols[i];
      let my = bodyTop;
      const title = this.scene.add
        .text(0, my, sol.title, {
          fontFamily: 'Trebuchet MS', fontSize: '16px', color: Theme.css.warn, fontStyle: 'bold',
          align: 'center', wordWrap: { width: width - 50 },
        })
        .setOrigin(0.5, 0);
      this.methodBody.add(title);
      my += title.height + 8;
      sol.steps.forEach((step, idx) => {
        const t = this.scene.add.text(-width / 2 + 36, my, `${idx + 1}.  ${step}`, {
          fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.text,
          wordWrap: { width: width - 80 },
        });
        this.methodBody!.add(t);
        my += t.height + 6;
      });
    };
    renderMethod(0);

    // Footer buttons at a fixed safe height inside the modal.
    const totalBw = buttons.length;
    buttons.forEach((b, i) => {
      const bx = totalBw === 1 ? 0 : (i === 0 ? -110 : 110);
      this.resultsArea!.add(this.smallButton(bx, FOOTER_Y, b.label, b.color, b.onClick));
    });
  }

  private finish(correct: boolean) {
    this.cleanup();
    this.opts.onAnswered(correct);
  }

  private cleanupKeys() {
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    this.keyHandler = undefined;
  }

  cleanup() {
    this.cleanupKeys();
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
