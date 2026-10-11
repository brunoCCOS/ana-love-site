import type { LoveReason } from '../types/index.js';

/**
 * Lista de razões de amor pré-definidas.
 */
const LOVE_REASONS: LoveReason[] = [
  {
    icon: '✨',
    title: 'Seu Sorriso',
    description: 'Ilumina o meu mundo inteiro e faz cada dia valer a pena.',
  },
  {
    icon: '💖',
    title: 'Seu Coração',
    description: 'Tão generoso, tão puro, tão cheio de amor que me encanta.',
  },
  {
    icon: '🌟',
    title: 'Seu Jeito',
    description: 'Único e especial, do jeito que só você sabe ser.',
  },
  {
    icon: '🦋',
    title: 'Suas Risadas',
    description: 'A música mais linda que meu ouvido já escutou.',
  },
  {
    icon: '🌹',
    title: 'Seu Abraço',
    description: 'O meu lugar favorito no mundo inteiro.',
  },
  {
    icon: '🎾',
    title: 'Seu Forehand',
    description: 'Na quadra e na vida: preciso, leve e sempre certeiro. Meu favorito.',
  },
  {
    icon: '💫',
    title: 'Seu Jeito de Me Aconselhar',
    description: 'Com você, até os dias difíceis ficam mais leves.',
  },
  {
    icon: '🌙',
    title: 'Seu Olhar',
    description: 'Nele eu encontro paz, segurança e todo o amor do universo.',
  },
  {
    icon: '🔥',
    title: 'Nosso Amor',
    description: 'Cresce a cada dia e se torna mais forte do que nunca.',
  },
  {
    icon: '🌍',
    title: 'Tudo em Você',
    description: 'Cada detalhe, cada gesto, cada momento — eu amo tudo.',
  },
];

/**
 * Renderiza a seção "O que eu amo em você" com cards animados.
 */
export class LoveReasons {
  private container: HTMLElement;
  private rendered: boolean;

  constructor() {
    this.container = document.getElementById('reasons-grid')!;
    this.rendered = false;
  }

  /**
   * Renderiza os motivos de amor no container.
   */
  render(): void {
    if (this.rendered) return;

    this.container.innerHTML = '';

    LOVE_REASONS.forEach((reason, index) => {
      const card = this.createCard(reason, index);
      this.container.appendChild(card);
    });

    this.rendered = true;
  }

  /**
   * Cria um card individual de motivo de amor.
   */
  private createCard(reason: LoveReason, index: number): HTMLElement {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const icon = document.createElement('div');
    icon.className = 'reason-icon';
    icon.textContent = reason.icon;

    const title = document.createElement('h3');
    title.className = 'reason-title';
    title.textContent = reason.title;

    const description = document.createElement('p');
    description.className = 'reason-description';
    description.textContent = reason.description;

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(description);

    return card;
  }

  /**
   * Limpa os cards renderizados.
   */
  clear(): void {
    this.container.innerHTML = '';
    this.rendered = false;
  }
}
