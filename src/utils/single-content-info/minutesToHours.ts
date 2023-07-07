export default function minutesToHours(m: string): string {
  return `${Math.trunc(parseInt(m) / 60)}h ${parseInt(m) % 60}m`
}