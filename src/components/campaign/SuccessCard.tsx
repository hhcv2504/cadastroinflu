import { useState } from "react";

export default function SuccessCard(props: { couponCode: string; createdAt: string; expiresAt: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(props.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  }

  return (
    <div className="space-y-4 relative">
      {/* Cupom */}
      <div className="rounded-2xl border border-white/10 bg-zinc-950/30 p-5">
        <p className="text-sm text-white/80">Seu cupom</p>

        <p className="mt-2 text-3xl font-semibold tracking-wider">{props.couponCode}</p>

        {/* datas */}
        <div className="mt-3 grid gap-1 text-xs text-white/70">
          <p>
            <span className="text-white/60">Gerado em:</span> {props.createdAt || "-"}
          </p>
          <p>
            <span className="text-white/60">Expira em:</span> {props.expiresAt || "-"}
          </p>
        </div>
      </div>

      {/* Botão copiar */}
      <button
        onClick={copy}
        className={`w-full rounded-2xl px-4 py-3 font-semibold transition-all duration-200 ${
          copied ? "bg-emerald-500 text-white" : "bg-white text-zinc-950 hover:bg-white/90"
        }`}
      >
        {copied ? "Copiado com sucesso ✅" : "Copiar código"}
      </button>

      {/* Toast */}
      {copied && (
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg">
          Código copiado!
        </div>
      )}

      {/* Lembrete */}
      <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100">
        <p className="font-semibold">Importante</p>
        <p className="mt-1 text-amber-100/90">
          Copie o código e tire um print do seu cupom para não esquecer.
        </p>
      </div>

      {/* Como resgatar */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
        <p className="font-medium">Como resgatar</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-white/70">
          <li>Vá ao Abençoado Bar (Asa Norte).</li>
          <li>Mostre o cupom no caixa/garçom.</li>
          <li>O cupom será validado e usado uma única vez.</li>
        </ol>
      </div>
    </div>
  );
}