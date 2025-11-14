import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
export declare class TeamsService {
    private prisma;
    private usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    createTeam(ownerId: string, name: string): Promise<{
        members: {
            id: string;
            role: string;
            joinedAt: Date;
            userId: string;
            teamId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getTeamsForUser(userId: string): Promise<{
        team: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        role: string;
        membershipId: string;
    }[]>;
    getTeamMembers(teamId: string): Promise<{
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
        id: string;
        role: string;
        joinedAt: Date;
        userId: string;
        teamId: string;
    }[]>;
    inviteMemberByEmail(teamId: string, email: string, role?: string): Promise<{
        id: string;
        role: string;
        joinedAt: Date;
        userId: string;
        teamId: string;
    }>;
    changeMemberRole(teamId: string, memberId: string, newRole: string): Promise<{
        id: string;
        role: string;
        joinedAt: Date;
        userId: string;
        teamId: string;
    }>;
    removeMember(teamId: string, memberId: string): Promise<{
        id: string;
        role: string;
        joinedAt: Date;
        userId: string;
        teamId: string;
    }>;
    findTeamById(teamId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    listAllTeams(): Promise<({
        members: ({
            user: {
                id: string;
                name: string | null;
                email: string;
            };
        } & {
            id: string;
            role: string;
            joinedAt: Date;
            userId: string;
            teamId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    listAllTeamsWithProjectCount(): Promise<{
        projectCount: number;
        members: ({
            user: {
                id: string;
                name: string | null;
                email: string;
            };
        } & {
            id: string;
            role: string;
            joinedAt: Date;
            userId: string;
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
    getUserRole(userId: string): Promise<string | null>;
    getTeamDetails(teamId: string): Promise<{
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
    deleteTeam(teamId: string): Promise<{
        ok: boolean;
    }>;
}
