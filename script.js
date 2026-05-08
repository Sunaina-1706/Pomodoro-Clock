let min = document.getElementById("min")
let sec = document.getElementById("sec")
let session_time = 0, break_time = 0,counter = 1 ,milisecs = 0, seconds = 0, minute = 0
let isworking = false,startID,stopID,resetID;
const totalTime = 0; 
document.getElementById("splus").addEventListener('click',()=>{
if(session_time<60){ session_time++; }
else{session_time = 0;}  updateSession();
})
document.getElementById("sminus").addEventListener('click',()=>{
if(session_time>0){session_time--;  }
    updateSession();
})
const updateBreak = () => {
    document.getElementById("break-time").innerText = `${break_time.toString().padStart(2, '0')} min`;
};
const updateSession = () =>{
document.getElementById("time").innerText = session_time.toString().padStart(2, '0')+" min";
}
document.getElementById("plusb").addEventListener('click', () => {
if(break_time < 60){break_time++;}
else{break_time = 0;}
    updateBreak();
});
document.getElementById("minusb").addEventListener('click', () => {
    if (break_time > 0) {
        break_time--;
        updateBreak();
    }
});
function displayweb(){

sec.innerText = seconds.toString().padStart(2, '0');
min.innerText = minute.toString().padStart(2, '0');
}
function drift(limit) {
    return new Promise((resolve) => {
        
        seconds = 0; minute = 0;
        displayweb();

        startID = setInterval(() => {
            milisecs++;
            if (milisecs >= 100) { milisecs = 0; seconds++; }
            if (seconds >= 60) { seconds = 0; minute++; }
            if (minute >= 60) { minute = 0; }
            
            displayweb();

            if (minute >= limit) {
                clearInterval(startID);
                resolve(); 
            }
        }, 1);
    });
}
function start_off(){
document.getElementById("start").style.display = "none";
document.getElementById("pause").style.display = "inline";
}
function pause_off(){
document.getElementById("pause").style.display = "none";
document.getElementById("start").style.display = "inline";
document.getElementById("start").innerText = "Start"
}
document.getElementById("start").addEventListener("click", () => {
    if(session_time === 0) {return alert("Set work time!")}
    Switch_sessions(); 
start_off();
document.querySelectorAll(".plus").forEach(button => button.disabled = true);
document.querySelectorAll(".minus").forEach(button => button.disabled = true);
});
document.getElementById("pause").addEventListener("click",()=>{
    pause_off();
    isworking = false;
    clearInterval(startID);
});
document.getElementById("reset").addEventListener("click",()=>{
pause_off();
document.body.style.backgroundColor = "white"; 
resetting()
clearInterval(startID);
isworking = false;
 seconds = 0, minute = 0
min.innerText = "00";
sec.innerText = "00";
counter = 1;
})
function resetting(){
document.querySelectorAll(".plus").forEach(button => button.disabled = false);
document.querySelectorAll(".minus").forEach(button => button.disabled = false);
document.getElementById("manage").innerText = "👜🍵";

break_time = 0;
session_time = 0;
document.getElementById("time").innerText = "00 min";
document.getElementById("break-time").innerText = "00 min";
}

async function Switch_sessions() {
    isworking = true;
    start_off();
    while (isworking) {
        document.getElementById("manage").innerText = `Session ${counter}`;
        await drift(session_time); 
        counter++;
        console.log(counter);
        if (!isworking){counter = 0; break;} 
        document.getElementById("manage").innerText = "Break Time!";

        if (break_time > 0) {
            await drift(break_time);
            if (!isworking) break; 
        } else {
            break; 
        }
    }
}