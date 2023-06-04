import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateToString'
})
export class DateToStringPipe implements PipeTransform {

  constructor() {}

  transform(value: string): Date {
    const year = value.slice(0, 4);
    const month = value.slice(4, 6);
    const day = value.slice(6, 8);

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date
  }
}
