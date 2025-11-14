import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { Request } from 'express';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto';
interface JwtRequest extends Request {
    user?: {
        userId?: string;
        id?: string;
        sub?: string;
        email?: string;
        role?: string;
    };
}
export declare class TeamsController {
    private teams;
    constructor(teams: TeamsService);
    create(req: JwtRequest, dto: CreateTeamDto): Promise<{
        members: {
            id: string;
            role: string;
            userId: string;
            joinedAt: Date;
            teamId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    myTeams(req: JwtRequest): Promise<({
        members: ({
            user: {
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            id: string;
            role: string;
            userId: string;
            joinedAt: Date;
            teamId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    })[] | {
        team: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        role: string;
        membershipId: string;
    }[]>;
    members(id: string): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            name: string | null;
            role: string;
            createdAt: Date;
            updatedAt: Date;
            hashedRefreshToken: string | null;
        };
        inOtherTeams: boolean;
        id: string;
        role: string;
        userId: string;
        joinedAt: Date;
        teamId: string;
    }[]>;
    invite(id: string, dto: InviteMemberDto): Promise<{
        id: string;
        role: string;
        userId: string;
        joinedAt: Date;
        teamId: string;
    }>;
    changeRole(id: string, memberId: string, dto: UpdateMemberRoleDto): Promise<{
        id: string;
        role: string;
        userId: string;
        joinedAt: Date;
        teamId: string;
    }>;
    removeMember(id: string, memberId: string): Promise<{
        id: string;
        role: string;
        userId: string;
        joinedAt: Date;
        teamId: string;
    }>;
    listAll(req: JwtRequest): Promise<{
        projectCount: number;
        _count: {
            projects: number;
        };
        members: ({
            user: {
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            id: string;
            role: string;
            userId: string;
            joinedAt: Date;
            teamId: string;
        })[];
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getTeam(id: string): Promise<{
        id: string;
        name: string;
        ownerId: any;
        members: {
            id: string;
            role: string;
            user: {
                id: string;
                email: string;
                name: string | null;
            };
        }[];
        projects: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            teamId: string | null;
            description: string | null;
            assignedAt: Date;
            dueDate: Date | null;
        }[];
    }>;
    deleteTeamEndpoint(req: JwtRequest, id: string): Promise<{
        ok: boolean;
    }>;
}
export {};
