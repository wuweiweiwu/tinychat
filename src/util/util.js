export function formatAMPM(strdate) {
  let date = new Date(strdate);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 ? hours % 12 : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

export function formatDate(strdate) {
  let date = new Date(strdate);
  let year = date.getFullYear();
  let months = date.getMonth() + 1;
  let day = date.getDate()
  let today = new Date();
  let prefix = `${months}/${day}/${year}`;
  if (today.toDateString() === date.toDateString()){
    prefix = "Today"
  }
  today.setDate(today.getDate() - 1);
  if (today.toDateString() === date.toDateString()){
    prefix = "Yesterday"
  }
  return prefix;
}
