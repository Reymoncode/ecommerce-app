import { CircleAlert, RotateCw } from 'lucide-react';
import { Button } from './Button';

export function ErrorPanel({ message, onRetry, retrying = false }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-4 rounded-2xl bg-error-tint p-6 text-error sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="flex items-start gap-3 text-body font-medium">
        <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        {message}
      </p>
      {onRetry && (
        <Button variant="secondary" loading={retrying} onClick={onRetry}>
          {!retrying && <RotateCw className="size-4" aria-hidden="true" />}
          Try again
        </Button>
      )}
    </div>
  );
}

export default ErrorPanel;