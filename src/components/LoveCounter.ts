import type { DateConfig } from '../types/index.js';
import { getElapsedDetails } from '../utils/dateUtils.js';

/**
 * Gerencia a seção de contagem de tempo juntos.
 * Atualiza a cada segundo os valores de anos, meses, dias, horas, minutos e segundos.
 * Se a data estiver no futuro, mostra contagem regressiva.
 */
export class LoveCounter {
  private startDate: Date;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private elements: Record<string, HTMLElement>;
  private noteElement: HTMLElement;
  private isFuture: boolean;

  constructor(config: DateConfig) {
    this.startDate = config.startDate;
    this.isFuture = this.startDate > new Date();
    
    this.elements = {
      years: document.getElementById('counter-years')!,
      months: document.getElementById('counter-months')!,
      days: document.getElementById('counter-days')!,
      hours: document.getElementById('counter-hours')!,
      minutes: document.getElementById('counter-minutes')!,
      seconds: document.getElementById('counter-seconds')!,
    };

    this.noteElement = document.querySelector('.counter-note')!;
    
    if (this.isFuture) {
      (document.querySelector('.section-title') as HTMLElement).textContent = 'Nossa Contagem Regressiva';
      this.noteElement.textContent = 'até o nosso grande dia 💕';
    }

    this.update();
    this.start();
  }

  /**
   * Atualiza todos os contadores com os valores atuais.
   */
  private update(): void {
    const elapsed = getElapsedDetails(this.startDate);

    this.elements.years.textContent = elapsed.years.toString();
    this.elements.months.textContent = elapsed.months.toString();
    this.elements.days.textContent = elapsed.days.toString();
    this.elements.hours.textContent = elapsed.hours.toString();
    this.elements.minutes.textContent = elapsed.minutes.toString();
    this.elements.seconds.textContent = elapsed.seconds.toString();
  }

  /**
   * Inicia o timer de atualização a cada segundo.
   */
  start(): void {
    this.intervalId = setInterval(() => this.update(), 1000);
  }

  /**
   * Para o timer e limpa recursos.
   */
  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
