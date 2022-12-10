// Open new tab - add sessionstorage
// Link: https://blog.guya.net/2015/06/12/sharing-sessionstorage-between-tabs-for-secure-multi-tab-authentication/
(function() {

  if (!sessionStorage.length) {
    // Ask other tabs for session storage
    localStorage.setItem('getSessionStorage', Date.now());
  };

  window.addEventListener('storage', function(event) {

    if (event.key == 'getSessionStorage') {
      // Some tab asked for the sessionStorage -> send it

      localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
      localStorage.removeItem('sessionStorage');

    } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
      // sessionStorage is empty -> fill it
      var data = JSON.parse(event.newValue),
            value;

      for (key in data) {
        sessionStorage.setItem(key, data[key]);
      }
      dataK3p=JSON.parse(sessionStorage.user)
      // showSessionStorage();
    }
  });

  window.onbeforeunload = function() {
    //sessionStorage.clear();
  };
  window.addEventListener('load', function() {
    setTimeout(() => {
      if (dataK3p===undefined) {
        console.log("Üres a dataK3p")
        return
      }
      if (dataK3p.length>0) {
        console.log("Nem üres a sessionStorage")
        openNewTab()
      }
    }, 250);

  })


  /* This code is only for the UI in the demo, it's not part of the sulotion */

  let el;
// Innen folytasd! Itt kell kitalálni, h mikor mit csináljon
/*
Tehát mit is kell csináljon?

- az elején ellenőrizni kell, h van-e a sessionStorage-ban vmi?
- ha nincs, akkor kilép, 



  function showSessionStorage() {
    el.innerHTML = sessionStorage.length ? JSON.stringify(sessionStorage) : 'sessionStorage is empty';
  }

  window.addEventListener('load', function() {
    el = document.getElementById('storageData');
    showSessionStorage();

    document.getElementById('addData').addEventListener('click', function() {
      let dataTemp=[]
      dataTemp.push({user: dataObj})
      sessionStorage.setItem('user',JSON.stringify(dataTemp));
      showSessionStorage();
    })

    document.getElementById('clearData').addEventListener('click', function() {
      sessionStorage.clear();
      showSessionStorage();
    })
  })
*/ 
})();

// with buttons to switch between pages
      // TODO registerbutton, other buttons
const loginButton=document.getElementById('loginButton')
const registerButton=document.getElementById('registerButton')
const loginBack=document.getElementById('loginBack')
const firstPageSect=document.getElementById('firstPageSect')
const loginPage=document.getElementById('loginPage')
const registerPage=document.getElementById('registerPage')
const registerBack=document.getElementById('registerBack')
const main=document.getElementById('main')
const inputfields=document.querySelectorAll('input')
// kdbxFileDatabox items
const kdbxFilenameBox=document.querySelectorAll('.kdbxFilenameBox')
let kdbxFileDataboxLeft=document.getElementById('kdbxFileDataboxLeft')
let kdbxFileDataboxRight=document.getElementById('kdbxFileDataboxRight')
let kdbxFileDataboxRightTableTemplate=`
  <table id="tableContainer">
  <tbody>
  <tr>
    <th>Title</th>
    <th>Username</th>
    <th>Password</th>
    <th>URL</th>
    <th>Notes</th>
  </tr>
  </tbody>
  </table>
`
let kdbxFileIndex
// input section & input div
const inputSectionContainer=document.getElementById("inputSectionContainer")
const inputDivContainer=document.getElementById('inputDivContainer')
let isTrue=false
let groupNameClick
let targetIdTemp
  // TODO create funtion!!!
// login button
loginButton.addEventListener("click", ()  => {
  firstPageSect.classList.toggle('hide')
  loginPage.classList.toggle('hide')
})
// register button
registerButton.addEventListener("click",() => {
  firstPageSect.classList.toggle('hide')
  registerPage.classList.toggle('hide')
})
// loginBack button
loginBack.addEventListener("click", () => {
  firstPageSect.classList.toggle('hide')
  loginPage.classList.toggle('hide')
  clearInputFields()
})
// registerBack button
registerBack.addEventListener("click", ()=> {
  firstPageSect.classList.toggle('hide')
  registerPage.classList.toggle('hide')
  clearInputFields()
})

// Impressum 
const impressumAndFAQContainer=document.getElementById('impressumAndFAQContainer')
const impressumH6=document.getElementById('impressumH6')
const impressumSec=document.getElementById('impressumSec')
const impressumDivContainer=document.getElementById('impressumDivContainer')
const impressClose=document.getElementById('impressClose')
// click impressum & FAQ

// see impress

impressumH6.addEventListener('click', ()=> {
  impressumSec.classList.toggle('hide')
  impressumAndFAQContainer.classList.remove("row", "active")
  impressumAndFAQContainer.classList.add("hide")
  impressumDivContainer.classList.add('active')
  main.classList.remove("active")
  setTimeout(() => {
    main.classList.remove("column")
    main.classList.add("hide")
  }, 700);

})

// impressClose click

impressClose.addEventListener('click',()=>{
  main.classList.remove("hide")
  setTimeout(() => {
    main.classList.add("column", "active")
  }, 10);

  setTimeout(() => {
    impressumDivContainer.classList.remove('active')
    impressumAndFAQContainer.classList.add("row", "active")
    impressumAndFAQContainer.classList.remove("hide")
    impressumSec.classList.toggle('hide')

  }, 700);
})

// F.A.Q

const FAQH6=document.getElementById('FAQH6')
const faqSection=document.getElementById('faqSection')
const FAQDivContainer=document.getElementById('FAQDivContainer')
const faqClose=document.getElementById('faqClose')

// see F.A.Q.

FAQH6.addEventListener('click', ()=> {
  faqSection.classList.toggle('hide')
  impressumAndFAQContainer.classList.remove("row", "active")
  impressumAndFAQContainer.classList.add("hide")
  FAQDivContainer.classList.add('active')
  main.classList.remove("active")
  setTimeout(() => {
    main.classList.remove("column")
    main.classList.add("hide")
  }, 700);

})

// F.A.Q close click

faqClose.addEventListener('click',()=>{
  main.classList.remove("hide")
  setTimeout(() => {
    main.classList.add("column", "active")
  }, 10);

  setTimeout(() => {
    FAQDivContainer.classList.remove('active')
    impressumAndFAQContainer.classList.add("row", "active")
    impressumAndFAQContainer.classList.remove("hide")
    faqSection.classList.toggle('hide')

  }, 700);
})

// F.A.Q. show and hide Answers
const dataQuestion=document.querySelectorAll("[data-question]")
const dataAnswer=document.querySelectorAll("[data-answer]")
const answerDiv=document.querySelectorAll(".answerDiv")
const arrow=document.querySelectorAll(".arrow")

dataQuestion.forEach((val, index)=> {
dataQuestion[index].addEventListener("click", ()=> {
  if (arrow[index].classList.contains('active')) {
    arrow[index].classList.toggle('active')
    answerDiv[index].classList.toggle('active')
    setTimeout(() => {
       dataAnswer[index].classList.toggle('hide')
    }, 700);
    return;
  }
  if (!arrow[index].classList.contains('active')) {
    arrow[index].classList.toggle('active')
  dataAnswer[index].classList.toggle('hide')
  setTimeout(() => {
    answerDiv[index].classList.toggle('active')
  }, 10);
  }
  })
})


// Login Button click
  // input name and password to array
  // post body data
  // TODO javítsd ki az új paramétereknek megfelelőre!
  /* 
  "emailDto": "app_user@test.email",
    "passwordDto": "app_pw"
  */ 
 const dashboard=document.getElementById('dashboard')
let loginArr={
  emailDto: '',
  passwordDto: ''
}
let dataK3p
let namevalue=""
let passwordvalue=""
const nameInput=document.getElementById('nameInput')
nameInput.addEventListener("keyup",()=>{
  loginArr.emailDto=nameInput.value
  namevalue=loginArr.emailDto.length
})
const passwordInput=document.getElementById('passwordInput')
passwordInput.addEventListener("keyup",()=>{
  loginArr.passwordDto=passwordInput.value
  passwordvalue=loginArr.passwordDto.length
})

