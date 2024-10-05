import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBarcodeScannerModule } from 'ngx-barcode-scanner';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxBarcodeScannerModule,
    ZXingScannerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
