import { Skill } from "./skill"
import { City } from "./city"

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
    daysAgo:number,
    skills:Skill[],
    city:City,
    noImages:number | null
}
