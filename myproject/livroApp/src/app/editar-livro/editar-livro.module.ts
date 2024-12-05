import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarLivroPageRoutingModule } from './editar-livro-routing.module';

import { EditarLivroPage } from './editar-livro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarLivroPageRoutingModule
  ],
  declarations: [EditarLivroPage]
})
export class EditarLivroPageModule {}
