import {Component} from "@angular/core";

@Component({
    selector: 'progress',
    template:`
    <div class="progress">
        <div class="progress-bar progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
    </div>
    `
})

export class ProgressComponent {
}