try {
  importScripts(
    './scripts/activity.js',
    './scripts/storage.js',
    './scripts/tab.js',
    './scripts/url.js',
    './scripts/constants.js'
  );
} catch (e) {
  console.error('error loading files: ', e);
}

////////////////////////////////////////////////////////////////////
//////////////////////////// MAIN //////////////////////////////////
////////////////////////////////////////////////////////////////////
var tabs;
var currentTab;
var storage = new LocalStorage();
var activity = new Activity();

function watchingListener() {
  chrome.runtime.onInstalled.addListener(() => {
    console.log('.onInstalled.addListener');
  });

  chrome.tabs.onActivated.addListener(function (info) {
    chrome.tabs.get(info.tabId, function (tab) {
      activity.addTab(tab);
    });
  });

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    chrome.storage.local.get(STORAGE_TABS, function (item) {
      console.log('storage chua tabs ne: ', item);
    });
  });
}

function updateStorage() {
  setInterval(backgroundUpdateStorage, SETTINGS_INTERVAL_SAVE_STORAGE_DEFAULT);
}

function backgroundUpdateStorage() {
  console.log('tab: ', tabs);
  if (tabs != undefined && tabs.length > 0) storage.saveTabs(tabs);
}

function loadTabs() {
  storage.loadTabs(STORAGE_TABS, function (items) {
    tabs = [];
    items = items || [];

    for (var i = 0; i < items.length; i++) {
      tabs.push(
        new Tab(
          items[i].url,
          items[i].favicon,
          items[i].days,
          items[i].summaryTime,
          items[i].counter
        )
      );
    }
    console.log('tabs first time', tabs);
  });
}

function loadData() {
  loadTabs();
}

loadData();
updateStorage();
watchingListener();