const LoginPageLoginButton=document.getElementById('LoginPageLoginButton')
const loginResult=document.getElementById('loginResult')
const dashboardContainer=document.getElementById('dashboardContainer')
// request options
// TODO if emailDto && || passworDto empty, email form check


LoginPageLoginButton.addEventListener("click",()=> {
  const url='http://127.0.0.1:9933/api/jwt_login'
/*

                FONTOS! tEDD MAJD VISSZA AZ EMAIL ÉS A CHECKLENGHT ELLENŐRZÉST!!!!!
   
// emailcheck(loginArr.emailDto)
//   if (isTrue) {
//     checkLenght(passwordvalue)
//   }
*/
isTrue=true
  if (isTrue) {
      const dataTemp=JSON.parse(sessionStorage.getItem('user')) || []
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(loginArr),
  }
  try{
    console.log(loginArr)
     fetch(url, options)
  .then(response => response.json())
  .then(data => {
    loginArr.emailDto=''
    loginArr.passwordDto=''
    nameInput.value=""
    setTimeout(() => {
     passwordInput.value="";
    }, 50);
    passwordInput.value=""
    let resultTemplate=`<h2>`
    console.log(data)
    if (data.error) {      
      inputfields[0].value="Wrong e-mail or password"
    }
    if (!data.error) {
      // if jwtToken==
      /*
      JwtTokennel el kell küldeni, h megkapjam az adatbázist. 
      Kérdés, honnan kapom meg a kdbxFilePwDto értékét?
      a visszakapott adatbázist le kell tárolni vagy SessionStorage vagy simán egy objectumban.
      */ 

      dataTemp.push({user: data})
      sessionStorage.setItem('user', JSON.stringify(dataTemp))
      dataK3p=JSON.parse(sessionStorage.user)
      // dataK3p[0].user

      loginPage.classList.toggle('hide')
      dashboard.classList.toggle('hide') 
    /*
    Ha kellene egy betöltés közti lap, akkor azt ide lehetne megszerkeszteni
          let dashboardTemplate=`
      <div id="welkommeContainer" class="column justyCenter alignCenter">
      <h2 id="dashboardH2" class="">Üdvözöllek ${data.firstName} ${data.lastName}! </h2>
      </div>
      ` 
       dashboardContainer.innerHTML=dashboardTemplate
      Ezt csináld meg 
    */   
      createDashboard()
    }
  }
    
    )
  }catch {
    console.log("valami nem megy")
  }
 
  }  
  if (!isTrue) {
    inputfields[0].classList.toggle('warningTextColor')
    let resultTemplate=`The e-mail or password is short!`
    inputfields[0].value=resultTemplate
    inputfields[1].value=""
    setTimeout(() => {
      inputfields[0].value=""
      inputfields[0].classList.toggle('warningTextColor')
    }, 2000);

    setTimeout(() => {
      nameInput.focus()
      loginResult.innerHTML=""
    }, 2000);
  }
})
let kdbxObject

// Open kdbx file

function openKdbxFile(textTemplate) {

  inputDivContainer.innerHTML=textTemplate
  const cancelKdbxFile=document.getElementById('cancelKdbxFile')
  inputSectionContainer.classList.toggle('active')
  // close inputSections
  cancelKdbxFile.addEventListener("click",()=> {
    inputSectionContainer.classList.toggle('active')
    inputDivContainer.innerHTML=""
  })
  // kdbxFile download
  const sendKdbxFilePassword=document.getElementById('sendKdbxFilePassword')
  const passwordKdbxFile=document.getElementById('passwordKdbxFile')
  const kdbxPasswordH2=document.getElementById('kdbxPasswordH2')

  // password  storage
  let tempPassword
  passwordKdbxFile.addEventListener("keyup",()=> {
    tempPassword=passwordKdbxFile.value
  })

  // sending a request to the server

  sendKdbxFilePassword.addEventListener("click", ()=> {
    const urlGetToGroup='http://127.0.0.1:9933/api/kdbx/1/groups/get_top_group'
    const dataTemp=JSON.parse(sessionStorage.getItem('kdbx')) || []
    let jwtToken=dataK3p[0].user.jwtToken 
  
    let bodydataKdbxfileOpen={
      "kdbxFilePwDto": `${tempPassword}`
    }
    let options={
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
       'Accept' : 'application/json',
       'Authorization': `Bearer ${jwtToken}`,
     },
      body: JSON.stringify(bodydataKdbxfileOpen),
      };
      fetch(urlGetToGroup, options)
      .then(response => response.json())
        .then(data =>{
          if (!data.error) {
            dataTemp.push([data])
            sessionStorage.setItem('kdbx', JSON.stringify(dataTemp))
           
            let tempJson=JSON.parse(sessionStorage.kdbx)
            let temp02=tempJson[0][0]
            kdbxObject={"kdbx":{0:[temp02]},}
             changeBoxName(kdbxObject['kdbx'])
             inputSectionContainer.classList.toggle('active')
             inputDivContainer.innerHTML=""
          }
          if (data.error) {
            kdbxPasswordH2.style.color="red"
            kdbxPasswordH2.innerHTML="Wrong password!"
            passwordKdbxFile.value=""
            setTimeout(() => {
              kdbxPasswordH2.style.removeProperty('color')
              kdbxPasswordH2.innerHTML="Please enter the password"
            }, 3000);
          }
        })
  

  })

}

// kdbx file download

function kdbxDownload() {

  // a kapott tokennel lekérjük, majd eltároljuk egy objectben
  /*
  localhost:9933/api/kdbx/1/groups/get_top_group 
  ide kell majd elküldeni a bekért jelszóval együtt, h visszakapjam a JSON file-t

  TODO: js-be milyen encrypt lehetőségek vannak??
  - target:_blank : memóriát tudok átvinni???
  */ 
  const urlez='http://127.0.0.1:9933/api/kdbx/1/groups'
  const dataTemp=JSON.parse(sessionStorage.getItem('kdbx')) || []
   let jwtToken=dataK3p[0].user.jwtToken
//    console.log("Token: "+jwtToken)
//   console.log("kdbx funkció")

  let bodydata= {       
    "kdbxFileDto":
    {
        "kdbxFilePwDto": "1"
    },
    
    "groupDto":
    {
        "expiresDto": "",
        "groupExpiryTimeDto": "",
        "sourceGroupDirectionDto" : "R",
        "targetGroupDirectionDto": "",
        "groupNameDto": "NyitiG_Világa"
    }
}
let options={
  method: 'POST',
  headers: {
   'Content-Type': 'application/json',
   'Accept' : 'application/json',
   'Authorization': `Bearer ${jwtToken}`,
 },
  body: JSON.stringify(bodydata),
  };
// console.log("Options accept: "+options.headers.Authorization);
   fetch(urlez, options)
 .then(response => response.json())
   .then(data =>{
    // debugger
    dataTemp.push([data])
    sessionStorage.setItem('kdbx', JSON.stringify(dataTemp))
   
    let tempJson=JSON.parse(sessionStorage.kdbx)
    let temp02=tempJson[0][0]
    kdbxObject={"kdbx":{0:[temp02]},}
     createDashboard()
     changeBoxName(kdbxObject['kdbx'])
   })
 
}


// register Button click
/*
TODO:
- check input fields : empty =>  error message
  write function
- check e-mail field:  empty && || wrong format => error message
  write function
-check password: lenght && || differ => error message
  write function
-if everything is correct => fetch POST then wait for the returned JSON =>
  -if JSON ok => 
  if JSON wrong =>
*/ 

const firstNameReg=document.getElementById('firstNameReg')
const lastNameReg=document.getElementById('lastNameReg')
const emailInputReg=document.getElementById('emailInputReg')
const passwordInputReg=document.getElementById('passwordInputReg')
const passwordInputReg2=document.getElementById('passwordInputReg2')
const regsterPageRegButton=document.getElementById('regsterPageRegButton')
const RegisterResult=document.getElementById('RegisterResult')

