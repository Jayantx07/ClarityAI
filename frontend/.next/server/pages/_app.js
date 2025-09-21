/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./components/AuthProvider.jsx":
/*!*************************************!*\
  !*** ./components/AuthProvider.jsx ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/firebase */ \"(pages-dir-node)/./lib/firebase.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_2__, _lib_firebase__WEBPACK_IMPORTED_MODULE_3__]);\n([firebase_auth__WEBPACK_IMPORTED_MODULE_2__, _lib_firebase__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nconst useAuth = ()=>{\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n};\nfunction AuthProvider({ children }) {\n    const [currentUser, setCurrentUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const signup = (email, password)=>{\n        if (!_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth) {\n            console.warn('Firebase Auth not available');\n            return Promise.reject(new Error('Firebase Auth not configured'));\n        }\n        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.createUserWithEmailAndPassword)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth, email, password);\n    };\n    const login = (email, password)=>{\n        if (!_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth) {\n            console.warn('Firebase Auth not available');\n            return Promise.reject(new Error('Firebase Auth not configured'));\n        }\n        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithEmailAndPassword)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth, email, password);\n    };\n    const loginAnonymously = ()=>{\n        if (!_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth) {\n            console.warn('Firebase Auth not available');\n            return Promise.reject(new Error('Firebase Auth not configured'));\n        }\n        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInAnonymously)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth);\n    };\n    // Google Sign-in\n    // TODO: Enable Google provider in Firebase console\n    const loginWithGoogle = async ()=>{\n        if (!_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth) {\n            console.warn('Firebase Auth not available');\n            throw new Error('Firebase Auth not configured');\n        }\n        const provider = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthProvider();\n        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithPopup)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth, provider);\n    };\n    const logout = ()=>{\n        if (!_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth) {\n            console.warn('Firebase Auth not available');\n            return Promise.reject(new Error('Firebase Auth not configured'));\n        }\n        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signOut)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            if (!_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth) {\n                setLoading(false);\n                return;\n            }\n            const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth, {\n                \"AuthProvider.useEffect.unsubscribe\": (user)=>{\n                    setCurrentUser(user);\n                    setLoading(false);\n                }\n            }[\"AuthProvider.useEffect.unsubscribe\"]);\n            return unsubscribe;\n        }\n    }[\"AuthProvider.useEffect\"], []);\n    const value = {\n        currentUser,\n        signup,\n        login,\n        loginWithGoogle,\n        loginAnonymously,\n        logout\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: !loading && children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\JAYANT\\\\OneDrive\\\\Documents\\\\ClarityAI\\\\frontend\\\\components\\\\AuthProvider.jsx\",\n        lineNumber: 89,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvQXV0aFByb3ZpZGVyLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBdUU7QUFPaEQ7QUFDNkM7QUFDN0I7QUFFdkMsTUFBTVksNEJBQWNaLG9EQUFhQSxDQUFDLENBQUM7QUFFNUIsTUFBTWEsVUFBVTtJQUNyQixPQUFPWixpREFBVUEsQ0FBQ1c7QUFDcEIsRUFBRTtBQUVhLFNBQVNFLGFBQWEsRUFBRUMsUUFBUSxFQUFFO0lBQy9DLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHZCwrQ0FBUUEsQ0FBQztJQUMvQyxNQUFNLENBQUNlLFNBQVNDLFdBQVcsR0FBR2hCLCtDQUFRQSxDQUFDO0lBRXZDLE1BQU1pQixTQUFTLENBQUNDLE9BQU9DO1FBQ3JCLElBQUksQ0FBQ1gsK0NBQUlBLEVBQUU7WUFDVFksUUFBUUMsSUFBSSxDQUFDO1lBQ2IsT0FBT0MsUUFBUUMsTUFBTSxDQUFDLElBQUlDLE1BQU07UUFDbEM7UUFDQSxPQUFPdEIsNkVBQThCQSxDQUFDTSwrQ0FBSUEsRUFBRVUsT0FBT0M7SUFDckQ7SUFFQSxNQUFNTSxRQUFRLENBQUNQLE9BQU9DO1FBQ3BCLElBQUksQ0FBQ1gsK0NBQUlBLEVBQUU7WUFDVFksUUFBUUMsSUFBSSxDQUFDO1lBQ2IsT0FBT0MsUUFBUUMsTUFBTSxDQUFDLElBQUlDLE1BQU07UUFDbEM7UUFDQSxPQUFPdkIseUVBQTBCQSxDQUFDTywrQ0FBSUEsRUFBRVUsT0FBT0M7SUFDakQ7SUFFQSxNQUFNTyxtQkFBbUI7UUFDdkIsSUFBSSxDQUFDbEIsK0NBQUlBLEVBQUU7WUFDVFksUUFBUUMsSUFBSSxDQUFDO1lBQ2IsT0FBT0MsUUFBUUMsTUFBTSxDQUFDLElBQUlDLE1BQU07UUFDbEM7UUFDQSxPQUFPckIsZ0VBQWlCQSxDQUFDSywrQ0FBSUE7SUFDL0I7SUFFQSxpQkFBaUI7SUFDakIsbURBQW1EO0lBQ25ELE1BQU1tQixrQkFBa0I7UUFDdEIsSUFBSSxDQUFDbkIsK0NBQUlBLEVBQUU7WUFDVFksUUFBUUMsSUFBSSxDQUFDO1lBQ2IsTUFBTSxJQUFJRyxNQUFNO1FBQ2xCO1FBQ0EsTUFBTUksV0FBVyxJQUFJdEIsNkRBQWtCQTtRQUN2QyxPQUFPQyw4REFBZUEsQ0FBQ0MsK0NBQUlBLEVBQUVvQjtJQUMvQjtJQUVBLE1BQU1DLFNBQVM7UUFDYixJQUFJLENBQUNyQiwrQ0FBSUEsRUFBRTtZQUNUWSxRQUFRQyxJQUFJLENBQUM7WUFDYixPQUFPQyxRQUFRQyxNQUFNLENBQUMsSUFBSUMsTUFBTTtRQUNsQztRQUNBLE9BQU9wQixzREFBT0EsQ0FBQ0ksK0NBQUlBO0lBQ3JCO0lBRUFULGdEQUFTQTtrQ0FBQztZQUNSLElBQUksQ0FBQ1MsK0NBQUlBLEVBQUU7Z0JBQ1RRLFdBQVc7Z0JBQ1g7WUFDRjtZQUVBLE1BQU1jLGNBQWN6QixpRUFBa0JBLENBQUNHLCtDQUFJQTtzREFBRSxDQUFDdUI7b0JBQzVDakIsZUFBZWlCO29CQUNmZixXQUFXO2dCQUNiOztZQUVBLE9BQU9jO1FBQ1Q7aUNBQUcsRUFBRTtJQUVMLE1BQU1FLFFBQVE7UUFDWm5CO1FBQ0FJO1FBQ0FRO1FBQ0FFO1FBQ0FEO1FBQ0FHO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ3BCLFlBQVl3QixRQUFRO1FBQUNELE9BQU9BO2tCQUMxQixDQUFDakIsV0FBV0g7Ozs7OztBQUduQiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxKQVlBTlRcXE9uZURyaXZlXFxEb2N1bWVudHNcXENsYXJpdHlBSVxcZnJvbnRlbmRcXGNvbXBvbmVudHNcXEF1dGhQcm92aWRlci5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCwgXG4gIGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCwgXG4gIHNpZ25JbkFub255bW91c2x5LFxuICBzaWduT3V0LFxuICBvbkF1dGhTdGF0ZUNoYW5nZWQgXG59IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xuaW1wb3J0IHsgR29vZ2xlQXV0aFByb3ZpZGVyLCBzaWduSW5XaXRoUG9wdXAgfSBmcm9tICdmaXJlYmFzZS9hdXRoJztcbmltcG9ydCB7IGF1dGggfSBmcm9tICcuLi9saWIvZmlyZWJhc2UnO1xuXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe30pO1xuXG5leHBvcnQgY29uc3QgdXNlQXV0aCA9ICgpID0+IHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXV0aFByb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xuICBjb25zdCBbY3VycmVudFVzZXIsIHNldEN1cnJlbnRVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICBjb25zdCBzaWdudXAgPSAoZW1haWwsIHBhc3N3b3JkKSA9PiB7XG4gICAgaWYgKCFhdXRoKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0ZpcmViYXNlIEF1dGggbm90IGF2YWlsYWJsZScpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignRmlyZWJhc2UgQXV0aCBub3QgY29uZmlndXJlZCcpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChhdXRoLCBlbWFpbCwgcGFzc3dvcmQpO1xuICB9O1xuXG4gIGNvbnN0IGxvZ2luID0gKGVtYWlsLCBwYXNzd29yZCkgPT4ge1xuICAgIGlmICghYXV0aCkge1xuICAgICAgY29uc29sZS53YXJuKCdGaXJlYmFzZSBBdXRoIG5vdCBhdmFpbGFibGUnKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ0ZpcmViYXNlIEF1dGggbm90IGNvbmZpZ3VyZWQnKSk7XG4gICAgfVxuICAgIHJldHVybiBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChhdXRoLCBlbWFpbCwgcGFzc3dvcmQpO1xuICB9O1xuXG4gIGNvbnN0IGxvZ2luQW5vbnltb3VzbHkgPSAoKSA9PiB7XG4gICAgaWYgKCFhdXRoKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0ZpcmViYXNlIEF1dGggbm90IGF2YWlsYWJsZScpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignRmlyZWJhc2UgQXV0aCBub3QgY29uZmlndXJlZCcpKTtcbiAgICB9XG4gICAgcmV0dXJuIHNpZ25JbkFub255bW91c2x5KGF1dGgpO1xuICB9O1xuXG4gIC8vIEdvb2dsZSBTaWduLWluXG4gIC8vIFRPRE86IEVuYWJsZSBHb29nbGUgcHJvdmlkZXIgaW4gRmlyZWJhc2UgY29uc29sZVxuICBjb25zdCBsb2dpbldpdGhHb29nbGUgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFhdXRoKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0ZpcmViYXNlIEF1dGggbm90IGF2YWlsYWJsZScpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJlYmFzZSBBdXRoIG5vdCBjb25maWd1cmVkJyk7XG4gICAgfVxuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IEdvb2dsZUF1dGhQcm92aWRlcigpO1xuICAgIHJldHVybiBzaWduSW5XaXRoUG9wdXAoYXV0aCwgcHJvdmlkZXIpO1xuICB9O1xuXG4gIGNvbnN0IGxvZ291dCA9ICgpID0+IHtcbiAgICBpZiAoIWF1dGgpIHtcbiAgICAgIGNvbnNvbGUud2FybignRmlyZWJhc2UgQXV0aCBub3QgYXZhaWxhYmxlJyk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdGaXJlYmFzZSBBdXRoIG5vdCBjb25maWd1cmVkJykpO1xuICAgIH1cbiAgICByZXR1cm4gc2lnbk91dChhdXRoKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghYXV0aCkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBvbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aCwgKHVzZXIpID0+IHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKHVzZXIpO1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG4gIH0sIFtdKTtcblxuICBjb25zdCB2YWx1ZSA9IHtcbiAgICBjdXJyZW50VXNlcixcbiAgICBzaWdudXAsXG4gICAgbG9naW4sXG4gICAgbG9naW5XaXRoR29vZ2xlLFxuICAgIGxvZ2luQW5vbnltb3VzbHksXG4gICAgbG9nb3V0XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT5cbiAgICAgIHshbG9hZGluZyAmJiBjaGlsZHJlbn1cbiAgICA8L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufVxuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCIsImNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCIsInNpZ25JbkFub255bW91c2x5Iiwic2lnbk91dCIsIm9uQXV0aFN0YXRlQ2hhbmdlZCIsIkdvb2dsZUF1dGhQcm92aWRlciIsInNpZ25JbldpdGhQb3B1cCIsImF1dGgiLCJBdXRoQ29udGV4dCIsInVzZUF1dGgiLCJBdXRoUHJvdmlkZXIiLCJjaGlsZHJlbiIsImN1cnJlbnRVc2VyIiwic2V0Q3VycmVudFVzZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInNpZ251cCIsImVtYWlsIiwicGFzc3dvcmQiLCJjb25zb2xlIiwid2FybiIsIlByb21pc2UiLCJyZWplY3QiLCJFcnJvciIsImxvZ2luIiwibG9naW5Bbm9ueW1vdXNseSIsImxvZ2luV2l0aEdvb2dsZSIsInByb3ZpZGVyIiwibG9nb3V0IiwidW5zdWJzY3JpYmUiLCJ1c2VyIiwidmFsdWUiLCJQcm92aWRlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/AuthProvider.jsx\n");

