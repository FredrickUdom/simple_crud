import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { blogDto } from 'src/dto/blog.dto';
import { blogEntity } from 'src/entity/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(blogEntity) private blogRepository:Repository<blogEntity>){}

    // CREATE A POST
    async createBlog(payload):Promise<{statusCode:number,message:string, info:blogEntity}>{
       const data = await this.blogRepository.save(payload);
        return{
            statusCode: 201,
            message: 'successfully created',
            info:data,
        }
    }
    
    //GET ALL POST

    async getAll():Promise<blogEntity []>{
        return await this.blogRepository.find()
    }

    //FIND BY ID

    async findById(id:number):Promise<blogEntity>{
        const find = await this.blogRepository.findOne({where:{id:id}})

        if(!find){
            throw new HttpException('sorry no such id found', 404)
        }
        return find;
    }

    // UPDATE POST
    async updatePostById(id:number, payload:blogDto){
        const findPost = await this.blogRepository.findOneBy({id})
        if(!findPost){
            throw new HttpException(' sorry no such post with Id found to update', 400)
        }
        const info = await this.blogRepository.update(id, payload)
        return{
            statusCode: 201,
            message: 'successfully updated please proceed to database',
        }
    }

    // DELETE BY ID
    async deletePostById(id:number){
        const findId = await this.blogRepository.findOne({where:{id:id}});
        if(!findId){
            throw new HttpException(' sorry no such post with Id found to delete', 400)
        }
        const deleteid = await this.blogRepository.delete(id)
        return{
            statusCode: 200,
            message: 'successfully deleted please proceed to database',
        }
    }
}
