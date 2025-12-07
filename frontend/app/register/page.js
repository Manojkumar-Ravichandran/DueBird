"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const r = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      name,
      email,
      password,
    });

    r.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={submit}
        className="bg-white shadow-lg p-6 rounded-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        <input className="w-full border p-2 rounded mb-3" placeholder="Name" onChange={(e) => setName(e.target.value)} />

        <input className="w-full border p-2 rounded mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

        <input className="w-full border p-2 rounded mb-3" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
