import { Component, OnInit, ViewChild, ElementRef, Renderer2, VERSION, OnDestroy } from '@angular/core';
import { BarcodeFormat } from 'angular-weblineindia-qrcode-scanner/library';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QrCodeReaderService } from '../../qr-code-reader.service';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  resultElement;
  value: any;
  showQRCode: boolean = false;
  baseImage;
  subscription: Subscription;
  // currentDevice: MediaDeviceInfo;
  //ngVersion = VERSION.full;

  @ViewChild('scanner')
  scanner: BarcodeFormat;

  constructor(
    private renderer: Renderer2,
    public route: Router,
    private qrReader: QrCodeReaderService
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(decodedString => console.log(decodedString));
  }

  preview(files) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert("Only images are supported.");
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.value = reader.result;
      //console.log(reader.result);
      this.baseImage = reader.result;
      console.log(this.baseImage);
      this.showQRCode = true;
    }
  }

  render(event) {
    console.log(event);
    let element: Element = this.renderer.createElement('p');
    element.innerHTML = event.result;
    this.route.navigateByUrl('show');
  }

}
