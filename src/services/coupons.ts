import type { SignupPayload } from "../components/form/SignupForm";

type SignupResponse = {
  couponCode: string;
  createdAt: string; // ✅ data/hora que gerou
  expiresAt: string; // ✅ data/hora que expira
  reused?: boolean;
  status?: string;
  message?: string;
};

export async function createSignup(payload: SignupPayload): Promise<SignupResponse> {
  const url = import.meta.env.VITE_SHEETS_WEBAPP_URL as string;
  const token = import.meta.env.VITE_LEAD_TOKEN as string;

  if (!url) throw new Error("VITE_SHEETS_WEBAPP_URL não configurada.");
  if (!token) throw new Error("VITE_LEAD_TOKEN não configurada.");
  if (!payload.consent) throw new Error("Consentimento obrigatório.");

  const res = await fetch(url, {
    method: "POST",
    // ✅ IMPORTANTÍSSIMO: não usar application/json pra não gerar preflight
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...payload, token }),
  });

  const data = await res.json();

  if (!data.ok) throw new Error(data.message || "Erro ao gerar cupom.");

  return {
    couponCode: data.couponCode,
    createdAt: data.createdAt ?? "", // ✅ vem do Apps Script
    expiresAt: data.expiresAt ?? "", // ✅ vem do Apps Script
    reused: data.reused,
    status: data.status,
    message: data.message,
  };
}