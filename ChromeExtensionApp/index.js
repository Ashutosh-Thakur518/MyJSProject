// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js"
import { getDatabase, 
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-22e1d-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceRTDB = ref(database, "leads")

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

function renderData(leads) {
    let listItems = ""
    for (const element of leads) {
        listItems += `
            <li>
                <a target='_blank' href='${element}'>
                    ${element}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}

onValue(referenceRTDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if(snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        renderData(leads)
    }
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceRTDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceRTDB, inputEl.value)
    inputEl.value = ""
})