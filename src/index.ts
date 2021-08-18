const menuName = 'Мероприятия';
const itemName = 'Получить';
const sidebarName = 'Календари';

function getEvents() {
    Logger.log('getEvents()');
    showSidebar();
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