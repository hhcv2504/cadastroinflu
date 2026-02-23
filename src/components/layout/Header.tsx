export default function Header() {
  return (
    <header className="w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        <img
          src="/logo-collab.png"
          alt="Influbenefícios x Abençoado Bar"
          className="h-14 w-auto sm:h-16 md:h-20"
        />
      </div>
    </header>
  );
}