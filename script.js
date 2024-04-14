const wrapper= document.querySelector('.wrapper');
const loginlink=document.querySelector('.login-link');
const registerlink=document.querySelector('.register-link');
const loginbtn=document.querySelector('.login-btn');
const iconClose=document.querySelector('.icon-close');

registerlink.addEventListener('click',()=>{
    wrapper.classList.add('active');
});

loginlink.addEventListener('click',()=>{
    wrapper.classList.remove('active');
});

loginbtn.addEventListener('click',()=>{
    wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click',()=>{
    wrapper.classList.remove('active-popup');
});

function registerUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  let users = JSON.parse(localStorage.getItem("users"));
  if (!Array.isArray(users)) {
      users = [];
  }

  const userExists = users.some((user) => user.username === username);
  if (userExists) {
      // alert("Username already exists. Please choose another one.");
      swal("Try again!", "Username already exists!", "error");
      return;
  }

  users.push({ username, password, email });
  localStorage.setItem("users", JSON.stringify(users));
//   alert("Registration successful!");
  swal("Good job!", "Registration successful!", "success");
  

}

function loginUser() {
  const username = document.getElementById("loginusername").value;
  const password = document.getElementById("loginpassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    swal("Good job!", "Login successful!", "success");
    //   alert("Login successful!");
      window.location.href = "table.html";
  }
   else {
      alert("Invalid username or password.");
  }
}
