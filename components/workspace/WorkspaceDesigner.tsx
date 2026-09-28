"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { DeliveryArea } from "@/data/products";
import { useWorkspace, type WorkspaceController } from "@/hooks/useWorkspace";
import { CheckoutView } from "./CheckoutView";
import { ConfirmationDialog, type RentalRequest } from "./ConfirmationDialog";
import { MobileSummaryBar } from "./MobileSummaryBar";
import { Perks } from "./Perks";
import { WorkspaceControls } from "./WorkspaceControls";
import { WorkspacePreview } from "./WorkspacePreview";

type View = "design" | "review";

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};

export function WorkspaceDesigner() {
  const workspace = useWorkspace();
  const [view, setView] = useState<View>("design");
  const [area, setArea] = useState<DeliveryArea>("Canggu");
  const [request, setRequest] = useState<RentalRequest | null>(null);

  const goTo = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const rent = () =>
    setRequest({
      reference: `MNS-${Math.floor(1000 + Math.random() * 9000)}`,
      area,
      total: workspace.total,
      itemCount: workspace.lineItems.length,
    });

  const closeConfirmation = useCallback(() => setRequest(null), []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        {view === "design" ? (
          <motion.div key="design" {...pageTransition}>
            <DesignView workspace={workspace} onReview={() => goTo("review")} />
          </motion.div>
        ) : (
          <motion.div key="review" {...pageTransition}>
            <CheckoutView
              workspace={workspace}
              area={area}
              onAreaChange={setArea}
              onEdit={() => goTo("design")}
              onRent={rent}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <MobileSummaryBar
        total={workspace.total}
        actionLabel={view === "design" ? "Review" : "Rent Workspace"}
        onAction={view === "design" ? () => goTo("review") : rent}
      />

      <ConfirmationDialog request={request} onClose={closeConfirmation} />
    </MotionConfig>
  );
}

function DesignView({
  workspace,
  onReview,
}: {
  workspace: WorkspaceController;
  onReview: () => void;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-x-8 pb-32 lg:grid-cols-[minmax(0,1fr)_400px] lg:pb-12 xl:grid-cols-[minmax(0,1fr)_440px] xl:gap-x-10">
      <div className="lg:col-start-1 lg:row-start-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-jungle">Workspace Designer</p>
        <h1 className="mt-2 text-[32px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-4xl xl:text-[44px]">
          Build your <em className="font-serif font-normal text-jungle">Bali</em> workspace.
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
          Pick a desk, a chair and the extras you need. Watch it come together, then we deliver and set it up within
          48&nbsp;hours.
        </p>
      </div>

      <div className="sticky top-0 z-30 -mx-4 mt-5 bg-canvas/85 px-4 pb-4 pt-2 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:static lg:col-start-1 lg:row-start-2 lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <div className="mx-auto w-[min(100%,calc(42dvh*10/7))] lg:w-[min(100%,calc((100dvh-17rem)*10/7))] lg:min-w-[min(100%,560px)]">
          <WorkspacePreview config={workspace.config} total={workspace.total} lastChange={workspace.lastChange} />
        </div>
      </div>

      <Perks className="order-last mt-10 lg:order-none lg:col-start-1 lg:row-start-3 lg:mt-8" />

      <aside
        aria-label="Workspace options"
        className="mt-4 lg:sticky lg:top-6 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:self-start"
      >
        <h2 className="sr-only">Customize your workspace</h2>
        <WorkspaceControls workspace={workspace} onReview={onReview} />
      </aside>
    </div>
  );
}
