import {FeedBackViewModel} from "./FeedBackViewModel";

export type BookOrmModelOut = {
    id : number,
    title : string,
    description : string,
    photo_path : string,
    file_path : string,
    genre : {
        genre : string
    }
    Feedback : FeedBackViewModel[]
}