import { Component } from '@angular/core';
import { UserService }  from '../service/user.service';
import { PostService }  from '../service/post.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  providers:  [UserService,PostService]
})
export class DataDrivenComponent {
  myForm: FormGroup;
  user;
  constructor(private formBuilder: FormBuilder,private service1: UserService,private service2: PostService) {
    this.myForm = formBuilder.group({
      'userData': formBuilder.group({
        'username': ['', [Validators.required]],
        'email': ['', [
          Validators.required,
          //Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]]
      }),
      'post': ['Testing', [Validators.required,this.postLengthValidator]]
    });

    this.myForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );
    this.myForm.valueChanges.subscribe(
      (value:any) => console.log(value)
    );

  }

  onSubmit(form) {
    console.log(form);
  }

  getUser(){
    this.service1.getUser().then(data=> data.json()).
    then(user=>{
      this.myForm.controls['userData'].setValue({username: user.name, email: user.email});
      //this.myForm.controls['username'].setValue(user.name);
      //this.myForm.controls['userData']['username'].setValue(user.name);
    });
    this.service2.getPost().subscribe(res =>{let posts =res.json();
      this.myForm.controls['post'].setValue(JSON.stringify(posts) );
    })



  }


  postLengthValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value.length <= 10) {
      return {length: true};
    }
    return null;
  }
}
