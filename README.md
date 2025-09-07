# Share-e-care Frontend

<p>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
</p>

## Requirements

## Versions

```sh
node - 16.17.0
npm - 8.15.0
```

## Documentation

-   [Installation](#installation)
-   [Usage and command line options](#usage-and-command-line-options)
-   [Running Test Cases](#running-test-cases)

## Installation

## Usage and command line options

```sh
npm install
## or
yarn
```

<p>
  <a href="http://localhost:8000">
  </a>
</p>

## Before comminting the changes to git

1. run `yarn prettify`
2. run `yarn format`

### NOTE: For git

For modifiying and pushing your changes to git follow the steps

1. Create and checkout to a new branch `git branch <your-name>/<feature-name>` (create this if not created a new branch)
2. Checkout to new branch `git checkout <your-name>/<feature-name>`
3. Do the changes to your files
4. Check status of your changes `git status`
5. Now add the changes to repo `git add <files>`
6. Then commit your changes (commit should be in the following format)
   a. For adding new features `git commit -m "feat: Your message about the commit"`
   b. For bug fixing `git commit -m "fix: Your message about the commit"`
7. At last push your changes to git `git push <your-name>/<feature-name>`. Do not push to any other branch.
8. Once you push your changes go to github and create a pull request from '<your-name>/<feature-name>' to 'develop'. Do not create a pull request to any other branch
9. Next time when you start modifying the files do take pull first `git pull` and then start modifying the files. Never start working without taking pull.
