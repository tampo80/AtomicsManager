import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApprobationLevel } from '../../models/approbation-level';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '../../../../../node_modules/@angular/material';
import { ApprobationLevelService } from '../../services/approbation-level.service';
import { MessageboxService } from '../../services/messagebox.service';
import { AddApprobationLevelDialogComponent } from './dialog/add/add-approbation-level-dialog/add-approbation-level-dialog.component';
import { EditApprobationLevelDialogComponent } from './dialog/edit/edit-approbation-level-dialog/edit-approbation-level-dialog.component';
import { TypeApprovalGroup } from '../../models/type-approval-group';
import { TYPE_APPROVAL_GROUP } from '../../config';
import { GourpAddComponent } from './dialog/groupadd/gourp-add/gourp-add.component';

@Component({
  selector: 'app-approbation-level',
  templateUrl: './approbation-level.component.html',
  styleUrls: ['./approbation-level.component.scss']
})
export class ApprobationLevelComponent implements OnInit , AfterViewInit {




    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public result: any;
    dataSource = new MatTableDataSource();
    displayedColumns = ['id','name','expensLimite','level','typeApprovalGroup','shared','actions'];
    isLoading:boolean;
    typeApproval:TypeApprovalGroup[]=TYPE_APPROVAL_GROUP;
    constructor(private approbationLevelService:ApprobationLevelService,private messageboxService:MessageboxService,private dialog: MatDialog) {
      this.isLoading=true;
     }

    ngOnInit() {
      this.getApprobationLevel();
      this.isLoading=true;
    }

    getType(value:boolean)
    {
      let res:string="";
      switch (value) {
        case true:
          res= "Partagé";
          break;
        case false:
          res="Non Partagé";
        default:
          break;
      }
      return res;
    }
    ngAfterViewInit() {

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

     getApprobationLevel() {
      this.approbationLevelService.getApprobationLevel().subscribe(
        res=>{
          this.dataSource.data=res;
          this.isLoading=false;
        }
      );
    }


    getTypeApprobation(value:number)
    {
      return this.typeApproval.find(e=>e.value==value).label;
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }

    rowClicked(row: any): void {
      console.log(row);
    }

    deleteApprobationLevel(approbationLevel?:ApprobationLevel){

    this.messageboxService.ShowMessage("Avertissement","Supprimer  "+approbationLevel.name,"",2,false,1,'520px',"warning",'warn').subscribe(res => {

      this.result = res
      console.log(res);
      if (this.result.result=="yes") {
        this.approbationLevelService.deleteApprobationLevel(approbationLevel.id).subscribe(res=>{
          if (res!=null) {
            this.messageboxService.ShowMessage("Information",approbationLevel.name+" Supprimer avec succès",approbationLevel.name,0,false,1,'500px',"info",'primary');
            this.getApprobationLevel();
          }



        },err=>{
                    if (err!=null) {
                      console.log(err);
                      this.messageboxService.ShowMessage("Information","Impossible de supprimer le rôle "+approbationLevel.name+" car il est assigné à des utilisateurs ",'',0,false,1,'500px',"info",'primary');
                    }

        }

        );

      }

    });


  }

    addNewApprobationLevel(){

      const dialogRef = this.dialog.open(AddApprobationLevelDialogComponent,{
        data:{approbationLevel:""},
       width:'600px',
       disableClose:true
      });

      dialogRef.afterClosed().subscribe(res=>{
        console.log(res);
        if (res.result===1) {
          this.getApprobationLevel();
          this.messageboxService.ShowMessage("Information","ApprobationLevel ajouter avec succès","",0,false,1,'500px',"info",'primary');
        }
      }


      );
    }

    manageGroupMembers(approbationLevel:ApprobationLevel){

      const dialogRef = this.dialog.open(GourpAddComponent,{
        data:{approbationLevel:approbationLevel},
       width:'800px',
       disableClose:true
      });

      dialogRef.afterClosed().subscribe(res=>{
        console.log(res);
        if (res.result===1) {
          this.getApprobationLevel();
          this.messageboxService.ShowMessage("Information"," Opération appliquée  avec succès","",0,false,1,'500px',"info",'primary');
        }
      }


      );
    }
    EditApprobationLevel(approbationLevel?:ApprobationLevel){

       console.log(approbationLevel);
      const dialogRef = this.dialog.open(EditApprobationLevelDialogComponent,{
        data:{approbationLevel:approbationLevel},
       width:'600px',
       disableClose:true
      });

      dialogRef.afterClosed().subscribe(res=>{
        if (res.result===1) {
          this.getApprobationLevel();
          this.messageboxService.ShowMessage("Information"," modification éffectuée avec succès",approbationLevel.name,0,false,1,'500px',"info",'primary');
        }
      }


      );
    }


  }
