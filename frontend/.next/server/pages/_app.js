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

/***/ "./components/AuthProvider.jsx":
/*!*************************************!*\
  !*** ./components/AuthProvider.jsx ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/firebase */ \"./lib/firebase.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_2__, _lib_firebase__WEBPACK_IMPORTED_MODULE_3__]);\n([firebase_auth__WEBPACK_IMPORTED_MODULE_2__, _lib_firebase__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nconst useAuth = ()=>{\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n};\nfunction AuthProvider({ children }) {\n    const [currentUser, setCurrentUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const signup = (email, password)=>{\n        if (!_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth) {\n            console.warn(\"Firebase Auth not available\");\n            return Promise.reject(new Error(\"Firebase Auth not configured\"));\n        }\n        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.createUserWithEmailAndPassword)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth, email, password);\n    };\n    const login = (email, password)=>{\n        if (!_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth) {\n            console.warn(\"Firebase Auth not available\");\n            return Promise.reject(new Error(\"Firebase Auth not configured\"));\n        }\n        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithEmailAndPassword)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth, email, password);\n    };\n    const loginAnonymously = ()=>{\n        if (!_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth) {\n            console.warn(\"Firebase Auth not available\");\n            return Promise.reject(new Error(\"Firebase Auth not configured\"));\n        }\n        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInAnonymously)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth);\n    };\n    const logout = ()=>{\n        if (!_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth) {\n            console.warn(\"Firebase Auth not available\");\n            return Promise.reject(new Error(\"Firebase Auth not configured\"));\n        }\n        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signOut)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth) {\n            setLoading(false);\n            return;\n        }\n        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth, (user)=>{\n            setCurrentUser(user);\n            setLoading(false);\n        });\n        return unsubscribe;\n    }, []);\n    const value = {\n        currentUser,\n        signup,\n        login,\n        loginAnonymously,\n        logout\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: !loading && children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\JAYANT\\\\OneDrive\\\\Documents\\\\ClarityAI\\\\frontend\\\\components\\\\AuthProvider.jsx\",\n        lineNumber: 76,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0F1dGhQcm92aWRlci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXVFO0FBT2hEO0FBQ2dCO0FBRXZDLE1BQU1VLDRCQUFjVixvREFBYUEsQ0FBQyxDQUFDO0FBRTVCLE1BQU1XLFVBQVU7SUFDckIsT0FBT1YsaURBQVVBLENBQUNTO0FBQ3BCLEVBQUU7QUFFYSxTQUFTRSxhQUFhLEVBQUVDLFFBQVEsRUFBRTtJQUMvQyxNQUFNLENBQUNDLGFBQWFDLGVBQWUsR0FBR1osK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDYSxTQUFTQyxXQUFXLEdBQUdkLCtDQUFRQSxDQUFDO0lBRXZDLE1BQU1lLFNBQVMsQ0FBQ0MsT0FBT0M7UUFDckIsSUFBSSxDQUFDWCwrQ0FBSUEsRUFBRTtZQUNUWSxRQUFRQyxJQUFJLENBQUM7WUFDYixPQUFPQyxRQUFRQyxNQUFNLENBQUMsSUFBSUMsTUFBTTtRQUNsQztRQUNBLE9BQU9wQiw2RUFBOEJBLENBQUNJLCtDQUFJQSxFQUFFVSxPQUFPQztJQUNyRDtJQUVBLE1BQU1NLFFBQVEsQ0FBQ1AsT0FBT0M7UUFDcEIsSUFBSSxDQUFDWCwrQ0FBSUEsRUFBRTtZQUNUWSxRQUFRQyxJQUFJLENBQUM7WUFDYixPQUFPQyxRQUFRQyxNQUFNLENBQUMsSUFBSUMsTUFBTTtRQUNsQztRQUNBLE9BQU9yQix5RUFBMEJBLENBQUNLLCtDQUFJQSxFQUFFVSxPQUFPQztJQUNqRDtJQUVBLE1BQU1PLG1CQUFtQjtRQUN2QixJQUFJLENBQUNsQiwrQ0FBSUEsRUFBRTtZQUNUWSxRQUFRQyxJQUFJLENBQUM7WUFDYixPQUFPQyxRQUFRQyxNQUFNLENBQUMsSUFBSUMsTUFBTTtRQUNsQztRQUNBLE9BQU9uQixnRUFBaUJBLENBQUNHLCtDQUFJQTtJQUMvQjtJQUVBLE1BQU1tQixTQUFTO1FBQ2IsSUFBSSxDQUFDbkIsK0NBQUlBLEVBQUU7WUFDVFksUUFBUUMsSUFBSSxDQUFDO1lBQ2IsT0FBT0MsUUFBUUMsTUFBTSxDQUFDLElBQUlDLE1BQU07UUFDbEM7UUFDQSxPQUFPbEIsc0RBQU9BLENBQUNFLCtDQUFJQTtJQUNyQjtJQUVBUCxnREFBU0EsQ0FBQztRQUNSLElBQUksQ0FBQ08sK0NBQUlBLEVBQUU7WUFDVFEsV0FBVztZQUNYO1FBQ0Y7UUFFQSxNQUFNWSxjQUFjckIsaUVBQWtCQSxDQUFDQywrQ0FBSUEsRUFBRSxDQUFDcUI7WUFDNUNmLGVBQWVlO1lBQ2ZiLFdBQVc7UUFDYjtRQUVBLE9BQU9ZO0lBQ1QsR0FBRyxFQUFFO0lBRUwsTUFBTUUsUUFBUTtRQUNaakI7UUFDQUk7UUFDQVE7UUFDQUM7UUFDQUM7SUFDRjtJQUVBLHFCQUNFLDhEQUFDbEIsWUFBWXNCLFFBQVE7UUFBQ0QsT0FBT0E7a0JBQzFCLENBQUNmLFdBQVdIOzs7Ozs7QUFHbkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGFyaXR5YWktZnJvbnRlbmQvLi9jb21wb25lbnRzL0F1dGhQcm92aWRlci5qc3g/M2EzMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBcclxuICBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCwgXHJcbiAgY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkLCBcclxuICBzaWduSW5Bbm9ueW1vdXNseSxcclxuICBzaWduT3V0LFxyXG4gIG9uQXV0aFN0YXRlQ2hhbmdlZCBcclxufSBmcm9tICdmaXJlYmFzZS9hdXRoJztcclxuaW1wb3J0IHsgYXV0aCB9IGZyb20gJy4uL2xpYi9maXJlYmFzZSc7XHJcblxyXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe30pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZUF1dGggPSAoKSA9PiB7XHJcbiAgcmV0dXJuIHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXV0aFByb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xyXG4gIGNvbnN0IFtjdXJyZW50VXNlciwgc2V0Q3VycmVudFVzZXJdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcblxyXG4gIGNvbnN0IHNpZ251cCA9IChlbWFpbCwgcGFzc3dvcmQpID0+IHtcclxuICAgIGlmICghYXV0aCkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ0ZpcmViYXNlIEF1dGggbm90IGF2YWlsYWJsZScpO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdGaXJlYmFzZSBBdXRoIG5vdCBjb25maWd1cmVkJykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChhdXRoLCBlbWFpbCwgcGFzc3dvcmQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxvZ2luID0gKGVtYWlsLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgaWYgKCFhdXRoKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignRmlyZWJhc2UgQXV0aCBub3QgYXZhaWxhYmxlJyk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ0ZpcmViYXNlIEF1dGggbm90IGNvbmZpZ3VyZWQnKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoYXV0aCwgZW1haWwsIHBhc3N3b3JkKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBsb2dpbkFub255bW91c2x5ID0gKCkgPT4ge1xyXG4gICAgaWYgKCFhdXRoKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignRmlyZWJhc2UgQXV0aCBub3QgYXZhaWxhYmxlJyk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ0ZpcmViYXNlIEF1dGggbm90IGNvbmZpZ3VyZWQnKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2lnbkluQW5vbnltb3VzbHkoYXV0aCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xyXG4gICAgaWYgKCFhdXRoKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignRmlyZWJhc2UgQXV0aCBub3QgYXZhaWxhYmxlJyk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ0ZpcmViYXNlIEF1dGggbm90IGNvbmZpZ3VyZWQnKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2lnbk91dChhdXRoKTtcclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFhdXRoKSB7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBvbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aCwgKHVzZXIpID0+IHtcclxuICAgICAgc2V0Q3VycmVudFVzZXIodXNlcik7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHVuc3Vic2NyaWJlO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgdmFsdWUgPSB7XHJcbiAgICBjdXJyZW50VXNlcixcclxuICAgIHNpZ251cCxcclxuICAgIGxvZ2luLFxyXG4gICAgbG9naW5Bbm9ueW1vdXNseSxcclxuICAgIGxvZ291dFxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT5cclxuICAgICAgeyFsb2FkaW5nICYmIGNoaWxkcmVufVxyXG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwic2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQiLCJjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQiLCJzaWduSW5Bbm9ueW1vdXNseSIsInNpZ25PdXQiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJhdXRoIiwiQXV0aENvbnRleHQiLCJ1c2VBdXRoIiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJjdXJyZW50VXNlciIsInNldEN1cnJlbnRVc2VyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzaWdudXAiLCJlbWFpbCIsInBhc3N3b3JkIiwiY29uc29sZSIsIndhcm4iLCJQcm9taXNlIiwicmVqZWN0IiwiRXJyb3IiLCJsb2dpbiIsImxvZ2luQW5vbnltb3VzbHkiLCJsb2dvdXQiLCJ1bnN1YnNjcmliZSIsInVzZXIiLCJ2YWx1ZSIsIlByb3ZpZGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/AuthProvider.jsx\n");

