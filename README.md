# unb_lib_theme
## Drupal 8+ Theme Based on Bootstrap.

UNB Libraries Theme.

## License
- unb_lib_theme is licensed under the MIT License:
  - http://opensource.org/licenses/mit-license.html
- Attribution is not required, but much appreciated:
  - `unb_lib_theme by UNB Libraries`


## How to Use
- This theme is not intended to be used directly but instead as a base theme that provides UNB Libraries branded
  header/footer/assets etc. for a project's subtheme.

- add both `Bootstrap Barrio`, `UNB Libraries theme`, `UNB Libraries Banner Alerts` and
  `UNB Libraries Calendar Hours Client` to your project repo <kbd>build/composer.json</kbd> file's require section<br> 
  &NewLine;  
  Example:<blockquote>
  "require": {<br>
    &nbsp;&nbsp;"drupal/bootstrap_barrio": "5.1.7",<br>
    &nbsp;&nbsp;"unb-libraries/alert_scheduler": "dev-8.x-1.x",<br>
    &nbsp;&nbsp;"unb-libraries/calendar_hours": "dev-9.x-1.x",<br>
    &nbsp;&nbsp;"unb-libraries/unb_lib_theme": "dev-9.x-4.x",<br>
    &nbsp;&nbsp;&hellip;<br>
  }</blockquote>   
  <b>Note:</b> The <i>emergency banner</i> and <i>banner image library hours</i> sections of the default page
  template header section depend on UNB Libraries' <i>Alert Scheduler</i> and <i>Calendar Hours Client</i> 
  projects to function as intended. For more information visit
  https://github.com/unb-libraries/alert-scheduler and https://github.com/unb-libraries/calendar_hours
  respectively.<br>
  &NewLine;  
  <b>Note 2:</b> The theme branch <kbd>9.x</kbd> segment refers to Drupal 9.x while the <kbd>4.x</kbd> segment refers
  to Bootstrap 4.<br>
  The dev-8.x-4.x branch would be intended to use on a project still using Drupal 8.x.

- add `Twitter Bootstrap` to your project repo's root `composer.json` file's `require-dev` section. This will provide
  the SASS code necessary for your subtheme dev environment for extending/overriding Bootstrap
  variables/functions/etc.<br>
  &NewLine;  
  Example:<blockquote>
  "require": {<br>
    &nbsp;&nbsp;"twbs/bootstrap": "~4.5.3",<br>
    &nbsp;&nbsp;&hellip;<br>
  }
</blockquote>

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
- This subtheme uses Bootstrap Barrio as a base theme, specifically the 5.1.x branch which, in turn, employs Bootstrap 4 (Barrio 5.5.x uses Bootstrap v5):
  - https://www.drupal.org/project/bootstrap_barrio

- As of Bootstrap Barrio v5.1.7, Bootstrap v4.5.x is specifically bundled (i.e. do not use v4.6.x - see global-styling theme library)
  - Subthemes compiling sass should add the following `require-dev` package to `composer.jason`:  
    "twbs/bootstrap": "~4.5.3",

  - The banner hours depends on the UNB Libraries > Calendar Hours > Calendar Hours Client module:
    - https://github.com/unb-libraries/calendar_hours

  - Add Font Awesome Icons module, 2.x branch for icons used in Header/Footer:
    - https://www.drupal.org/project/fontawesome
    - load only the <b>free</b> icon subset, i.e. the <b>Solid</b> and <b>Brand</b> icons <i>(else the non-free icon font
      may take precedence and not display)</i>
       - this in done via the Font Awesome Settings > Partial File Configuration admin config form: 
         <kbd>/admin/config/content/fontawesome</kbd>
