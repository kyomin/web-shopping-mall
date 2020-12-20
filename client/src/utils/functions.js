export const numberWith3digitCommas = (num) => {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

export const isEmptyObject = (param) => {
    return Object.keys(param).length === 0 && param.constructor === Object;
}