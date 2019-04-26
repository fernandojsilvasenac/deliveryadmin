import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListProdutosPage } from './list-produtos';

@NgModule({
  declarations: [
    ListProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListProdutosPage),
  ],
})
export class ListProdutosPageModule {}
