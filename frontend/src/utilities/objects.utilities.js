/**
 * Filters out entries from an object where the values are null or empty strings.
 *
 * This function takes an object and returns a new object with only those key-value pairs where
 * the value is neither `null` nor an empty string. This can be useful for cleaning up data
 * before sending it to a server or processing it further.
 *
 * @param {Object} obj - The object to be filtered.
 * @returns {Object} - A new object with entries where the values are not null or empty.
 */
export const filterNonEmptyFields = (obj) => {
    const entries = Object.entries(obj);
    // Filter out entries where the value is null or an empty string
    const filteredEntries = entries.filter(([_, value]) => value !== null && value !== "");
    return Object.fromEntries(filteredEntries);
};
