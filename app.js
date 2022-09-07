// with buttons to switch between pages
      // TODO registerbutton, other buttons
const loginButton=document.getElementById('loginButton')
const registerButton=document.getElementById('registerButton')
const loginBack=document.getElementById('loginBack')
const firstPageSect=document.getElementById('firstPageSect')
const loginPage=document.getElementById('loginPage')
const registerPage=document.getElementById('registerPage')
const registerBack=document.getElementById('registerBack')
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
let loginArr={
  username:'',
  password:''
}
let formData= new FormData()
const nameInput=document.getElementById('nameInput')
nameInput.addEventListener("change",()=>{
  loginArr.username=nameInput.value
  console.log("username: "+loginArr.username)
})
const passwordInput=document.getElementById('passwordInput')
passwordInput.addEventListener("keyup",()=>{
  loginArr.password=passwordInput.value
  console.log("password: "+loginArr.password)
 
})

const LoginPageLoginButton=document.getElementById('LoginPageLoginButton')
// request options

const url='http://127.0.0.1:9999/test/login'
LoginPageLoginButton.addEventListener("click",()=> {
  
  formData.append("username",nameInput.value)
  formData.append("password", loginArr.password)
  console.log("formData: "+formData)
  let options = {
    mode: 'no-cors',
    credentials: 'include',
    method: 'POST',
    headers: {
      //  'Content-Type': 'multipart/form-data',
      //  "Content-Type": "application/json",
      'Content-Type':'text/html',
         'Accept': 'application/json',
    },
    body: JSON.stringify(loginArr),
  }
  try{
    console.log(loginArr)
     fetch(url, options,)
  .then(response => response.json())
  .catch(err=> console.log(err))
  .then(data => console.log(data))
  }catch(e) {
    console.log("error: "+e)
  }
 
})