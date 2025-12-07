"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Reminders() {
  const [list, setList] = useState([]);

  const load = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/reminders`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    setList(res.data);
  };

  const del = async (id) => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/reminders/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold">All Reminders</h1>

        <Link href="/reminders/add" className="bg-green-600 text-white px-3 py-2 rounded mt-4 inline-block">
          + Add Reminder
        </Link>

        <div className="mt-6 bg-white shadow rounded p-4">
          {list.map((r) => (
            <div key={r._id} className="border-b p-3 flex justify-between">
              <div>
                <p className="font-semibold">{r.title}</p>
                <p className="text-sm">{new Date(r.dueDate).toDateString()}</p>
              </div>

              <div className="flex gap-3">
                <Link href={`/reminders/${r._id}/edit`} className="text-blue-600">Edit</Link>
                <button onClick={() => del(r._id)} className="text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
