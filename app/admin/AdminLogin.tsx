"use client";

import { Loader2, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Login failed.");
      }

      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="admin-dashboard min-h-screen bg-[#05060b] px-5 py-16 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30"
        >
          <div className="mb-8 flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-400 text-black">
              <LockKeyhole size={22} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
                Admin
              </p>
              <h1 className="mt-1 text-2xl font-semibold">Dashboard Login</h1>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block space-y-2 text-sm text-white/70">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-white outline-none transition focus:border-yellow-400"
              />
            </label>
            <label className="block space-y-2 text-sm text-white/70">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-white outline-none transition focus:border-yellow-400"
              />
            </label>
          </div>

          {message ? (
            <p className="mt-5 rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-100">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-yellow-300 disabled:opacity-60"
          >
            {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}
