/**
 * Renderiza a carta de amor com efeito de digitação.
 */
import type { LetterLine } from '../types/index.js';

const LOVE_LETTER: LetterLine[] = [
  { text: 'Minha querida Ana Luiza,', highlight: true },
  { text: '' },
  { text: 'Eu estou escrevendo estas palavras com o coração transbordando de amor por você. Cada dia ao seu lado é um presente que eu agradeço com toda a minha alma.' },
  { text: '' },
  { text: 'Você chegou na minha vida e mudou tudo. Seu sorriso ilumina meus dias mais escuros, sua voz é a melodia mais bonita que eu já ouvi, e seus olhos são o lugar mais lindo do mundo.' },
  { text: '' },
  { text: 'Eu amo a forma como você ri das nossas próprias piadas bobas, amo como você me apoia nos meus sonhos, amo cada detalhe seu — do jeitinho como você arruma o cabelo quando está pensativa até o abraço apertado que me faz sentir em casa.' },
  { text: '' },
  { text: 'Você é minha melhor amiga, minha parceira de aventuras, meu refúgio e meu maior amor. Eu não consigo imaginar um só dia da minha vida sem você.' },
  { text: '' },
  { text: 'Cada momento com você é mágico, e eu quero viver todos eles ao seu lado. Prometo te amar nos dias bons e nos difíceis, nas risadas e nas lágrimas, na paz e na tempestade.' },
  { text: '' },
  { text: 'Obrigado por existir, por me escolher e por fazer da minha vida algo extraordinário.', highlight: true },
  { text: '' },
  { text: 'Com todo o meu amor,', highlight: true },
  { text: 'Para sempre seu 💕', highlight: true },
];

/**
 * Renderiza a carta de amor com efeito de digitação.
 */
export class LoveLetter {
  private container: HTMLElement;
  private lineIndex: number;
  private charIndex: number;
  private typingSpeed: number;
  private pauseBetweenLines: number;
  private animationFrameId: number | null;
  private startTime: number | null = null;

  constructor() {
    this.container = document.getElementById('letter-body')!;
    this.lineIndex = 0;
    this.charIndex = 0;
    this.typingSpeed = 35;
    this.pauseBetweenLines = 300;
    this.animationFrameId = null;
    this.startTime = null;
  }

  /**
   * Inicia a animação de digitação após um delay inicial.
   */
  start(delayMs: number): void {
    setTimeout(() => {
      this.startTime = performance.now();
      this.animationFrameId = requestAnimationFrame((t) => this.typeLine(t));
    }, delayMs);
  }

  /**
   * Toca uma linha completa de texto rapidamente (para pular entre linhas).
   */
  private playQuickLine(): void {
    if (this.lineIndex >= LOVE_LETTER.length) return;

    const line = LOVE_LETTER[this.lineIndex];

    if (line.text === '') {
      this.lineIndex++;
      this.charIndex = 0;
      this.animationFrameId = requestAnimationFrame(() => this.typeLine(performance.now()));
      return;
    }

    const p = document.createElement('p');
    p.className = 'letter-line' + (line.highlight ? ' highlight' : '');

    let displayIndex = 0;
    const typewriter = (t: number): void => {
      if (this.startTime === null) return;
      const elapsed = t - this.startTime;
      if (elapsed >= (displayIndex + 1) * this.typingSpeed * 0.3) {
        p.textContent += line.text[displayIndex];
        displayIndex++;
        if (displayIndex < line.text.length) {
          this.animationFrameId = requestAnimationFrame(typewriter);
          return;
        }

        this.container.appendChild(p);
        this.lineIndex++;
        this.charIndex = 0;
        this.startTime = t + this.pauseBetweenLines;
        this.animationFrameId = requestAnimationFrame((nt) => this.typeLine(nt));
        return;
      }
      this.animationFrameId = requestAnimationFrame(typewriter);
    };

    this.animationFrameId = requestAnimationFrame(typewriter);
  }

  /**
   * Loop principal de animação de digitação.
   */
  private typeLine(_t: number): void {
    if (this.lineIndex >= LOVE_LETTER.length) return;

    this.playQuickLine();
  }

  /**
   * Limpa e para a animação.
   */
  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.container.innerHTML = '';
  }

  /**
   * Renderiza a carta completa instantaneamente (sem animação).
   */
  renderInstant(): void {
    this.container.innerHTML = '';
    for (const line of LOVE_LETTER) {
      if (line.text === '') {
        const br = document.createElement('br');
        br.classList.add('line-break');
        this.container.appendChild(br);
        continue;
      }

      const p = document.createElement('p');
      p.className = 'letter-line' + (line.highlight ? ' highlight' : '');
      p.textContent = line.text;
      this.container.appendChild(p);
    }
  }
}
