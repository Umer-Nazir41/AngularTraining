import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { crudModel } from '../../modals/crud.model';
import { ApiService } from '../../service/api/api.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  users!: any;
  formValue!: FormGroup;
  updating: boolean = false;
  crudModelObj: crudModel = new crudModel();

  constructor(private formBuilder: FormBuilder, private API: ApiService) {}
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
    });
    this.getAllUsers();
  }

  get email() {
    return this.formValue.get('email');
  }

  onClickAddUser() {
    this.formValue.reset();
    //this.updating = !this.updating;
  }

  postUserDetails() {
    this.crudModelObj.firstName = this.formValue.value.firstName;
    this.crudModelObj.lastName = this.formValue.value.lastName;
    this.crudModelObj.email = this.formValue.value.email;

    this.API.postUser(this.crudModelObj).subscribe(
      (res: any) => {
        console.log(res);
        //alert('User Added Successfully!');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllUsers();
      },
      (err: any) => {
        alert(`Something went wrong! ${err}`);
      }
    );
  }
  getAllUsers() {
    this.API.getUser().subscribe((res) => {
      this.users = res;
    });
  }
  deleteUsers(user: any) {
    this.API.deleteUser(user.id).subscribe((res) => {
      //alert('User Deleted Successfully!');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllUsers();
    });
  }
  onEdit(user: any) {
    this.updating = !this.updating;
    this.crudModelObj.id = user.id;
    this.formValue.controls['firstName'].setValue(user.firstName);
    this.formValue.controls['lastName'].setValue(user.lastName);
    this.formValue.controls['email'].setValue(user.email);
  }
  updateUserDetails() {
    this.crudModelObj.firstName = this.formValue.value.firstName;
    this.crudModelObj.lastName = this.formValue.value.lastName;
    this.crudModelObj.email = this.formValue.value.email;

    this.API.updateUser(this.crudModelObj, this.crudModelObj.id).subscribe(
      (res) => {
        console.log('Updated Successfully!');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllUsers();
        this.updating = !this.updating;
        this.crudModelObj.id = 0;
      }
    );
  }
}
