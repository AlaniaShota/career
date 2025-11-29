"use client";


import { useApplyStore, type Application } from "./store/applyStore";
import { jsPDF } from "jspdf";
import { Button } from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

export default function AdminPage() {
  const { applications } = useApplyStore();

  const handleDownloadPDF = (app: Application) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Job Application: ${app.jobTitle || "N/A"}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${app.name} ${app.lastName}`, 10, 30);
    doc.text(`Email: ${app.email}`, 10, 40);
    doc.text(`Phone: ${app.number}`, 10, 50);
    if (app.linkedin) doc.text(`LinkedIn: ${app.linkedin}`, 10, 60);
    if (app.portfolio) doc.text(`Portfolio: ${app.portfolio}`, 10, 70);
    if (app.cvFileName) doc.text(`CV File: ${app.cvFileName}`, 10, 80);
    doc.save(`${app.name}_${app.lastName}_Application.pdf`);
  };

  const columns: MRT_ColumnDef<Application>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "number", header: "Phone" },
    { accessorKey: "jobTitle", header: "Job" },
    { accessorKey: "submittedAt", header: "Submitted At", 
      Cell: ({ cell }) => cell.getValue<string>() ? new Date(cell.getValue<string>()).toLocaleString() : '-' },
    {
      id: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleDownloadPDF(row.original)}
        >
          Download PDF
        </Button>
      ),
    },
  ];

  if (!applications.length) return <p>No applications yet.</p>;

  return (
    <div className="w-4/5 mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <MaterialReactTable columns={columns} data={applications} enableSorting enableGlobalFilter />
    </div>
  );
}
