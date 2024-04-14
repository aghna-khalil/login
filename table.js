
let registerForm = document.querySelector("#register-form");
let allInput =registerForm.querySelectorAll("INPUT");
let addbtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal");
let closebtn = document.querySelector(".close-icon");
addbtn.onclick = function () {
  modal.classList.add("active");
};
closebtn.addEventListener("click", () => {
  modal.classList.remove("active");
  for (let i = 0; i < allInput.length; i++) {
   allInput[i].value="";
    
  }
});

// start global variables
let userData = [];
let profile_pic = document.querySelector("#profile-pic");
let upload_pic = document.querySelector("#upload-pic");
let idPR = document.getElementById("id");
let titlePR = document.querySelector("#title");
let descriptionPR = document.getElementById("description");
let quantityPR = document.getElementById("quantity");
let locationPR = document.getElementById("location");
let pricePR = document.getElementById("price");
let imgUrl;

let registerBtn = document.querySelector("#register-button");
let updateBtn = document.querySelector("#update-button");
// end global variables
// start register code
registerBtn.onclick = function (e) {
  e.preventDefault();
  registrationData();

  registerForm.reset("");
  closebtn.click();
};
if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
}

function registrationData() {
  userData.push({
    id: idPR.value,
    title: titlePR.value,
    description: descriptionPR.value,
    quantity: quantityPR.value,
    location: locationPR.value,
    price: pricePR.value,
    profilePic: imgUrl == undefined ? "assets/avatar.jpg" : imgUrl,
  });

  let userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  swal("Good job!", "Product Add Successfully!", "success");
}


// start returning data on page from localstorage
let tableData = document.querySelector("#table-data");
const getDataFromLocal = () => {
  tableData.innerHTML = "";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
   <tr index=${index}>
				<td>${index + 1}</td>
        <td><img src="${data.profilePic}" width="40" height="40"</td>
				<td>${data.id}</td>
				<td>${data.title}</td>
				<td>${data.description}</td>
				<td>${data.quantity}</td>
				<td>${data.location}</td>
				<td>${data.price}</td>
				<td style="color:#2D3E4B ;">*******</td>
				<td>
				<button class="edit-btn" style="background-color: #44535F;"><i class="fa-solid fa-eye"></i></button>
				<button class="del-btn" style="background-color: #8A949B;"><i class="fa-solid fa-trash"></i></button>
			    </td>
			</tr>
			
   `;
  });
  // start delete coding
  let i;
  let allDelBtn = document.querySelectorAll(".del-btn");
  for ( i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let id = tr.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userData.splice(id, 1);
          localStorage.setItem("userData", JSON.stringify(userData));
          tr.remove();
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  }
  // start edit/view code
  let alleditBtn = document.querySelectorAll(".edit-btn");
  for (i = 0; i < alleditBtn.length; i++) {
    alleditBtn[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let td = tr.getElementsByTagName("TD");
      let index = tr.getAttribute("index");
      let imgTag = td[1].getElementsByTagName("IMG");
      let profilepic = imgTag[0].src;
      let id = td[2].innerHTML;
      let title = td[3].innerHTML;
      let description = td[4].innerHTML;
      let quantity = td[5].innerHTML;
      let location = td[6].innerHTML;
      let price = td[7].innerHTML;
      addbtn.click();
      idPR.value = id;
      titlePR.value = title;
      descriptionPR.value = description;
      quantityPR.value = quantity;
      locationPR.value=location;
      pricePR.value=price;
      profile_pic.src=profilepic;
      updateBtn.onclick = function(e) {
        userData[index]={
          id: idPR.value,
          title: titlePR.value,
          description: descriptionPR.value,
          quantity: quantityPR.value,
          location: locationPR.value,
          price: pricePR.value,
          profilePic: upload_pic.value == "" ? profile_pic.src : imgUrl

        }
        localStorage.setItem("userData", JSON.stringify(userData));

        
      }
    }
  }
};
getDataFromLocal();

// image processing
upload_pic.onchange = function () {
  if (upload_pic.files[0].size < 1000000) {
    var fReader = new FileReader();
    fReader.onload = function (e) {
      imgUrl = e.target.result;
      profile_pic.src = imgUrl;
    };
    fReader.readAsDataURL(upload_pic.files[0]);
  } else {
    alert("file size is to long");
  }
};
// search code

let searchPR= document.querySelector("#searchid");
searchPR.oninput=function(){
  searchfun();
}
function searchfun(){
  let tr = tableData.querySelectorAll("TR");
  let filter = searchPR.value.toLowerCase();
  for (let i = 0; i < tr.length; i++) {
   let id = tr[i].getElementsByTagName("TD")[2].innerHTML;
   let title = tr[i].getElementsByTagName("TD")[3].innerHTML;
   let description = tr[i].getElementsByTagName("TD")[4].innerHTML;
   let quantity = tr[i].getElementsByTagName("TD")[5].innerHTML;
   let location = tr[i].getElementsByTagName("TD")[6].innerHTML;
   let price = tr[i].getElementsByTagName("TD")[7].innerHTML;


  //  let id= td.innerHTML;
   if(id.toLowerCase().indexOf(filter) > -1){
    tr[i].style.display="";
   }
   else if(title.toLowerCase().indexOf(filter) > -1){
    tr[i].style.display="";
   }
   else if(description.toLowerCase().indexOf(filter) > -1){
    tr[i].style.display="";
   }
   else if(quantity.toLowerCase().indexOf(filter) > -1){
    tr[i].style.display="";
   }
   else if(location.toLowerCase().indexOf(filter) > -1){
    tr[i].style.display="";
   }
   else if(price.toLowerCase().indexOf(filter) > -1){
    tr[i].style.display="";
   }
   else{
    tr[i].style.display= "none";
   }


    
  }
}
// clear all data 
let delAllBtn = document.querySelector("#del-all-btn");
let delAllBox = document.querySelector("#del-all-box");
delAllBtn.addEventListener('click',()=>{
  if(delAllBox.checked == true){
    alert("success")
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
       localStorage.removeItem("userData");
       window.location=location.href;
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }
  else{
    swal("TICK the box!", "For deletion", "error");
    
  }
})