import { parseStats } from './jsonUtils';

test('parseStats returns undefined if no stats', () => {
  expect(parseStats(null)).toEqual(undefined);
});

test('parseStats returns JSON if stat', () => {
    const testObj = parseStats('{"gamesPlayed":3,"wins":3,"longestStreak":7,"fastestTime":32310}'); 
    expect(testObj).toBeInstanceOf(Object);
    expect(testObj?.fastestTime).toEqual(32310);
    expect(testObj?.longestStreak).toEqual(7);
    expect(testObj?.wins).toEqual(3);
    expect(testObj?.gamesPlayed).toEqual(3);
  });
