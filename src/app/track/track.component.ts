
import { StockData } from '../model/stockData.model';
import { forkJoin } from 'rxjs';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { StockDataService } from '../service/stock-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit ,OnDestroy{
  inputVal: string = '';
  emptyData: boolean = false;
  duplicateVal: boolean = false;
  isDelete : boolean = false;

  stockArray: StockData[] | undefined;

  private localStorageKey = 'StockData';
  constructor(private stockDataService: StockDataService, private aRoute : ActivatedRoute) { }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.saveData();
  }

  ngOnInit(): void {
    const localStorageItems = localStorage.getItem(this.localStorageKey);
    if (localStorageItems) {
      this.stockArray = JSON.parse(localStorageItems);
    }
   
  }
 
  ngOnDestroy(): void {
    this.saveData();
  }

  onDelete(symbol: string): void {
    if (this.stockArray) {
      this.stockArray = this.stockArray.filter(
        (x) => x.companyData.symbol !== symbol
      );
    }
  }

  onTrack(): void {
    if (this.inputVal) {
      this.emptyData = false;
      this.duplicateVal = false;
      if (!this.isDuplicateVal()) {
      this.searchSymbol();
      } else {
        this.duplicateVal = true;
      }
      this.inputVal=''
    }
  }

  private saveData() {
    localStorage.removeItem(this.localStorageKey);
    if (this.stockArray && this.stockArray.length !== 0) {
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.stockArray)
      );
    }
  }

  private isDuplicateVal(): boolean {
    if (this.stockArray && this.stockArray.length !== 0) {
      let duplicateVal = this.stockArray.find(
        (x) => x.companyData.symbol.toUpperCase() === this.inputVal.toUpperCase()
      );
      return !!duplicateVal;
    }
    return false;
  }

  private searchSymbol(): void {
    forkJoin({
      companyData: this.stockDataService.getStockName(this.inputVal),
      value: this.stockDataService.getStockData(this.inputVal),
    }).subscribe((result) => {
      if (result.companyData && result.value) {
        const findSymbol: StockData = {
          companyData: result.companyData,
          value: result.value,
        };
        this.stockArray
          ? this.stockArray.push(findSymbol)
          : (this.stockArray = [findSymbol]);
        this.saveData();
      } else {
        this.emptyData = true;
      }
    });
  }
}
