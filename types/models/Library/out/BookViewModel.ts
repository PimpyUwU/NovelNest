import {FeedBackViewModel} from "./FeedBackViewModel";

export type BookViewModel = {
    title : string
    description : string
    photo : string
    file : string
    university : string
    feedback : FeedBackViewModel[]
}