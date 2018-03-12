# Change Log

## 0.2.12

- Feature: Provides a way to transform strings provided to `<T />` before it is sent to the translation function.

## 0.2.11

- Fix: Only injects the `content` part of `{{ component:content }}` if it is specified.

## 0.2.10

- Feature: Adds string interpolation support to non-component translator functions `t()`, `tn()`, `tp()` and `tnp()`, using the same `{{ variable }}` template syntax as for the other translator functions.

## 0.2.9
- Feature: Forces `<T>` and components decorated with `withTranslator()` to re-render whenever `<LionessProvider>`'s `locale` or `messages` props are updated.

## 0.2.8
- Fix: Supports new lines in raw strings, scope variables and template variable values

## 0.2.7
- Feature: Added a debug prop to `<LionessProvider>`

## 0.2.6
- Feature: Export interpolateComponents

## 0.2.5
- Breaking: Rename tpn -> tnp and tcpn -> tcnp
- Breaking: Dropped official support for node.js 5 and 7
- Feature: Added official support for node.js 8
- Feature: Set displayName when using `withTranslators()`
- Chore: Improved documentation

## 0.2.4
- Feature: Added support for gettext text domains

## 0.2.3
- Bug: Fixed proptypes notices
- Chore: Improved documentation

## 0.2.2
- Feature: Handled interpolation of non-string, non-element scope variables

## 0.2.1
- Bug: Makes logo image URL a full path

## 0.2.0
- Breaking: Rename composers.js -> withTranslators.js
- Breaking: Rename gettext.js -> getGettextInstance.js
- Breaking: Extract `interpolateComponents()` into a separate file
- Feature: Added tc, tcn, tcp, tcpn translators
- Feature: `interpolateComponents()` now returns simple string if it can
- Chore: Added tests and CI

## 0.1.5
- Bug: Fixes bad parsing of key/value commas in interpolated variables

## 0.1.4
- Feature: Allows commas to be used in interpolated scope values

## 0.1.3
- Feature: Improve interpolation regex to allow whatever inside curly braces

## 0.1.2
- Bug: Fixed image path

## 0.1.1
- Breaking: Change package name to lioness
- Feature: Defines prop types on `<T>`
- Chore: Removes unused interpolate package dependency

## 0.1.0
- Initial release
