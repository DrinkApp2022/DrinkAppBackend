import { Request, Response, NextFunction } from "express"



export async function isAdmin(request: Request, response: Response, next: NextFunction) {

    const { user_id } = request
	console.log(user_id)


    // return response.status(401).json({
    //     error: "Unauthorized!!"
    // })
}