/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
export declare const ROLE_MEMBER = "Member";
export declare const ROLE_CLIENT = "Client";
export declare const ROLE_OWNER = "Owner";
export declare const ROLE_ADMIN = "Admin";
export declare const User: mongoose.Model<mongoose.Document>;
