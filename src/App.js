"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var AppBar_1 = __importDefault(require("@mui/material/AppBar"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var createTheme_1 = __importDefault(
  require("@mui/material/styles/createTheme")
);
var ThemeProvider_1 = __importDefault(
  require("@mui/material/styles/ThemeProvider")
);
require("./App.css");
var PoemView_1 = __importDefault(require("./components/PoemView"));
var theme = (0, createTheme_1.default)({
  palette: {
    primary: {
      main: "#807b67",
    },
    secondary: {
      main: "#f8f7f6",
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          margin: "4px",
        },
      },
    },
  },
});
function App() {
  return (0, jsx_runtime_1.jsx)(
    ThemeProvider_1.default,
    __assign(
      { theme: theme },
      {
        children: (0, jsx_runtime_1.jsxs)(
          Box_1.default,
          __assign(
            { sx: { flexGrow: 1 } },
            {
              children: [
                (0, jsx_runtime_1.jsx)(
                  AppBar_1.default,
                  __assign(
                    { position: "static" },
                    {
                      children: (0, jsx_runtime_1.jsx)(Toolbar_1.default, {
                        children: (0, jsx_runtime_1.jsx)(
                          Typography_1.default,
                          __assign(
                            {
                              variant: "h4",
                              component: "div",
                              sx: { flexGrow: 1 },
                            },
                            { children: "Nouns, Verbs and the Rest" }
                          )
                        ),
                      }),
                    }
                  )
                ),
                (0, jsx_runtime_1.jsx)(
                  Box_1.default,
                  __assign(
                    { sx: { flexGrow: 1 } },
                    { children: (0, jsx_runtime_1.jsx)(PoemView_1.default, {}) }
                  )
                ),
              ],
            }
          )
        ),
      }
    )
  );
}
exports.default = App;
