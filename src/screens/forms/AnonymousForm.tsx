"use client";
import { useState } from "react";
import { submitReport } from "@/services/reportService";
import HelpTooltip from "@/components/HelpTooltip";

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

  function handleRipple(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--ripple-x", `${x}px`);
    e.currentTarget.style.setProperty("--ripple-y", `${y}px`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="container w-full max-w-xl py-12">
        <div className="card p-8">
          <h2 className="text-2xl font-semibold text-[var(--midnight-violet)] mb-6">Datos sobre la gestión de la denuncia</h2>
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2">
            <label className="text-[var(--midnight-violet)]">
              <span className="flex items-center gap-2">Descripción del hecho <HelpTooltip content="Describe lo ocurrido con el mayor detalle posible." /></span>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 w-full border rounded-md p-3 h-32 focus:outline-none focus:ring-2 ring-[var(--royal-plum)]" placeholder="Describe la situación" required />
            </label>
            <label className="text-[var(--midnight-violet)]">
              <span className="flex items-center gap-2">¿Dónde ocurrió? <HelpTooltip content="Lugar, edificio o dependencia donde sucedió." /></span>
              <input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-2 w-full border rounded-md p-3 focus:outline-none focus:ring-2 ring-[var(--royal-plum)]" placeholder="Lugar o dependencia" required />
            </label>
            <label className="text-[var(--midnight-violet)]">
              <span className="flex items-center gap-2">Aproximadamente ¿Cuándo? <HelpTooltip content="Fecha u hora aproximada del evento." /></span>
              <input type="datetime-local" value={occurredAt} onChange={(e) => setOccurredAt(e.target.value)} className="mt-2 w-full border rounded-md p-3 focus:outline-none focus:ring-2 ring-[var(--royal-plum)]" />
            </label>
            <div className="text-[var(--midnight-violet)]">
              <span className="flex items-center gap-2">¿Hay testigos? <HelpTooltip content="Indica si alguien presenció la situación." /></span>
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
              <span className="flex items-center gap-2">Tipo de situación <HelpTooltip content="Clasifica el tipo de conducta presentada." /></span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {["Acoso verbal","Físico","Hostigamiento","Maltrato psicológico","Digital","Amenaza","Discriminación"].map((t) => (
                  <label key={t} className="flex items-center gap-2">
                    <input type="checkbox" checked={situationTypes.includes(t)} onChange={() => toggleType(t)} /> {t}
                  </label>
                ))}
              </div>
            </div>
            <label className="text-[var(--midnight-violet)]">
              <span className="flex items-center gap-2">Relación víctima-persona implicada <HelpTooltip content="Relación entre tu rol y la persona implicada." /></span>
              <select value={relationship} onChange={(e) => setRelationship(e.target.value)} className="mt-2 w-full border rounded-md p-3 focus:outline-none">
                <option value="profesor">Profesor</option>
                <option value="estudiante">Estudiante</option>
                <option value="administrativo">Administrativo</option>
                <option value="desconocido">Desconocido</option>
              </select>
            </label>
            <label className="text-[var(--midnight-violet)]">
              <span className="flex items-center gap-2">Nivel de urgencia o riesgo <HelpTooltip content="Evalúa el riesgo para priorizar la atención." /></span>
              <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="mt-2 w-full border rounded-md p-3 focus:outline-none">
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </label>
          </div>
          <div className="mt-4 flex items-center justify-end gap-4">
            <button type="submit" className="btn-primary btn-6" onMouseEnter={handleRipple} onMouseMove={handleRipple}>
              <span className="btn-label">Enviar</span>
              <span className="ripple" />
            </button>
            {status === "success" && <span className="text-[var(--royal-plum)]">Reporte enviado.</span>}
            {status === "error" && <span className="text-red-600">Error al enviar.</span>}
          </div>
        </div>
      </form>
    </div>
  );
}