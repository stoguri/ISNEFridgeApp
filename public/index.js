'use strict'

document.getElementById('DropdownButton').addEventListener('click', showDropDown);
document.getElementById('recent').addEventListener('click', sortRecent);
document .getElementById('alphabetical').addEventListener('click', sortAlphabetical);
document.getElementById('quantity').addEventListener('click', sortQuantity);
window.addEventListener('load', sortAlphabetical);


/*toggle between hiding and showing the dropdown content */
function showDropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


//async functions to make GET requests to server for sorted copies of the array.
async function sortQuantity() {
  try {
    let url = '/indexQuantity';
    const response = await fetch(url);
    if (!response.ok) throw response;
    const data = await response.json()
    putListInPage(data);
  } catch (e) {
    console.error('error getting contents of fridge', e);
  }
}

async function sortRecent() {
  try {
    let url = '/indexRecent';
    const response = await fetch(url);
    if (!response.ok) throw response;
    const data = await response.json()
    putListInPage(data);
  } catch(e) {
    console.error('error getting contents of fridge', e);
  }
}

async function sortAlphabetical() {
  try {
    let url = '/indexAlphabetical';
    const response = await fetch(url);
    if (!response.ok) throw response;
    const data = await response.json()
    putListInPage(data);
  } catch(e) {
    console.error('error getting contents of fridge', e);
  }
}

//Deletes old list of food and inserts new list.
function putListInPage(sortedList) {
  //delete old rows in <tbody>
  for (const old of document.querySelectorAll('tr.row')) {
    old.remove();
  }

  //create new rows and inserts them into <tbody>
  for (let i in sortedList) {
    const newRow = document.createElement("tr");
    newRow.classList.add('row');
    const nameCell = document.createElement("td");
    nameCell.textContent = sortedList[i].name ;
    const quantityCell = document.createElement("td");
    quantityCell.textContent = sortedList[i].quantity;
    const expiryCell = document.createElement("td");
    expiryCell.textContent =sortedList[i].expiry;
    newRow.appendChild(nameCell);
    newRow.appendChild(quantityCell);
    newRow.appendChild(expiryCell);
    document.getElementById('tBody').appendChild(newRow);
  }
}
