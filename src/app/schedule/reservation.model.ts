export interface Reservation{

    nr:string
    id?: string
    poolTableId:string
    createdDate:string
    bookerName:string
    email:string
    phone:string
    startDate:string
    endDate:string
    isPaid:string;
    note?:string;
    resType:string;

}