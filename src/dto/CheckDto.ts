//for XgCheck 
export default class CheckDto {
    constructor(
        public id:string,           //ie:UserRole.RoleId
        public label:string,
        public value?:string,       //ie:UserRole.Id
        public checked?:boolean,
    ){
        this.id = id;
        this.label = label;
        this.value = value || '';
        this.checked = checked || false;
    } 
}