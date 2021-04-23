import { Component, OnInit } from '@angular/core';
import { MarketList } from '../model/market-list';
import { Item } from '../model/item';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';
import { StringUtil } from '../utils/string-utils';
import { MdcSnackbarService } from '@blox/material';
import { ErrorHandlerService } from '../error-handler.service';

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
  showLoader: boolean;

  constructor(
    private listService: ListService,
    private routeAct: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private stringUtil: StringUtil
    ) 
    { 
      this.showLoader = true;
      const marketListId = this.routeAct.snapshot.params['marketListId']
      if (marketListId) {
        this.listService.findById(marketListId).subscribe(resp => {
          this.list.build(resp);
          this.showLoader = false;
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
      if (this.haveSameName(this.selectItemIndex, this.formItem)) {
        this.updateItem(this.selectItemIndex, this.formItem);
      } else {
        if (this.validateItem(this.formItem)) {
          this.updateItem(this.selectItemIndex, this.formItem);
        }
      }
    } else {
      if (this.validateItem(this.formItem)) {
        this.saveItem(this.formItem);
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
      this.list.updateTotal();
      this.list.updateTotalInCart();
    });
  }

  onDialogButtonExcludeClick() {
    this.removeItem(this.itemToRemove);
  }

  saveItem(item: Item) {
    this.listService.addItem(this.list.id, item).subscribe(()=>{
      this.list.addItem(this.formItem);
      this.list.updateTotal();
      this.list.updateTotalInCart();
      this.resetFormSelItem();
    });
  }

  updateItem(itemIndex: number, item: Item){
    this.listService.updateItem(this.list.id, itemIndex, item).subscribe(()=>{
      this.list.updateItem(this.selectItemIndex, this.formItem);
      this.list.updateTotal();
      this.list.updateTotalInCart();
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

  validateItem(item: Item): boolean{
    try {
      this.list.validateList(item);
      return true;
    } catch (error) {
      this.errorHandler.handler(error);
      this.resetFormSelItem();
      return false;
    }
  }

  haveSameName(itemIndex: number, item: Item): boolean {
    return item.name.toUpperCase() == this.list.items[itemIndex].name.toUpperCase();
  }

}
