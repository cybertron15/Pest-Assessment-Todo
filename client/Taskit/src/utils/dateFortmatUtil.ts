import parseDate from "./dateParseUtil";


function formatDate(date: string): string {
    const formatedDate = parseDate(date)
    const year = formatedDate.getFullYear();
    const month = String(formatedDate.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(formatedDate.getDate()).padStart(2, '0');
    const hours = String(formatedDate.getHours()).padStart(2, '0');
    const minutes = String(formatedDate.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export default formatDate