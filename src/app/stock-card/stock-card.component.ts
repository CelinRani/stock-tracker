import { StockData } from '../model/stockData.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit {
  @Input() public stockData: StockData | undefined;
  @Output() public deleteClick: EventEmitter<string> = new EventEmitter();
  private localStorageKey = 'StockData';
  constructor(private router: Router) { }

  ngOnInit() {}

  onDelete() {
    if (this.stockData) {
      this.deleteClick.emit(this.stockData.companyData.symbol);
    }
  }
  moveToSentimentPage() {
    this.router.navigateByUrl('sentiment/' + this.stockData?.companyData.symbol);
  }
}

