export default function convertDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  let temp_date = date.split("-")

  return `${months[Number(temp_date[1]) - 1]} ${temp_date[2]}, ${temp_date[0]}`
}