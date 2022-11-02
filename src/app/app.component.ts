import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { concatMap, finalize, map, Observable, of, tap } from 'rxjs';
import * as X2JS from 'x2js';

import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AisWebInfotempResp, ItemInfotemp } from './model/infotemp-model';
import { Localidade, LocalidadeCarregada } from './model/localidade-model';
import { AisWebNotamResp, ItemNotam } from './model/notam-model';
import { AisWebSupResp, SupItem } from './model/suplemento-model';
import { AiswebService } from './service/aisweb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isPesquisando = false;
  isBuscando = false;
  x2js = new X2JS();
  // localidadesPadroes = LOCALIDADES_PADRAO_PESQUISA;
  dataHora = new Date().toLocaleString();
  listaLocalidades$: Observable<Localidade[]> = of([]);
  localidadesSalvares: Localidade[] = [];
  icaoLocalidade: string;
  localidadesCarregadas$: Observable<LocalidadeCarregada[]>;
  loading = true;
  localidadePesquisa: string[];
  localidadesCarregadas: LocalidadeCarregada[];

  constructor(private service: AiswebService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.localidadesCarregadas$ = this.service
      .carregaAsLocalidades()
      .pipe(finalize(() => (this.loading = false)));
    this.localidadesCarregadas$.subscribe((carregadas) => {
      (this.localidadePesquisa = carregadas.map(
        (localidade) => localidade.icao
      )),
        (this.localidadesCarregadas = carregadas);
    });
  }

  realizaPesquisa(): void {
    for (const element of this.localidadePesquisa) {
      this.buscaInformacoes(element);
    }
    this.isPesquisando = true;
  }

  buscaInformacoes(icao: string): void {
    this.isBuscando = true;
    let localBusca: Localidade = { idIcao: icao };
    this.service
      .verificaNotam(icao)
      .pipe(
        concatMap((notam) =>
          this.service
            .verificaSuplemento(icao)
            .pipe(
              concatMap((suplemento) =>
                this.service
                  .verificaInfotemp(icao)
                  .pipe(map((infotemp) => ({ notam, suplemento, infotemp })))
              )
            )
        ),
        tap(() => (this.isBuscando = false))
      )
      .subscribe({
        next: (informacoes) =>
          (localBusca = {
            ...localBusca,
            notams: this.setItemsNotams(informacoes.notam),
            suplementos: this.setItemsSuplementos(informacoes.suplemento),
            infoTemp: this.setItemInfotemp(informacoes.infotemp),
          }),
        error: (erro) => console.log('Busca informações erro: ', erro),
        complete: () => {
          this.localidadesSalvares.push(localBusca);
          this.listaLocalidades$ = of(
            this.localidadesSalvares.sort((a, b) =>
              a.idIcao.localeCompare(b.idIcao)
            )
          );
        },
      });
  }

  setItemsNotams(item: string): ItemNotam[] {
    const listaConcat: ItemNotam[] = [];
    const notamResposta = this.x2js.xml2js<AisWebNotamResp>(item);
    const items = notamResposta.aisweb.notam?.item;
    if (items) {
      return listaConcat.concat(items);
    }
  }

  setItemsSuplementos(item: string): SupItem[] {
    const listaConcat: SupItem[] = [];
    const suplementoResp = this.x2js.xml2js<AisWebSupResp>(item);
    const items = suplementoResp.aisweb.suplementos?.item;
    if (items) {
      return listaConcat.concat(items);
    }
  }

  setItemInfotemp(item: string): ItemInfotemp[] {
    const listaConcat: ItemInfotemp[] = [];
    const infotempResp = this.x2js.xml2js<AisWebInfotempResp>(item);
    const items = infotempResp.aisweb.infotemp.item;
    if (items) {
      return listaConcat.concat(items);
    }
  }

  editaLocalidades(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: this.localidadesCarregadas,
    });
    dialogRef.afterClosed().subscribe((result) => {
      result ? this.refazPesquisa() : null;
    });
  }

  refazPesquisa(): void {
    window.location.reload();
  }
}
