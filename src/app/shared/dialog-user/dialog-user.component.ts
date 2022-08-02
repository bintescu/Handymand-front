import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss']
})
export class DialogUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private userService:UserService, 
    private dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any ) { }


    userForm! : FormGroup;
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      Id : [0],
      Email : ['',Validators.required],
      WalletAddress : [''],
      Address:[''],
      Title:[''],
      AboutMe:['']
    })

    if(this.editData){
      this.userForm.controls['Id'].setValue(this.editData.id);
      this.userForm.controls['Email'].setValue(this.editData.email);
      this.userForm.controls['WalletAddress'].setValue(this.editData.walletAddress);
      this.userForm.controls['Address'].setValue(this.editData.address);
      this.userForm.controls['Title'].setValue(this.editData.title);
      this.userForm.controls['AboutMe'].setValue(this.editData.aboutMe);

    }
  }


  updateUser():void{
    if(this.editData){
      const observer = {
        next : (response:any) => {
          alert('Updated!');
          this.userForm.reset();
          this.dialogRef.close('update');
        },
        error: (err:any) => {
          alert('error!');
        }
      }
  
      this.userService.update(this.userForm.value).subscribe(observer);
    }

  }

}
