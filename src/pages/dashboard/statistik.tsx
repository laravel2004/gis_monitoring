import DashboardLayout from "@/components/layout/template";
import { Bar, Pie } from 'react-chartjs-2';
import placeData from "../../data/data.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { Button, Spinner } from "@nextui-org/react";
import { toast } from "react-toastify";
import Image from "next/image";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Employee {
  id: number;
  place: string;
  LatLong: string;
  name: string;
  images: string;
  status: string;
}

export default function Statistik() {

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

  const placeCounts: { [key: string]: number } = placeData.reduce((acc : any, employee : any) => {
    acc[employee.place] = (acc[employee.place] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const chartData = {
    labels: Object.keys(placeCounts),
    datasets: [
      {
        label: 'Mahasiswa',
        data: Object.values(placeCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Statistik Perusahan yang diminati',
      },
    },
  };


  return(
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Statistik Mahasiswa</h1>
      <Bar className="mt-10" data={chartData} options={options} />
    </DashboardLayout>
  )
}