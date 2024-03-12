import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SleepService } from 'src/services/sleep.service';
import { OvernightSleepData } from 'src/data/overnight-sleep-data';
import { Router } from '@angular/router';
import { ModalController, IonItemSliding, ToastController } from '@ionic/angular';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-overnight',
  templateUrl: './overnight.page.html',
  styleUrls: ['./overnight.page.scss'],
})
export class OvernightPage implements OnInit {
  public logForm: FormGroup;
  public isAddingLog: boolean = false;
  public showSuccessMessage: boolean = false;
  public selectedSleepQuality: string = '';
  public logs: OvernightSleepData[] = [];
  public mostRecentLog: OvernightSleepData | null = null;


  constructor(private formBuilder: FormBuilder, private sleepService: SleepService, private router: Router, private modalCtrl: ModalController, private toastCtrl: ToastController ) {
    this.logForm = this.formBuilder.group({
      inBedTime: ['', Validators.required],
      awakeTime: ['', Validators.required],
      sleepQuality: ['']
    });
  }

  ngOnInit(): void {
    this.sleepService.loadData().then(() => {
      this.loadLogs();
    });
    this.setDefaultDateTime();
  }

  async addLog(): Promise<void> {
    if (this.logForm.valid) {
        const { inBedTime, awakeTime, sleepQuality } = this.logForm.value;

        // Add the log via the service method
        await this.sleepService.logOvernightData(new Date(inBedTime), new Date(awakeTime), sleepQuality);

        // Get the updated logs from the service
        await this.loadLogs();
        await this.sleepService.saveData();

        // Display success messages
        this.showSuccessMessage = true;
        const toast = await this.toastCtrl.create({
            message: 'Successfully logged!',
            duration: 3000,
            color: 'success'
        });
        toast.present();
    }
    this.logForm.reset();
    this.setDefaultDateTime();
    this.isAddingLog = false;
  }


  private async loadLogs(): Promise<void> {
    this.logs = await this.sleepService.getAllLogs();
    // Sort logs by descending start time
    this.logs.sort((a, b) => b.getSleepStart().getTime() - a.getSleepStart().getTime());

    // Display only the most recent log in the UI, keeping all logs in the same array
    this.mostRecentLog = this.logs[0]; // Assuming there's at least one log
    this.logs = [this.mostRecentLog]; // Update UI with only the most recent log
  } 


  async cancelLog(): Promise<void> {
    // Check if there's a log to cancel
    if (!this.mostRecentLog) return;
  
    // Capture the ID of the log being canceled
    const cancelledLogId = this.mostRecentLog.id;
  
    // Remove the canceled log from the service
    await this.sleepService.deleteLog(this.mostRecentLog);
  
    // Find the index of the canceled log in the local array
    const cancelledLogIndex = this.logs.findIndex(log => log.id === cancelledLogId);
  
    // If the canceled log is NOT the most recent one (index > 0) and
    // the most recent log is still in the array (index 0 exists):
    if (cancelledLogIndex > 0 && this.logs[0]) {
      // Remove the canceled log from the local array
      this.logs.splice(cancelledLogIndex, 1);
    } else {
      // Re-fetch logs from the service to potentially update the 
      // displayed most recent log if needed
      await this.loadLogs();
    }
  
    // Notify user of cancellation
    const toast = await this.toastCtrl.create({
      message: 'Log cancelled successfully',
      duration: 2000,
      color: 'medium'
    });
    toast.present();
  
    // Reset form and UI state (keeping the updated most recent log displayed)
    this.logForm.reset();
    this.setDefaultDateTime();
    this.isAddingLog = false;
  }


  async deleteLog(log: OvernightSleepData, slidingItem: IonItemSliding): Promise<void> {
    slidingItem.close();

    // Delete the specific log
    await this.sleepService.deleteLog(log);
    await this.sleepService.saveData();

    // Remove the deleted log from the local array
    this.logs = this.logs.filter(l => l.id !== log.id);

    // Sort the remaining logs to update the most recent log
    this.logs.sort((a, b) => b.getSleepStart().getTime() - a.getSleepStart().getTime());
    this.mostRecentLog = this.logs.length > 0 ? this.logs[0] : null;

    // If the deleted log was the most recent, the `loadLogs` method will automatically set the new most recent log
    this.toastCtrl.create({
        message: 'Log deleted successfully',
        duration: 2000,
        color: 'medium'
    }).then(toast => toast.present());

    // No need to reset form and UI state here unless you want to
  }

  private setDefaultDateTime(): void {
    const today = new Date();
    this.logForm.patchValue({
      inBedTime: this.formatDateTime(new Date(), 'inBedTime'),
      awakeTime: this.formatDateTime(new Date(), 'awakeTime'),
    });
  }

  private formatDateTime(date: Date, type: 'inBedTime' | 'awakeTime'): string {
    let momentDate = moment(date);
  
    if (type === 'inBedTime') {
      momentDate.hour(22).minute(0).second(0); // Set to 10 PM of selected day
    } else if (type === 'awakeTime') {
      momentDate.add(1, 'days').hour(6).minute(0).second(0); // Set to 6 AM of the next day
    }
  
    return momentDate.format();
  }

  setSleepQuality(quality: string) {
    this.selectedSleepQuality = quality;
    this.logForm.get('sleepQuality')?.setValue(quality);
  }

  getSleepQualityColor(quality: string): string {
    switch(quality) {
      case 'Good':
        return 'success';
      case 'Okay':
        return 'warning';
      case 'Bad':
        return 'danger';
      default:
        return 'medium';
    }
  }

  getDayLabel(day: { date: string; label: string }): string {
    return day.label; // Assuming `day` contains a `label` property that is suitable for display
  }
  
  showAddLogModal() {
    this.isAddingLog = true;
  }

  viewAllLogs(): void {
    this.router.navigateByUrl('/view-all-logs'); // Adjust the path as needed
  }

  handleLogSleep(event: {sleepStart: Date, sleepEnd: Date}) {
    // Use the component's state for sleepQuality
    const sleepQuality = this.selectedSleepQuality || 'Good';
    
    // Call the service method with individual parameters
    this.sleepService.logOvernightData(event.sleepStart, event.sleepEnd, sleepQuality);
  
    // Save data to persistent storage
    this.sleepService.saveData();
  }

  isLogMissing(day: string): boolean {
    return !this.sleepService.getSleepDataForDate(new Date(day));
  }

}
