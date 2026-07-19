# AgentShield

> Runtime security middleware for AI agents.

AgentShield intercepts AI-generated tool calls before execution and evaluates them using deterministic security policies.

Instead of trusting an LLM to determine whether an action is safe, AgentShield validates every operation before it reaches your database, filesystem, APIs, or shell.

---

## Features

- Runtime policy engine
- Prompt injection mitigation
- Tool allowlists
- Human approval workflows
- Framework agnostic
- Zero runtime dependencies

---

## Example

```ts
const shield = new AgentShield(policy);

await shield.enforce(toolInvocation, async () => {
    return executeTool();
});
```

---

## Roadmap

- [x] Project scaffold
- [ ] Policy engine
- [ ] Runtime enforcement
- [ ] Prompt injection detection
- [ ] Filesystem protection
- [ ] Network protection
- [ ] Audit logging
- [ ] Unit tests
- [ ] GitHub Actions

---

MIT License