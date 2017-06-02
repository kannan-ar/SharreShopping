import { Injectable } from "@angular/core";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';



@Injectable()
export class SettingService {
    private itemPreferenceName: string = 'item_preference';

    hasPreferences(): boolean {
        return window.localStorage.getItem(this.itemPreferenceName) != null;
    }

    savePreferences(): void {
    }
}