import { IsNotEmpty, IsString } from "class-validator";

export class blogDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty({message: 'please this should not be left empty'})
    author: string
}