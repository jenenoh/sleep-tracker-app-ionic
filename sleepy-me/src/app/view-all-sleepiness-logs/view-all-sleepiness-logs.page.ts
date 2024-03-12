import { Component, OnInit } from '@angular/core';
import { SleepService } from 'src/services/sleep.service';
import { StanfordSleepinessData } from 'src/data/stanford-sleepiness-data'; 
import { NavController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-view-all-sleepiness-logs',
  templateUrl: './view-all-sleepiness-logs.page.html',
  styleUrls: ['./view-all-sleepiness-logs.page.scss'],
})
export class ViewAllSleepinessLogsPage implements OnInit {
  public logs: StanfordSleepinessData[] = [];

  constructor(private sleepService: SleepService, private navCtrl: NavController) {}

  ngOnInit() {
    this.logs = this.sleepService.getAllSleepinessLogs();
  }

  deleteLog(log: StanfordSleepinessData, slidingItem: IonItemSliding): void {
    this.sleepService.deleteSleepinessLog(log);
    this.logs = this.sleepService.getAllSleepinessLogs(); // Refresh logs after deletion
    slidingItem.close();
  }

  goBack() {
    console.log("Navigating back...");
    this.navCtrl.navigateRoot('/tabs/sleepiness'); // Replace with your overnight page path
  }

}