let regArr={
  firstNameDto: "",
  lastNameDto: "",
  emailDto: "",
  passwordDto: "" 
}
let checktempl=""
let pasw2val=""
// load inputs values regArr

firstNameReg.addEventListener("keyup",()=>{
  regArr.firstNameDto=firstNameReg.value
})
lastNameReg.addEventListener("keyup",()=>{
  regArr.lastNameDto=lastNameReg.value
})
emailInputReg.addEventListener("keyup",()=>{
  regArr.emailDto=emailInputReg.value
})
passwordInputReg.addEventListener("keyup",()=>{
  regArr.passwordDto=passwordInputReg.value
})
passwordInputReg2.addEventListener("keyup",()=>{
pasw2val=passwordInputReg2.value
})

// Sing up button click

regsterPageRegButton.addEventListener("click",()=>{
  let index=2
  // check inputs fields
  checktempl=regArr.firstNameDto.length
  checkLenght(checktempl)
  if (!isTrue) {
    wrongInput(index)
    console.log("rovid a firstname")
    return
  }
  index++
  checktempl=regArr.lastNameDto.length
  checkLenght(checktempl)
  if (!isTrue) {
    wrongInput(index)
    console.log("rovid a lastname")
    return
  }
  index++
  checktempl=regArr.emailDto
   emailcheck(checktempl)
  if (!isTrue) {
    wrongInput(index)
    console.log("nem megfelelő az emailcím formátum")
    return
  }
  index++
  checktempl=regArr.passwordDto
  console.log(checktempl.length+" checklenght")
  if (checktempl.length<3 || checktempl!=pasw2val ) {
    wrongInput(index)
    console.log("Nem egyezik a password")
    return
  }
  // everything is ok!
  console.log("Lefutott a check. isTrue: "+isTrue)
  // kell egy ellenőrzés, h regisztrált-e már
  regcheck()
  
})

// wrong functions

function wrongInput(index) {
  switch (index) {
    case 2:
    case 3: 
      inputfields[index].classList.toggle('warningTextColor')
      inputfields[index].value="Short name!"
      setTimeout(() => {
        inputfields[index].classList.toggle('warningTextColor')
        inputfields[index].value=""
        inputfields[index].focus()
      }, 2000);
      break;

    case 4:
      inputfields[index].classList.toggle('warningTextColor')
      inputfields[index].value="Wrong e-mail!"
      setTimeout(() => {
        inputfields[index].classList.toggle('warningTextColor')
        inputfields[index].value=""
        inputfields[index].focus()
      }, 2000);
      break;
      case 5:
        inputfields[index].classList.toggle('warningTextColor')
        inputfields[index].type='text'
        inputfields[index].value="Wrong password"
        inputfields[6].value=""
        setTimeout(() => {
          inputfields[index].classList.toggle('warningTextColor')
          inputfields[index].type='password'
          inputfields[index].value=""
          inputfields[index].focus()
        }, 2000);
        break;
    default:
      break;
  }


}


// Email address check 

function emailcheck(emailAddress) {
  isTrue=false
  let mailformat=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (emailAddress.match(mailformat)) {
    isTrue=true
    console.log("istrue: "+isTrue)
  }
}
// Reg check
function regcheck() {
  console.log("regcheck function start")
  const urlRegcheck='http://127.0.0.1:9933/api/admin/get_all_user'
  fetch(urlRegcheck)
  .then((response)=> response.json())
  .then((data) => {
     isTrue=true
    data.forEach((val,ind) => {
      console.log("index: "+ind)
      console.log("dataINdex.email: "+data[ind].emailDto) 
      // Ha regisztrált, akkor  
      if(data[ind].emailDto==regArr.emailDto) {
        isTrue=false
        console.log("azonos az emailcím")
        emailInputReg.value="The email is taken"
        emailInputReg.classList.toggle('warningTextColor')
        setTimeout(() => {
          emailInputReg.value=""
          emailInputReg.classList.toggle('warningTextColor')
          return;
        }, 3500);
      } 
      //TODO Ha nem regisztrált, akkor mehet 
      if (data[ind].emailDto!=regArr.emailDto) {
      console.log("nem egyezik az emailcím") 
      }
    })

  })
  .then(()=>{
    console.log("Ez az utolsó then ág")
    if (isTrue==true) {
      register()
    }
  }
  )
}

// register function
function register() {
  console.log("Ez a regiszter function")
  const regUrl='http://127.0.0.1:9933/api/register/register_new_user'
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(regArr)
  }
  try {
    fetch(regUrl,options)
    .then(response => response.json())
    .then(data => {
      let mainContainerTemp=`
      <h2 id="dashboardH2" class="">Sikeresen regisztráltál ${data.firstName} ${data.lastName}! </h2>
      <p id="dashboardEmail" class="">A(z) ${data.email} címre kiküldtük a megerősítő emailt.</p>
      <p>Kérjük, kattints az emailben található üzetnetre, hogy megerősítsd a regisztrációd!</p>
      <p>A megerősítést követően már be tudsz jelentkezni az oldalra.</p>
      <p>Üdvözlettel: a K3P csapata</p>
      `
      main.innerHTML=mainContainerTemp
    })
  } catch (error) {
    console.log("valami nem működik! Hiba: "+error)
  }  
}

// Password lenght check

function checkLenght(value) {
  isTrue=false
  console.log(value)
  if (value>2) {
    console.log("Bejön az if ágba")
    isTrue=true
    console.log(isTrue)
    return
  }
}

// back button click => clear all inputfields

function clearInputFields() {
// all input const is done
  inputfields.forEach((val,ind)=> {
    inputfields[ind].value=""
  })

}

// DASHBOARD PAGE

// !!!!! TODO dashbord class adding: #fullPageSec, #fullPageDivCont, #main !!!!
// create dashboard Page


function createDashboard() {
const fullPageSec=document.getElementById('fullPageSec')
const fullPageDivCont=document.getElementById('fullPageDivCont')
const header=document.getElementById('header')
const beginHeader=document.getElementById('beginHeader')
const dashboardHeader=document.getElementById('dashboardHeader')
const settingsSvg=document.getElementById('settingsSvg')
const closeMenuListCont=document.getElementById('closeMenuListCont')
const menuListCont=document.getElementById('menuListCont')
const logOut=document.getElementById('logOut')
const footer=document.getElementById('footer')
const footerContainer=document.getElementById('footerContainer')
let tree

// Header change
fullPageSec.classList.add('dashboard')
fullPageDivCont.classList.add('dashboard')
header.classList.add('dashboard')
footer.classList.add('dashboard')
footerContainer.classList.add('dashboard')
main.classList.add('dashboard')
beginHeader.classList.remove('active')
dashboardHeader.classList.add('active')


// Settings menu clicked (open and close)
settingsSvg.addEventListener("click", ()=> {
settingsSvg.classList.toggle('active')
menuListCont.classList.toggle('active')
})
closeMenuListCont.addEventListener('click',()=> {
settingsSvg.classList.toggle('active')
menuListCont.classList.toggle('active')
})

// log Out
logOut.addEventListener('click',()=>{
  main.innerHTML=`<h1>Hi!<h1>`
  setTimeout(() => {
    sessionStorage.clear()
    setTimeout(() => {
      window.location.reload(true)
    }, 1000);
    
  }, 2000);
})
// Headerbuttons add functions
const buttonsHeader=document.querySelectorAll('.buttonsHeader')
for (let index = 0; index < buttonsHeader.length; index++) {
  buttonsHeader[index].addEventListener("click",()=> {
    switch (index) {
      case 5:
        let textTemplateTemp=`
      <h2 id="kdbxPasswordH2">Please enter the password</h2>
      <label for="passwordKdbxFile" class="marginTopLogPage">Password</label>
      <input type="password" name="passwordKdbxFile" id="passwordKdbxFile" class="" value="" placeholder="" autocomplete="off" required="required">
      <div id="sendKdbxFilePassword" class="buttons">Send</div>
      <div id="cancelKdbxFile" class="buttons">Cancel</div>
        `
        openKdbxFile(textTemplateTemp)
        
        break;
    
      default:
        break;
    }
  })
  
}
// click context menu
contextMenuClick()

}

