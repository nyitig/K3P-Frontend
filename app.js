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
let isTrue=false
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
emailcheck(loginArr.emailDto)
  if (isTrue) {
    checkLenght(passwordvalue)
  }
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
      let dashboardTemplate=`
      <h2 id="dashboardH2" class="">Üdvözöllek ${data.firstName} ${data.lastName}! </h2>
      <p id="dashboardEmail" class="">emailcímed:  ${data.email}</p>
      <p>jwtToken:</p>
      <p id="dashboardjwtToken" class=""> ${data.jwtToken}</p>
      <p id="dashboardRoles" class="">Roles: ${data.roles}</p>
      <div id="kerd" class="buttons">Tovább a Dashboardra</div>
      `
      // Todo ez most csak egy ideiglenes állomás
      dashboardContainer.innerHTML=dashboardTemplate
      const kerd=document.getElementById('kerd')
      kerd.addEventListener("click", ()=> {
        kdbxDownload()
      })
      console.log(data.email)
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

// kdbx file download
let kdbxObject
function kdbxDownload() {

  // a kapott tokennel lekérjük, majd eltároljuk egy objectben
  const urlez='http://127.0.0.1:9933/api/kdbx/1/groups'
  const dataTemp=JSON.parse(sessionStorage.getItem('kdbx')) || []
   let jwtToken=dataK3p[0].user.jwtToken
   console.log("Token: "+jwtToken)
  console.log("kdbx funkció")

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
console.log("Options accept: "+options.headers.Authorization);
   fetch(urlez, options)
 .then(response => response.json())
   .then(data =>{
    dataTemp.push({kdbx: data})
    sessionStorage.setItem('kdbx', JSON.stringify(dataTemp))
    kdbxObject=JSON.parse(sessionStorage.kdbx)
    //  kdbxObject=data
     createDashboard()

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
fullPageSec.classList.toggle('dashboard')
fullPageDivCont.classList.toggle('dashboard')
header.classList.toggle('dashboard')
footer.classList.toggle('dashboard')
footerContainer.classList.toggle('dashboard')
main.classList.toggle('dashboard')
beginHeader.classList.toggle('active')
dashboardHeader.classList.toggle('active')


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
    window.location.reload(true)
  }, 2000);
})
// Todo Innen folytasd! kdbx fájl név megjelenítés, és egyéb
// session storage-ba lementeni a kapott kdbx tartalmát

  // let mainContainerTemp=`
  // <h2 id="dashboardH2" class="">Sikeresen megjött a kdbx fájl! </h2>
  // <p id="dashboardEmail" class="">Az uuid: ${kdbxObject[0].kdbx.uuid}.</p>
  // <p>A kdbx name: ${kdbxObject[0].kdbx.name}</p>
  // <p>A kdbx entries: ${kdbxObject[0].kdbx.entries[0]}</p>
  // <p>Üdvözlettel: a K3P csapata</p>
  // `
  // main.innerHTML=mainContainerTemp
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
const tableContainer=document.querySelector("#tableContainer tbody")
let dataTargetId=[]
let dataIndex=[]
// Kell egyet a klikknek is készíteni
// TODO session storage-t átküldeni "új lapra"

// próbatömb

