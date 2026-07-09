let curDate = new Date();
let pickedDay = "";

let savedNotes = JSON.parse(localStorage.getItem('calendarNotes')) || {};

const topTitle = document.getElementById("topTitle");
const dayBox = document.getElementById("dayBox");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const notesBox = document.getElementById("notesBox");

const backBtn = document.getElementById("backBtn");
const fwdBtn = document.getElementById("fwdBtn");
const keepBtn = document.getElementById("keepBtn");
const closeBtn = document.getElementById("closeBtn");
const delBtn = document.getElementById("delBtn");

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function drawCalendar() {
    const year = curDate.getFullYear();
    const month = curDate.getMonth();

    topTitle.textContent = months[month] + " " + year;

    dayBox.innerHTML = "";

    const startGap = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startGap; i++) {
        const blank = document.createElement("div");
        blank.classList.add("day-cell", "empty");
        dayBox.appendChild(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("div");
        cell.classList.add("day-cell");

        const key = year + "-" + String(month + 1).padStart(2, '0') + "-" + String(day).padStart(2, '0');

        cell.innerHTML = '<span class="day-number">' + day + '</span><div class="note-dot"></div>';

        if (savedNotes[key]) {
            cell.classList.add("has-note");
        }

        cell.addEventListener("click", function() {
            showPopup(key, day, months[month], year);
        });

        dayBox.appendChild(cell);
    }
}

function showPopup(key, day, monthName, year) {
    pickedDay = key;
    popupTitle.textContent = monthName + " " + day + ", " + year;

    notesBox.value = savedNotes[key] || "";

    popup.classList.add("active");
    notesBox.focus();
}

function hidePopup() {
    popup.classList.remove("active");
    pickedDay = "";
    notesBox.value = "";
}

backBtn.addEventListener("click", function() {
    curDate.setMonth(curDate.getMonth() - 1);
    drawCalendar();
});

fwdBtn.addEventListener("click", function() {
    curDate.setMonth(curDate.getMonth() + 1);
    drawCalendar();
});

closeBtn.addEventListener("click", hidePopup);

keepBtn.addEventListener("click", function() {
    const text = notesBox.value.trim();

    if (text) {
        savedNotes[pickedDay] = text;
    } else {
        delete savedNotes[pickedDay];
    }

    localStorage.setItem('calendarNotes', JSON.stringify(savedNotes));
    hidePopup();
    drawCalendar();
});

delBtn.addEventListener("click", function() {
    delete savedNotes[pickedDay];
    localStorage.setItem('calendarNotes', JSON.stringify(savedNotes));
    hidePopup();
    drawCalendar();
});

drawCalendar();

