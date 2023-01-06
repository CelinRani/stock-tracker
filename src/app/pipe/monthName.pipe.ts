import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {
  transform(value: number):string {
    const monthNames  = [ '','JANUARY', 'FEBURARY','MARCH', 'APRIL','MAY','JUNE','JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return monthNames[value];
  }

}
