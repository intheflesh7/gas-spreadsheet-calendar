// Because `onInstall()` is always not used
// noinspection JSUnusedGlobalSymbols

const oneYear = 365 * 24 * 60 * 60 * 1000;

const menuName = 'Мероприятия';
const itemName = 'Получить';
const sidebarName = 'Календари';

function getEvents() {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + oneYear);

    Logger.log('getEvents()');
    // Determines how many calendars the user can access.
    const calendarsEvents = CalendarApp.getAllCalendars().map(calendar => {
        const events = calendar.getEvents(startTime, endTime).map(event => {
            return {
                id: event.getId(),
                title: event.getTitle(),
                startTime: event.getStartTime(),
                endTime: event.getEndTime(),
            }
        })

        return {
            id: calendar.getId(),
            name: calendar.getName(),
            events,
        };
    });

    showSidebar(calendarsEvents);
}

/**
 * The event handler triggered when opening the spreadsheet.
 * @param {Event} e The onOpen event.
 */
function onOpen(e) {
    // Add a custom menu to the spreadsheet.
    SpreadsheetApp.getUi()
        .createMenu(menuName)
        .addItem(itemName, 'getEvents')
        .addToUi();
}

/**
 * The event handler triggered when installing the add-on.
 * @param {Event} e The onInstall event.
 */
function onInstall(e) {
    onOpen(e);
}

function showSidebar() {
    const html = HtmlService.createHtmlOutputFromFile('sidebar')
        .setTitle(sidebarName);
    SpreadsheetApp.getUi()
        .showSidebar(html);
}