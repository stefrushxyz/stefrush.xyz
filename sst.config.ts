/// <reference path="./.sst/platform/config.d.ts" />

import packageJson from "./package.json";

const NAME = packageJson.name;
const DOMAIN = "stefrush.xyz";
const AWS_REGION = "us-east-2";

function isProductionStage(stage: string) {
  return stage === "production";
}

function isPermanentStage(stage: string) {
  return isProductionStage(stage) || ["staging", "dev", "sandbox"].includes(stage);
}

export default $config({
  app(input) {
    const isProduction = isProductionStage(input.stage);
    const isPermanent = isPermanentStage(input.stage);

    return {
      name: NAME,
      providers: {
        aws: { region: AWS_REGION },
        cloudflare: isPermanent ? true : undefined,
      },
      home: "aws",
      removal: isPermanent ? "retain" : "remove",
      protect: isProduction,
    };
  },
  async run() {
    const isProduction = isProductionStage($app.stage);
    const isPermanent = isPermanentStage($app.stage);
    const domain = isProduction ? DOMAIN : `${$app.stage}.${DOMAIN}`;

    const next = new sst.aws.Nextjs("Next", {
      path: "./packages/next",
      domain: isPermanent
        ? {
            name: domain,
            redirects: [`www.${domain}`],
            dns: sst.cloudflare.dns(),
          }
        : undefined,
    });

    const solid = new sst.aws.SolidStart("Solid", {
      path: "./packages/solid",
      domain: isPermanent
        ? {
            name: `solid.${domain}`,
            dns: sst.cloudflare.dns(),
          }
        : undefined,
    });

    return {
      next: next.url,
      solid: solid.url,
    };
  },
});
