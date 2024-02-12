"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Alert_1 = __importDefault(require("@mui/material/Alert"));
var Snackbar_1 = __importDefault(require("@mui/material/Snackbar"));
var Alert = (0, react_1.forwardRef)(function Alert(props, ref) {
    return (0, jsx_runtime_1.jsx)(Alert_1.default, __assign({ elevation: 6, ref: ref, variant: "filled" }, props));
});
function SnackbarAlerts(_a) {
    var open = _a.open, setSnackOpen = _a.setSnackOpen, severity = _a.severity, message = _a.message;
    var handleSnackClose = function (event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setSnackOpen(false);
    };
    return ((0, jsx_runtime_1.jsx)(Snackbar_1.default, { open: open, autoHideDuration: 6000, onClose: handleSnackClose, anchorOrigin: { vertical: "top", horizontal: "center" }, children: (0, jsx_runtime_1.jsx)(Alert, { onClose: handleSnackClose, severity: severity, sx: { width: "100%" }, children: message }) }));
}
exports.default = SnackbarAlerts;
