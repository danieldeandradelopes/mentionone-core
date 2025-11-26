import { useRouter } from "next/navigation";
import { useCustomLocalStorage } from "./use-custom-local-storage";
import Authentication, {
  EnterpriseAuthentication,
} from "@/src/@backend-types/Authentication";
import { User } from "@/app/lib/auth";

const AUTH_STORAGE_KEY = "auth";

export const defaultEnterprise: EnterpriseAuthentication = {
  id: 0,
  name: "",
  cover: "",
  address: "",
  description: "",
  latitude: 0,
  longitude: 0,
};

export const defaultUser: User = {
  access_level: "client",
  avatar: "",
  email: "",
  id: 0,
  name: "",
  phone: "",
  created_at: "",
  updated_at: "",
};

export function useAuth() {
  const navigate = useRouter();
  const [auth, setAuth, removeAuth] = useCustomLocalStorage<Authentication>(
    AUTH_STORAGE_KEY,
    {
      token: "",
      user: defaultUser,
      Enterprise: defaultEnterprise,
    }
  );

  const login = (
    token: string,
    user: User,
    Enterprise: EnterpriseAuthentication
  ) => {
    setAuth({ token, user, Enterprise: Enterprise });
  };

  const register = (user: User) => {
    setAuth({ ...auth, user });
  };

  const logout = () => {
    removeAuth();
    navigate.push("/");
  };

  const isAuthenticated = () => {
    return !!auth.token;
  };

  const getUser = (): User => {
    return auth.user;
  };

  const getEnterpriseInfo = (): EnterpriseAuthentication => {
    return auth.Enterprise ?? defaultEnterprise;
  };

  const setEnterpriseInfo = (enterpriseInfo: EnterpriseAuthentication) => {
    setAuth({ ...auth, Enterprise: enterpriseInfo });
  };

  const getToken = (): string => {
    return auth.token;
  };

  const getPhoneWhatsapp = (): string => {
    const whatsAppPhones = auth.Enterprise?.phones?.find(
      (phone) => phone.is_whatsapp
    );

    const phone = whatsAppPhones
      ? `55${whatsAppPhones?.phone_number?.replace(/\D/g, "")}`
      : "";

    return phone;
  };

  return {
    login,
    register,
    logout,
    isAuthenticated,
    getUser,
    getToken,
    getEnterpriseInfo,
    getPhoneWhatsapp,
    setEnterpriseInfo,
  };
}
