function titleCase(input: string): string {
    return input.replace(/\b\w/g, (match) => match.toUpperCase());
}

export default titleCase