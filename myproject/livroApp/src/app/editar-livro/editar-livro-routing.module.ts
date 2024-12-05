import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarLivroPage } from './editar-livro.page';

const routes: Routes = [
  {
    path: '',
    component: EditarLivroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarLivroPageRoutingModule {}
