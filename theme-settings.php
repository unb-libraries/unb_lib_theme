<?php

/**
 * @file
 * Functions to support theming in the UNB Libraries theme.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function unb_lib_theme_form_system_theme_settings_alter(&$form, FormStateInterface $form_state) {
  // Create a section for unb lib header banner images.
  $form['lib_header_banner'] = [
    '#type' => 'details',
    '#title' => t('Banner Settings'),
    '#description' => t('Banner settings to be used for in the theme header.'),
    '#weight' => 50,
    '#open' => TRUE,
  ];

}
