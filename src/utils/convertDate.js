export default function convertDate(date) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  let temp_date = date.split("-")

  return `${months[Number(temp_date[1]) - 1]} ${temp_date[2]}, ${temp_date[0]}`
}