import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDataPipe',
})
export class ConvertDataPipePipe implements PipeTransform {
  transform(string: string): string {
    if (string !== 'PERM') {
      let ano = string.substring(0, 2);
      let mes = string.substring(2, 4);
      let dia = string.substring(4, 6);
      let hora = string.substring(6, 8);
      let min = string.substring(8, 10);
      let dataCorreta = `${dia}/${mes}/${ano} às ${hora}:${min}`;
      return dataCorreta;
    } else {
      return 'PERMANENTE';
    }
  }
}
