import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  constructor(public toastCtrl: ToastController) {  }

  public show(message: string) {
    let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'bottom'
    });
    toast.present();
  }

}
