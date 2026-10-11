import type { HeartConfig } from '../types/index.js';

/**
 * Gerencia o canvas de corações flutuantes.
 * Cria partículas visuais que sobem pela tela.
 */
export class HeartsCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private hearts: HeartConfig[];
  private animFrameId: number | null;
  private lastSpawnTime: number;
  private spawnInterval: number;

  constructor() {
    this.canvas = document.getElementById('hearts-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.hearts = [];
    this.animFrameId = null;
    this.lastSpawnTime = 0;
    this.spawnInterval = 400;

    this.resize();
    this.setupResizeListener();
    this.start();
  }

  /**
   * Ajusta o canvas ao tamanho da janela.
   */
  private resize(): void {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.scale(dpr, dpr);
  }

  /**
   * Configura o listener de redimensionamento.
   */
  private setupResizeListener(): void {
    let resizeTimeout: ReturnType<typeof setTimeout>;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.resize(), 150);
    });
  }

  /**
   * Cria um novo coração.
   */
  private spawnHeart(): void {
    const colorOptions = ['#ff6b8a', '#ff4d6d', '#ff758f', '#c9184a', '#ff85a1'];
    this.hearts.push({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 20,
      size: Math.random() * 16 + 8,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      sway: Math.random() * 30 - 15,
      swaySpeed: Math.random() * 0.03 + 0.01,
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
    });
  }

  /**
   * Desenha um coração na posição dada.
   */
  private drawHeart(x: number, y: number, size: number, color: string, opacity: number): void {
    this.ctx.save();
    this.ctx.globalAlpha = opacity;
    this.ctx.fillStyle = color;
    this.ctx.beginPath();

    const topCurveHeight = size * 0.3;
    this.ctx.moveTo(x, y + topCurveHeight);
    this.ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    this.ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size);
    this.ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    this.ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);

    this.ctx.fill();
    this.ctx.restore();
  }

  /**
   * Atualiza e renderiza todos os corações.
   */
  private update(time: number): void {
    const dpr = window.devicePixelRatio || 1;
    this.ctx.clearRect(0, 0, this.canvas.width / dpr, this.canvas.height / dpr);

    // Spawn hearts at intervals
    if (time - this.lastSpawnTime > this.spawnInterval) {
      this.spawnHeart();
      this.lastSpawnTime = time;
      this.spawnInterval = Math.random() * 400 + 200;
    }

    // Update and draw each heart
    for (let i = this.hearts.length - 1; i >= 0; i--) {
      const heart = this.hearts[i];

      heart.y -= heart.speed;
      heart.x += Math.sin(time * heart.swaySpeed) * 0.5;
      heart.opacity -= 0.001;

      if (heart.y < -30 || heart.opacity <= 0) {
        this.hearts.splice(i, 1);
        continue;
      }

      this.drawHeart(heart.x, heart.y, heart.size, heart.color, heart.opacity);
    }

    // Limit max hearts for performance
    if (this.hearts.length > 60) {
      this.hearts.splice(0, this.hearts.length - 60);
    }

    this.animFrameId = requestAnimationFrame((t) => this.update(t));
  }

  /**
   * Inicia o loop de animação.
   */
  start(): void {
    if (this.animFrameId !== null) return;
    this.animFrameId = requestAnimationFrame((t) => this.update(t));
  }

  /**
   * Para a animação e limpa recursos.
   */
  stop(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    this.hearts = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
