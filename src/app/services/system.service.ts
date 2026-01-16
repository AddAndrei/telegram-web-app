import {GetSystem} from "./system/get.system";

export class SystemService {
  private static _instance: SystemService = new SystemService();

  private _score: number = 0;

  constructor() {
    if (SystemService._instance) {
      throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
    }
    SystemService._instance = this;
  }

  public static getInstance(): SystemService {
    return SystemService._instance;
  }

  public getSystemOptions() {

  }

  public setScore(value: number): void {
    this._score = value;
  }

  public getScore(): number {
    return this._score;
  }

  public addPoints(value: number): void {
    this._score += value;
  }

  public removePoints(value: number): void {
    this._score -= value;
  }

}
