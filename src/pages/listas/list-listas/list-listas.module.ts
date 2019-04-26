import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListListasPage } from './list-listas';

@NgModule({
  declarations: [
    ListListasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListListasPage),
  ],
})
export class ListListasPageModule {}
