export class Item {
    name: string;
    amount: number;
    price: number;
    total: number;
    inCart: boolean;

    constructor(name: string, amount: number, price: number) {
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.total = amount * price;
        this.inCart = false;
    }

    change (name: string, amount: number, price: number) {
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.total = amount * price;
    }

}