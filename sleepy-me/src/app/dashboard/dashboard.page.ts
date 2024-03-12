import { Component, OnInit } from '@angular/core';
import { SleepService } from 'src/services/sleep.service';
import { OvernightSleepData } from 'src/data/overnight-sleep-data';
import { StanfordSleepinessData } from 'src/data/stanford-sleepiness-data';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  mostRecentOvernightLog?: OvernightSleepData;
  mostRecentSleepinessLog?: StanfordSleepinessData;
  
  constructor(private sleepService: SleepService) {}

  ngOnInit() {
    this.loadMostRecentLogs();
  }

  async loadMostRecentLogs() {
    await this.sleepService.loadData();
    await this.sleepService.loadSleepinessData();

    // Fetch the most recent logs
    this.mostRecentOvernightLog = this.sleepService.getMostRecentOvernightLog();
    this.mostRecentSleepinessLog = this.sleepService.getMostRecentSleepinessLog();
  }
}