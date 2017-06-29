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
            <a class="navbar-brand" href="#">SharreShopping</a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse-1">
            <ul loginInfo class="nav navbar-nav navbar-right">
            </ul>
            <p class="navbar-text navbar-right">test</p>
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

            .amazon-box {
                background-color:#ff9900;
                width:10px;
                height:10px;
                display:block;
            }
        `]
})

export class AppComponent {
}