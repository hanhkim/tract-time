class UI {
  getTableOfSite() {
    return document.getElementById('track_table');
  }

  clearUI() {
    document.getElementById('resultTable').innerHTML = null;
    document.getElementById('total').innerHTML = null;
  }
}
