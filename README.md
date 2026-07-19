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
- Audit logging
- OpenAI Agents SDK integration
- LangChain integration

---

## Contributing

Contributions, issues, and feature requests are welcome.

See `CONTRIBUTING.md`.

---

## License

MIT