export function convertToFloat(value: any): number {
  if (!isNaN(value)) {
    return parseFloat(value.toString().replace(',', '.').trim());
  }
  return 0;
}

export function cleanCnpjCpf(value: string): string {
  return value.replace(/\./g, '').replace('-', '').replace('/', '').trim();
}
