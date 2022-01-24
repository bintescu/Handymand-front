import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFirstName'
})
export class SearchFirstNamePipe implements PipeTransform {

 // transform(value: unknown, ...args: unknown[]): unknown {
 //   return null;
 // }

 transform(users: any[], text:string): any {
   if(!text){
     return users;
   }
   else{
     return users.filter((user) => {
       return user.firstName.toLowerCase().indexOf(text.toLowerCase()) !== -1;
     })
   }
  return null;
}


}
