import {  AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, ColDefUtil } from 'ag-grid-community';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { Person } from '../models/person';
import { AlertifyService } from '../services/alertify.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers:[PersonService]
})
export class PersonComponent implements OnInit {


  
  constructor(private kisiService:PersonService,
    private alertifyService:AlertifyService,
    private matDialog: MatDialog,
    private translateService:TranslateService,
    
    ) {
    

   }

  
   


  formModel :Person=new Person();

  tableSatirModel:Person;
  eskiFormModel :Person=new Person();

  rowData:Person[];

  columnDefs: ColDef[] ;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onCellClicked( e: CellClickedEvent): void {

    console.log(e.data);


    this.tableSatirModel=e.data;
    this.formModel={...e.data};
    this.eskiFormModel={...e.data};
  
  }
  clear(): void {
    this.agGrid.api.deselectAll();
  
    this.formModel=new Person();
    this.eskiFormModel=new Person();
    this.tableSatirModel=new Person();

  
  }


  ngOnInit() {
    
    
    setTimeout(() => {
    this.getColumnDefs();
    }, 1);

    this.translateService.onLangChange.subscribe(x=>{
      this.getColumnDefs();
    });

    this.getColumnDefs();
    this.getKisiler();
    

  }

  getColumnDefs(){
    this.columnDefs= [
      { headerName: this.translateService.instant('name'),field: 'name'},
      { headerName: this.translateService.instant('surname'),field: 'surname'},
      { headerName: this.translateService.instant('cell-phone'),field: 'cellPhone' }
    ];
  }
 
  getKisiler(){

    this.kisiService.getKisiler().subscribe(data=>{
      this.rowData = data;
      this.refresh();
    });
    
  }

  
  

  kaydet(){

    if(this.formModel.id>0){

      this.guncelle();

    }else{

      this.ekle();

    }
  }

  ekle(){
    let kontrol=0;
    this.kisiService.addKisi(this.formModel).subscribe(data=>{
      
      Person.aktar(this.tableSatirModel,data);
      this.rowData.push({...this.tableSatirModel});
      this.refresh();
      this.clear();
      kontrol=1;
    });
    setTimeout(() => {
      if(kontrol==0){
        this.formModel={...this.eskiFormModel};
      }
    }, 3000);

  }
  guncelle(){

    let kontrol=0;
    this.kisiService.guncelleKisi(this.formModel).subscribe(data=>{
     
      
      Person.aktar(this.tableSatirModel,this.formModel);
      this.refresh();
      //this.alertifyService.success(this.model.ad+" "+this.model.soyad+" kişisi güncellendi.");
      this.clear();
      kontrol=1;
      
    });
  
    setTimeout(() => {
      if(kontrol==0){

        this.formModel={...this.eskiFormModel};

      }
      
    }, 3000);
    
    
  }
  sil(){

    if(this.tableSatirModel.id>0){
      this.kisiService.deleteKisi(this.tableSatirModel.id).subscribe(data=>{

      
        console.log(this.rowData.splice(this.rowData.indexOf(this.tableSatirModel),1));
        this.refresh();
        this.clear();
        //this.alertifyService.success(this.model.ad+" "+this.model.soyad+" kişisi silindi.");
        
      });
    }else{
      this.alertifyService.error("Silmek istediğiniz kaydı seçiniz!");
    }
    
  }
  

  refresh(){
    
    this.rowData=this.rowData?.slice(0);
  }


  silOpenDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.tableSatirModel.name+" "+this.tableSatirModel.name+" kişisini silmek istediğinize emin misiniz?";


    let dialogRef = this.matDialog.open(DialogBodyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      
      if(value=="yes"){
        this.sil();
      }
      
    });
  }

  

  
}
