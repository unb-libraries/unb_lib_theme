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
      var header = $("#navbar-top");

      $(window).resize(function () {
        setBanner(banner);
      });

      $(window).scroll(function () {
        let scroll = $(window).scrollTop();
        if (scroll >= 131 && window.width >= 977) {
          header.addClass("affix");
        } else {
          header.removeClass("affix");
        }
      });
      setBanner(banner);

      // set and refresh banner date
      setBannerDate();
      setInterval(function() {
        setBannerDate();
      }, 60000);
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

var setBannerDate = function() {
  var date = moment().format('dddd, MMMM D, Y');
  jQuery('#banner-hours .current-date').html(date);
};
