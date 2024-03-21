# eʟᴏᴄuent

Node.js script to analyze lines of code in a (smallish) codebase and generate a CSV with stats about each line.
It works by running `git blame`, then parsing the output.

Originally written as a package for students of MIT’s Interactive visualization & Society course to use in one of the labs,
so it’s not very robust or flexible in the general case, but PRs are welcome.

## Usage

Use all defaults:
```bash
npx eloquent
```

Options:

| Option | Description | Default |
| --- | --- | --- |
| `-i`, `--input` | Glob pattern for input files |  |
| `-o`, `--output` | Output file | `loc.csv` |
| `-d`, `--dir` | Comma-separated list of directories to search. **Will be ignored if `-i`/`--input` is present.** | `src` |
| `-t`, `--types` | Comma-separated list of file types to search. **Will be ignored if `-i`/`--input` is present.** | `html,css,js,svelte` |
| `-s`, `--spaces` | If using spaces for indentation, number of spaces to use | `false` (use tabs) |
| `-h`, `--help` | Show help |  |

## CSV Metadata

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