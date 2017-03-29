import {Component} from "@angular/core"

@Component({
    selector: "[loginInfo]",
    template: `
        <a class="login-link" [routerLink]="['/signin']" routerLinkActive="active">Signin</a>
    `,
    styles: [
        `
            .login-link
            {
                text-decoration:none;
                color:#14819C;
            }
        `]
})

export class LoginInfoComponent {
}