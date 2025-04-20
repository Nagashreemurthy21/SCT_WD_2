let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

function updateDisplay() {
  const time = Date.now() - startTime + elapsedTime;
  const date = new Date(time);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
  document.getElementById("milliseconds").textContent = milliseconds;
}

function startStop() {
  if (!running) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    running = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  document.getElementById("hours").textContent = "00";
  document.getElementById("minutes").textContent = "00";
  document.getElementById("seconds").textContent = "00";
  document.getElementById("milliseconds").textContent = "000";
  document.getElementById("laps").innerHTML = "";
  elapsedTime = 0;
  running = false;
}

function recordLap() {
  if (!running) return;
  const totalElapsed = Date.now() - startTime + elapsedTime;
  const date = new Date(totalElapsed);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  const lapTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;

  const li = document.createElement("li");
  li.className = "list-group-item bg-transparent border-0 text-light";
  li.textContent = `Lap: ${lapTime}`;
  document.getElementById("laps").appendChild(li);
}
