import { IsString, IsEnum, IsOptional, IsDate, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly author: string;

  @IsEnum(['lido', 'lendo', 'quero_ler'], { message: 'Status deve ser lido, lendo ou quero_ler' })
  readonly status: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly endDate?: Date;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating?: number;
}