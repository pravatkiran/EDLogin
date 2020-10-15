/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

import sqldb from '../sqldb';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
    if(!config.seedDB) {
        return Promise.resolve();
    }

    let Thing = sqldb.Thing;
    let User = sqldb.User;

    let promises = [];

    let thingPromise = Thing.destroy({ where: {} })
        .then(() => Thing.bulkCreate([{
            name: 'Development Tools',
            info: 'Integration with popular tools such as Webpack, Babel, TypeScript, Karma, Mocha, ESLint, Protractor, '
                    + 'Pug, Stylus, Sass, and Less.'
        }, {
            name: 'Server and Client integration',
            info: 'Built with a powerful and fun stack: MongoDB, Express, Angular, and Node.'
        }, {
            name: 'Smart Build System',
            info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of '
                    + 'scripts and styles into your app.html'
        }, {
            name: 'Modular Structure',
            info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
        }, {
            name: 'Optimized Build',
            info: 'Build process packs up your templates as a single JavaScript payload, minifies your '
                      + 'scripts/css/images, and rewrites asset names for caching.'
        }, {
            name: 'Deployment Ready',
            info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
        }]))
        .then(() => console.log('finished populating things'))
        .catch(err => console.log('error populating things', err));
    promises.push(thingPromise);

    let userPromise = User.destroy({ where: {} })
        .then(() => User.bulkCreate([{
            Login_Name: "Entero User",
            password: "pass",
            Full_Name: "Store",
            Mobile_No: "9876543210",
            EMail_Id: "admin@admin.com",
            GROUP_ID: 3,
            Active: 1,
            UserName: "admin"
        },{
            Login_Name: "Testing User",
            password: "pass",
            Full_Name: "Test Login",
            Mobile_No: "9876543210",
            EMail_Id: "admin@admin.com",
            GROUP_ID: 3,
            Active: 1,
            UserName: "testlogin"
        }])
            .then(() => console.log('finished populating users'))
            .catch(err => console.log('error populating users', err)));
    promises.push(userPromise);

    return Promise.all(promises);
}
