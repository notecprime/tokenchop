export const roundTo4 = (value: string) => {
    let [left, right] = value.split('.');
    right = !right ? '0000' : right + '0000';
    return `${left}.${right.slice(0,4)}`;
}