export function convertToFloat(value: any): number {
  return parseFloat(value.toString().replace(',', '.').trim());
}

export function cleanCnpjCpf(value: string): string {
  return value.replace(/\./g, '').replace('-', '').replace('/', '').trim();
}
