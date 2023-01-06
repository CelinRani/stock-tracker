import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentimentDetailsComponent } from './sentiment-details/sentiment-details.component';
import { TrackComponent } from './track/track.component';

const routes: Routes = [
  { path: 'sentiment/:symbol', component: SentimentDetailsComponent },
  { path: '**', component: TrackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
