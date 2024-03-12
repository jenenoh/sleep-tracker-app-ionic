import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAllSleepinessLogsPageRoutingModule } from './view-all-sleepiness-logs-routing.module';

import { ViewAllSleepinessLogsPage } from './view-all-sleepiness-logs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAllSleepinessLogsPageRoutingModule
  ],
  declarations: [ViewAllSleepinessLogsPage]
})
export class ViewAllSleepinessLogsPageModule {}
