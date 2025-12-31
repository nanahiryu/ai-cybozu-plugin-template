import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { Preview } from "@storybook/react";
import type { ReactNode } from "react";

const theme = createTheme();

const withMuiTheme = (Story: () => ReactNode) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

const preview: Preview = {
  decorators: [withMuiTheme],
};

export default preview;
