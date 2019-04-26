import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'ListProdutosPage';
  tab2Root = 'ListCategoriaPage';
  tab3Root = 'SobrePage';

  constructor() {

  }
}