let textTemp=``
let level=0
let indexHead=0
let IDIndex=0
let groupIDNames=[]
let liGroupObjActLev=0
let liGroupObj={}
let liGroups=[]
let olGroupsObj={}
let olGroups=[]
let olGroupNames=[]
// Egy hasnonlót kell csinálj divnek, vagy ol-nek, mint amit a liGroupsnak
let searchObj={}
let tabClass=[]
let liClickObj
let olOpenObj
// class, h klikkelni lehessen
let classIDNames=[]
let classClickObj={}
let classGroups=[]
let tableContainer=document.querySelector("#tableContainer tbody")
let dataTargetId=[]
let dataIndex=[]

// all obj & arr for kdbx file load  clear function
function allObjArrForKdbxFile() {
    textTemp=``
    level=0
    indexHead=0
    IDIndex=0
    groupIDNames=[]
    liGroupObjActLev=0
    liGroupObj={}
    liGroups=[]
    olGroupsObj={}
    olGroups=[]
    olGroupNames=[]
    searchObj={}
    tabClass=[]
    liClickObj
    olOpenObj
    classIDNames=[]
    classClickObj={}
    classGroups=[]
    dataTargetId=[]
    dataIndex=[]
}

// próbatömb

const teszt=document.getElementById('teszt')

function kdbxFileDataboxRightCreatTable() {
  kdbxFileDataboxRight.innerHTML=""
  kdbxFileDataboxRight.innerHTML=kdbxFileDataboxRightTableTemplate
  tableContainer=document.querySelector("#tableContainer tbody")
}

function changeBoxName(obj) {
  kdbxFileDataboxRight.innerHTML=""
  kdbxFileDataboxRight.innerHTML=kdbxFileDataboxRightTableTemplate
  tableContainer=document.querySelector("#tableContainer tbody")
    for (let  i= 0;  i< obj[0].length; ++i) {
      kdbxFilenameBox[i].innerHTML=obj[0][i].name
      kdbxFilenameBox[i].addEventListener("click", ()=>{
        // debugger
        kdbxFileIndex=i
        kdbxFileBoxClick(kdbxFileIndex)
        })  
        }
  }
/*
Mit is kellene csináljon?
Az lenne a lényeg, h a klikkeléstől válasszuk külön a funkciót
Azaz itt az a lényeg, h azonosítsuk vmivel azt a kdbx fájlt, aminek az objectumát megjelenítjük

*/
function kdbxFileBoxClick(index) {
  kdbxFileDataboxLeft=document.getElementById('kdbxFileDataboxLeft')
  kdbxFileDataboxLeft.innerHTML=""
  kdbxFileDataboxRightCreatTable()
  allObjArrForKdbxFile()
  // ezt majd le kell tesztelni akkor is, amikor már több kdbx fájl lett letöltve. Most működik. :)
  let tempJson=JSON.parse(sessionStorage.kdbx)
  let temp02=tempJson[index][0]
  kdbxObject={"kdbx":{0:[temp02]},}
  liGroups=[kdbxFileDataboxLeft]
  let newliGroup={[level]:liGroups}
  liGroupObj={...liGroupObj,...newliGroup}
  searchObj={...kdbxObject['kdbx']}

  objectHeadquaders(searchObj,level,indexHead)

}

  // Object bejárás

  function objectHeadquaders(obj,level,index) {  
    //  debugger
            let result = Object.entries(obj)
            // console.log(result.length)
            if (result.length>0) {
                for (let y = 0; y < result.length; y++) {
                    //  debugger
                   let objtemp=[]
                     objtemp=result[y][1]
                    liGroupObjActLev=liGroupObj[level][y]
                    if (objtemp.length>0) {
                      objectCommander(objtemp,level,y)  
                    }
                    // ide kell megírni azt a részt az olObj-nek, amikor nincs [] 
                    if (objtemp.length==0) {
                        olGroups=["none"]
                        switch (olGroupsObj[level+1]) {
                            case undefined:
                                let temp01={[level+1]:[olGroups]}
                                olGroupsObj={...olGroupsObj,...temp01}
                                break;
                        
                            default:
                                olGroupsObj[level+1].push(olGroups)
                                break;
                        }
                    }
    
                }
                level++
                indexHead=0
                IDIndex=0
                if (searchObj[level]===undefined) {
                    seeFullTree()
                    addTreeClick()
                    dataIndex=document.querySelectorAll("[data-index]")
                    dataTargetId=document.querySelectorAll("[data-ol]")  
                    writeTarget()             
                    return
                }
                  objectHeadquaders(searchObj[level],level,index)            
            }
        }
// teszt.addEventListener('click',()=>{
//   firstPageSect.classList.toggle('hide')
//   dashboard.classList.toggle('hide')
// let dataTemp=xarr
// // kdbxObject={"kdbx":{0:[]},}
// // debugger Ez egy eléggé hibás rész, m egy csomó mindent kiszedtél már!!!

//   sessionStorage.setItem('kdbx', JSON.stringify(dataTemp))
//   kdbxObject.kdbx[0]=JSON.parse(sessionStorage.kdbx)
//   createDashboard()
//   changeBoxName(kdbxObject['kdbx'])

//   // Object bejárás 

// })

function writeTarget() {
    /*
    Mit is kellene csinálni?
    1-ről indulunk, hiszen a 0- elem targetID-ja az ""
    - Olvassa be az adott ol tag data-targetben található value-t
    - a children (ezek az li-k) lenght-en menjen végig, a (a=index) 0-nak D a többinek pedig +L-eket
    írja bele az adott li data-targetid-jébe 
    -nézze meg, h van-e alatta is még:
    dataTargetId[index].children[a].children[1].children[0]!=undefined akkor
    - az adott li-nek (a=index) alatta lévő ol data-targetébe is be kell írni ugyanzet
    dataTargetId[index].children[a].children[1].children[0].children[0].attributes[2].value értékét

    */ 
    for (let index = 1; index < dataTargetId.length; index++) {
        let targetValue
        targetValue=dataTargetId[index].attributes[2].value
        let liSArray=dataTargetId[index].children
        for (let a = 0; a < liSArray.length; a++) {
            if (a==0) {
                targetValue+="D"
                liSArray[a].attributes[3].value=targetValue
            }
            if (a!=0) {
                targetValue+="R"
                liSArray[a].attributes[3].value=targetValue
            }
            if (dataTargetId[index].children[a].children[1].children[0]!=undefined) {
                dataTargetId[index].children[a].children[1].children[0].children[0].attributes[2].value=targetValue
            }
            
        }
    }
}

function seeFullTree() {
// see all groups into the tree
 const dataIndex=document.querySelectorAll("[data-levelindex]")
let olGroupObjEntr=Object.entries(olGroupsObj)
for (let a = 0; a < olGroupObjEntr.length; a++) {
    let olGroupObjEntrTemp=olGroupObjEntr[a]
    for (let b = 0; b < olGroupObjEntrTemp[1].length; b++) {
        let tags=olGroupObjEntrTemp[1][b].length
        if (tags==undefined) {
            olGroupObjEntrTemp[1][b].classList.add('active')
            let idValue=olGroupObjEntrTemp[1][b].attributes[0].value
            for (let c = 0; c < dataIndex.length; c++) {
                let arrowValid=dataIndex[c].attributes[2].value
                if (arrowValid==idValue) {
                    dataIndex[c].classList.add('active')
                }
            }
        }
    }
}
}

