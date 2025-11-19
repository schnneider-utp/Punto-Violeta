"use client";
import { useState } from "react";
import { submitReport } from "@/services/reportService";
import { isValidUniversityCode } from "@/utils/validation";

export default function IdentifiedForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!isValidUniversityCode(code)) {
      setError("Código universitario inválido");
      return;
    }
    setStatus("submitting");
    try {
      await submitReport({ type: "identified", title, description, code });
      setStatus("success");
      setTitle("");
      setDescription("");
      setCode("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen">
      <form onSubmit={onSubmit} className="container max-w-xl py-12">
        <div className="card p-8">
          <h2 className="text-2xl font-semibold text-[var(--midnight-violet)] mb-6">Formulario con identificación</h2>
          <div className="flex flex-col gap-4">
            <label className="text-[var(--midnight-violet)]">Código universitario
              <input value={code} onChange={(e) => setCode(e.target.value)} className="mt-2 w-full border rounded-md p-3 focus:outline-none focus:ring-2 ring-[var(--royal-plum)]" placeholder="Ej. 12345678" required />
            </label>
            {error && <p className="text-red-600">{error}</p>}
            <label className="text-[var(--midnight-violet)]">Título
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full border rounded-md p-3 focus:outline-none focus:ring-2 ring-[var(--royal-plum)]" placeholder="Escribe un título" required />
            </label>
            <label className="text-[var(--midnight-violet)]">Descripción
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 w-full border rounded-md p-3 h-32 focus:outline-none focus:ring-2 ring-[var(--royal-plum)]" placeholder="Describe la situación" required />
            </label>
            <button type="submit" className="btn-primary">Enviar</button>
            {status === "success" && <p className="text-[var(--royal-plum)]">Reporte enviado.</p>}
            {status === "error" && <p className="text-red-600">Error al enviar.</p>}
          </div>
        </div>
      </form>
    </div>
  );
}