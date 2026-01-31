import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BroswerService {
  private readonly storageKey = 'browser-unique-id';

  public getBrowserId(): string {
    if(typeof localStorage !== 'undefined') {
      let id = localStorage.getItem(this.storageKey);
      if (!id) {
        id = this.generateUUID();
        localStorage.setItem(this.storageKey, id);
      }
      return id;
    }
    return this.generateUUID();
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
