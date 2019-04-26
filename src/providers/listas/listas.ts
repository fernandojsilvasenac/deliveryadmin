import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable()
export class ListasProvider {
  private PATH = 'listas/';
  constructor(private db: AngularFireDatabase) {}

  // public getAll(){
  //   return this.db.list(this.PATH)
  //     .snapshotChanges()
  //       .map(changes => { // aqui é uma lista para mapear
  //         return changes.map( m => ({ key: m.key, ...m.payload.val() }));
  //       })
  //     )
  // }



  // get(listasKey: string){
  //   return this.db.object(this.PATH + listasKey)
  //     .snapshotChanges()
  //     .map(m => { // aqui já é m pois eu já tenho um único objeto
  //       return {key: m.key, ...m.payload.val()};
  //     });
  // }

  save(listasData: any){
    const lista = {
      nome: listasData.nome
    };

    if (listasData.key){
      // this.db.list(this.PATH).set(categoriaData.key, categoria); atualiza somente o campo que passar e substitui tudo o que está no firebase
      this.db.list(this.PATH).update(listasData.key, lista);
    } else{
      this.db.list(this.PATH).push(lista);
    }
  }

  remove(listasKey: string){
    this.db.list(this.PATH).remove(listasKey);
  }


}
