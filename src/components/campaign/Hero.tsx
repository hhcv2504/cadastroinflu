import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7">
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
          Cupom na hora • 7 dias • 1 por pessoa
        </p>

        <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
          Cadastre-se e ganhe um <span className="text-white">almoço grátis</span> no Abençoado Bar Asa Norte!
        </h1>

        <p className="mt-3 text-white/75">Preencha em menos de 2 minutos e seu almoço é por nossa conta no melhor buffet da cidade!</p>
      </motion.div>
    </section>
  );
}