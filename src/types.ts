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