/**
 * Ponto de entrada principal da aplicação de amor para Ana Luiza.
 * Inicializa todos os componentes, gerencia o ciclo de vida e coordena as animações.
 */
import { HeartsCanvas } from './components/HeartsCanvas.js';
import { LoveCounter } from './components/LoveCounter.js';
import { LoveLetter } from './components/LoveLetter.js';
import { LoveReasons } from './components/LoveReasons.js';
import { Memories } from './components/Memories.js';
import type { DateConfig } from './types/index.js';

/**
 * Configuração principal do site de amor.
 */
const APP_CONFIG: DateConfig = {
  startDate: new Date(2026, 4, 8), // 08 de Maio de 2026
  partnerName: 'Ana Luiza',
  partnerTitle: 'do meu coração',
  siteTitle: 'Para Você, Ana Luiza 💕',
};

/**
 * Classe principal da aplicação.
 * Coordena o ciclo de vida de todos os componentes e gerencia a renderização.
 */
class LoveApp {
  private heartsCanvas: HeartsCanvas;
  private loveCounter: LoveCounter;
  private loveLetter: LoveLetter;
  private loveReasons: LoveReasons;
  private memories: Memories;

  constructor() {
    this.heartsCanvas = new HeartsCanvas();
    this.loveCounter = new LoveCounter(APP_CONFIG);
    this.loveLetter = new LoveLetter();
    this.loveReasons = new LoveReasons();
    this.memories = new Memories();

    this.setupScrollAnimations();

    // Render a carta de amor
    this.loveLetter.renderInstant();

    // Render os cards de motivos de amor
    this.loveReasons.render();

    // Render memórias e planos + inicia o countdown ao vivo
    this.memories.render();
    this.memories.start();

    console.log('💕 App initialized successfully');
  }

  /**
   * Configura animações de scroll suaves.
   */
  private setupScrollAnimations(): void {
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (link as HTMLAnchorElement).getAttribute('href')!;
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /**
   * Atualiza o título da página.
   */
  updatePageTitle(): void {
    document.title = APP_CONFIG.siteTitle;
  }

  /**
   * Retorna o título para a parceira.
   */
  getPartnerGreeting(): string {
    return `${APP_CONFIG.partnerName}, ${APP_CONFIG.partnerTitle}`;
  }
}

/**
 * Inicializa a aplicação quando o DOM estiver pronto.
 */
function initApp(): void {
  try {
    const app = new LoveApp();
    app.updatePageTitle();
    console.log(`💕 "Ana Luiza, do meu coração" — Site de Amor carregado com sucesso!`);
  } catch (error) {
    console.error('❌ Failed to initialize LoveApp:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
