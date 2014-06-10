google.load("visualization", "1", {packages:['corechart', 'table']});

jQuery(document).ready(function($) {
  var pie_chart_browser = $('<div></div>').attr('id', 'pie_chart_browser').css({'width':'800px', 'margin':'0 auto'});
  $('#technology_browser').append(pie_chart_browser);

  // Get Browser information
  var pie_browser = Drupal.settings.mailrelay_statistics.pie_browser;
  var index = 0;
  var browser_statistics = new Array();
  browser_statistics[index] = [Drupal.t('Browser'), Drupal.t('Quantity')];
  index++;
  $.each(pie_browser, function(key, value) {
    browser_statistics[index] = [String(key), Number(value)];
    index++;
  });

  // Get OS information
  var pie_chart_os = $('<div></div>').attr('id', 'pie_chart_os').css({'width':'800px', 'margin':'0 auto'});
  $('#technology_os').append(pie_chart_os);

  var pie_os = Drupal.settings.mailrelay_statistics.pie_os;
  var index = 0;
  var os_statistics = new Array();
  os_statistics[index] = [Drupal.t('Operating system'), Drupal.t('Quantity')];
  index++;
  $.each(pie_os, function(key, value) {
    os_statistics[index] = [String(key), Number(value)];
    index++;
  });

  // Get Screen Resolution information
  var pie_chart_screen = $('<div></div>').attr('id', 'pie_chart_screen').css({'width':'800px', 'margin':'0 auto'});
  $('#technology_screen').append(pie_chart_screen);

  var pie_screen = Drupal.settings.mailrelay_statistics.pie_screen;
  var index = 0;
  var screen_statistics = new Array();
  screen_statistics[index] = [Drupal.t('Screen Resolution'), Drupal.t('Quantity')];
  index++;
  $.each(pie_screen, function(key, value) {
    screen_statistics[index] = [String(key), Number(value)];
    index++;
  });

  function drawChart() {
    var data_browser = google.visualization.arrayToDataTable(browser_statistics);
    var data_os = google.visualization.arrayToDataTable(os_statistics);
    var data_screen = google.visualization.arrayToDataTable(screen_statistics);

    var options = {
      width: 800
    };

    var chart_browser = new google.visualization.PieChart(document.getElementById('pie_chart_browser'));
    chart_browser.draw(data_browser, options);
    var chart_os = new google.visualization.PieChart(document.getElementById('pie_chart_os'));
    chart_os.draw(data_os, options);
    var chart_screen = new google.visualization.PieChart(document.getElementById('pie_chart_screen'));
    chart_screen.draw(data_screen, options);
  }
  google.setOnLoadCallback(drawChart);

  var table_chart_browser = $('<div></div>').attr('id', 'table_chart_browser');
  $('#technology_browser').append(table_chart_browser);
  var table_browser = Drupal.settings.mailrelay_statistics.table_browser;

  var table_chart_os = $('<div></div>').attr('id', 'table_chart_os');
  $('#technology_os').append(table_chart_os);
  var table_os = Drupal.settings.mailrelay_statistics.table_os;

  var table_chart_screen = $('<div></div>').attr('id', 'table_chart_screen');
  $('#technology_screen').append(table_chart_screen);
  var table_screen = Drupal.settings.mailrelay_statistics.table_screen;

  function drawTable() {
    var data_browser = new google.visualization.DataTable();
    data_browser.addColumn('string', Drupal.t('Browser'));
    data_browser.addColumn('number', Drupal.t('Quantity'));
    data_browser.addRows(table_browser);

    var data_os = new google.visualization.DataTable();
    data_os.addColumn('string', Drupal.t('Operating system'));
    data_os.addColumn('number', Drupal.t('Quantity'));
    data_os.addRows(table_os);

    var data_screen = new google.visualization.DataTable();
    data_screen.addColumn('string', Drupal.t('Screen Resolution'));
    data_screen.addColumn('number', Drupal.t('Quantity'));
    data_screen.addRows(table_screen);

    var chart_table_browser = new google.visualization.Table(document.getElementById('table_chart_browser'));
    chart_table_browser.draw(data_browser, {showRowNumber: true, page: 'enable', pageSize: 20});

    var chart_table_os = new google.visualization.Table(document.getElementById('table_chart_os'));
    chart_table_os.draw(data_os, {showRowNumber: true, page: 'enable', pageSize: 20});

    var chart_table_screen = new google.visualization.Table(document.getElementById('table_chart_screen'));
    chart_table_screen.draw(data_screen, {showRowNumber: true, page: 'enable', pageSize: 20});
  }
  google.setOnLoadCallback(drawTable);
});