class Activity {
  addTab(tab) {
    if (this.isValidPage(tab)) {
      if (tab.id && tab.id != 0) {
        tabs = tabs || [];
        var url = new Url(tab.url);
        var isDifferentUrl = false;
        if (!url.isMatch(currentTab)) {
          isDifferentUrl = true;
        }

        if (this.isNewUrl(url)) {
          var favicon = tab.favIconUrl;
          if (favicon === undefined) {
            favicon = 'chrome://favicon/' + url.host;
          }
          var newTab = new Tab(url, favicon);
          tabs.push(newTab);
        }

        if (isDifferentUrl) {
          this.setCurrentActiveTab(url);
          var tabUrl = this.getTab(url);
          if (tabUrl !== undefined) tabUrl.incCounter();
        }
      }
    }
  }

  isValidPage(tab) {
    if (
      !tab ||
      !tab.url ||
      (tab.url.indexOf('http:') == -1 && tab.url.indexOf('https:') == -1) ||
      tab.url.indexOf('chrome://') !== -1 ||
      tab.url.indexOf('chrome-extension://') !== -1
    )
      return false;
    return true;
  }

  isNewUrl(domain) {
    if (tabs.length > 0)
      return tabs.find((o) => o.url.isMatch(domain)) === undefined;
    else return true;
  }

  setCurrentActiveTab(domain) {
    // this.closeIntervalForCurrentTab();
    currentTab = domain;
    // this.addTimeInterval(domain);
  }

  getTab(domain) {
    if (tabs !== undefined) return tabs.find((o) => o.url.isMatch(domain));
  }
}
