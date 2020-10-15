/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

    // Sequelize connection options
    sequelize: {
        //  uri: 'mysql://enterouat:admin123@enterodev.cw1sljwnj79b.ap-south-1.rds.amazonaws.com:3306/smartpractixuat',
        //  uri: 'mysql://enterouat:admin123@enterodev.cw1sljwnj79b.ap-south-1.rds.amazonaws.com:3306/smartpractixuat_copy', 
        //  uri: 'mysql://enterouat:admin123@enterodev.cw1sljwnj79b.ap-south-1.rds.amazonaws.com:3306/smartpractixuat_copy', 
        // uri: 'mysql://usertechno:admin!123@enterodev.cw1sljwnj79b.ap-south-1.rds.amazonaws.com:3306/technoerp',
        //  uri: 'mysql://enterouat:admin123@enterodev.cw1sljwnj79b.ap-south-1.rds.amazonaws.com:3306/entero_gs',
        uri: 'mysql://enterouat:admin123@enterouat.cw1sljwnj79b.ap-south-1.rds.amazonaws.com:3306/entero_bitool',
        options: {
            logging: false,
            operatorsAliases: false,
            define: {
                timestamps: false
            }

        },
        dialectOptions: {
            requestTimeout: 0
        }
    },

    // Seed database on startup
    seedDB: false,
};
