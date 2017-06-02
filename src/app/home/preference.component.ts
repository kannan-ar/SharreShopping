import {Component} from "@angular/core";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SettingService} from "../services/account/setting.service";

@Component({
    selector: 'ngbd-modal-content',
    template: `
        <div class="modal-header">
            <span class="modal-title">Preferences</span>
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <textarea rows="4" cols="50"></textarea>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="savePreferences()">Save</button>
        </div>
    `
})

export class PreferenceComponent {
    constructor(
        private activeModal: NgbActiveModal,
        private settingService: SettingService) {
    }

    savePreferences() {
        this.settingService.savePreferences();
    }
}