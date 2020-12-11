export class Item {
    name: string;
    amount: number;
    price: number;
    total: number;
    inCart: boolean;

    constructor(name?: string, amount?: number, price?: number, inCart?: boolean) {
        name ? this.name = name.toUpperCase() : this.name = "";
        amount ? this.amount = amount : this.amount = 1;
        price ? this.price = price : this.price = 0;
        this.inCart = inCart;
        this.calcTotal();
    }

    parse(item: Item) {
        this.name = item.name.toUpperCase();
        this.amount = item.amount;
        this.price = item.price;
        this.inCart = item.inCart;
        this.calcTotal();
    }

    update (name: string, amount: number, price: number) {
        this.name = name.toUpperCase();
        this.amount = amount;
        this.price = price;
        this.calcTotal();
    }

    calcTotal() {
        this.total = this.amount * this.price;
    }

}