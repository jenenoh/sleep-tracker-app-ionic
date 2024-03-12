import { StanfordSleepinessData } from './stanford-sleepiness-data';

describe('StanfordSleepinessData', () => {
  it('should create an instance', () => {
    const sleepinessLevel = 1; 
    expect(new StanfordSleepinessData(sleepinessLevel)).toBeTruthy();
  });
});
