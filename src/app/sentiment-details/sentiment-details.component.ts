
import { HistoryData } from '../model/history.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockDataService } from '../service/stock-data.service';
import { StockCompanyName } from '../model/stockCompanyName.model';

@Component({
  selector: 'app-sentiment-details',
  templateUrl: './sentiment-details.component.html',
  styleUrls: ['./sentiment-details.component.css']
})
export class SentimentDetailsComponent implements OnInit {
  public symbol: string;
  public stockItems: HistoryData[] | undefined;
  public companyName!: string;
  public companyArray: StockCompanyName = {
    description: '',
    displaySymbol: '',
    symbol: '',
    type: ''
  };
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stockDataService: StockDataService
  ) { this.symbol = activatedRoute.snapshot.params['symbol']}

  ngOnInit() {
    this.stockDataService.getStockPeriods(this.symbol, 3).subscribe((x) => {
      if (x) {
        this.stockItems = x;
      }
    });
    this.getData();
  };

  onBack() {
    this.router.navigateByUrl('/');
  }
  getData() {
    this.stockDataService.getStockName(this.symbol).subscribe((data) => {
      if (data) {
        this.companyArray = data;
        this.companyName = this.companyArray.description;
      }
      console.log(this.companyArray);
    })
  }
}


