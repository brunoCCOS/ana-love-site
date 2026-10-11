/**
 * Barrel export para todos os tipos do projeto.
 * Centraliza as importações de tipagem em um único módulo.
 */

export * from './date.types.js';

/**
 * Representa um ponto de posição (x, y) no canvas ou na tela.
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Configuração de um coração flutuante no canvas.
 */
export interface HeartConfig {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  sway: number;
  swaySpeed: number;
  color: string;
}

/**
 * Razões de amor (para a seção "O que eu amo em você").
 */
export interface LoveReason {
  icon: string;
  title: string;
  description: string;
}

/**
 * Memória vivida ou próximo plano (seção "Nossa História").
 */
export interface Memory {
  icon: string;
  title: string;
  description: string;
  /** Rótulo de data exibido no card (ex.: "Corrida: 08/11/2026"). */
  dateLabel?: string;
  /** Data do evento — habilita a contagem regressiva ao vivo nos planos. */
  date?: Date;
}

/**
 * Configuração de animações CSS via JS.
 */
export interface AnimationConfig {
  duration: number;
  easing: string;
}

/**
 * Cor no formato HEX (#RRGGBB).
 */
export type HexColor = `#${string}`;
