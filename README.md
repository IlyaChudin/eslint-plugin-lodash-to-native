# eslint-plugin-lodash-to-native

## Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
npm i -D eslint
```

Next, install `eslint-plugin-lodash-to-native`:

```bash
npm i -D https://github.com/IlyaChudin/eslint-plugin-lodash-to-native.git
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-lodash-to-native` globally.

## Usage

Add `lodash-to-native` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["lodash-to-native"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "lodash-to-native/map": 1
  }
}
```

## Supported Rules

- map
