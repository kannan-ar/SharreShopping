import {Component} from "@angular/core"

@Component({
    selector: "[loginInfo]",
    template: `
        <a class="login-link" [routerLink]="['/signin']" routerLinkActive="active">Signin</a>
    `
})

export class LoginInfoComponent {
}