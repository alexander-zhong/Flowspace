import React from "react";
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const App = () => {
  return (
    <MantineProvider>
      <div>App</div>
    </MantineProvider>
  );
};

export default App;
