import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { blogDto } from 'src/dto/blog.dto';

@Controller()
export class BlogController {
    constructor(private blogService:BlogService){}

    @Post('create')
    async blogPost(@Body()payload:blogDto){
        return await this.blogService.createBlog(payload)
    }

    //GET ALL
    @Get('getall')
    async findAll(){
        return await this.blogService.getAll()
    }

    //FIND ON BY ID
    @Get('/:id')
    async getId(@Param('id')id){
        return await this.blogService.findById(id)
    }

    // UPDATE BY ID
    @Put(':id')
    async updatePost(@Param('id')id:number, @Body()payload:blogDto){
        return await this.blogService.updatePostById(id,payload)
    }

    // DELETE BY ID 
    @Delete('/:id')
    async deletePost(@Param('id')id:number){
        return await this.blogService.deletePostById(id)
    }
}
