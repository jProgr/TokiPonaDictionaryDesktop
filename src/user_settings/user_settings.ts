import { app } from 'electron';
import * as fs from 'fs';

/**
 * A DTO that represents all of the user settings.
 */
interface Settings {
  mainWindowWidth: number;
  mainWindowHeight: number;
  mainWindowX?: number;
  mainWindowY?: number;
}

/**
 * A service that interacts with the values of actual user settings
 * and is also responsible to read and write them to disk.
 */
export class UserSettings {
  /**
   * The path of the user settings file.
   * @type {string}
   */
  private readonly userSettingsFilePath: string = app.getPath('userData') + '/userSettings.json';

  /**
   * UserSettings is a singleton.
   * @type {UserSettings}
   */
  private static instance: UserSettings;

  /**
   * The actual settings. Some defaults are also set.
   * @type {Settings}
   */
  private static userSettings: Settings = {
    mainWindowWidth: 600,
    mainWindowHeight: 800,
  };

  private constructor() {
    this.boot();
  }

  /**
   * UserSettings is a singleton so this is where initial setup
   * is done. This method tries to read the user settings file and
   * parse it, if anything goes wrong, for example is the first time
   * the app has been run, nothing happens and the default user
   * settings are used.
   *
   * @returns {void}
   */
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

  /**
   * Reads a setting and returns its value.
   *
   * @param {string} key
   * @returns {any}
   */
  get(key: string): any {
    return UserSettings.userSettings[key];
  }

  /**
   * Stores the value of a setting.
   *
   * @param {string} key
   * @param {any} value
   * @returns {void}
   */
  set(key: string, value: any): void {
    UserSettings.userSettings[key] = value;
    this.saveSettings();
  }

  /**
   * Tries to store the user settings as a JSON file.
   *
   * @returns {void}
   */
  private saveSettings() {
    const settingsData: string = JSON.stringify(UserSettings.userSettings);
    fs.writeFile(this.userSettingsFilePath, settingsData, console.debug);
  }
}
