import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = 4000;

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the parking land API');
});
// store
app.get('/stores', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stores = await prisma.store.findMany();
        res.json(stores);
    } catch (err) {
        next(err);
    }
});


app.get('/stores/:storeId/cars', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const cars = await prisma.car.findMany({
          where: {
              storeId: Number(req.params.storeId),
          },
      });
      res.json(cars);
  } catch (err) {
      next(err);
  }
});

app.post('/stores/:storeId/cars', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { carPlate, type } = req.body;
      const storeId = Number(req.params.storeId);
      const store = await prisma.store.findUnique({
          where: { id: storeId },
      });
      if (!store) {
          return res.status(404).json({ message: `Store with ID ${storeId} not found` });
      }
      const car = await prisma.car.create({
          data: {
              carPlate: carPlate,
              type: type,
              storeId: storeId,
          },
      });
      res.json(car);
  } catch (err) {
      next(err);
  }
});

app.delete('/stores/:storeId/cars/:carId', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const storeId = Number(req.params.storeId);
      const carId = Number(req.params.carId);
      const car = await prisma.car.findFirst({
          where: {
              id: carId,
              storeId: storeId,
          },
      });
      if (!car) {
          return res.status(404).json({ message: 'Car not found in the store.' });
      }
      await prisma.car.delete({
          where: {
              id: carId,
          },
      });
      return res.json({ message: 'Car deleted successfully.' });
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
