document.getElementById('startButton').addEventListener('click', function() {
    // Initialize the boot sound
    var bootSound = new Audio('boot.mp3');
    // Set the volume to 50%
    bootSound.volume = 0.5;
    // Play the boot sound
    bootSound.play().catch(error => console.error("Audio playback failed:", error));

    // Stop the boot sound after 5 seconds
    setTimeout(() => {
        bootSound.pause(); // Stop playback
        bootSound.currentTime = 0; // Rewind to the start
    }, 5000); // 5 seconds

    const bootScreen = document.getElementById('bootScreen');
    const bootImage = document.getElementById('bootImage');
    // Hide the start button
    document.getElementById('startButton').classList.add('hidden');
    // Show and fade in the boot gif
    bootImage.classList.remove('hidden');
    bootImage.classList.add('bootFadeIn');

    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
        document.documentElement.msRequestFullscreen();
    }

    // Assuming your GIF plays for around 5 seconds before fading out
    setTimeout(() => {
        // Play the start.mp3 sound right before the fade-out begins
        var startSound = new Audio('start.mp3');
        startSound.volume = 0.3; // Optionally set the volume of startSound as well
        startSound.play().catch(error => console.error("Audio playback failed:", error));

        // Apply fade out to the entire boot screen
        bootScreen.classList.add('bootFadeOut');

        // After the fade out animation completes, optionally hide the boot screen or display main content
        setTimeout(() => {
            bootScreen.style.display = 'none';
            // Optionally, reveal the main content. For example:
            // document.getElementById('desktop').classList.remove('hidden');
        },  ); // Matches the duration of the fadeOut animation
    }, 5000 ); // Adjust as needed to match the duration of your GIF
}, 5000 );

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
    var window = document.getElementById('window-' + id);
    var taskbarItem = document.querySelector('.taskbar-item[data-window="' + id + '"]');

    window.classList.add('minimizing');

    setTimeout(function() {
        window.style.display = 'none';
        window.classList.remove('minimizing');
        window.classList.add('minimized');
    }); // This duration should match the CSS animation duration

    // Keep the taskbar item active but don't show the window
    taskbarItem.classList.add('active');
}

document.querySelectorAll('.maximize-button').forEach(button => {
    button.addEventListener('click', function() {
        var window = button.closest('.window');
        window.classList.toggle('full-page');
    });
});


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

function isMobileDevice() {
    return window.innerWidth <= 600;
};

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // If the device is a mobile device, position the window at the top left
    if(isMobileDevice()) {
        element.style.top = '0px';
        element.style.left = '0px';

    } else {
        // If the device is not a mobile device, randomize the window placement
        element.style.top = Math.random() * window.innerHeight + 'px';
        element.style.left = Math.random() * window.innerWidth + 'px';
    }

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
    var windowElement = document.getElementById('window-' + id);
    var taskbarItem = document.querySelector('.taskbar-item[data-window="' + id + '"]');
    var taskbarText = taskbarItem.querySelector('.taskbar-text');

    if (windowElement.classList.contains('closing')) {
        windowElement.classList.remove('closing');
    }
    windowElement.classList.add('opening');

    if (windowElement.style.display === 'block') {
        windowElement.style.display = 'none';
        taskbarItem.classList.remove('active');
        taskbarText.style.display = 'none';
    } else {
        // Show the window and ensure it is positioned in the center
        windowElement.style.display = 'block';
        windowElement.style.zIndex = highestZIndex++;

        // Calculate and set the centered position
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;
        var windowWidth = windowElement.offsetWidth;
        var windowHeight = windowElement.offsetHeight;

        // Prevent the window from moving outside the screen
        var left = Math.max((viewportWidth - windowWidth) / 2, 0);
        var top = Math.max((viewportHeight - windowHeight) / 2, 0);

        windowElement.style.left = left + 'px';
        windowElement.style.top = top + 'px';

        // Determine Clippy's message based on the window ID
        var message;
        switch (id) {
            case 'my-computer':
                message = "Over mij";
                break;
            case 'edge':
                message = "Ah, Minesweeper! suc7";
                break;
            case 'msn':
                message = "Hier kan je mij contacteren";
                break;
            case 'documents':
                message = "Een deel van mijn banen die ik gehad heb";
                break;
            case 'music':
                message = "Mijn intresses en hobbys";
                break;
            case 'star':
                message = "Dit zijn website die ik door de jaren heb gemaakt heb, klik er op!";
                break;
            case 'mspaint':
                message = "hallo, hier kan je tekenen, weet wel. iedereen kan dit zien.";
                break;
        }

        // Update and show Clippy's message
        showClippy(message);

        taskbarItem.classList.add('active');
        taskbarText.style.display = 'inline'; // Show the text for the active icon
    }
}


function showClippy(message) {
    var clippy = document.getElementById('clippy-assistant');
    var clippyMessage = document.getElementById('clippy-message');
  
    clippyMessage.textContent = message;
    clippy.style.display = 'block'; // Clippy becomes visible
    clippy.classList.remove('fade-out'); // Remove fade-out class if present
}

function hideClippy() {
    var clippy = document.getElementById('clippy-assistant');
    clippy.classList.add('fade-out');
    setTimeout(() => {
        clippy.style.display = 'none';
    }, 1000); // Match the duration of the fade-out animation
}

  // Example usage
// Get the current hour
var currentHour = new Date().getHours();

// Determine the greeting based on the current time
var greeting;
if (currentHour < 12) {
    greeting = "Goedemorgen";
} else if (currentHour < 18) {
    greeting = "Goedenmiddag";
} else {
    greeting = "Goedeavond";
}

// Show the greeting
showClippy(greeting + ", Ik ben Clippy, welkom op Hugo zijn website");
  

// Adjust closeWindow function as well
function closeWindow(id) {
    var window = document.getElementById('window-' + id);
    var taskbarItem = document.querySelector('.taskbar-item[data-window="' + id + '"]');
    var taskbarText = taskbarItem.querySelector('.taskbar-text');
    window.classList.add('closing');

    // Update the taskbar item to reflect that the window is not active anymore
    taskbarItem.classList.remove('active');
    taskbarText.style.display = 'none'; // Hide the text for the non-active icon

    setTimeout(function() {
        // Wait for the closing animation to finish before hiding the window
        window.style.display = 'none';
        // Additionally, hide Clippy's assistant when a window is closed
        document.getElementById('clippy-assistant').style.display = 'none';
    }, 200); // This duration should match your CSS animation duration for the closing effect
}


document.addEventListener('DOMContentLoaded', function() {
    dragElement(document.getElementById("window-mspaint"));
});

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

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    // Ensure leading 0 for units less than 10
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var timeString = hours + ':' + minutes + ':' + seconds;
    // console.log(timeString); // Debug: Check the generated time string
    document.getElementById('clock').textContent = timeString;
}

// Update de klok elke seconde
setInterval(updateClock, 1000);

// Initialiseer de klok onmiddellijk
updateClock();



let highestZIndex = 10; // Startwaarde voor z-index, verhoog deze elke keer wanneer een venster wordt geopend.

document.querySelector('.progress-bar').style.width = '100%';

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


