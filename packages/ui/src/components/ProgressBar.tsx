export interface ProgressBarProps {
  champsRemplis: number;
  champsTotal: number;
  label?: string;
}

export function ProgressBar({ champsRemplis, champsTotal, label }: ProgressBarProps) {
  const percentage = champsTotal > 0 ? Math.round((champsRemplis / champsTotal) * 100) : 0;

  return (
    <div className="space-y-1">
      {label && <p className="text-xs text-gray-500">{label}</p>}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all duration-300"
          style={{ width: `${String(percentage)}%` }}
          role="progressbar"
          aria-valuenow={champsRemplis}
          aria-valuemin={0}
          aria-valuemax={champsTotal}
        />
      </div>
      <p className="text-xs text-gray-400">
        Simulation a {champsRemplis} parametres sur {champsTotal}
      </p>
    </div>
  );
}