/***/ }),

/***/ "(pages-dir-node)/./lib/firebase.js":
/*!*************************!*\
  !*** ./lib/firebase.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   analytics: () => (/* binding */ analytics),\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   db: () => (/* binding */ db),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/analytics */ \"firebase/analytics\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_analytics__WEBPACK_IMPORTED_MODULE_3__]);\n([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_analytics__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n// Check if Firebase config is available\nconst hasFirebaseConfig =  true && \"clarityai-6372d\";\nlet app = null;\nlet auth = null;\nlet db = null;\nlet analytics = null;\nif (hasFirebaseConfig) {\n    const firebaseConfig = {\n        apiKey: \"AIzaSyDIDrqDK_e9ibD-zq5AfW6TtOgxs8f5vdo\",\n        authDomain: \"clarityai-6372d.firebaseapp.com\",\n        projectId: \"clarityai-6372d\",\n        storageBucket: \"clarityai-6372d.firebasestorage.app\",\n        messagingSenderId: \"822641494953\",\n        appId: \"1:822641494953:web:9b3e427bde414d9fd6d2b8\",\n        measurementId: \"G-03PPFBY665\"\n    };\n    try {\n        // Initialize Firebase\n        app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\n        // Initialize Firebase Authentication and get a reference to the service\n        auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\n        // Initialize Cloud Firestore and get a reference to the service\n        db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);\n        // Initialize Analytics (only in browser environment)\n        if (false) {}\n    } catch (error) {\n        console.warn('Firebase initialization failed:', error.message);\n    }\n} else {\n    console.warn('Firebase configuration not found. Please set up your .env.local file with Firebase credentials.');\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2xpYi9maXJlYmFzZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE2QztBQUNMO0FBQ1U7QUFDQTtBQUVsRCx3Q0FBd0M7QUFDeEMsTUFBTUksb0JBQW9CQyxLQUF3QyxJQUN6Q0EsaUJBQTJDO0FBRXBFLElBQUlJLE1BQU07QUFDVixJQUFJQyxPQUFPO0FBQ1gsSUFBSUMsS0FBSztBQUNULElBQUlDLFlBQVk7QUFFaEIsSUFBSVIsbUJBQW1CO0lBQ3JCLE1BQU1TLGlCQUFpQjtRQUNyQkMsUUFBUVQseUNBQXdDO1FBQ2hEVSxZQUFZVixpQ0FBNEM7UUFDeERZLFdBQVdaLGlCQUEyQztRQUN0RGEsZUFBZWIscUNBQStDO1FBQzlEZSxtQkFBbUJmLGNBQW9EO1FBQ3ZFaUIsT0FBT2pCLDJDQUF1QztRQUM5Q21CLGVBQWVuQixjQUErQztJQUNoRTtJQUVBLElBQUk7UUFDRixzQkFBc0I7UUFDdEJJLE1BQU1ULDJEQUFhQSxDQUFDYTtRQUVwQix3RUFBd0U7UUFDeEVILE9BQU9ULHNEQUFPQSxDQUFDUTtRQUVmLGdFQUFnRTtRQUNoRUUsS0FBS1QsZ0VBQVlBLENBQUNPO1FBRWxCLHFEQUFxRDtRQUNyRCxJQUFJLEtBQTZCLEVBQUUsRUFFbEM7SUFDSCxFQUFFLE9BQU9pQixPQUFPO1FBQ2RDLFFBQVFDLElBQUksQ0FBQyxtQ0FBbUNGLE1BQU1HLE9BQU87SUFDL0Q7QUFDRixPQUFPO0lBQ0xGLFFBQVFDLElBQUksQ0FBQztBQUNmO0FBRStCO0FBQy9CLGlFQUFlbkIsR0FBR0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxKQVlBTlRcXE9uZURyaXZlXFxEb2N1bWVudHNcXENsYXJpdHlBSVxcZnJvbnRlbmRcXGxpYlxcZmlyZWJhc2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XHJcbmltcG9ydCB7IGdldEF1dGggfSBmcm9tICdmaXJlYmFzZS9hdXRoJztcclxuaW1wb3J0IHsgZ2V0RmlyZXN0b3JlIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcclxuaW1wb3J0IHsgZ2V0QW5hbHl0aWNzIH0gZnJvbSAnZmlyZWJhc2UvYW5hbHl0aWNzJztcclxuXHJcbi8vIENoZWNrIGlmIEZpcmViYXNlIGNvbmZpZyBpcyBhdmFpbGFibGVcclxuY29uc3QgaGFzRmlyZWJhc2VDb25maWcgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9BUElfS0VZICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfUFJPSkVDVF9JRDtcclxuXHJcbmxldCBhcHAgPSBudWxsO1xyXG5sZXQgYXV0aCA9IG51bGw7XHJcbmxldCBkYiA9IG51bGw7XHJcbmxldCBhbmFseXRpY3MgPSBudWxsO1xyXG5cclxuaWYgKGhhc0ZpcmViYXNlQ29uZmlnKSB7XHJcbiAgY29uc3QgZmlyZWJhc2VDb25maWcgPSB7XHJcbiAgICBhcGlLZXk6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQSV9LRVksXHJcbiAgICBhdXRoRG9tYWluOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9BVVRIX0RPTUFJTixcclxuICAgIHByb2plY3RJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfUFJPSkVDVF9JRCxcclxuICAgIHN0b3JhZ2VCdWNrZXQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX1NUT1JBR0VfQlVDS0VULFxyXG4gICAgbWVzc2FnaW5nU2VuZGVySWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX01FU1NBR0lOR19TRU5ERVJfSUQsXHJcbiAgICBhcHBJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBQX0lELFxyXG4gICAgbWVhc3VyZW1lbnRJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfTUVBU1VSRU1FTlRfSURcclxuICB9O1xyXG5cclxuICB0cnkge1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBGaXJlYmFzZVxyXG4gICAgYXBwID0gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XHJcbiAgICBcclxuICAgIC8vIEluaXRpYWxpemUgRmlyZWJhc2UgQXV0aGVudGljYXRpb24gYW5kIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgc2VydmljZVxyXG4gICAgYXV0aCA9IGdldEF1dGgoYXBwKTtcclxuICAgIFxyXG4gICAgLy8gSW5pdGlhbGl6ZSBDbG91ZCBGaXJlc3RvcmUgYW5kIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgc2VydmljZVxyXG4gICAgZGIgPSBnZXRGaXJlc3RvcmUoYXBwKTtcclxuICAgIFxyXG4gICAgLy8gSW5pdGlhbGl6ZSBBbmFseXRpY3MgKG9ubHkgaW4gYnJvd3NlciBlbnZpcm9ubWVudClcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBhbmFseXRpY3MgPSBnZXRBbmFseXRpY3MoYXBwKTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS53YXJuKCdGaXJlYmFzZSBpbml0aWFsaXphdGlvbiBmYWlsZWQ6JywgZXJyb3IubWVzc2FnZSk7XHJcbiAgfVxyXG59IGVsc2Uge1xyXG4gIGNvbnNvbGUud2FybignRmlyZWJhc2UgY29uZmlndXJhdGlvbiBub3QgZm91bmQuIFBsZWFzZSBzZXQgdXAgeW91ciAuZW52LmxvY2FsIGZpbGUgd2l0aCBGaXJlYmFzZSBjcmVkZW50aWFscy4nKTtcclxufVxyXG5cclxuZXhwb3J0IHsgYXV0aCwgZGIsIGFuYWx5dGljcyB9O1xyXG5leHBvcnQgZGVmYXVsdCBhcHA7XHJcbiJdLCJuYW1lcyI6WyJpbml0aWFsaXplQXBwIiwiZ2V0QXV0aCIsImdldEZpcmVzdG9yZSIsImdldEFuYWx5dGljcyIsImhhc0ZpcmViYXNlQ29uZmlnIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQSV9LRVkiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9QUk9KRUNUX0lEIiwiYXBwIiwiYXV0aCIsImRiIiwiYW5hbHl0aWNzIiwiZmlyZWJhc2VDb25maWciLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfQVVUSF9ET01BSU4iLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX01FU1NBR0lOR19TRU5ERVJfSUQiLCJhcHBJZCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQUF9JRCIsIm1lYXN1cmVtZW50SWQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9NRUFTVVJFTUVOVF9JRCIsImVycm9yIiwiY29uc29sZSIsIndhcm4iLCJtZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./lib/firebase.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.jsx":
