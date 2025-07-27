import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorHandleInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastrService)
  return next(req).pipe(catchError((err) => {
    const activeToast = toaster.error("Error While Fetching Products....", '')
    setTimeout(function(){
      toaster.remove(activeToast.toastId)
    },3000)
    return throwError(err);
  }));
};
