# eslint-plugin-prod

plugin for production project

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-prod`:

```sh
npm install eslint-plugin-prod --save-dev
```

## Usage

Add `prod` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "prod"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "prod/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


# eslint-plugin-prod
