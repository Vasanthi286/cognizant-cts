import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Hardcoded default to true so student profile is accessible by default.
  // Can be toggled for testing redirect logic.
  private loggedInSubject = new BehaviorSubject<boolean>(true);
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  get isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  login(): void {
    this.loggedInSubject.next(true);
  }

  logout(): void {
    this.loggedInSubject.next(false);
  }
}
