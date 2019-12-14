'use strict';

const monthsLeft = document.getElementById('monthsLeft');
const daysLeft = document.getElementById('daysLeft');
const hoursLeft = document.getElementById('hoursLeft');



const INTERVAL = 10;
const date = new Date(/*"December 30, 2019 23:59:56"*/);
const newYearDate = new Date(date.getFullYear(), 12, 31, 23, 59, 59, 59);
const dateBeforeNewYear = new Date();
dateBeforeNewYear.setTime(newYearDate - date);


let intervalId = null;
monthsLeft.onclick = startTimer;

function startTimer() {
    if (!intervalId) {
        date.setMonth(dateBeforeNewYear.getMonth() - 1, dateBeforeNewYear.getDate());
        date.setHours(dateBeforeNewYear.getHours() - 3, dateBeforeNewYear.getMinutes(), dateBeforeNewYear.getSeconds(), dateBeforeNewYear.getMilliseconds());
        //why do we subtract 1 and 3?
        refreshTimerValue();
        intervalId = setInterval(incrementDateSeconds, INTERVAL);
    }
}

monthsLeft.click();

window.addEventListener('focus', function () {
    window.location.reload(); // temporary solve clicking on other page problem
});

function incrementDateSeconds() {
    date.setMilliseconds(date.getMilliseconds() - INTERVAL);
    refreshTimerValue();
}

function refreshTimerValue() {
    if (date.getMonth() > 0) {
        monthsLeft.innerText = `${date.getMonth()} месяцев`;
    } else {
        monthsLeft.style.display= "none";
    }


    if (date.getDate() > 1) {

        daysLeft.innerText = `${date.getDate() - 1} дней`
    } else if (date.getMonth() > 0 ) {
        daysLeft.innerText = `${date.getDate() - 1} дней`
    } else {
        daysLeft.style.display= "none";
    }

    hoursLeft.innerText = `${formatTwoDigits(date.getHours())}:${formatTwoDigits(date.getMinutes())}:${formatTwoDigits(date.getSeconds())} `;
}

function formatTwoDigits(value) {
    return value < 10 ? `0${value}` : value;
}


/*###############################################*/

// Количество снежинок на странице (Ставьте в границах 30-40, больше не рекомендую)
let snowmax = 40;

// Установите цвет снега, добавьте столько цветов сколько пожелаете
let snowcolor = ["#AAAACC", "#DDDDFF", "#CCCCDD", "#F3F3F3", "#F0FFFF", "#FFFFFF", "#EFF5FF"]

// Поставьте шрифты из которых будет создана снежинка ставьте столько шрифтом сколько хотите
let snowtype = ["Arial Black", "Arial Narrow", "Times", "Comic Sans MS"];

// Символ из какого будут сделаны снежинки
let snowletter = "❆";
let snowletter2 = "❅";
let snowletter3 = "❉";
let snowletter4 = "❄";


// Скорость падения снега (рекомендую в границах от 0.3 до 2)
let sinkspeed = 0.7;

// Максимальный размер снежинки
let snowmaxsize = 32;

// Установите минимальный размер снежинки
let snowminsize = 8;

// Устанавливаем положение снега
// Впишите 1 чтобы снег был по всему сайту, 2 только слева
// 3 только по центру, 4 снег справа
let snowingzone = 1;


let snow = [];
let marginbottom;
let marginright;
let timer;
let i_snow = 0;
let x_mv = [];
let crds = [];
let lftrght = [];
let browserinfos = navigator.userAgent;
let ie5 = document.all && document.getElementById && !browserinfos.match(/Opera/);
let ns6 = document.getElementById && !document.all;
let opera = browserinfos.match(/Opera/);
let browserok = ie5 || ns6 || opera;

function randommaker(range) {
    const rand = Math.floor(range * Math.random());
    return rand;
}

function initsnow() {
    if (ie5 || opera) {
        marginbottom = document.body.clientHeight;
        marginright = document.body.clientWidth;
    } else if (ns6) {
        marginbottom = window.innerHeight;
        marginright = window.innerWidth;
    }
    var snowsizerange = snowmaxsize - snowminsize;
    for (let i = 0; i <= snowmax; i++) {
        crds[i] = 0;
        lftrght[i] = Math.random() * 15;
        x_mv[i] = 0.03 + Math.random() / 10;
        snow[i] = document.getElementById("s" + i);
        snow[i].style.fontFamily = snowtype[randommaker(snowtype / length)];
        snow[i].size = randommaker(snowsizerange) + snowminsize;
        snow[i].style.fontSize = snow[i].size + "px";
        snow[i].style.color = snowcolor[randommaker(snowcolor.length)];
        snow[i].sink = sinkspeed * snow[i].size / 5;
        if (snowingzone == 1) {
            snow[i].posx = randommaker(marginright - snow[i].size)
        }
        if (snowingzone == 2) {
            snow[i].posx = randommaker(marginright / 2 - snow[i].size)
        }
        if (snowingzone == 3) {
            snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 4
        }
        if (snowingzone == 4) {
            snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 2
        }
        snow[i].posy = randommaker(2 * marginbottom - marginbottom - 2 * snow[i].size);
        snow[i].style.left = snow[i].posx + "px";
        snow[i].style.top = snow[i].posy + "px";
    }
    movesnow();
}

function movesnow() {
    for (let i = 0; i <= snowmax; i++) {
        crds[i] += x_mv[i];
        snow[i].posy += snow[i].sink;
        snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + "px";
        snow[i].style.top = snow[i].posy + "px";
        if (snow[i].posy >= marginbottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginright - 3 * lftrght[i])) {
            if (snowingzone == 1) {
                snow[i].posx = randommaker(marginright - snow[i].size)
            }
            if (snowingzone == 2) {
                snow[i].posx = randommaker(marginright / 2 - snow[i].size)
            }
            if (snowingzone == 3) {
                snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 4
            }
            if (snowingzone == 4) {
                snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 2
            }
            snow[i].posy = 0;
        }
    }
    var timer = setTimeout("movesnow()", 50);
}

for (let i = 0; i <= snowmax; i++) {
    const type = Math.random();


    if (type < 0.25) {
        document.write("<span id='s" + i + "' style='position:absolute;top:-" + snowmaxsize + "px;'>" + snowletter + "</span>")
    } else if (type >= 0.25 && type < 0.5) {
        document.write("<span id='s" + i + "' style='position:absolute;top:-" + snowmaxsize + "px;'>" + snowletter2 + "</span>")
    } else if (type >= 0.5 && type < 0.75) {
        document.write("<span id='s" + i + "' style='position:absolute;top:-" + snowmaxsize + "px;'>" + snowletter3 + "</span>")
    } else {
        document.write("<span id='s" + i + "' style='position:absolute;top:-" + snowmaxsize + "px;'>" + snowletter4 + "</span>")
    }


}
if (browserok) {
    window.onload = initsnow;
}