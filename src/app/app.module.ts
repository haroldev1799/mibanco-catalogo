import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ModalLoaderComponent } from '@components/molecules/modals/modal-loader/modal-loader.component';
import { AppRoutingModule } from './app-routing.module';
import { CatalogoProviders } from '@modules/catalogo/catalogo.provider';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalLoaderComponent,
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
	providers: [
    MessageService,
    CatalogoProviders
  ],
})
export class AppModule {}