//for easy datatable query
export default class EasyDtDto {
    constructor(
        public start = 0,
        public length = 10,
        public recordsFiltered = 0,
        public findJson = '',
        public sort = '',
    ){
        this.start = start;
        this.length = length;
        this.recordsFiltered = recordsFiltered;
        this.findJson = findJson;
        this.sort = sort;
    } 
}