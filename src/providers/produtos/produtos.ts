import { Injectable } from '@angular/core';
// import { FirebaseApp } from 'angularfire2';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';

// import * as firebase from 'firebase';

@Injectable()
export class ProdutosProvider {
  private PATH = 'produtos/';

  // FirebaseApp é para parte de Upload de Arquivos
  // AngularFireDatabase não dá suporte para o Firebase Storage
  constructor(
    // private fb: FirebaseApp,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
    ) {}

  // consulta todos os produtos, e ordena pelo nome da Categoria
  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('categoryName'))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(m => ({ key: m.key, data: m.payload.val() }));
        })
      )
  }

  getByKey(key: string) {
    const path = this.PATH + key;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );
  }

  //pipe para o observable
  // um pipe line de execução...
  // posso chamar várias funções dentro do pipe que serão executdas na ordem...
  // as funções são operadores do rxjs feito no Import

  get(key: string){
    return this.db.object(this.PATH + key)
      .snapshotChanges().pipe(
       map(m => { // aqui já é m pois eu já tenho um único objeto
        return {key: m.key, ...m.payload.val()};
      })
      );
  }

  // file é o arquivo passando por parâmetro
  save(item: any, file: File) {
    const product = {
      name: item.name,
      description: item.description,
      imgUrl: item.imgUrl,
      price: item.price,
      categoryKey: item.categoryKey,
      categoryName: item.categoryName
    };

    if (item.key) {
      this.db.object(this.PATH + item.key).update(product).then(() => {
        // quando o usuário clicar pra salvar eu salvo o produto e se salvou com sucesso (then) e daí fazer o upload da imagem
        // Se não ficaria assim: this.db.object(this.PATH + item.key).update(product);
        if (file) {
          this.uploadImg(item.key, file);
        }
      });
    } else {                                // a partir do then tenho na variavel result o resultado da inclusão e pego a key que foi incluída...
      this.db.list(this.PATH).push(product).then((result: any) => {
        if (file) {
          this.uploadImg(result.key, file);
        }
      });
    }
  }


  uploadImg(key: string, file: File) {
    const filePath =  'produtos/'+key+'/'+file.name;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.snapshotChanges().pipe(
      finalize(() => {
      ref.getDownloadURL().subscribe( url => {
        this.db.object(this.PATH + key).update( {imgUrl: url, filepath: filePath })
      })
    })
    ).subscribe();



  }


  removeImg(filePath: string, key: string, atualizarProduto: boolean = true) {
    const ref = this.storage.ref(filePath);
    ref.delete();
    if (atualizarProduto) {
      this.db.object(this.PATH + key).update( {filepath: '', imgUrl: '' })
    }
  }


  remove(key: string, filePath: string) {
    this.db.object(this.PATH + key).update({ imgUrl: '' });
    this.db.list(this.PATH).remove(key);
    if (filePath) {
      this.removeImg(filePath, key, false);
    }
  }

  // Atualizar nome da Categoria no Cadastro de Produtos...
  updateCategories(categoryKey: string, categoryName: string) {
                                   // fazendo uma consulta no Produtos com essa categoria
    const subscribe = this.db.list(this.PATH, ref => ref.orderByChild('categoryKey').equalTo(categoryKey))
      .snapshotChanges().pipe(
       map(changes => {
        return changes.map(m => ({ key: m.key }));
      })          // neste subscrite Eu recebi a key do produto
      )
      .subscribe(items => {
        subscribe.unsubscribe();

        items.forEach(product => {
          this.db.object(this.PATH + product.key).update({
            categoryKey: categoryKey,
            categoryName: categoryName
          });
        });
      });
  }

}
