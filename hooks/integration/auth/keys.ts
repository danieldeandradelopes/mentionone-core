export interface LoginCredentials {
  email: string;
  password: string;
}

export const AUTH_KEYS = {
  login: (value: LoginCredentials) => ["auth", "login", value],
  logout: () => ["auth", "logout"],
  userSession: () => ["auth", "userSession"],
} as const;
