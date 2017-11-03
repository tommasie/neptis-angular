// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    unprotectedUrl: "http://localhost:9070/",
    apiUrl: "http://localhost:9070/api/admin/",
    firebase: {
        apiKey: "AIzaSyB_Ia57LlkZTjjzfEAse0XQaN35XOvxQak",
        authDomain: "android-app-152db.firebaseapp.com",
        databaseURL: "https://android-app-152db.firebaseio.com",
        projectId: "android-app-152db",
        storageBucket: "android-app-152db.appspot.com",
        messagingSenderId: "274641228836"
    }
};
