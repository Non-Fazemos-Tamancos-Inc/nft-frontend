export function formatCurrency(value: number | undefined): string {
  if (value == null) {
    return '?'
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(value)
}
