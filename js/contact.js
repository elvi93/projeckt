// Context

// We will be  using the FETCH Method aka fetchAPI to create(POST HTTP Method) a new resoruce/post into the
// API RESOURCE: "https://jsonplaceholder.typicode.com/posts",

// Working Example
// Useing as reff

// fetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   body: JSON.stringify({
//     title: "foo",
//     body: "bar",
//     userId: 1,
//   }),
//   headers: {
//     "Content-type": "application/json; charset=UTF-8",
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));

// -----
// -----var okName = false;
var okEmail = false;
var okPhone = false;
var okMessage = false;

function validateName() {
  let nameUser = document.getElementById("name");
  if (!nameUser.value) {
    document.getElementById("errorName").hidden = false;
    nameUser.style.borderColor = "red";
    nameUser.style.borderStyle = "solid";
    okName = false;
  } else {
    document.getElementById("errorName").hidden = true;
    nameUser.style.borderStyle = "none";
    okName = true;
  }
  checkValues();
}

function validateEmail() {
  let emailUser = document.getElementById("email");
  if (!emailUser.value) {
    document.getElementById("errorEmail").hidden = false;
    document.getElementById("errorFormatEmail").hidden = true;
    emailUser.style.borderColor = "red";
    emailUser.style.borderStyle = "solid";
    okEmail = false;
  } else {
    document.getElementById("errorEmail").hidden = true;
    emailUser.style.borderStyle = "none";
    okEmail = true;
  }
  var isValid = emailUser.value
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (!isValid) {
    document.getElementById("errorFormatEmail").hidden = false;
    document.getElementById("errorEmail").hidden = true;
    emailUser.style.borderColor = "red";
    emailUser.style.borderStyle = "solid";
  } else {
    document.getElementById("errorFormatEmail").hidden = true;
  }
  checkValues();
}

function validatePhone() {
  let phoneNumber = document.getElementById("phone");
  if (!phoneNumber.value) {
    document.getElementById("errorPhone").hidden = false;
    phoneNumber.style.borderColor = "red";
    phoneNumber.style.borderStyle = "solid";
    okPhone = false;
  } else {
    document.getElementById("errorPhone").hidden = true;
    phoneNumber.style.borderStyle = "none";
    okPhone = true;
  }
  checkValues();
}

function validateMessage(){
  let messageUser = document.getElementById("message");
  if(messageUser.value.length < 6){
    document.getElementById("errorMessageUser").hidden = false;
    messageUser.style.borderColor = "red";
    messageUser.style.borderStyle ="solid"
    okMessage = false;
  }else{
    document.getElementById("errorMessageUser").hidden = true;
    messageUser.style.borderStyle = "none";
    okMessage = true;
  }
  checkValues();
}

function checkValues() {
  if (okName && okEmail && okPhone && okMessage) {
    document.getElementById("errorSubmit").hidden = true;
  }
}


function sendForm() {

  let incompleteForm = document.getElementById("errorSubmit");
  if (okName && okEmail && okPhone && okMessage) {
    incompleteForm.hidden = true;
   toggleModal();
  } else {
    incompleteForm.hidden = false;
    //incompleteForm.style.borderStyle = "dotted";
    incompleteForm.style.borderColor = "red";
  }
}

// -----
// -----

// My Code
// Async/Await
// Try Catch Blocks - Legibility
// NOTE: Remember that when we connect functions to events such as clicks, hover, or any type of events, we can use the functions paramters ()  to get extra info about the event itserlf!
const sendForm = async (extraInfoReceivedFromClickEvent) => {
  // This sytax prevents the form from refreshing the page on submission, using the method below!
  extraInfoReceivedFromClickEvent.preventDefault();

  // Let's connect to some HTML elements via DOM
  let nameInput = document.querySelector("#name").value; // This info is going to be sennt out in the key of 'title' withinn the API
  let emailInput = document.querySelector("#email").value; // This info is going to be sennt out in the key of 'body' withinn the API
  let phoneInput = document.querySelector("#phone").value; // This info is going to be sennt out in the key of 'body' withinn the API
  let messageInput = document.querySelector("#message").value; // This info is going to be sennt out in the key of 'body' withinn the API

  // Using the fetch method
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: nameInput, // somethinng we recieve from the form, // This key is matching to 1 of the keys  available
        body: `${emailInput}, ${phoneInput}, ${messageInput}`, // somethinng we recieve from the form,  // This key is matching to 1 of the keys  available
        userId: 10, // // This key is matching to 1 of the keys  available but ixs hardCoded given that there is only 10 users!
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // L:ayer of security, in case of HTTTP ERROR, we want to see the error + some info
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Let's add some logic to display the alert windopw that is created through html + CSS
    console.log(response);
    const userResponseCleaned = await response.json();
    console.log(userResponseCleaned);

    // Reset input values after successful form submission
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#message").value = "";
  } catch (error) {
    console.error("Error", error);
  }
};

// DOM Selectio to connect my function 'sendForm' to the submit
document.querySelector(".btn-submit").addEventListener("click", sendForm);

// fetch("https://jsonplaceholder.typicode.com/posts", {
//   // The first thing you use when you expand the fetch method with the object is the method key
//   // This key specifies  which type of HTTP Request Method You will be using
//   // THe string value for the method key ALWAYS has to be in uppercase
//   method: "POST", //  - POST: Submits data to the server to create a new resource.
//   //  The second key is the body key
//   // Why the body key?
//   // Cause the body keyis the hardest to program due to the syntax being hard to read
//   // Also, the body key is where the info will be sent out in!
//   body: JSON.stringify({
//     // JSON.stringify - this methods transforms your jsObjects/code into jsonObjects or code that is readable in JSON FORMAT
//     title: "", // somethinng we recieve from the form, // This key is matching to 1 of the keys  available
//     body: "", // somethinng we recieve from the form,  // This key is matching to 1 of the keys  available
//     userId: 10, // // This key is matching to 1 of the keys  available but ixs hardCoded given that there is only 10 users!
//   }),
//   // The thrid Key is the headers key
//   // This key is used to send extra information 'under the hood' to the request!\
//   // Why ????
//   // For the simple reason that  even though we use the FETCH to send info, we have to specify what type of info is being sent out!
//   headers: {
//     "Content-type": "application/json; charset=UTF-8", // Content-type key is top tell hey this content is a json format content with the capacity to be read out by UTF-8 universal unicoding!
//     // IF YOUR API IS PRIVATE OR RESTRICTED, MEANING YOU NEED A API KEY, 10/10 THE HEADERS OBJECT INISDE THE OBEJCT EXPANISON IS WHERE YOU PLACE THEM
//   },
// });
