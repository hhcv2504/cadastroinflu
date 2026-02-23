export default function Footer() {
  return (
    <footer id="regras" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/75">
        <p className="font-semibold text-white">Regras do cupom</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Válido por 7 dias após o cadastro.</li>
          <li>Uso único por pessoa (sujeito à validação no resgate).</li>
          <li>Campanha pode encerrar sem aviso, conforme disponibilidade.</li>
        </ul>

        <div className="mt-6 text-xs text-white/60">
          <p>
            Seus dados serão usados apenas para validar o cupom e evitar fraudes, conforme
            política de privacidade.
          </p>
        </div>
      </div>
    </footer>
  );
}