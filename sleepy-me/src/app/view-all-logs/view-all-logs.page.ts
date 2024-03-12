import { Component, OnInit } from '@angular/core';
import { SleepService } from 'src/services/sleep.service';
import { OvernightSleepData } from 'src/data/overnight-sleep-data';
import { NavController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-view-all-logs',
  templateUrl: './view-all-logs.page.html',
  styleUrls: ['./view-all-logs.page.scss'],
})
export class ViewAllLogsPage implements OnInit {
  public logs: OvernightSleepData[] = [];

  constructor(private sleepService: SleepService, private navCtrl: NavController) {}

  ngOnInit() {
    this.logs = this.sleepService.getAllLogs();
  }

  getSleepQualityColor(sleepQuality: string): string {
    // Implement your logic for determining color based on sleep quality
    // Example:
    if (sleepQuality === 'Good') {
      return 'success';
    } else if (sleepQuality === 'Okay') {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  deleteLog(log: OvernightSleepData, slidingItem: IonItemSliding): void {
    this.sleepService.deleteLog(log);
    this.logs = this.sleepService.getAllLogs(); // Refresh logs after deletion
    slidingItem.close();
  }

  goBack() {
    console.log("Navigating back...");
    this.navCtrl.navigateRoot('/tabs/overnight'); // Replace with your overnight page path
  }
}
