const bcrypt = require('bcrypt');


export default function (sequelize, DataTypes) {
    const User = sequelize.define('Users', {
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,     //autoincrement and primarykey is used because default id was applying
            primaryKey: true
        },
        username: DataTypes.STRING,
        fullname: DataTypes.STRING,
        customerid: DataTypes.INTEGER,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        active : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        roleid: DataTypes.INTEGER,
        role: DataTypes.STRING,
        createdon: {
            type: DataTypes.DATE
        },
        createdby: {
            type: DataTypes.STRING
        },
        modifiedon: {
            type: DataTypes.DATE
        },
        modifiedby: {
            type: DataTypes.INTEGER
        },
        profileimage: DataTypes.STRING
    }, {

        /**
         * Getters
         */
        getterMethods: {
            // for public
            profile: function(){
                return {
                    'name': this.username,
                    'role': this.role
                };
            },

            token: function(){
                return{
                    'userid': this.userid,
                    'role': this.role
                };
            }
        }
    }
    );
    return User;
}
