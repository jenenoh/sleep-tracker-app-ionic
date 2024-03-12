import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-semicircle-slider',
  templateUrl: './semicircle-slider.component.html',
  styleUrls: ['./semicircle-slider.component.scss'],
})
export class SemicircleSliderComponent {
  selectedSleepStart: Date = new Date();
  selectedSleepEnd: Date = new Date();
  @Output() logSleepEvent = new EventEmitter<{sleepStart: Date, sleepEnd: Date}>();
  
  logSleep() {
    // Emit the selected sleep start and end times when the button is clicked
    this.logSleepEvent.emit({sleepStart: this.selectedSleepStart, sleepEnd: this.selectedSleepEnd});
  }

}
