import DashboardLayout from "@/components/layout/template";
import data from "../../data/data.json";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";

export default function Mahasiswa() {
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
              data.map((item, index) => (
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