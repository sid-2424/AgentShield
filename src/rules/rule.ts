import { ShieldVerdict, ToolInvocation } from "../types.js";

export interface Rule {
  evaluate(invocation: ToolInvocation): ShieldVerdict | null;
}