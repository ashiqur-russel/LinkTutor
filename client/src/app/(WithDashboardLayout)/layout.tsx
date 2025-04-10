import { AppSidebar } from "@/components/modules/dashboard/sidebar/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function WithDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-gray-800 text-white">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 ">
              <SidebarTrigger className="-ml-1 " />
            </div>
          </header>
          <div className="min-h-[100vh] flex-1 rounded-xl  md:min-h-min ">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
