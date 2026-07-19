import { AgentShield } from "../src/core/engine.js";

const shield = new AgentShield({
    allowedTools: [
        "readFile",
        "writeFile"
    ],

    requireApproval: [
        "writeFile"
    ],

    destructiveKeywords: [
        "rm -rf",
        "format",
        "delete all"
    ]
});

async function demo() {

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
            console.log("Writing file...");
        },

        async () => {
            console.log("Approval requested...");
            return true;
        }
    );

}

demo();