/***/ }),

/***/ "./lib/firebase.js":
/*!*************************!*\
  !*** ./lib/firebase.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   analytics: () => (/* binding */ analytics),\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   db: () => (/* binding */ db),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/analytics */ \"firebase/analytics\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_analytics__WEBPACK_IMPORTED_MODULE_3__]);\n([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_analytics__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n// Check if Firebase config is available\nconst hasFirebaseConfig =  true && \"clarityai-6372d\";\nlet app = null;\nlet auth = null;\nlet db = null;\nlet analytics = null;\nif (hasFirebaseConfig) {\n    const firebaseConfig = {\n        apiKey: \"AIzaSyDIDrqDK_e9ibD-zq5AfW6TtOgxs8f5vdo\",\n        authDomain: \"clarityai-6372d.firebaseapp.com\",\n        projectId: \"clarityai-6372d\",\n        storageBucket: \"clarityai-6372d.firebasestorage.app\",\n        messagingSenderId: \"822641494953\",\n        appId: \"1:822641494953:web:9b3e427bde414d9fd6d2b8\",\n        measurementId: \"G-03PPFBY665\"\n    };\n    try {\n        // Initialize Firebase\n        app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\n        // Initialize Firebase Authentication and get a reference to the service\n        auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\n        // Initialize Cloud Firestore and get a reference to the service\n        db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);\n        // Initialize Analytics (only in browser environment)\n        if (false) {}\n    } catch (error) {\n        console.warn(\"Firebase initialization failed:\", error.message);\n    }\n} else {\n    console.warn(\"Firebase configuration not found. Please set up your .env.local file with Firebase credentials.\");\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvZmlyZWJhc2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBNkM7QUFDTDtBQUNVO0FBQ0E7QUFFbEQsd0NBQXdDO0FBQ3hDLE1BQU1JLG9CQUFvQkMsS0FBd0MsSUFDekNBLGlCQUEyQztBQUVwRSxJQUFJSSxNQUFNO0FBQ1YsSUFBSUMsT0FBTztBQUNYLElBQUlDLEtBQUs7QUFDVCxJQUFJQyxZQUFZO0FBRWhCLElBQUlSLG1CQUFtQjtJQUNyQixNQUFNUyxpQkFBaUI7UUFDckJDLFFBQVFULHlDQUF3QztRQUNoRFUsWUFBWVYsaUNBQTRDO1FBQ3hEWSxXQUFXWixpQkFBMkM7UUFDdERhLGVBQWViLHFDQUErQztRQUM5RGUsbUJBQW1CZixjQUFvRDtRQUN2RWlCLE9BQU9qQiwyQ0FBdUM7UUFDOUNtQixlQUFlbkIsY0FBK0M7SUFDaEU7SUFFQSxJQUFJO1FBQ0Ysc0JBQXNCO1FBQ3RCSSxNQUFNVCwyREFBYUEsQ0FBQ2E7UUFFcEIsd0VBQXdFO1FBQ3hFSCxPQUFPVCxzREFBT0EsQ0FBQ1E7UUFFZixnRUFBZ0U7UUFDaEVFLEtBQUtULGdFQUFZQSxDQUFDTztRQUVsQixxREFBcUQ7UUFDckQsSUFBSSxLQUFrQixFQUFhLEVBRWxDO0lBQ0gsRUFBRSxPQUFPaUIsT0FBTztRQUNkQyxRQUFRQyxJQUFJLENBQUMsbUNBQW1DRixNQUFNRyxPQUFPO0lBQy9EO0FBQ0YsT0FBTztJQUNMRixRQUFRQyxJQUFJLENBQUM7QUFDZjtBQUUrQjtBQUMvQixpRUFBZW5CLEdBQUdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGFyaXR5YWktZnJvbnRlbmQvLi9saWIvZmlyZWJhc2UuanM/YWI0NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0aWFsaXplQXBwIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcclxuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xyXG5pbXBvcnQgeyBnZXRGaXJlc3RvcmUgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xyXG5pbXBvcnQgeyBnZXRBbmFseXRpY3MgfSBmcm9tICdmaXJlYmFzZS9hbmFseXRpY3MnO1xyXG5cclxuLy8gQ2hlY2sgaWYgRmlyZWJhc2UgY29uZmlnIGlzIGF2YWlsYWJsZVxyXG5jb25zdCBoYXNGaXJlYmFzZUNvbmZpZyA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQSV9LRVkgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9QUk9KRUNUX0lEO1xyXG5cclxubGV0IGFwcCA9IG51bGw7XHJcbmxldCBhdXRoID0gbnVsbDtcclxubGV0IGRiID0gbnVsbDtcclxubGV0IGFuYWx5dGljcyA9IG51bGw7XHJcblxyXG5pZiAoaGFzRmlyZWJhc2VDb25maWcpIHtcclxuICBjb25zdCBmaXJlYmFzZUNvbmZpZyA9IHtcclxuICAgIGFwaUtleTogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBJX0tFWSxcclxuICAgIGF1dGhEb21haW46IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FVVEhfRE9NQUlOLFxyXG4gICAgcHJvamVjdElkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9QUk9KRUNUX0lELFxyXG4gICAgc3RvcmFnZUJ1Y2tldDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQsXHJcbiAgICBtZXNzYWdpbmdTZW5kZXJJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfTUVTU0FHSU5HX1NFTkRFUl9JRCxcclxuICAgIGFwcElkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9BUFBfSUQsXHJcbiAgICBtZWFzdXJlbWVudElkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9NRUFTVVJFTUVOVF9JRFxyXG4gIH07XHJcblxyXG4gIHRyeSB7XHJcbiAgICAvLyBJbml0aWFsaXplIEZpcmViYXNlXHJcbiAgICBhcHAgPSBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcclxuICAgIFxyXG4gICAgLy8gSW5pdGlhbGl6ZSBGaXJlYmFzZSBBdXRoZW50aWNhdGlvbiBhbmQgZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBzZXJ2aWNlXHJcbiAgICBhdXRoID0gZ2V0QXV0aChhcHApO1xyXG4gICAgXHJcbiAgICAvLyBJbml0aWFsaXplIENsb3VkIEZpcmVzdG9yZSBhbmQgZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBzZXJ2aWNlXHJcbiAgICBkYiA9IGdldEZpcmVzdG9yZShhcHApO1xyXG4gICAgXHJcbiAgICAvLyBJbml0aWFsaXplIEFuYWx5dGljcyAob25seSBpbiBicm93c2VyIGVudmlyb25tZW50KVxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGFuYWx5dGljcyA9IGdldEFuYWx5dGljcyhhcHApO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ0ZpcmViYXNlIGluaXRpYWxpemF0aW9uIGZhaWxlZDonLCBlcnJvci5tZXNzYWdlKTtcclxuICB9XHJcbn0gZWxzZSB7XHJcbiAgY29uc29sZS53YXJuKCdGaXJlYmFzZSBjb25maWd1cmF0aW9uIG5vdCBmb3VuZC4gUGxlYXNlIHNldCB1cCB5b3VyIC5lbnYubG9jYWwgZmlsZSB3aXRoIEZpcmViYXNlIGNyZWRlbnRpYWxzLicpO1xyXG59XHJcblxyXG5leHBvcnQgeyBhdXRoLCBkYiwgYW5hbHl0aWNzIH07XHJcbmV4cG9ydCBkZWZhdWx0IGFwcDtcclxuIl0sIm5hbWVzIjpbImluaXRpYWxpemVBcHAiLCJnZXRBdXRoIiwiZ2V0RmlyZXN0b3JlIiwiZ2V0QW5hbHl0aWNzIiwiaGFzRmlyZWJhc2VDb25maWciLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBJX0tFWSIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX1BST0pFQ1RfSUQiLCJhcHAiLCJhdXRoIiwiZGIiLCJhbmFseXRpY3MiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsImF1dGhEb21haW4iLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9BVVRIX0RPTUFJTiIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9TVE9SQUdFX0JVQ0tFVCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfTUVTU0FHSU5HX1NFTkRFUl9JRCIsImFwcElkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBQX0lEIiwibWVhc3VyZW1lbnRJZCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX01FQVNVUkVNRU5UX0lEIiwiZXJyb3IiLCJjb25zb2xlIiwid2FybiIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./lib/firebase.js\n");

