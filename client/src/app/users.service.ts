import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from './models/user.model';

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) { };
    URL = '/api/users';
    getUsers() {
        return this.http.get(this.URL);
    }
    userObj: object = {};
    createUser(name, age) {
        this.userObj = {
            name: name,
            age: age
        };
        return this.http.post(this.URL, this.userObj);
    }
    deleteUser(id: number) {
        return this.http.delete(`${this.URL}/${id}`);
    }
    editUser(user) {
        return this.http.put(this.URL, user, user._id);
    }
}