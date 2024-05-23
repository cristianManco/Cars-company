import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema({timestamps:true})
export class Cars extends Document {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    type: string;

    @Prop({required: true})
    color: string;


    @Prop({required: true})
    year: number;


    @Prop({required: true})
    price: number;


    @Prop({required: true})
    description: string;


    @Prop({required: true})    
    image: string;
  
}

export const CarsSchema = SchemaFactory.createForClass(Cars);