/***/ }),

/***/ "./pages/_app.jsx":
/*!************************!*\
  !*** ./pages/_app.jsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_AuthProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/AuthProvider */ \"./components/AuthProvider.jsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_AuthProvider__WEBPACK_IMPORTED_MODULE_2__]);\n_components_AuthProvider__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AuthProvider__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\JAYANT\\\\OneDrive\\\\Documents\\\\ClarityAI\\\\frontend\\\\pages\\\\_app.jsx\",\n            lineNumber: 7,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\JAYANT\\\\OneDrive\\\\Documents\\\\ClarityAI\\\\frontend\\\\pages\\\\_app.jsx\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQStCO0FBQ3VCO0FBRXZDLFNBQVNDLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDbEQscUJBQ0UsOERBQUNILGdFQUFZQTtrQkFDWCw0RUFBQ0U7WUFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OztBQUc5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2NsYXJpdHlhaS1mcm9udGVuZC8uL3BhZ2VzL19hcHAuanN4PzRjYjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnO1xyXG5pbXBvcnQgQXV0aFByb3ZpZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvQXV0aFByb3ZpZGVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPEF1dGhQcm92aWRlcj5cclxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgPC9BdXRoUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOlsiQXV0aFByb3ZpZGVyIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.jsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.jsx"));
module.exports = __webpack_exports__;

})();