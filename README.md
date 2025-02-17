# stefrush.xyz

My personal website built with Next.js, TypeScript, and Tailwind CSS. Deployed to AWS using SST.

## Quickstart

Follow this guide to set up a personal development environment with Bun, SST,
and AWS. It assumes the commands `bun` and `aws` (v2) are installed
and available in the active shell. An AWS account is also required.

> Note: Run all commands from the root directory of the project.

1. Install Bun dependencies:

   ```bash
   bun install
   ```

2. Install SST providers:

   ```bash
   bun x sst install
   ```

3. Login to AWS:

   ```bash
   aws configure sso
   ```

   > Note: Save AWS credentials to a profile named `default`. The command
   > `bun sso` can be used for subsequent logins after initial configuration.

4. Start personal development environment:

   ```bash
   bun dev
   ```

   Resource URLs will be displayed in the console.

## Deploy Production

Follow this guide to deploy the production environment to AWS and Cloudflare. It
assumes the commands `bun` and `aws` (v2) are installed and available in the
active shell. AWS and Cloudflare accounts are also required.

> Note: Run all commands from the root directory of the project.

1. Install Bun dependencies:

   ```bash
   bun install
   ```

2. Install SST providers:

   ```bash
   bun x sst install
   ```

3. Login to AWS:

   ```bash
   aws configure sso
   ```

4. Configure Cloudflare API access:

   ```bash
   export CLOUDFLARE_API_TOKEN=my-api-token
   export CLOUDFLARE_DEFAULT_ACCOUNT_ID=my-account-id
   ```

   > Note: Create the `CLOUDFLARE_API_TOKEN` in the Cloudflare dashboard under
   > `My Profile` -> `API Tokens`. Locate the `CLOUDFLARE_DEFAULT_ACCOUNT_ID` in
   > the URL once logged in to the Cloudflare dashboard.

5. Deploy production environment:

   ```bash
   bun x sst deploy --stage production
   ```
