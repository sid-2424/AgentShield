# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-07-19

### Added

- Runtime policy engine for AI tool invocation
- Rule-based security architecture
- Tool allowlist enforcement
- Human approval workflows
- Destructive keyword detection
- Path traversal protection
- SSRF protection
- Public TypeScript API
- Unit tests with Vitest
- GitHub Actions continuous integration
- Project documentation and contribution guidelines

### Changed

- Made the internal policy rule collection immutable after initialization.

## [Unreleased]

### Added

- Optional audit logging callback via `SecurityPolicy.auditLogger`.
- New `AuditEvent` interface for recording policy evaluation results.