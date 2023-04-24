const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const store = await prisma.store.create({
        data: {
            name: 'My Store',
            address: '123 Main St',
            capacity: 100
        }
    })

    const car = await prisma.car.create({
        data: {
            carPlate: 'ABC 123',
            type: 'Small Car',
            storeId: store.id
        }
    })

    console.log(store)
    console.log(car)
}


main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    });