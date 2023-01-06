
import { HistoryData } from '../model/history.model';
import { StockCompanyName } from '../model/stockCompanyName.model';
import { StockResult } from '../model/stockResult.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentStockData } from '../model/currentStockData.model';
import { CurrentStockRawValue } from '../model/currentStockRawValue.model';
import { HistoryDetail } from '../model/historyDetail.model';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {
  constructor(private http: HttpClient) { }

  apiUrl = 'https://finnhub.io/api/v1/';
  token = '&token=bu4f8kn48v6uehqi3cqg';

  getStockData(symbol: string): Observable<CurrentStockData> {
    return this.http
      .get<CurrentStockRawValue>(this.apiUrl + 'quote?symbol=' + symbol.toUpperCase() + this.token)
      .pipe(map((el) => this.mapRawValueToValidValue(el)));
  }

  getStockName(symbol: string): Observable<StockCompanyName | undefined> {

    return this.http
      .get<StockResult>(this.apiUrl + 'search?q=' + symbol.toUpperCase() + this.token)
      .pipe(map((list) => this.filterBySymbl(list, symbol)));
  }

  getStockPeriods(symbol: string, period: number): Observable<HistoryData[]> {
    const to: string = this.getLastMonth();
    const from: string = this.getDateByMonth(period);
    return this.http
      .get<HistoryDetail>(this.apiUrl + `/stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}${this.token}`)
      .pipe(map((el) => el.data));
  }

  private getLastMonth(): string {
    const toDate = new Date();
    toDate.setMonth(toDate.getMonth() - 1);
    return toDate.toISOString().split('T')[0];
  }

  private getDateByMonth(period: number): string {
    const today = new Date();
    today.setMonth(today.getMonth() - period);
    return today.toISOString().split('T')[0];
  }

  private filterBySymbl(list: StockResult, symbol: string): StockCompanyName | undefined {

    const result: StockCompanyName | undefined = list.result.find(
      (x) => x.symbol.toUpperCase() === symbol.toUpperCase());
    return result;
  }

  private mapRawValueToValidValue(value: CurrentStockRawValue): CurrentStockData {
    return {
      currentPrice: value.c,
      change: value.d,
      precentChange: value.dp,
      highPrice: value.h,
      lowPrice: value.l,
      openPrice: value.o,
      previousPrice: value.pc,
    };
  }
}
