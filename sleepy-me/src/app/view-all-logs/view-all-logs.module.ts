import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAllLogsPageRoutingModule } from './view-all-logs-routing.module';

import { ViewAllLogsPage } from './view-all-logs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAllLogsPageRoutingModule
  ],
  declarations: [ViewAllLogsPage]
})
export class ViewAllLogsPageModule {}
