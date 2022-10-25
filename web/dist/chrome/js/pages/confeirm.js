/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dataService.ts":
/*!****************************!*\
  !*** ./src/dataService.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const local_1 = __importDefault(__webpack_require__(/*! ./local */ "./src/local.ts"));
// This file is to send axios request to the MySQL database
const getAllContracts = () => {
    return local_1.default.get("/contracts");
};
const get = (addr) => {
    return local_1.default.get(`/contracts/${addr}`);
};
const create = (data) => {
    return local_1.default.post("/contracts", data);
};
const update = (addr, data) => {
    return local_1.default.put(`/contracts/${addr}`, data);
};
const dataService = {
    getAllContracts,
    get,
    create,
    update
};
exports["default"] = dataService;


/***/ }),

/***/ "./src/local.ts":
/*!**********************!*\
  !*** ./src/local.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));
exports["default"] = axios_1.default.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});


/***/ }),

/***/ "./src/pages/confirm.tsx":
/*!*******************************!*\
  !*** ./src/pages/confirm.tsx ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const button_1 = __importDefault(__webpack_require__(/*! ../components/button */ "./src/components/button.tsx"));
const dataService_1 = __importDefault(__webpack_require__(/*! ../dataService */ "./src/dataService.ts"));
__webpack_require__(/*! ../styles.css */ "./src/styles.css");
const Confirm = () => {
    const width = 600;
    const height = 480;
    const left = 480;
    const top = 480;
    const initContractState = {
        address: "",
        scam: false,
        createTime: "Default",
        safe: 0,
        neutral: 0,
        danger: 0
    };
    const initUserState = {
        reported: false
    };
    //Reslove the URL Parameters to get the chain Information
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const balance = params.get('balance');
    const chainId = Number(params.get('chainId'));
    const spender = params.get('spender');
    if (spender == null)
        return (react_1.default.createElement("div", null, "ERROR"));
    // const createtime = params.get('createTime');
    const createtime = "FakeTime For Dev Propose";
    // const explorerUrl = getExplorerUrl(chainId);
    // const name = params.get('name');
    // const asset = params.get('asset');
    // const address = params.get('address');
    // const spenderName = params.get('spenderName');
    // const bypassed = params.get('bypassed') === 'true';
    // When the confirm page render do the getContract
    (0, react_1.useEffect)(() => {
        getContract();
    }, []);
    const res = (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield webextension_polyfill_1.default.runtime.sendMessage(undefined, { id, data });
        window.close();
    });
    const reject = () => res(false);
    const accpet = () => res(true);
    const [contract, setContract] = (0, react_1.useState)(initContractState);
    const [user, setUser] = (0, react_1.useState)(initUserState);
    const getContract = () => {
        dataService_1.default.get(spender)
            .then(res => {
            setContract({
                address: res.data.address,
                scam: res.data.scam,
                createTime: res.data.createTime,
                safe: res.data.safe,
                neutral: res.data.neutral,
                danger: res.data.danger
            });
        })
            .catch(e => {
            initContractState.address = spender;
            setContract(initContractState);
            dataService_1.default.create(contract);
        });
    };
    // ReFactor Needed
    const updateSafeContract = () => {
        if (user.reported == true) {
            setContract(initContractState);
            const alterwindow = webextension_polyfill_1.default.windows.create({
                url: `alter.html`,
                type: 'popup',
                width,
                height,
                left,
                top,
            });
        }
        setContract({
            address: contract.address,
            scam: contract.scam,
            createTime: contract.createTime,
            safe: contract.safe += 1,
            neutral: contract.neutral,
            danger: contract.danger
        });
        dataService_1.default.update(spender, contract);
        setUser({ reported: true });
    };
    const updateDangerContract = () => __awaiter(void 0, void 0, void 0, function* () {
        if (user.reported == true) {
            const alterWindow = yield webextension_polyfill_1.default.windows.create({
                url: `alter.html`,
                type: 'panel',
                width,
                height,
                left,
                top,
            });
            webextension_polyfill_1.default.windows.onCreated.addListener(() => {
            });
            yield webextension_polyfill_1.default.windows.update(alterWindow.id, { focused: true, width, height, left, top });
        }
        setContract({
            address: contract.address,
            scam: contract.scam,
            createTime: contract.createTime,
            safe: contract.safe,
            neutral: contract.neutral,
            danger: contract.danger += 1
        });
        dataService_1.default.update(spender, contract);
        setUser({ reported: true });
    });
    const updateNeutralContract = () => {
        if (user.reported == true) {
            setContract(initContractState);
        }
        setContract({
            address: contract.address,
            scam: contract.scam,
            createTime: contract.createTime,
            safe: contract.safe,
            neutral: contract.neutral += 1,
            danger: contract.danger
        });
        dataService_1.default.update(spender, contract);
        setUser({ reported: true });
    };
    return (react_1.default.createElement("div", { className: "flex flex-col gap-3  p-4" },
        react_1.default.createElement("div", { className: "flex flex-wrap justify-center items-center gap-2" },
            react_1.default.createElement("div", { className: "font-bold text-lg" }, "ComPas")),
        react_1.default.createElement("div", { className: "flex items-center justify-start border cursor-pointer rounded-xl " },
            react_1.default.createElement("div", { className: "flex items-center justify-between" },
                react_1.default.createElement("div", { className: "flex flex-col space-y-1" },
                    react_1.default.createElement("h2", { className: "text-lg font-bold sm:text-2xl " }, "Contract Address"),
                    react_1.default.createElement("div", { className: "px-2 text-s rounded-full sm:px-4 sm:py-1 " }, spender)))),
        react_1.default.createElement("div", { className: "flex items-center justify-start border cursor-pointer rounded-xl" },
            react_1.default.createElement("div", { className: "flex items-center justify-between" },
                react_1.default.createElement("div", { className: "flex flex-col space-y-1" },
                    react_1.default.createElement("h2", { className: "text-lg font-bold sm:text-2xl" }, "Contract Balance"),
                    react_1.default.createElement("div", { className: "px-2 text-s rounded-full sm:px-4 sm:py-1 " }, balance)))),
        react_1.default.createElement("div", { className: "flex items-center justify-start border cursor-pointer rounded-xl" },
            react_1.default.createElement("div", { className: "flex items-center justify-between" },
                react_1.default.createElement("div", { className: "flex flex-col space-y-1" },
                    react_1.default.createElement("h2", { className: "text-lg font-bold sm:text-2xl " }, "Create at"),
                    react_1.default.createElement("div", { className: "px-2 text-s rounded-full sm:px-4 sm:py-1  " }, createtime)))),
        react_1.default.createElement("div", { className: 'flex gap-1 pt-2 justify-around' },
            react_1.default.createElement("span", { className: 'contents ' },
                react_1.default.createElement("span", null,
                    "Safe Count: ",
                    contract.safe),
                react_1.default.createElement("span", null,
                    "Neutral Count: ",
                    contract.neutral),
                react_1.default.createElement("span", null,
                    "Danger Count: ",
                    contract.danger))),
        react_1.default.createElement("div", { className: 'flex gap-1 pt-2 justify-around' },
            react_1.default.createElement(button_1.default, { onClick: updateSafeContract }, " Safe Contract"),
            react_1.default.createElement(button_1.default, { onClick: updateNeutralContract }, " Neutral Contract"),
            react_1.default.createElement(button_1.default, { onClick: updateDangerContract }, " Danger Contract")),
        react_1.default.createElement("div", { className: "flex gap-1 pt-2 justify-around" },
            react_1.default.createElement(button_1.default, { onClick: reject }, "Reject"),
            react_1.default.createElement(button_1.default, { onClick: accpet }, "Accept"))));
};
react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(Confirm, null)), document.getElementById('root'));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"pages/confeirm": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkggl_crx"] = self["webpackChunkggl_crx"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/pages/confirm.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztXQ2hEQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2dsX2NyeC8uL3NyYy9kYXRhU2VydmljZS50cyIsIndlYnBhY2s6Ly9nZ2xfY3J4Ly4vc3JjL2xvY2FsLnRzIiwid2VicGFjazovL2dnbF9jcngvLi9zcmMvcGFnZXMvY29uZmlybS50c3giLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9hbWQgb3B0aW9ucyIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBsb2NhbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2xvY2FsXCIpKTtcbi8vIFRoaXMgZmlsZSBpcyB0byBzZW5kIGF4aW9zIHJlcXVlc3QgdG8gdGhlIE15U1FMIGRhdGFiYXNlXG5jb25zdCBnZXRBbGxDb250cmFjdHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGxvY2FsXzEuZGVmYXVsdC5nZXQoXCIvY29udHJhY3RzXCIpO1xufTtcbmNvbnN0IGdldCA9IChhZGRyKSA9PiB7XG4gICAgcmV0dXJuIGxvY2FsXzEuZGVmYXVsdC5nZXQoYC9jb250cmFjdHMvJHthZGRyfWApO1xufTtcbmNvbnN0IGNyZWF0ZSA9IChkYXRhKSA9PiB7XG4gICAgcmV0dXJuIGxvY2FsXzEuZGVmYXVsdC5wb3N0KFwiL2NvbnRyYWN0c1wiLCBkYXRhKTtcbn07XG5jb25zdCB1cGRhdGUgPSAoYWRkciwgZGF0YSkgPT4ge1xuICAgIHJldHVybiBsb2NhbF8xLmRlZmF1bHQucHV0KGAvY29udHJhY3RzLyR7YWRkcn1gLCBkYXRhKTtcbn07XG5jb25zdCBkYXRhU2VydmljZSA9IHtcbiAgICBnZXRBbGxDb250cmFjdHMsXG4gICAgZ2V0LFxuICAgIGNyZWF0ZSxcbiAgICB1cGRhdGVcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkYXRhU2VydmljZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXhpb3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiYXhpb3NcIikpO1xuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3NfMS5kZWZhdWx0LmNyZWF0ZSh7XG4gICAgYmFzZVVSTDogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH1cbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgcmVhY3RfZG9tXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0LWRvbVwiKSk7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IGJ1dHRvbl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2J1dHRvblwiKSk7XG5jb25zdCBkYXRhU2VydmljZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9kYXRhU2VydmljZVwiKSk7XG5yZXF1aXJlKFwiLi4vc3R5bGVzLmNzc1wiKTtcbmNvbnN0IENvbmZpcm0gPSAoKSA9PiB7XG4gICAgY29uc3Qgd2lkdGggPSA2MDA7XG4gICAgY29uc3QgaGVpZ2h0ID0gNDgwO1xuICAgIGNvbnN0IGxlZnQgPSA0ODA7XG4gICAgY29uc3QgdG9wID0gNDgwO1xuICAgIGNvbnN0IGluaXRDb250cmFjdFN0YXRlID0ge1xuICAgICAgICBhZGRyZXNzOiBcIlwiLFxuICAgICAgICBzY2FtOiBmYWxzZSxcbiAgICAgICAgY3JlYXRlVGltZTogXCJEZWZhdWx0XCIsXG4gICAgICAgIHNhZmU6IDAsXG4gICAgICAgIG5ldXRyYWw6IDAsXG4gICAgICAgIGRhbmdlcjogMFxuICAgIH07XG4gICAgY29uc3QgaW5pdFVzZXJTdGF0ZSA9IHtcbiAgICAgICAgcmVwb3J0ZWQ6IGZhbHNlXG4gICAgfTtcbiAgICAvL1Jlc2xvdmUgdGhlIFVSTCBQYXJhbWV0ZXJzIHRvIGdldCB0aGUgY2hhaW4gSW5mb3JtYXRpb25cbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IGlkID0gcGFyYW1zLmdldCgnaWQnKTtcbiAgICBjb25zdCBiYWxhbmNlID0gcGFyYW1zLmdldCgnYmFsYW5jZScpO1xuICAgIGNvbnN0IGNoYWluSWQgPSBOdW1iZXIocGFyYW1zLmdldCgnY2hhaW5JZCcpKTtcbiAgICBjb25zdCBzcGVuZGVyID0gcGFyYW1zLmdldCgnc3BlbmRlcicpO1xuICAgIGlmIChzcGVuZGVyID09IG51bGwpXG4gICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJFUlJPUlwiKSk7XG4gICAgLy8gY29uc3QgY3JlYXRldGltZSA9IHBhcmFtcy5nZXQoJ2NyZWF0ZVRpbWUnKTtcbiAgICBjb25zdCBjcmVhdGV0aW1lID0gXCJGYWtlVGltZSBGb3IgRGV2IFByb3Bvc2VcIjtcbiAgICAvLyBjb25zdCBleHBsb3JlclVybCA9IGdldEV4cGxvcmVyVXJsKGNoYWluSWQpO1xuICAgIC8vIGNvbnN0IG5hbWUgPSBwYXJhbXMuZ2V0KCduYW1lJyk7XG4gICAgLy8gY29uc3QgYXNzZXQgPSBwYXJhbXMuZ2V0KCdhc3NldCcpO1xuICAgIC8vIGNvbnN0IGFkZHJlc3MgPSBwYXJhbXMuZ2V0KCdhZGRyZXNzJyk7XG4gICAgLy8gY29uc3Qgc3BlbmRlck5hbWUgPSBwYXJhbXMuZ2V0KCdzcGVuZGVyTmFtZScpO1xuICAgIC8vIGNvbnN0IGJ5cGFzc2VkID0gcGFyYW1zLmdldCgnYnlwYXNzZWQnKSA9PT0gJ3RydWUnO1xuICAgIC8vIFdoZW4gdGhlIGNvbmZpcm0gcGFnZSByZW5kZXIgZG8gdGhlIGdldENvbnRyYWN0XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGdldENvbnRyYWN0KCk7XG4gICAgfSwgW10pO1xuICAgIGNvbnN0IHJlcyA9IChkYXRhKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgeWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHVuZGVmaW5lZCwgeyBpZCwgZGF0YSB9KTtcbiAgICAgICAgd2luZG93LmNsb3NlKCk7XG4gICAgfSk7XG4gICAgY29uc3QgcmVqZWN0ID0gKCkgPT4gcmVzKGZhbHNlKTtcbiAgICBjb25zdCBhY2NwZXQgPSAoKSA9PiByZXModHJ1ZSk7XG4gICAgY29uc3QgW2NvbnRyYWN0LCBzZXRDb250cmFjdF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoaW5pdENvbnRyYWN0U3RhdGUpO1xuICAgIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShpbml0VXNlclN0YXRlKTtcbiAgICBjb25zdCBnZXRDb250cmFjdCA9ICgpID0+IHtcbiAgICAgICAgZGF0YVNlcnZpY2VfMS5kZWZhdWx0LmdldChzcGVuZGVyKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHNldENvbnRyYWN0KHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMuZGF0YS5hZGRyZXNzLFxuICAgICAgICAgICAgICAgIHNjYW06IHJlcy5kYXRhLnNjYW0sXG4gICAgICAgICAgICAgICAgY3JlYXRlVGltZTogcmVzLmRhdGEuY3JlYXRlVGltZSxcbiAgICAgICAgICAgICAgICBzYWZlOiByZXMuZGF0YS5zYWZlLFxuICAgICAgICAgICAgICAgIG5ldXRyYWw6IHJlcy5kYXRhLm5ldXRyYWwsXG4gICAgICAgICAgICAgICAgZGFuZ2VyOiByZXMuZGF0YS5kYW5nZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgaW5pdENvbnRyYWN0U3RhdGUuYWRkcmVzcyA9IHNwZW5kZXI7XG4gICAgICAgICAgICBzZXRDb250cmFjdChpbml0Q29udHJhY3RTdGF0ZSk7XG4gICAgICAgICAgICBkYXRhU2VydmljZV8xLmRlZmF1bHQuY3JlYXRlKGNvbnRyYWN0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBSZUZhY3RvciBOZWVkZWRcbiAgICBjb25zdCB1cGRhdGVTYWZlQ29udHJhY3QgPSAoKSA9PiB7XG4gICAgICAgIGlmICh1c2VyLnJlcG9ydGVkID09IHRydWUpIHtcbiAgICAgICAgICAgIHNldENvbnRyYWN0KGluaXRDb250cmFjdFN0YXRlKTtcbiAgICAgICAgICAgIGNvbnN0IGFsdGVyd2luZG93ID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC53aW5kb3dzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdXJsOiBgYWx0ZXIuaHRtbGAsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3BvcHVwJyxcbiAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgICAgICB0b3AsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXRDb250cmFjdCh7XG4gICAgICAgICAgICBhZGRyZXNzOiBjb250cmFjdC5hZGRyZXNzLFxuICAgICAgICAgICAgc2NhbTogY29udHJhY3Quc2NhbSxcbiAgICAgICAgICAgIGNyZWF0ZVRpbWU6IGNvbnRyYWN0LmNyZWF0ZVRpbWUsXG4gICAgICAgICAgICBzYWZlOiBjb250cmFjdC5zYWZlICs9IDEsXG4gICAgICAgICAgICBuZXV0cmFsOiBjb250cmFjdC5uZXV0cmFsLFxuICAgICAgICAgICAgZGFuZ2VyOiBjb250cmFjdC5kYW5nZXJcbiAgICAgICAgfSk7XG4gICAgICAgIGRhdGFTZXJ2aWNlXzEuZGVmYXVsdC51cGRhdGUoc3BlbmRlciwgY29udHJhY3QpO1xuICAgICAgICBzZXRVc2VyKHsgcmVwb3J0ZWQ6IHRydWUgfSk7XG4gICAgfTtcbiAgICBjb25zdCB1cGRhdGVEYW5nZXJDb250cmFjdCA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAodXNlci5yZXBvcnRlZCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBhbHRlcldpbmRvdyA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQud2luZG93cy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHVybDogYGFsdGVyLmh0bWxgLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdwYW5lbCcsXG4gICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICAgICAgdG9wLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LndpbmRvd3Mub25DcmVhdGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgeWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC53aW5kb3dzLnVwZGF0ZShhbHRlcldpbmRvdy5pZCwgeyBmb2N1c2VkOiB0cnVlLCB3aWR0aCwgaGVpZ2h0LCBsZWZ0LCB0b3AgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0Q29udHJhY3Qoe1xuICAgICAgICAgICAgYWRkcmVzczogY29udHJhY3QuYWRkcmVzcyxcbiAgICAgICAgICAgIHNjYW06IGNvbnRyYWN0LnNjYW0sXG4gICAgICAgICAgICBjcmVhdGVUaW1lOiBjb250cmFjdC5jcmVhdGVUaW1lLFxuICAgICAgICAgICAgc2FmZTogY29udHJhY3Quc2FmZSxcbiAgICAgICAgICAgIG5ldXRyYWw6IGNvbnRyYWN0Lm5ldXRyYWwsXG4gICAgICAgICAgICBkYW5nZXI6IGNvbnRyYWN0LmRhbmdlciArPSAxXG4gICAgICAgIH0pO1xuICAgICAgICBkYXRhU2VydmljZV8xLmRlZmF1bHQudXBkYXRlKHNwZW5kZXIsIGNvbnRyYWN0KTtcbiAgICAgICAgc2V0VXNlcih7IHJlcG9ydGVkOiB0cnVlIH0pO1xuICAgIH0pO1xuICAgIGNvbnN0IHVwZGF0ZU5ldXRyYWxDb250cmFjdCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXIucmVwb3J0ZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2V0Q29udHJhY3QoaW5pdENvbnRyYWN0U3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHNldENvbnRyYWN0KHtcbiAgICAgICAgICAgIGFkZHJlc3M6IGNvbnRyYWN0LmFkZHJlc3MsXG4gICAgICAgICAgICBzY2FtOiBjb250cmFjdC5zY2FtLFxuICAgICAgICAgICAgY3JlYXRlVGltZTogY29udHJhY3QuY3JlYXRlVGltZSxcbiAgICAgICAgICAgIHNhZmU6IGNvbnRyYWN0LnNhZmUsXG4gICAgICAgICAgICBuZXV0cmFsOiBjb250cmFjdC5uZXV0cmFsICs9IDEsXG4gICAgICAgICAgICBkYW5nZXI6IGNvbnRyYWN0LmRhbmdlclxuICAgICAgICB9KTtcbiAgICAgICAgZGF0YVNlcnZpY2VfMS5kZWZhdWx0LnVwZGF0ZShzcGVuZGVyLCBjb250cmFjdCk7XG4gICAgICAgIHNldFVzZXIoeyByZXBvcnRlZDogdHJ1ZSB9KTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LWNvbCBnYXAtMyAgcC00XCIgfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LXdyYXAganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIGdhcC0yXCIgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtYm9sZCB0ZXh0LWxnXCIgfSwgXCJDb21QYXNcIikpLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LXN0YXJ0IGJvcmRlciBjdXJzb3ItcG9pbnRlciByb3VuZGVkLXhsIFwiIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIiB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1jb2wgc3BhY2UteS0xXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtYm9sZCBzbTp0ZXh0LTJ4bCBcIiB9LCBcIkNvbnRyYWN0IEFkZHJlc3NcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInB4LTIgdGV4dC1zIHJvdW5kZWQtZnVsbCBzbTpweC00IHNtOnB5LTEgXCIgfSwgc3BlbmRlcikpKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktc3RhcnQgYm9yZGVyIGN1cnNvci1wb2ludGVyIHJvdW5kZWQteGxcIiB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtY29sIHNwYWNlLXktMVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LWJvbGQgc206dGV4dC0yeGxcIiB9LCBcIkNvbnRyYWN0IEJhbGFuY2VcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInB4LTIgdGV4dC1zIHJvdW5kZWQtZnVsbCBzbTpweC00IHNtOnB5LTEgXCIgfSwgYmFsYW5jZSkpKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktc3RhcnQgYm9yZGVyIGN1cnNvci1wb2ludGVyIHJvdW5kZWQteGxcIiB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtY29sIHNwYWNlLXktMVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LWJvbGQgc206dGV4dC0yeGwgXCIgfSwgXCJDcmVhdGUgYXRcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInB4LTIgdGV4dC1zIHJvdW5kZWQtZnVsbCBzbTpweC00IHNtOnB5LTEgIFwiIH0sIGNyZWF0ZXRpbWUpKSkpLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2ZsZXggZ2FwLTEgcHQtMiBqdXN0aWZ5LWFyb3VuZCcgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogJ2NvbnRlbnRzICcgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgXCJTYWZlIENvdW50OiBcIixcbiAgICAgICAgICAgICAgICAgICAgY29udHJhY3Quc2FmZSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFwiTmV1dHJhbCBDb3VudDogXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0Lm5ldXRyYWwpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBcIkRhbmdlciBDb3VudDogXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0LmRhbmdlcikpKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdmbGV4IGdhcC0xIHB0LTIganVzdGlmeS1hcm91bmQnIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6IHVwZGF0ZVNhZmVDb250cmFjdCB9LCBcIiBTYWZlIENvbnRyYWN0XCIpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiB1cGRhdGVOZXV0cmFsQ29udHJhY3QgfSwgXCIgTmV1dHJhbCBDb250cmFjdFwiKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogdXBkYXRlRGFuZ2VyQ29udHJhY3QgfSwgXCIgRGFuZ2VyIENvbnRyYWN0XCIpKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBnYXAtMSBwdC0yIGp1c3RpZnktYXJvdW5kXCIgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogcmVqZWN0IH0sIFwiUmVqZWN0XCIpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiBhY2NwZXQgfSwgXCJBY2NlcHRcIikpKSk7XG59O1xucmVhY3RfZG9tXzEuZGVmYXVsdC5yZW5kZXIocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LlN0cmljdE1vZGUsIG51bGwsXG4gICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQ29uZmlybSwgbnVsbCkpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmFtZE8gPSB7fTsiLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJwYWdlcy9jb25mZWlybVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtnZ2xfY3J4XCJdID0gc2VsZltcIndlYnBhY2tDaHVua2dnbF9jcnhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3BhZ2VzL2NvbmZpcm0udHN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=