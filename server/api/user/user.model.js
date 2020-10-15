import crypto from 'crypto';

var validatePresenceOf = function (value) {
    return value && value.length;
};

export default function (sequelize, DataTypes) {
    const User = sequelize.define('Users', {
        userid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,     //autoincrement and primarykey is used because default id was applying
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING
        },
        usertitle: {
            type: DataTypes.STRING
        },
        customerId: {
            type: DataTypes.INTEGER
        },
        userroletypeid: {
            type: DataTypes.INTEGER
        },
        company_id: {
            type: DataTypes.INTEGER
        },
        emailid: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        createdon: {
            type: DataTypes.DATE
        },
        createdby: {
            type: DataTypes.INTEGER
        },
        modifiedon: {
            type: DataTypes.DATE
        },
        modifiedby: {
            type: DataTypes.INTEGER
        },
        active: DataTypes.INTEGER
    }
    );
    return User;
}
