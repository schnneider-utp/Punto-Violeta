"use client";
import Link from "next/link";

export default function HomeScreen() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="container flex-1 flex items-center">
        <section className="w-full max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--alabaster-grey)]">Punto Violeta UTP</h1>
          <p className="mt-3 text-lg text-[var(--alabaster-grey)]/90">Mecanismo estudiantil para apoyar a la comunidad académica de la Universidad Tecnológica de Pereira.</p>
          <div className="card mt-8 p-8">
            <p className="text-[var(--midnight-violet)] text-lg">Este espacio facilita reportes y acompañamiento de situaciones dentro de la UTP. Tu participación ayuda a construir una comunidad segura y solidaria.</p>
            <div className="mt-6">
              <Link href="/report" className="btn-primary">Continuar</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}