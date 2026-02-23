import Footer from "../components/layout/Footer";
import Hero from "../components/campaign/Hero";
import SignupCard from "../components/campaign/SignupCard";
import Header from "../components/layout/Header";

export default function LandingPage() {
  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 text-zinc-50">
      {/* Fundo decorativo para não ficar “vazio” nas laterais no PC */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-40 left-[-220px] h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-60 right-[-240px] h-[600px] w-[600px] rounded-full bg-white/10 blur-3xl" />
      </div>
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <Header />
        <div className="grid gap-10 pt-10 md:gap-12 lg:grid-cols-2 lg:items-center">
          <Hero />
          <SignupCard />
        </div>

        <div className="mt-14">
        </div>
      </main>

      <Footer />
    </div>
  );
}