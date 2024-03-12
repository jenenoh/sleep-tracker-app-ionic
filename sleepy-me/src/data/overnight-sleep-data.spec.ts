import { OvernightSleepData } from './overnight-sleep-data';

describe('OvernightSleepData', () => {
  it('should create an instance', () => {
    const sleepStart = new Date('2021-02-18T01:03:00');
    const sleepEnd = new Date('2021-02-18T09:25:00');
    const sleepQuality = 'Good';
    expect(new OvernightSleepData(sleepStart, sleepEnd, sleepQuality)).toBeTruthy();
  });
});