/*!************************!*\
  !*** ./pages/_app.jsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_AuthProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/AuthProvider */ \"(pages-dir-node)/./components/AuthProvider.jsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_AuthProvider__WEBPACK_IMPORTED_MODULE_2__]);\n_components_AuthProvider__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AuthProvider__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\JAYANT\\\\OneDrive\\\\Documents\\\\ClarityAI\\\\frontend\\\\pages\\\\_app.jsx\",\n            lineNumber: 7,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\JAYANT\\\\OneDrive\\\\Documents\\\\ClarityAI\\\\frontend\\\\pages\\\\_app.jsx\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFDdUI7QUFFdkMsU0FBU0MsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNsRCxxQkFDRSw4REFBQ0gsZ0VBQVlBO2tCQUNYLDRFQUFDRTtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEpBWUFOVFxcT25lRHJpdmVcXERvY3VtZW50c1xcQ2xhcml0eUFJXFxmcm9udGVuZFxccGFnZXNcXF9hcHAuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcclxuaW1wb3J0IEF1dGhQcm92aWRlciBmcm9tICcuLi9jb21wb25lbnRzL0F1dGhQcm92aWRlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxBdXRoUHJvdmlkZXI+XHJcbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgIDwvQXV0aFByb3ZpZGVyPlxyXG4gICk7XHJcbn1cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbIkF1dGhQcm92aWRlciIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.jsx\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "firebase/analytics":
/*!*************************************!*\
  !*** external "firebase/analytics" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/analytics");;

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/auth");;

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/firestore");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.jsx"));
module.exports = __webpack_exports__;

})();