/**
 * Utilitários de data para a aplicação de amor.
 */
import type { DateConfig, ElapsedDetails, TimeDifference, NextAnniversary } from '../types/index.js';

/**
 * Formata uma data para o formato brasileiro (DD/MM/AAAA).
 */
export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Calcula a diferença de tempo entre duas datas.
 */
export function getTimeDifference(start: Date, end: Date): TimeDifference {
  const diffMs = end.getTime() - start.getTime();
  return {
    years: 0,
    months: 0,
    days: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
  };
}

/**
 * Calcula os detalhes do tempo decorrido desde a data de início.
 * Se a data estiver no futuro, calcula o tempo até a data.
 */
export function getElapsedDetails(startDate: Date): ElapsedDetails {
  const now = new Date();
  const diffMs = now.getTime() - startDate.getTime();
  const absDiffMs = Math.abs(diffMs);

  const totalSeconds = Math.floor(absDiffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  // Calcular anos, meses e dias restantes
  let years = 0;
  let months = 0;
  let days = 0;

  const tempDate = new Date(startDate);

  if (diffMs >= 0) {
    // Tempo decorrido desde a data
    if (tempDate <= now) {
      years = now.getFullYear() - tempDate.getFullYear();
      months = now.getMonth() - tempDate.getMonth();
      days = now.getDate() - tempDate.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }
    }
  } else {
    // Tempo até a data (data no futuro)
    if (tempDate > now) {
      years = tempDate.getFullYear() - now.getFullYear();
      months = tempDate.getMonth() - now.getMonth();
      days = tempDate.getDate() - now.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(tempDate.getFullYear(), tempDate.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }
    }
  }

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  return {
    years,
    months,
    days,
    totalDays,
    hours,
    minutes,
    seconds,
  };
}

/**
 * Calcula quando será o próximo aniversário de relacionamento.
 */
export function getNextAnniversary(startDate: Date): NextAnniversary {
  const now = new Date();
  let anniversary = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());

  if (anniversary <= now) {
    anniversary = new Date(now.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
  }

  const diffMs = anniversary.getTime() - now.getTime();
  const daysUntil = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return {
    date: anniversary,
    daysUntil,
  };
}
