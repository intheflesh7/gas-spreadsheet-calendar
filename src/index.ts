// Because `onInstall()` is always not used
// noinspection JSUnusedGlobalSymbols

const oneYear = 365 * 24 * 60 * 60 * 1000;
const maxEvents = 5;

const menuName = 'Мероприятия';
const itemName = 'Получить';
const sidebarName = 'Календари';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getEvents() {
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + oneYear);

  Logger.log('getEvents()');
  // Determines how many calendars the user can access.
  const calendars = CalendarApp.getAllCalendars();
  const calendarsEvents = [];
  for (let i = 0; i < calendars.length; i++) {
    const calendar = calendars[i];
    const events = calendar.getEvents(startTime, endTime);
    // Ignore calendar with zero events
    if (events.length === 0) {
      continue;
    }

    const filteredEvents = [];
    for (let j = 0; j < events.length; j++) {
      // We don't add more than max events
      if (j >= maxEvents) {
        break;
      }

      const event = events[j];
      filteredEvents.push({
        id: event.getId(),
        title: event.getTitle(),
        startTime: event.getStartTime(),
        endTime: event.getEndTime(),
      });
    }

    calendarsEvents.push({
      id: calendar.getId(),
      name: calendar.getName(),
      events: filteredEvents,
    });
  }

  showSidebar(calendarsEvents);
}

/**
 * The event handler triggered when opening the spreadsheet.
 */
function onOpen() {
  // Add a custom menu to the spreadsheet.
  SpreadsheetApp.getUi()
    .createMenu(menuName)
    .addItem(itemName, 'getEvents')
    .addToUi();
}

/**
 * The event handler triggered when installing the add-on.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onInstall() {
  onOpen();
}

function showSidebar(
  calendarsEvents: {
    name: string;
    id: string;
    events: {
      startTime: GoogleAppsScript.Base.Date;
      id: string;
      endTime: GoogleAppsScript.Base.Date;
      title: string;
    }[];
  }[],
) {
  Logger.log(calendarsEvents);

  const template = HtmlService.createTemplateFromFile('sidebar');
  template.data = calendarsEvents;

  const html = template.evaluate().setTitle(sidebarName);

  SpreadsheetApp.getUi().showSidebar(html);
}
