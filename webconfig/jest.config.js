const path = require("path");

module.exports = {
    clearMocks: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
    coverageDirectory: "coverage",
    moduleFileExtensions: ["js", "json", "jsx"],
    moduleDirectories: ["node_modules"],
    moduleNameMapper: {
        "^_src(.*)$": "<rootDir>/src/$1",
    },
    rootDir: path.join(__dirname, ".."),
    setupFiles: ["<rootDir>/config/jest.setup.js"],
    testEnvironment: "enzyme",
    testPathIgnorePatterns: ["\\\\node_modules\\\\"],
    testMatch: [path.join(__dirname, "../**/?(*.)+(spec|test).[tj]s?(x)")],
    testURL: "http://localhost",
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",
        // eslint-disable-next-line
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/config/assetsTransformer.js",
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    verbose: false,
};
