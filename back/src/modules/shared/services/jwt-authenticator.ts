import { IAuthenticator } from '@shared/application/ports/authenticator.interface';
import { IOrganizerRepository } from '@shared/application/ports/organizer-repository.interface';
import { TokenPayload } from '@shared/application/security/token-payload';
import jwt from 'jsonwebtoken';
import { User } from 'modules/user-management/domain/user.entity';

export class JwtAuthenticator implements IAuthenticator {
    constructor(
        private readonly jwtSecret: string,
        private readonly organizerRepository: IOrganizerRepository
    ) {}

    async authenticate(token: string): Promise<User> {
        try {
            const decoded = jwt.verify(token, this.jwtSecret) as TokenPayload;

            const user = await this.organizerRepository.findByEmail(decoded.email);

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (err) {
            if (err instanceof Error && err.message === 'User not found') {
                throw err;
            }

            if (err instanceof jwt.JsonWebTokenError) {
                throw new Error('Invalid token');
            }

            if (err instanceof jwt.TokenExpiredError) {
                throw new Error('Token expired');
            }

            throw new Error('Something went wrong');
        }
    }
}