import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RootComponent } from './root/root.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { UsersService } from './users.service';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: LoginComponent },
  { path: 'settings', component: SettingsComponent }
]

@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [UsersService],
  bootstrap: [RootComponent]
})
export class AppModule { }
