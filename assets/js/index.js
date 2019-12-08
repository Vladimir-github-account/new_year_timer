'use strict';

const timerValueElem = document.getElementById('timerValue');
const timerStartElem = document.getElementById('start');
const timerStopElem = document.getElementById('stop');
const timerResetElem = document.getElementById('reset');
const INTERVAL = 10;
const date = new Date();
let intervalId = null;
timerStartElem.onclick = function () {
    if (intervalId){
        return;
    }
    intervalId = setInterval(incrementDateSeconds, INTERVAL);
};

timerResetElem.onclick = function () {
    date.setMonth(0,1);
    date.setHours(0,0,0,0);
    refreshTimerValue();
};
timerResetElem.click();

timerStopElem.onclick = function () {
    if (intervalId){
        clearInterval(intervalId);
        intervalId = null;
    }
};

function incrementDateSeconds() {
    date.setMilliseconds( date.getMilliseconds() + INTERVAL );
    refreshTimerValue();
}

function refreshTimerValue() {
    timerValueElem.innerText = `${formatTwoDigits(date.getMonth())} months:${formatTwoDigits(date.getDate())}:${formatTwoDigits(date.getHours())}:${formatTwoDigits(date.getMinutes())}:${formatTwoDigits(date.getSeconds())}:${formatThreeDigits(date.getMilliseconds())}`;
} // if click on other page in browser timer will be stopped until we not return

function formatTwoDigits(value){
    return value < 10 ? `0${value}`: value;
}

function formatThreeDigits(value){
    return value < 100 ? value < 10 ? `00${value}`: `0${value}` : value;
}
