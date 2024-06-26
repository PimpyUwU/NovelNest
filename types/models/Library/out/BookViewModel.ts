import {FeedBackViewModel} from "./FeedBackViewModel";

export type BookViewModel = {
    title : string
    description : string
    photo : string
    file : string
    genre : string
    author : string
    Feedback : FeedBackViewModel[]
}