import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalidadeCarregada } from '../model/localidade-model';

@Injectable({
  providedIn: 'root',
})
export class AiswebService {
  constructor(private httpClient: HttpClient) {}

  verificaNotam(localidade: string) {
    return this.httpClient.get(
      `https://aisweb.decea.mil.br/api/?apiKey=1948175746&apiPass=cba6ae56-a1dd-11ea-9f40-00505680c1b4&area=notam&icaocode=${localidade}`,
      { responseType: 'text' }
    );
  }

  verificaSuplemento(localidade: string) {
    return this.httpClient.get(
      `https://aisweb.decea.mil.br/api/?apiKey=1948175746&apiPass=cba6ae56-a1dd-11ea-9f40-00505680c1b4&area=suplementos&IcaoCode=${localidade}&s=n`,
      { responseType: 'text' }
    );
  }

  verificaInfotemp(localidade: string) {
    return this.httpClient.get(
      `https://aisweb.decea.mil.br/api/?apiKey=1948175746&apiPass=cba6ae56-a1dd-11ea-9f40-00505680c1b4&area=infotemp&icaoCode=${localidade}&status=1`,
      { responseType: 'text' }
    );
  }

  carregaAsLocalidades() {
    return this.httpClient.get<LocalidadeCarregada[]>(
      'https://obscure-brook-64945.herokuapp.com/localidade'
    );
  }

  adicionaLocalidade(
    localidadeSalvar: LocalidadeCarregada
  ): Observable<LocalidadeCarregada> {
    return this.httpClient.post<LocalidadeCarregada>(
      'https://obscure-brook-64945.herokuapp.com/localidade',
      localidadeSalvar
    );
  }

  deletaLocalidade(id: number) {
    return this.httpClient.delete(
      `https://obscure-brook-64945.herokuapp.com/localidade/${id}`
    );
  }
}
