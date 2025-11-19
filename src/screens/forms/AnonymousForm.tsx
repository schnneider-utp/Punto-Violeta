"use client";
import { useState } from "react";
import { submitReport } from "@/services/reportService";

export default function AnonymousForm() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [occurredAt, setOccurredAt] = useState("");
  const [hasWitnesses, setHasWitnesses] = useState<"yes" | "no" | "unknown">("unknown");
  const [situationTypes, setSituationTypes] = useState<string[]>([]);
  const [relationship, setRelationship] = useState("desconocido");
  const [urgency, setUrgency] = useState("media");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function toggleType(t: string) {
    setSituationTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitReport({
        type: "anonymous",
        description,
        location,
        occurredAt,
        hasWitnesses: hasWitnesses === "yes",
        situationTypes,
        relationship,
        urgency: urgency as "baja" | "media" | "alta",
      });
      setStatus("success");
      setDescription("");
      setLocation("");
      setOccurredAt("");
      setHasWitnesses("unknown");
      setSituationTypes([]);
      setRelationship("desconocido");
      setUrgency("media");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="container w-full max-w-xl py-12">
        <div className="card p-8">
          <h2 className="text-2xl font-semibold text-[var(--midnight-violet)] mb-6">Datos sobre la gestión de la denuncia</h2>
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2">
            <label className="text-[var(--midnight-violet)]">Descripción del hecho
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 w-full border rounded-md p-3 h-32 focus:outline-none focus:ring-2 ring-[var(--royal-plum)]" placeholder="Describe la situación" required />
            </label>
            <label className="text-[var(--midnight-violet)]">¿Dónde ocurrió?
              <input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-2 w-full border rounded-md p-3 focus:outline-none focus:ring-2 ring-[var(--royal-plum)]" placeholder="Lugar o dependencia" required />
            </label>
            <label className="text-[var(--midnight-violet)]">Aproximadamente ¿Cuándo?
              <input type="datetime-local" value={occurredAt} onChange={(e) => setOccurredAt(e.target.value)} className="mt-2 w-full border rounded-md p-3 focus:outline-none focus:ring-2 ring-[var(--royal-plum)]" />
            </label>
            <div className="text-[var(--midnight-violet)]">
              <span>¿Hay testigos?</span>
              <div className="mt-2 flex gap-3">
                <label className="flex items-center gap-2">
                  <input type="radio" name="witnesses" checked={hasWitnesses === "yes"} onChange={() => setHasWitnesses("yes")} /> Sí
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="witnesses" checked={hasWitnesses === "no"} onChange={() => setHasWitnesses("no")} /> No
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="witnesses" checked={hasWitnesses === "unknown"} onChange={() => setHasWitnesses("unknown")} /> No estoy seguro
                </label>
              </div>
            </div>
            <div className="text-[var(--midnight-violet)]">
              <span>Tipo de situación</span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {["Acoso verbal","Físico","Hostigamiento","Maltrato psicológico","Digital","Amenaza","Discriminación"].map((t) => (
                  <label key={t} className="flex items-center gap-2">
                    <input type="checkbox" checked={situationTypes.includes(t)} onChange={() => toggleType(t)} /> {t}
                  </label>
                ))}
              </div>
            </div>
            <label className="text-[var(--midnight-violet)]">Relación víctima-persona implicada
              <select value={relationship} onChange={(e) => setRelationship(e.target.value)} className="mt-2 w-full border rounded-md p-3 focus:outline-none">
                <option value="profesor">Profesor</option>
                <option value="estudiante">Estudiante</option>
                <option value="administrativo">Administrativo</option>
                <option value="desconocido">Desconocido</option>
              </select>
            </label>
            <label className="text-[var(--midnight-violet)]">Nivel de urgencia o riesgo
              <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="mt-2 w-full border rounded-md p-3 focus:outline-none">
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
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