import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SkillService } from 'src/app/services/skill.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  displayedColumns: string[] = ['id','skillName', 'description', 'creationUserName','creationUserEmail', 'dateCreated','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort)sort!: MatSort;
  
  constructor(private dialog:MatDialog, private skillService:SkillService) { }

  ngOnInit(): void {
    this.getSkills();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
    width:'30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'save'){
        this.getSkills();
      }
    });
  }

  getSkills(){
    const observer = {
      next: (res:any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err:any) => {
        console.log('error on get skills!')
      }
    }
    this.skillService.getAll().subscribe(observer);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editSkill(row: any){
    this.dialog.open(DialogComponent, {
      width:'30%',
      data:row
    }).afterClosed().subscribe((val:any) => {
      if(val === 'update'){
        this.getSkills();
      }
    });

  }

  deleteSkill(row:any){

    const observer = {
      next : (response:any) =>{
        alert('Skill deleted!');
        this.getSkills();
      },
      error : (err:any) => {
        alert('Error while deleting skill.')
      }
    }
    
    this.skillService.delete(row).subscribe(observer);
  }

}
