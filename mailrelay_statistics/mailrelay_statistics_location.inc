<?php

function mailrelay_statistics_page_location() {
  drupal_add_js('https://www.google.com/jsapi', 'external');
  drupal_add_js(drupal_get_path('module', 'mailrelay_statistics') . '/js/statistic_location.js');
  drupal_add_library('system' , 'ui.tabs');
  drupal_add_js('jQuery(document).ready(function(){jQuery("#location").tabs();});' , 'inline');
  $render_statistics = array(mailrelay_statistics_getGeoClicks(), mailrelay_statistics_getGeoViews());
  $build = drupal_render(drupal_get_form('mailrelay_statistics_form'));
  $build .= '<div id="location"><ul><li><a href="#location_clicks">' . t('Clicks') . '</a></li><li><a href="#location_views">' . t('Impressions') . '</a></li></ul>';
  $build .= drupal_render($render_statistics);
  $build .= '</div>';
  $output = array(
    '#type' => 'markup',
    '#markup' => $build,
  );
  return $output;
}

function mailrelay_statistics_getGeoClicks() {
  $curl = curl_init('http://' . variable_get('mailrelay_hostname', '') . '/ccm/admin/api/version/2/&type=json');

  if (variable_get('mailrelay_statistics_value', '')) {
    $mid = variable_get('mailrelay_statistics_value', '');
  }
  else {
    $mid = arg(6);
  };

  $postdata = array(
    'function' => 'getClicksInfo',
    'apiKey' => variable_get('mailrelay_api_key', ''),
    'id' => $mid
  );

  curl_setopt($curl, CURLOPT_POST, TRUE);
  curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($postdata));
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

  $json = curl_exec($curl);
  $result = json_decode($json);
  $click_statistics = $result->data;

  if (!$mid == 0) {
    $options = array();
    $country = array();
    foreach ($click_statistics as $key => $value) {
      $location = explode(' - ', $value->location);
      $city = $location[0];
      $state = $location[1];
      $options[] = $city . ', ' . $state . ', ' . $value->country;
      $country[] = $value->country;
    }
    $count_table = array_count_values($options);
    $count_country = array_count_values($country);

    foreach ($count_table as $key => $value) {
      $keys = explode(', ', $key);
      $table_rows[] = array($keys[0], $keys[1], $keys[2], $value);
    }

    drupal_add_js(array(
      'mailrelay_statistics' =>
        array(
          'clicks_country' => $count_country,
          'clicks_table' => $table_rows
        )
      ),
      array('type' => 'setting')
    );

    $output = array(
      '#type' => 'markup',
      '#prefix' => '<div id="location_clicks">',
      '#markup' => '<h2>' . t('Clicks') . '</h2>',
      '#suffix' => '</div>',
    );
    return $output;
  }
}

function mailrelay_statistics_getGeoViews() {
  $curl = curl_init('http://' . variable_get('mailrelay_hostname', '') . '/ccm/admin/api/version/2/&type=json');

  if (variable_get('mailrelay_statistics_value', '')) {
    $mid = variable_get('mailrelay_statistics_value', '');
  }
  else {
    $mid = arg(6);
  };

  $postdata = array(
    'function' => 'getImpressionsInfo',
    'apiKey' => variable_get('mailrelay_api_key', ''),
    'id' => $mid
  );

  curl_setopt($curl, CURLOPT_POST, TRUE);
  curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($postdata));
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

  $json = curl_exec($curl);
  $result = json_decode($json);
  $views_statistics = $result->data;

  if (!$mid == 0) {
    $options = array();
    $country = array();
    foreach ($views_statistics as $key => $value) {
      $location = explode(' - ', $value->location);
      $city = $location[0];
      $state = $location[1];
      $options[] = $city . ', ' . $state . ', ' . $value->country;
      $country[] = $value->country;
    }
    $count_table = array_count_values($options);
    $count_country = array_count_values($country);

    foreach ($count_table as $key => $value) {
      $keys = explode(', ', $key);
      $table_rows[] = array($keys[0], $keys[1], $keys[2], $value);
    }

    drupal_add_js(array(
      'mailrelay_statistics' =>
        array(
          'views_country' => $count_country,
          'views_table' => $table_rows
        )
      ),
      array('type' => 'setting')
    );

    $output = array(
      '#type' => 'markup',
      '#prefix' => '<div id="location_views">',
      '#markup' => '<h2>' . t('Impressions') . '</h2>',
      '#suffix' => '</div>',
    );
    return $output;
  }
}