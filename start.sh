#!/bin/sh
set -eu

export LC_ALL=C
case "${APPCODE:-}" in
  *[!a-zA-Z0-9_-]*)
    echo "Invalid APPCODE: only letters, digits, underscores and hyphens are allowed" >&2
    exit 1
    ;;
esac

if [ -n "${LOCAL_DIST_SOURCE:-}" ]; then
  if [ ! -d "$LOCAL_DIST_SOURCE" ]; then
    echo "LOCAL_DIST_SOURCE does not exist: $LOCAL_DIST_SOURCE" >&2
    exit 1
  fi
  find /dist -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
  cp -R "$LOCAL_DIST_SOURCE"/. /dist/
fi

sed -i "s#appcode#${APPCODE:-}#g" /etc/nginx/conf.d/nginx.conf

environment_file=/dist/environments/environment.js
environment_temp="$(mktemp "${environment_file}.XXXXXX")"
trap 'rm -f "$environment_temp"' EXIT

# Serialize overrides without evaluating values or rewriting the source object.
# ENVIRON preserves trailing newlines; the marked block is replaced on restart.
awk -F: '
  function js_string(value, result, i, character, sequence) {
    result = "\""
    for (i = 1; i <= length(value); i++) {
      character = substr(value, i, 1)
      sequence = substr(value, i, 3)
      if (sequence == line_separator || sequence == paragraph_separator) {
        result = result (sequence == line_separator ? "\\u2028" : "\\u2029")
        i += 2
      } else if (character == "\\" || character == "\"") {
        result = result "\\" character
      } else if (character in controls) {
        result = result sprintf("\\u%04x", controls[character])
      } else {
        result = result character
      }
    }
    return result "\""
  }
  BEGIN {
    for (i = 1; i < 32; i++) controls[sprintf("%c", i)] = i
    line_separator = sprintf("%c%c%c", 226, 128, 168)
    paragraph_separator = sprintf("%c%c%c", 226, 128, 169)
  }
  FILENAME == ARGV[1] {
    sub(/\r$/, "")
    if ($0 == "") next
    if (NF != 2 || $1 !~ /^[a-zA-Z_$][a-zA-Z0-9_$]*$/ ||
        $2 !~ /^[a-zA-Z_][a-zA-Z0-9_]*$/) {
      invalid = 1
      exit 1
    }
    value = ENVIRON[$2]
    if (value != "") {
      keys[++count] = $1
      values[count] = (value == "true" || value == "false") ? value : js_string(value)
    }
    next
  }
  $0 == "// BEGIN MODELINGWEB ENV OVERRIDES" { generated = 1; next }
  $0 == "// END MODELINGWEB ENV OVERRIDES" { generated = 0; next }
  !generated { print }
  END {
    if (invalid) exit 1
    if (count) {
      print "// BEGIN MODELINGWEB ENV OVERRIDES"
      print ";Object.assign(window.Environment, {"
      for (i = 1; i <= count; i++) {
        printf "  %s: %s%s\n", js_string(keys[i]), values[i], (i < count ? "," : "")
      }
      print "});"
      print "// END MODELINGWEB ENV OVERRIDES"
    }
  }
' /environment.config "$environment_file" > "$environment_temp"
chmod 0644 "$environment_temp"
mv -f "$environment_temp" "$environment_file"
trap - EXIT

nginx -g "daemon off;"
