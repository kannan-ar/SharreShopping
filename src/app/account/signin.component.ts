﻿import {Component} from "@angular/core";

@Component({
    selector: "signin",
    template: `
        <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-8"></div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
                <button type="button" class="btn btn-primary btn-lg btn-block" (click)="onGoogleLogin()">Google</button>
            </div>
        </div>
    `
})

export class SigninComponent {
    onGoogleLogin(): void {
        window.open("/api/account/external", "ModalPopUp", "toolbar=no,scrollbars=no,location=no,statusbar=no,menubar=no,resizable=0,width=500,height=500,left = 490,top=300");
    }
}