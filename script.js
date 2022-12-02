const addButton = document.getElementById("add_btn");
const nameOfPerson = document.getElementById("name");
const ageOfPerson = document.getElementById("age");
const qualificationOfPerson = document.getElementById("qualification");
const panNumberOfPerson = document.getElementById("pan");
const errorMessage = document.querySelector(".error_msg");
const tableDisplayInfo=document.getElementById('table_body');

let count=0;

let personDetailsArray=JSON.parse(localStorage.getItem("person"));
if(!personDetailsArray){
    personDetailsArray=[];
}

personDetailsArray.map((obj)=>{
    displayPersonInformation(obj);
})

// console.log(personDetailsArray)

function resetForm() {
  nameOfPerson.value = "";
  ageOfPerson.value = "";
  qualificationOfPerson.value = "";
  panNumberOfPerson.value = "";
  nameOfPerson.classList.remove("border");
  ageOfPerson.classList.remove("border");
  qualificationOfPerson.classList.remove("border");
  panNumberOfPerson.classList.remove("border");
  errorMessage.innerText = "";
}

function displayPersonInformation(personDetailsObject){
   
    tableDisplayInfo.innerHTML+=`<tr id=${personDetailsObject.id}><td>${personDetailsObject.name}</td><td>${personDetailsObject.age}</td><td>${personDetailsObject.qualification}</td><td>${personDetailsObject.panNumber}</td><td><button class="delete btn">Delete</button><button class="edit btn">Edit</button></td></tr>`


}

function addDetails(e) {
  e.preventDefault();
  
  if (nameOfPerson.value == "") {
    errorMessage.innerText = "*Please Enter your name";
    nameOfPerson.classList.add("border");
    ageOfPerson.classList.remove("border");
    qualificationOfPerson.classList.remove("border");
    panNumberOfPerson.classList.remove("border");
    return;
  }

  if (ageOfPerson.value == "") {
    errorMessage.innerText = "*Please Enter your age";
    nameOfPerson.classList.remove("border");
    ageOfPerson.classList.add("border");
    qualificationOfPerson.classList.remove("border");
    panNumberOfPerson.classList.remove("border");
    return;
  } 
  else if (ageOfPerson.value % 1 !== 0) {
    errorMessage.innerText = "*Please Enter your age in numbers only";
    nameOfPerson.classList.remove("border");
    ageOfPerson.classList.add("border");
    qualificationOfPerson.classList.remove("border");
    panNumberOfPerson.classList.remove("border");

    return;
  }

  if (qualificationOfPerson.value == "") {
    errorMessage.innerText = "*Please select qualification from drop down menu";
    nameOfPerson.classList.remove("border");
    ageOfPerson.classList.remove("border");
    qualificationOfPerson.classList.add("border");
    panNumberOfPerson.classList.remove("border");

    return;
  }

  if (panNumberOfPerson.value == "") {
    errorMessage.innerText = "*Please Enter your PAN number";
    nameOfPerson.classList.remove("border");
    ageOfPerson.classList.remove("border");
    qualificationOfPerson.classList.remove("border");
    panNumberOfPerson.classList.add("border");
    return;
  } 
  else if (panNumberOfPerson.value.length !== 10) {
    errorMessage.innerText = "*PAN number should have maximum of 10 digits";
    nameOfPerson.classList.remove("border");
    ageOfPerson.classList.remove("border");
    qualificationOfPerson.classList.remove("border");
    panNumberOfPerson.classList.add("border");
    return;
  }
  
  const personDetailsObject={
    name:nameOfPerson.value,
    age:ageOfPerson.value,
    qualification:qualificationOfPerson.value,
    panNumber:panNumberOfPerson.value,
    id:count++
  }

  personDetailsArray.push(personDetailsObject);

  localStorage.setItem('person', JSON.stringify(personDetailsArray));

  displayPersonInformation(personDetailsObject);

  resetForm();
}

function deletePersonDetails(e){
    console.log(e)
}



addButton.addEventListener("click", addDetails);

tableDisplayInfo.addEventListener("click",(e)=>{
    if(e.target.classList.contains('delete')){
        deletePersonDetails(e);
    
    }
})

formDetails.addEventListener
