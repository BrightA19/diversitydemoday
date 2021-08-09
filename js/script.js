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



const cvs = document.querySelector("#cvs_effects");
const ctx = cvs.getContext("2d");

function resizeCanvas() {
    cvs.width = innerWidth;
    cvs.height = innerHeight;
}

window.onresize = resizeCanvas
resizeCanvas();

const FRAMES_PER_SECOND = 20;
const ADD_CIRCLE_DELAY = 500;

let timeSinceNewCircle = Date.now();
let circles = [];

class Circle {
    constructor() {
        this.size = 2 + Math.random() * 18;
    
        this.x = Math.random() * cvs.width;
        this.y = cvs.height + this.size;
        this.speed = 10 - (this.size/20) * 8;
        this.delete = false;
    }

    update() {
        this.y -= this.speed;
        
        if (this.y < -this.size) {
            this.delete = true;
        }
    }

    render() {
        ctx.fillStyle = "rgba(249, 236, 255, 0.3)";

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

setInterval(() => {
    let now = Date.now();
    if (now - timeSinceNewCircle > ADD_CIRCLE_DELAY && circles.length < 40) {
        circles.push(new Circle());
        timeSinceNewCircle = now;
    }


    ctx.clearRect(0, 0, cvs.width, cvs.height);

    for (let i = circles.length - 1; i >= 0; i--) {
        let circle = circles[i];
        circle.update();

        if (circle.delete) {
            circles.splice(i, 1);
        }
        else {
            circle.render();
        }
    }

}, 1000 / FRAMES_PER_SECOND);
