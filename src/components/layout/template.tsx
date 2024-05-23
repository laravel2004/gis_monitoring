import { BookDashed, Contact, LayoutDashboard, LayoutPanelTop, MonitorPlay, Video } from "lucide-react";
import { Sidebar, SidebarItem } from "./Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex antialiased bg-slate-950">
      <Sidebar>
        <SidebarItem
            icon={<LayoutDashboard color="white" />}
            text="Dashboard"
            to="/dashboard"
          />
        <SidebarItem 
          icon={<Contact color="white" />}
          text="Daftar Mahasiswa"
          to="/dashboard/mahasiswa"
        />
      </Sidebar>
      <div className="flex flex-col text-white relative overflow-x-hidden overflow-y-auto w-full px-6 py-4">
        {children}
      </div>
    </div>
  );
}