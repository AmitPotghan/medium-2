import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { z } from "zod"
import { sign } from "hono/jwt"
import {userSignUpBody,userSignInBody} from "@amitpotghan/medium"

export const userRouter = new Hono<({
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
})>;


userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        let result = userSignUpBody.safeParse(body);
        if (!result.success) {
            c.status(411);
            return c.json({
                msg: "Invalid inputs"
            })
        }
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })
        const token = await sign({id:user.id}, c.env.JWT_SECRET);
        return c.json({
            msg:"signUp Successfull",
            token: token
        })
    }catch(e){
        console.log("ERROR:"+e);
        return c.json({
            msg:"ERROR",
            error:e
        })
    }
})
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        let result = userSignInBody.safeParse(body);
        if (!result.success) {
            c.status(411);
            return c.json({
                msg: "Invalid inputs"
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
            }
        })
        if(!user){
            c.status(403);
            return c.json({
                msg:"User Not Found"
            })
        }
        const token = await sign({id:user.id}, c.env.JWT_SECRET);
        return c.json({
            msg:"SignIN Successfully",
            token: token
        })
    }catch(e){
        console.log("ERROR:"+e);
        return c.json({
            msg:"ERROR",
            error:e
        })
    }
})
