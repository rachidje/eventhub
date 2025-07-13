import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.venue.deleteMany(); // plus de weeklySchedule à supprimer

    await prisma.venue.create({
        data: {
            id: 'loc-001',
            name: 'La Cité des Sciences',
            street: '30 Avenue de la République',
            postalCode: '75001',
            city: 'Paris',
            country: 'France',
            weeklySchedule: {
                tuesday: [{ start: '09:00', end: '17:00' }],
                wednesday: [{ start: '09:00', end: '17:00' }],
                thursday: [{ start: '09:00', end: '17:00' }],
                friday: [{ start: '09:00', end: '17:00' }],
                saturday: [{ start: '09:00', end: '17:00' }],
                sunday: [{ start: '09:00', end: '17:00' }]
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
                monday: [{ start: '09:00', end: '17:00' }],
                tuesday: [{ start: '09:00', end: '17:00' }],
                wednesday: [{ start: '09:00', end: '17:00' }],
                thursday: [{ start: '09:00', end: '17:00' }],
                friday: [{ start: '09:00', end: '17:00' }],
                saturday: [{ start: '09:00', end: '17:00' }],
                sunday: [{ start: '09:00', end: '17:00' }]
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
