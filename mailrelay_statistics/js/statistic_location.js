google.load("visualization", "1", {packages:['geochart', 'table']});

jQuery(document).ready(function($) {
  var geo_charts_clicks = $('<div></div>').attr('id', 'geo_charts_clicks').css({'width':'900px', 'margin':'0 auto'});
  $('#location_clicks').append(geo_charts_clicks);

  var clicks_country = Drupal.settings.mailrelay_statistics.clicks_country;
  var index = 0;
  var clicks_country_statistics = new Array();
  clicks_country_statistics[index] = [Drupal.t('Country'), Drupal.t('Clicks')];
  index++;
  $.each(clicks_country, function(key, value) {
    clicks_country_statistics[index] = [String(key), Number(value)];
    index++;
  });

  var geo_charts_views = $('<div></div>').attr('id', 'geo_charts_views').css({'width':'900px', 'margin':'0 auto'});
  $('#location_views').append(geo_charts_views);

  var views_country = Drupal.settings.mailrelay_statistics.views_country;
  var index = 0;
  var views_country_statistics = new Array();
  views_country_statistics[index] = [Drupal.t('Country'), Drupal.t('Impressions')];
  index++;
  $.each(views_country, function(key, value) {
    views_country_statistics[index] = [String(key), Number(value)];
    index++;
  });

  function drawRegionsMap() {
    var data_clicks = google.visualization.arrayToDataTable(clicks_country_statistics);
    var data_views = google.visualization.arrayToDataTable(views_country_statistics);

    var options = {
      colorAxis: {colors: ['#d3dcc3', '#119619']},
      width: 900
    };

    var map_click = new google.visualization.GeoChart(document.getElementById('geo_charts_clicks'));
    map_click.draw(data_clicks, options);
    var map_view = new google.visualization.GeoChart(document.getElementById('geo_charts_views'));
    map_view.draw(data_views, options);
  }
  google.setOnLoadCallback(drawRegionsMap);

  var table_charts_clicks = $('<div></div>').attr('id', 'table_charts_clicks');
  $('#location_clicks').append(table_charts_clicks);
  var clicks_table = Drupal.settings.mailrelay_statistics.clicks_table;

  var table_charts_views = $('<div></div>').attr('id', 'table_charts_views');
  $('#location_views').append(table_charts_views);
  var views_table = Drupal.settings.mailrelay_statistics.views_table;

  function drawTable() {
    var data_clicks = new google.visualization.DataTable();
    data_clicks.addColumn('string', Drupal.t('City'));
    data_clicks.addColumn('string', Drupal.t('Province'));
    data_clicks.addColumn('string', Drupal.t('Country'));
    data_clicks.addColumn('number', Drupal.t('Quantity'));
    data_clicks.addRows(clicks_table);

    var data_views = new google.visualization.DataTable();
    data_views.addColumn('string', Drupal.t('City'));
    data_views.addColumn('string', Drupal.t('Province'));
    data_views.addColumn('string', Drupal.t('Country'));
    data_views.addColumn('number', Drupal.t('Quantity'));
    data_views.addRows(views_table);

    var table_click = new google.visualization.Table(document.getElementById('table_charts_clicks'));
    table_click.draw(data_clicks, {showRowNumber: true, page: 'enable', pageSize: 20});
    var table_view = new google.visualization.Table(document.getElementById('table_charts_views'));
    table_view.draw(data_views, {showRowNumber: true, page: 'enable', pageSize: 20});
  }
  google.setOnLoadCallback(drawTable);
});