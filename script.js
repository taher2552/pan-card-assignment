const addButton = document.getElementById("add_btn");
const nameOfPerson = document.getElementById("name");
const ageOfPerson = document.getElementById("age");
const qualificationOfPerson = document.getElementById("qualification");
const panNumberOfPerson = document.getElementById("pan");
const errorMessage = document.querySelector(".error_msg");
const tableDisplayInfo=document.getElementById('table_body');
const searchPanNumber=document.getElementById('search');

let count=0;
let nameEdit, ageEdit, qualificationEdit, panNumberEdit;
let panArray=[];


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
   
    tableDisplayInfo.innerHTML+=`<tr id=${personDetailsObject.id}><td>${personDetailsObject.name}</td><td>${personDetailsObject.age}</td><td>${personDetailsObject.qualification}</td><td class="pan">${personDetailsObject.panNumber}</td><td><button class="delete btn">Delete</button><button class="edit btn">Edit</button></td></tr>`


}

function addDetails(e) {
  e.preventDefault();

  if(addButton.innerText=="Add"){
  
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
  panArray.push(panNumberOfPerson.value);
  console.log(panArray)

  resetForm();
 
}
else if(addButton.innerText=="Save"){

  saveEditedPersonDetails(e, nameOfPerson.value, ageOfPerson.value, qualificationOfPerson.value, panNumberOfPerson.value);

}
}

function deletePersonDetails(e){
 
  personDetailsArray.map((val,index)=>{
      if(val.id===parseInt(e.path[2].id)){
        let confirm=window.confirm("Are you sure you want to delete this??")
        if(confirm){
          personDetailsArray.splice(index,1); 
          e.path[2].remove();  
        }
      }
      
  })
  
  
  localStorage.setItem("person", JSON.stringify(personDetailsArray));
}

function sortingByName(e){
  e.preventDefault();
  tableDisplayInfo.innerHTML="";
  if(e.target.innerHTML=="A-Z"){
  function ascending( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }
  personDetailsArray.sort(ascending);

  personDetailsArray.map((obj)=>{
    displayPersonInformation(obj);
  })
}
  if(e.target.innerHTML=="Z-A"){
  function descending( a, b ) {
    if ( a.name < b.name ){
      return 1;
    }
    if ( a.name > b.name ){
      return -1;
    }
    return 0;
  }
  personDetailsArray.sort( descending );

  personDetailsArray.map((obj)=>{
    displayPersonInformation(obj);
  })
}
  

    
  }

  function editPersonDetails(e){
     nameEdit=e.path[2].firstElementChild;
      ageEdit=nameEdit.nextElementSibling;
      qualificationEdit=ageEdit.nextElementSibling;
      panNumberEdit=qualificationEdit.nextElementSibling;
    // console.log(panNumberEdit);

    nameOfPerson.value=nameEdit.innerText;
    ageOfPerson.value=ageEdit.innerText;
    qualificationOfPerson.value=qualificationEdit.innerText;
    panNumberOfPerson.value=panNumberEdit.innerText;

     addButton.innerText="Save";

   
    
}

function saveEditedPersonDetails(e,name,age,qualification,panNumber){
  e.preventDefault();
  // console.log(formInput.value,taskToEdit)

 
  personDetailsArray.map((val)=>{

       //console.log(val.name, nameEdit.text)

      if(val.name==nameEdit.textContent){
      // val.task=formInput.value;
        //  console.log("hellllllo")
       val.name=nameOfPerson.value;
       
      }
      if(val.age==ageEdit.textContent){
      
       val.age=ageOfPerson.value;
      }
      if(val.qualification==qualificationEdit.textContent){
      // val.task=formInput.value;
       val.qualification=qualificationOfPerson.value;
      }
      if(val.panNumber==panNumberEdit.textContent){
      // val.task=formInput.value;
       val.panNumber=panNumberOfPerson.value;
      }
    
       })

  nameEdit.innerText=name;
  ageEdit.innerText=age;
  qualificationEdit.innerText=qualification;
  panNumberEdit.innerText=panNumber;
  localStorage.setItem("person",JSON.stringify(personDetailsArray));
 

  addButton.innerText='Add';
}









addButton.addEventListener("click", addDetails);

tableDisplayInfo.addEventListener("click",(e)=>{
    if(e.target.classList.contains('delete')){
        deletePersonDetails(e);
    }
    else if(e.target.classList.contains('edit')){
      editPersonDetails(e);
    }
})

formDetails.addEventListener('click', (e)=>{
  if(e.target.classList.contains("sort")){
    sortingByName(e);
  }
})

searchPanNumber.addEventListener('keyup',(e)=>{
e.preventDefault();
tableDisplayInfo.innerHTML="";

const input=searchPanNumber.value;
console.log(input)

let filter=personDetailsArray.filter((val)=>val.panNumber.includes(input));
console.log(filter)

filter.map((val)=>{
  displayPersonInformation(val);
})




})

$('input[type=search]').on('search', function () {
  // search logic here
  // this function will be executed on click of X (clear button)
  tableDisplayInfo.innerHTML="";
  personDetailsArray.map((obj)=>{
    displayPersonInformation(obj);
  })
});




