import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { Person } from '../models/person';
import { AlertifyService } from './alertify.service';

@Injectable()
export class PersonService {

constructor(
  private httpClient:HttpClient,
  private alertifyService:AlertifyService
  ) { }

path="https://localhost:44365/api";

getKisiler():Observable<Person[]>{

  return this.httpClient.get<Person[]>(this.path+"/persons").pipe(
    tap(data=>console.log(JSON.stringify(data)))
    
  );
  

}

addKisi(kisi:Person):Observable<Person>{


  return this.httpClient.post<Person>(this.path+"/persons",kisi).pipe(
    tap(data=>console.log(JSON.stringify(data)))
  );


}
guncelleKisi(kisi:Person):Observable<Person>{


  return this.httpClient.put<Person>(this.path+"/persons",kisi).pipe(
    tap(data=>console.log(JSON.stringify(data)))
  );


}
deleteKisi(id:Number):Observable<Number>{

  return this.httpClient.delete<Number>(this.path+"/persons/"+id).pipe(
    tap(data=>console.log(JSON.stringify(data)))
  );

}




}
