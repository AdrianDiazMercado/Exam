import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export class ValidationDto {
  static async validateDto<T extends object>(dtoClass: new () => T, data: object, groups: string[] = []): Promise<any> {
    const dtoInstance = plainToInstance(dtoClass, data);

    const errors: ValidationError[] = await validate(dtoInstance, {
      groups: groups,
    });

    // Si hay errores, formatearlos
    if (errors.length > 0) {
      const validationError = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));

      return {
        code: 400,
        success: false,
        errors: validationError.map((r) => ({
          campos: [r.property, { errores: r.constraints }],
        })),
      };
    }
    
    // Si no hay errores, retornar un éxito
    return null;
  }
}
