export function convertToFloat(value: any): number {
  return parseFloat(
    value.toString().replace(/\./g, '').replace(',', '.').trim()
  );
}

export function cleanCnpjCpf(value: string): string {
  return value.replace(/[^\d]+/g, '').trim();
}
