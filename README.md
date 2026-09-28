# Monis Workspace Designer

An interactive workspace configurator for **monis.rent**, a workspace rental service in Bali. A digital nomad picks a desk, a chair and accessories, sees the workspace come together in a live illustrated preview, reviews the monthly price and requests the setup. It was built for the Desent Solutions Developer Challenge.

## Features

- **Interactive workspace preview**: a layered 2D room (Bali sunset window, rattan pendant, jute rug) where every item is placed relative to the selected desk and springs into position when something changes.
- **Desk selection**: three desks (oak, teak with a rattan drawer, and an electric standing desk). Each desk has its own width and surface height, and the accessories move with it.
- **Chair selection**: three chairs (ergonomic mesh, leather lounge, hand-woven rattan).
- **Accessories**: 0, 1 or 2 monitors, plus toggles for the lamp, the keyboard and mouse, and the plant. Each one appears in or disappears from the scene.
- **Popular setups**: one-tap presets for users who want to get going quickly.
- **Live pricing**: an animated monthly total that is always visible (in the sidebar footer on desktop, in a sticky bottom bar on mobile).
- **Checkout summary**: the preview, itemised monthly line items, a delivery-area picker and a "Rent This Workspace" button that opens a confirmation dialog.
- **Responsive design**: a two-column layout on desktop. On phones the preview stays pinned at the top so every tap shows its result, the product cards scroll horizontally and the price and CTA sit in a sticky bottom bar.
- **Accessibility**: native buttons with `aria-pressed` and `role="switch"`, labelled groups, visible focus rings, a scene description on the SVG, a polite live region that announces each change and the new total, and a dialog with focus handling and Escape to close. The app honours `prefers-reduced-motion`.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, statically prerendered)
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion for animations
- Lucide React for icons
- Deploys to Vercel with zero configuration

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Architecture

```
app/                    layout (metadata, fonts) + page (server component shell)
components/
  ui/                   Button, Badge, Card primitives
  workspace/
    WorkspaceDesigner   client root: owns state, switches design ↔ review
    WorkspacePreview    layered SVG scene + change toast
    WorkspaceControls   presets, sections, desktop total + CTA
    ProductSelector     single-choice list (desks & chairs) → ProductCard
    AccessoriesSelector toggles + QuantityControl (monitors)
    CheckoutView        summary, delivery area, rent CTA
    ConfirmationDialog  success modal
    MobileSummaryBar    sticky price + CTA below lg
    scene/              Room, Desks, Chairs, Accessories artwork, layout anchors, thumbnails
data/products.ts        typed catalogue, presets, delivery areas
hooks/useWorkspace.ts   reducer + derived pricing (single source of truth)
lib/pricing.ts          getLineItems / getMonthlyTotal / formatPrice
types/workspace.ts      domain types
```

- **State.** The whole configuration lives in a single `WorkspaceConfig` shaped as `{ deskId, chairId, accessories: { monitor, lamp, keyboard, plant } }`. It is managed by one `useReducer` in `useWorkspace`. Accessories are stored as quantities, so toggles (maximum 1) and the monitor (maximum 2) share one code path. No global store is needed because the state is local to one page.
- **Pricing.** `lib/pricing.ts` is the only place where prices are computed. The sidebar, the mobile bar, the presets, the checkout and the confirmation dialog all read from it.
- **Scene.** Each desk declares a `layout` (left, right, surface height). `getSceneLayout()` turns that into anchor points for the monitors, keyboard, lamp, plant, mug and chair, and Framer Motion animates the items between anchors. The product thumbnails reuse the same artwork, so the cards always match the preview.
- **Server and client components.** `page.tsx` and `layout.tsx` are server components. Only the interactive tree under `WorkspaceDesigner` is marked `"use client"`.

## Design decisions

- **A visual configurator instead of a catalogue.** Someone who has just landed in Bali has three questions: *What will my workspace look like? How much is it? How do I get it?* A product grid only answers the second one. Putting a large live scene first answers all three at a glance, and it makes the experience feel like building a space rather than filling in a form.
- **The preview is the feedback loop.** Every control produces a visible change in the scene, a short toast ("Upgraded to dual monitors") and an animated total, so the user never has to wonder whether a tap did anything.
- **Illustration over photography.** Without the real catalogue, mixing stock photos would look inconsistent. A single SVG art direction stays coherent, stays sharp at any size, has no loading states and weighs almost nothing. It can be swapped for real transparent product renders later.
- **Quick paths.** Presets and a sensible default (standing desk, ergonomic chair, one monitor) mean the user starts from something attractive rather than an empty room.
- **A calm visual style.** A warm neutral palette, one jungle-green accent, large rounded cards, light glass effects and fast spring animations that respect reduced motion.

## What I would improve

- Connect the real Monis catalogue, stock and pricing through an API, with real transparent product renders
- Rental duration discounts, a delivery date picker and real checkout or deposit payment
- Shareable and saved configurations through URL state and accounts
- Drag-and-drop placement, more room styles, and eventually a 3D or AR preview
- Analytics on configurator drop-off and A/B tests on presets and default setups
- Visual regression and end-to-end tests (Playwright) for the key flows
