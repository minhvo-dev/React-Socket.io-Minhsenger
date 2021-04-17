import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    "common": { "black": "#000", "white": "#fff" }, "background": { "paper": "#fff", "default": "#fafafa" }, "primary": { "light": "rgba(223, 247, 249, 1)", "main": "rgba(7, 87, 91, 1)", "dark": "rgba(0, 59, 70, 1)", "contrastText": "#fff" }, "secondary": { "light": "rgba(163, 0, 255, 1)", "main": "rgba(99, 25, 155, 1)", "dark": "rgba(51, 1, 92, 1)", "contrastText": "#fff" }, "error": { "light": "rgba(252, 87, 87, 0.5)", "main": "rgba(247, 0, 0, 1)", "dark": "rgba(160, 0, 0, 1)", "contrastText": "#fff" }, "text": { "primary": "rgba(30, 67, 76, 1)", "secondary": "rgba(93, 83, 94, 1)", "disabled": "rgba(1, 26, 39, 0.5)", "hint": "rgba(208, 150, 131, 0.5)" }
  }
});