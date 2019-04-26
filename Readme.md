# Front-end React Components Demo

This project holds some fornt-end components.

## Libraries Used with React
- Material-UI (Pre-built components)
- Formik (Form templates)
- Yum (Field Validation)
- Axios (AJAX requests along with native fetch() API)
- Webpack for bundling JS files and resources
- Babel for JSX transpilation to JS

Transpilation into JS is achieved with Babel and Webpack was used as a bundler.

## Integration with Apache Sling
The starter launchpad application was used to kickstart devleopment. Sling supports multiple templating engines. The starter served html using esp and jsp pages. The idea fonow was to embed the js file as one bundle onto the jsp page. Bundling is being used instead of individual CDN calls as depdency management and ordering for JS libraries is not readable with multiple `<script>`. This is unlike Single Page Applications that one maybe familiar with when using `create-react-app`.

## Getting Started
There are sufficient tutorials online but here is a brief overview:
- Install a text editor for JS development. I personally use VSCode with plugins (described later). If a license can be obtained, IDEs such as WebStorm are also an option.
- Install Node.js which is a JavaScript Runtime Environment. Instructions will be dependent on your operating system. 
    - The package manager, NPM should be installed with it. Ensure that `npm -v` gives version `5.4.2` or above and `npx -v` returns at least version `9.6.0`. For Ubuntu, you might encounter issues of bad npm versions, Stackoverflow will be your friend.
    - NPM was used soely because it was popular, yarn is indeed a valid alternative package manager so you'll need to generate your own `yarn.lock` file.
- Clone this repository
- cd into the directory (important)
- Run the following:
- `npm install`
- TODO: Test the above. If it does not work for some reason (save-dev adds to the dependency list in `package.json`):
- `npm install --save-dev @material-ui/core`
- `npm install --save-dev @material-ui/icons`
- `npm install --save-dev formik` etc. Look them up.
- The `node_modules` folder should be populated with those libraries and their required dependencies. 
- Entry points for bundler are defined in `webpack-config.js`

- Bundles js files are in the dist folder. Open up the sling starter application and past into: TODO: some directory, reorg files