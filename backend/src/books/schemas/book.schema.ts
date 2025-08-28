import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ enum: ['lido', 'lendo', 'quero_ler'], default: 'quero_ler', required: true })
  status: string;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;

  @Prop({ min: 1, max: 5 })
  rating?: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);