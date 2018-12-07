export function sortByDateAsc(a, b) {
    if (!a.exp_date) return 1;
    if (!b.exp_date) return -1;
    if (a.exp_date > b.exp_date) return 1;
    if (a.exp_date < b.exp_date) return -1;

    return 0;
}

export function sortByDateDesc(a, b) {
    if (!a.exp_date) return -1;
    if (!b.exp_date) return 1;
    if (a.exp_date > b.exp_date) return -1;
    if (a.exp_date < b.exp_date) return 1;

    return 0;
}

export function sortByNameAsc(a, b) {
    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
}

export function sortByNameDesc(a, b) {
    return (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0);
}

export function sortByBoxAsc(a, b) {
    return (a.box > b.box) ? 1 : ((b.box > a.box) ? -1 : 0);
}

export function sortByBoxDesc(a, b) {
    return (a.box > b.box) ? -1 : ((b.box > a.box) ? 1 : 0);
}