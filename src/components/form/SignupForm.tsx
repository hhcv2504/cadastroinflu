import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../lib/validators";
import type { SignupFormData } from "../../lib/validators";
import PhoneInput from "./PhoneInput";

export type SignupPayload = SignupFormData;

export default function SignupForm(props: {
  onSubmit: (data: SignupPayload) => Promise<void>;
}) {
  const [step, setStep] = useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: { gender: "na", consent: false },
  });

  const consentValue = watch("consent");

  const progress = useMemo(() => (step === 1 ? 50 : 100), [step]);

  async function nextStep() {
    const ok = await trigger(["fullName", "phone"]);
    if (ok) setStep(2);
  }

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await props.onSubmit({
          fullName: data.fullName,
          phone: data.phone,
          birthDate: data.birthDate,
          gender: data.gender,
          consent: data.consent,
        });
      })}
      className="space-y-4"
      noValidate
    >
      {/* progresso */}
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-white/60 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {step === 1 ? (
        <>
          <Field label="Nome completo" error={errors.fullName?.message}>
            <input
              className={inputClass(errors.fullName?.message)}
              autoComplete="name"
              placeholder="Ex.: João da Silva"
              {...register("fullName")}
            />
          </Field>

          <Field label="Telefone" error={errors.phone?.message}>
            <PhoneInput
              value={watch("phone") ?? ""}
              onChange={(v) =>
                setValue("phone", v, { shouldValidate: true })
              }
            />
          </Field>

          <button
            type="button"
            onClick={nextStep}
            className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-zinc-950 hover:bg-white/90"
          >
            Continuar
          </button>
        </>
      ) : (
        <>
          <Field label="Data de nascimento" error={errors.birthDate?.message}>
            <input
              type="date"
              className={inputClass(errors.birthDate?.message)}
              autoComplete="bday"
              {...register("birthDate")}
            />
          </Field>

          <Field label="Gênero" error={errors.gender?.message}>
            <select
              className={inputClass(errors.gender?.message)}
              {...register("gender")}
            >
              <option value="na">Prefiro não informar</option>
              <option value="female">Feminino</option>
              <option value="male">Masculino</option>
              <option value="nonbinary">Não-binário</option>
            </select>
          </Field>

          {/* CONSENTIMENTO OBRIGATÓRIO */}
          <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-zinc-950/30 p-4 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              {...register("consent")}
            />
            <span className="text-white/80">
              Autorizo o uso dos meus dados para esta promoção e para receber
              futuras promoções da Influbenefícios e do Abençoado Bar.
              {errors.consent?.message && (
                <span className="mt-1 block text-xs text-red-200">
                  {errors.consent.message}
                </span>
              )}
            </span>
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full sm:w-1/3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white hover:bg-white/10"
            >
              Voltar
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !consentValue}
              className="w-full sm:w-2/3 rounded-2xl bg-white px-4 py-3 font-semibold text-zinc-950 hover:bg-white/90 disabled:opacity-60"
            >
              {isSubmitting ? "Gerando cupom..." : "Gerar meu cupom"}
            </button>
          </div>
        </>
      )}

      <p className="text-xs text-white/60">
        Seus dados serão utilizados para validar sua participação e garantir
        segurança na promoção.
      </p>
    </form>
  );
}

function Field(props: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{props.label}</label>
      <div className="mt-2">{props.children}</div>
      {props.error && (
        <p className="mt-1 text-xs text-red-200">{props.error}</p>
      )}
    </div>
  );
}

function inputClass(hasError?: string) {
  return [
    "w-full rounded-2xl border bg-zinc-950/30 px-4 py-3 text-white outline-none",
    hasError
      ? "border-red-300/60 focus:border-red-200"
      : "border-white/10 focus:border-white/25",
  ].join(" ");
}