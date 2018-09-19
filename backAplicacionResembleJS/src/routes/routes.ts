import { Request, Response } from 'express';

export class Routes {       
    public routes(app) {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'Ready to go'
            });
        });

        app.route('/reports')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Ready to go'
            });
        })
        .post((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Ready to go'
            });
        });
    }
}
