/**
 * CSV: parse your csv so easy
 * @author Sajjad Shirazy <shirazy.sajjad@gmail.com>
 */
export default class CSV {
    /**
     *
     * @param {string} csv
     * @param {string} delimetter
     */
    constructor(content, delimetter = ',') {
        this.content = content;
        this.delimetter = delimetter;
    }
    /**
     * @returns {any[][]}
     */
    toArray() {
        // https://stackoverflow.com/a/14991797
        const output = [];
        const quote = false; // true means we're inside a quoted field
        // iterate over each character, keep track of current row and column (of the returned array)
        for (let row = 0, col = 0, index = 0; index < this.content.length; index++) {
            const currentCharacter = this.content[index],
                nextCharacter = this.content[index + 1];
            output[row] = output[row] || []; // create a new row if necessary
            output[row][col] = output[row][col] || ''; // create a new column (start with empty string) if necessary

            // If the current character is a quotation mark, and we're inside a
            // quoted field, and the next character is also a quotation mark,
            // add a quotation mark to the current column and skip the next character
            if (currentCharacter == '"' && quote && nextCharacter == '"') {
                output[row][col] += currentCharacter;
                ++index;
                continue;
            }

            // If it's just one quotation mark, begin/end quoted field
            if (currentCharacter == '"') {
                quote = !quote;
                continue;
            }

            // If it's a comma and we're not in a quoted field, move on to the next column
            if (currentCharacter == this.delimetter && !quote) {
                ++col;
                continue;
            }

            // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
            // and move on to the next row and move to column 0 of that new row
            if (currentCharacter == '\r' && nextCharacter == '\n' && !quote) {
                ++row;
                col = 0;
                ++index;
                continue;
            }

            // If it's a newline (LF or CR) and we're not in a quoted field,
            // move on to the next row and move to column 0 of that new row
            if (currentCharacter == '\n' && !quote) {
                ++row;
                col = 0;
                continue;
            }
            if (currentCharacter == '\r' && !quote) {
                ++row;
                col = 0;
                continue;
            }

            // Otherwise, append the current character to the current column
            output[row][col] += currentCharacter;
        }
        return output;
    }
}
