import { Component, OnInit } from '@angular/core';
import { MarketList } from '../model/market-list';
import { Item } from '../model/item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: MarketList;

  constructor() {
    this.list = new MarketList();
    this.list.add(new Item('Arroz', 2, 5.2));
    this.list.add(new Item('Feijão', 2, 7.5));
    this.list.add(new Item('Carne', 1.8, 25.9));
    this.list.add(new Item('Tomate', 0.8, 4.3));
    const item = this.list.items[1];
    this.list.putInCart(item);
    console.log(this.list.total)
  }

  ngOnInit(): void {
  }

  onButtomCartClick(item: Item) {
    if (item.inCart) {
      this.list.removeFromCart(item);
    } else {
      this.list.putInCart(item)
    }
    console.log(item);
  }

}
