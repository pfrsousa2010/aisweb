import { LOCALIDADES_PADRAO_PESQUISA } from '../model/localidade-model';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.localidades = LOCALIDADES_PADRAO_PESQUISA
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
    console.log('Apagar: ', this.data);
  }
//Achar uma forma de LOCALIDADES_PADRAO_PESQUISA ser editável
  inserirLocalidade(): void {
    if (this.data != null) {
      LOCALIDADES_PADRAO_PESQUISA.push(this.data)
    }
    console.log('Inserir: ', this.data);
  }

  fecharDialog(): void {
    this.dialogRef.close();
  }
}
