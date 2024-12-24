import { DataTypes } from "sequelize";
import db from "../../config/db";

const User = db.define('user',{ 
	id:{
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	txt_nombres: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	txt_primer_apellido:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	txt_segundo_apellido:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	txt_domicilio:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	txt_email:{
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	txt_lat:{
		type: DataTypes.STRING,
		allowNull: true
	},
	txt_lng:{
		type: DataTypes.STRING,
		allowNull: true
	}
})

export default User;