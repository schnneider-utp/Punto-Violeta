type ReportPayload = {
  type: "anonymous" | "identified";
  title: string;
  description: string;
  code?: string;
};

export async function submitReport(payload: ReportPayload) {
  await new Promise((r) => setTimeout(r, 400));
  console.log("report submitted", payload);
  return { ok: true };
}