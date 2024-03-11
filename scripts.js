function closeWindow(id) {
    var window = document.getElementById('window-' + id);
    window.style.display = 'none';

    // Find the associated taskbar item and remove the active class and hide the text
    var taskbarItem = document.querySelector('.taskbar-item[data-window="' + id + '"]');
    if (taskbarItem) {
        taskbarItem.classList.remove('active');
        taskbarItem.querySelector('.taskbar-text').style.display = 'none';
    }
}

function minimizeWindow(id) {
    // Hier zou je functionaliteit kunnen toevoegen om een venster te minimaliseren.
    alert('Minimaliseren is nog niet geïmplementeerd.');
}

function toggleStartMenu() {
    var startMenu = document.getElementById('start-menu');
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
}

// De rest van je JavaScript functies...

// Nieuwe code om het startmenu te verbergen wanneer er ergens anders op de pagina wordt geklikt
document.getElementById('desktop').addEventListener('click', function(e) {
    if (!e.target.matches('#start-button')) {
        document.getElementById('start-menu').style.display = 'none';
    }
});

// Functie om het slepen te initialiseren
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    if (element.querySelector("*[id$='-header']")) {
        // If there's a header, attach the mousedown event to it
        element.querySelector("*[id$='-header']").onmousedown = dragMouseDown;
    } else {
        // Otherwise, attach it to the whole element
        element.onmousedown = dragMouseDown;
    }
}

    
    // Initialize the drag for each window
    document.querySelectorAll('.window').forEach(function(win) {
        dragElement(win);
    });

// Pseudo-code for snapping windows
function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    var newTop = element.offsetTop - pos2;
    var newLeft = element.offsetLeft - pos1;

    // Try snapping to other windows
    var otherWindows = document.querySelectorAll('.window:not(#' + element.id + ')');
    otherWindows.forEach(function(win) {
        if (isClose(newLeft, win.offsetLeft) && isClose(newTop, win.offsetTop)) {
            // Snap the element
            newTop = win.offsetTop;
            newLeft = win.offsetLeft;
        }
    });

    element.style.top = newTop + "px";
    element.style.left = newLeft + "px";
}

function isClose(coord1, coord2) {
    var snappingDistance = 10; // pixels within which snapping should occur
    return Math.abs(coord1 - coord2) < snappingDistance;
}

// Call this function during initialization to make all windows draggable
document.querySelectorAll('.window').forEach(function(win) {
    dragElement(win);
});


    function closeDragElement() {
        // stop het slepen wanneer de muis knop losgelaten wordt
        document.onmouseup = null;
        document.onmousemove = null;
    }


// Activeer de drag-functie voor het venster
dragElement(document.getElementById("window-my-computer"));
dragElement(document.getElementById("window-edge")); // Add this line

function openWindow(id) {
    var window = document.getElementById('window-' + id);
    var taskbarItem = document.querySelector('.taskbar-item[data-window="' + id + '"]');
    var taskbarText = taskbarItem.querySelector('.taskbar-text');

    // Only toggle the clicked window, do not close others
    if (window.style.display === 'block') {
        // If the window is already open, close it
        window.style.display = 'none';
        taskbarItem.classList.remove('active');
        taskbarText.style.display = 'none';
    } else {
        // If the window is closed, open it and mark it as active
        window.style.display = 'block';
        window.style.zIndex = highestZIndex++;

        // Calculate random positions within the bounds of #desktop
        var desktopArea = document.getElementById('desktop');
        var maxX = desktopArea.clientWidth - window.offsetWidth;
        var maxY = desktopArea.clientHeight - window.offsetHeight;

        var randomX = Math.floor(Math.random() * maxX);
        var randomY = Math.floor(Math.random() * maxY);

        window.style.left = randomX + 'px';
        window.style.top = randomY + 'px';

        taskbarItem.classList.add('active');
        taskbarText.style.display = 'inline'; // Show the text for the active icon
    }
}

// Adjust closeWindow function as well
function closeWindow(id) {
    var window = document.getElementById('window-' + id);
    var taskbarItem = document.querySelector('.taskbar-item[data-window="' + id + '"]');
    var taskbarText = taskbarItem.querySelector('.taskbar-text');

    // Close the window and revert its taskbar item to non-active
    window.style.display = 'none';
    taskbarItem.classList.remove('active');
    taskbarText.style.display = 'none'; // Hide the text for the non-active icon
}


// Wait for the full page to load
document.addEventListener('DOMContentLoaded', function() {
    // Simulate the progress bar loading
    document.getElementById('progress-bar').style.width = '100%';
    
    // After 1 second, hide the preloader
    setTimeout(function() {
        document.getElementById('preloader').style.display = 'none';
    }, 1000);
});


window.addEventListener('load', function() {
    // Simulate the progress bar loading
    document.querySelector('.progress-bar').style.width = '100%';
    
    // After 1 second, hide the preloader
    setTimeout(function() {
        document.getElementById('preloader').style.display = 'none';
    }, 1000);

    document.body.classList.add('page-loaded');
});


let highestZIndex = 10; // Startwaarde voor z-index, verhoog deze elke keer wanneer een venster wordt geopend.

document.querySelector('.progress-bar').style.width = '100%';

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    // Zorg voor een 0 voor eenheden lager dan 10
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var timeString = hours + ':' + minutes + ':' + seconds;
    document.getElementById('clock').textContent = timeString;
}

// Update de klok elke seconde
setInterval(updateClock, 1000);

// Initialiseer de klok onmiddellijk
updateClock();


function toggleFullscreen(id) {
    var elem = document.getElementById('window-' + id);
    
    // Check if the window is already maximized
    if (elem.classList.contains('maximized')) {
        // Restore to previous size
        elem.style.width = '';
        elem.style.height = '';
        elem.style.top = '';
        elem.style.left = '';
        elem.classList.remove('maximized');
    } else {
        // Maximize the window
        elem.style.width = '100vw';
        elem.style.height = '100vh';
        elem.style.top = '0';
        elem.style.left = '0';
        elem.classList.add('maximized');
    }
}

