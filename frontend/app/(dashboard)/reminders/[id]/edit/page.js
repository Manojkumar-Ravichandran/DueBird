"use client";

import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function EditReminder() {
  const { id } = useParams();
  const r = useRouter();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    dueDate: "",
    category: "",
    repeat: "",
    notes: "",
  });

  const update = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const loadData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/reminders`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const reminder = res.data.find((r) => r._id === id);
      if (!reminder) return;

      setForm({
        title: reminder.title,
        amount: reminder.amount,
        dueDate: reminder.dueDate.split("T")[0],
        category: reminder.category,
        repeat: reminder.repeat,
        notes: reminder.notes || "",
      });

      setLoading(false);
    } catch (err) {
      alert("Error loading reminder");
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/reminders/${id}`,
      form,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    r.push("/reminders");
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <ProtectedRoute>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Reminder</h1>

        <form onSubmit={submit} className="bg-white shadow-lg p-6 rounded-xl">

          <label className="block mb-2 font-semibold">Title</label>
          <input
            className="w-full border p-2 rounded mb-4"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />

          <label className="block mb-2 font-semibold">Amount</label>
          <input
            className="w-full border p-2 rounded mb-4"
            type="number"
            value={form.amount}
            onChange={(e) => update("amount", e.target.value)}
          />

          <label className="block mb-2 font-semibold">Due Date</label>
          <input
            className="w-full border p-2 rounded mb-4"
            type="date"
            value={form.dueDate}
            onChange={(e) => update("dueDate", e.target.value)}
          />

          <label className="block mb-2 font-semibold">Notes</label>
          <textarea
            className="w-full border p-2 rounded mb-4"
            rows={3}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-3">
            Save Changes
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
