# Front-end React Components Demo

This project holds some front-end components.
These React components are used by manually pasting bundled JS files as `<script>` tags in the needed server side template.

## Libraries Used with React
- Material-UI (Pre-built components)
- Formik (Form templates)
- Yum (Field Validation)
- Axios (AJAX requests along with native fetch() API)
- Webpack for bundling JS files and resources
- Babel for JSX transpilation to JS

## Integration with Apache Sling
Sling's starter launchpad application was used to kickstart FE devleopment. When the running instance is accessed over WebDav, the jsp/esp files that Sling uses to serve a page are accessible. The idea for now was to manually embed a pre-bundled js file using a `<script>` tag on the jsp page. For now, the JS bundling is done _separately_ and locally by the dev with Webpack. The bundled js is then copied over into the needed place in Sling's WebDav directory. Bundling is being used instead of individual CDN calls as depdency management and ordering for JS libraries gets messy with many `<script>` on one jsp. Using many CDN scripts on the JSP directly also led to non-standard React code, in browser jsx transpilation, etc. 

This is unlike Single Page Applications that one maybe familiar with when using `create-react-app`. It might be possible to use Sling as just a back-end REST api and have a completely separate project for front-end (no more JSPs). With this option, all url routing would be done through the FE React. 

Another alternative is to figure out an implementation with https://github.com/eirslett/frontend-maven-plugin. This lets the JS bundling happen during a build with mvn. There are examples with a Spring backend. 

## Getting Started
To view the components with Sling Starter:
- Get the Sling Starter app up and running
- Clone this repository
- Connect to WebDav and paste the contents of this repo's `SlingWebDav/` folder into the root folder seen over WebDav. Overwrite as needed.
Going to localhost:8080 should now give you the new homepage.

Development:
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

- Bundles js files are in the dist folder. Open up the sling starter application and paste into: TODO: some directory, reorg files
