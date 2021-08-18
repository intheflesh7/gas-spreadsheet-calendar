const menuName = 'Мероприятия';
const itemName = 'Получить';

function getEvents() {
    Logger.log('getEvents()');
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
