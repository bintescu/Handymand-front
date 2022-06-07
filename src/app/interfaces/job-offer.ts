export interface JobOffer {
    idJobOffer : number
    idCreationUser : number,
    email: string,
    firstName: string,
    lastName: string,
    description : string,
    location : string,
    title:string,
    lowPriceRange: number,
    highPriceRange: number,
    dateCreated: Date,
    daysAgo:number
}
