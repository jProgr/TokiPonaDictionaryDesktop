import { app } from 'electron';
import * as fs from 'fs';

interface Settings {
  mainWindowWidth: number;
  mainWindowHeight: number;
  mainWindowX?: number;
  mainWindowY?: number;
}

export class UserSettings {
  private readonly userSettingsFilePath: string = app.getPath('userData') + '/userSettings.json';
  private static instance: UserSettings;
  private static userSettings: Settings = {
    mainWindowWidth: 600,
    mainWindowHeight: 800,
  };

  private constructor() {
    this.boot();
  }

  private boot(): void {
    try {
      UserSettings.userSettings = JSON.parse(fs.readFileSync(this.userSettingsFilePath).toString());
    }
    catch (err) { console.debug(err); }
  }

  static getInstance(): UserSettings
  {
    return this.instance ?? (this.instance = new UserSettings());
  }

  get(key: string): any {
    return UserSettings.userSettings[key];
  }

  set(key: string, value: any): void {
    UserSettings.userSettings[key] = value;
    this.saveSettings();
  }

  private saveSettings() {
    const settingsData: string = JSON.stringify(UserSettings.userSettings);
    fs.writeFile(this.userSettingsFilePath, settingsData, console.debug);
  }
}
