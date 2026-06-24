type ModuleTagProps = {
  label: string;
  variant?: "default" | "muted";
};

export function ModuleTag({ label, variant = "default" }: ModuleTagProps) {
  const className =
    variant === "muted"
      ? "module-tag module-tag-muted"
      : "module-tag";
  return <span className={className}>{label}</span>;
}
