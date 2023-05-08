// -----------variables to target html tags and others--------------------

const addButton = document.getElementById("add_btn");
const nameOfPerson = document.getElementById("name");
const ageOfPerson = document.getElementById("age");
const qualificationOfPerson = document.getElementById("qualification");
const panNumberOfPerson = document.getElementById("pan");
const errorMessage = document.querySelector(".error_msg");
const tableDisplayInfo = document.getElementById('table_body');
const searchPanNumber = document.getElementById('search');

let count=0;
let nameEdit, ageEdit, qualificationEdit, panNumberEdit, idOfEditRow;
let panArray=[];

// ----------parse array for local storage--------------


let personDetailsArray = JSON.parse(localStorage.getItem("person")) ?? [];
// if(!personDetailsArray){
//     personDetailsArray=[];
// }

//nulish

// ---function displayPersonInformation to display table after refreshing also---

personDetailsArray.map((obj)=>{
    displayPersonInformation(obj);
})

// console.log(personDetailsArray)

// ----function to reset all value ------

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

// ----function to display information on our web page-----

function displayPersonInformation(personDetailsObject){
   
    tableDisplayInfo.innerHTML+=`<tr id=${personDetailsObject.id}>
                                    <td>${personDetailsObject.name}</td>
                                    <td>${personDetailsObject.age}</td>
                                    <td>${personDetailsObject.qualification}</td>
                                    <td class="pan">${personDetailsObject.panNumber}</td>
    <td><button class="delete btn">Delete</button><button class="edit btn">Edit</button></td></tr>`
  
}

// -----function to add details from input and all validations---

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
  else if(Number(ageOfPerson.value) >=100 || Number(ageOfPerson.value) <=0 ){
    errorMessage.innerText = "*Please enter age between 0 to 100";
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
    errorMessage.innerText = "*PAN number should have maximum of 10 characters";
    nameOfPerson.classList.remove("border");
    ageOfPerson.classList.remove("border");
    qualificationOfPerson.classList.remove("border");
    panNumberOfPerson.classList.add("border");
    return;
  }
  
  const personDetailsObject = {
    name:nameOfPerson.value,
    age:ageOfPerson.value,
    qualification:qualificationOfPerson.value,
    panNumber:panNumberOfPerson.value,
    id:Date.now()
  }

  personDetailsArray.push(personDetailsObject);

  localStorage.setItem('person', JSON.stringify(personDetailsArray));

  displayPersonInformation(personDetailsObject);


  resetForm();
 
}
else if(addButton.innerText=="Save"){

  saveEditedPersonDetails(e, nameOfPerson.value, ageOfPerson.value, qualificationOfPerson.value, panNumberOfPerson.value);

}
}

//----function to delete row from table----

function deletePersonDetails(e){
 
  personDetailsArray.forEach((val,index)=>{

    console.log(e)
    var path = e.path || (e.composedPath && e.composedPath());
      if(val.id===parseInt(path[2].id)){
        let confirm = window.confirm("Are you sure you want to delete this??")
        if(confirm){
          personDetailsArray.splice(index,1); 
          path[2].remove();  
        }
      }
      
  })
  
  
  localStorage.setItem("person", JSON.stringify(personDetailsArray));
}

//---function to sort by name in table----

function sortingByName(e){
  e.preventDefault();
  tableDisplayInfo.innerHTML="";
  if(e.target.innerHTML=="A-Z"){
 
   
  personDetailsArray.sort((a,b)=>{
    if ( a.name < b.name ){
      return 1;
    }
    if ( a.name > b.name ){
      return -1;
    }
    return 0;
  });
}

  if(e.target.innerHTML=="Z-A"){
    personDetailsArray.sort((a,b)=>{
      if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
    });


}
//optimised sort 

personDetailsArray.map((val)=>{
  displayPersonInformation(val)
})
   
  }

  //---this function is called when user wants to edit something----

  function editPersonDetails(e){
    var path = e.path || (e.composedPath && e.composedPath());

     nameEdit = path[2].firstElementChild;
      ageEdit = nameEdit.nextElementSibling;
      qualificationEdit = ageEdit.nextElementSibling;
      panNumberEdit = qualificationEdit.nextElementSibling;
      idOfEditRow= path[2].id;
   

    nameOfPerson.value = nameEdit.innerText;
    ageOfPerson.value = ageEdit.innerText;
    qualificationOfPerson.value = qualificationEdit.innerText;
    panNumberOfPerson.value = panNumberEdit.innerText;

     addButton.innerText="Save";

   
    
}

//---this function is called when user press save button after editing things---

function saveEditedPersonDetails(e,name,age,qualification,panNumber){
  e.preventDefault();

  console.log(personDetailsArray)
 
  personDetailsArray.map((val)=>{

  
      if(val.id==idOfEditRow){
      // val.task=formInput.value;
        //  console.log("hellllllo")
       val.name=nameOfPerson.value;
       val.age=ageOfPerson.value;
       val.qualification=qualificationOfPerson.value;
       val.panNumber=panNumberOfPerson.value;
       
      }
    
       })

  nameEdit.innerText=name;
  ageEdit.innerText=age;
  qualificationEdit.innerText=qualification;
  panNumberEdit.innerText=panNumber;
  localStorage.setItem("person",JSON.stringify(personDetailsArray));
 

  addButton.innerText='Add';
  resetForm();
}

//---search function by pan number----


function searchByPanNumber(e){
  e.preventDefault();
tableDisplayInfo.innerHTML="";

const searchValue = searchPanNumber.value;
//console.log(input)

let searchResult = personDetailsArray.filter((val)=>{
  if(val.panNumber.includes(searchValue)){
    
    return val;
  }

});
//console.log(searchResult)addButton
if(searchResult.length!==0){
searchResult.map((val)=>{
  displayPersonInformation(val);
})
}else{
  tableDisplayInfo.innerHTML="No Data Found!!"

  if(tableDisplayInfo.innerHTML=="No Data Found!!"){
    tableDisplayInfo.classList.add("no_data_color");
  }else{
    tableDisplayInfo.classList.remove("no_data_color");
  }
  
}


// $('input[type=search]').on('search', function () {
//   // search logic here
//   // this function will be executed on click of X (clear button)
//   tableDisplayInfo.innerHTML="";
//   personDetailsArray.map((obj)=>{
//     displayPersonInformation(obj);
//   })
// });

document.querySelector('input[type=search]').addEventListener('search', ()=>{

    tableDisplayInfo.innerHTML="";
  personDetailsArray.map((obj)=>{
    displayPersonInformation(obj);
  })

})

}

//---when user clicks on add button and Save button. (save buton will appear when user clicks on edit)---



addButton.addEventListener("click", addDetails);


//--when user clicks on edit or delete---

tableDisplayInfo.addEventListener("click",(e)=>{
    if(e.target.classList.contains('delete')){
        deletePersonDetails(e);
    }
    else if(e.target.classList.contains('edit')){
        editPersonDetails(e);
    }
})

//---when user clicks on sort by A-Z or Z-A button---

formDetails.addEventListener('click', (e)=>{
  if(e.target.classList.contains("sort")){
    sortingByName(e);
  }
})

//when user search something in input 
searchPanNumber.addEventListener('input',searchByPanNumber)









