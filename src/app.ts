import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = 4000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the parking land API');
});

app.post('/stores', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const store = await prisma.store.create({
            data: {
                name: req.body.name,
                address: req.body.address,
                capacity: req.body.capacity,
            },
        });
        res.json(store);
    } catch (err) {
        next(err);
    }
});

app.get('/cars', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cars = await prisma.car.findMany();
        res.json(cars);
    } catch (err) {
        next(err);
    }
});

app.post('/cars', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = await prisma.car.create({
            data: {
                carPlate: req.body.carPlate,
                type: req.body.type,
                store: {
                    connect: {
                        id: parseInt(req.body.storeId),
                    },
                },
            },
        });
        res.json(car);
    } catch (err) {
        next(err);
    }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
