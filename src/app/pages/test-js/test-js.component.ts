import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, from, fromEvent, interval, map, multicast, Observable, of, Subject, Subscriber, refCount, Subscription,share } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-test-js',
  templateUrl: './test-js.component.html',
  styleUrls: ['./test-js.component.scss']
})
export class TestJsComponent implements OnInit,OnDestroy {


  constructor(private userService:UserService) { }
  private keyEnv: string = environment.key;
  private IvEnv:CryptoJS.lib.WordArray  = CryptoJS.lib.WordArray.random(16);
  private IvEnv2:number[] = [108, 189, 156, 48, 55, 144, 182, 132, 157, 11, 66, 223, 241, 207, 210, 82];
  subscription:any = null;

  ngOnInit(): void {
    
    // var observer = {
    //   next(val: any) { console.log(val)},
    //   error(e:any) { console.log(e)},
    //   complete() { console.log('complete')}
    // }

    // let observabilul = new Observable(observer => {
    //   observer.next('Start data!')
    //   setTimeout(() => {
    //     observer.next('New data is coming');
    //     observer.complete();
    //   },5000)
    // });

    // observabilul.subscribe(observer);
    

    // //observabilul.pipe(map(val => `New value ${val}`)).subscribe(observer);


    // var button = document.getElementById('buton');

    // let clici = fromEvent(document, 'click');

    // this.subscription = clici.subscribe( {
    //   next(val:any) {console.log(val.offsetX)},
    //   error(e) {console.log(e)},
    //   complete() {console.log('COMPELTE')}
    // })


    //Parcurgem rxJS


      //OBSERVABILUL ESTE O GENERALIZARE A FUNCTIEI
      //Diferenta este ca poate returna mai multe valori.

      //O functie simpla foo()

      // function foo(){
      //   console.log('Hello');
      //   return 42;
      // }

      // const x = foo();
      // console.log(x);

      // const y = foo();
      // console.log(y);

      //Acelasi comportament putem sa il scriem cu observabile
      
      // const fooAsObs = new Observable( subs => {
      //   console.log('Hello');
      //   subs.next(42);
      // })

      //O functie nu poate returna mai multe valori!
      // function fooMultiple(){
      //   console.log('Hello');
      //   return 42;
      //   return 100; //dead code!
      
      // }
      //Dar un observabil poate face asta..

      // const fooMultipleObs = new Observable( subscriber => {
      //   console.log('Hello');
      //   subscriber.next(42);
      //   subscriber.next(100);
      //   subscriber.next(200);
      // })


      //Apelam sa observam ca nu este APELAT asincron...

      // console.log('Inainte de fooMultipleObs');
      // fooMultipleObs.subscribe(observer => {
      //   console.log(observer);
      // })
      // console.log('Dupa de fooMultipleObs');


      //Insa el poate OFERI VALORI in mod ASINCRON..

      // const fooMultipleObs2 = new Observable( subscriber => {
      //   console.log('Hello');
      //   subscriber.next(42);
      //   subscriber.next(100);
        
      //   setTimeout(() =>{
      //     subscriber.next(200);
      //   } , 2000);

      //   setTimeout(() => {
      //     subscriber.next(210);
      //   },3000);


      //   subscriber.next(300);
      // })

      // console.log('Inainte de fooMultipleObs2');
      // fooMultipleObs2.subscribe(observer => {
      //   console.log(observer);
      // })
      // console.log('Dupa de fooMultipleObs2');

      // const fooObs = new Observable(subscriber => {
      //   console.log('Hello pornim observabilul');
      //   for(let i = 1 ; i <= 5 ; i ++){
      //             //De ce am folosit un i in declaratie este pentru ca FOR-ul este executat foarte rapid
      //             //Aproape ca toate timeouturile pornesc in acelasi timp si automat nu obtinem un delay.
      //             //Pentru ca toate dupa un anumit timp vor intoarce rezultatul.
      //     setTimeout(() => {
      //       subscriber.next(i);
      //     },i*1000)
      //   }
      // })

      // fooObs.subscribe( x => {
      //   console.log('Din primul observer = ',x);
      // })

      // //In momentul in care dupa o anumita perioada de timp se da subscribe la un alt observer
      // //Acesta v-a relua toata functia sau tot procesul din observabil
      // setTimeout(() => {
      //   fooObs.subscribe( y => {
      //     console.log('Din al doilea observer = ',y);
      //   })
      // },2000);


      //Observabilul NU este asincron!
      //Daca afisam niste mesaje inainte si dupa apelarea unei functii
      //O sa observam ca ele sunt facute intr-un singur thread.
      //ACELASI LUCRU ESTE VALABIL SI PENTRU OBSERVABIL!

      ///OBSERVATIE : setTimeout() nu ruleaza intr-un thread separat ci doar pune in coada acel cod de executat
      ///DUPA ce stiva de apel a programului S-A TERMINAT!
      // console.log('Inainte sa apelam FOO()');
      // console.log(foo());
      // console.log('Dupa ce am apelat FOO');
      // console.log('Inainte sa dam subscribe la fooObs');
      // fooAsObs.subscribe(x => {
      //   console.log(x);
      // })
      // console.log('Dupa ce am dat subscribe la fooObs');
      
      //Discutam 4 aspecte : CREAREA, SUBSCRIEREA, EXECUTAREA si DISPOSING sau eliminarea..

      //CREAREA
          // Constructorul de Observabile primeste un singur argument = FUNCTIA DE SUBSCRIBE
          //In practica ei sunt creati folosind functii de creare ( of(), from(), interval, etc)
      // of(101,201,301).subscribe(observer => {
      //   console.log(observer);
      // })


      // const observable = new Observable(function subscribe(subscriber){
      //   const id = setInterval(() => {
      //     subscriber.next('hi')
      //   }, 1000)

      //   return function unsubscribe() {
      //     clearInterval(id);
      //   };
      // })


      //SUBSCRIEREA
          //Nu este o coincidenta ca observable.subscribe si subscribe in new Observable(function subscribe(subscriber) {...}) au acelasi nume
          //In libraria RxJs sunt diferite dar in practica poti sa le consideri conceptual la fel.
          //Ce vrea sa ne arate aceasta denumire e ca atunci cand este apelata din obiect (observable.subscribe()) cu un observator in ea
            //este rulata acea functie subscribe din new Observable(..) pentru fiecare subscriber.
            //fiecare apel observable.subscribe() apeleaza propriul sau SETUP pentru acel subscriber.
          //Este diferit fata de addEventListener/removeEventListener deoarece Observabilul NU PASTREAZA o lista cu OBSERVATORII
          //Apelarea lui subscribe este pur si simplu o executare a unui observabil ( de aia ii zice LAZY) si livrarea de valori sau evenimente

      //EXECUTAREA
          //Codul din new Observable(function subscribe(subscriber) {...}) reprezinta executia observabilului, o computatie LAZY care se intampla
            //pentru fiecare observator in parte si poate produce mai MULTE valori dealungul timpului atat sincron cat si asincron
          //Sunt 3 tipuri de valori pe care un Observabil le poate returna:
            //NEXT notification ( trimite o valoare ca un Numar, String, Obiect, etc..)
            //ERROR notification (trimite o eroare JavaScript sau o exceptie)
            //COMPLETE notification (nu trimit o valoare)
          //ERROR si COMPLETE pot avea loc O SINGURA data.
          //In an Observable Execution, zero to infinite Next notifications may be delivered. If either an Error or Complete notification is delivered, then nothing else can be delivered afterwards.

          // const observable2 = new Observable(function subscribe(subscriber){

          //   try{
          //     subscriber.next('Buna')
          //     subscriber.next('Ziua')
          //     //throw new ErrorEvent('O eroare');
          //     subscriber.complete();
          //   }catch(err){
          //     subscriber.error(err)
          //   }
          // })

          // const subscription = observable2.subscribe(observer => {
          //   console.log(observer);
          // })

          
          //subscription.unsubscribe();
          //DISPOSING sau STERGEREA
          //Deoarece executarea unui Observabil este exclusiva pentru un singur Observer, acesta trebuie sa 
            //aiba posibilitatea de a opri executarea pentru a elimina pierderile de memorie sau computationale
          //Atunci cand este apelata functia subscribe si Observerul este atasat executiei observabilului si de asemenea
            //este returnat un obiect de tip subscription
          //const subscription = observable.subscribe(x => console.log(x));
          //ea reprezinta executia prezenta si are un API de oprire.
          //subscription.unsubscribe()



          // const observabilTest = new Observable(sub => {
          //   sub.next(1);
          //   setTimeout(() =>{},1000);
          //   sub.next(2);
          //   setTimeout(() => {},1000); 
          //   sub.next(3);
          //   let  i =4;
          //   const id = setInterval(() => {
          //     sub.next(i)
          //     i++;
          //   },1000)

            
          //   function unsubscribe(){
          //     clearInterval(id);
          //   }
          // })


          // const observer = {
          //   next : (x: any) => console.log(x),
          //   error: (e:any) => console.log(e),
          //   complete: () => console.log('COMPLETED!'),
          // };

          // const subsTest = observabilTest.subscribe(observer);

          // setTimeout(() => {
            
          //   subsTest.unsubscribe();
          // },1000)

          //Cu pipe poti sa legi mai multe functii una de alta
          // si cu of poti crea un observable dintr-un array..


          // of(1,2,3)
          // .pipe(map((x) => x*x), map((a => 10*a)),first())
          // .subscribe((v) => console.log(`value: ${v}`))



          // ------ SUBJECT : este un observabil ( emite valori) dar la mai multi observeri
          //ESTE SI OBSERVER poate fi hranit cu noi valori!

          // const subject = new Subject<number>();

          // subject.subscribe({
          //   next: (v) => console.log(`observer A: ${v}`)
          // })

          // subject.subscribe({
          //   next: (v) => console.log(`observer B: ${v}`)
          // })

          // dupa ce am legat doi observatori hranim subjectul..

          // const observable3 = interval(200);

          // const subscription1 = observable3.subscribe(subject);

          // setTimeout(() => {
          //   subscription1.unsubscribe();
          // }, 1000);

          // const observable4 = interval(100);
          // const subject2 = new Subject();
          // const refCounted = observable4.pipe(share({
          //   connector: () => subject2,
          //   resetOnRefCountZero : true
          // }));

          // let s1: Subscription,s2: Subscription;

          // console.log('Observer A subscribed!');

          // s1 = refCounted.subscribe({
          //   next: (v) => console.log(`observerA: ${v}`),
          // });

          // setTimeout(() => {
          //   console.log('observerB subscribed');
          //   s2 = refCounted.subscribe({
          //     next: (v) => console.log(`observerB: ${v}`),
          //   });
          // }, 2000);


          // setTimeout(() => {
          //   console.log('observerA unsubscribed');
          //   s1.unsubscribe();
          // }, 4000);


          // setTimeout(() => {
          //   console.log('observerB unsubscribed');
          //   s2.unsubscribe();
          // }, 2000);

    // ---------------------------------------------------------
    ////Cream un promise
    
    // let promise = (val: any) => {
    //   return new Promise(resolve => {
    //     setTimeout(() => resolve(val),3000);
    //   })
    // }

    // //Ne jucam cu promise

    // const myPromise = new Promise((resolve,reject) => {
    //   resolve(10);
    // });

    // const somethingWasSuccesful = true;

    // function someAsynFunction() {
    //   return new Promise<void>((resolve, reject) => {
    //       if (somethingWasSuccesful) {
    //         resolve();     
    //       } else {
    //         reject()
    //       }
    //   });
    // }

    // //https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/

    // //Un exemplu de use-case
    // //Avem o functie care intoarce niste rezultate dupa un anumit timp (intr-o variabila globala)

    // let result;

    // function getTemperature(){
    //   const delay = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
    //   const temp = Math.floor(Math.random() * (300 - 1 + 1) + 1);
    //   console.log('Am obtinut delay si temp :');
    //   console.log(delay,temp);

    //   setTimeout( () => {
    //     if(temp > 200) {
    //       result = `Too HOT | Delay : ${delay} | Temperature: ${temp} deg`;
    //     }
    //     else if (temp < 100){
    //       result = `Too COLD | Delay : ${delay} | Temperature: ${temp} deg`;
    //     }
    //     else{
    //       result = `Just Right | Delay : ${delay} | Temperature: ${temp} deg`;
    //     }
    //   },delay);
    // }

    // //Aceasta functie isi desfasoara activitatea asyncron de threadul principal
    // //Deci nu stim exact cand va sosi acest rezultat.
    // //Putem sa asteptam un delay maxim inainte sa il folosim dar asta este o abordare NAIVA
    // // Deoarece in realitate nu stim delayul maxim si in cazul in care il stim rezultatul poate ajunge 
    // //              mai devreme si noi sa irosim timp
    // console.log(result);

    // //Functia TREBUIE sa returneze un PROMISE!! ca sa o folosim exact atunci cand e nevoie.

    // let resultAsync;

    // function getTemperatureAsync(){

    //   return new Promise((resolve,reject) => {
    //     const delay = Math.floor(Math.random() * (10000 - 1000 + 1) + 10000);
    //     const temp = Math.floor(Math.random() * (300 - 1 + 1) + 1);
    //     console.log('Am obtinut delay si temp :');
    //     console.log(delay,temp);
  
  
    //     setTimeout( () => {
    //       if(temp > 200) {
    //         reject(`Too HOT | Delay : ${delay} | Temperature: ${temp} deg`);
    //       }
    //       else if (temp < 100){
    //        reject(`Too COLD | Delay : ${delay} | Temperature: ${temp} deg`);
    //       }
    //       else{
    //         resolve(`Just Right | Delay : ${delay} | Temperature: ${temp} deg`);
    //       }
    //     },delay);
    //   })

    // }

    // //Sub aceasta forma de RETURNARE DE PROMISIUNE!! putem consuma promisiunea.
    // //.then este apelata atunci cand promisiunea noastra REZOLVA si v-a returna ACEA INFORMATIE DIN INTERIORUL
    // //PROMISIUNII trimisa pe RESOLVE
    // // .catch e apelata pe REJECT si va trimite acea informatie trimisa pe REJECT
    // getTemperatureAsync()
    // .then(result => console.log(result))
    // .catch(error => console.log(error));

    //TREBUIE FOLOSIT FARA SPATIU!!


  }

