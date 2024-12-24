import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsNotEmpty, Min, IsOptional, } from "class-validator";

const TrimTransform = () =>
  Transform(({ value }) => (typeof value === "string" ? value.trim() : value));

export  {
  //Decoradore
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  //Funciones con decoradores
  TrimTransform
};
