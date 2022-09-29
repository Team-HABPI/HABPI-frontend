import { createTheme } from "@mui/material";
import { grey, purple } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: purple[500],
        },
    },
});

export default theme;
