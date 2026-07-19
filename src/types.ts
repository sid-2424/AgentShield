export interface SecurityPolicy {
  allowedTools: string[];

  requireApproval?: string[];

  destructiveKeywords?: string[];

  blockOutboundNetwork?: boolean;

  blockPathTraversal?: boolean;
  
  blockSSRF?: boolean;
}