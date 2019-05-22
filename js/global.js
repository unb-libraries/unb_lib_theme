/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.unb_lib_theme = {
    attach: function (context, settings) {
      var header = $("#navbar-main");
      var header_logo = $("#navbar-main .branding > *");
      var header_nav_buttons = $("#navbar-main .megamenu-li > a");
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var width = $(window).innerWidth();
        if (scroll >= 130 && width >= 991) {
          header.addClass("affix");
          header_nav_buttons.removeClass("py-lg-4");
          header_logo.removeClass("py-2");
        } else {
          header.removeClass("affix");
          header_nav_buttons.addClass("py-lg-4");
          header_logo.addClass("py-2");
        }
      });
    }
  };
})(jQuery, Drupal);
