//  npx tsx ./test/agents/run_crawler.ts
import { GraphAILogger } from "graphai";
import puppeteerCrawlerAgentInfo from "../../src/agents/puppeteer_crawler_agent.js";

import test from "node:test";
import { agentCallContext } from "../fixtures.js";

test("puppeteerCrawlerAgent", async () => {
  const result = await puppeteerCrawlerAgentInfo.agent({
    ...agentCallContext,
    params: {},
    namedInputs: { url: "https://www3.nhk.or.jp/news/html/20250829/k10014907131000.html" },
  });

  GraphAILogger.info(result);
});
