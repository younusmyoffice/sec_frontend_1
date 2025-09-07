module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [
        "eslint:recommended",
        "eslint-config-airbnb-base",
        "plugin:prettier/recommended",
        "jest-enzyme",
        "plugin:import/errors",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
    ],
    plugins: ["babel", "import", "jsx-a11y", "react", "prettier", "eslint-plugin-react-hooks"],
    parser: "@babel/eslint-parser",
    globals: {
        // TODO remove `node-fetch` module with node.js v18+ support
        // TODO file bug with eslint? those should be global now
        fetch: true,
        Headers: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        //* Avoid Bugs
        "no-undef": "error",
        semi: "error",
        "semi-spacing": "error",

        //* Best Practices
        eqeqeq: "warn",
        "no-invalid-this": "off",
        "no-return-assign": "error",
        "no-unused-expressions": ["error", { allowTernary: true }],
        "no-useless-concat": "error",
        "no-useless-return": "error",
        "no-constant-condition": "warn",
        "no-unused-vars": ["warn", { argsIgnorePattern: "req|res|next|__|_" }],

        //* Enhance Readability
        "no-mixed-spaces-and-tabs": "warn",
        "space-before-blocks": "error",
        "space-in-parens": "error",
        "space-infix-ops": "error",
        "space-unary-ops": "error",
        //
        "keyword-spacing": "error",
        "no-mixed-operators": "error",
        //
        "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
        "no-whitespace-before-property": "error",
        "object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],

        //* ES6
        "arrow-spacing": "error",
        "no-confusing-arrow": "error",
        "no-duplicate-imports": "error",
        "no-var": "error",
        "object-shorthand": "off",
        "prefer-const": "error",
        "prefer-template": "warn",

        camelcase: "off",
        "import/extensions": [
            "warn",
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
            },
        ],
        "import/no-dynamic-require": "off",
        "no-restricted-exports": "off",
        // "global-require": "off",
        "import/prefer-default-export": "off",
        "no-underscore-dangle": "off",
        "no-await-in-loop": "off",
        "no-restricted-syntax": "off",
        "no-return-await": "off",
        "no-console": "off",
        "no-plusplus": "off",
        "no-nested-ternary": "off",
        "no-multi-str": "off",
        "no-useless-catch": "off",
        "no-use-before-define": "off",
        "valid-typeof": "off",
        "new-cap": "off",
        "no-case-declarations": "off",
        "no-restricted-globals": "off",
        "no-prototype-builtins": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/media-has-caption": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",

        "linebreak-style": "off", // Don't play nicely with Windows.

        // "max-len": ["error", 100, 2, { ignoreUrls: true }], // airbnb is allowing some edge cases
        "no-alert": "off", // airbnb is using warn

        "no-param-reassign": "off", // Not our taste?
        radix: "off", // parseInt, parseFloat radix turned off. Not my taste.

        "react/require-default-props": "off", // airbnb use error
        "react/forbid-prop-types": "off", // airbnb use error
        "react/jsx-filename-extension": ["error", { extensions: [".js"] }], // airbnb is using .jsx

        // "prefer-destructuring": "off",

        "react/no-find-dom-node": "off", // I don't know
        "react/no-did-mount-set-state": "off",
        "react/no-unused-prop-types": "off", // Is still buggy
        "react/jsx-one-expression-per-line": "off",
        "react/no-unknown-property": "off",
        // "jsx-a11y/label-has-associated-control": "off",

        // "jsx-a11y/anchor-is-valid": ["error", { components: ["Link"], specialLink: ["to"] }],
        "jsx-a11y/label-has-for": [
            2,
            {
                required: {
                    every: ["id"],
                },
            },
        ], // for nested label htmlFor error

        "prettier/prettier": ["error"],
    },
};
