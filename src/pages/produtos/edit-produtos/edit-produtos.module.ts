import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProdutosPage } from './edit-produtos';

@NgModule({
  declarations: [
    EditProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(EditProdutosPage),
  ],
})
export class EditProdutosPageModule {}
