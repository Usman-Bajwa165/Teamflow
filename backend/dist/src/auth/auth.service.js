"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const crypto = __importStar(require("crypto"));
let AuthService = class AuthService {
    usersService;
    prisma;
    jwtService;
    constructor(usersService, prisma, jwtService) {
        this.usersService = usersService;
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    getAccessTokenPayload(user) {
        return { sub: user.id, email: user.email, role: user.role };
    }
    async register(email, password, name) {
        const existing = await this.usersService.findByEmail(email);
        if (existing)
            throw new common_1.BadRequestException('Email already in use');
        return this.usersService.createUser(email, password, name);
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            return null;
        const valid = await this.usersService.verifyPassword(user, password);
        if (!valid)
            return null;
        return user;
    }
    async getTokens(user) {
        const payload = this.getAccessTokenPayload(user);
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '900s',
        });
        const refreshToken = this.jwtService.sign({ sub: user.id }, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        });
        return { accessToken, refreshToken };
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const tokens = await this.getTokens(user);
        const hash = await bcrypt.hash(tokens.refreshToken, 10);
        await this.usersService.setRefreshToken(user.id, hash);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            tokens,
        };
    }
    async logout(userId) {
        await this.usersService.setRefreshToken(userId, null);
        return { ok: true };
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.hashedRefreshToken)
            throw new common_1.UnauthorizedException();
        const matches = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
        if (!matches)
            throw new common_1.UnauthorizedException();
        const tokens = await this.getTokens(user);
        const newHash = await bcrypt.hash(tokens.refreshToken, 10);
        await this.usersService.setRefreshToken(user.id, newHash);
        return {
            tokens,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }
    async refreshUsingToken(refreshToken) {
        try {
            const decoded = this.jwtService.verify(refreshToken);
            const userId = decoded.sub;
            return this.refreshTokens(userId, refreshToken);
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async createPasswordReset(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            return;
        const raw = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(raw).digest('hex');
        const expires = new Date(Date.now() +
            Number(process.env.PASSWORD_RESET_TOKEN_EXPIRES_MINUTES || 60) *
                60 *
                1000);
        await this.prisma.passwordResetToken.create({
            data: {
                tokenHash,
                userId: user.id,
                expiresAt: expires,
            },
        });
        console.log(`Password reset token for ${email}: ${raw} (valid until ${expires.toISOString()})`);
        return { ok: true };
    }
    async resetPassword(rawToken, newPassword) {
        const tokenHash = crypto
            .createHash('sha256')
            .update(rawToken)
            .digest('hex');
        const token = await this.prisma.passwordResetToken.findUnique({
            where: { tokenHash },
            include: { user: true },
        });
        if (!token)
            throw new common_1.BadRequestException('Invalid or expired token');
        if (token.used)
            throw new common_1.BadRequestException('Token already used');
        if (token.expiresAt < new Date())
            throw new common_1.BadRequestException('Token expired');
        const hashed = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: token.userId },
            data: { password: hashed },
        });
        await this.prisma.passwordResetToken.update({
            where: { id: token.id },
            data: { used: true },
        });
        return { ok: true };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map