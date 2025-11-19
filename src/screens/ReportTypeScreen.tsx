"use client";
import Link from "next/link";

export default function ReportTypeScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container w-full max-w-2xl py-12 text-center">
        <h2 className="text-3xl font-semibold text-[var(--alabaster-grey)] mb-6">Selecciona el tipo de formulario</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          <Link href="/report/anonymous" className="card card-select p-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--royal-plum)]" />
              <div>
                <h3 className="text-xl font-medium text-[var(--royal-plum)]">Anónimo</h3>
                <p className="mt-1 text-[var(--midnight-violet)]">Tu reporte no incluirá datos de identificación.</p>
              </div>
            </div>
          </Link>
          <Link href="/report/identified" className="card card-select p-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--blackberry-cream)]" />
              <div>
                <h3 className="text-xl font-medium text-[var(--royal-plum)]">Con identificación</h3>
                <p className="mt-1 text-[var(--midnight-violet)]">Incluye tu código universitario para dar seguimiento.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}