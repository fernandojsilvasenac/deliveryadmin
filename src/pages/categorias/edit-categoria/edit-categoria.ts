import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasProvider } from './../../../providers/categorias/categorias';
import { ToastProvider } from './../../../providers/toast/toast';


@IonicPage()
@Component({
  selector: 'page-edit-categoria',
  templateUrl: 'edit-categoria.html',
})
export class EditCategoriaPage {
  title: string;
  form: FormGroup;
  categoria: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private toast: ToastProvider,
              private categoriasProvider: CategoriasProvider) {
    this.categoria = this.navParams.data.categoriaKey || {};
    this.SetupPageTitle();
    this.createForm();
                                                //objeto assíncrono, estou me inscrevendo(subscribe) e recebendo no categoriaData o que vem do get no return lin 22 do provider (categoria.ts)
                                                //this.navParams.data.categoriaKey = categoriakey do list-categoria.ts (editItemCategoria) lin 24
    const subscribe = this.categoriasProvider.get(this.navParams.data.categoriaKey).subscribe(categoriaData => {
      subscribe.unsubscribe();
      this.categoria = categoriaData;
      this.createForm();
    });

  }


  private SetupPageTitle(){
    if (this.navParams.data.categoriaKey){
      this.title = 'Alterando categoria';
    } else {
      this.title = 'Nova categoria';
    }
  }

  private createForm(){
    this.form = this.formBuilder.group({
      key: [this.categoria.key],
      nome: [this.categoria.nome, Validators.required]
    })
  }

  onSubmit(){
    if (this.form.valid) {
      this.categoriasProvider.save(this.form.value);
      this.toast.show('Categoria salva com sucesso');
      // this.toast.create({ message: 'Categoria salva com sucesso', duration: 3000}).present();
      this.navCtrl.pop();
    }
  }


}
