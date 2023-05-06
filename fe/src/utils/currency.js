export function convertPriceToNumber(price) {
    if (!(typeof str === 'string')) return price;
    return Number(price?.replace(',', ''));
}

export function convertNumberToPrice(number) {
    if (number === undefined) {
        return;
    }
    let result = '';
    let str = JSON.stringify(number);
    for (let i = 0; i < str.length; i++) {
        if ((str.length - i) % 3 === 0 && i > 0) {
            result += '.';
        }
        result += str.charAt(i);
    }
    return result;
}
