import { describe, it, expect } from "vitest";
import { correctErrorStackTrace } from "./errors.js";

const rawStackTrace = `
Error: Failed to fetch image: Bad Request
    at fetchMediaContent (file:///src/modules/webhooks/utils.ts:83:11)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at getMediaContent (file:///src/modules/trigger/utils.ts:132:20)
    at run (file:///src/modules/trigger/createDocumentFromWhapi.ts:67:32)
    at _RunTimelineMetricsAPI.measureMetric (file:///.npm/_npx/trigger.dev/core/src/v3/runTimelineMetrics/index.ts:67:22)
    at file:///.npm/_npx/trigger.dev/core/src/v3/workers/taskExecutor.ts:128:28
    at ConsoleInterceptor.intercept (file:///.npm/_npx/trigger.dev/core/src/v3/consoleInterceptor.ts:36:14)
`;

describe("correctErrorStackTrace", () => {
  it("filters internal stack frames and keeps user code", () => {
    const cleaned = correctErrorStackTrace(rawStackTrace);
    expect(cleaned).toBe(
      [
        "Error: Failed to fetch image: Bad Request",
        "    at fetchMediaContent (file:///src/modules/webhooks/utils.ts:83:11)",
        "    at getMediaContent (file:///src/modules/trigger/utils.ts:132:20)",
        "    at run (file:///src/modules/trigger/createDocumentFromWhapi.ts:67:32)",
      ].join("\n")
    );
  });
});
