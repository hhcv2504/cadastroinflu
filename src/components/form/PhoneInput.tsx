function maskBRPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  // (11) 98765-4321 ou (11) 8765-4321
  const d = digits;
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function PhoneInput(props: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      inputMode="tel"
      autoComplete="tel"
      placeholder="(61) 99999-9999"
      className="w-full rounded-2xl border border-white/10 bg-zinc-950/30 px-4 py-3 text-white outline-none focus:border-white/25"
      value={props.value}
      onChange={(e) => props.onChange(maskBRPhone(e.target.value))}
    />
  );
}