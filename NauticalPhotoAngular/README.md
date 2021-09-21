# NauticalPhotoAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.5.

## More General Info
The angular frontend uses a mix of material ui and bootstrap for the styling, along with some other custom stylesheets. Unfortunately, there is a lot of inline styling but that's life I suppose. It will be removed in further interations.

The photo uploading portion of the application is handled by the photo-uploader service, which communicates with the express server.
This route is among the other ones that is protected via the passport function on the backend. The token bearer is sent via the auth interceptor, to be consumed on the backend.
Further explanation of the auth is found in the backend folder.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
