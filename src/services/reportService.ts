type ReportPayload = {
  type: "anonymous" | "identified";
  description: string;
  location: string;
  occurredAt?: string;
  hasWitnesses?: boolean;
  situationTypes: string[];
  relationship: string;
  urgency: "baja" | "media" | "alta";
  code?: string;
};

export async function submitReport(payload: ReportPayload) {
  await new Promise((r) => setTimeout(r, 400));
  console.log("report submitted", payload);
  return { ok: true };
}