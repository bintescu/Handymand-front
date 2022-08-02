import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SkillService } from 'src/app/services/skill.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder, 
    private skillService:SkillService, 
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any ) { }

  skillForm !: UntypedFormGroup;

  actionBtn: string = "Save";
  ngOnInit(): void {
    this.skillForm = this.formBuilder.group({
      Id : [0],
      SkillName : ['',Validators.required],
      Description:['',Validators.required]
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.skillForm.controls['SkillName'].setValue(this.editData.skillName);
      this.skillForm.controls['Description'].setValue(this.editData.description);
      this.skillForm.controls['Id'].setValue(this.editData.id);
    }
  }


  send():void{
    if(!this.editData){
      this.addSkill();
    }
    else{
      this.updateSkill();
    }
  }

  addSkill():void{

    console.log(this.skillForm.value)
    const observer = {
      next : (response:any) => {
        alert('succes !')
        this.skillForm.reset();
        this.dialogRef.close('save');
      },
      error: (err:any) => {
        alert('error!');
      }

    }

    this.skillService.create(this.skillForm.value).subscribe(observer);
  }

  updateSkill():void{
    const observer = {
      next : (response:any) => {
        alert('Updated!');
        this.skillForm.reset();
        this.dialogRef.close('update');
      },
      error: (err:any) => {
        alert('error!');
      }
    }

    this.skillService.update(this.skillForm.value).subscribe(observer);
  }
}
