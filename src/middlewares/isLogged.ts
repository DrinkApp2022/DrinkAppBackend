import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string;
}


export function isLogged(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization
    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(' ')

    try {
        const { sub } = verify(token, '1462836313de701c540c1604fdbf7682') as IPayload
        request.user_id = sub;
        return next();
    } catch (err) {
        return response.status(401).end();
    }


}