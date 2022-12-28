console.log("Linked successfuly"); 
const signedIn = localStorage.getItem('loggedIn');
const authButtons = document.getElementsByClassName("authButton");
const userNamme = document.getElementById('userData');
console.log(signedIn)
if(signedIn=="1"){
    for (const authButton of authButtons) {
        authButton.style.display = "none";
    }
    userNamme.textContent = JSON.parse(localStorage.getItem('user')).user.name;
}