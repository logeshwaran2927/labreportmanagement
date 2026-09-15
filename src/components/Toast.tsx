import { type ReactNode } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useState, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

let toastId = 0;
const listeners: ((toast: Toast) => void)[] = [];

export function showToast(type: ToastType, message: string) {
  const toast: Toast = { id: ++toastId, type, message };
  listeners.forEach((fn) => fn(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 4000);
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const icons: Record<ToastType, typeof CheckCircle> = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  const colors: Record<ToastType, string> = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-sky-50 border-sky-200 text-sky-800',
  };

  const iconColors: Record<ToastType, string> = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-sky-500',
  };

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg pointer-events-auto animate-[slideIn_0.3s_ease-out] ${colors[toast.type]}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColors[toast.type]}`} />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button onClick={() => dismiss(toast.id)} className="shrink-0 opacity-60 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
