import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

//intercepcion de errores http pedida para los tres casos
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message: string;

      switch (error.status) {
        case 400:
          message = 'Parámetro q inválido o ciudad no encontrada.';
          break;
        case 401:
          message = 'API Key inválida o no proporcionada.';
          break;
        case 403:
          message = 'La API Key no tiene acceso al endpoint solicitado.';
          break;
        default:
          message = `Error inesperado: ${error.status}`;
      }

      console.error(`[HTTP ${error.status}] ${message}`);
      return throwError(() => new Error(message));
    })
  );
};
