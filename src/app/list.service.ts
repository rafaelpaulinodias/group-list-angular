import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MarketList } from './model/market-list';
import { Item } from './model/item'

@Injectable({
  providedIn: 'root'
})
export class ListService {

  url = `${environment.apiUrl}/market-list`;

  constructor(
    private http: HttpClient
  ) { }

  listAll(): Observable<Array<MarketList>> {
    return this.http.get<Array<MarketList>>(this.url).pipe(take(1));
  }

  findById(marketListId: string): Observable<MarketList> {
    return this.http.get<MarketList>(`${this.url}/${marketListId}`).pipe(take(1));
  }

  save(marketList: MarketList): Observable<MarketList> {
    return this.http.post<MarketList>(this.url, marketList).pipe(take(1));
  }

  update(marketList: MarketList): Observable<MarketList> {
    return this.http.put<MarketList>(`${this.url}/${marketList.id}`, marketList).pipe(take(1));
  }

  delete(marketListId: string) {
    return this.http.delete(`${this.url}/${marketListId}`).pipe(take(1));
  }

  addItem(marketListId: string, item: Item) {
    return this.http.put(`${this.url}/${marketListId}/add-item`, item).pipe(take(1));
  }

  updateItem(marketListId: string, itemIndex: number, item: Item) {
    return this.http.put(`${this.url}/${marketListId}/update-item/${itemIndex}`, item).pipe(take(1));
  }

  removeItem(marketListId: string, itemIndex: number) {
    return this.http.delete(`${this.url}/${marketListId}/remove-item/${itemIndex}`).pipe(take(1));
  }

  setItemInCart(marketListId: string, itemIndex: number, inCart: boolean) {
    return this.http.put(`${this.url}/${marketListId}/set-item-in-cart/${itemIndex}`, inCart).pipe(take(1));
  }

}
