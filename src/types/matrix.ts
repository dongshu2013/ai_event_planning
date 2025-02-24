export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface TaskStatus {
  completed: boolean;
  notes: string;
  assignee?: TeamMember;
  progress: number;
  lastUpdated?: string;
}

export interface MatrixData {
  [phase: string]: {
    [module: string]: TaskStatus;
  };
} 