import { useCallback } from "react";
import { useAuth } from "./use-auth";

function useSendWhatsappMessage() {
  const { getEnterpriseInfo } = useAuth();
  const enterpriseInfo = getEnterpriseInfo();
  console.log(enterpriseInfo);

  const handleSendWhatsappMessage = useCallback(
    (phone: string, message: string) => {
      const encodedMessage = encodeURIComponent(message);

      const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
    },
    []
  );

  return {
    handleSendWhatsappMessage,
  };
}

export default useSendWhatsappMessage;
