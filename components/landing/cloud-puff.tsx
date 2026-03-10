import { cn } from "@/lib/utils";

interface CloudPuffProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CloudPuff({ size = 80, className, style }: CloudPuffProps) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 80 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-qfe-cloud", className)}
      style={style}
      aria-hidden="true"
    >
      <ellipse cx="40" cy="30" rx="32" ry="16" fill="currentColor" opacity="0.5" />
      <ellipse cx="28" cy="24" rx="20" ry="14" fill="currentColor" opacity="0.4" />
      <ellipse cx="52" cy="22" rx="22" ry="13" fill="currentColor" opacity="0.45" />
      <ellipse cx="40" cy="18" rx="18" ry="12" fill="currentColor" opacity="0.35" />
    </svg>
  );
}
