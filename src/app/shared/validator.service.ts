import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorService {

  constructor() { }

  isValidName(name: string): ValidationResponse {
    return new ValidationResponse(name.length >= 2).withMessage("Name should have atleast 2 characters.");
  }

  isValidEmail(email: string): ValidationResponse {
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = emailReg.test(email);
    return new ValidationResponse(isValid).withMessage("Email is invalid.");
  }

  isValidPassword(password: string): ValidationResponse {
    return new ValidationResponse(password.length >= 7).withMessage("Password should have atleast 7 characters.");
  }

  isValidConfirmPassword(password: string, confirmPassword: string): ValidationResponse {
    return new ValidationResponse(password == confirmPassword).withMessage("Passwords should match.");
  }
}

class ValidationResponse {
  isValid: boolean;
  message: string;

  constructor(isValid: boolean) {
    this.isValid = isValid;
  }

  withMessage(message: string): ValidationResponse {
    this.message = message;
    return this;
  }
}
