// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NewPasswordComponent } from './new-password.component';
// import { AuthServiceService } from '../../service/auth-service.service';
// import { Router } from '@angular/router';
// import { of } from 'rxjs';

// // Mocking AuthServiceService
// class MockAuthService {
//   generateNewPassword(data: any) {
//     // Simulate a successful response from the server
//     return of({ status: true });
//   }
// }

// // Mocking Router
// class MockRouter {
//   navigate(path: string[]) {
//     // Mocking navigate method
//   }
// }

// describe('NewPasswordComponent', () => {
//   let component: NewPasswordComponent;
//   let fixture: ComponentFixture<NewPasswordComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [NewPasswordComponent], // Declare the component
//       providers: [
//         { provide: AuthServiceService, useClass: MockAuthService }, // Provide the mock service
//         { provide: Router, useClass: MockRouter } // Provide the mock router
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(NewPasswordComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy(); // Test that the component is created
//   });

//   it('should validate passwords match and length', () => {
//     // Test for invalid passwords
//     component.password1 = 'short';
//     component.password2 = 'short';
//     component.verifyPassword(component.password1, component.password2);

//     expect(component.isPassword1).toBeTrue();
//     expect(component.isPassword2).toBeTrue();
//     expect(component.isPasswordMatch).toBeFalse(); // Passwords match but they're too short

//     // Test for valid passwords
//     component.password1 = 'validpassword';
//     component.password2 = 'validpassword';
//     component.verifyPassword(component.password1, component.password2);

//     expect(component.isPassword1).toBeFalse();
//     expect(component.isPassword2).toBeFalse();
//     expect(component.isPasswordMatch).toBeFalse(); // Passwords are valid and match
//   });

//   it('should generate a new password', () => {
//     localStorage.setItem('resetPasswordEmail', 'test@example.com'); // Simulate setting the email in localStorage
//     component.password1 = 'newpassword';
//     component.password2 = 'newpassword';

//     spyOn(component['authService'], 'generateNewPassword').and.callThrough(); // Spy on the service call

//     component.generateNewPassword(); // Call the generateNewPassword method

//     expect(component['authService'].generateNewPassword).toHaveBeenCalled(); // Check if the service was called
//     // You can also check that the router.navigate was called
//     // spyOn(component['router'], 'navigate');
//     // expect(component['router'].navigate).toHaveBeenCalledWith(['/auth/login']);
//   });
// });
