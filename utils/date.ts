import { fromZonedTime, toZonedTime, format } from "date-fns-tz";
import { parseISO, format as formatDateFns, isBefore, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

// Obtém o timezone atual do navegador do usuário
// Exemplo: "America/Sao_Paulo", "Europe/London", "Asia/Tokyo"
export function getUserTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Função para obter o timezone do usuário para enviar nas requisições
// Esta função é usada automaticamente pela API para incluir o header x-timezone
export function getUserTimeZoneForRequest(): string {
  return getUserTimeZone();
}

export function formatTimeHoursAndMinutes(date: string) {
  // Se for apenas um horário (HH:mm), retorna como está
  if (/^\d{1,2}:\d{2}$/.test(date)) {
    return date;
  }

  // Se for uma data completa, formata
  try {
    return formatDateFns(parseISO(date), "HH:mm", { locale: ptBR });
  } catch (error) {
    console.error("Erro ao formatar data:", date, error);
    return date; // Retorna o valor original se não conseguir formatar
  }
}

// Formata data no padrão brasileiro
// Exemplo: "2025-01-15T14:30:00Z" -> "15/01/2025"
export function formatDate(date: string) {
  return formatDateFns(parseISO(date), "dd/MM/yyyy", { locale: ptBR });
}

// Formata data no padrão brasileiro
// Exemplo: "2025-01-15T14:30:00Z" -> "15/01/2025 10:32"
export function formatDateAndTime(date: string) {
  return formatDateFns(parseISO(date), "dd/MM/yyyy HH:mm", { locale: ptBR });
}

export function formatOnlyDayMonthDate(date: string) {
  return formatDateFns(parseISO(date), "dd/MM", { locale: ptBR });
}

// Formata data no padrão brasileiro considerando o timezone do usuário
// Exemplo: Date object -> "15/01/2025"
export function formatDateWithUserTimezone(date: Date): string {
  const userTimeZone = getUserTimeZone();
  return format(toZonedTime(date, userTimeZone), "dd/MM/yyyy", {
    timeZone: userTimeZone,
  });
}

// Converte uma data para string no formato YYYY-MM-DD (para input date)
// Usa o timezone local do usuário
export function formatDateForInput(date: Date): string {
  const userTimeZone = getUserTimeZone();
  const zonedDate = toZonedTime(date, userTimeZone);

  const year = zonedDate.getFullYear();
  const month = String(zonedDate.getMonth() + 1).padStart(2, "0");
  const day = String(zonedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Converte uma string de data (YYYY-MM-DD) do input date para Date object
// Considera que a data vem no timezone local do usuário
export function parseDateFromInput(dateString: string): Date {
  const userTimeZone = getUserTimeZone();
  // Cria uma data no timezone local do usuário
  const localDateTime = `${dateString}T00:00:00`;
  return fromZonedTime(localDateTime, userTimeZone);
}

// Converte horário do timezone da barbearia para o timezone local do usuário
// Os horários da API estão no timezone da barbearia (America/Sao_Paulo)
// Precisamos convertê-los para o timezone do usuário
export function convertTimeToUserTimezone(time: string): string {
  try {
    const userTimeZone = getUserTimeZone();

    // Se o usuário está no mesmo timezone da barbearia, não precisa converter
    if (userTimeZone === "America/Sao_Paulo") {
      return time;
    }

    // Calcular a diferença de timezone entre America/Sao_Paulo (UTC-3) e o timezone do usuário
    const [hours, minutes] = time.split(":").map(Number);

    // Criar uma data no timezone da barbearia (America/Sao_Paulo)
    const barbeariaTime = new Date();
    barbeariaTime.setHours(hours, minutes, 0, 0);

    // Converter para o timezone do usuário
    const userDate = new Date(
      barbeariaTime.toLocaleString("en-US", { timeZone: userTimeZone })
    );
    const userHours = userDate.getHours();
    const userMinutes = userDate.getMinutes();

    const adjustedTime = `${userHours.toString().padStart(2, "0")}:${userMinutes
      .toString()
      .padStart(2, "0")}`;

    return adjustedTime;
  } catch (error) {
    console.error("Erro ao converter horário:", time, error);
    return time; // Retorna o horário original se houver erro
  }
}

export const formatToLocalDateTime = (date: Date) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return format(toZonedTime(date, timeZone), "yyyy-MM-dd'T'HH:mm:ssXXX", {
    timeZone,
  });
};

export const isBeforeDate = ({
  first,
  second,
}: {
  first: string;
  second: string;
}) => {
  return isBefore(new Date(first), new Date(second));
};

export const isPastDate = (date: string) => {
  return isPast(new Date(date));
};

export function formatDateLiteral(date: string) {
  const [dayPart] = date.split("T");
  const [year, month, day] = dayPart.split("-");

  return `${day}/${month}/${year}`;
}
