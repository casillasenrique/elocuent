# eLOCuent

Node.js script to analyze lines of code in a (smallish) codebase and generate a CSV with stats about each line.
It works by running `git blame`, then parsing the output.

The metadata stored in the CSV is:
- `file`: the file the line is from
- `line`: the line number
- `type`: The type of code (`"html"`, `"css"`, `"js"`, `"svelte"`). CSS and JS defined in Svelte files is recognized as HTML and CSS, so `"svelte"` is only used for the HTML in Svelte files.
- `commit`: The identifier *(SHA hash)* of the commit that last changed this line
- `date`, `time`, `timezone`: The date, time, and timezone respectively that the commit was made
- `datetime`: The full date and time (including timezone) in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
- `author`: The full name of the author of the last commit that changed this line. For your own website this will likely be your own name on every line.
- `depth`: the indentation level of the line
- `length`: the number of characters in the line after trimming (i.e. excluding whitespace at the start and end).