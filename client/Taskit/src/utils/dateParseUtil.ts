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

function formatDate(dateString: string): string {
    // Parse the ISO 8601 date string
    const date = parseISO(dateString);

    // Check if the date is invalid
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }

    // Format the date string using date-fns
    const formattedDate = format(date, "EEE, MMM d yyyy 'at' h:mm a");

    return formattedDate;
}

export default parseDate;
export {formatDate}