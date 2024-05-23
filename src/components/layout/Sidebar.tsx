import { createContext, useContext, useEffect, useState } from "react";
import { ChevronLeftCircleIcon, ChevronRightCircle, LogOut } from "lucide-react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { toast } from "react-toastify";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
}

interface UserData {
  username: string;
  email: string;
}

const SidebarContext = createContext<{ expanded: boolean }>({ expanded: false });

const Sidebar = ({ children }: { children: React.ReactNode })  => {
  const {me, logout} = useAuth();
  const { data, isLoading, error, isError } = me;
  const navigator = useRouter();
  const [userData, setUserData] = useState<UserData>({ username: data.message.name, email: data.message.email });
  const [expanded, setExpanded] = useState(false);


  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner color="default" label="Loading..." size="lg" />
      </div>
    )
  }

  if(isError) {
    toast.error("Kamu Belum Login Silahkan Login Dulu!");
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <Image src="/images/forbiden.jpg" alt="login" width={400} height={400} />
        <Button size="lg" color="warning"  onClick={() => navigator.push("/")}>Login</Button>
      </div>
    );
  }

  const handleLogOut = async () => {
    try {
      logout();
      toast.success("Logout Success");
    }
    catch(e) {
      return toast.error("Logout Failed");
    }

  }

  useEffect(() => {

    const handleResize = () => {
      setExpanded(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <aside className="h-screen w-min sticky top-0 left-0 z-50 text-dark">
      <nav className="h-full flex flex-col bg-slate-900 border-r border-slate-800 shadow-sm">
        <div className="p-4 flex justify-between items-center">
          <h1 className={`overflow-hidden text-red-600 text-lg font-bold transition-all ${expanded ? "w-32" : "w-0"}`}>LinkedOut</h1>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            {expanded ? <ChevronLeftCircleIcon color="white" /> : <ChevronRightCircle color="white" />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t border-slate-800 flex items-center p-3">
          <div
            className={`flex flex-col justify-between overflow-hidden ${
              expanded ? "w-44 ml-3" : "w-0"
            }`}
          >
            <h4 className="font-semibold text-slate-200">{userData.username}</h4>
            <span className="text-xs text-slate-500">{userData.email}</span>
          </div>
          <LogOut className="cursor-pointer" onClick={handleLogOut} color="red" />
        </div>
      </nav>
    </aside>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, to }) => {
  const { expanded } = useContext(SidebarContext);
  const isActive = window.location.pathname === to;
  const isLogout = text === "Keluar";

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        isActive ? "bg-slate-700 text-white" : "hover:bg-slate-600"
      } ${isLogout && "text-red-600 hover:bg-red-100"}`}
    >
      <Link href={to} className="flex text-white hover:text-white items-center">
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? "w-44 ml-3" : "w-0"}`}
        >
          {text}
        </span>
      </Link>

      {!expanded && (
        <div
          className={`absolute left-full rounded-md text-slate-50 px-2 py-1 ml-6 bg-gray-800 text-dark text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export { Sidebar, SidebarItem };