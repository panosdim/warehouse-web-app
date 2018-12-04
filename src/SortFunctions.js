export function sortByDate(a, b) {
    if (!a.exp_date) return 1;
    if (!b.exp_date) return -1;
    if (a.exp_date > b.exp_date) return 1;
    if (a.exp_date < b.exp_date) return -1;

    return 0;
}