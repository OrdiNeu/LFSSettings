module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "auto-import"
    ],
    "rules": {
        "react/jsx-uses-react": "error",
        "auto-import/auto-import": [2, {
            "rootPath": "./src",
            "packages": {
              "d3": "d3",
              "bloodhound": "Bloodhound",
              "moment": "moment",
              "alkali": {
                "hasExports": "module-path/to/alkali"
              },
              "dgrid": {
                "modulesIn": "./bower_components/dgrid"
              },
              "dstore": {
                "modulesIn": "./bower_components/dstore"
              }
            }
          }]
    }
};