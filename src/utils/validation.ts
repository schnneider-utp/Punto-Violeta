export function isValidUniversityCode(code: string) {
  const digits = code.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 10;
}