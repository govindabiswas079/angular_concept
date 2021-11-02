import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShowComponent } from './pages/show/show.component';
import { ShowWithIdComponent } from './pages/show-with-id/show-with-id.component';
import { UpdateComponent } from './pages/update/update.component';
import { QrCodeComponent } from './pages/qr-code/qr-code.component';

const routes: Routes = [
  /* { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'show', component: ShowComponent },
  { path: 'showwith/:id', component: ShowWithIdComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'QrCode', component: QrCodeComponent }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { };
