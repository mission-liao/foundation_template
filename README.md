## foundation_template

generated from a [famous yo-generator](https://github.com/juliancwirko/generator-zf5) for zurb-foundation#5.
different from that with these:
- replace grunt with gulp

command supported:
- gulp -> build app into dist folder, and call connect:dist
- gulp connect:app -> launch a server against app folder, better for dev/debug purpose
- gulp connect:dist -> launch a server against dist folder.
- gulp jshint -> jshint
- gulp clean -> clear dist folder
- gulp compile:sass -> compile css
- gulp usemin -> main build logic.
