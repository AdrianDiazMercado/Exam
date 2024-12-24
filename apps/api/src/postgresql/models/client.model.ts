import { DataTypes } from "sequelize";
import db from "../../config/db";

const Client = db.define('client',{
	id:{
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	txt_nombre:{
		type:DataTypes.STRING,
		allowNull:false,
	},
	txt_email:{
		type:DataTypes.STRING,
		allowNull:false,
	},
	txt_password:{ 
		type:DataTypes.STRING,
		allowNull:false,
	}
 })
 export default Client