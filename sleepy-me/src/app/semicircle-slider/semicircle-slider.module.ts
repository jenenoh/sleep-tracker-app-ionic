import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SemicircleSliderComponent } from './semicircle-slider.component';


@NgModule({
  declarations: [SemicircleSliderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SemicircleSliderComponent]
})
export class SemicircleSliderModule { }
