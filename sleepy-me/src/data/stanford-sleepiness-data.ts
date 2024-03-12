/* from the Stanford Sleepiness Scale */
/* https://web.stanford.edu/~dement/sss.html */

import { SleepData } from './sleep-data';

export class StanfordSleepinessData extends SleepData {
	public static ScaleValues = [undefined,//Sleepiness scale starts at 1
	'Feeling active, vital, alert, or wide awake', //1
	'Functioning at high levels, but not at peak; able to concentrate', //2
	'Awake, but relaxed; responsive but not fully alert', //3
	'Somewhat foggy, let down', //4
	'Foggy; losing interest in remaining awake; slowed down', //5
	'Sleepy, woozy, fighting sleep; prefer to lie down', //6
	'No longer fighting sleep, sleep onset soon; having dream-like thoughts']; //7

	private loggedValue: number;
	public dateTime: Date;
  	public sleepinessLevel: number;
	public comments?: string;


	constructor(loggedValue:number, loggedAt:Date = new Date(), comments?: string) {
		super();
		this.loggedValue = loggedValue;
   	 	this.sleepinessLevel = loggedValue;
		this.dateTime = loggedAt;
		this.comments = comments;
		this.loggedAt = loggedAt;
	}

	override summaryString():string {
		// Ensure loggedValue is within bounds (assuming ScaleValues starts at index 1)
		const adjustedIndex = Math.max(0, this.loggedValue - 1); // Handle potential out-of-bounds access
		return this.loggedValue + ": " + StanfordSleepinessData.ScaleValues[adjustedIndex];
	}
}
