import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable, of } from 'rxjs';
import * as X2JS from 'x2js';

import { AiswebService } from './aisweb.service';
import { AisWebInfotempResp, ItemInfotemp } from './model/infotemp-model';
import { Localidade, LOCALIDADES_PADRAO_PESQUISA } from './model/localidade-model';
import { AisWebNotamResp, ItemNotam } from './model/notam-model';
import { AisWebSupResp, SupItem } from './model/suplemento-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isPesquisando = false;
  x2js = new X2JS();
  localidadesPadroes = LOCALIDADES_PADRAO_PESQUISA;
  dataHora = new Date().toLocaleString();
  listaLocalidades$: Observable<Localidade[]> = of([]);
  localidadesSalvares: Localidade[] = [];

  constructor(private service: AiswebService, private router: Router) {}

  ngOnInit(): void {}

  realizaPesquisa(): void {
    let icaos = LOCALIDADES_PADRAO_PESQUISA;
    // let icaos = this.localidade.replace(/\s/g, '').split(','); Quando quiser pesquisar por localidades independentes
    for (const element of icaos) {
      this.buscaInformacoes(element);
    }
    this.isPesquisando = true;
  }

  buscaInformacoes(icao: string): void {
    let localBusca: Localidade;
    this.service
      .verificaNotam(icao)
      .pipe(first())
      .subscribe((resp) => {
        let notamsArr: ItemNotam[] = [];
        const listaConcat: ItemNotam[] = [];
        const notamResposta = this.x2js.xml2js<AisWebNotamResp>(resp);
        const items = notamResposta.aisweb.notam?.item;
        if (items) {
          notamsArr = listaConcat.concat(items);
        }
        localBusca = { idIcao: icao, notams: notamsArr };
      });
    this.service
      .verificaSuplemento(icao)
      .pipe(first())
      .subscribe((resp) => {
        let supArr: SupItem[] = [];
        const listaConcat: SupItem[] = [];
        const suplementoResp = this.x2js.xml2js<AisWebSupResp>(resp);
        const items = suplementoResp.aisweb.suplementos?.item;
        if (items) {
          supArr = listaConcat.concat(items);
        }
        localBusca = { ...localBusca, suplementos: supArr };
      });
    this.service
      .verificaInfotemp(icao)
      .pipe(first())
      .subscribe((resp) => {
        let infoArr: ItemInfotemp[] = [];
        const listaConcat: ItemInfotemp[] = [];
        const infotempResp = this.x2js.xml2js<AisWebInfotempResp>(resp);
        const items = infotempResp.aisweb.infotemp.item;
        if (items) {
          infoArr = listaConcat.concat(items);
        }
        localBusca = { ...localBusca, infoTemp: infoArr };
        this.localidadesSalvares.push(localBusca);
        this.listaLocalidades$ = of(this.localidadesSalvares);
      });
  }

  refresh(): void {
    window.location.reload();
  }
}
