export function removeEmptyFields(obj: any): any {
    // Return the value if it's not an object or is null
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // If it's an array, filter out empty elements and apply the function recursively
    if (Array.isArray(obj)) {
        return obj.map(removeEmptyFields).filter(item => item !== undefined && item !== null && item !== '');
    }

    // For objects, reduce to remove empty fields
    return Object.entries(obj).reduce((acc: Record<string, any>, [key, value]) => {
        // Check if value is valid (not undefined, null, or empty)
        if (value !== undefined && value !== null && value !== '' && !(typeof value === 'object' && Object.keys(value).length === 0)) {
            acc[key] = removeEmptyFields(value);
        }
        return acc;
    }, {});
}
