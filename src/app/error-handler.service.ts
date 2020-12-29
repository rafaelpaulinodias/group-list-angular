import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MdcSnackbarService } from '@blox/material';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private snackbar: MdcSnackbarService,
    private route: Router
  ) { }

  handler(error: any) {
    let msg: string = "Ocorreu um erro desconhecido.";

    console.log(error);
    if (error instanceof HttpErrorResponse && error.status >= 400 && error.status <= 499) {
      msg = "Erro ao processar a informação"
      if (error.status === 401 && this.route.url === '/login') {
        msg = "Usuário ou senha invalido(s)!"
      }
      if (error.status === 400 && this.route.url === '/home') {
        msg = "O nome da lista não pode ser em branco."
      }
    }

    if (error instanceof Error) {
      msg = error.message;
    }

    this.showSnackbar(msg);
  }

  showSnackbar(message: string) {
    this.snackbar.show({message: message, actionOnBottom: false, timeout: 3000})
      .afterHide()
      .subscribe(()=>{
        document.getElementsByClassName('mdc-snackbar').item(0).remove();
        this.snackbar = new MdcSnackbarService()
      });
  }
}
