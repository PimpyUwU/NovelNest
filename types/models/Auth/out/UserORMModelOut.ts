export type UserORMModelOut = {
    id : number,
    first_name : string,
    last_name : string,
    isic : string,
    university_id : number
    is_verified : boolean
    university : {
        id : number
        name : string
    }
}