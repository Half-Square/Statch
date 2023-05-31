/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 13:04:59                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-31 15:00:51                               *
 *****************************************************************************/

module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "tsconfigRootDir": __dirname,
    "sourceType": "module",
  },
  "plugins": ["@typescript-eslint/eslint-plugin"],
  "extends": [
    "plugin:@typescript-eslint/recommended"
  ],
  "root": true,
  "env": {
    "node": true,
    "jest": true,
  },
  "ignorePatterns": [".eslintrc.js", "**/*.spec.ts", "**/*.*-spec.ts"],
  "rules": {
    "camelcase": [
      "error",
      {
        "allow": [
          "^is_",
          "^on_",
          "^get_",
          "^on",
          "^is",
          "^get",
          "^st_",
          "^st"
        ]
      }
    ],
    "semi": [
      "error",
      "always"
    ],
    "semi-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "brace-style": [
      "error"
    ],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "comma-dangle": [
      "error",
      "never"
    ],
    "prefer-const": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "space-before-function-paren": [
      "error",
      "never"
    ],
    "quotes": [
      "error",
      "double",
      {
        "allowTemplateLiterals": true
      }
    ],
    "indent": [
      "error",
      2,
      {
        "ignoredNodes": [
          "JSXElement",
          "JSXOpeningElement"
        ]
      }
    ],
    "max-len": [
      "error",
      {
        "code": 90,
        "ignoreComments": true,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignorePattern": "^\\s*var\\s.+=\\s*require\\s*\\(",
        "ignoreStrings": true
      }
    ],
    "max-depth": [
      "error",
      4
    ],
    "max-nested-callbacks": [
      "error",
      3
    ],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "function",
        "format": [
          "PascalCase",
          "camelCase"
        ]
      },
      {
        "selector": [
          "class",
          "interface"
        ],
        "format": [
          "PascalCase"
        ]
      }
    ]
  }
};
