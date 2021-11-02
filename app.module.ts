import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ShowComponent } from './pages/show/show.component';
import { ShowWithIdComponent } from './pages/show-with-id/show-with-id.component';
import { ApiserviceService } from './ApiService/apiservice.service';
import { UpdateComponent } from './pages/update/update.component';
import { CardComponent } from './pages/card/card.component';
import { QrCodeComponent } from './pages/qr-code/qr-code.component';
import { QrCodeReaderService } from '../app/qr-code-reader.service';
import { QrCodeModule } from 'ng-qrcode';

import { ZXingScannerModule } from 'angular-weblineindia-qrcode-scanner';/* scanar */
//import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgQrScannerModule } from 'angular2-qrscanner';/* ex scaner */



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowComponent,
    ShowWithIdComponent,
    UpdateComponent,
    CardComponent,
    QrCodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    QrCodeModule,
    ZXingScannerModule,

    NgQrScannerModule,
  ],
  providers: [ApiserviceService, QrCodeReaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
