const editProfile = document.getElementById('editProfile'); 
const viewRecords = document.getElementById('viewRecords'); 
const editProfileForm = document.querySelector('.userInput'); 
const recordHolder = document.querySelector('.recordHolder'); 
const changePassword = document.getElementById('changePassword'); 
const nameInput = document.getElementById('name'); 
const password = document.getElementById('password'); 
const baseUrl = "http://localhost:4000/"
const endpoint = "users/me"
const recordsEndpoints = "/myTrainings"; 
const logoutEndpoint = "users/logout"
const token =  JSON.parse(localStorage.getItem('user')).token
const logo = document.getElementById('logo'); 
const logout = document.getElementById('logoutButton'); 

const error = document.createElement('p'); 
error.classList.add("error"); 
error.innerText = "Network Error" ; 

logout.addEventListener('click', ()=>{
    try{
    let res = fetch(baseUrl + logoutEndpoint ,{
        method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                'Content-type' : 'application/json',
                'Accept' : '*/*', 
                'Connection': 'keep-alive',
                'Authorization':token
            },
        
        }
    ).then(async (res)=>{
        localStorage.clear();
        window.location.href = "../"
    })
}catch(e){
    console.log(e); 
    editProfileForm.appendChild(error); 
}
})
logo.style.cursor = "pointer";
logo.addEventListener('click', ()=>{
    window.location.href = "../";
})
editProfile.style.cursor = 'pointer';
viewRecords.style.cursor = 'pointer';
editProfile.addEventListener('click', ()=>{
    recordHolder.style.display= 'none'; 
    editProfileForm.style.display = 'flex' ;
    editProfile.classList.add('active'); 
    viewRecords.classList.remove('active'); 
}); 
viewRecords.addEventListener('click', ()=>{
    recordHolder.style.display= 'block'; 
    editProfileForm.style.display = 'none'; 
    editProfile.classList.remove('active'); 
    viewRecords.classList.add('active'); 
}); 

changePassword.addEventListener('click',()=>{
    try{
    let res = fetch(baseUrl + endpoint ,{
        method: 'PATCH', 
            credentials: 'same-origin', 
            headers: {
                'Content-type' : 'application/json',
                'Accept' : '*/*', 
                'Connection': 'keep-alive',
                'Authorization':token
            },
            body : JSON.stringify({"name": nameInput.value ,
            "password" : password.value})
        }
    ).then(async (res)=>{
        try{
        if(res.status != 200) throw new Error(); 
        }catch(e){
            console.log(e); 
            editProfileForm.appendChild(error); 
        }
    })
}catch(e){
    console.log("Caught",e); 
    editProfileForm.appendChild(error); 
}

}); 