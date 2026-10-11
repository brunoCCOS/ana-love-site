/**
 * Tipagem para a aplicação de amor.
 * Centraliza todos os tipos de domínio relacionados ao tempo e relacionamento.
 */

/**
 * Linha da carta de amor.
 */
export interface LetterLine {
  text: string;
  highlight?: boolean;
}

/**
 * Configuração de tempo e relacionamento.
 */
export interface DateConfig {
  startDate: Date;
  partnerName: string;
  partnerTitle: string;
  siteTitle: string;
}

/**
 * Resultado da diferença entre datas (anos, meses, dias).
 */
export interface TimeDifference {
  years: number;
  months: number;
  days: number;
}

/**
 * Detalhes completos de tempo decorrido.
 */
export interface ElapsedDetails extends TimeDifference {
  totalDays: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Informações sobre o próximo aniversário do relacionamento.
 */
export interface NextAnniversary {
  date: Date;
  daysUntil: number;
}
