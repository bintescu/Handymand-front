
export interface Contract {
    id? : number
    creationUserFullName : string,
    idCreationUser : number,
    refferedUserFullName : string,
    idRefferedUser: number,
    creationDate: Date,
    expirationDate : Date,
    expectedDurationInHours: number,
    description : string,
    paymentAmount: number,
    complexityGrade : number,
    skillsList : []

}
