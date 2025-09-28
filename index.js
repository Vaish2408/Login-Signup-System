let eleBtnLoginLogout = document.querySelector(".btn-login-logout");
let eleBtnSignup = document.querySelector(".btn-signup");

let eleFormLogin = document.querySelector(".login-form");
let eleFormSignup = document.querySelector(".signup-form");
let eleHomePage = document.querySelector(".home-page");

let eleWelcomeUser = document.querySelector(".welcome-user");
let eleMessage = document.querySelector(".message");
let eleEmailSignup = document.querySelector(
  ".signup-form > input[type='email']"
);
let eleEmailLogin = document.querySelector(".login-form > input[type='email']");
let eleUserNameSignup = document.querySelector(
  ".signup-form > input[type='text']"
);
let elePasswordSignup = document.querySelector(
  ".signup-form > input[type='password']"
);
let elePasswordLogin = document.querySelector(
  ".login-form > input[type='password']"
);
//Get the user list from local storage
let userList;
view = "login";
setView();
// check the local storage.
// Is it first day
let sList = window.localStorage.getItem("slist");
if (sList == null) {
  window.localStorage.setItem("slist", JSON.stringify([])); // empty array
  userList = [];
} else {
  userList = JSON.parse(sList);
}
eleBtnLoginLogout.addEventListener("click", () => {
  if (view == "loginSuccess") {
    // to logout
    eleBtnLoginLogout.innerHTML = "Login";
    view = "login";
    setView();
  } else {
    view = "login";
    setView();
  }
});
eleBtnSignup.addEventListener("click", () => {
  view = "signup";
  setView();
});
eleFormSignup.addEventListener("submit", (event) => {
  // Get data entered in the form
  event.preventDefault();
  let formdata = new FormData(event.target);
  let user = {};
  for (let data of formdata) {
    console.log(data[0] + " " + data[1]);
    user[data[0]] = data[1]; // user["email_id"]="j_....";
  }
  console.log(user);

  userList.push(user);

  // write this in localstorage also
  // get array from localstorage - slist
  let uList = JSON.parse(window.localStorage.getItem("slist"));
  uList.push(user);
  // write new ulist in localstorage
  window.localStorage.setItem("slist", JSON.stringify(uList));
  eleMessage.innerHTML = "Signup Successful...You may login now...";
  window.setTimeout(() => {
    eleMessage.innerHTML = "";
  }, 3000);
  view = "login";
  setView();
});
eleFormLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  let formdata = new FormData(event.target);
  let user = {};
  for (let data of formdata) {
    console.log(data[0] + " " + data[1]);
    user[data[0]] = data[1]; // user["email_id"]="j_....";
  }
  console.log(user);
  checkUser(user);
});
function checkUser(user) {
  let filteredUserList = userList.filter(
    (e, index) => e.emailid == user.emailid && e.password == user.password
  );
  console.log(filteredUserList);

  if (filteredUserList.length == 1) {
    eleMessage.innerHTML = "Login Successful...";
    window.setTimeout(() => {
      eleMessage.innerHTML = "";
    }, 3000);
    eleWelcomeUser.innerHTML += filteredUserList[0].username;
    view = "loginSuccess";
    setView();
    eleBtnLoginLogout.innerHTML = "Logout";
  } else {
    eleMessage.innerHTML = "Sorry... wrong credentials";
  }
}

// eleFormSignup.addEventListener("submit", (event) => {
//   event.preventDefault();
//   let user = {};
//   let formdata = new FormData(eleFormSignup); // or eleFormsSignup
//   // use for-of loop to collect data
//   for (data of formdata) {
//     user[data[0;]] = data[1];
//   }
//   userList.push(user);
//   console.log(user);
// });
// let view = "signup";
// setView();
function setView() {
  if (view == "login") {
    eleFormLogin.style.display = "block";
    eleFormSignup.style.display = "none";
    eleHomePage.style.display = "none";
    eleWelcomeUser.style.display = "none";
  } else if (view == "signup") {
    eleFormSignup.style.display = "block";
    eleFormLogin.style.display = "none";
    eleHomePage.style.display = "none";
    eleWelcomeUser.style.display = "none";
  } else if (view == "loginSuccess") {
    eleHomePage.style.display = "block";
    eleWelcomeUser.style.display = "block";
    eleFormLogin.style.display = "none";
    eleFormSignup.style.display = "none";
  }
}
