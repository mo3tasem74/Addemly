console.log("linked");
const signupButton = document.getElementById("signup"); 
const url = "users/signup" ; 
const loginUrl = "users/login"
const baseUrl = "http://localhost:4000/"
let res="" ; 
let confirmationRes = "" ; 
const inputName = document.getElementById("name"); 
const inputPassword = document.getElementById("password");
const inputEmail = document.getElementById("email"); 
const form = document.querySelector('.authForms')
const error = document.createElement('p'); 
error.classList.add("error"); 
error.innerText = "Couldn't sign"


signupButton.addEventListener('click',async (event)=>{
    event.preventDefault();
    signupButton.disabled = true; 
    signupButton.classList.add("disabled");
    if(inputName==null){
        try{
            let postData = {
                "email": inputEmail.value ,
                "password": inputPassword.value
            }
        res = await fetch(baseUrl+loginUrl , {
            method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                'Content-type' : 'application/json',
                'Accept' : '*/*', 
                'Connection': 'keep-alive'
            },
            body : JSON.stringify(postData)

        }
        )
        let userInfo =  await res.json(); 
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('loggedIn',"1");
        window.location.href = "../html/tools.html";
    }catch(e){
        console.log(e)
        signupButton.disabled = false; 
        signupButton.classList.remove('disabled');
        form.appendChild(error)
    }
    }
    else{
   
    let postData = {
        "name": inputName.value,
         "email": inputEmail.value ,
        "password": inputPassword.value
    }
    try{
    res = await fetch(baseUrl +url , {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-type' : 'application/json',
            'Accept' : '*/*', 
            'Connection': 'keep-alive'
        },
        body : JSON.stringify(postData)
    }
    ).then(async (res)=>{
        jsonRes = await res.json(); 
        confirmationRes = await fetch(baseUrl+"confirm" ,{
            method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                'Content-type' : 'application/json',
                'Accept' : '*/*', 
                'Connection': 'keep-alive'
            },
            body : JSON.stringify({"confirmationCode": jsonRes.user.confirmationCode})
        })
    }
    
    
    )
        localStorage.setItem('user', JSON.stringify(JSON.stringify(jsonRes)));
        localStorage.setItem('loggedIn',"1");
        window.location.href = "../html/tools.html";
    }
     catch(e){
         console.log(e)
         form.appendChild(error)
        }
}
}) ; 


