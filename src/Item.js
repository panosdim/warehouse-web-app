class Item {
    constructor(name, exp_date, amount, box) {
        this.name = name;
        this.exp_date = exp_date;
        this.amount = amount;
        this.box = box;
    }

    isEqual(otherItem) {
        return this.name === otherItem.name && this.exp_date === otherItem.exp_date && this.amount === otherItem.amount && this.box === otherItem.box;
    }
}

export default Item;