import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html', // nome do arquivo html
})
export class SobrePage { // classe
  versao: string // propriedade

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.versao = '1.0.0'; // a variável a versão é setada um valor
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SobrePage');
  }

}
