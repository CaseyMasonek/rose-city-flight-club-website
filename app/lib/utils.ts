export function titleCase(s:string) {
    return s.toLowerCase()
        .replaceAll(/_/g," ")
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export function uniqueStrings(arrays: string[][]): string[] {
    const flat = arrays.flat(); // Flatten into one array
    const unique = new Set(flat); // Use Set to deduplicate
    return Array.from(unique); // Convert Set back to array
}