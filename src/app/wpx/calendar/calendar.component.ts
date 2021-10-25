import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;


  constructor() { }

  ngOnInit(): void {
    
  }

 
  calendarOptions: CalendarOptions = {
  //  themeSystem: 'bootstrap',
    aspectRatio: 2,
    initialView: 'dayGridMonth',
    height: 725,
    dateClick: this.handleDateClick.bind(this), 
    headerToolbar:
    {
      start: 'today prev,next,prevYear,nextYear' , // will normally be on the left. if RTL, will be on the right
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,listWeek' // will normally be on the right. if RTL, will be on the left
    },

    contentHeight: 775,
    locale: "es",
    firstDay: 1,

   /*
    bootstrapFontAwesome:
    {
      close: 'fa-times',
      prev: 'fa-chevron-left',
      next: 'fa-chevron-right',
      prevYear: 'fa-angle-double-left',
      nextYear: 'fa-angle-double-right'
    }
    */
    /*

    buttonText: {
      today: 'today',
      month: 'month',
      week: 'week',
      day: 'day',
      list: 'list'
    },
    */
/*  
    buttonIcons: {
      prev: 'left-single-arrow',
      next: 'right-single-arrow',
      prevYear: 'left-double-arrow',
      nextYear: 'right-double-arrow'
    }
  */ 
  };
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
}
