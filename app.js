// with buttons to switch between pages
      // TODO registerbutton, other buttons
const loginButton=document.getElementById('loginButton')
const registerButton=document.getElementById('registerButton')
const loginBack=document.getElementById('loginBack')
const firstPageSect=document.getElementById('firstPageSect')
const loginPage=document.getElementById('loginPage')
const registerPage=document.getElementById('registerPage')
const registerBack=document.getElementById('registerBack')
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
})
// registerBack button
registerBack.addEventListener("click", ()=> {
  firstPageSect.classList.toggle('hide')
  registerPage.classList.toggle('hide')
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

const url='http://127.0.0.1:9933/api/jwt_login'
LoginPageLoginButton.addEventListener("click",()=> {

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
      resultTemplate+=`a hiba oka: ${data.error} </h2>`
      loginResult.innerHTML=resultTemplate
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
    let resultTemplate=`<h2>A hiba oka: Rövid a név vagy a jelszó! </h2>`
    loginResult.innerHTML=resultTemplate
    setTimeout(() => {
      nameInput.focus()
      loginResult.innerHTML=""
    }, 2000);
  }
})

// dashboardTemplate
/*
let dashboardTemplate=`
<h2 id="dashboardH2" class="">Üdvözöllek </h2>
<p id="dashboardEmail" class="">emailcímed: </p>
<p id="dashboardjwtToken" class="">jwtToken: </p>
<p id="dashboardRoles" class="">Roles: </p>`
*/ 

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
  // check inputs fields
  checktempl=regArr.firstNameDto.length
  checkLenght(checktempl)
  if (!isTrue) {
    console.log("rovid a firstname")
    return
  }
  checktempl=regArr.lastNameDto.length
  checkLenght(checktempl)
  if (!isTrue) {
    console.log("rovid a lastname")
    return
  }
  checktempl=regArr.emailDto
  emailcheck(checktempl)
  if (!isTrue) {
    console.log("nem megfelelő az emailcím formátum")
    return
  }
  checktempl=regArr.passwordDto
  console.log(checktempl.length+" checklenght")
  if (checktempl.length<3 || checktempl!=pasw2val ) {
    console.log("Nem egyezik a password")
    return
  }
  // everything is ok!

  console.log("Lefutott a check. isTrue: "+isTrue)
})



// Email address check 

function emailcheck(emailAddress) {
  isTrue=false
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (emailAddress.match(mailformat)) {
    console.log("Bejön az if ágba")
    isTrue=true
    console.log("istrue: "+isTrue)
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