import { PolicyEngine } from "./policy.js";
import {
  SecurityPolicy,
  ToolInvocation
} from "../types.js";

export class AgentShield {
  private engine: PolicyEngine;

  constructor(policy: SecurityPolicy) {
    this.engine = new PolicyEngine(policy);
  }

  async enforce<T>(
    invocation: ToolInvocation,
    action: () => Promise<T>,
    approve?: () => Promise<boolean>
  ): Promise<T> {

    const verdict = this.engine.evaluate(invocation);

    if (!verdict.allowed) {
      throw new Error(verdict.reason);
    }

    if (verdict.requiresApproval) {

      if (!approve) {
        throw new Error("Approval callback not provided.");
      }

      const accepted = await approve();

      if (!accepted) {
        throw new Error("Execution rejected.");
      }

    }

    return action();
  }
}