

const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");
const bookingDate = document.getElementById("booking-date");
const errorMessage = document.getElementById("error-message");


const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : "";
    datesHtml += `<li${className}>${i}</li>`;
  }

  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
}

function showError() {
  errorMessage.textContent = "Selected date cannot be on or before today's date";
  errorMessage.style.display = "block";
}

function hideError() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}


navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }
    

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
});

function updateEndTime() {
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time");
  
  // Convert start time to Date object
  const startDate = new Date();
  const [startHour, startMinute] = startTime.split(":");
  startDate.setHours(startHour, startMinute);
  
  // Calculate end time
  const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // Add 2 hours
  
  // Format end time as string
  const endHour = String(endDate.getHours()).padStart(2, "0");
  const endMinute = String(endDate.getMinutes()).padStart(2, "0");
  const endTimeString = `${endHour}:${endMinute}`;
  
  // Update end time field
  endTime.value = endTimeString;
}


renderCalendar();

function toggleModal() {
  const modal = document.getElementById("calendar-popup");
  const body = document.body;

  if (modal.style.display === "flex") {
    modal.style.display = "none";
    body.classList.remove("open");
  } else {
    modal.style.display = "flex";
    body.classList.add("open");
  }
}

dates.addEventListener("click", (e) => {
  if (e.target.tagName === "LI" && !e.target.classList.contains("inactive")) {
    const selectedDate = e.target.textContent;
    const selectedMonth = months[month];
    const selectedYear = year;
    const formattedDate = `${selectedMonth} ${selectedDate}, ${selectedYear}`;
    
    const currentDate = new Date();
    const selectedDateTime = new Date(`${selectedMonth} ${selectedDate}, ${selectedYear}`);
    
    if (selectedDateTime < currentDate) {
      showError();
    } else {
      bookingDate.textContent = formattedDate;
      toggleModal();
      hideError();
    }
  }
});

document.getElementById("close-popup").addEventListener("click", () => {
  toggleModal();
});

document.querySelector(".calendar-popup").addEventListener("click", (e) => {
  if (e.target === document.querySelector(".calendar-popup")) {
    toggleModal();
  }
});


renderCalendar();