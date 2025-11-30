"use client";

import { useApplyStore, type Application } from "./store/applyStore";
import { Button } from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

export default function AdminPage() {
  const { applications } = useApplyStore();

  const handleDownloadCV = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
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
        row.original.cvFile ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleDownloadCV(row.original.cvFile)}
          >
            Download CV
          </Button>
        ) : (
          <span className="text-gray-400 font-thin text-sm">No CV</span>
        )
      ),
    },
  ];

  if (!applications.length) return <p>No applications yet.</p>;

  return (
    <div className="w-4/5 mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-medium mb-6">Admin Panel</h1>
      <MaterialReactTable
        columns={columns}
        data={applications}
        enableSorting
        enableGlobalFilter
      />
    </div>
  );
}
