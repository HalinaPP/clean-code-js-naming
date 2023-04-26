const os = require('os');

const TABLE_CORNER = '+';
const TABLE_VERTICAL_BORDER = '|';
const TABLE_HORIZONTAL_BORDER = '-';
const TABLE_CONTENT_DIVIDER = ' _ ';

function repeatSymbol(symbol, times) {
    let repeatedSymbol = '';
    for (let i = 0; i < times; i++) {
        repeatedSymbol += symbol;
    }
    return repeatedSymbol;
}

function formatKeyValue(key, value) {
    const tableContent = key + TABLE_CONTENT_DIVIDER + value;
    const tableHorizontalLine = repeatSymbol(TABLE_HORIZONTAL_BORDER, tableContent.length);

    return TABLE_CORNER + tableHorizontalLine + TABLE_CORNER + os.EOL
         + TABLE_VERTICAL_BORDER+ tableContent + TABLE_VERTICAL_BORDER + os.EOL
         + TABLE_CORNER + tableHorizontalLine + TABLE_CORNER + os.EOL;
}

function main() {
    console.log(formatKeyValue('enable', 'true'));
    console.log(formatKeyValue('name', 'Bob'));
}

main();
