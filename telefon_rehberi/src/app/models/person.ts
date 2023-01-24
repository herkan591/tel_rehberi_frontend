export class Person {

    id:number;
    name:string;
    surname:string;
    cellPhone:string;
    
    static aktar(hedef:Person,aktaran:Person):void{

        hedef.id=aktaran.id;
        hedef.name=aktaran.name;
        hedef.surname=aktaran.surname;
        hedef.cellPhone=aktaran.cellPhone;
    }


}
