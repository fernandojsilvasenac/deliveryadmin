import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCategoriaPage } from './list-categoria';

@NgModule({
  declarations: [
    ListCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCategoriaPage),
  ],
})
export class ListCategoriaPageModule {}
