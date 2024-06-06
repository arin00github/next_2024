import { ObjectId } from "mongodb";

export interface MemberItem {
  _id: ObjectId;
  id: string;
  pw?: string;
  userType: string;
  companyId: ObjectId;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceItem {
  _id: ObjectId;
  workId: string;
  name: string;
  description: string;
  companyId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  memberCount: number;
  projectCount: number;
}

export interface ProjectItem {
  _id: ObjectId;
  name: string;
  workspaceId: ObjectId;
  companyId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  dictionary: string | null;
}

export interface CompanyItem {
  _id: ObjectId;
  name: string;
  createdAt: Date;
  expiredAt: Date;
  service: {
    aiHuman: boolean;
    aiStudio: boolean;
    kiosk: boolean;
  };
}
