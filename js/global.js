/**
 * @file
 * Global unb_lib_theme utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.unb_lib_theme = {
    attach: function (context, settings) {
      var banner = $("#banner");
      var header = $("#navbar-main");
      var header_logo = $("#navbar-main .branding > *");
      var header_nav_buttons = $("#navbar-main .megamenu-li > a");

      $(window).resize(function () {
        setBanner(banner);
      });

      $(window).scroll(function () {
        let scroll = $(window).scrollTop();
        if (scroll >= 130 && window.width >= 977) {
          header.addClass("affix");
          header_nav_buttons.removeClass("py-lg-4");
          header_logo.removeClass("py-2");
        } else {
          header.removeClass("affix");
          header_nav_buttons.addClass("py-lg-4");
          header_logo.addClass("py-2");
        }
      });
      setBanner(banner);
    }
  };
})(jQuery, Drupal);

var setBanner = function (banner) {
  window.width = jQuery(window).width();
  var bannerExpanded = jQuery("#btn-hours").attr("aria-expanded");
  if (bannerExpanded=='false' && window.width < 978) {
    banner.removeClass("show");
  }
};
