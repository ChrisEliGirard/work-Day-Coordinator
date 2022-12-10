// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Variables to hold DOM selectors
  let mainEl = $("#schedule");
  let dateEl = $("#currentDay");
  // Variable for the range of time work is done
  let workDayHours = [9,17]
  // Write Todays Date to header
  function renderToday() {
  currentDate = dayjs().format('MMM DD, YYYY; hh:mm:ss A');
  dateEl.text(currentDate);
  }
  // Refreshes the Timeclock in the header every second
  setInterval(renderToday, 1000);
  // A listener event for click events on the save button
  mainEl.on("click", ".time-block button", function() {
    // Stores users input string based on the div's id (id=hour#) for the key
    localStorage.setItem($(this).parent().attr("id"), $(this).parent().children("textArea").val());
    renderSchedule();
  });
  // TODO: Add code to apply the past, present, or future class to each time block by comparing the id to the current hour.
    function renderScheduleShell() {
      for (let i = workDayHours[0]; i <= workDayHours[1]; i++) {
      // Initializing variables for the for loop function to determine if a schedule item is in the past, present, or future
      let hour;
      let amOrPm;
      let tense;
      let currentHour = dayjs().format("H");
      // Using 24hr clock - determine if before or after noon
      amOrPm = (i >= 12) ? "PM" : "AM";
      // Convert 24hr clock to 12 hr - If 0 then return 12
      hour = (i % 12) || 12;
      // Get the time tense for highlighting schedule time slots.
      if (i == (currentHour))
      {
        tense = "present";
      } else if (i < (currentHour))
      {
        tense = "past";
      } else
      {
        tense = "future";
      }
      // Creates time slot div and its children for each hour in the scheduler
      mainEl.append(
        $("<div>", { "id": "hour-" + hour, "class": "row time-block " + tense }).append(
          $("<div>", { "class": "col-2 col-md-1 hour text-center py-3" }).text(hour + amOrPm),
          $("<textArea>", { "class": "col-8 col-md-10 description", "rows": "3" }),
          $("<button>", { "class": "btn saveBtn col-2 col-md-1", "aria-label": "save" }).append(
            $("<i>", { "class": "fas fa-save", "aria-hidden": "true" }))));
      }
    }
  // Function to get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  function renderSchedule() {
    // For loop to get user data from local storage and write to the appropriate hour in the schedule div based on the key
    for (let i = 0; i < localStorage.length; i++)
    {
      $("#" + localStorage.key(i)).children("textArea").text(localStorage.getItem(localStorage.key(i)));
    }
  };
  renderScheduleShell()
  renderSchedule()
});
