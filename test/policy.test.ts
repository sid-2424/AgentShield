import { describe, expect, it } from "vitest";
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