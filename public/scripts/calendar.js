$(document).ready(function() {
     $("#calendar").fullCalendar({
       header: {
         left: "prev,next today",
         center: "title",
         right: "month,agendaWeek,agendaDay"
       },
   
       defaultView: "month",
       navLinks: true, // can click day/week names to navigate views
       selectable: true,
       selectHelper: true,
       editable: true,
       eventLimit: true, // allow "more" link when too many events
   
       select: function(start, end) {
         // Display the modal.
         // You could fill in the start and end fields based on the parameters
         $(".modal").modal("show");
         $(".modal")
           .find("#title")
           .val("");
         $(".modal")
           .find("#starts-at")
           .val("");
         $(".modal")
           .find("#ends-at")
           .val("");
         $("#save-event").show();
         $("input").prop("readonly", false);
       },
   
       eventRender: function(event, element) {
         /*add onclick functionality here*/
         element
           .find(".fc-content")
           .prepend("<span class='closeon material-icons'>&#xe5cd;</span>");
         element.find(".closeon").on("click", function() {
           $("#calendar").fullCalendar("removeEvents", event._id);
         });
       },
   
       eventClick: function(calEvent, jsEvent) {
         /*event title*/
         var title = prompt("Edit Event Title/Description:", calEvent.title, {
           buttons: {
             Ok: true,
             Cancel: false
           }
         });
         if (title) {
           calEvent.title = title;
           $("#calendar").fullCalendar("updateEvent", calEvent);
         } else if (title == "") {
           calEvent.title = "";
           $("#calendar").fullCalendar("updateEvent", calEvent);
         }
   
         /*event start*/
         var start = prompt("Edit Start Time:", calEvent.start, {
           buttons: {
             Ok: true,
             Cancel: false
           }
         });
         if (start) {
           calEvent.start = start;
           $("#calendar").fullCalendar("updateEvent", calEvent);
         } else if (start == "") {
           calEvent.start = "";
           $("#calendar").fullCalendar("updateEvent", calEvent);
         }
   
         /*event end*/
         var end = prompt("Edit End Time:", calEvent.end, {
           buttons: {
             Ok: true,
             Cancel: false
           }
         });
         if (end) {
           calEvent.end = end;
           $("#calendar").fullCalendar("updateEvent", calEvent);
         } else if (end == "") {
           calEvent.end = "";
           $("#calendar").fullCalendar("updateEvent", calEvent);
         }
   
         $(".modal").modal("show");
         $(".modal")
           .find("#title")
           .val(calEvent.title);
         $(".modal")
           .find("#starts-at")
           .val(calEvent.start);
         $(".modal")
           .find("#ends-at")
           .val(calEvent.end);
         $("#save-event").hide();
         $("input").prop("readonly", true);
       }
     });
   
     // Bind the dates to datetimepicker.
     $("#starts-at, #ends-at").datetimepicker();
   
     // Whenever the user clicks on the "save" button on the dialog
     $("#save-event").on("click", function(event) {
       var title = $("#title").val();
       if (title) {
         var eventData = {
           title: title,
           start: $("#starts-at").val(),
           end: $("#ends-at").val()
         };
         $("#calendar").fullCalendar("renderEvent", eventData, true); // stick? = true
       }
       $("#calendar").fullCalendar("unselect");
   
       // Clear modal inputs
       $(".modal")
         .find("input")
         .val("");
       // hide modal
       $(".modal").modal("hide");
     });
   
     $("textarea").autosize();
   });