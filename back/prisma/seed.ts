import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.weeklySchedule.deleteMany();
    await prisma.venue.deleteMany();

    await prisma.venue.create({
        data: {
        id: 'loc-001',
        name: 'La Cité des Sciences',
        street: '30 Avenue de la République',
        postalCode: '75001',
        city: 'Paris',
        country: 'France',
        weeklySchedule: {
            create: [
            { day: 'tuesday', startTime: '09:00', endTime: '17:00' },
            { day: 'wednesday', startTime: '09:00', endTime: '17:00' },
            { day: 'thursday', startTime: '09:00', endTime: '17:00' },
            { day: 'friday', startTime: '09:00', endTime: '17:00' },
            { day: 'saturday', startTime: '09:00', endTime: '17:00' },
            { day: 'sunday', startTime: '09:00', endTime: '17:00' }
            ]
        }
        }
    });

    await prisma.venue.create({
        data: {
        id: 'loc-002',
        name: 'La Cité des Arts',
        street: '30 Avenue des arts',
        postalCode: '75001',
        city: 'Paris',
        country: 'France',
        weeklySchedule: {
            create: [
            { day: 'monday', startTime: '09:00', endTime: '17:00' },
            { day: 'tuesday', startTime: '09:00', endTime: '17:00' },
            { day: 'wednesday', startTime: '09:00', endTime: '17:00' },
            { day: 'thursday', startTime: '09:00', endTime: '17:00' },
            { day: 'friday', startTime: '09:00', endTime: '17:00' },
            { day: 'saturday', startTime: '09:00', endTime: '17:00' },
            { day: 'sunday', startTime: '09:00', endTime: '17:00' }
            ]
        }
        }
    });
}

main()
    .then(() => console.log('Seed done.'))
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
