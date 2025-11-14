import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { Request } from 'express';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto';
interface JwtRequest extends Request {
    user?: {
        userId: string;
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
    myTeams(req: JwtRequest): Promise<{
        team: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        role: string;
        membershipId: string;
    }[]>;
    members(id: string): Promise<({
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
    })[]>;
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
}
export {};
