import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    await prisma.slot.deleteMany()
    await prisma.calendar.deleteMany()
    await prisma.venue.deleteMany()
    await prisma.hostedEvent.deleteMany()
    await prisma.user.deleteMany()

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

    const hashedPassword = await bcrypt.hash('qwerty', 10);


    await prisma.user.create({
        data: {
            id: 'usr-001',
            firstname: 'Alice',
            lastname: 'Smith',
            email: 'alice@example.com',
            password: hashedPassword,
            role: 'organizer'
        }
    });

    await prisma.hostedEvent.createMany({
        data: [
            {
                id: 'evt-001',
                name: 'Conférence sur l’IA',
                description: 'Une conférence sur l’intelligence artificielle appliquée à la santé.',
                organizerId: 'usr-001',
                status: 'scheduled',
                startDate: new Date('2025-09-20T09:00:00'),
                endDate: new Date('2025-09-20T17:00:00'),
                venueId: 'loc-001',
                capacity: 200,
                price: 49.99
            },
            {
                id: 'evt-002',
                name: 'Atelier Design Thinking',
                description: 'Atelier pratique pour apprendre à résoudre les problèmes par l’innovation.',
                organizerId: 'usr-001',
                status: 'scheduled',
                startDate: new Date('2025-09-22T10:00:00'),
                endDate: new Date('2025-09-22T16:00:00'),
                venueId: 'loc-002',
                capacity: 100,
                price: 29.5
            },
            {
                id: 'evt-003',
                name: 'Journée de la robotique',
                description: 'Expositions, démonstrations et conférences autour des robots modernes.',
                organizerId: 'usr-001',
                status: 'published',
                startDate: new Date('2025-10-01T08:30:00'),
                endDate: new Date('2025-10-01T18:00:00'),
                venueId: 'loc-001',
                capacity: 300,
                price: 0
            }
        ]
    });


}

main()
    .then(() => console.log('Seed done.'))
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
