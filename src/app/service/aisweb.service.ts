import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalidadeCarregada } from '../model/localidade-model';

@Injectable({
  providedIn: 'root',
})
export class AiswebService {
  constructor(private httpCliente: HttpClient) {}
  private url =
    'https://aisweb.decea.mil.br/api/?apiKey=1948175746&apiPass=cba6ae56-a1dd-11ea-9f40-00505680c1b4&area=notam&icaocode=';

  verificaNotam(localidade: string) {
    return this.httpCliente.get(
      `https://aisweb.decea.mil.br/api/?apiKey=1948175746&apiPass=cba6ae56-a1dd-11ea-9f40-00505680c1b4&area=notam&icaocode=${localidade}`,
      { responseType: 'text' }
    );
  }

  verificaSuplemento(localidade: string) {
    return this.httpCliente.get(
      `https://aisweb.decea.mil.br/api/?apiKey=1948175746&apiPass=cba6ae56-a1dd-11ea-9f40-00505680c1b4&area=suplementos&IcaoCode=${localidade}&s=n`,
      { responseType: 'text' }
    );
  }

  verificaInfotemp(localidade: string) {
    return this.httpCliente.get(
      `https://aisweb.decea.mil.br/api/?apiKey=1948175746&apiPass=cba6ae56-a1dd-11ea-9f40-00505680c1b4&area=infotemp&icaoCode=${localidade}&status=1`,
      { responseType: 'text' }
    );
  }

  carregaAsLocalidades() {
    return this.httpCliente.get<LocalidadeCarregada[]>(
      'https://obscure-brook-64945.herokuapp.com/localidade'
    )
  }
}
