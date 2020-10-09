import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'longString'
})
export class LongStringPipe implements PipeTransform {
  private strtLength: number = 250;

  transform(value: string, ...args: unknown[]): unknown {
    if (value && value.length > this.strtLength) {
      this.strtLength = args.length > 0 ? <number> args[0] : this.strtLength;
      return value.substring(0, this.strtLength) + '...';
    }
    return value;
  }

}
