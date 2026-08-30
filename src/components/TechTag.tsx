interface TechTagProps {
  label: string;
}

export function TechTag({ label }: TechTagProps) {
  return (
    <span className="pixel-step-sm inline-block bg-muted px-3 py-1 font-pixel text-[10px] tracking-wide text-primary ring-1 ring-primary/50 transition-transform duration-200 hover:-translate-y-0.5">
      {label}
    </span>
  );
}
