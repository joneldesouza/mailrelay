google.load("visualization", "1", {packages:['corechart', 'map']}); 
	
jQuery(document).ready(function($) {
  var chart_gs = $('<div></div>').attr('id', 'chart_general_statistics');
	var chart_cs = $('<div></div>').attr('id', 'chart_click_statistics');
  $('#block-system-main .content').append(chart_gs);
	$('#block-system-main .content').append(chart_cs);

  var nametype = Drupal.settings.mailrelay_statistics.nametype;
  var quantity = Drupal.settings.mailrelay_statistics.quantity;
	
  var sent = [String(nametype[2]), Number(quantity[2])];
  var delivered = [String(nametype[7]), Number(quantity[7])];
  var impressions = [String(nametype[0]), Number(quantity[0])];
  var clicks = [String(nametype[1]), Number(quantity[1])];
						
  var general_statistics = [ 
    ['Type', 'Quantity'],
    sent,
    delivered,
    impressions,
    clicks,
  ];
		
  google.setOnLoadCallback(drawChart);
  function drawChart() { 
    var data = google.visualization.arrayToDataTable(general_statistics); 
    var options = { 
      title: 'General Statistics',
			width: 500,
    }; 

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_general_statistics')); 
    chart.draw(data, options); 
  } 

	var click_location = Drupal.settings.mailrelay_statistics.click_location;
	var index = 0;
	var click_statistics = new Array();
	click_statistics[index] = ['City', 'Quantity'];
	index++;
	$.each(click_location, function(key, value) {
		click_statistics[index] = [String(key), Number(value)];
		index++;
	});

 	console.log(click_statistics);
  google.setOnLoadCallback(drawMap);
  function drawMap() {
    var data = google.visualization.arrayToDataTable(click_statistics);

    var options = {
			width: 600,
      showTip: true,
			mapType: 'terrain',
			enableScrollWheel: true
    };

    var map = new google.visualization.Map(document.getElementById('chart_click_statistics'));
    map.draw(data, options);
  }
		
});	