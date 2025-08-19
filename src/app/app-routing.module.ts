import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent, // Padre
    children: [
      {
        path: 'catalogo',
        loadChildren: () => import('./modules/catalogo/catalogo.routes').then((m) => m.routes),
      },
      { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
