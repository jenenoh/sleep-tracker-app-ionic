import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StanfordSleepinessData } from 'src/data/stanford-sleepiness-data';
import { SleepService } from 'src/services/sleep.service';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  public logForm: FormGroup;
  public logs: StanfordSleepinessData[] = [];
  public sleepinessLevels = [
    { value: 1, text: 'Feeling active, vital, alert, or wide awake' },
    { value: 2, text: 'Functioning at high levels, but not at peak; able to concentrate' },
    { value: 3, text: 'Awake, but relaxed; responsive but not fully alert' },
    { value: 4, text: 'Somewhat foggy, let down' },
    { value: 5, text: 'Foggy; losing interest in remaining awake; slowed down' },
    { value: 6, text: 'Sleepy, woozy, fighting sleep; prefer to lie down' },
    { value: 7, text: 'No longer fighting sleep, sleep onset soon; having dream-like thoughts' },
  ];
  public mostRecentLog: StanfordSleepinessData | null = null;
  isModalOpen = false;


  constructor(private fb: FormBuilder, private sleepService: SleepService, private toastCtrl: ToastController, private router: Router) {
    this.logForm = this.fb.group({
      dateTime: ['', Validators.required],
      sleepinessLevel: [1, Validators.required],
      comments: ['']
    });
  }

  ngOnInit(): void {
    this.sleepService.loadSleepinessData().then(() => {
      this.loadLogs();
    });
    this.setDefaultDateTime();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  private setDefaultDateTime(): void {
    const today = new Date();
    this.logForm.patchValue({
      dateTime: this.formatDateTime(new Date(), 'dateTime'),
    });
  }

  private formatDateTime(date: Date, type: 'dateTime'): string {
    let momentDate = moment(date);
    momentDate.hour(6).minute(0).second(0)
  
    return momentDate.format();
  }

  async loadLogs() {
    this.logs = await this.sleepService.getAllSleepinessLogs();
    this.logs.sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());
    this.mostRecentLog = this.logs[0] || null;
    this.logs = [this.mostRecentLog];
  }

  onDateTimeChange(event: CustomEvent) {
    this.logForm.controls['dateTime'].setValue(event.detail.value);
  }

  async addLog() {
    if (this.logForm.valid) {
      // Destructure the values directly from the form for clarity
      const { dateTime, sleepinessLevel, comments } = this.logForm.value;
  
      // Create a new StanfordSleepinessData instance
      const newLog = new StanfordSleepinessData(sleepinessLevel, new Date(dateTime), comments);
  
      // Add the log via the service method
      await this.sleepService.logSleepinessData(newLog); // Make sure this method is async or returns a Promise
  
      // Get the updated logs from the service
      await this.loadLogs();
  
      // Save the logs to storage
      await this.sleepService.saveSleepinessData(); // Make sure this method is async or returns a Promise
  
      // Display success messages
      this.showSuccessMessage('Successfully logged!');
      this.logForm.reset();
      this.setDefaultDateTime();
    }
  }

  async cancelLog() {
    // Check if there's a log to cancel
    if (!this.mostRecentLog) return;
  
    // Capture the ID of the log being canceled
    const cancelledLogId = this.mostRecentLog.id;
  
    // Remove the canceled log from the service
    await this.sleepService.deleteSleepinessLog(this.mostRecentLog); // Ensure your service has this method
  
    // Find the index of the canceled log in the local array
    const cancelledLogIndex = this.logs.findIndex(log => log.id === cancelledLogId);
  
    // If the canceled log is NOT the most recent one (index > 0) and
    // the most recent log is still in the array (index 0 exists):
    if (cancelledLogIndex > 0 && this.logs[0]) {
      // Remove the canceled log from the local array
      this.logs.splice(cancelledLogIndex, 1);
    } else {
      // Re-fetch logs from the service to potentially update the displayed most recent log if needed
      await this.loadLogs();
    }
  
    // Notify user of cancellation
    this.showSuccessMessage('Log cancelled successfully');
  
    // Reset form and UI state (potentially update the displayed log)
    this.logForm.reset();
    this.setDefaultDateTime(); // Ensure UI is updated with the correct most recent log
  }

  async deleteLog(log: StanfordSleepinessData, slidingItem: any) {
    slidingItem.close();
      await this.sleepService.deleteSleepinessLog(log); // Adjust if your service method is different
      // Remove the deleted log from the local array
      this.logs = this.logs.filter(l => l.id !== log.id);
  
      // Sort the remaining logs to update the most recent log
      this.logs.sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());
      this.mostRecentLog = this.logs.length > 0 ? this.logs[0] : null;
  
      await this.sleepService.saveSleepinessData(); // Ensure this method is implemented to save changes
      this.loadLogs();
      this.showSuccessMessage('Log deleted successfully');
  }

  private showSuccessMessage(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: 'success'
    }).then(toast => toast.present());
  }

  viewAllLogs(): void {
    this.router.navigateByUrl('/view-all-sleepiness-logs');
  }
}