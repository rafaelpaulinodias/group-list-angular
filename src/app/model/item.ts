export class Item {
    name: string;
    amount: number;
    price: number;
    total: number;
    inCart: boolean;

    constructor(name: string, amount: number, price: number, inCart: boolean) {
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.inCart = inCart;
        this.updateTotal();
    }

    update (name: string, amount: number, price: number) {
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.updateTotal();
    }

    updateTotal() {
        this.total = this.amount * this.price;
    }

}