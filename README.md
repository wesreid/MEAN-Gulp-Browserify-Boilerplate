# MEAN - Gulp - Browserify
Boilerplate for Node-style, CommonJS-based development across Node and Angular. SASS/SCSS-enabled by default.

## Get Started
```
git clone https://github.com/wesreid/MEAN-Gulp-Browserify-Boilerplate.git ./YourAppName
cd ./YourAppName
npm install
```
> NOTE - you may need sudo if you do not have write permissions to your local .npm directory

``` javascript
gulp run
```

> Optional for Nginx - OSX Only

```
cd setup
./setup.sh your-local-domain.com
```

> This will:
> - `brew install nginx`
> - create a config for the virtual host
> - create an entry in your local hosts file
> - start nginx

## SASS/SCSS
The root Sass file is `/scss/main.scss`. Each angular feature module in `public/js/ng` contains it's own scss directory. This allows the angular feature modules to be self-contained. To include these files into the CSS bundle, simply include their filename in `/scss/main.scss`. During the gulp build, the paths to these sass files will be resolved by the `/lib/SassIncludePaths` middleware.

