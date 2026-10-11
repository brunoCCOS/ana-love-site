import type { Memory } from '../types/index.js';

/**
 * Seção "Nossa História": guarda as memórias (o que já vivemos juntos)
 * e os próximos planos, com contagem regressiva ao vivo.
 * Para registrar uma nova memória ou plano, basta adicionar ao array abaixo.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Memórias: coisas que já fizemos juntos e que ficam guardadas para sempre.
 */
const MEMORIES: Memory[] = [
  {
    icon: '🇬🇧',
    title: 'Nossa Viagem a Londres',
    description:
      'Explorar a cidade ao seu lado — cada esquina, cada foto, cada pedacinho de Londres ficou guardado no nosso coração.',
  },
];

/**
 * Próximos planos: o que vamos viver em breve.
 * Planos com data exibem contagem regressiva ao vivo.
 */
const NEXT_PLANS: Memory[] = [
  {
    icon: '🏎️',
    title: 'Grande Prêmio de São Paulo',
    description:
      'Interlagos, onde o coração acelera ainda mais: vamos assistir à corrida juntos!',
    dateLabel: 'Corrida: 08/11/2026',
    // Aproximadamente o horário do lights-out em Interlagos — confirme a programação oficial.
    date: new Date(2026, 10, 8, 15, 0, 0),
  },
  {
    icon: '⛺',
    title: 'Acampar Juntos',
    description:
      'Uma noite sob as estrelas, longe de tudo, só nós dois — e a data, a gente escolhe do nosso jeito.',
  },
];

/**
 * Monta o card de uma memória ou de um plano.
 */
function buildCard(item: Memory, kind: 'memory' | 'plan', delay: number): HTMLElement {
  const card = document.createElement('div');
  card.className = `memory-card ${kind === 'memory' ? 'memory-card--done' : 'memory-card--plan'}`;
  card.style.setProperty('--delay', `${delay}s`);

  const icon = document.createElement('span');
  icon.className = 'memory-icon';
  icon.textContent = item.icon;

  const title = document.createElement('h4');
  title.className = 'memory-title';
  title.textContent = item.title;

  const description = document.createElement('p');
  description.className = 'memory-description';
  description.textContent = item.description;

  card.appendChild(icon);
  card.appendChild(title);
  card.appendChild(description);

  if (item.dateLabel) {
    const label = document.createElement('span');
    label.className = 'memory-date';
    label.textContent = item.dateLabel;
    card.appendChild(label);
  } else if (kind === 'plan') {
    // Plano sem data ainda: mostra um selo discreto.
    const label = document.createElement('span');
    label.className = 'memory-date memory-date--tbd';
    label.textContent = '🗓️ a combinar';
    card.appendChild(label);
  }

  if (item.date) {
    const countdown = document.createElement('span');
    countdown.className = 'memory-countdown';
    countdown.dataset.target = item.date.getTime().toString();
    card.appendChild(countdown);
  }

  return card;
}

/**
 * Componente da seção "Nossa História".
 * Renderiza memórias e planos e mantém o countdown atualizado ao vivo (1s).
 */
export class Memories {
  private doneList: HTMLElement;
  private planList: HTMLElement;
  private countdownEls: HTMLElement[] = [];
  private timerId: number | null = null;

  constructor() {
    this.doneList = document.getElementById('memories-done') as HTMLElement;
    this.planList = document.getElementById('memories-plans') as HTMLElement;
  }

  /**
   * Renderiza as listas de memórias e planos.
   */
  render(): void {
    MEMORIES.forEach((mem, i) => this.doneList.appendChild(buildCard(mem, 'memory', i * 0.12)));
    NEXT_PLANS.forEach((plan, i) => this.planList.appendChild(buildCard(plan, 'plan', i * 0.12)));

    this.countdownEls = Array.from(document.querySelectorAll('.memory-countdown'));
    this.updateCountdowns();
  }

  /**
   * Inicia a atualização ao vivo dos countdowns (uma vez por segundo).
   */
  start(): void {
    if (this.timerId !== null) return;
    this.timerId = window.setInterval(() => this.updateCountdowns(), 1000);
  }

  /**
   * Para o timer e libera recursos.
   */
  stop(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Atualiza o texto de cada countdown conforme o momento:
   * antes do dia, no dia, durante a corrida e depois dela.
   */
  private updateCountdowns(): void {
    const now = Date.now();

    this.countdownEls.forEach((el) => {
      const target = Number(el.dataset.target || 0);
      if (!target) return;

      const diff = target - now;

      if (diff > DAY_MS) {
        const days = Math.floor(diff / DAY_MS);
        const hours = Math.floor((diff % DAY_MS) / 3_600_000);
        const minutes = Math.floor((diff % 3_600_000) / 60_000);
        const seconds = Math.floor((diff % 60_000) / 1000);
        el.textContent = `⏳ Faltam ${days}d ${hours}h ${minutes}min ${seconds}s`;
      } else if (diff > 0) {
        const hours = Math.floor(diff / 3_600_000);
        const minutes = Math.floor((diff % 3_600_000) / 60_000);
        const seconds = Math.floor((diff % 60_000) / 1000);
        el.textContent = `🏁 É HOJE! Lights-out em ${hours}h ${minutes}min ${seconds}s`;
      } else if (diff > -DAY_MS) {
        el.textContent = '🏎️ O GP está acontecendo agora!';
      } else {
        el.textContent = '🏁 Que emoção! Já virou memória nossa.';
      }
    });
  }
}