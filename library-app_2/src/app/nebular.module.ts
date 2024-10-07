// src/app/nebular.module.ts

import { NgModule } from '@angular/core';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbIconModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbInputModule,
  NbToastrModule,
  NbAlertModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  imports: [
    NbThemeModule.forRoot({ name: 'default' }), // Choose your preferred theme
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbIconModule,
    NbButtonModule,
    NbCardModule,
    NbFormFieldModule,
    NbInputModule,
    NbToastrModule.forRoot(),
    NbEvaIconsModule,
    NbAlertModule,
    // ... other Nebular modules as needed
  ],
  exports: [
    NbThemeModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbIconModule,
    NbButtonModule,
    NbCardModule,
    NbFormFieldModule,
    NbInputModule,
    NbToastrModule,
    NbEvaIconsModule,
    NbAlertModule,
    // ... other Nebular modules as needed
  ],
})
export class NebularModule {}