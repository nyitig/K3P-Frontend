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
const FAQH6=document.getElementById('FAQH6')
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
  main.classList.remove("column", "active")
  setTimeout(() => {

    main.classList.add("hide")
  }, 2000);

})

// impressClose click

impressClose.addEventListener('click',()=>{
  main.classList.remove("hide")
  setTimeout(() => {
    main.classList.add("active")
  }, 10);

  setTimeout(() => {
    impressumDivContainer.classList.remove('active')
    impressumAndFAQContainer.classList.add("row", "active")
    impressumAndFAQContainer.classList.remove("hide")
    impressumSec.classList.toggle('hide')

  }, 2000);
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
      dataTemp.push({user: data})
      sessionStorage.setItem('user', JSON.stringify(dataTemp))
      loginPage.classList.toggle('hide')
      dashboard.classList.toggle('hide')
      let dashboardTemplate=`
      <h2 id="dashboardH2" class="">Üdvözöllek ${data.firstName} ${data.lastName}! </h2>
      <p id="dashboardEmail" class="">emailcímed:  ${data.email}</p>
      <p>jwtToken:</p>
      <p id="dashboardjwtToken" class=""> ${data.jwtToken}</p>
      <p id="dashboardRoles" class="">Roles: ${data.roles}</p>
      `
      dashboardContainer.innerHTML=dashboardTemplate
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

// dashboardTemplate

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


// impressum legyen a footer helyén ill ha katt, akkor külön oldalon jelenjen meg.
// session storage-t átküldeni "új lapra"