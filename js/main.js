/*
Här lägger du din JavaScript-kod
*/

"use strict"; 


// Variabler

let addItemEl = document.getElementById("newtodo");
let addItemButtonEl = document.getElementById("newtodobutton");
let errorMessageEl = document.getElementById("message");
let todoListEl = document.getElementById("todolist");
let clearButtonEl = document.getElementById("clearbutton");
let i;


// Händelsehanterare

addItemEl.addEventListener("keyup", checkInput, false);
addItemButtonEl.addEventListener("click", addButtonItem, false);
clearButtonEl.addEventListener("click", clearStorage);
clearButtonEl.addEventListener("click", clearForm);
window.onload = init;


// Start (funktion)
function init() {

    //Inaktivera lägg-till knappen
    addItemButtonEl.disabled = true;

    //Läs in att-göra lista
    loadItems();
}

//kontrollera input (funktion)
function checkInput() {

    let input = addItemEl.value;

    if (input.length > 4) {
        errorMessageEl.innerHTML = "";
        addItemButtonEl.disabled = false;
    } else {
        errorMessageEl.innerHTML = "Måste innehålla minst fem tecken!";
        addItemButtonEl.disabled = true;
    }
}

// Lägga till saker att göra (funktion)
function addButtonItem() {

    let input = addItemEl.value;

    // Skapa nytt element
    let newEl = document.createElement("article");
    let newTextNode = document.createTextNode(input);
    newEl.appendChild(newTextNode);
    newEl.className = "item";

    // Lägga till i listan
    todoListEl.appendChild(newEl);

    // Lägg till en klickhanterare
    newEl.addEventListener("click", function (e) {
        e.target.remove();
    });

    // Raderar input-fält
    addItemEl.value = "";
    addItemButtonEl.disabled = true;

    // Anropa lagring
    saveItems();
}

// Spara saker att göra (funktion)
function saveItems() {

    let items = document.getElementsByClassName("item");
    let tempArr = [];

    // Loopa igenom listan och lagra till temporär array
    for (i = 0; i < items.length; i++) {
        tempArr.push(items[i].innerHTML);
    }

    // Konvertera till JSON-sträng
    let jsonStr = JSON.stringify(tempArr);

    // Lagra i Web Storage
    localStorage.setItem("items", jsonStr);
}


// Läsa in saker att göra (funktion)
function loadItems() {

    // Läs in och konvertera från JSON till array
    let items = JSON.parse(localStorage.getItem("items"));
    console.log(items);

    // Loopa igenom arrayen
    for (i = 0; i < items.length; i++) {

        // Skapa nytt element
        let newEl = document.createElement("article");
        let newTextNode = document.createTextNode(items[i]);
        newEl.appendChild(newTextNode);
        newEl.className = "item";

        // Lägga till i listan
        todoListEl.appendChild(newEl);

        // Lägg till en klickhanterare
        newEl.addEventListener("click", function (e) {
        e.target.remove();

        // Lagra listan
            saveItems();

        });
    }
}

// Raderar lagrade items i localStorage vid knapptryck
function clearStorage() {
    localStorage.clear();
}

// Raderar lagrade items i lista på skärmen vid knapptryck
function clearForm() {
    todoListEl.innerHTML = "";
}