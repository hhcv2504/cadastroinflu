import { useState } from "react";
import SignupForm from "../form/SignupForm";
import type { SignupPayload } from "../form/SignupForm";
import SuccessCard from "./SuccessCard";
import { createSignup } from "../../services/coupons";

export default function SignupCard() {
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  async function handleSubmit(data: SignupPayload) {
    try {
    const res = await createSignup(data);
    setCouponCode(res.couponCode);
    setExpiresAt(res.expiresAt);
    setCreatedAt(res.createdAt);
    } catch (err: any) {
      alert(err.message || "Erro ao cadastrar.");
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:p-8">
      {!couponCode ? (
        <>
          <h2 className="text-xl font-semibold">Garanta seu cupom</h2>
          <p className="mt-1 text-sm text-white/75">
            Preencha os dados e gere seu cupom automaticamente.
          </p>
          <div className="mt-5">
            <SignupForm onSubmit={handleSubmit} />
          </div>
        </>
      ) : (
        <SuccessCard couponCode={couponCode} createdAt={createdAt ?? ""} expiresAt={expiresAt ?? ""} />
      )}
    </section>
  );
}