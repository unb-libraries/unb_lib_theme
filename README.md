# unb_lib_theme
## Drupal 8 Theme Based on Bootstrap.

UNB Libraries Theme.

## License
- unb_lib_theme is licensed under the MIT License:
  - http://opensource.org/licenses/mit-license.html
- Attribution is not required, but much appreciated:
  - `unb_lib_theme by UNB Libraries`


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
