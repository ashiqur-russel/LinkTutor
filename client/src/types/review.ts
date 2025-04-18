export type Review = {
    _id: string,
    comment: string,
    rating: string
    tutorId:{
        id:string,
        name:string
    },
    booking:string
}
