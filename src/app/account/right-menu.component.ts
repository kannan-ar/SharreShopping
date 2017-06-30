import {Component} from "@angular/core"
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {PreferenceComponent} from "../home/preference.component";

@Component({
    selector: 'right-menu',
    template: `
        <p class="navbar-text navbar-right"><span class="right-menu-preference" (click)="showPreference()">Preferences&nbsp;&nbsp;</span></p>
    `,
    styles: [`
        .right-menu-preference {
            cursor: pointer;
        }
    `]
})

export class RightMenuComponent {
    constructor(
        private modalService: NgbModal) {
    }

    showPreference() {
        const modalRef = this.modalService.open(PreferenceComponent);
    }
}