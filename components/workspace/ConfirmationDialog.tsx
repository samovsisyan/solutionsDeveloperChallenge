"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/pricing";

export interface RentalRequest {
  reference: string;
  area: string;
  total: number;
  itemCount: number;
}

interface ConfirmationDialogProps {
  request: RentalRequest | null;
  onClose: () => void;
}

export function ConfirmationDialog({ request, onClose }: ConfirmationDialogProps) {
  return (
    <AnimatePresence>
      {request && <DialogPanel key={request.reference} request={request} onClose={onClose} />}
    </AnimatePresence>
  );
}

function DialogPanel({ request, onClose }: { request: RentalRequest; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    primaryRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-ink/35 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        aria-describedby="confirmation-description"
        className="relative w-full max-w-md rounded-[32px] bg-white p-7 text-center shadow-2xl sm:p-9"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
      >
        <motion.div
          className="mx-auto flex size-16 items-center justify-center rounded-full bg-jungle text-white"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.1 }}
        >
          <Check className="size-8" strokeWidth={2.5} aria-hidden="true" />
        </motion.div>

        <h2 id="confirmation-title" className="mt-6 text-2xl font-semibold tracking-tight text-ink">
          Your workspace is ready!
        </h2>
        <p id="confirmation-description" className="mt-2 text-[15px] leading-relaxed text-muted">
          Monis will contact you to arrange delivery in {request.area}, Bali.
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-canvas p-4 text-left text-sm">
          <div>
            <dt className="text-xs text-muted">Reference</dt>
            <dd className="font-semibold tabular-nums text-ink">{request.reference}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Monthly</dt>
            <dd className="font-semibold tabular-nums text-ink">
              {formatPrice(request.total)} · {request.itemCount} items
            </dd>
          </div>
        </dl>

        <Button ref={primaryRef} size="lg" className="mt-6 w-full" onClick={onClose}>
          Done
        </Button>
      </motion.div>
    </motion.div>
  );
}
