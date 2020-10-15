/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP
        || process.env.ip
        || undefined,

    // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT
        || process.env.PORT
        || 8080,

    sequelize: {
        uri: process.env.SEQUELIZE_URI
            || 'mysql://enterouat:admin123@enterouat.cw1sljwnj79b.ap-south-1.rds.amazonaws.com:3306/entero_bitool',
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
    }
};
