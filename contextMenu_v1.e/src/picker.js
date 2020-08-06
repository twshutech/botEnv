browser.i18n.getMessage(
  messageName,  // string
  substitutions // optional any
)
browser.menus.create({
  id: "log-selection",
  title: "Log '%s' to the console",
  contexts: ["selection"]
});

browser.menus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "log-selection") {
    console.log(info.selectionText);
  }
});
function onCreated() {
  if (browser.runtime.lastError) {
    console.log("error creating item:" + browser.runtime.lastError);
  } else {
    console.log("item created successfully");
  }
}