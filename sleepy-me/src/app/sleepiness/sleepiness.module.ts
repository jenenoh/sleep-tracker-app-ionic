import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SleepinessPageRoutingModule } from './sleepiness-routing.module';

import { SleepinessPage } from './sleepiness.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SleepinessPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SleepinessPage]
})
export class SleepinessPageModule {}
