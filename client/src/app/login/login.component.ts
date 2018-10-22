import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  // public user: User;
  users = [];
  constructor(private usersService: UsersService) {
    this.users = new Array<User>();
  }
  // validateLogin() {
  //   if (this.user.username && this.user.password) {
  //     this.loginService.validateLogin(this.user).subscribe(result => {
  //       console.log('result is', result);
  //     }, error => { console.log('error is', error); }
  //     );
  //   } else {
  //     alert('enter user name and password');
  //   }
  // }
  ngOnInit() {
    this.usersService.getUsers().subscribe((response) =>{
    console.log('response is ', response)}, (error) => {
      console.log('error is', error);
    }
    )
    this.loadUsers();
  }
//загрузка пользователей
private loadUsers() {
  this.usersService.getUsers().subscribe((data: User[]) => {
          this.users = data;  
      });
}
}
