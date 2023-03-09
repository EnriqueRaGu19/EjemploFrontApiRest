import { TestBed } from '@angular/core/testing';
import { LoginService } from '../services/auth/login/login.service';
import { InterceptorService } from './interceptor.service';

xdescribe('InterceptorService', () => {
  let service: InterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginService
      ]
    });
    service = TestBed.inject(InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
