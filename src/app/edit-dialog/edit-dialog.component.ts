import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AiswebService } from '../service/aisweb.service';
import { LocalidadeCarregada } from './../model/localidade-model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  usuario: string;
  senha: string;
  isAutorizado = false;
  hide = true;
  localidades: Array<string>;
  icao: string;
  ultimoId: number;
  isAdicionada = false;

  constructor(
    private snackBar: MatSnackBar,
    private service: AiswebService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LocalidadeCarregada[]
  ) {
    this.ultimoId = data.at(-1).id;
  }

  login(): void {
    let user = 'dnlo';
    let pass = '@dnlo_123';
    if (this.usuario === user && this.senha === pass) {
      this.isAutorizado = true;
    } else {
      alert('Credenciais erradas! Tente novamente.');
    }
  }

  apagarLocalidade(): void {
    let localidadeApagar = this.data.find(
      (localidade) => localidade.icao === this.icao
    );
    if (localidadeApagar != null && this.localidadeExiste(this.icao)) {
      this.service.deletaLocalidade(localidadeApagar.id).subscribe({
        next: () => null,
        error: (erro) => console.log('Erro Apagar Localidade: ', erro),
        complete: () => {
          this.snackBar.open(
            `Localidade ${this.icao} apagada com sucesso!`,
            'OK',
            {
              duration: 1500,
            }
          ),
            this.localidadesEditadas();
        },
      });
    } else if (this.localidadeExiste(this.icao)) {
      this.snackBar.open(`Localidade ${this.icao} não está na lista.`, 'OK', {
        duration: 3000,
      });
    }
  }

  inserirLocalidade(): void {
    if (!this.localidadeExiste(this.icao)) {
      let localidadeAdicionar: LocalidadeCarregada = {
        id: this.ultimoId + 1,
        icao: this.icao,
      };
      this.service.adicionaLocalidade(localidadeAdicionar).subscribe({
        next: (e) => console.log(e),
        error: (erro) => console.log('Erro Inserir Localidade: ', erro),
        complete: () => {
          this.snackBar.open(
            `Localidade ${this.icao} adicionada com sucesso!`,
            'OK',
            {
              duration: 1500,
            }
          ),
            this.localidadesEditadas();
        },
      });
    } else if (this.localidadeExiste(this.icao)) {
      this.snackBar.open(`Localidade ${this.icao} já existe.`, 'OK', {
        duration: 3000,
      });
    }
  }

  localidadesEditadas() {
    this.isAdicionada = true;
    setTimeout(() => this.fecharDialog(), 2500);
  }

  localidadeExiste(icao: string): boolean {
    let existeIcao = this.data.find(
      (localidade) => localidade.icao === icao
    )?.icao;
    return icao === existeIcao ? true : false;
  }

  fecharDialog(): void {
    this.dialogRef.close(this.isAdicionada);
  }
}
