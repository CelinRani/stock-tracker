import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackComponent } from './track/track.component';
import { SentimentDetailsComponent } from './sentiment-details/sentiment-details.component';
import { StockCardComponent } from './stock-card/stock-card.component';
import { MonthNamePipe } from './pipe/monthName.pipe';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';

const ngx: NgxUiLoaderConfig =
{
  "bgsColor": "red",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 1,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#153dff",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "three-strings",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": false,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

@NgModule({
  declarations: [
    AppComponent,
    SentimentDetailsComponent,
    StockCardComponent,
    MonthNamePipe,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngx),
    NgxUiLoaderHttpModule.forRoot({ 
      showForeground: true,
   }),
    BrowserAnimationsModule,
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
