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
            userId: string;
            id: string;
            role: string;
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
                name: string | null;
                email: string;
            };
        } & {
            userId: string;
            id: string;
            role: string;
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
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            role: string;
            email: string;
            password: string;
            hashedRefreshToken: string | null;
        };
        inOtherTeams: boolean;
        userId: string;
        id: string;
        role: string;
        joinedAt: Date;
        teamId: string;
    }[]>;
    invite(id: string, dto: InviteMemberDto): Promise<{
        userId: string;
        id: string;
        role: string;
        joinedAt: Date;
        teamId: string;
    }>;
    changeRole(id: string, memberId: string, dto: UpdateMemberRoleDto): Promise<{
        userId: string;
        id: string;
        role: string;
        joinedAt: Date;
        teamId: string;
    }>;
    removeMember(id: string, memberId: string): Promise<{
        userId: string;
        id: string;
        role: string;
        joinedAt: Date;
        teamId: string;
    }>;
    listAll(req: JwtRequest): Promise<{
        projectCount: number;
        members: ({
            user: {
                id: string;
                name: string | null;
                email: string;
            };
        } & {
            userId: string;
            id: string;
            role: string;
            joinedAt: Date;
            teamId: string;
        })[];
        _count: {
            projects: number;
        };
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
                name: string | null;
                email: string;
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
