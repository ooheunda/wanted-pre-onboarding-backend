import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserRoleGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(ctx: ExecutionContext) {
    const authenticated = await super.canActivate(ctx);
    if (!authenticated) return false;

    const requiredRole = this.reflector.getAllAndOverride<'user' | 'company'>(
      'role',
      [ctx.getHandler(), ctx.getClass()],
    );
    if (!requiredRole) return true;

    const { user } = ctx.switchToHttp().getRequest();
    return requiredRole === 'company' ? user.isCompany : !user.isCompany;
  }
}
