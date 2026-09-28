import { SiteHeader } from "@/components/workspace/SiteHeader";
import { WorkspaceDesigner } from "@/components/workspace/WorkspaceDesigner";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <SiteHeader />
      <main>
        <WorkspaceDesigner />
      </main>
    </div>
  );
}
