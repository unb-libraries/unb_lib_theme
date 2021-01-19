# unb_lib_theme
## Drupal 8 Theme Based on Bootstrap.

UNB Libraries Theme.

## License
- unb_lib_theme is licensed under the MIT License:
  - http://opensource.org/licenses/mit-license.html
- Attribution is not required, but much appreciated:
  - `unb_lib_theme by UNB Libraries`

## Administration theme
This theme contains various stylistic improvements to Drupal core's <i>Seven</i> administration
theme defined in the <code>src/scss/admin-overrides-seven.scss</code> Sass file. These style
rules are primary intended for UNB Libraries projects - should you use <i>Seven</i> as your
project's administration theme and want to incorporate these overrides one method to do so is
as follows:
- create an <code>admin-style.scss</code> files inside your subtheme's <code>src/scss</code> folder
- add the following import at the top of this file:
<pre><code>@import '../../../../../vendor/unb-libraries/unb_lib_theme/src/scss/admin-overrides-seven.scss';</code></pre>
  This will compile (minimized) to <code>dist/css/admin-style.css</code>.
- <b>note</b>: should you wish to add additional project-specific administration rules simply add them after this
  import line
- next, define a library for the administration styles in your subtheme's <code>SUBTHEMENAME.libraries.yml</code> file:
<pre><code>admin-styling:
  version: VERSION
  css:
    theme:
      dist/css/admin-style.css: { minified: true }
</code></pre>
- finally, you may attach the admin library assets to an administration form in code using:
<code>$form['#attached']['library'][] = 'lib_unb_ca/admin-styling';</code>

## Notes
- This depends on Bootstrap Barrio theme, 5.x branch:
  - https://www.drupal.org/project/bootstrap_barrio

- The banner hours depends on the UNB Libraries > Calendar Hours > Calendar Hours Client module:
  - https://github.com/unb-libraries/calendar_hours

- Currently using Bootstrap version 4.5.3 (see global-styling theme library)
  - Subthemes compiling sass should add the following `require-dev` package:  
    "twbs/bootstrap": "~4.5.3",

- Add Font Awesome Icons module, 2.x branch for icons used in Header/Footer:
  - https://www.drupal.org/project/fontawesome
