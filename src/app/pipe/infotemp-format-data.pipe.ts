import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infotempFormatData',
})
export class InfotempFormatDataPipe implements PipeTransform {
  transform(string: string): string {
    if (string !== null) {
      let ano = string.substring(5, 9);
      let mes = string.substring(10,12);
      let dia = string.substring(13, 15);
      let hora = string.substring(16, 18);
      let min = string.substring(19, 21);
      let seg = string.substring(22, 24);
      let dataCorreta = `${dia}/${mes}/${ano} às ${hora}:${min}:${seg}`;
      return dataCorreta;
    } else {
      return '';
    }
  }
}
