const completeButtons = document.querySelectorAll("button[data-complete]");
const clearTaskButton = document.getElementById("clear-task-button");
const activityList = document.getElementById("activity-list");
const changeThemeButton = document.getElementById("change-theme-button");

document.addEventListener("DOMContentLoaded", () => {
  const currentDate = new Date();

  const formattedDate = currentDate
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .replace(",", "");

  const formattedDayOfTheWeek =
    currentDate.toLocaleDateString("en-US", {
      weekday: "short",
    }) + ",";

  document.getElementById("day-of-the-week").textContent =
    formattedDayOfTheWeek;
  document.getElementById("current-date").textContent = formattedDate;
});

const updateActivity = (button) => {
  const newListElement = document.createElement("li");

  const taskItem = button.closest("li");

  const taskName = taskItem.querySelector("h3").textContent;

  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const formattedDate = formatter.format(new Date()).replace(",", "");

  const innerHtml = `You have completed the task <span class="font-bold"> ${taskName} </span> on ${formattedDate}`;

  newListElement.innerHTML = innerHtml;

  newListElement.classList.add("bg-gray-100", "p-2", "rounded-md");

  activityList.appendChild(newListElement);
};

const formattedTaskCount = (num) => {
  return num < 10 ? "0" + num : num;
};

const updateTaskCount = () => {
  const taskAssignedCount = document.getElementById("task-assigned-count");
  const taskCompletedCount = document.getElementById("test-completed-count");

  const newTaskAssignedCount = parseInt(taskAssignedCount.textContent) - 1;
  const newTaskCompletedCount = parseInt(taskCompletedCount.textContent) + 1;

  taskAssignedCount.textContent = formattedTaskCount(newTaskAssignedCount);
  taskCompletedCount.textContent = formattedTaskCount(newTaskCompletedCount);
};

completeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.getAttribute("data-complete") === "false") {
      button.setAttribute("data-complete", "true");
    }
    window.alert("Board updated successfully!");

    updateActivity(button);
    updateTaskCount();

    const isAllCompleted = Array.from(completeButtons).every(
      (btn) => btn.getAttribute("data-complete") === "true"
    );

    if (isAllCompleted) {
      window.alert(
        "Congratulations!!! You have complete all the current tasks"
      );
    }
  });
});

clearTaskButton.addEventListener("click", () => {
  while (activityList.firstChild) {
    activityList.removeChild(activityList.firstChild);
  }
});

changeThemeButton.addEventListener("click", () => {
  const bgColors = [
    "bg-red-200",
    "bg-orange-200",
    "bg-amber-200",
    "bg-yellow-200",
    "bg-lime-200",
    "bg-green-200",
    "bg-emerald-200",
    "bg-teal-200",
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200",
    "bg-indigo-200",
    "bg-violet-200",
    "bg-purple-200",
    "bg-fuchsia-200",
    "bg-pink-200",
    "bg-rose-200",
    "bg-slate-200",
    "bg-gray-200",
    "bg-zinc-200",
  ];

  document.body.classList.remove(...bgColors);

  const randomIndex = Math.floor(Math.random() * bgColors.length);

  document.body.classList.add(bgColors[randomIndex]);
});

const toggleActivityLog = () => {
  const activitySidebar = document.getElementById("activity-sidebar");
  const isOpen = activitySidebar.getAttribute("data-mobile-open") === "true";

  activitySidebar.setAttribute("data-mobile-open", isOpen ? "false" : "true");
};
