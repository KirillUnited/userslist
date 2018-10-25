import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  // public user: User;
  users = [];
  constructor(private usersService: UsersService) {
    this.users = new Array<User>();
  }
  ngOnInit() {
    this.usersService.getUsers().subscribe((response) => {
      console.log('response is ', response)
    }, (error) => {
      console.log('error is', error);
    }
    )
    this.loadUsers();
  }
  //загрузка пользователей
  private loadUsers() {
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }
  // сохраняем пользователя
  saveUser(name, age) {
    // добавляем пользователя
    this.usersService.createUser(name, age).subscribe((data: any) => {
      console.log(data);
      this.loadUsers();
    });
  }
  // удаление пользователя
  deleteUser(user) {
    this.usersService.deleteUser(user._id).subscribe(data => {
      console.log(data);
      this.loadUsers();
    });
  }
}
