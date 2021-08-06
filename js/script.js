const Months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
];
const Days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]
const Endings = [
    "", "st", "nd", "rd", "th"
];

function getEnding(day) {
    return day > 3 ? Endings[4] : Endings[day];
}

function getCountdown(time) {
    if (time < -eventDuration) {
        return "The event is over!";
    }
    else if (time <= 0 && time >= -eventDuration) {
        return "The event is happening right now!";
    }
    else {
        let str = "";

        const days = Math.floor(time / (24*60*60*1000)) % 365;
        if (days > 0) {
            str += `${days} ${days === 1 ? "day" : "days"} `;
        }

        const hours = Math.floor(time / (60*60*1000)) % 24;
        if (hours > 0) {
            str += `${hours} ${hours === 1 ? "hour" : "hours"} `;
        }

        const minutes = Math.floor(time / (60*1000)) % 60;
        str += `${minutes} ${minutes === 1 ? "minute" : "minutes"} `;

        const seconds = Math.floor(time / 1000) % 60;
        str += `${seconds} ${seconds === 1 ? "second" : "seconds"}`;

        return str;
    }
}

const eventStartDate = new Date("2021-08-17T16:00:00Z");
const eventEndDate = new Date("2021-08-17T17:00:00Z");
const eventDuration = eventEndDate - eventStartDate;


const dateElem = document.querySelector("#date");
const countdownElem = document.querySelector("#countdown");

dateElem.innerHTML = `${Days[eventStartDate.getDay()]}, ${Months[eventStartDate.getMonth()]} ${eventStartDate.getDate()}${getEnding(eventStartDate.getDate())}, ${eventStartDate.getFullYear()}<br>${eventStartDate.toLocaleTimeString()}`;

let countdown = eventStartDate - new Date();

countdownElem.innerText = getCountdown(countdown);
setInterval(() => {
    countdown -= 1000;
    countdownElem.innerText = getCountdown(countdown);
}, 1000);

// Fix countdown if user navigates elsewhere
window.onfocus = () => countdown = eventStartDate - new Date();
