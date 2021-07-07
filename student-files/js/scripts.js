//VARIABLES
const apiUrl = "https://randomuser.me";
const gallery = document.querySelector('#gallery');
const card = document.getElementsByClassName('card');
let page = document.querySelector('body');
let dataResults = [];

 
//***************************************** */
//this is fetching the data from randomuser.me
//***************************************** */
fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(data => displayData(data));


//THIS OPENS THE MODAL WHEN USER CLICKS ON EMPLOYEE
gallery.addEventListener('click', (e)=>{
    if(e.target.id !== 'gallery'){
        let index = e.target.closest('.card').id;
        console.log(index);
        showModal(index);
    }
})

//================================================
//**THIS FUNCTION SHOWS INFO ON THE MODAL
//================================================
function showModal(index){
    //extracts numbers from phone number and gets rid of - ( and)
    let cellNumber = dataResults[index].cell.replace(new RegExp("[()-\\s]", "g"), "");
    //inserts HTML code for the modal
    page.insertAdjacentHTML('beforeend', 
    `
    <div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn close"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${dataResults[index].picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${dataResults[index].name.first} ${dataResults[index].name.last}</h3>
        <p class="modal-text">${dataResults[index].email}</p>
        <p class="modal-text cap">${dataResults[index].location.city}</p>
        <hr>
        <p class="modal-text">(${cellNumber.substr(0,3)}) ${cellNumber.substr(3,3)}-${cellNumber.substr(6,4)}</p>
        <p class="modal-text">${dataResults[index].location.street.number} ${dataResults[index].location.street.name}, ${dataResults[index].location.country}, ${dataResults[index].location.postcode}</p>
        <p class="modal-text">Birthday: ${dataResults[index].dob.date.substr(0,10).replace('-', '/').replace('-', '/')}</p>
    </div>
</div>


<div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
</div>
</div>
    `);

    //add event listener to X button to close modal
    let Xbutton = document.querySelector('.close');
    let modalContainer = document.querySelector('.modal-container');
    
Xbutton.addEventListener('click', ()=>{
    modalContainer.parentNode.removeChild(modalContainer);

})
}






//***************************************** */
//this function displays the data
//***************************************** */
function displayData(data) {
    dataResults = data.results;
    
    //this for loop inserts each employee card to the DOM
    //=======================================

    for (let i = 0; i < data.results.length; i++) {
        console.log(data.results[i]);
        //inserts cards
        gallery.insertAdjacentHTML('beforeend', 
    `
    <div class="card" id="${i}">
        <div class="card-img-container">
            <img class="card-img" src="${data.results[i].picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
            <p class="card-text">${data.results[i].email}</p>
            <p class="card-text cap">${data.results[i].location.city}, ${data.results[i].location.state}</p>
        </div>
    </div>
    `)}
    //End of for loop
    //================
}






