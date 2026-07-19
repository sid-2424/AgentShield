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

});