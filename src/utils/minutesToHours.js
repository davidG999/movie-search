export default function minutesToHours(m) {
  return `${Math.trunc(m / 60)}h ${m % 60}m`
}