function objectCommander(obj1,level,index) {
   if (obj1.length>0) {
      textTemp+=`<div id="lev${level}index${index}" class="tab">
      <ol data-ol="lev${level}index${index}" data-level="${level}" data-target="" class="column olS" >`
      let levelIndex=`lev${level}index${index}`
    for (let i = 0; i < obj1.length; i++) {
    objectKeySelector(obj1[i],i,level,levelIndex)
   }  
    textTemp+=`</ol></div>`
    liGroupObjActLev.innerHTML+=textTemp
    textTemp=``
    let olIDNames=`lev${level}index${index}`
    olGroups=document.getElementById(olIDNames)

    switch (olGroupsObj[level+1]) {
        
        case undefined:
            let temp01={[level+1]:[olGroups]}
            olGroupsObj={...olGroupsObj,...temp01}
            break;
    
        default:

            olGroupsObj[level+1].push(olGroups)
            break;
    }

   for (let z = 0; z < obj1.length; z++) {
    let idGroup=groupIDNames[z]
    liGroups=document.getElementById(idGroup)
    classGroups=document.getElementsByClassName(idGroup)



   switch (liGroupObj[level+1]) {
    case undefined:
       if (liGroups===null) {
            liGroups=[]
            classGroups=[[]]
        }
        newliGroup={[level+1]:[liGroups]}
        liGroupObj={...liGroupObj,...newliGroup}
        newliGroup={[level+1]:[classGroups[0]]}
        classClickObj={...classClickObj,...newliGroup}

        IDIndex++
        break;
    default:
        if (liGroupObj[level+1][IDIndex]===undefined) {
            // olGroups=document.getElementById(olIDNames)
            if (liGroups===null) {
                liGroups=[]
                classGroups=[[]]
            }
            liGroupObj[level+1].push(liGroups)
            classClickObj[level+1].push(classGroups[0])
            IDIndex++
        }
        break;
   }
   }
 groupIDNames=[]
    return;
   }
}

function objectKeySelector(obj1,ind,level,levelIndex) {
    for (const i in obj1) {
        if (i==='name') {
            textTemp+=`<li id="" class="" data-index="${ind}" data-targetid="">
            <div id="" class="groups0${level}ind0${indexHead} row alignCenter cursorPointer">
            <img src="assets/pic/arrow-forward-circle-outline.svg" data-imgarrow="groups0${level}ind0${indexHead}" data-levelindex="${levelIndex}" alt="" class="liArrow">
            <div class="row alignCenter cursorPointer" data-div="groups0${level}ind0${indexHead}">
            <img src="assets/pic/folder-outline.svg" data-imgarrowfolder="groups0${level}ind0${indexHead}" alt="" class="liArrow">
            <span id="" class="" ">${obj1[i]}</span>
            </div>
            </div><span id="groups0${level}ind0${indexHead}" class=""></span></li>`
            let idName=`groups0${level}ind0${indexHead}`
            groupIDNames.push(idName)
           
        }
      if (i==='entries'){
        if (obj1[i].length>0) {
             entriesCreat(obj1[i],level,liGroupObjActLev)
            // Itt kell majd megcsinálni, h az enrties-ek menjenek a table-ba
        }
       }
        if (i==='groups') {
            if (obj1[i].length==0) {
                switch (searchObj[level+1]) {
                    case undefined:
                        let newZeroArr={[indexHead]:[]}
                        let newZeroArr1={[level+1]:newZeroArr}
                        searchObj={...searchObj,...newZeroArr1}
                        indexHead++
                        break;
                
                    default:
                        if (searchObj[level+1][indexHead]===undefined) {
                            let levelTemp1=level+1
                            let newZeroArr2=[]
                            let newZeroArr3={[indexHead]:newZeroArr2}
                            searchObj[levelTemp1]={...searchObj[levelTemp1],...newZeroArr3}
                            indexHead++
                        }
                        break;
                }
            }

            if (obj1[i].length>0) {
                isTrue=true
                switch (searchObj[level+1]) {
                    case undefined:
                        let newPair0={[indexHead]:obj1[i]}
                        let newPair={[level+1]:newPair0}
                        searchObj={...searchObj,...newPair}
                        indexHead++
                        break;

                    default:
                        if (searchObj[level+1][indexHead]===undefined) {
                            let levelTemp=level+1
                            let newPair1=obj1[i]
                            let newPair2={[indexHead]:newPair1}
                            searchObj[levelTemp]={...searchObj[levelTemp],...newPair2}
                            indexHead++
                        }                       
                        break;
                }
            }
      }
    }
}

