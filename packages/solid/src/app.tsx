import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { MatrixRain } from "@stefrushxyz/ui-solid/components/matrix-rain";
import { Suspense } from "solid-js";

import "@fontsource-variable/jetbrains-mono";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Stefan Rush</Title>
          <MatrixRain />
          <div class="root">
            <Suspense>{props.children}</Suspense>
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
