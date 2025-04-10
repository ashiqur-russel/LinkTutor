"use client";

import LinkTutorTable from "@/components/ui/core/LinkTutorTable";
import { formatDate } from "@/lib/formatDate";
import { IPaymentHistory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

type PaymentHistoryProps = {
  pamymentHistory: IPaymentHistory[];
  role: string;
};

const PaymentHistory = ({ pamymentHistory, role }: PaymentHistoryProps) => {
  const columns: ColumnDef<IPaymentHistory>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">
            {formatDate(new Date(row.original.createdAt))}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => <span>{row.original.booking?.subject || null}</span>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <span>{row.original.amount}</span>,
    },
    {
      accessorKey: `${role === "tutor" ? "student" : "tutor"}`,
      header: `${role === "tutor" ? "Student" : "Tutor"}`,
      cell: ({ row }) => (
        <span>
          {role === "tutor"
            ? row.original.student?.name
            : row.original.tutor?.name}
        </span>
      ),
    },
    {
      accessorKey: `${role === "tutor" ? "student.classLevel" : "tutor.name"}`,
      header: `${role === "tutor" ? "Class Level" : ""}`,
      cell: ({ row }) => (
        <span>{role === "tutor" ? row.original.student?.classLevel : ""}</span>
      ),
    },
    {
      accessorKey: "staus",
      header: "Status",
      cell: ({ row }) => (
        <span className="border rounded-full px-3 pb-1 cursor-pointer border-green-800 hover:bg-amber-600">
          {row.original.status}
        </span>
      ),
    },
  ];

  return (
    <div className="container mx-auto h-screen">
      <h1 className="text-3xl pb-7 font-sans">My Payment History</h1>
      {pamymentHistory?.length > 0 ? (
        <LinkTutorTable columns={columns} data={pamymentHistory} />
      ) : (
        <p>No payment history available.</p>
      )}{" "}
    </div>
  );
};

export default PaymentHistory;
