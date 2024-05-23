import DashboardLayout from "@/components/layout/template";
import useAuth from "@/hooks/useAuth";
import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import placeData from "../data/data.json";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map/index"), {
  ssr: false,
});

export default function Dashboard() {

  const [selectedSite, setSelectedSite] = useState(null);
  const initialCenter = [-7.2575, 112.7521];
  const initialZoom = 13;
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [mapZoom, setMapZoom] = useState(initialZoom);
  const {me} = useAuth();
  const { data, isLoading, error, isError } = me;
  const navigator = useRouter();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner color="default" label="Loading..." size="lg" />
      </div>
    )
  }

  if(isError) {
    toast.error("Kamu Belum Login Silahkan Login Dulu!");
    localStorage.removeItem("token");
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <Image src="/images/forbiden.jpg" alt="login" width={400} height={400} />
        <Button size="lg" color="warning"  onClick={() => navigator.push("/")}>Login</Button>
      </div>
    );
  }

  const handleMarkerClick = (site : any) => {
    setSelectedSite(site);
    setMapCenter([site.LatLong.split(",")[0], site.LatLong.split(",")[1]]);
    setMapZoom(15);
  };

  const handleCloseDetails = () => {
    setSelectedSite(null);
    setMapCenter(initialCenter);
    setMapZoom(initialZoom);
  };

  const handleSelectSite = (site : any) => {
    setSelectedSite(site);
    setMapCenter([site.latitude, site.longitude]);
    setMapZoom(15);
  };



  return (
    <DashboardLayout>
      <div className="w-full rounded-md grid gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-lg">Welcome, {data.message.name}</p>
        </div>
        <div className="flex">
        <div className="w-full">
          <Map
            sites={placeData}
            selectedSite={selectedSite}
            center={mapCenter}
            zoom={mapZoom}
            onMarkerClick={handleMarkerClick}
          />
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}