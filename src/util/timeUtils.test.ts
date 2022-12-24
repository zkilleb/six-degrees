import { formatTimer } from './timeUtils';

test('formatTimer correctly translates time', () => {
  expect(formatTimer(32310)).toEqual('0 min(s) 32 sec(s)');
});
