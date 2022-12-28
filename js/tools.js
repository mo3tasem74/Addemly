console.log("Linked successfuly"); 
const signedIn = localStorage.getItem('loggedIn');
const authButtons = document.getElementsByClassName("authButton");
const userNamme = document.getElementById('userData');
const toolContainer = document.getElementsByClassName("cornerTool"); 
console.log(signedIn)
if(signedIn=="1"){
    for (const authButton of authButtons) {
        authButton.style.display = "none";
    }
    userNamme.textContent = JSON.parse(localStorage.getItem('user')).user.name;
}
for (const cornerTool of toolContainer) {
    cornerTool.addEventListener('click', ()=>{
        window.location.href = "../html/workplace.html";
    })
}

