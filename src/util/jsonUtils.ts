import { Stat } from '../classes';

export function parseStats(stat: string | null): Stat | undefined {
  if (stat) {
    return JSON.parse(stat);
  }
}
