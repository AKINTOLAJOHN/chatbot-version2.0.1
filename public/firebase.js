// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
// require('dotenv').config

const firebaseConfig = {
  apiKey: "AIzaSyDpUmzbG0TYVOFJNYt4UBm2XBwx-eKRVK4",
  authDomain: "whosechat.firebaseapp.com",
  databaseURL: "https://whosechat-default-rtdb.firebaseio.com",
  projectId: "whosechat",
  storageBucket: "whosechat.appspot.com",
  messagingSenderId: "846104258938",
  appId: "1:846104258938:web:378e2bb10a3e08e6df0ec3",
  measurementId: "G-E2764LTFC9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getDatabase();
const GoogleProvider = new GoogleAuthProvider()



// var today = new Date();
//     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
  var image = "";
  var name = "";
  var email = ""



    let nextValue = 0;
    
        let messageRef = ref(db, 'message')
        onValue(messageRef, (snapshot)=>{
          if(snapshot.val()){
            nextValue = snapshot.val().length
          }else{
            nextValue = 0
          }
          let messages = snapshot.val()
          let messageText = "";
          for(let i = 0; i < messages.length; i++){
            let newObject = window.localStorage.getItem("email");
            let email = JSON.parse(newObject);
            let currentMessage = messages[i];
            if(currentMessage.sender == email){
              messageText += `<div class="bg-success text-white pb-2 mb-2 rounded"  style="width: 250px; margin-left: 430px ;">${currentMessage.content}</div>`;
            }else{
              messageText += `<div class="bg-info text-white rounded p-2 mb-1" style="width: 250px; margin-left: 0px ;">${currentMessage.content}</div>`;
            }
          }
          messageText += "<input type='text' id='toFocus'>";

        document.getElementById('chatArea').innerHTML = messageText;
        document.getElementById('toFocus').focus();
        document.getElementById('toFocus').style.visibility = 'hidden';

        })
        
        
    const good = document.getElementById("Funct")
        
  good.addEventListener('click', ()=>{
    let newObject = window.localStorage.getItem("email");
    let email = JSON.parse(newObject);
    document.getElementById("messageInp").value = ""
  
  let message = {sender: email.toLowerCase(), content: document.getElementById('messageInp').value};
  let dbRef = ref(db, `message/${nextValue}`);
    set(dbRef, message)

    let messageText = "";
          for(let i = 0; i < messages.length; i++){
            let currentMessage = messages[i];
            if(currentMessage.sender == email){
              messageText += `<div class="bg-success text-white pb-2 mb-2 rounded"  style="width: 250px; margin-left: 430px ;">${currentMessage.content}</div>`;
            }else{
              messageText += `<div class="bg-info text-white rounded p-2 mb-1" style="width: 250px; margin-left: 0px ;">${currentMessage.content}</div>`;
            }
          }
          messageText += "<input type='text' id='toFocus'>";

        document.getElementById('chatArea').innerHTML = messageText;
        document.getElementById('toFocus').focus();
        document.getElementById('toFocus').style.visibility = 'hidden';


})






const sign = document.getElementById("signup")
sign.addEventListener('click', ()=>{
  signIn()
})

function signIn() {
  signInWithPopup(auth, GoogleProvider)
  .then((result) => {
    document.getElementById("row").hidden = true;
    document.getElementById("chat").hidden =false;

    const user = result.user;
    window.localStorage.setItem("email", JSON.stringify(user.email));
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    gmail.innerText =  user.email;
    username.innerHTML = user.displayName;
    image = user.photoURL;


    imge.innerText.src = image

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}