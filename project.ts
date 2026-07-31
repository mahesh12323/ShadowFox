export type ProjectStatus = 'planning' | 'in-progress' | 'security-review' | 'deployed';
export type FeatureLayer = 'frontend' | 'backend' | 'database' | 'fullstack' | 'devops' | 'security';
export type RoadmapCategory = 'frontend' | 'backend' | 'database' | 'devops' | 'security';
export type RoadmapStatus = 'not-started' | 'in-progress' | 'mastered' | 'production-ready';
export type AuditStatus = 'pass' | 'warning' | 'fail' | 'not-applicable';
export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';

export interface MeetSession {
  id: string;
  title: string;
  clientName: string;
  date: string;
  time: string;
  durationMinutes: number;
  meetLink: string;
  attendees: string[];
  agenda: string[];
  confidentialNotes: string;
  actionItems: {
    id: string;
    text: string;
    assignee: string;
    completed: boolean;
    layer: FeatureLayer;
  }[];
  isConfidentialNDA: boolean;
  recordingConsentVerified: boolean;
}

export interface FullStackFeature {
  id: string;
  title: string;
  description: string;
  layer: FeatureLayer;
  status: 'backlog' | 'in-development' | 'code-review' | 'production';
  priority: 'high' | 'medium' | 'low';
  frontendSpec: {
    components: string[];
    stateManagement: string;
    accessibilityNotes: string;
    sampleCodeSnippet?: string;
  };
  backendSpec: {
    apiEndpoints: string[];
    authRequirement: string;
    validationSchema: string;
    sampleCodeSnippet?: string;
  };
  databaseSpec: {
    tablesOrCollections: string[];
    indexes: string[];
    sampleSchema?: string;
  };
  securityChecklist: {
    id: string;
    label: string;
    completed: boolean;
  }[];
  assignedTo: string;
  dueDate: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  category: RoadmapCategory;
  level: 'essential' | 'advanced' | 'client-production';
  status: RoadmapStatus;
  description: string;
  whyImportantForClient: string;
  keySkills: string[];
  clientChecklist: {
    id: string;
    label: string;
    checked: boolean;
  }[];
  codeSnippetTitle?: string;
  codeSnippet?: string;
  roadmapShLink?: string;
}

export interface SecurityAuditItem {
  id: string;
  category: 'OWASP-Top-10' | 'Client-Confidentiality' | 'Data-Privacy-GDPR' | 'Cloud-Infrastructure';
  title: string;
  description: string;
  severity: SeverityLevel;
  status: AuditStatus;
  mitigationNotes: string;
  lastAuditedBy: string;
  lastAuditedDate: string;
}

export interface ClientProject {
  id: string;
  name: string;
  clientName: string;
  industry: string;
  description: string;
  status: ProjectStatus;
  ndaSignedDate: string;
  confidentialityLevel: 'Strict NDA' | 'Standard Confidential' | 'Internal Draft';
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    devops: string[];
  };
  repositoryUrl: string;
  googleMeetLink: string;
  leadEngineer: string;
  startDate: string;
  targetLaunchDate: string;
  features: FullStackFeature[];
  meetSessions: MeetSession[];
  roadmapNodes: RoadmapNode[];
  securityAudits: SecurityAuditItem[];
}
