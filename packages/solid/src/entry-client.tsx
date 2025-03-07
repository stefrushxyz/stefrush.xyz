// @refresh reload
import { StartClient, mount } from "@solidjs/start/client";

const app = document.getElementById("app");
if (!app) {
  throw new Error("Could not find app");
}

mount(() => <StartClient />, app);
