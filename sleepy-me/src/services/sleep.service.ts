import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public AllSleepData:SleepData[] = [];
	public AllOvernightData:OvernightSleepData[] = [];
	public AllSleepinessData:StanfordSleepinessData[] = [];

	constructor() {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
		SleepService.LoadDefaultData = false;
		}
	}

	private createOvernightSleepDataFromObject(data: any): OvernightSleepData {
		return new OvernightSleepData(new Date(data.sleepStart), new Date(data.sleepEnd), data.sleepQuality);
	}

	async saveSleepinessData() {
		// Save the sleepiness data array to storage
		await Storage.set({
		  key: 'allSleepinessData',
		  value: JSON.stringify(this.AllSleepinessData),
		});
	}

	async saveData() {
		await Storage.set({
		  key: 'allOvernightData',
		  value: JSON.stringify(this.AllOvernightData),
		});
	}

	async loadData() {
		const overnightData = await Storage.get({ key: 'allOvernightData' });
		if (overnightData.value) {
		  // Convert each plain object back into an OvernightSleepData instance
		  this.AllOvernightData = JSON.parse(overnightData.value).map((data: any) => this.createOvernightSleepDataFromObject(data));
		  this.AllSleepData = [...this.AllOvernightData, ...this.AllSleepinessData];
		}
	}

	public getAllLogs(): OvernightSleepData[] {
		return this.AllOvernightData;
	}

	private addDefaultData() {
		// Using the logOvernightData() method to create new instances
		this.logOvernightData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00'), 'Good');
		this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
	}

	public logOvernightData(sleepStart: Date, sleepEnd: Date, sleepQuality: string) {
		const newLog = this.createOvernightSleepDataFromObject({
		  sleepStart: sleepStart,
		  sleepEnd: sleepEnd,
		  sleepQuality: sleepQuality
		});
		this.AllSleepData.push(newLog);
		this.AllOvernightData.push(newLog);
	}

	public logSleepinessData(sleepData: StanfordSleepinessData) {
		this.AllSleepinessData.push(sleepData);
	}
	  

	public getLogByDate(date: Date): OvernightSleepData | undefined {
    	return this.getSleepDataForDate(date); // Reuse the existing method if it fits the requirement
	}

	getSleepDataForDate(date: Date): OvernightSleepData | undefined {
		const startOfDay = new Date(date.setHours(0, 0, 0, 0)).getTime();
		const endOfDay = new Date(date.setHours(23, 59, 59, 999)).getTime();
	  
		return this.AllOvernightData.find((data) => {
		  const sleepStart = data.getSleepStart().getTime();
		  const sleepEnd = data.getSleepEnd().getTime();
		  return (sleepStart >= startOfDay && sleepStart <= endOfDay) ||
				 (sleepEnd >= startOfDay && sleepEnd <= endOfDay);
		});
	}

	async loadSleepinessData() {
		const sleepinessData = await Storage.get({ key: 'allSleepinessData' });
		if (sleepinessData.value) {
		  this.AllSleepinessData = JSON.parse(sleepinessData.value).map((data: any) => new StanfordSleepinessData(data.loggedValue, new Date(data.dateTime), data.comments));
		}
	}

	deleteLog(logToDelete: OvernightSleepData) {
		// Example using filter to remove log
		this.AllOvernightData = this.AllOvernightData.filter(log => log !== logToDelete);
		this.AllSleepData = this.AllSleepData.filter(log => log !== logToDelete);
		this.saveData();
	}

	public getAllSleepinessLogs(): StanfordSleepinessData[] {
		return this.AllSleepinessData;
	}
	  
	deleteSleepinessLog(logToDelete: StanfordSleepinessData) {
		this.AllSleepinessData = this.AllSleepinessData.filter(log => log !== logToDelete);
		this.saveSleepinessData();
	}

	getMostRecentOvernightLog(): OvernightSleepData | undefined {
		if (this.AllOvernightData.length === 0) return undefined;
	
		return this.AllOvernightData.reduce((mostRecent, currentLog) => {
			return (mostRecent.getSleepEnd().getTime() > currentLog.getSleepEnd().getTime()) ? mostRecent : currentLog;
		});
	}
	
	getMostRecentSleepinessLog(): StanfordSleepinessData | undefined {
		if (this.AllSleepinessData.length === 0) return undefined;
	
		return this.AllSleepinessData.reduce((mostRecent, currentLog) => {
			return (new Date(mostRecent.dateTime).getTime() > new Date(currentLog.dateTime).getTime()) ? mostRecent : currentLog;
		});
	}
	
}