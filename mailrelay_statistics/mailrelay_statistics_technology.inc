<?php

function mailrelay_statistics_page_technology() {
  drupal_add_js('https://www.google.com/jsapi', 'external');
  drupal_add_js(drupal_get_path('module', 'mailrelay_statistics') . '/js/statistic_technology.js');
  drupal_add_library('system' , 'ui.tabs');
  drupal_add_js('jQuery(document).ready(function(){jQuery("#technology").tabs();});' , 'inline');
  $build = drupal_render(drupal_get_form('mailrelay_statistics_form'));
  $build .= '<div id="technology">
    <ul>
      <li><a href="#technology_browser">' . t('Browser') . '</a></li>
      <li><a href="#technology_os">' . t('Operating system') . '</a></li>
      <li><a href="#technology_screen">' . t('Screen Resolution') . '</a></li>
    </ul>';
  $build .= drupal_render(mailrelay_statistics_getGeoClicks());
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

  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($postdata));
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

  $json = curl_exec($curl);
  $result = json_decode($json);
  $click_statistics = $result->data;

  if(!$mid == 0) {
    $browser = array();
    $os = array();
    $screen_resolution = array();
    foreach ($click_statistics as $key => $value) {
      $browser[] = $value->browser;
      $os[] = $value->os;
      $screen_resolution[] = $value->screen_width . 'x' . $value->screen_height;
    }
    $count_browser = array_count_values($browser);
    $count_os = array_count_values($os);
    $count_screen = array_count_values($screen_resolution);
    foreach ($count_browser as $browser_key => $browser_value) {
      $rows_browser[] = array($browser_key, $browser_value);
    }
    foreach ($count_os as $os_key => $os_value) {
      $rows_os[] = array($os_key, $os_value);
    }
    foreach ($count_screen as $screen_key => $screen_value) {
      $rows_screen[] = array($screen_key, $screen_value);
    }
    drupal_add_js(array(
      'mailrelay_statistics' =>
        array(
          'pie_browser' => $count_browser,
          'pie_os' => $count_os,
          'pie_screen' => $count_screen,
          'table_browser' => $rows_browser,
          'table_os' => $rows_os,
          'table_screen' => $rows_screen,
        )
      ),
      array('type' => 'setting')
    );

    $data_browser = array(
      '#type' => 'markup',
      '#prefix' => '<div id="technology_browser">',
      '#markup' => '<h2>' . t('Browser') . '</h2>',
      '#suffix' => '</div>',
    );
    $data_os = array(
      '#type' => 'markup',
      '#prefix' => '<div id="technology_os">',
      '#markup' => '<h2>' . t('Operating system') . '</h2>',
      '#suffix' => '</div>',
    );
    $data_screen = array(
      '#type' => 'markup',
      '#prefix' => '<div id="technology_screen">',
      '#markup' => '<h2>' . t('Screen Resolution') . '</h2>',
      '#suffix' => '</div>',
    );
    $output = array($data_browser, $data_os, $data_screen);
    return $output;
  }
}