/*
t1 =""
Webshop="D"
hun="DD"
e-mail="DR"
VirualBox="DRRD"
Postman is tudja
*/ 
let xarr=[{
    "uuid": "078a2c66-ec61-4cf8-bfd2-e4a469f89ab1",
    "name": "t1",
    "iconId": 49,
    "iconData": null,
    "times": null,
    "entries": [
        {
            "uuid": "8e6b0f65-8273-ce48-b3f0-470e5a38164b",
            "iconId": 0,
            "iconData": null,
            "properties": [
                {
                    "key": "Notes",
                    "propertyValue": {
                        "value": "Notes",
                        "protected": false
                    },
                    "value": "Notes",
                    "protected": false
                },
                {
                    "key": "Password",
                    "propertyValue": {
                        "value": "",
                        "protected": true
                    },
                    "value": "",
                    "protected": true
                },
                {
                    "key": "Title",
                    "propertyValue": {
                        "value": "Sample Entry",
                        "protected": false
                    },
                    "value": "Sample Entry",
                    "protected": false
                },
                {
                    "key": "UserName",
                    "propertyValue": {
                        "value": "User Name",
                        "protected": false
                    },
                    "value": "User Name",
                    "protected": false
                },
                {
                    "key": "URL",
                    "propertyValue": {
                        "value": "https://keepass.info/",
                        "protected": false
                    },
                    "value": "https://keepass.info/",
                    "protected": false
                }
            ],
            "referencedProperties": [],
            "history": {
                "historicEntries": []
            },
            "times": {
                "lastModificationTime": 1663787033000,
                "creationTime": 1663787033000,
                "lastAccessTime": 1663787033000,
                "expiryTime": 1663786989000,
                "usageCount": 0,
                "locationChanged": 1663787033000
            },
            "tags": null,
            "foregroundColor": null,
            "backgroundColor": null,
            "attachments": [],
            "url": "https://keepass.info/",
            "username": "User Name",
            "password": "",
            "title": "Sample Entry",
            "notes": "Notes",
            "titleProtected": false,
            "passwordProtected": true,
            "customProperties": [],
            "customIconUuid": null
        },
        {
            "uuid": "6251fb8b-b632-e343-a30f-b303376a675a",
            "iconId": 0,
            "iconData": null,
            "properties": [
                {
                    "key": "Notes",
                    "propertyValue": {
                        "value": "",
                        "protected": false
                    },
                    "value": "",
                    "protected": false
                },
                {
                    "key": "Password",
                    "propertyValue": {
                        "value": "",
                        "protected": true
                    },
                    "value": "",
                    "protected": true
                },
                {
                    "key": "Title",
                    "propertyValue": {
                        "value": "Sample Entry #2",
                        "protected": false
                    },
                    "value": "Sample Entry #2",
                    "protected": false
                },
                {
                    "key": "UserName",
                    "propertyValue": {
                        "value": "Michael321",
                        "protected": false
                    },
                    "value": "Michael321",
                    "protected": false
                },
                {
                    "key": "URL",
                    "propertyValue": {
                        "value": "https://keepass.info/help/kb/testform.html",
                        "protected": false
                    },
                    "value": "https://keepass.info/help/kb/testform.html",
                    "protected": false
                }
            ],
            "referencedProperties": [],
            "history": {
                "historicEntries": []
            },
            "times": {
                "lastModificationTime": 1663787033000,
                "creationTime": 1663787033000,
                "lastAccessTime": 1663787033000,
                "expiryTime": 1663786989000,
                "usageCount": 0,
                "locationChanged": 1663787033000
            },
            "tags": null,
            "foregroundColor": null,
            "backgroundColor": null,
            "attachments": [],
            "url": "https://keepass.info/help/kb/testform.html",
            "username": "Michael321",
            "password": "",
            "title": "Sample Entry #2",
            "notes": "",
            "titleProtected": false,
            "passwordProtected": true,
            "customProperties": [],
            "customIconUuid": null
        }
    ],
    "groups": [
        {
            "uuid": "02cc4209-3606-4235-9f11-8cb42fe575d2",
            "name": "webshop",
            "iconId": 49,
            "iconData": null,
            "times": null,
            "entries": [
                {
                    "uuid": "35bb13e0-10fe-114d-845e-3da63858d517",
                    "iconId": 0,
                    "iconData": null,
                    "properties": [
                        {
                            "key": "Notes",
                            "propertyValue": {
                                "value": "jofogas jegyzet",
                                "protected": false
                            },
                            "value": "jofogas jegyzet",
                            "protected": false
                        },
                        {
                            "key": "Password",
                            "propertyValue": {
                                "value": "ujjak123",
                                "protected": true
                            },
                            "value": "ujjak123",
                            "protected": true
                        },
                        {
                            "key": "Title",
                            "propertyValue": {
                                "value": "jofogas.hu",
                                "protected": false
                            },
                            "value": "jofogas.hu",
                            "protected": false
                        },
                        {
                            "key": "UserName",
                            "propertyValue": {
                                "value": "kezfogas",
                                "protected": false
                            },
                            "value": "kezfogas",
                            "protected": false
                        },
                        {
                            "key": "URL",
                            "propertyValue": {
                                "value": "jofogas.hu",
                                "protected": false
                            },
                            "value": "jofogas.hu",
                            "protected": false
                        }
                    ],
                    "referencedProperties": [],
                    "history": {
                        "historicEntries": []
                    },
                    "times": {
                        "lastModificationTime": 1663787705000,
                        "creationTime": 1663787686000,
                        "lastAccessTime": 1663787705000,
                        "expiryTime": 1663786989000,
                        "usageCount": 1,
                        "locationChanged": 1663787686000
                    },
                    "tags": null,
                    "foregroundColor": null,
                    "backgroundColor": null,
                    "attachments": [],
                    "url": "jofogas.hu",
                    "username": "kezfogas",
                    "password": "ujjak123",
                    "title": "jofogas.hu",
                    "notes": "jofogas jegyzet",
                    "titleProtected": false,
                    "passwordProtected": true,
                    "customProperties": [],
                    "customIconUuid": null
                }
            ],
            "groups": [
                {
                    "uuid": "1540e158-2154-40bc-b868-8d9ad69cacb7",
                    "name": "hun",
                    "iconId": 49,
                    "iconData": null,
                    "times": null,
                    "entries": [
                        {
                            "uuid": "41fa5a44-ad1b-f04d-b516-08aa8a3e2838",
                            "iconId": 0,
                            "iconData": null,
                            "properties": [
                                {
                                    "key": "Notes",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                },
                                {
                                    "key": "Password",
                                    "propertyValue": {
                                        "value": "pw22",
                                        "protected": true
                                    },
                                    "value": "pw22",
                                    "protected": true
                                },
                                {
                                    "key": "Title",
                                    "propertyValue": {
                                        "value": "emag.hu",
                                        "protected": false
                                    },
                                    "value": "emag.hu",
                                    "protected": false
                                },
                                {
                                    "key": "UserName",
                                    "propertyValue": {
                                        "value": "aniko",
                                        "protected": false
                                    },
                                    "value": "aniko",
                                    "protected": false
                                },
                                {
                                    "key": "URL",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                }
                            ],
                            "referencedProperties": [],
                            "history": {
                                "historicEntries": []
                            },
                            "times": {
                                "lastModificationTime": 1663787126000,
                                "creationTime": 1663787113000,
                                "lastAccessTime": 1663787126000,
                                "expiryTime": 1663786989000,
                                "usageCount": 1,
                                "locationChanged": 1663787113000
                            },
                            "tags": null,
                            "foregroundColor": null,
                            "backgroundColor": null,
                            "attachments": [],
                            "url": "",
                            "username": "aniko",
                            "password": "pw22",
                            "title": "emag.hu",
                            "notes": "",
                            "titleProtected": false,
                            "passwordProtected": true,
                            "customProperties": [],
                            "customIconUuid": null
                        },
                        {
                            "uuid": "b24cd682-ecdb-e246-8352-189a3ee4f68d",
                            "iconId": 0,
                            "iconData": null,
                            "properties": [
                                {
                                    "key": "Notes",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                },
                                {
                                    "key": "Password",
                                    "propertyValue": {
                                        "value": "jelszo123",
                                        "protected": true
                                    },
                                    "value": "jelszo123",
                                    "protected": true
                                },
                                {
                                    "key": "Title",
                                    "propertyValue": {
                                        "value": "edigital.hu",
                                        "protected": false
                                    },
                                    "value": "edigital.hu",
                                    "protected": false
                                },
                                {
                                    "key": "UserName",
                                    "propertyValue": {
                                        "value": "klari",
                                        "protected": false
                                    },
                                    "value": "klari",
                                    "protected": false
                                },
                                {
                                    "key": "URL",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                }
                            ],
                            "referencedProperties": [],
                            "history": {
                                "historicEntries": []
                            },
                            "times": {
                                "lastModificationTime": 1663787141000,
                                "creationTime": 1663787128000,
                                "lastAccessTime": 1663787141000,
                                "expiryTime": 1663786989000,
                                "usageCount": 1,
                                "locationChanged": 1663787128000
                            },
                            "tags": null,
                            "foregroundColor": null,
                            "backgroundColor": null,
                            "attachments": [],
                            "url": "",
                            "username": "klari",
                            "password": "jelszo123",
                            "title": "edigital.hu",
                            "notes": "",
                            "titleProtected": false,
                            "passwordProtected": true,
                            "customProperties": [],
                            "customIconUuid": null
                        }
                    ],
                    "groups": [],
                    "customIconUuid": null,
                    "expanded": false
                },
                {
                    "uuid": "f17f9038-caeb-459d-a71f-bc41cf9600f9",
                    "name": "eu",
                    "iconId": 49,
                    "iconData": null,
                    "times": null,
                    "entries": [
                        {
                            "uuid": "7d463ee7-46ac-064b-91b0-fe2079f4ae93",
                            "iconId": 0,
                            "iconData": null,
                            "properties": [
                                {
                                    "key": "Notes",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                },
                                {
                                    "key": "Password",
                                    "propertyValue": {
                                        "value": "pass123",
                                        "protected": true
                                    },
                                    "value": "pass123",
                                    "protected": true
                                },
                                {
                                    "key": "Title",
                                    "propertyValue": {
                                        "value": "amazon.de",
                                        "protected": false
                                    },
                                    "value": "amazon.de",
                                    "protected": false
                                },
                                {
                                    "key": "UserName",
                                    "propertyValue": {
                                        "value": "geza",
                                        "protected": false
                                    },
                                    "value": "geza",
                                    "protected": false
                                },
                                {
                                    "key": "URL",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                }
                            ],
                            "referencedProperties": [],
                            "history": {
                                "historicEntries": []
                            },
                            "times": {
                                "lastModificationTime": 1663787110000,
                                "creationTime": 1663787083000,
                                "lastAccessTime": 1663787110000,
                                "expiryTime": 1663786989000,
                                "usageCount": 1,
                                "locationChanged": 1663787083000
                            },
                            "tags": null,
                            "foregroundColor": null,
                            "backgroundColor": null,
                            "attachments": [],
                            "url": "",
                            "username": "geza",
                            "password": "pass123",
                            "title": "amazon.de",
                            "notes": "",
                            "titleProtected": false,
                            "passwordProtected": true,
                            "customProperties": [],
                            "customIconUuid": null
                        }
                    ],
                    "groups": [],
                    "customIconUuid": null,
                    "expanded": false
                },
                {
                    "uuid": "d686fb8d-ff7d-4025-9ab1-25e9e8b44345",
                    "name": "usa",
                    "iconId": 49,
                    "iconData": null,
                    "times": null,
                    "entries": [
                        {
                            "uuid": "7097a055-5b88-9a40-bbe0-bd05591808a7",
                            "iconId": 0,
                            "iconData": null,
                            "properties": [
                                {
                                    "key": "Notes",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                },
                                {
                                    "key": "Password",
                                    "propertyValue": {
                                        "value": "PASS44",
                                        "protected": true
                                    },
                                    "value": "PASS44",
                                    "protected": true
                                },
                                {
                                    "key": "Title",
                                    "propertyValue": {
                                        "value": "ebay.com",
                                        "protected": false
                                    },
                                    "value": "ebay.com",
                                    "protected": false
                                },
                                {
                                    "key": "UserName",
                                    "propertyValue": {
                                        "value": "john",
                                        "protected": false
                                    },
                                    "value": "john",
                                    "protected": false
                                },
                                {
                                    "key": "URL",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                }
                            ],
                            "referencedProperties": [],
                            "history": {
                                "historicEntries": []
                            },
                            "times": {
                                "lastModificationTime": 1663787223000,
                                "creationTime": 1663787199000,
                                "lastAccessTime": 1663787223000,
                                "expiryTime": 1663786989000,
                                "usageCount": 1,
                                "locationChanged": 1663787199000
                            },
                            "tags": null,
                            "foregroundColor": null,
                            "backgroundColor": null,
                            "attachments": [],
                            "url": "",
                            "username": "john",
                            "password": "PASS44",
                            "title": "ebay.com",
                            "notes": "",
                            "titleProtected": false,
                            "passwordProtected": true,
                            "customProperties": [],
                            "customIconUuid": null
                        }
                    ],
                    "groups": [],
                    "customIconUuid": null,
                    "expanded": false
                }
            ],
            "customIconUuid": null,
            "expanded": false
        },
        {
            "uuid": "a228aca5-8bcb-432c-b327-7b271dab8d7a",
            "name": "email",
            "iconId": 49,
            "iconData": null,
            "times": null,
            "entries": [
                {
                    "uuid": "15b4524c-42ed-f745-80f1-4627dabbc914",
                    "iconId": 0,
                    "iconData": null,
                    "properties": [
                        {
                            "key": "Notes",
                            "propertyValue": {
                                "value": "",
                                "protected": false
                            },
                            "value": "",
                            "protected": false
                        },
                        {
                            "key": "Password",
                            "propertyValue": {
                                "value": "secret_pw",
                                "protected": true
                            },
                            "value": "secret_pw",
                            "protected": true
                        },
                        {
                            "key": "Title",
                            "propertyValue": {
                                "value": "gmail",
                                "protected": false
                            },
                            "value": "gmail",
                            "protected": false
                        },
                        {
                            "key": "UserName",
                            "propertyValue": {
                                "value": "akarmi@gmail.com",
                                "protected": false
                            },
                            "value": "akarmi@gmail.com",
                            "protected": false
                        },
                        {
                            "key": "URL",
                            "propertyValue": {
                                "value": "",
                                "protected": false
                            },
                            "value": "",
                            "protected": false
                        }
                    ],
                    "referencedProperties": [],
                    "history": {
                        "historicEntries": [
                            {
                                "uuid": "15b4524c-42ed-f745-80f1-4627dabbc914",
                                "iconId": 0,
                                "iconData": null,
                                "properties": [
                                    {
                                        "key": "Notes",
                                        "propertyValue": {
                                            "value": "",
                                            "protected": false
                                        },
                                        "value": "",
                                        "protected": false
                                    },
                                    {
                                        "key": "Title",
                                        "propertyValue": {
                                            "value": "gmail",
                                            "protected": false
                                        },
                                        "value": "gmail",
                                        "protected": false
                                    },
                                    {
                                        "key": "URL",
                                        "propertyValue": {
                                            "value": "",
                                            "protected": false
                                        },
                                        "value": "",
                                        "protected": false
                                    },
                                    {
                                        "key": "UserName",
                                        "propertyValue": {
                                            "value": "",
                                            "protected": false
                                        },
                                        "value": "",
                                        "protected": false
                                    },
                                    {
                                        "key": "Password",
                                        "propertyValue": {
                                            "value": "0j1mzu7HVeFWn6OoOkqE",
                                            "protected": true
                                        },
                                        "value": "0j1mzu7HVeFWn6OoOkqE",
                                        "protected": true
                                    }
                                ],
                                "referencedProperties": [],
                                "history": null,
                                "times": {
                                    "lastModificationTime": 1663787155000,
                                    "creationTime": 1663787153000,
                                    "lastAccessTime": 1663787155000,
                                    "expiryTime": 1663786989000,
                                    "usageCount": 1,
                                    "locationChanged": 1663787153000
                                },
                                "tags": null,
                                "foregroundColor": null,
                                "backgroundColor": null,
                                "attachments": [],
                                "url": "",
                                "username": "",
                                "password": "0j1mzu7HVeFWn6OoOkqE",
                                "title": "gmail",
                                "notes": "",
                                "titleProtected": false,
                                "passwordProtected": true,
                                "customProperties": [],
                                "customIconUuid": null
                            }
                        ]
                    },
                    "times": {
                        "lastModificationTime": 1663787175000,
                        "creationTime": 1663787153000,
                        "lastAccessTime": 1663787175000,
                        "expiryTime": 1663786989000,
                        "usageCount": 2,
                        "locationChanged": 1663787153000
                    },
                    "tags": null,
                    "foregroundColor": null,
                    "backgroundColor": null,
                    "attachments": [],
                    "url": "",
                    "username": "akarmi@gmail.com",
                    "password": "secret_pw",
                    "title": "gmail",
                    "notes": "",
                    "titleProtected": false,
                    "passwordProtected": true,
                    "customProperties": [],
                    "customIconUuid": null
                },
                {
                    "uuid": "adddb489-81b2-cc4a-acbd-e84bad062c03",
                    "iconId": 0,
                    "iconData": null,
                    "properties": [
                        {
                            "key": "Notes",
                            "propertyValue": {
                                "value": "",
                                "protected": false
                            },
                            "value": "",
                            "protected": false
                        },
                        {
                            "key": "Password",
                            "propertyValue": {
                                "value": "pw",
                                "protected": true
                            },
                            "value": "pw",
                            "protected": true
                        },
                        {
                            "key": "Title",
                            "propertyValue": {
                                "value": "freemail",
                                "protected": false
                            },
                            "value": "freemail",
                            "protected": false
                        },
                        {
                            "key": "UserName",
                            "propertyValue": {
                                "value": "teszt@freemail.hu",
                                "protected": false
                            },
                            "value": "teszt@freemail.hu",
                            "protected": false
                        },
                        {
                            "key": "URL",
                            "propertyValue": {
                                "value": "",
                                "protected": false
                            },
                            "value": "",
                            "protected": false
                        }
                    ],
                    "referencedProperties": [],
                    "history": {
                        "historicEntries": []
                    },
                    "times": {
                        "lastModificationTime": 1663787194000,
                        "creationTime": 1663787180000,
                        "lastAccessTime": 1663787194000,
                        "expiryTime": 1663786989000,
                        "usageCount": 1,
                        "locationChanged": 1663787180000
                    },
                    "tags": null,
                    "foregroundColor": null,
                    "backgroundColor": null,
                    "attachments": [],
                    "url": "",
                    "username": "teszt@freemail.hu",
                    "password": "pw",
                    "title": "freemail",
                    "notes": "",
                    "titleProtected": false,
                    "passwordProtected": true,
                    "customProperties": [],
                    "customIconUuid": null
                }
            ],
            "groups": [
                {
                    "uuid": "d9b229c8-7750-4df0-b623-f3ef2ca27cb5",
                    "name": "prog",
                    "iconId": 49,
                    "iconData": null,
                    "times": null,
                    "entries": [
                        {
                            "uuid": "e38b8d02-8eae-5e48-83be-ff272e707c01",
                            "iconId": 0,
                            "iconData": null,
                            "properties": [
                                {
                                    "key": "Notes",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                },
                                {
                                    "key": "Password",
                                    "propertyValue": {
                                        "value": "felho123",
                                        "protected": true
                                    },
                                    "value": "felho123",
                                    "protected": true
                                },
                                {
                                    "key": "Title",
                                    "propertyValue": {
                                        "value": "icloud",
                                        "protected": false
                                    },
                                    "value": "icloud",
                                    "protected": false
                                },
                                {
                                    "key": "UserName",
                                    "propertyValue": {
                                        "value": "teszt@icloud.com",
                                        "protected": false
                                    },
                                    "value": "teszt@icloud.com",
                                    "protected": false
                                },
                                {
                                    "key": "URL",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                }
                            ],
                            "referencedProperties": [],
                            "history": {
                                "historicEntries": []
                            },
                            "times": {
                                "lastModificationTime": 1663787250000,
                                "creationTime": 1663787238000,
                                "lastAccessTime": 1663787250000,
                                "expiryTime": 1663786989000,
                                "usageCount": 1,
                                "locationChanged": 1663787238000
                            },
                            "tags": null,
                            "foregroundColor": null,
                            "backgroundColor": null,
                            "attachments": [],
                            "url": "",
                            "username": "teszt@icloud.com",
                            "password": "felho123",
                            "title": "icloud",
                            "notes": "",
                            "titleProtected": false,
                            "passwordProtected": true,
                            "customProperties": [],
                            "customIconUuid": null
                        }
                    ],
                    "groups": [],
                    "customIconUuid": null,
                    "expanded": false
                }
            ],
            "customIconUuid": null,
            "expanded": false
        },
        {
            "uuid": "29727340-b2f3-4b01-88f9-13afefa9b609",
            "name": "IT",
            "iconId": 49,
            "iconData": null,
            "times": null,
            "entries": [
                {
                    "uuid": "48ac5dda-6530-1e47-a738-27491541e33e",
                    "iconId": 0,
                    "iconData": null,
                    "properties": [
                        {
                            "key": "Notes",
                            "propertyValue": {
                                "value": "prog jegyzet",
                                "protected": false
                            },
                            "value": "prog jegyzet",
                            "protected": false
                        },
                        {
                            "key": "Password",
                            "propertyValue": {
                                "value": "HBYm8h3fhI7MxV3F2kEP",
                                "protected": true
                            },
                            "value": "HBYm8h3fhI7MxV3F2kEP",
                            "protected": true
                        },
                        {
                            "key": "Title",
                            "propertyValue": {
                                "value": "prog.hu",
                                "protected": false
                            },
                            "value": "prog.hu",
                            "protected": false
                        },
                        {
                            "key": "UserName",
                            "propertyValue": {
                                "value": "nempublikus",
                                "protected": false
                            },
                            "value": "nempublikus",
                            "protected": false
                        },
                        {
                            "key": "URL",
                            "propertyValue": {
                                "value": "prog.hu",
                                "protected": false
                            },
                            "value": "prog.hu",
                            "protected": false
                        }
                    ],
                    "referencedProperties": [],
                    "history": {
                        "historicEntries": [
                            {
                                "uuid": "48ac5dda-6530-1e47-a738-27491541e33e",
                                "iconId": 0,
                                "iconData": null,
                                "properties": [
                                    {
                                        "key": "Notes",
                                        "propertyValue": {
                                            "value": "",
                                            "protected": false
                                        },
                                        "value": "",
                                        "protected": false
                                    },
                                    {
                                        "key": "Title",
                                        "propertyValue": {
                                            "value": "prog.hu",
                                            "protected": false
                                        },
                                        "value": "prog.hu",
                                        "protected": false
                                    },
                                    {
                                        "key": "URL",
                                        "propertyValue": {
                                            "value": "",
                                            "protected": false
                                        },
                                        "value": "",
                                        "protected": false
                                    },
                                    {
                                        "key": "UserName",
                                        "propertyValue": {
                                            "value": "nempublikus",
                                            "protected": false
                                        },
                                        "value": "nempublikus",
                                        "protected": false
                                    },
                                    {
                                        "key": "Password",
                                        "propertyValue": {
                                            "value": "HBYm8h3fhI7MxV3F2kEP",
                                            "protected": true
                                        },
                                        "value": "HBYm8h3fhI7MxV3F2kEP",
                                        "protected": true
                                    }
                                ],
                                "referencedProperties": [],
                                "history": null,
                                "times": {
                                    "lastModificationTime": 1663787659000,
                                    "creationTime": 1663787648000,
                                    "lastAccessTime": 1663787659000,
                                    "expiryTime": 1663786989000,
                                    "usageCount": 1,
                                    "locationChanged": 1663787648000
                                },
                                "tags": null,
                                "foregroundColor": null,
                                "backgroundColor": null,
                                "attachments": [],
                                "url": "",
                                "username": "nempublikus",
                                "password": "HBYm8h3fhI7MxV3F2kEP",
                                "title": "prog.hu",
                                "notes": "",
                                "titleProtected": false,
                                "passwordProtected": true,
                                "customProperties": [],
                                "customIconUuid": null
                            }
                        ]
                    },
                    "times": {
                        "lastModificationTime": 1663787669000,
                        "creationTime": 1663787648000,
                        "lastAccessTime": 1663787669000,
                        "expiryTime": 1663786989000,
                        "usageCount": 2,
                        "locationChanged": 1663787648000
                    },
                    "tags": null,
                    "foregroundColor": null,
                    "backgroundColor": null,
                    "attachments": [],
                    "url": "prog.hu",
                    "username": "nempublikus",
                    "password": "HBYm8h3fhI7MxV3F2kEP",
                    "title": "prog.hu",
                    "notes": "prog jegyzet",
                    "titleProtected": false,
                    "passwordProtected": true,
                    "customProperties": [],
                    "customIconUuid": null
                }
            ],
            "groups": [
                {
                    "uuid": "918f4635-979a-4235-b56b-63fc0d55511f",
                    "name": "VirtualBox",
                    "iconId": 49,
                    "iconData": null,
                    "times": null,
                    "entries": [
                        {
                            "uuid": "f13b787e-4dbb-1943-80e6-6f57978c3fcf",
                            "iconId": 0,
                            "iconData": null,
                            "properties": [
                                {
                                    "key": "Notes",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                },
                                {
                                    "key": "Password",
                                    "propertyValue": {
                                        "value": "u1",
                                        "protected": true
                                    },
                                    "value": "u1",
                                    "protected": true
                                },
                                {
                                    "key": "Title",
                                    "propertyValue": {
                                        "value": "openvpn",
                                        "protected": false
                                    },
                                    "value": "openvpn",
                                    "protected": false
                                },
                                {
                                    "key": "UserName",
                                    "propertyValue": {
                                        "value": "user123",
                                        "protected": false
                                    },
                                    "value": "user123",
                                    "protected": false
                                },
                                {
                                    "key": "URL",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                }
                            ],
                            "referencedProperties": [],
                            "history": {
                                "historicEntries": []
                            },
                            "times": {
                                "lastModificationTime": 1663787309000,
                                "creationTime": 1663787291000,
                                "lastAccessTime": 1663787309000,
                                "expiryTime": 1663786989000,
                                "usageCount": 1,
                                "locationChanged": 1663787291000
                            },
                            "tags": null,
                            "foregroundColor": null,
                            "backgroundColor": null,
                            "attachments": [],
                            "url": "",
                            "username": "user123",
                            "password": "u1",
                            "title": "openvpn",
                            "notes": "",
                            "titleProtected": false,
                            "passwordProtected": true,
                            "customProperties": [],
                            "customIconUuid": null
                        }
                    ],
                    "groups": [],
                    "customIconUuid": null,
                    "expanded": false
                },
                {
                    "uuid": "5d7f9702-4dda-4935-8a47-d5528b368e44",
                    "name": "Cloud",
                    "iconId": 49,
                    "iconData": null,
                    "times": null,
                    "entries": [
                        {
                            "uuid": "e2d0baca-e8f2-ba4f-bdbc-ad51fa7fe091",
                            "iconId": 0,
                            "iconData": null,
                            "properties": [
                                {
                                    "key": "Notes",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                },
                                {
                                    "key": "Password",
                                    "propertyValue": {
                                        "value": "n11",
                                        "protected": true
                                    },
                                    "value": "n11",
                                    "protected": true
                                },
                                {
                                    "key": "Title",
                                    "propertyValue": {
                                        "value": "Linode",
                                        "protected": false
                                    },
                                    "value": "Linode",
                                    "protected": false
                                },
                                {
                                    "key": "UserName",
                                    "propertyValue": {
                                        "value": "node123",
                                        "protected": false
                                    },
                                    "value": "node123",
                                    "protected": false
                                },
                                {
                                    "key": "URL",
                                    "propertyValue": {
                                        "value": "",
                                        "protected": false
                                    },
                                    "value": "",
                                    "protected": false
                                }
                            ],
                            "referencedProperties": [],
                            "history": {
                                "historicEntries": []
                            },
                            "times": {
                                "lastModificationTime": 1663787337000,
                                "creationTime": 1663787329000,
                                "lastAccessTime": 1663787337000,
                                "expiryTime": 1663786989000,
                                "usageCount": 1,
                                "locationChanged": 1663787329000
                            },
                            "tags": null,
                            "foregroundColor": null,
                            "backgroundColor": null,
                            "attachments": [],
                            "url": "",
                            "username": "node123",
                            "password": "n11",
                            "title": "Linode",
                            "notes": "",
                            "titleProtected": false,
                            "passwordProtected": true,
                            "customProperties": [],
                            "customIconUuid": null
                        }
                    ],
                    "groups": [
                        {
                            "uuid": "edbd2360-8329-4670-98e6-4cc6ee71bd47",
                            "name": "EU",
                            "iconId": 49,
                            "iconData": null,
                            "times": null,
                            "entries": [
                                {
                                    "uuid": "5b4ce31f-b741-0643-8605-83bfa5db4833",
                                    "iconId": 0,
                                    "iconData": null,
                                    "properties": [
                                        {
                                            "key": "Notes",
                                            "propertyValue": {
                                                "value": "",
                                                "protected": false
                                            },
                                            "value": "",
                                            "protected": false
                                        },
                                        {
                                            "key": "Password",
                                            "propertyValue": {
                                                "value": "n2",
                                                "protected": true
                                            },
                                            "value": "n2",
                                            "protected": true
                                        },
                                        {
                                            "key": "Title",
                                            "propertyValue": {
                                                "value": "ramnode",
                                                "protected": false
                                            },
                                            "value": "ramnode",
                                            "protected": false
                                        },
                                        {
                                            "key": "UserName",
                                            "propertyValue": {
                                                "value": "n1",
                                                "protected": false
                                            },
                                            "value": "n1",
                                            "protected": false
                                        },
                                        {
                                            "key": "URL",
                                            "propertyValue": {
                                                "value": "",
                                                "protected": false
                                            },
                                            "value": "",
                                            "protected": false
                                        }
                                    ],
                                    "referencedProperties": [],
                                    "history": {
                                        "historicEntries": []
                                    },
                                    "times": {
                                        "lastModificationTime": 1663787349000,
                                        "creationTime": 1663787339000,
                                        "lastAccessTime": 1663787392000,
                                        "expiryTime": 1663786989000,
                                        "usageCount": 2,
                                        "locationChanged": 1663787392000
                                    },
                                    "tags": null,
                                    "foregroundColor": null,
                                    "backgroundColor": null,
                                    "attachments": [],
                                    "url": "",
                                    "username": "n1",
                                    "password": "n2",
                                    "title": "ramnode",
                                    "notes": "",
                                    "titleProtected": false,
                                    "passwordProtected": true,
                                    "customProperties": [],
                                    "customIconUuid": null
                                }
                            ],
                            "groups": [],
                            "customIconUuid": null,
                            "expanded": false
                        },
                        {
                            "uuid": "39e4af6b-cb07-40a1-bb11-5a16d2205cf6",
                            "name": "USA",
                            "iconId": 49,
                            "iconData": null,
                            "times": null,
                            "entries": [
                                {
                                    "uuid": "843827b7-fea7-0842-8115-e034c222ecd4",
                                    "iconId": 0,
                                    "iconData": null,
                                    "properties": [
                                        {
                                            "key": "Notes",
                                            "propertyValue": {
                                                "value": "",
                                                "protected": false
                                            },
                                            "value": "",
                                            "protected": false
                                        },
                                        {
                                            "key": "Password",
                                            "propertyValue": {
                                                "value": "waterpw",
                                                "protected": true
                                            },
                                            "value": "waterpw",
                                            "protected": true
                                        },
                                        {
                                            "key": "Title",
                                            "propertyValue": {
                                                "value": "digitalocean",
                                                "protected": false
                                            },
                                            "value": "digitalocean",
                                            "protected": false
                                        },
                                        {
                                            "key": "UserName",
                                            "propertyValue": {
                                                "value": "sea",
                                                "protected": false
                                            },
                                            "value": "sea",
                                            "protected": false
                                        },
                                        {
                                            "key": "URL",
                                            "propertyValue": {
                                                "value": "",
                                                "protected": false
                                            },
                                            "value": "",
                                            "protected": false
                                        }
                                    ],
                                    "referencedProperties": [],
                                    "history": {
                                        "historicEntries": []
                                    },
                                    "times": {
                                        "lastModificationTime": 1663787327000,
                                        "creationTime": 1663787314000,
                                        "lastAccessTime": 1663787387000,
                                        "expiryTime": 1663786989000,
                                        "usageCount": 2,
                                        "locationChanged": 1663787387000
                                    },
                                    "tags": null,
                                    "foregroundColor": null,
                                    "backgroundColor": null,
                                    "attachments": [],
                                    "url": "",
                                    "username": "sea",
                                    "password": "waterpw",
                                    "title": "digitalocean",
                                    "notes": "",
                                    "titleProtected": false,
                                    "passwordProtected": true,
                                    "customProperties": [],
                                    "customIconUuid": null
                                }
                            ],
                            "groups": [],
                            "customIconUuid": null,
                            "expanded": false
                        }
                    ],
                    "customIconUuid": null,
                    "expanded": false
                },
                {
                    "uuid": "11718563-c524-448d-89f0-619288baaa9f",
                    "name": "prog",
                    "iconId": 49,
                    "iconData": null,
                    "times": null,
                    "entries": [],
                    "groups": [
                        {
                            "uuid": "d204b63d-6aac-4734-98c0-b2731f3fc411",
                            "name": "java",
                            "iconId": 49,
                            "iconData": null,
                            "times": null,
                            "entries": [
                                {
                                    "uuid": "e8b12a35-0d61-0e4c-afad-eb5ac7028093",
                                    "iconId": 0,
                                    "iconData": null,
                                    "properties": [
                                        {
                                            "key": "Notes",
                                            "propertyValue": {
                                                "value": "teszt jegyzet java",
                                                "protected": false
                                            },
                                            "value": "teszt jegyzet java",
                                            "protected": false
                                        },
                                        {
                                            "key": "Password",
                                            "propertyValue": {
                                                "value": "buy123",
                                                "protected": true
                                            },
                                            "value": "buy123",
                                            "protected": true
                                        },
                                        {
                                            "key": "Title",
                                            "propertyValue": {
                                                "value": "udemy.com",
                                                "protected": false
                                            },
                                            "value": "udemy.com",
                                            "protected": false
                                        },
                                        {
                                            "key": "UserName",
                                            "propertyValue": {
                                                "value": "customer",
                                                "protected": false
                                            },
                                            "value": "customer",
                                            "protected": false
                                        },
                                        {
                                            "key": "URL",
                                            "propertyValue": {
                                                "value": "udemy.com",
                                                "protected": false
                                            },
                                            "value": "udemy.com",
                                            "protected": false
                                        }
                                    ],
                                    "referencedProperties": [],
                                    "history": {
                                        "historicEntries": [
                                            {
                                                "uuid": "e8b12a35-0d61-0e4c-afad-eb5ac7028093",
                                                "iconId": 0,
                                                "iconData": null,
                                                "properties": [
                                                    {
                                                        "key": "Notes",
                                                        "propertyValue": {
                                                            "value": "",
                                                            "protected": false
                                                        },
                                                        "value": "",
                                                        "protected": false
                                                    },
                                                    {
                                                        "key": "Title",
                                                        "propertyValue": {
                                                            "value": "udemy.com",
                                                            "protected": false
                                                        },
                                                        "value": "udemy.com",
                                                        "protected": false
                                                    },
                                                    {
                                                        "key": "URL",
                                                        "propertyValue": {
                                                            "value": "",
                                                            "protected": false
                                                        },
                                                        "value": "",
                                                        "protected": false
                                                    },
                                                    {
                                                        "key": "UserName",
                                                        "propertyValue": {
                                                            "value": "customer",
                                                            "protected": false
                                                        },
                                                        "value": "customer",
                                                        "protected": false
                                                    },
                                                    {
                                                        "key": "Password",
                                                        "propertyValue": {
                                                            "value": "buy123",
                                                            "protected": true
                                                        },
                                                        "value": "buy123",
                                                        "protected": true
                                                    }
                                                ],
                                                "referencedProperties": [],
                                                "history": null,
                                                "times": {
                                                    "lastModificationTime": 1663787436000,
                                                    "creationTime": 1663787418000,
                                                    "lastAccessTime": 1663787436000,
                                                    "expiryTime": 1663786989000,
                                                    "usageCount": 1,
                                                    "locationChanged": 1663787418000
                                                },
                                                "tags": null,
                                                "foregroundColor": null,
                                                "backgroundColor": null,
                                                "attachments": [],
                                                "url": "",
                                                "username": "customer",
                                                "password": "buy123",
                                                "title": "udemy.com",
                                                "notes": "",
                                                "titleProtected": false,
                                                "passwordProtected": true,
                                                "customProperties": [],
                                                "customIconUuid": null
                                            }
                                        ]
                                    },
                                    "times": {
                                        "lastModificationTime": 1663787480000,
                                        "creationTime": 1663787418000,
                                        "lastAccessTime": 1663787480000,
                                        "expiryTime": 1663786989000,
                                        "usageCount": 2,
                                        "locationChanged": 1663787418000
                                    },
                                    "tags": null,
                                    "foregroundColor": null,
                                    "backgroundColor": null,
                                    "attachments": [],
                                    "url": "udemy.com",
                                    "username": "customer",
                                    "password": "buy123",
                                    "title": "udemy.com",
                                    "notes": "teszt jegyzet java",
                                    "titleProtected": false,
                                    "passwordProtected": true,
                                    "customProperties": [],
                                    "customIconUuid": null
                                }
                            ],
                            "groups": [
                                {
                                    "uuid": "9165f413-af71-4b56-8eaa-7803ba461880",
                                    "name": "spring boot",
                                    "iconId": 49,
                                    "iconData": null,
                                    "times": null,
                                    "entries": [
                                        {
                                            "uuid": "17611ebf-7350-974a-9c6a-0c900796d845",
                                            "iconId": 0,
                                            "iconData": null,
                                            "properties": [
                                                {
                                                    "key": "Notes",
                                                    "propertyValue": {
                                                        "value": "baeldung jegyzet\n",
                                                        "protected": false
                                                    },
                                                    "value": "baeldung jegyzet\n",
                                                    "protected": false
                                                },
                                                {
                                                    "key": "Password",
                                                    "propertyValue": {
                                                        "value": "nevertakeit",
                                                        "protected": true
                                                    },
                                                    "value": "nevertakeit",
                                                    "protected": true
                                                },
                                                {
                                                    "key": "Title",
                                                    "propertyValue": {
                                                        "value": "baeldung",
                                                        "protected": false
                                                    },
                                                    "value": "baeldung",
                                                    "protected": false
                                                },
                                                {
                                                    "key": "UserName",
                                                    "propertyValue": {
                                                        "value": "eugen",
                                                        "protected": false
                                                    },
                                                    "value": "eugen",
                                                    "protected": false
                                                },
                                                {
                                                    "key": "URL",
                                                    "propertyValue": {
                                                        "value": "baeldung.com",
                                                        "protected": false
                                                    },
                                                    "value": "baeldung.com",
                                                    "protected": false
                                                }
                                            ],
                                            "referencedProperties": [],
                                            "history": {
                                                "historicEntries": [
                                                    {
                                                        "uuid": "17611ebf-7350-974a-9c6a-0c900796d845",
                                                        "iconId": 0,
                                                        "iconData": null,
                                                        "properties": [
                                                            {
                                                                "key": "Notes",
                                                                "propertyValue": {
                                                                    "value": "baeldung jegyzet\n",
                                                                    "protected": false
                                                                },
                                                                "value": "baeldung jegyzet\n",
                                                                "protected": false
                                                            },
                                                            {
                                                                "key": "Title",
                                                                "propertyValue": {
                                                                    "value": "baeldung",
                                                                    "protected": false
                                                                },
                                                                "value": "baeldung",
                                                                "protected": false
                                                            },
                                                            {
                                                                "key": "URL",
                                                                "propertyValue": {
                                                                    "value": "baeldung.com",
                                                                    "protected": false
                                                                },
                                                                "value": "baeldung.com",
                                                                "protected": false
                                                            },
                                                            {
                                                                "key": "UserName",
                                                                "propertyValue": {
                                                                    "value": "eugen",
                                                                    "protected": false
                                                                },
                                                                "value": "eugen",
                                                                "protected": false
                                                            },
                                                            {
                                                                "key": "Password",
                                                                "propertyValue": {
                                                                    "value": "nevertakeit",
                                                                    "protected": true
                                                                },
                                                                "value": "nevertakeit",
                                                                "protected": true
                                                            }
                                                        ],
                                                        "referencedProperties": [],
                                                        "history": null,
                                                        "times": {
                                                            "lastModificationTime": 1663787636000,
                                                            "creationTime": 1663787488000,
                                                            "lastAccessTime": 1663787636000,
                                                            "expiryTime": 1663711200000,
                                                            "usageCount": 1,
                                                            "locationChanged": 1663787488000
                                                        },
                                                        "tags": null,
                                                        "foregroundColor": null,
                                                        "backgroundColor": null,
                                                        "attachments": [],
                                                        "url": "baeldung.com",
                                                        "username": "eugen",
                                                        "password": "nevertakeit",
                                                        "title": "baeldung",
                                                        "notes": "baeldung jegyzet\n",
                                                        "titleProtected": false,
                                                        "passwordProtected": true,
                                                        "customProperties": [],
                                                        "customIconUuid": null
                                                    }
                                                ]
                                            },
                                            "times": {
                                                "lastModificationTime": 1663787729000,
                                                "creationTime": 1663787488000,
                                                "lastAccessTime": 1663787729000,
                                                "expiryTime": 1784584800000,
                                                "usageCount": 2,
                                                "locationChanged": 1663787488000
                                            },
                                            "tags": null,
                                            "foregroundColor": null,
                                            "backgroundColor": null,
                                            "attachments": [],
                                            "url": "baeldung.com",
                                            "username": "eugen",
                                            "password": "nevertakeit",
                                            "title": "baeldung",
                                            "notes": "baeldung jegyzet\n",
                                            "titleProtected": false,
                                            "passwordProtected": true,
                                            "customProperties": [],
                                            "customIconUuid": null
                                        }
                                    ],
                                    "groups": [],
                                    "customIconUuid": null,
                                    "expanded": false
                                },
                                {
                                    "uuid": "639e9d54-5086-44ed-9281-ce0457f5be6c",
                                    "name": "jakarta",
                                    "iconId": 49,
                                    "iconData": null,
                                    "times": null,
                                    "entries": [
                                        {
                                            "uuid": "b536c04e-f57e-2e4c-beef-07436b17bef1",
                                            "iconId": 0,
                                            "iconData": null,
                                            "properties": [
                                                {
                                                    "key": "Notes",
                                                    "propertyValue": {
                                                        "value": "",
                                                        "protected": false
                                                    },
                                                    "value": "",
                                                    "protected": false
                                                },
                                                {
                                                    "key": "Password",
                                                    "propertyValue": {
                                                        "value": "123",
                                                        "protected": true
                                                    },
                                                    "value": "123",
                                                    "protected": true
                                                },
                                                {
                                                    "key": "Title",
                                                    "propertyValue": {
                                                        "value": "webuni",
                                                        "protected": false
                                                    },
                                                    "value": "webuni",
                                                    "protected": false
                                                },
                                                {
                                                    "key": "UserName",
                                                    "propertyValue": {
                                                        "value": "grade",
                                                        "protected": false
                                                    },
                                                    "value": "grade",
                                                    "protected": false
                                                },
                                                {
                                                    "key": "URL",
                                                    "propertyValue": {
                                                        "value": "",
                                                        "protected": false
                                                    },
                                                    "value": "",
                                                    "protected": false
                                                }
                                            ],
                                            "referencedProperties": [],
                                            "history": {
                                                "historicEntries": []
                                            },
                                            "times": {
                                                "lastModificationTime": 1663787755000,
                                                "creationTime": 1663787742000,
                                                "lastAccessTime": 1663787755000,
                                                "expiryTime": 1663786989000,
                                                "usageCount": 1,
                                                "locationChanged": 1663787742000
                                            },
                                            "tags": null,
                                            "foregroundColor": null,
                                            "backgroundColor": null,
                                            "attachments": [],
                                            "url": "",
                                            "username": "grade",
                                            "password": "123",
                                            "title": "webuni",
                                            "notes": "",
                                            "titleProtected": false,
                                            "passwordProtected": true,
                                            "customProperties": [],
                                            "customIconUuid": null
                                        }
                                    ],
                                    "groups": [],
                                    "customIconUuid": null,
                                    "expanded": false
                                }
                            ],
                            "customIconUuid": null,
                            "expanded": false
                        },
                        {
                            "uuid": "6304c744-6a49-40bb-be52-108be490f014",
                            "name": "python",
                            "iconId": 49,
                            "iconData": null,
                            "times": null,
                            "entries": [
                                {
                                    "uuid": "2f23d02c-b058-4f4a-8ab2-cce425eab7ad",
                                    "iconId": 0,
                                    "iconData": null,
                                    "properties": [
                                        {
                                            "key": "Notes",
                                            "propertyValue": {
                                                "value": "teszt jegyzet",
                                                "protected": false
                                            },
                                            "value": "teszt jegyzet",
                                            "protected": false
                                        },
                                        {
                                            "key": "Password",
                                            "propertyValue": {
                                                "value": "s123",
                                                "protected": true
                                            },
                                            "value": "s123",
                                            "protected": true
                                        },
                                        {
                                            "key": "Title",
                                            "propertyValue": {
                                                "value": "udacity.com",
                                                "protected": false
                                            },
                                            "value": "udacity.com",
                                            "protected": false
                                        },
                                        {
                                            "key": "UserName",
                                            "propertyValue": {
                                                "value": "snake",
                                                "protected": false
                                            },
                                            "value": "snake",
                                            "protected": false
                                        },
                                        {
                                            "key": "URL",
                                            "propertyValue": {
                                                "value": "udacity.com",
                                                "protected": false
                                            },
                                            "value": "udacity.com",
                                            "protected": false
                                        }
                                    ],
                                    "referencedProperties": [],
                                    "history": {
                                        "historicEntries": [
                                            {
                                                "uuid": "2f23d02c-b058-4f4a-8ab2-cce425eab7ad",
                                                "iconId": 0,
                                                "iconData": null,
                                                "properties": [
                                                    {
                                                        "key": "Notes",
                                                        "propertyValue": {
                                                            "value": "",
                                                            "protected": false
                                                        },
                                                        "value": "",
                                                        "protected": false
                                                    },
                                                    {
                                                        "key": "Title",
                                                        "propertyValue": {
                                                            "value": "udacity.com",
                                                            "protected": false
                                                        },
                                                        "value": "udacity.com",
                                                        "protected": false
                                                    },
                                                    {
                                                        "key": "URL",
                                                        "propertyValue": {
                                                            "value": "",
                                                            "protected": false
                                                        },
                                                        "value": "",
                                                        "protected": false
                                                    },
                                                    {
                                                        "key": "UserName",
                                                        "propertyValue": {
                                                            "value": "snake",
                                                            "protected": false
                                                        },
                                                        "value": "snake",
                                                        "protected": false
                                                    },
                                                    {
                                                        "key": "Password",
                                                        "propertyValue": {
                                                            "value": "s123",
                                                            "protected": true
                                                        },
                                                        "value": "s123",
                                                        "protected": true
                                                    }
                                                ],
                                                "referencedProperties": [],
                                                "history": null,
                                                "times": {
                                                    "lastModificationTime": 1663787448000,
                                                    "creationTime": 1663787439000,
                                                    "lastAccessTime": 1663787448000,
                                                    "expiryTime": 1663786989000,
                                                    "usageCount": 1,
                                                    "locationChanged": 1663787439000
                                                },
                                                "tags": null,
                                                "foregroundColor": null,
                                                "backgroundColor": null,
                                                "attachments": [],
                                                "url": "",
                                                "username": "snake",
                                                "password": "s123",
                                                "title": "udacity.com",
                                                "notes": "",
                                                "titleProtected": false,
                                                "passwordProtected": true,
                                                "customProperties": [],
                                                "customIconUuid": null
                                            }
                                        ]
                                    },
                                    "times": {
                                        "lastModificationTime": 1663787469000,
                                        "creationTime": 1663787439000,
                                        "lastAccessTime": 1663787469000,
                                        "expiryTime": 1663786989000,
                                        "usageCount": 2,
                                        "locationChanged": 1663787439000
                                    },
                                    "tags": null,
                                    "foregroundColor": null,
                                    "backgroundColor": null,
                                    "attachments": [],
                                    "url": "udacity.com",
                                    "username": "snake",
                                    "password": "s123",
                                    "title": "udacity.com",
                                    "notes": "teszt jegyzet",
                                    "titleProtected": false,
                                    "passwordProtected": true,
                                    "customProperties": [],
                                    "customIconUuid": null
                                }
                            ],
                            "groups": [],
                            "customIconUuid": null,
                            "expanded": false
                        }
                    ],
                    "customIconUuid": null,
                    "expanded": false
                }
            ],
            "customIconUuid": null,
            "expanded": false
        }
    ],
    "customIconUuid": null,
    "expanded": false
  }]
