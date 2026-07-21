export type DataProvenance =
  | "SYSTEM"
  | "UNTRUSTED_USER"
  | "MIXED";

export interface ToolInvocation {
  tool: string;
  args: Record<string, unknown>;
  provenance: DataProvenance;
}

export interface SecurityPolicy {
  allowedTools: string[];

  requireApproval?: string[];

  destructiveKeywords?: string[];

  blockOutboundNetwork?: boolean;

  blockPathTraversal?: boolean;

  blockSSRF?: boolean;
}

export interface ShieldVerdict {
  allowed: boolean;

  reason?: string;

  requiresApproval: boolean;

  risk: "LOW" | "MEDIUM" | "HIGH";
}

export interface AuditEvent {
  timestamp: string;
  tool: string;
  allowed: boolean;
  reason?: string;
  risk: "LOW" | "MEDIUM" | "HIGH";
}

export interface SecurityPolicy {
  allowedTools: string[];
  requireApproval?: string[];
  destructiveKeywords?: string[];
  blockOutboundNetwork?: boolean;
  blockPathTraversal?: boolean;
  blockSSRF?: boolean;

  /**
   * Optional callback invoked after every policy evaluation.
   */
  auditLogger?: (event: AuditEvent) => void;
}