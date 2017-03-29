import {Component} from "@angular/core";

@Component({
    selector: "shopping",
    template: `
    <nav class="navbar navbar-default">
        <div class="navbar-header">
            <button type="button" class="collapsed navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Sharreshopping</a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse-1">
            <p loginInfo class="navbar-text navbar-right login-info"></p>
        </div>
    </nav>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>`,
    styles: [
        `
            .login-info {
                padding-right:10px;
            }
        `]
})

export class AppComponent {
}