  ngOnDestroy(){
    if(this.subscription != null){
      this.subscription.unsubscribe();
    }
  }


  stringFromUTF8Array(data:number[])
  {
    const extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
    var count = data.length;
    var str = "";
    
    for (var index = 0;index < count;)
    {
      var ch = data[index++];
      if (ch & 0x80)
      {
        var extra = extraByteMap[(ch >> 3) & 0x07];
        if (!(ch & 0x40) || !extra || ((index + extra) > count))
          return null;
        
        ch = ch & (0x3F >> extra);
        for (;extra > 0;extra -= 1)
        {
          var chx = data[index++];
          if ((chx & 0xC0) != 0x80)
            return null;
          
          ch = (ch << 6) | (chx & 0x3F);
        }
      }
      
      str += String.fromCharCode(ch);
    }
    
    return str;
  }


  bin2String(array:number[]) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
      result += String.fromCharCode(array[i]);
    }
    return result;
  }


  wordToByteArray(word:number, length:number) {
    var ba = [],
      i,
      xFF = 0xFF;
    if (length > 0)
      ba.push(word >>> 24);
    if (length > 1)
      ba.push((word >>> 16) & xFF);
    if (length > 2)
      ba.push((word >>> 8) & xFF);
    if (length > 3)
      ba.push(word & xFF);
  
    return ba;
  }


  wordArrayToByteArray(wordArray:CryptoJS.lib.WordArray, length:number) {
    let words:number[] = [];

    if (wordArray.hasOwnProperty("sigBytes") && wordArray.hasOwnProperty("words")) {
      length = wordArray.sigBytes;
      words = wordArray.words;
    }
  
    var result = [],
      bytes,
      i = 0;

    while (length > 0) {
      bytes = this.wordToByteArray(words[i], Math.min(4, length));
      length -= bytes.length;
      result.push(bytes);
      i++;
    }
    //return [].concat.apply([], result);
    return result.reduce((accumulator, value) => accumulator.concat(value), []);
  }


  byteArrayToWordArray(ba:number[]) {
    var wa:number[] = [],
      i;
    for (i = 0; i < ba.length; i++) {
      wa[(i / 4) | 0] |= ba[i] << (24 - 8 * i);
    }
  
    return CryptoJS.lib.WordArray.create(wa, ba.length);
  }


  testEncryption(){
    //TREBUIE FOLOSIT CATE UN IV DIFERIT PENTRU FIECARE FISIER TRIMIS SI CRIPTAT!
    //ACEA CHEIE ESTE SALVATA IN ENVIRONMENT si pe server si pe client
    //TU TREBUIE SA GENEREZI IV-uri d-astea si pe server si in client


    let name:string = "Ia sa punem altceva";
    
    let nameEncrypted:string = this.set(name,this.keyEnv,this.IvEnv);

    console.log('key:',this.keyEnv)
    console.log('Iv word array:',this.IvEnv)

    var bytearray:number[] = this.wordArrayToByteArray(this.IvEnv,16);

    console.log('Iv byte array:',bytearray);

    var decrypted = this.get(nameEncrypted,this.keyEnv,this.IvEnv);
    console.log('Encrypted word:')
    console.log(nameEncrypted);
    console.log('decrypted word:')
    console.log(decrypted);



    // Trimiti la server criptarea si cu bytearray
    //Bytearray il obtii cu metoda aia wordArrayToByteArray 
    //Trebuie sa folosesti metoda de generatere din WordArray a lui CryptoJs sa fie
    //Criptografic sigur, si de aia faci conversia aia din ce ai generat in byte array
    //Pentru ca serverul trebuie sa primeasca byte array
    //Asa ai configurat tu (ca sa poata primi byte array)
    var data = {
      "Id":null,
      "SkillName":nameEncrypted,
      "Iv": bytearray
    }

    const observer = {
      next: (response:any)=>{
        console.log('raspuns:')
        console.log(response)
        console.log(CryptoJS.enc.Base64.parse(response.iv));
        //Atunci cand ai primit raspunsul, ca sa il decriptezi te folosesti de
        //IV-ul trimis de pe server 
        //Dar tu ai pus in acel JSONparse din DTOs sa il faci Base64
        //Asa ca il parsezi cu formatul Base64 si asa devine WordArray
        //Il folosesti in functia de cryptare si ai primit raspunsul serverului
        //Sanatate toate cele bune
        console.log(this.get(response.data,this.keyEnv,CryptoJS.enc.Base64.parse(response.iv)));
      },
      error: (e:any) => {
        console.log("EROR",e)
      }
    }
    this.userService.testEncryption(data).subscribe(observer);
  }

  set(value:string, keyEnv:string, Iv:CryptoJS.lib.WordArray){
    var key = CryptoJS.enc.Utf8.parse(keyEnv);
    var encrypted = CryptoJS.AES.encrypt(value, key,
    {
        keySize: 128 / 8,
        iv: Iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }


  //The get method is use for decrypt the value.
  get(value:string,keyEnv:string,Iv:CryptoJS.lib.WordArray){
    var key = CryptoJS.enc.Utf8.parse(keyEnv);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: Iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);

  }

  Encryption(number:string) {
    console.log(number);
    var key = CryptoJS.enc.Utf8.parse('7061737323313233');
        var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(number), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        return encrypted.toString();
  }




  
}
