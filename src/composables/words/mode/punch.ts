import type { IModeManager } from '.';

export class PunchModeManager implements IModeManager {
  public name = 'Punch';
  public description = 'Punch words in the air';
  public icon = '🥊';
}