// hooks/useJWTToken.ts
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchApi } from "../utils/req";

/**
 * Estrutura esperada do payload de um JWT.
 */
interface JWTPayload {
  nome: string;
  cargo: string;
  codigo: string;
  id_empresa: number;
  id: number;
  exp: number;
  iat: number;
}

/**
 * Decodifica um token JWT e retorna o payload como objeto.
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    console.warn("Falha ao decodificar JWT:", error);
    return null;
  }
}

/**
 * Hook para gerenciar um token JWT com renovação automática.
 * @param DateUser - dados do usuário.
 */
export function useJWTToken(): void {
  const [, setToken] = useState<string | null>(null);
  const refreshTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchAndSetToken = useCallback(async () => {
    try {
      const newToken = await fetchApi<{ token: string }>(
        null,
        "POST",
        "/login/refresh",
      );
      if (newToken?.token) {
        setToken(newToken.token);
        localStorage.setItem("token", newToken.token);
        const decoded = decodeJWT(newToken.token);
        if (decoded?.exp) {
          const expiresAt = decoded.exp * 1000;
          const now = Date.now();
          const refreshIn = Math.max(expiresAt - now - 60000, 0);

          if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
          refreshTimeout.current = setTimeout(() => {
            fetchAndSetToken();
          }, refreshIn);
        }
      }
    } catch (error) {
      console.error("Erro ao obter token JWT:", error);
    }
  }, []);

  useEffect(() => {
    fetchAndSetToken();

    return () => {
      if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
    };
  }, [fetchAndSetToken]);
}
