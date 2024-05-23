import DashboardLayout from "@/components/layout/template";
import placeData from "../../data/data.json";
import { Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";

export default function Mahasiswa() {

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

  return (
    <DashboardLayout>
      <h1>Halaman Mahasiswa</h1>
      <div className="mt-5">
      <Table aria-label="Example table with dynamic content">
          <TableHeader>
            <TableColumn>No</TableColumn>
            <TableColumn>Nama Mahasiswa</TableColumn>
            <TableColumn>Tempat Magang</TableColumn>
            <TableColumn>Status Magang</TableColumn>
          </TableHeader>
          <TableBody>
            {
              placeData.map((item : any, index : number) => (
                <TableRow className="text-black"  key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.place}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  )
}