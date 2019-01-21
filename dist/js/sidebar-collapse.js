/**
 * @file
 * Sidebar collapse.
 * http://www.bootply.com/88026
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.unb_lib_theme_sidebar = {
    attach: function (context, settings) {
      $('[data-toggle=offcanvas]').click(function() {
        $('.row-offcanvas').toggleClass('active');
      });
    }
  };

})(jQuery, Drupal);
