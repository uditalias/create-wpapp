# create-wpapp
## A dead-simple webpack starter project generator


A new UI framework just came out, a new library, a new tool.. you want to test it but you need to config webpack in order to start.. 😤

There's lots of webpack app generators, but this one won't make you cry.

Like `create-react-app` which is awesome but very opinionated.. have you tried adding something to the `webpack.config.js` file? I know.. you must `eject` everything in order to do so.

What if all I want to do is just write my code!

- You want `babel` to transform your ES6 code? OK!
- You want TypeScript instead? OK!
- You want `react`? OK!
- You want to style your app with css? OK!
- You want to work with SCSS preprocessor? OK!!!

I put all my opinions aside and focus in simplicity.. and guess what? you don't need to eject anything in order to edit/add/remove something so you can just start to write your code! **THAT'S - IT!**


### Install?

`npm install -g create-wpapp`

### How it works?

```
$ mkdir project
$ cd project
$ create-wpapp

? What is your app name? webpack-starter
? Select dev server port: 3001
? Choose app type: TypeScript
? Are you going to use React in your app? Yes
? Are you going to use css in your app? Yes
? Do you want to use SCSS preprocessor? Yes
? What is your name? Udi Talias
? What is your email? udi.talias@gmail.com
Creating a new webpack app in /Users/udidu/project...
...
All Done.
Run npm start to start the dev server
```

This will create a webpack project with dev server hmr in the following structure:

```
/project
    |- node_modules
    |- src
        |- style
            |- main.{css,scss}      // Based on your selection
        |- app.{js,ts,tsx}          // Based on your selection
    |- views
        |- index.html
    |- .gitignore
    |- package.json
    |- webpack.config.js
    |- tsconfig.json                // For a TypeScript project

```

Just run `npm start` to start the dev server.


### Contribute?

Just fork, do what you want and [create pull request](https://github.com/uditalias/create-wpapp/compare?expand=1).

### Issue?

Just [open one](https://github.com/uditalias/create-wpapp/issues/new).



This tool will evolve from time to time... I know it's very simple but tests and more options will be added to the setup process so you can choose (or not) what you want in your **dead simple webpack project!**