const teszt=document.getElementById('teszt')
const kdbxFilenameBox=document.querySelectorAll('.kdbxFilenameBox')

teszt.addEventListener('click',()=>{
  firstPageSect.classList.toggle('hide')
  dashboard.classList.toggle('hide')
let dataTemp=xarr
kdbxObject={"kdbx":{0:[]},}
// debugger

  sessionStorage.setItem('kdbx', JSON.stringify(dataTemp))
  kdbxObject.kdbx[0]=JSON.parse(sessionStorage.kdbx)
  createDashboard()
  changeBoxName(kdbxObject['kdbx'])

  function changeBoxName(obj) {
    for (let  i= 0;  i< obj[0].length; ++i) {
      kdbxFilenameBox[i].innerHTML=obj[0][i].name
    //   ide adj egy click-es eventet, ami hatására az adott rész fog betöltődni.
      kdbxFilenameBox[i].addEventListener("click", ()=>{
        let kdbxFileDataboxLeft=document.getElementById('kdbxFileDataboxLeft')
        kdbxFileDataboxLeft.innerHTML=""
        liGroups=[kdbxFileDataboxLeft]
        let newliGroup={[level]:liGroups}
        liGroupObj={...liGroupObj,...newliGroup}
        searchObj={...obj}

        objectHeadquaders(searchObj,level,indexHead)
      })  
        }
  }


  // Object bejárás

    function objectHeadquaders(obj,level,index) {  
// debugger
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
})

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
    // debugger
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
    // debugger
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
    //  debugger
    let tableTextTemp=""
    let titleTd
    let usernameTd
    let passwordTd
    let urlTd
    let notesTd
   let objEntries=Object.entries(obj)
    for (let a =0; a<objEntries.length; a++) {
            // debugger
        tableTextTemp+="<tr class="+"groups0"+`${level}`+"ind0"+`${indexHead}`+">"
          let objEntriesTemp=objEntries[a]
          let propertiesObj=objEntriesTemp[1].properties
          let propertiesObjTemp=Object.entries(propertiesObj)
          for (let b = 0; b < propertiesObjTemp.length; b++) {
            if (propertiesObjTemp[b][1].key=='Title') {
                let titleTdtemp=`<td>
                <div class="row alignCenter">
                <img src="assets/pic/key-outline.svg"  alt="" class="liArrow">
                <span>${propertiesObjTemp[b][1].value}</span>
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

function addTreeClick() {
/*
Fa megjelnítés elkészítése
*/ 
for (let a = 1; a < tableContainer.children.length; a++) {
    tableContainer.children[a].classList.add('tableTr')    
}
// entries-ek <tr> elérések
const tableTr=document.querySelectorAll('.tableTr')
// divek elérhetőek=> entries-ek megjelenítéséhez
const dataDivs=document.querySelectorAll("[data-div]")
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
