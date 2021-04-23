import { Component, OnInit } from '@angular/core';
import { MarketList } from '../model/market-list';
import { Router } from '@angular/router';
import { ListService } from '../list.service';
import { StringUtil } from '../utils/string-utils';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listName: string;

  editing: boolean = false;

  selectList: MarketList = new MarketList();

  selectListIndex: number;

  showLoader: boolean

  lists: Array<MarketList> = new Array();

  constructor(
    private router: Router,
    private listService: ListService,
    private errorHandler: ErrorHandlerService,
    private stringUtil: StringUtil
  ) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.listService.listAll().subscribe(resp => {
      resp.forEach(list => {
        let newList = new MarketList();
        newList.build(list);
        this.lists.push(newList);
        this.showLoader = false;
      })
    });
  }

  onListItemClick(marketListId: string) {
    this.router.navigate(['/list', marketListId]);
  }

  onDialogListButtonCancelClick() {
    this.listName = '';
    this.editing = false;
  }

  onListItemEditButtonClick(list: MarketList) {
    this.editing = true;
    this.listName = this.stringUtil.toTitleCase(list.name);
    this.selectList.build(list);
    this.selectListIndex = this.lists.indexOf(list);
  }

  onListItemDeleteButtonClick(list: MarketList) {
    this.selectList = list;
  }

  onDialogListButtonSaveClick() {
    if (this.editing) {
      this.selectList.name = this.listName;
      this.updeteList(this.selectList)
    } else {
      this.saveList(new MarketList(this.listName));
    }
  }

  onExclusionDialogButtonExcludeClick() {
    this.removeList(this.selectList);
  }

  saveList(list: MarketList) {
    this.listService.save(list).subscribe(
      savedList => this.addNewListInView(savedList),
      error => this.errorHandler.handler(error)
    );
  }

  updeteList(list: MarketList) {
    this.listService.update(list).subscribe(
      () => {
        this.lists[this.selectListIndex].name = list.name;
        this.resetParams();
      },
      error => this.errorHandler.handler(error)
    );
  }

  removeList(list: MarketList) {
    const index = this.lists.indexOf(list);
    this.listService.delete(this.selectList.id).subscribe(
      () => this.lists.splice(index, 1),
      error => this.errorHandler.handler(error)
    );
  }

  addNewListInView(list: MarketList) {
    let newList = new MarketList();
    newList.build(list);
    this.lists.push(newList);
    this.resetParams();
  }

  resetParams() {
    this.listName = '';
    this.editing = false;
    this.selectList = new MarketList();
  }

}
