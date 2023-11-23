import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Loandetails } from  './loandetails'
import { BehaviorSubject, Observable } from 'rxjs';
import{Customerdetails} from './customerdetails'
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  formCustomerData:Customerdetails=new Customerdetails();   //for add and edit
  

 
  loans:Loandetails[]
  private refreshListSource=new BehaviorSubject<boolean>(false);
  constructor(private httpClient:HttpClient) { }
  getLoanNames(){
    //http://localhost:8085/api/employees
    this.httpClient.get(environment.apiUrl +'/api/loans')
  
    .toPromise()
    .then(
      (response)=>{
        console.log(response);
        this.loans=response as Loandetails[]
      }
    )
    .catch(
      (error)=>{
        console.log(error);
      }
    )
  }
   //post
   insertCustomer(cust:Customerdetails):Observable<any>{
    return this.httpClient.post(environment.apiUrl +'/api/customers',cust);

  }
  //refresh
  refreshList$=this.refreshListSource.asObservable();

  //trigger
  triggerRefreshList(){
    this.refreshListSource.next(true);
  }
}
