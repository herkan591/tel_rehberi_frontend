import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        
        let newRequest: HttpRequest<any>;

        const token = localStorage.getItem("accessToken");
        const authPath=localStorage.getItem("authPath");


        console.log(request.url);
        if (authPath!=null&&!request.url.includes(authPath)) {

            newRequest = request.clone({
                headers: request.headers
                .set("Authorization", `Bearer ${token}`)
                
            });
        } else
            newRequest = request.clone();
 
        return next.handle(newRequest);
    }
}