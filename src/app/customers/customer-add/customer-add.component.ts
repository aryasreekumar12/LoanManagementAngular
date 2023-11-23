import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{CustomerService} from 'src/app/shared/customer.service' 
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

 
  constructor(public customerService:CustomerService,private router:Router,public toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.customerService.getLoanNames();
  }
  //submit method
  onSubmit(form:NgForm){
    console.log("submitted")
    console.log(form.value)
    this.addEmployee(form);
    form.reset();
    
    //to redirect
    // this.router.navigate(['/employees/list']);
    
 
}
addEmployee(form?:NgForm){
  this.customerService.insertCustomer(form.value).subscribe(
    (response)=>{
      console.log(response)
      //call trigger to refresh
      this.customerService.triggerRefreshList();
      this.toastrService.success("record added successfully!","EmployeeAdded")
    },(error)=>{
      console.log(error)
      this.toastrService.error("Something went wrong!Try again.....","EmployeeAdded")
    }
  )
}
}