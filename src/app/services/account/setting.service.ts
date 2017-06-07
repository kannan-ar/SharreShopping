import { Injectable } from "@angular/core";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';



@Injectable()
export class SettingService {
    private itemPreferenceName: string = 'item_preference';
    private blockPreferenceName: string = 'block_preference';

    hasPreferences(): boolean {
        return window.localStorage.getItem(this.itemPreferenceName) != null ||
            window.localStorage.getItem(this.blockPreferenceName) != null;
    }

    blockPreferences(): void {
        window.localStorage.setItem(this.blockPreferenceName, "1");
    }

    savePreferences(items: string[]): void {
        if (items.length > 0) {
            window.localStorage.setItem(this.itemPreferenceName, JSON.stringify(items));
        }
    }
}