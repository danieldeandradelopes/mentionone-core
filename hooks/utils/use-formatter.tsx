function useFormatter() {
  const formatMoney = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatCentsToMoney = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor / 100);
  };

  return {
    formatMoney,
    formatCentsToMoney,
  };
}

export default useFormatter;
