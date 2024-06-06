function parseDate(dateString: string) {
    // Replace 'at' with a comma to create a format that can be parsed by the Date constructor
    const dateToParse = dateString.replace(' at', ',');
    return new Date(dateToParse);
}

export default parseDate