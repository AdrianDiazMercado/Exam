import {IsNumber, Min} from '../../../config/validation';
import { IdPayload } from "global-interfaces";
import { ValidationGroups } from "src/common/enum/groups.enum";

export class IdDto implements IdPayload{
	@IsNumber({
		allowNaN: true
	},{
		message: 'El id debe ser un número',
		groups: [ValidationGroups.READ]
	})
	@Min(0, { 
		message: 'El id no debe ser negativo',
		groups: [ValidationGroups.READ]
	})
	id!: number;
}