const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
const formattedTime = new Date().toLocaleTimeString("en-US", timeOptions);
console.log(formattedTime); // Example: "02:30:45 PM"

export default formattedTime;