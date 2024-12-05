import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'livros',
    loadChildren: () => import('./livros/livros.module').then(m => m.LivrosPageModule)
  },
  {
    path: 'adicionar-livro',
    loadChildren: () => import('./adicionar-livro/adicionar-livro.module').then(m => m.AdicionarLivroPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'editar-livro/:id',  // Rota com parâmetro 'id'
    loadChildren: () => import('./editar-livro/editar-livro.module').then(m => m.EditarLivroPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)  // Página de registro
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
