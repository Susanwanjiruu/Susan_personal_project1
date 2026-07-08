
let currentDate = new Date();
let selectedDateKey = ""; 


let notesStorage = JSON.parse(localStorage.getItem('calendarNotes')) || {};


const monthYearTitle = document.getElementById("monthYearTitle");
const daysGrid = document.getElementById("daysGrid");
const calendarDisplay = document.getElementById("calendar_display");
const modalDateTitle = document.getElementById("modalDateTitle");
const noteInput = document.getElementById("noteInput");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const deleteBtn = document.getElementById("deleteBtn");

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];


function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

   
    monthYearTitle.textContent = months[month] + " " + year;

    
    daysGrid.innerHTML = "";

    
    const firstDayIndex = new Date(year, month, 1).getDay();
    
   
    const totalDays = new Date(year, month + 1, 0).getDate();

   
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("day-cell", "empty");
        daysGrid.appendChild(emptyCell);
    }

  
    for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement("div");
        cell.classList.add("day-cell");

       
        const dateKey = year + "-" + String(month + 1).padStart(2, '0') + "-" + String(day).padStart(2, '0');
        
      
        cell.innerHTML = '<span class="day-number">' + day + '</span><div class="note-dot"></div>';

       
        if (notesStorage[dateKey]) {
            cell.classList.add("has-note");
        }

        cell.addEventListener("click", function() {
            openPlannerModal(dateKey, day, months[month], year);
        });

        daysGrid.appendChild(cell);
    }
}


function openPlannerModal(dateKey, day, monthName, year) {
    selectedDateKey = dateKey;
    modalDateTitle.textContent = monthName + " " + day + ", " + year;
    
  
    noteInput.value = notesStorage[dateKey] || "";
    
    
    calendarDisplay.classList.add("active");
    noteInput.focus();
}


function closeModal() {
    calendarDisplay.classList.remove("active");
    selectedDateKey = "";
    noteInput.value = "";
}


prevBtn.addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

cancelBtn.addEventListener("click", closeModal);


saveBtn.addEventListener("click", function() {
    const trimmedNote = noteInput.value.trim();
    
    if (trimmedNote) {
        notesStorage[selectedDateKey] = trimmedNote;
    } else {
        delete notesStorage[selectedDateKey];
    }
    
  
    localStorage.setItem('calendarNotes', JSON.stringify(notesStorage));
    closeModal();
    renderCalendar();
});


deleteBtn.addEventListener("click", function() {
    delete notesStorage[selectedDateKey];
    localStorage.setItem('calendarNotes', JSON.stringify(notesStorage));
    closeModal();
    renderCalendar();
});


renderCalendar();

