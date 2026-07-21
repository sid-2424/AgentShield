import { describe, expect, it, vi } from "vitest";
import { PolicyEngine } from "../src/core/policy.js";

describe("PolicyEngine", () => {

    it("blocks unknown tools", () => {

        const engine = new PolicyEngine({
            allowedTools: ["readFile"]
        });

        const verdict = engine.evaluate({
            tool: "deleteFile",
            provenance: "SYSTEM",
            args: {}
        });

        expect(verdict.allowed).toBe(false);

    });

    it("blocks path traversal", () => {

        const engine = new PolicyEngine({
            allowedTools: ["readFile"]
        });

        const verdict = engine.evaluate({
            tool: "readFile",
            provenance: "UNTRUSTED_USER",
            args: {
                path: "../../etc/passwd"
            }
        });

        expect(verdict.allowed).toBe(false);

    });

    it("blocks localhost requests", () => {

        const engine = new PolicyEngine({
            allowedTools: ["fetchUrl"]
        });

        const verdict = engine.evaluate({
            tool: "fetchUrl",
            provenance: "UNTRUSTED_USER",
            args: {
                url: "http://localhost:8080"
            }
        });

        expect(verdict.allowed).toBe(false);

    });
});

describe("Audit Logging", () => {

  it("logs successful evaluations", () => {

    const logger = vi.fn();

    const engine = new PolicyEngine({
      allowedTools: ["readFile"],
      auditLogger: logger
    });

    engine.evaluate({
      tool: "readFile",
      args: {},
      provenance: "SYSTEM"
    });

    expect(logger).toHaveBeenCalledTimes(1);

    expect(logger).toHaveBeenCalledWith(
      expect.objectContaining({
        tool: "readFile",
        allowed: true,
        risk: "LOW"
      })
    );

  });

  it("logs blocked evaluations", () => {

    const logger = vi.fn();

    const engine = new PolicyEngine({
      allowedTools: [],
      auditLogger: logger
    });

    engine.evaluate({
      tool: "deleteFile",
      args: {},
      provenance: "SYSTEM"
    });

    expect(logger).toHaveBeenCalledTimes(1);

    expect(logger).toHaveBeenCalledWith(
      expect.objectContaining({
        tool: "deleteFile",
        allowed: false,
        risk: "HIGH"
      })
    );

  });

});