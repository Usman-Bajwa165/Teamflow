"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRoles = exports.TEAM_ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.TEAM_ROLES_KEY = 'team_roles';
const TeamRoles = (...roles) => (0, common_1.SetMetadata)(exports.TEAM_ROLES_KEY, roles);
exports.TeamRoles = TeamRoles;
//# sourceMappingURL=team-roles.decorater.js.map