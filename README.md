# AgentShield

> Runtime security middleware for AI agents that enforces deterministic policies before privileged tool execution.

## Features

- ✅ Tool allowlists
- ✅ Human approval workflows
- ✅ Prompt injection protection
- ✅ Path traversal detection
- ✅ SSRF protection
- ✅ Lightweight TypeScript API

---

## Installation

```bash
npm install agentshield
```

---

## Quick Start

```ts
import { AgentShield } from "agentshield";

const shield = new AgentShield({
  allowedTools: ["readFile", "writeFile"],
  requireApproval: ["writeFile"]
});

await shield.enforce(
  {
    tool: "writeFile",
    provenance: "SYSTEM",
    args: {
      path: "notes.txt",
      content: "Hello"
    }
  },
  async () => {
    console.log("Writing...");
  },
  async () => true
);
```

## Audit Logging

AgentShield can emit an audit event after every policy evaluation.

```ts
const shield = new AgentShield({
  allowedTools: ["readFile"],
  auditLogger: (event) => {
    console.log(event);
  }
});
```

Example event:

```json
{
  "timestamp": "2026-07-21T12:34:56.000Z",
  "tool": "deleteFile",
  "allowed": false,
  "reason": "Tool is not allowlisted",
  "risk": "HIGH"
}
```

This can be integrated with logging systems, monitoring pipelines, or SIEM platforms to audit AI agent activity.

---

## Supported Security Rules

| Rule | Status |
|------|--------|
| Tool Allowlist | ✅ |
| Human Approval | ✅ |
| Destructive Keyword Detection | ✅ |
| Path Traversal Detection | ✅ |
| SSRF Detection | ✅ |

---

## Why AgentShield?

LLMs are excellent at reasoning, but they should not be trusted to decide whether privileged actions are safe.

AgentShield sits between an AI agent and its tools, applying deterministic security policies before execution.

```
LLM
 │
 ▼
AgentShield
 │
 ▼
Policy Engine
 │
 ▼
Security Rules
 │
 ▼
Tool Execution
```

---

## Roadmap

### v0.2

- Secret detection
- OpenAI Agents SDK integration
- Anthropic Claude Code integration
- LangChain integration
- Model Context Protocol (MCP) support

### Future

- Custom rule plugins
- Policy configuration via JSON/YAML
- OpenTelemetry integration
- Additional SSRF detection heuristics
- Semantic prompt injection detection
---

## Contributing

Contributions, issues, and feature requests are welcome.

See `CONTRIBUTING.md`.

---

## License

MIT
