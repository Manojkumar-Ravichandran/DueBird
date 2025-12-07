"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddReminder() {
  const r = useRouter();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    dueDate: "",
    category: "bill",
    repeat: "monthly",
  });

  const update = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/reminders`,
      form,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    r.push("/reminders");
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Add Reminder</h1>

        <form onSubmit={submit} className="mt-4 bg-white shadow p-4 rounded w-96">

          <input className="w-full border p-2 rounded mb-3" placeholder="Title"
            onChange={(e) => update("title", e.target.value)} />

          <input className="w-full border p-2 rounded mb-3" placeholder="Amount" type="number"
            onChange={(e) => update("amount", e.target.value)} />

          <input className="w-full border p-2 rounded mb-3" type="date"
            onChange={(e) => update("dueDate", e.target.value)} />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Add Reminder
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
