"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  const loadSummary = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/summary`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    setSummary(res.data);
  };

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6">

        {/* --- HEADER --- */}
        <div className="bg-white/70 backdrop-blur-lg shadow-md p-6 rounded-xl mb-6">
          <h1 className="text-3xl font-bold">Welcome to DueBird</h1>
          <p className="text-gray-600 mt-1">
            Track bills, subscriptions & reminders effortlessly.
          </p>
        </div>

        {/* --- SUMMARY CARDS --- */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl rounded-2xl hover:scale-[1.02] transition">
              <h2 className="text-lg opacity-90">Total Monthly Bills</h2>
              <p className="text-4xl font-bold mt-3">₹{summary.totalMonthly}</p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white shadow-xl rounded-2xl border hover:scale-[1.02] transition">
              <h2 className="text-xl font-semibold">Active Reminders</h2>
              <p className="text-4xl mt-3 text-blue-600 font-bold">
                {summary.upcoming.length}
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white shadow-xl rounded-2xl border hover:scale-[1.02] transition">
              <h2 className="text-xl font-semibold">Next Due</h2>
              <p className="text-lg mt-3 text-gray-700">
                {summary.upcoming[0]
                  ? new Date(summary.upcoming[0].dueDate).toDateString()
                  : "No upcoming reminders"}
              </p>
            </div>

          </div>
        )}

        {/* --- UPCOMING REMINDERS --- */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-bold ">Upcoming</h2>
            <Link
              href="/reminders"
              className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            {summary?.upcoming?.length ? (
              summary.upcoming.map((r) => (
                <div key={r._id} className="border-b py-3 flex justify-between">
                  <div>
                    <p className="font-semibold">{r.title}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(r.dueDate).toDateString()}
                    </p>
                  </div>
                  <div className="text-blue-600 font-bold">₹{r.amount}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 p-3">No upcoming reminders</p>
            )}
          </div>
        </div>

      </div>
    </ProtectedRoute>
  );
}
