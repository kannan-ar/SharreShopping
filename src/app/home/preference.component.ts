import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {PreferenceService} from "../services/preference.service";
import {SearchService} from "../services/search.service";

@Component({
    selector: 'ngbd-modal-content',
    template: `
        <div class="modal-header">
            <span class="modal-title">Preferences</span>
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss(false)">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <tag-input [(ngModel)]='items'></tag-input>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" (click)="blockPreferences()">Don't show this again</button>
            <button type="button" class="btn btn-primary" (click)="savePreferences()">Save</button>
        </div>
    `
})

export class PreferenceComponent {
    items: any[] = [];

    constructor(
        private activeModal: NgbActiveModal,
        private preferenceService: PreferenceService,
        private searchService: SearchService) {
    }

    ngOnInit() {
        this.preferenceService.getPreferences().subscribe(r => {
            if(r != null) {
                this.items = r;
            }
        });
    }

    savePreferences() {
        this.preferenceService.savePreferences(this.items.map<string>(v => v.value))
            .subscribe(r => {
            this.activeModal.close(this.items != null && this.items.length > 0);
        });
    }

    blockPreferences() {
        this.preferenceService.blockPreferences();
        this.activeModal.close(false);
    }
}