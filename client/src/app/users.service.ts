import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) { };
    URL = '/api/users';
    getUsers(){
        return this.http.get(this.URL);
    }
}