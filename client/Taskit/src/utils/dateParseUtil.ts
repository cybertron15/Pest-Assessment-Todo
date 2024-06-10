import { parseISO, format } from 'date-fns';
function parseDate(dateString: string): Date {
    // Directly parse the ISO 8601 date string using the Date constructor
    const parsedDate = new Date(dateString);

    // Check if the date is invalid
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date string');
    }
    
    return parsedDate;
}

function formatDate(dateString:string) {
    // Split the ISO 8601 date string to extract the date and time parts
    const [datePart, timePart] = dateString.split('T');
    const [time] = timePart.split('Z');

    // Create a Date object from the date part
    const date = new Date(datePart);
    
    // Check if the date is invalid
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }

    // Extract date components
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = days[date.getUTCDay()];
    const month = months[date.getUTCMonth()];
    const dateNum = date.getUTCDate();
    const year = date.getUTCFullYear();
    const hours = parseInt(time.substring(0, 2), 10);
    const minutes = parseInt(time.substring(3, 5), 10);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    // Format the date string
    const formattedDate = `${day}, ${month} ${dateNum} ${year} at ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;

    return formattedDate;
}


export default parseDate;
export {formatDate}