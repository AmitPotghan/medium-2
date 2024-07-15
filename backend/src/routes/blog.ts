import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogPost,updateBlogPost } from "@amitpotghan/medium";
export const blogRouter = new Hono<({
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
        userId:string
    }
})>;

blogRouter.use("/*", async (c, next) => {
    try {
        const jwt = c.req.header("authorization") || "";
        console.log(jwt)
        if (!jwt) {
            c.status(401);
            return c.json({
                ERROR: "UnAuthorized Access Detected"
            })
        }
        const token = jwt.split(' ')[1];
        console.log("Token :",token)
        const payload = await verify(token, c.env.JWT_SECRET);
        if (!payload) {
            c.status(401);
            return c.json({
                ERROR: "UnAuthorized Access Detected"
            })
        }
        (c as any).set('userId', payload.id);
        await next();
    }catch(e){
        return c.json({
            ERROR:c,
            msg:"You are not loged In"
        })
    }
})
blogRouter.post('/', async (c) => {
    try{
        const body = await c.req.json();
        let {success} = createBlogPost.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                msg:"Invalid Inputs"
            })
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        
        const userId = c.get('userId')
        const res = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        return c.json({
            id: res.id
        })
    }catch(e){
        return c.json({
            msg:"Server Error"
        })
    }
})
blogRouter.put('/', async (c) => {
    try{
        const body = await c.req.json();
        let {success} = updateBlogPost.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                msg:"Invalid Inputs"
            })
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
    
        const userId = c.get('userId')
        const res = await prisma.post.update({
            where:{
                id:body.id,
                authorId:userId,
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.json({
            id: res.id
        })
    }catch(e){
        return c.json({
            msg:"Server Error"
        })
    }
})
blogRouter.put('/likes',async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    
        const body = await c.req.json();
        const userId = c.get('userId');
        //find a like exist for user and specific post
        const isExist = await prisma.like.findFirst({
            where:{
                userId:userId,
                postId:body.postId
            }
        })
        if(isExist){
            //user want to dislike the post
            const res = await prisma.post.update({
                where:{
                    id:body.postId
                },
                data:{
                    likes:{
                        decrement:1
                    }
                }
            })
            const likeRes = await prisma.like.delete({
                where:{
                    id:isExist.id
                }
            })
        }else{
            //if user has not already liked a post or want to liked a post
            const res = await prisma.post.update({
                where:{
                    id:body.postId
                },
                data:{
                    likes:{
                        increment:1
                    }
                }
            })
            const likeRes = await prisma.like.create({
                data:{
                    postId:body.postId,
                    userId:userId
                }
            })
        }
        return c.json({
            msg:"Updated status of Like"
        })
        
    }
    catch(error){
        console.log(error);
        c.status(500);
        return c.json({
            msg:"Internal Server Error"
        })
    }
})
blogRouter.get('/bulk',async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    
        const blogs = await prisma.post.findMany({
            select:{
                id:true,
                title:true,
                content:true,
                likes:true,
                createdAt:true,
                author:{
                    select:{
                        name:true
                    }
                },
                likedBy:{
                    where:{
                        userId:c.get('userId')
                    },
                    select:{
                        userId:true
                    }
                }
            }
            
        })
        c.status(200);
        return c.json({
            blogs
        })
    }catch(e){
        c.status(500);
        c.json({
            msg:"Internal Server Error"
        })
    }
})
blogRouter.get('/:id',async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    
        const id = c.req.param('id');
        const res = await prisma.post.findUnique({
            where:{
                id:id
            },
            include:{
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json(res);
    }catch(e){
        return c.json({
            msg:"Internal Server Error"
        })
    }
})
