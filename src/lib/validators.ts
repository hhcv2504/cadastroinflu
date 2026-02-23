import { z } from "zod";

const genderValues = ["female", "male", "nonbinary", "na"] as const;

export const signupSchema = z.object({
  fullName: z.string().min(3, "Informe seu nome completo."),
  phone: z.string().min(10, "Informe um telefone válido."),
  birthDate: z.string().min(1, "Informe sua data de nascimento."),
  gender: z.enum(genderValues, { error: "Selecione uma opção." }),

  // ✅ CONSENTIMENTO OBRIGATÓRIO
  consent: z.boolean().refine((v) => v === true, {
    message: "Você precisa dar consentimento para continuar.",
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;