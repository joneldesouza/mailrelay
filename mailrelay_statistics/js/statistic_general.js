google.load("visualization", "1", {packages:['corechart', 'table']});

jQuery(document).ready(function($) {		
  var chart_general = $('<div></div>').attr('id', 'chart_general').css({'width':'800px', 'margin':'0 auto'});
  $('#block-system-main .content').append(chart_general);

  var gs_type = Drupal.settings.mailrelay_statistics.gs_type;
  var gs_quantity = Drupal.settings.mailrelay_statistics.gs_quantity;

  var sent = [String(gs_type[2]), Number(gs_quantity[2])];
  var delivered = [String(gs_type[7]), Number(gs_quantity[7])];
  var impressions = [String(gs_type[0]), Number(gs_quantity[0])];
  var clicks = [String(gs_type[1]), Number(gs_quantity[1])];

  var general_statistics = [
    [Drupal.t('Type'), Drupal.t('Quantity')],
    sent,
    delivered,
    impressions,
    clicks,
  ];

  function drawChart() {
    var data = google.visualization.arrayToDataTable(general_statistics);
    var options = {
      width: 800,
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_general'));
    chart.draw(data, options);
  }
  google.setOnLoadCallback(drawChart);

  var table_charts_views = $('<div></div>').attr('id', 'gs_table_charts');
  $('#block-system-main .content').append(table_charts_views);
  var gs_table = Drupal.settings.mailrelay_statistics.gs_table;

  function drawTable() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', Drupal.t('Type'));
    data.addColumn('number', Drupal.t('Quantity'));
    data.addRows(gs_table);

    var table = new google.visualization.Table(document.getElementById('gs_table_charts'));
    table.draw(data, {showRowNumber: false, page: 'enable', pageSize: 20});
  }
  google.setOnLoadCallback(drawTable);
});