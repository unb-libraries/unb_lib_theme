<?php

/**
 * @file
 * Contains theme settings for unb_lib_theme form.
 */

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function unb_lib_theme_form_system_theme_settings_alter(&$form, \Drupal\Core\Form\FormStateInterface &$form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  $form['lib_header'] = [
    '#title' => t('UNB Libraries Header'),
    '#type' => 'fieldset',
  ];

  $form['lib_header']['header_uri'] = [
    '#type' => 'textfield',
    '#title' => t('Source URI'),
    '#default_value' => _unb_lib_theme_get_header_uri_setting(),
    '#description' => t('Enter the URI to get the header from. Change this to use specific header images (i.e. https://dev.lib.unb.ca/core/inc-2015/head-nav.php?banner=testing).'),
  ];

  $form['lib_header']['header_refresh_seconds'] = [
    '#type' => 'textfield',
    '#field_suffix' => 's',
    '#title' => t('Refresh Time'),
    '#default_value' => _unb_lib_theme_get_header_refresh_seconds_setting(),
    '#description' => t('Enter how often to refresh the header, in seconds.'),
  ];

  $form['lib_header']['header_write_path'] = [
    '#type' => 'textfield',
    '#title' => t('Local Write Path'),
    '#default_value' => _unb_lib_theme_get_header_write_path(),
    '#description' => t('Enter the local path to write the header to.'),
  ];
}
