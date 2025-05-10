import { LoginType } from "../types/Login.type";
import { fetchApi } from "./req";

export async function Auth(
  data: LoginType,
  isLogin: (is: boolean) => void,
): Promise<void> {
  const result = await fetchApi<{ token: string }>(data, "POST", "/login");
  sessionStorage.setItem("token", result?.token || "");
  if (result?.token) {
    isLogin(true);
  }
}
