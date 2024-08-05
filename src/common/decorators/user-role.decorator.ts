import { SetMetadata } from '@nestjs/common';

export const UserRole = (role: 'user' | 'company') => SetMetadata('role', role);