function entriesCreat(obj,level,liGroupObjActLev) {
    let tableTextTemp=""
    let titleTd
    let usernameTd
    let passwordTd
    let urlTd
    let notesTd
   let objEntries=Object.entries(obj)
    for (let a =0; a<objEntries.length; a++) {
        tableTextTemp+="<tr class="+"groups0"+`${level}`+"ind0"+`${indexHead}`+" "+">"
          let objEntriesTemp=objEntries[a]
          let propertiesObj=objEntriesTemp[1].properties
          let propertiesObjTemp=Object.entries(propertiesObj)
          for (let b = 0; b < propertiesObjTemp.length; b++) {
            if (propertiesObjTemp[b][1].key=='Title') {
                let titleTdtemp=`<td>
                <div class="row alignCenter">
                <img src="assets/pic/key-outline.svg"  alt="" class="liArrow">
                <span class="tableTrSpan">${propertiesObjTemp[b][1].value}</span>
                </div>
                </td>`
                titleTd=titleTdtemp.replaceAll(/`/g, "")
            }
            if (propertiesObjTemp[b][1].key=='UserName') {
                usernameTd=`<td>${propertiesObjTemp[b][1].value}</td>`
            }
            if (propertiesObjTemp[b][1].key=='Password') {
                passwordTd=`<td>${propertiesObjTemp[b][1].value}</td>`
            }
            if (propertiesObjTemp[b][1].key=='URL') {
                urlTd=`<td>${propertiesObjTemp[b][1].value}</td>`
            }
            if (propertiesObjTemp[b][1].key=='Notes') {
                notesTd=`<td>${propertiesObjTemp[b][1].value}</td>`
            }
          }
          tableTextTemp+=titleTd+usernameTd+passwordTd+urlTd+notesTd
    }
    tableTextTemp+="</tr>"
    tableContainer.innerHTML+=tableTextTemp
}
let tableOpenClassArr
let counter=0

// context menues closeing functions

function closeContextGropMenu() {
  if (contextGroupMenu.classList.contains('active')) {
    contextGroupMenu.classList.remove('active')
    targetIdTemp=""
    groupNameClick=""
  }
}

function closeContextEntriesMenu() {
  if (contextEntriesMenuCont.classList.contains('active')) {
    contextEntriesMenuCont.classList.remove('active')
    // idtt majd le kell 0-ni az entries-hez tartozó változók értékeit.
  }
  
}


function addTreeClick() {
/*
Fa megjelnítés elkészítése
*/ 
for (let a = 1; a < tableContainer.children.length; a++) {
    tableContainer.children[a].classList.add('tableTr')    
}
// divek elérhetőek=> entries-ek megjelenítéséhez
const dataDivs=document.querySelectorAll("[data-div]")
// entries-ek <tr> elérések
const tableTr=document.querySelectorAll('.tableTr')
const kdbxFileFooterInfos=document.getElementById('kdbxFileFooterInfos')
const tableTrSpan=document.querySelectorAll('.tableTrSpan')
// entries-ek 1 klikk, right click
const contextEntriesMenuCont=document.getElementById('contextEntriesMenuCont')
const entriesMenuItem=document.querySelectorAll('.entriesMenuItem')
for (let index = 0; index < tableTr.length; index++) {
  // left click
  tableTr[index].addEventListener("click",()=> {
    for (let asa = 0; asa < tableTr.length; asa++) {
      tableTr[asa].classList.remove('backgroundColor')
        }
        tableTr[index].classList.add('backgroundColor')
    if (kdbxFileFooterInfos.childNodes[0]===undefined) {
      // végülis csak azt kell megnézni, h melyik nél van .activ class
      // onnan kinyerhető a group name
      isTrue=true
      let tt=0
      let groupNames
      do {
        if (dataDivs[tt]===undefined) {
          // nehogy végtelen ciklus legyen
          isTrue=false
        }
        if (dataDivs[tt].classList.contains('active')) {
          isTrue=false
           groupNames=dataDivs[tt].children[1].innerHTML
        }
        tt++
      } while (isTrue);
      
      let entriesName=tableTrSpan[index].innerHTML
      let fileinfoTemplate=`
      <div id="kdbxFooterInfosEntriesDiv">
      <span>Group: ${groupNames}</span>
      <span>Title: ${entriesName}</span>
      <span>username: ${tableTr[index].childNodes[1].innerHTML}</span>
      <span>password: ${tableTr[index].childNodes[2].innerHTML}</span>
      <span>URL: <a href="${tableTr[index].childNodes[3].innerHTML}" target="_blank" rel="noopener noreferrer">${tableTr[index].childNodes[3].innerHTML}</a></span>
      <br>
      <span>Notes: ${tableTr[index].childNodes[4].innerHTML}</span>
      </div>
      `
      kdbxFileFooterInfos.innerHTML=fileinfoTemplate
      const kdbxFooterInfosEntriesDiv=document.getElementById('kdbxFooterInfosEntriesDiv')
      setTimeout(() => {
        kdbxFooterInfosEntriesDiv.classList.add('active')
      }, 300);
    }
    else {
      kdbxFooterInfosEntriesDiv.classList.remove('active')
      
      setTimeout(() => {
       
        kdbxFileFooterInfos.innerHTML=""
        isTrue=true
      let ttd=0
      let groupNames
      do {
        if (dataDivs[ttd]===undefined) {
          // nehogy végtelen ciklus legyen
          isTrue=false
        }
        if (dataDivs[ttd].classList.contains('active')) {
          isTrue=false
           groupNames=dataDivs[ttd].children[1].innerHTML
        }
        ttd++
      } while (isTrue);
        let entriesName=tableTrSpan[index].innerHTML
        let fileinfoTemplate=`
        <div id="kdbxFooterInfosEntriesDiv">
        <span>Group: ${groupNames}</span>
        <span>Title: ${entriesName}</span>
        <span>username: ${tableTr[index].childNodes[1].innerHTML}</span>
        <span>password: ${tableTr[index].childNodes[2].innerHTML}</span>
        <span>URL: <a href="${tableTr[index].childNodes[3].innerHTML}" target="_blank" rel="noopener noreferrer">${tableTr[index].childNodes[3].innerHTML}</a></span>
        <br>
        <span>Notes: ${tableTr[index].childNodes[4].innerHTML}</span>
        </div>
        `
        kdbxFileFooterInfos.innerHTML=fileinfoTemplate
        const kdbxFooterInfosEntriesDiv=document.getElementById('kdbxFooterInfosEntriesDiv')
       setTimeout(() => {
        kdbxFooterInfosEntriesDiv.classList.add('active')
       }, 300);
      }, 1000);
    }


  })
  //  right click
tableTr[index].addEventListener("contextmenu", (event)=>{
  event.preventDefault();
  // Ha a group context menu nyitva van, akkor azt becsukjuk
  closeContextGropMenu()
  const {clientX:mouseX, clientY:mouseY}=event;
  contextEntriesMenuCont.style.top=`${mouseY}px`;
  contextEntriesMenuCont.style.left=`${mouseX}px`;
  contextEntriesMenuCont.classList.add('active')
  // INNEN FOLYTASD! 
})

}
const fullPageSec=document.getElementById('fullPageSec')
const contextGroupMenu=document.getElementById('contextGroupMenu')

fullPageSec.addEventListener("click",()=>{
  // for group context menu
  closeContextGropMenu()
  // for entries context menu
  closeContextEntriesMenu()
})
// data-div katt=> toggle tableTr
// Entries-ek megjelenítése, eltűntetése kész 
for (let a = 0; a < dataDivs.length; a++) {
    dataDivs[a].addEventListener('click',()=> {
        
        // jelezzük, h most ez a div activ
        let activate=dataDivs[a].attributes[1].value
        for (let index = 0; index < dataDivs.length; index++) {
            if (dataDivs[index].attributes[1].value==activate) {
                dataDivs[index].classList.add('active')
            }
            // Az összes többit deaktiváljuk
            if (dataDivs[index].attributes[1].value!=activate) {
                dataDivs[index].classList.remove('active')
            }            
        }
        // Ez pedig az entries-kel csinálja meg ugyanezt
        for (let b = 0; b < tableTr.length; b++) {
            if (tableTr[b].classList[0]==activate) {
                tableTr[b].classList.add('active')
            }           
            if (tableTr[b].classList[0]!=activate) {
                tableTr[b].classList.remove('active')
            }
        }
    })
    // right mouse click => menu
    dataDivs[a].addEventListener("contextmenu", (event) =>{
      event.preventDefault();

      // close contextMenuEnrties
      closeContextEntriesMenu()

      const {clientX:mouseX, clientY:mouseY}=event;
      contextGroupMenu.style.top=`${mouseY}px`;
      contextGroupMenu.style.left=`${mouseX}px`;
      contextGroupMenu.classList.add('active')
      groupNameClick=dataDivs[a].children[1].innerHTML
      targetIdTemp=dataDivs[a].parentNode.parentNode.attributes[3].nodeValue

      // click context menu and add functions
      
    })

}
// nyilak elérhetőek => tree megjelenítéshez
const dataArrowsImgs=document.querySelectorAll("[data-imgarrow]")
 for (let a = 0; a < dataArrowsImgs.length; a++) {
    // Mindegyik nyílhez hozzáadjuk a clikkelési eseményt
    dataArrowsImgs[a].addEventListener('click',()=> {
       let dataIds=dataArrowsImgs[a].attributes[1].value
    //    aktív vagy nem aktív?
       switch (dataArrowsImgs[a].classList.contains('active')) {
        case false:
            // ha nem aktív
           let targetOk1=true
           let counter1=0
           do {
               counter1++
               for (let g = 0; g < liGroupObj[counter1].length; g++) {
                   let liValue=liGroupObj[counter1][g].attributes[0].value
                   if (liValue==dataIds) {
                       targetOk1=false
                       if (liGroupObj[counter1][g].childNodes[0]!=undefined) {
                        dataArrowsImgs[a].classList.add('active')
                        liGroupObj[counter1][g].childNodes[0].classList.add('active')
                    }
                   }
              }
           } while (targetOk1);
        break;

        case true:
            // ha aktív
            // Ha becsukom, akkor az aktuális title entries-t mutassa meg.           
            for (let index = 0; index < dataDivs.length; index++) {
                let divAttribVal=dataDivs[index].attributes[1].value
                if (divAttribVal==dataIds) {
                    dataDivs[index].classList.add('active')
                }
                else {dataDivs[index].classList.remove('active')}
            }
            for (let index = 0; index < tableTr.length; index++) {
                let tabAttVal=tableTr[index].classList[0]
                if (tabAttVal==dataIds) {
                    tableTr[index].classList.add('active')
                }
                else {tableTr[index].classList.remove('active')}
            }
            // A nyíl forduljon vissza
            dataArrowsImgs[a].classList.remove('active')
            let targetOk=true
            let counter=0
            do {
                counter++
                for (let g = 0; g < liGroupObj[counter].length; g++) {
                    let liValue=liGroupObj[counter][g].attributes[0].value
                    if (liValue==dataIds) {
                        targetOk=false
                        if (liGroupObj[counter][g].childNodes[0]!=undefined) {
                            liGroupObj[counter][g].childNodes[0].classList.remove('active')
                        }
                    }
                }
            } while (targetOk);
        break;
       }
    })
}
}
function contextMenuClick() {
  const groupMenuItem=document.querySelectorAll('.groupMenuItem')
  for (let aba = 0; aba < groupMenuItem.length; aba++) {
    groupMenuItem[aba].addEventListener("click",()=> {
      switch (aba) {
        case 0:
          console.log("Add")
        addNewGroup()
          break;
        case 1:
          console.log("Edit")
          console.log("targetID: "+targetIdTemp)
          console.log("groupname: "+groupNameClick)
          break;
        case 2:
          deleteGroup()
          console.log("Delete")
          console.log("targetID: "+targetIdTemp)
          console.log("groupname: "+groupNameClick)
          break;
        case 3:
          console.log("Open new Tab")
          console.log("targetID: "+targetIdTemp)
          console.log("groupname: "+groupNameClick)
          break;
        case 4:
          console.log("Other")
          console.log("targetID: "+targetIdTemp)
          console.log("groupname: "+groupNameClick)
          break;
        default:
          break;
      }
    })
    
  }
}
function inputSectCancelButtonClick() {
  const buttonCancel=document.querySelectorAll('.buttonCancel')
  for (let index = 0; index < buttonCancel.length; index++) {
    buttonCancel[index].addEventListener('click', ()=>{
      inputSectionContainer.classList.remove('active')
      inputDivContainer.innerHTML=""
       groupNameClick=""
       targetIdTemp=""
    })
    
  }
}

// GROUP FUNCTIONS


function addNewGroup() {
  contextGroupMenu.classList.remove('active')
  /*
  Mit is kell csinálni?
  - az input containert fel kell tölteni a megfelelő tagekkel:
    - h2: add meg az új csoport nevét
    - input, ahová be tudja írni az újnevet
    - 2 gomb: ok, ill cancel
  - Ok és cancel gombokat bekötni
  - ha cancel, akkor bezár az input container és minden változó alaphelyzetbe állítani
  - ha ok: akkor input containerbe új elemek jelenjenek meg:
    - Biztos?
    input mező, ahová be tudja írni a kdbx fájl jelszavát
    - 2 gomb send és cancel
  - a send és cancel gombok bekötése
  - ha cancel, akkor bezár az input container és minden változó alaphelyzetbe állítani
  - ha send:
    - törölni a sessionstorage kdbx bejegyzést
    - elküldeni az adatokat
    - megvárni, míg visszajön a szerverről az üzi. innerHtml vmi animot betenni
    - ha minden rendben van:
      - input Container-ben a kérés végrehajtva szöveg, 
      -ok button
      -ok button bekötése
        -ha ráklikk: kirajzolni a kapott Jsont, -input Container becsuk és .innerHtml=""
    - ha vmi nincs rendben
      -input Container: vmi nincs rendben szöveg
        - 2 gomb: újra és cancel gomb
        - 2 gombot bekötni
        -ha cancel, akkor input container becsuk, innerHtml=""
          -ha újra: akkor az input Container innerHtml: Password input, send és cancel Majd onnan folytatódik
 
  */ 
//  create input container template
  let addGroupTextTempl=`
  <div id="addNWGRFirst" class="column textAlItCent contextInputPage">
    <h2>Enter the name of the new group</h2>
    <label for="addNWGRINput" class="marginTopLogPage">New group name:</label>
    <input type="text" name="addNWGRINput" id="addNWGRINput" placeholder="group name" autocomplete="off" value="">
    <div id="addNWGRSecPage" class="buttons">Ok</div>
    <div id="" class="buttons buttonCancel">Cancel</div>
  </div>
  <div id="addNWGRSec" class="column textAlItCent contextInputPage">
    <h3 id="newGroupNameSecP"><h3>
    <h2 id="addNwGRPasswordH2" class="marginTopLogPage">Please enter the password</h2>
    <label for="passwordKdbxFile" class="marginTopLogPage">Password</label>
    <input type="password" name="passwordKdbxFile" id="addNewGRPPasswordKdbxFile" class="" value="" placeholder="" autocomplete="off" required="required">
    <div id="addNWGRFirstSend" class="buttons">Send</div>
    <div id="" class="buttons buttonCancel">Cancel</div>
  </div>
  <div id="addNWGRThird" class="column textAlItCent contextInputPage">
    <h2>Request sent. Please wait...</h2>
    <img src="assets/pic/arrow-forward-circle-outline.svg" class="loading closeSVG marginTopLogPage" alt="">
    <div id="" class="buttons marginTopLogPage buttonCancel">Cancel</div>
  </div>
  <div id="addNWGRFourth" class="column textAlItCent contextInputPage">
    <h2>New group added</h2>
    <div id="addNWGREnd" class="buttons buttonCancel">Ok</div>
  </div>
  <div id="addNWGRFifht" class="column textAlItCent contextInputPage">
  <h2>There's something wrong. Will you try again?</h2>
  <div id="buttonWrongOk" class="buttons ">Ok</div>
  <div id="" class="buttons buttonCancel">Cancel</div>
</div>
`
inputDivContainer.innerHTML=addGroupTextTempl
// const
const addNWGRFirst=document.getElementById('addNWGRFirst')
const addNWGRSec=document.getElementById('addNWGRSec')
const addNWGRThird=document.getElementById('addNWGRThird')
const addNWGRFourth=document.getElementById('addNWGRFourth')
const addNWGRFifht=document.getElementById('addNWGRFifht')
const newGroupNameSecP=document.getElementById('newGroupNameSecP')
const addNewGRPPasswordKdbxFile=document.getElementById('addNewGRPPasswordKdbxFile')
const buttonWrongOk=document.getElementById('buttonWrongOk')
const addNwGRPasswordH2=document.getElementById('addNwGRPasswordH2')

// input section container see

inputSectionContainer.classList.add('active')
addNWGRFirst.classList.add('active')

// cancel button click
inputSectCancelButtonClick() 

let newgroupName=""
  // addNWGRINput 
addNWGRINput.addEventListener("keyup", ()=>{
newgroupName=addNWGRINput.value
})
  // First Ok button add click
  addNWGRSecPage.addEventListener("click", ()=>{
    if (newgroupName!="") {
      newGroupNameSecP.innerHTML=`The new group name is: ${newgroupName}`
     addNWGRFirst.classList.remove('active')
    addNWGRINput.value=""
    addNWGRSec.classList.add("active") 
    }
  })

  // Password input add event
  let passwordKdbxFileAddGroup
  addNewGRPPasswordKdbxFile.addEventListener("keyup",()=>{
    passwordKdbxFileAddGroup=addNewGRPPasswordKdbxFile.value
  })

  // Send button add click

addNWGRFirstSend.addEventListener("click",()=>{
  if (addNewGRPPasswordKdbxFile.value!="") {
    let dataTemp=[]
    // second page close, third page open
    addNWGRSec.classList.remove('active')
    addNWGRThird.classList.add('active')
    // sessionStorege kdbx key delete
    sessionStorage.removeItem("kdbx")
    // send data
    let jwtToken=dataK3p[0].user.jwtToken 
    const urlAddNewGroup='http://127.0.0.1:9933/api/kdbx/1/groups'
    
    let bodydata= {       
      "kdbxFileDto":
      {
          "kdbxFilePwDto":  passwordKdbxFileAddGroup
      },
      
      "groupDto":
      {
          "expiresDto": "",
          "groupExpiryTimeDto": "",
          "sourceGroupDirectionDto" : "",
          "targetGroupDirectionDto": targetIdTemp,
          "groupNameDto": newgroupName
      }
  }
  let options={
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     'Accept' : 'application/json',
     'Authorization': `Bearer ${jwtToken}`,
   },
    body: JSON.stringify(bodydata),
    };
    try {
      fetch(urlAddNewGroup,options)
      .then(response => response.json())
  .then(data => {
    dataTemp.push([data])
    sessionStorage.setItem('kdbx', JSON.stringify(dataTemp))
    kdbxFileBoxClick(kdbxFileIndex)
    addNWGRThird.classList.remove('active')
    addNWGRFourth.classList.add('active')
  })
    } catch (error) {
      // if error inputSection => error page open
      addNWGRThird.classList.remove('active')
      addNWGRFifht.classList.add('active')
      buttonWrongOk.addEventListener('click',()=>{
        addNewGroup()
      })
      console.log("Vmi nem megy")
    }
  }
    // if password input is empty
  if (addNewGRPPasswordKdbxFile.value=="") {
      addNwGRPasswordH2.classList.add('warningTextColor')
      setTimeout(() => {
        addNwGRPasswordH2.classList.remove('warningTextColor')
     }, 3000);    
  }
})
}

function editGroup() {

  console.log("work in progress...")
  
}

function deleteGroup() {
  contextGroupMenu.classList.remove('active')

  /*

  EZ JELENELG NEM MŰKÖDIK, MIVEL A SZERVER 403-AS HIBÁT DOB AZ OPTIONS KÉRÉSRE, A DELETE  METÓDUST PEDID
  A CORS MIATT BLOKKOLJA A BÖNGÉSZŐ!


  
  Mit is kell csinálni?

hasonló lesz a felállás, mint az addGroupnál:
input-ot feltölteni a megfelelő templattel
  1 page
  -bekérni a group nevét és megjeleníteni
  - bitos, h törölni akarod?
  -ok, Cancel 
  -bekötni az ok és a cancel buttonokat (itt a cancel-t csak meg kell hívni)
  -ha ok, akkor jöhet a 2. ablak
  2 page
  - add meg a jelszót
  - send és cancel button
  - ezek bekötése
  -send => 3 page open
  3 page info text and cancel buttons
  - ha megjött a requestre az eredmény akkor annak megfelelően:
  ha minden ok, akkor 4. page, ha nem, akkor 5.page nyit
  4 page == addGroup 4 page
  5- page == addGroup 5. page
  */ 

  // crate delete input container
  let deleteGroupTextTempl=`
  <div id="deleteGRFirst" class="column textAlItCent contextInputPage ">
    <h2 class="marginTopLogPage">The name of the group you want to delete:</h2>
    <h1>${groupNameClick}<h1>
    <h3>Are you sure?<h3>
    <div id="deleteGRSecPage" class="buttons">Ok</div>
    <div id="" class="buttons buttonCancel">Cancel</div>
  </div>
  <div id="deleteGRSec" class="column textAlItCent contextInputPage">
    <h2 id="deleteGRPasswordH2" class="marginTopLogPage">Please enter the password</h2>
    <label for="passwordKdbxFile" class="marginTopLogPage">Password</label>
    <input type="password" name="passwordKdbxFile" id="deleteGRPPasswordKdbxFile" class="" value="" placeholder="" autocomplete="off" required="required">
    <div id="deleteGRFirstSend" class="buttons">Send</div>
    <div id="" class="buttons buttonCancel">Cancel</div>
  </div>
  <div id="deleteGRThird" class="column textAlItCent contextInputPage">
    <h2>Request sent. Please wait...</h2>
    <img src="assets/pic/arrow-forward-circle-outline.svg" class="loading closeSVG marginTopLogPage" alt="">
    <div id="" class="buttons marginTopLogPage buttonCancel">Cancel</div>
  </div>
  <div id="deleteGRFourth" class="column textAlItCent contextInputPage">
    <h2>The ${groupNameClick} group has been deleted</h2>
    <div id="deleteGREnd" class="buttons buttonCancel">Ok</div>
  </div>
  <div id="deleteGRFifht" class="column textAlItCent contextInputPage">
  <h2>There's something wrong. Will you try again?</h2>
  <div id="buttonWrongOk" class="buttons ">Ok</div>
  <div id="" class="buttons buttonCancel">Cancel</div>
</div>
`
// create Input sections & see
inputDivContainer.innerHTML=deleteGroupTextTempl 
inputSectionContainer.classList.add('active')

// page tages
const deleteGRFirst=document.getElementById('deleteGRFirst')
const deleteGRSec=document.getElementById('deleteGRSec')
const deleteGRThird=document.getElementById('deleteGRThird')
const deleteGRFourth=document.getElementById('deleteGRFourth')
const deleteGRFifht=document.getElementById('deleteGRFifht')
const deleteGRSecPage=document.getElementById('deleteGRSecPage')
const deleteGRPPasswordKdbxFile=document.getElementById('deleteGRPPasswordKdbxFile')
const deleteGRFirstSend=document.getElementById('deleteGRFirstSend')
const deleteGRPasswordH2=document.getElementById('deleteGRPasswordH2')
const buttonWrongOk=document.getElementById('buttonWrongOk')
// 1st page see

deleteGRFirst.classList.add('active')

// cancel buttons activated
inputSectCancelButtonClick() 

// 2nd page open
deleteGRSecPage.addEventListener('click',()=>{
  deleteGRFirst.classList.remove('active')
  deleteGRSec.classList.add('active')
})
  // Password input add event
  let passwordKdbxFileDeleteGroup
  deleteGRPPasswordKdbxFile.addEventListener("keyup",()=>{
    passwordKdbxFileDeleteGroup=deleteGRPPasswordKdbxFile.value
  })
  // Send button add click
  deleteGRFirstSend.addEventListener('click',()=> {
    if (deleteGRPPasswordKdbxFile.value!="") {
      let dataTemp=[]
      // second page close, third page open
      deleteGRSec.classList.remove('active')
      deleteGRThird.classList.add('active') 
      // sessionStorege kdbx key delete
      sessionStorage.removeItem("kdbx")
      // send data
      let jwtToken=dataK3p[0].user.jwtToken 
      // innen folytasd!
      const urlDeleteGr='http://127.0.0.1:9933/api/kdbx/1/groups'
      let bodydata={       
        "kdbxFileDto":
        {
            "kdbxFilePwDto": passwordKdbxFileDeleteGroup
        },
        
        "groupDto":
        {
            "targetGroupDirectionDto": targetIdTemp
        }
    }
    let options={
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
       'Accept' : 'application/json',
       'Authorization': `Bearer ${jwtToken}`,
     },
      body: JSON.stringify(bodydata),
      };
      debugger
   try {
 
    // fetch jelenleg nem működik
    // fetch(urlDeleteGr,options)
    //  .then(response =>response.json())
    //  .then(data => {
    //    dataTemp.push([data])
    //    sessionStorage.setItem('kdbx', JSON.stringify(dataTemp))
    //    kdbxFileBoxClick(kdbxFileIndex)
    //    deleteGRThird.classList.remove('active')
    //    deleteGRFourth.classList.add('active')
    //    }
    //  )

   } catch (error){
    // if wrong
    deleteGRThird.classList.remove('active')
    deleteGRFifht.classList.add('active')
    buttonWrongOk.addEventListener('click', ()=>{
      deleteGroup()
    })

   }  

    }
    // if password input is empty
    if (deleteGRPPasswordKdbxFile.value=="") {
      deleteGRPasswordH2.classList.add('warningTextColor')
      setTimeout(() => {
        deleteGRPasswordH2.classList.remove('warningTextColor')
     }, 3000);
    }
    
  })
}

function openNewTab() {
/*
- ha van, akkor
  - létrehozni az inputSectDiv Templatet
    - üdvözlő szöveg
    - szeretnéd betölteni?
      - ok, cancel button
        - ha cancel akkor: 
          inputSectDiv remove active és az innerHTML=""
        - ha ok, akkor meghívni a betöltés folyamatát a sectionStorage alapján. 
   
*/  
let newTabTextTemplate =`
  <h1 class="textAlItCent">Hi ${dataK3p[0].user.firstName} ${dataK3p[0].user.lastName} !</h1>
  <h4>Load the kdbx file?</h4>
  <div id="newTabOk" class="buttons ">Ok</div>
  <div id="" class="buttons buttonCancel">Cancel</div>

`
inputDivContainer.innerHTML=newTabTextTemplate
const newTabOk=document.getElementById('newTabOk')
const buttonCancel=document.querySelectorAll('.buttonCancel')
inputSectionContainer.classList.add('active')

// Cancel button click

buttonCancel[0].addEventListener("click", ()=>{
  inputSectionContainer.classList.remove('active')
  inputDivContainer.innerHTML=""
  dataK3p=[]
  sessionStorage.clear()
})

// Ok button click 

newTabOk.addEventListener("click", ()=>{
  inputSectionContainer.classList.remove('active')
  inputDivContainer.innerHTML=""
  firstPageSect.classList.toggle('hide')
  dashboard.classList.toggle('hide')
  createDashboard()
  let tempJson=JSON.parse(sessionStorage.kdbx)
  let temp02=tempJson[0][0]
  kdbxObject={"kdbx":{0:[temp02]},}
   changeBoxName(kdbxObject['kdbx'])
   kdbxFileBoxClick(0)

})

}

// ENTRIES FUNTIONS  

