"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var AppBar_1 = __importDefault(require("@mui/material/AppBar"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var createTheme_1 = __importDefault(require("@mui/material/styles/createTheme"));
var ThemeProvider_1 = __importDefault(require("@mui/material/styles/ThemeProvider"));
var react_query_1 = require("@tanstack/react-query");
var react_query_devtools_1 = require("@tanstack/react-query-devtools");
require("./App.css");
var PoemView_1 = __importDefault(require("./components/PoemView"));
var theme = (0, createTheme_1.default)({
    palette: {
        primary: {
            main: "#b6484e", // App.css var(--color-deep-red)
        },
        secondary: {
            main: "#f6e9fc", // App.css var(--color-secondary)
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    color: "#f6e9fc", // App.css var(--color-secondary)
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    margin: "4px",
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    paddingTop: "0.1rem",
                    paddingLeft: "1.5rem",
                },
            },
        },
    },
});
var queryClient = new react_query_1.QueryClient();
function App() {
    return ((0, jsx_runtime_1.jsxs)(react_query_1.QueryClientProvider, { client: queryClient, children: [(0, jsx_runtime_1.jsx)(ThemeProvider_1.default, { theme: theme, children: (0, jsx_runtime_1.jsxs)(Box_1.default, { sx: { flexGrow: 1 }, children: [(0, jsx_runtime_1.jsx)(AppBar_1.default, { position: "static", children: (0, jsx_runtime_1.jsx)(Toolbar_1.default, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, { variant: "h4", component: "div", sx: { flexGrow: 1 }, children: "Nouns, Verbs and the Rest" }) }) }), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: { flexGrow: 1 }, children: (0, jsx_runtime_1.jsx)(PoemView_1.default, {}) })] }) }), (0, jsx_runtime_1.jsx)(react_query_devtools_1.ReactQueryDevtools, { initialIsOpen: false })] }));
}
exports.default = App;
