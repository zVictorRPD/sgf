export function floatToString(value: number): string {
    return value.toFixed(2).replace(".", "");
}

export function stringToDecimals(value: string): string {
    const parsedValue = parseFloat(value) / 100;
    return isNaN(parsedValue)
        ? "0,00"
        : parsedValue.toFixed(2).replace(".", ",");
}

export function onlyNumbers(value: string): string {
    // remove lettes and special characters
    return value.replace(/[^0-9]/g, '');
}