import { Component, OnInit } from '@angular/core';
import { MarketList } from '../model/market-list';
import { Item } from '../model/item';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';
import { StringUtil } from '../utils/string-utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: MarketList = new MarketList("");
  formItem: Item = new Item();
  selectItemIndex: number = 0;
  itemToRemove: Item = new Item();
  editing: boolean = false;
  timeMousePress: Date;

  constructor(
    private listService: ListService,
    private routeAct: ActivatedRoute,
    private stringUtil: StringUtil
    ) 
    {
      const marketListId = this.routeAct.snapshot.params['marketListId']
      if (marketListId) {
        this.listService.findById(marketListId).subscribe(resp => {
          this.list.build(resp);
        });
      }
    }

  ngOnInit(): void {}

  onEnterUp(event) {
    const inputs = document.getElementsByTagName('input');
    const tabIndex = event.target.tabIndex;
    inputs[tabIndex + 1].focus();
  }

  onListItemClick(item: Item) {
    this.placeItemToEdit(item);
  }

  onItemDblClick(item: Item) {
    this.itemToRemove = item;  
  }
  
  onEnterKeyDownInputPrice() {
    if (this.editing) {
      if(this.formItem.name.toUpperCase() != this.list.items[this.selectItemIndex].name.toUpperCase()) {
        try {
          this.list.validateList(this.formItem);
          this.updateItem(this.selectItemIndex, this.formItem);
        } catch (error) {
          alert(error);
          this.resetFormSelItem();
        }
      }
    } else {
      try {
        this.list.validateList(this.formItem);
        this.saveItem(this.formItem);
      } catch (error) {
        alert(error);
        this.resetFormSelItem();
      }
    }
  }

  onButtomCartClick(item: Item) {
    const listId = this.list.id;
    const itemIndex = this.list.items.indexOf(item);
    item.inCart = !item.inCart;
    this.listService.updateItem(listId, itemIndex, item).subscribe(() => {
      if (item.inCart) {
        this.list.putInCart(item);
      } else {
        this.list.removeFromCart(item);
      }
    });
  }

  onDialogButtonExcludeClick() {
    this.removeItem(this.itemToRemove);
  }

  saveItem(item: Item) {
    this.listService.addItem(this.list.id, item).subscribe(()=>{
      this.list.addItem(this.formItem);
      this.resetFormSelItem();
    });
  }

  updateItem(itemIndex: number, item: Item){
    this.listService.updateItem(this.list.id, itemIndex, item).subscribe(()=>{
      this.list.updateItem(this.selectItemIndex, this.formItem);
      this.resetFormSelItem();
    });
  }

  removeItem(item: Item) {
    const listId = this.list.id;
    const itemIndex = this.list.items.indexOf(item);
    this.listService.removeItem(listId, itemIndex).subscribe(() => {
      this.list.removeItem(item);
      this.resetFormSelItem();
    });
  }

  placeItemToEdit(item: Item) {
    this.selectItemIndex = this.list.items.indexOf(item);
    this.formItem = new Item();
    this.formItem.parse(item)
    this.formItem.name = this.stringUtil.toTitleCase(item.name);
    this.editing = true;
    document.getElementsByTagName('input')[0].focus();
  }

  resetFormSelItem() {
    this.formItem = new Item();
    this.editing = false;
    document.getElementsByTagName('input')[0].focus();
  }

}
