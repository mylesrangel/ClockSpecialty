console.log("in repair clock");

//get the height of the main selector
var mainContentHeight = document.querySelector("main").offsetHeight;

var spacer = document.querySelector('#spacer');

spacer.style.min-height = mainContentHeight;