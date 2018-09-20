import {Component} from "@angular/core";

@Component({
    selector: "signin",
    template: `
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="User Name" /><br />
                    <input type="password" class="form-control" /><br />
                    <button type="button" class="btn btn-default">Login</button>
                    <a href="#" class="btn btn-default">Register</a>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <button type="button" class="btn btn-primary btn-lg btn-block" (click)="onGoogleLogin()">Google</button>
                <br />
                <button type="button" class="btn btn-primary btn-lg btn-block" (click)="onFacebookLogin()">Facebook</button>
            </div>
        </div>
    `
})

export class SigninComponent {

    private onLogin(provider: string): void {
        window.open("/api/account/external/" + provider, "ModalPopUp", "toolbar=no,scrollbars=no,location=no,statusbar=no,menubar=no,resizable=0,width=500,height=500,left = 490,top=300");
    }
    onGoogleLogin(): void {
        this.onLogin("google");
    }

    onFacebookLogin(): void {
        this.onLogin("facebook");
    }
}