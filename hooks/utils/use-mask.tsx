const useMask = () => {
  const formatCurrency = (value: string): string => {
    if (!value) return "";

    const cleaned = value.replace(/\D/g, "");
    const number = parseFloat(cleaned) / 100;

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(number);
  };

  const formatPhone = (value: string): string => {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "").slice(0, 11); // Limita a 11 dígitos
    return cleaned
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
  };

  const parsePercentage = (value: string): string => {
    if (!value) return "";

    // mantém apenas números, vírgula e ponto
    let cleaned = value.replace(/[^0-9.,]/g, "");

    // troca vírgula por ponto
    cleaned = cleaned.replace(",", ".");

    // evita múltiplos pontos
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    // limita a valor máximo de 100
    const num = Number(cleaned);
    if (!isNaN(num) && num > 100) {
      return "100";
    }

    // evita "-0" e NaN
    return cleaned;
  };

  const formatDate = (value: string): string => {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "").slice(0, 8); // Limita a 8 dígitos
    return cleaned
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d{4})$/, "$1/$2");
  };

  const formatTime = (value: string): string => {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "").slice(0, 4); // Limita a 4 dígitos
    return cleaned.replace(/(\d{2})(\d{2})$/, "$1:$2");
  };

  return {
    formatCurrency,
    formatPhone,
    formatDate,
    formatTime,
    parsePercentage,
  };
};

export default useMask;
