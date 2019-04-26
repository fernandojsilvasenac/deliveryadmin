import { CategoriasProvider } from './../../../providers/categorias/categorias';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ToastProvider } from './../../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-list-categoria',
  templateUrl: 'list-categoria.html',
})
export class ListCategoriaPage {
  categorias: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private toast: ToastProvider, private categoriasProvider:CategoriasProvider) {
      this.categorias = this.categoriasProvider.getAll();
  }

  newItemCategoria() {
    this.navCtrl.push('EditCategoriaPage');
  }

  editItemCategoria(categoria: any) {                      // categoria.key é igual ao
    this.navCtrl.push('EditCategoriaPage', { categoriaKey: categoria.key });
  }

  removeItemCategoria(key: string) {
    this.categoriasProvider.remove(key);
    this.toast.show('Categoria removido com sucesso.');
  }

    // this.alertCtrl.create({
    //   title: 'Excluir' + key,
    //   message: 'Confirma a exclusão dessa categoria?',
    //   buttons:[
    //     {
    //       text: 'Cancelar'
    //     },
    //     {
    //       text: 'Excluir categoria"' + key + '"',
    //       handler:() => {
    //         this.handlerRemoveItem(item);
    //       }
    //     }
    //   ]
    // }).present();

  // handlerRemoveItem(item: Categoria) {
  //     // Verifico se pode excluír a cateogira
  //     this.categoriasProvider.canRemove(item.id)
  //         .then((result) => {
  //             if (result) {
  //                 // Caso positivo removo a categoria
  //                 this.categoriasProvider.remove(item.id)
  //                     .then((result) => {
  //                         if (result) {
  //                             // Remove o item da lista
  //                             this.items.splice(this.items.indexOf(item), 1);
  //                             this.toast.show('Categoria excluída com sucesso.');
  //                         }
  //                     })
  //                     .catch((e) => this.toast.show('Ocorreu algum erro ao excluír a categoria.'));
  //             } else {
  //                 // Caso negativo informo o motivo de não remover para o usuario
  //                 this.toast.show('Não é possível excluír a categoria pois ela já está em uso.')
  //             }
  //         })
  //         .catch((e) =>
  //             this.toast.show('Ocorreu algum erro ao verificar se pode excluír a categoria.')
  //         );
  // }


}
