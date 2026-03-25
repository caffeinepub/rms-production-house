import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface PortfolioItem {
    id: bigint;
    title: string;
    createdAt: Time;
    description: string;
    imageUrl: ExternalBlob;
    servicesUsed: Array<string>;
    category: string;
}
export interface TeamMember {
    id: bigint;
    bio: string;
    displayOrder: bigint;
    name: string;
    role: string;
    imageUrl: ExternalBlob;
}
export interface Service {
    id: bigint;
    title: string;
    displayOrder: bigint;
    description: string;
    iconName: string;
    category: string;
}
export interface Submission {
    projectType: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    budget: string;
}
export interface UserProfile {
    name: string;
    email: string;
    company: string;
}
export interface Testimonial {
    id: bigint;
    createdAt: Time;
    role: string;
    text: string;
    author: string;
    company: string;
    rating: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPortfolioItem(item: PortfolioItem): Promise<void>;
    addService(service: Service): Promise<void>;
    addTeamMember(member: TeamMember): Promise<void>;
    addTestimonial(testimonial: Testimonial): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllPortfolioItems(): Promise<Array<PortfolioItem>>;
    getAllServices(): Promise<Array<Service>>;
    getAllSubmissions(): Promise<Array<Submission>>;
    getAllTeamMembers(): Promise<Array<TeamMember>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPortfolioItem(id: bigint): Promise<PortfolioItem | null>;
    getPortfolioItemsByCategory(category: string): Promise<Array<PortfolioItem>>;
    getService(id: bigint): Promise<Service | null>;
    getTeamMember(id: bigint): Promise<TeamMember | null>;
    getTestimonial(id: bigint): Promise<Testimonial | null>;
    getTestimonialsByRating(minRating: bigint): Promise<Array<Testimonial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitForm(submission: Submission): Promise<void>;
}
