/**
 * Capitalizes the first letter of the given string. If the input is not a string or is empty,
 * the function returns the original input unchanged.
 * 
 * @param {string} str - The string to capitalize.
 * @returns {string} - The string with the first letter capitalized, or the original string if input is invalid.
 */
export const capitalize = (str) => {
    if (typeof str !== 'string') return str;
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Inserts a space before each uppercase letter in the given string. Does not add a space before the first letter
 * even if it is uppercase. This function assumes that the string contains only alphabetic characters without
 * leading spaces. If the input is not a string or is empty, the function returns the original input unchanged.
 * 
 * @param {string} str - The string to modify.
 * @returns {string} - The modified string with spaces inserted, or the original string if input is invalid.
 */
export const insertSpace = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/(?<!^)([A-Z])/g, ' $1');
};
