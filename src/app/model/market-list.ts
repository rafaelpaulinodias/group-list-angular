import { Item } from './item';

export class MarketList {
    name: string;
    totalInCart: number;
    total: number;
    items: Array<Item>;

    constructor(name?: string) {
        if (name) {
            this.name = name;
        }
        this.items = new Array<Item>();
        this.total = 0;
        this.totalInCart = 0;
    }

    add(item: Item) {
        if (item.name.trim() == "") {
            throw new Error("the name cannot be empty");
        }

        if (this.findItemByName(item.name)) {
            throw new Error("this item has already been inserted");
        }
        this.addToTotal(item);
        let newItem = new Item(item.name, item.amount, item.price);
        this.items.push(newItem);
    }

    remove(item: Item) {
        const index = this.items.indexOf(item);
        this.subFromTotal(this.items[index]);
        this.items.splice(index, 1);
    }

    putInCart(item: Item) {
        const index = this.items.indexOf(item);
        this.items[index].inCart = true;
        this.totalInCart += this.items[index].total;
    }

    removeFromCart(item: Item) {
        const index = this.items.indexOf(item);
        this.items[index].inCart = false;
        this.totalInCart -= this.items[index].total;
    }

    addToTotal(item: Item) {
        this.total += item.total;
        if (item.inCart) {
            this.totalInCart += item.total;
        }
    }

    subFromTotal(item: Item) {
        this.total -= item.total;
        if (item.inCart) {
            this.totalInCart -= item.total;
        }
    }

    findItemByName(itemName: string) {
        const result = this.items.find( ({ name }) => name.toLocaleUpperCase() === itemName.toUpperCase() );
        return result;
    }

}