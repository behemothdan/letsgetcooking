export function StringCleaner(string, applyLowerCase) {
    let cleanString = string;
    if(applyLowerCase) {
        cleanString = cleanString.toLowerCase();
    }
    cleanString = cleanString.trim();
    cleanString = cleanString.replace(/[|&;$%@"<>()+,]/g, "");
    cleanString = cleanString.replace(/<[^>]*>/g, '');
    return cleanString;
}