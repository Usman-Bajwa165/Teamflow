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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
async function ensureDefaultAdmin() {
    const prisma = new prisma_service_1.PrismaService();
    const email = 'admin@gmail.com';
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        if (existing.role !== 'admin') {
            await prisma.user.update({
                where: { id: existing.id },
                data: { role: 'admin', name: 'admin' },
            });
        }
        return;
    }
    const hashed = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
        data: { email, password: hashed, name: 'admin', role: 'admin' },
    });
    console.log('Default admin created: admin@gmail.com / admin123');
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: true, credentials: true });
    await app.listen(process.env.PORT ?? 4000);
    await ensureDefaultAdmin();
}
bootstrap();
//# sourceMappingURL=main.js.map