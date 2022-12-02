/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/button.tsx":
/*!***********************************!*\
  !*** ./src/components/button.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Button = ({ children, onClick }) => (react_1.default.createElement("button", { className: "px-2 py-1 bg-black text-white rounded", onClick: onClick }, children));
exports["default"] = Button;


/***/ }),

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
const getByAddress = (addr) => {
    return new Promise((resolve, reject) => {
        local_1.default.get(`/contract/?address=${addr}`)
            .then((res) => {
            console.log('GET Success');
            console.log(res.data);
            resolve(res.data);
        }).catch((err) => {
            console.log('GET Err: ', err);
            reject(err);
        });
    });
};
const create = (data) => {
    return local_1.default.post("/contracts", data);
};
const update = (addr, data) => {
    return local_1.default.put(`/contracts/${addr}`, data);
};
const dataService = {
    getAllContracts,
    create,
    update,
    getByAddress,
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
const axios_fetch_adapter_1 = __importDefault(__webpack_require__(/*! @vespaiach/axios-fetch-adapter */ "./node_modules/@vespaiach/axios-fetch-adapter/index.js"));
exports["default"] = axios_1.default.create({
    // Change the baseURL to get the cloud service
    baseURL: "http://127.0.0.1:8080",
    headers: {
        "Content-type": "application/json"
    },
    adapter: axios_fetch_adapter_1.default
});


/***/ }),

/***/ "./src/pages/menu.tsx":
/*!****************************!*\
  !*** ./src/pages/menu.tsx ***!
  \****************************/
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
const dataService_1 = __importDefault(__webpack_require__(/*! ../dataService */ "./src/dataService.ts"));
const transfer_1 = __webpack_require__(/*! ./transfer */ "./src/pages/transfer.tsx");
const moreInfo_1 = __webpack_require__(/*! ./moreInfo */ "./src/pages/moreInfo.tsx");
const report_1 = __webpack_require__(/*! ./report */ "./src/pages/report.tsx");
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const button_1 = __importDefault(__webpack_require__(/*! ../components/button */ "./src/components/button.tsx"));
const Menu = () => {
    //Reslove the URL Parameters to get the chain Information
    const params = new URLSearchParams(window.location.search);
    const spender = params.get('spender');
    if (spender === null)
        return (react_1.default.createElement("div", null, "ERROR: Spender Address === NULL"));
    const id = params.get('id');
    const chainId = Number(params.get('chainId'));
    // const createtime = params.get('createTime');
    // const explorerUrl = getExplorerUrl(chainId);
    // const name = params.get('name');
    // const asset = params.get('asset');
    // const address = params.get('address');
    // const spenderName = params.get('spenderName');
    // const bypassed = params.get('bypassed') === 'true';
    const initContractState = {
        Address: "0xABCDEFG",
        TokenType: "Default Type",
        Holders: "Default Holders",
        Balance: 0,
        CreateTime: new Date(2020, 4, 4, 17, 23, 42, 11),
        LastTransactionTime: new Date(2020, 4, 4, 17, 23, 42, 11),
        NumberOfTransaction: 0,
        ReserveSpotOne: "Default Reserved Spot",
        ReserveSpotTwo: "Default Reserved Spot",
        ReserveSpotThree: "Default Reserved Spot",
        ReserveSpotFour: "Default Reserved Spot",
        ReserveSpotFive: "Default Reserved Spot",
        createdAt: new Date(2020, 4, 4, 17, 23, 42, 11),
        updatedAt: new Date(2020, 4, 4, 17, 23, 42, 11),
    };
    const initUserState = {
        showState: ''
    };
    const [contractState, setContract] = (0, react_1.useState)(initContractState);
    const [userState, setUserState] = (0, react_1.useState)(initUserState);
    const [hasLoaded, setHasLoaded] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchContract = () => __awaiter(void 0, void 0, void 0, function* () {
            yield dataService_1.default.getByAddress(spender)
                .then(res => {
                setContract(res);
                setHasLoaded(true);
            });
        });
        fetchContract()
            .catch(e => {
            setContract(initContractState);
            setHasLoaded(true);
        });
    }, []);
    const extensionResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield webextension_polyfill_1.default.runtime.sendMessage(undefined, { id, data });
        window.close();
    });
    const reject = () => extensionResponse(false);
    const accept = () => extensionResponse(true);
    const changeSection = (section) => {
        let userState = {
            showState: section
        };
        setUserState(userState);
    };
    if (hasLoaded === false) {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Loading ...")));
    }
    else {
        if (userState.showState === 'moreInfo') {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(moreInfo_1.MoreInfo, null),
                react_1.default.createElement("div", { className: "flex flex-row gap-1 justify-around" },
                    react_1.default.createElement(button_1.default, { onClick: () => changeSection('transfer') }, " Transfer "),
                    react_1.default.createElement(button_1.default, { onClick: () => changeSection('report') }, " Report "),
                    react_1.default.createElement(button_1.default, { onClick: () => changeSection('moreInfo') }, " More Info "),
                    react_1.default.createElement(button_1.default, { onClick: reject }, " Reject "))));
        }
        else if (userState.showState === 'report') {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(report_1.Report, { nameTag: '', categoryTag: '', featureTag: '' }),
                react_1.default.createElement("div", { className: "flex flex-row gap-1 justify-around" },
                    react_1.default.createElement(button_1.default, { onClick: () => changeSection('transfer') }, " Transfer "),
                    react_1.default.createElement(button_1.default, { onClick: () => changeSection('report') }, " Report "),
                    react_1.default.createElement(button_1.default, { onClick: () => changeSection('moreInfo') }, " More Info "),
                    react_1.default.createElement(button_1.default, { onClick: reject }, " Reject "))));
        }
        else {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(transfer_1.Transfer, Object.assign({}, contractState)),
                react_1.default.createElement("div", { className: "flex flex-row gap-1 justify-around" },
                    react_1.default.createElement(button_1.default, { onClick: () => changeSection('transfer') }, " Transfer "),
                    react_1.default.createElement(button_1.default, { onClick: () => changeSection('report') }, " Report "),
                    react_1.default.createElement(button_1.default, { onClick: () => changeSection('moreInfo') }, " More Info "),
                    react_1.default.createElement(button_1.default, { onClick: reject }, " Reject "))));
        }
    }
};
react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(Menu, null)), document.getElementById('root'));


/***/ }),

/***/ "./src/pages/report.tsx":
/*!******************************!*\
  !*** ./src/pages/report.tsx ***!
  \******************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Report = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Report = (feedBack) => {
    const initContractFeedBack = {
        nameTag: 'Default Name',
        categoryTag: 'Default category',
        featureTag: 'Default feature'
    };
    const [contractFeedBack, setContractFeedBack] = (0, react_1.useState)(initContractFeedBack);
    return (react_1.default.createElement("div", { className: 'flex flex-col' },
        react_1.default.createElement("form", { className: 'flex flex-col' },
            react_1.default.createElement("input", { type: 'text', placeholder: 'Name' }),
            react_1.default.createElement("input", { type: 'text', placeholder: 'Category' }),
            react_1.default.createElement("input", { type: 'text', placeholder: 'Feature' }),
            react_1.default.createElement("input", { type: 'submit', value: "Press to report" }))));
};
exports.Report = Report;
// ReactDom.render(
//     <React.StrictMode>
//         <Report nameTag={''} categoryTag={''} featureTag={''} />
//     </React.StrictMode>,
//     document.getElementById('root')
// );


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
/******/ 			"pages/menu": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/pages/menu.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztXQ2hEQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2dsX2NyeC8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi50c3giLCJ3ZWJwYWNrOi8vZ2dsX2NyeC8uL3NyYy9kYXRhU2VydmljZS50cyIsIndlYnBhY2s6Ly9nZ2xfY3J4Ly4vc3JjL2xvY2FsLnRzIiwid2VicGFjazovL2dnbF9jcngvLi9zcmMvcGFnZXMvbWVudS50c3giLCJ3ZWJwYWNrOi8vZ2dsX2NyeC8uL3NyYy9wYWdlcy9yZXBvcnQudHN4Iiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvYW1kIG9wdGlvbnMiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgQnV0dG9uID0gKHsgY2hpbGRyZW4sIG9uQ2xpY2sgfSkgPT4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcInB4LTIgcHktMSBiZy1ibGFjayB0ZXh0LXdoaXRlIHJvdW5kZWRcIiwgb25DbGljazogb25DbGljayB9LCBjaGlsZHJlbikpO1xuZXhwb3J0cy5kZWZhdWx0ID0gQnV0dG9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBsb2NhbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2xvY2FsXCIpKTtcbi8vIFRoaXMgZmlsZSBpcyB0byBzZW5kIGF4aW9zIHJlcXVlc3QgdG8gdGhlIE15U1FMIGRhdGFiYXNlXG5jb25zdCBnZXRBbGxDb250cmFjdHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGxvY2FsXzEuZGVmYXVsdC5nZXQoXCIvY29udHJhY3RzXCIpO1xufTtcbmNvbnN0IGdldEJ5QWRkcmVzcyA9IChhZGRyKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbG9jYWxfMS5kZWZhdWx0LmdldChgL2NvbnRyYWN0Lz9hZGRyZXNzPSR7YWRkcn1gKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dFVCBTdWNjZXNzJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dFVCBFcnI6ICcsIGVycik7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY29uc3QgY3JlYXRlID0gKGRhdGEpID0+IHtcbiAgICByZXR1cm4gbG9jYWxfMS5kZWZhdWx0LnBvc3QoXCIvY29udHJhY3RzXCIsIGRhdGEpO1xufTtcbmNvbnN0IHVwZGF0ZSA9IChhZGRyLCBkYXRhKSA9PiB7XG4gICAgcmV0dXJuIGxvY2FsXzEuZGVmYXVsdC5wdXQoYC9jb250cmFjdHMvJHthZGRyfWAsIGRhdGEpO1xufTtcbmNvbnN0IGRhdGFTZXJ2aWNlID0ge1xuICAgIGdldEFsbENvbnRyYWN0cyxcbiAgICBjcmVhdGUsXG4gICAgdXBkYXRlLFxuICAgIGdldEJ5QWRkcmVzcyxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkYXRhU2VydmljZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXhpb3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiYXhpb3NcIikpO1xuY29uc3QgYXhpb3NfZmV0Y2hfYWRhcHRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJAdmVzcGFpYWNoL2F4aW9zLWZldGNoLWFkYXB0ZXJcIikpO1xuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3NfMS5kZWZhdWx0LmNyZWF0ZSh7XG4gICAgLy8gQ2hhbmdlIHRoZSBiYXNlVVJMIHRvIGdldCB0aGUgY2xvdWQgc2VydmljZVxuICAgIGJhc2VVUkw6IFwiaHR0cDovLzEyNy4wLjAuMTo4MDgwXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgYWRhcHRlcjogYXhpb3NfZmV0Y2hfYWRhcHRlcl8xLmRlZmF1bHRcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgcmVhY3RfZG9tXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0LWRvbVwiKSk7XG5jb25zdCBkYXRhU2VydmljZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9kYXRhU2VydmljZVwiKSk7XG5jb25zdCB0cmFuc2Zlcl8xID0gcmVxdWlyZShcIi4vdHJhbnNmZXJcIik7XG5jb25zdCBtb3JlSW5mb18xID0gcmVxdWlyZShcIi4vbW9yZUluZm9cIik7XG5jb25zdCByZXBvcnRfMSA9IHJlcXVpcmUoXCIuL3JlcG9ydFwiKTtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgYnV0dG9uXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYnV0dG9uXCIpKTtcbmNvbnN0IE1lbnUgPSAoKSA9PiB7XG4gICAgLy9SZXNsb3ZlIHRoZSBVUkwgUGFyYW1ldGVycyB0byBnZXQgdGhlIGNoYWluIEluZm9ybWF0aW9uXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBjb25zdCBzcGVuZGVyID0gcGFyYW1zLmdldCgnc3BlbmRlcicpO1xuICAgIGlmIChzcGVuZGVyID09PSBudWxsKVxuICAgICAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwiRVJST1I6IFNwZW5kZXIgQWRkcmVzcyA9PT0gTlVMTFwiKSk7XG4gICAgY29uc3QgaWQgPSBwYXJhbXMuZ2V0KCdpZCcpO1xuICAgIGNvbnN0IGNoYWluSWQgPSBOdW1iZXIocGFyYW1zLmdldCgnY2hhaW5JZCcpKTtcbiAgICAvLyBjb25zdCBjcmVhdGV0aW1lID0gcGFyYW1zLmdldCgnY3JlYXRlVGltZScpO1xuICAgIC8vIGNvbnN0IGV4cGxvcmVyVXJsID0gZ2V0RXhwbG9yZXJVcmwoY2hhaW5JZCk7XG4gICAgLy8gY29uc3QgbmFtZSA9IHBhcmFtcy5nZXQoJ25hbWUnKTtcbiAgICAvLyBjb25zdCBhc3NldCA9IHBhcmFtcy5nZXQoJ2Fzc2V0Jyk7XG4gICAgLy8gY29uc3QgYWRkcmVzcyA9IHBhcmFtcy5nZXQoJ2FkZHJlc3MnKTtcbiAgICAvLyBjb25zdCBzcGVuZGVyTmFtZSA9IHBhcmFtcy5nZXQoJ3NwZW5kZXJOYW1lJyk7XG4gICAgLy8gY29uc3QgYnlwYXNzZWQgPSBwYXJhbXMuZ2V0KCdieXBhc3NlZCcpID09PSAndHJ1ZSc7XG4gICAgY29uc3QgaW5pdENvbnRyYWN0U3RhdGUgPSB7XG4gICAgICAgIEFkZHJlc3M6IFwiMHhBQkNERUZHXCIsXG4gICAgICAgIFRva2VuVHlwZTogXCJEZWZhdWx0IFR5cGVcIixcbiAgICAgICAgSG9sZGVyczogXCJEZWZhdWx0IEhvbGRlcnNcIixcbiAgICAgICAgQmFsYW5jZTogMCxcbiAgICAgICAgQ3JlYXRlVGltZTogbmV3IERhdGUoMjAyMCwgNCwgNCwgMTcsIDIzLCA0MiwgMTEpLFxuICAgICAgICBMYXN0VHJhbnNhY3Rpb25UaW1lOiBuZXcgRGF0ZSgyMDIwLCA0LCA0LCAxNywgMjMsIDQyLCAxMSksXG4gICAgICAgIE51bWJlck9mVHJhbnNhY3Rpb246IDAsXG4gICAgICAgIFJlc2VydmVTcG90T25lOiBcIkRlZmF1bHQgUmVzZXJ2ZWQgU3BvdFwiLFxuICAgICAgICBSZXNlcnZlU3BvdFR3bzogXCJEZWZhdWx0IFJlc2VydmVkIFNwb3RcIixcbiAgICAgICAgUmVzZXJ2ZVNwb3RUaHJlZTogXCJEZWZhdWx0IFJlc2VydmVkIFNwb3RcIixcbiAgICAgICAgUmVzZXJ2ZVNwb3RGb3VyOiBcIkRlZmF1bHQgUmVzZXJ2ZWQgU3BvdFwiLFxuICAgICAgICBSZXNlcnZlU3BvdEZpdmU6IFwiRGVmYXVsdCBSZXNlcnZlZCBTcG90XCIsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoMjAyMCwgNCwgNCwgMTcsIDIzLCA0MiwgMTEpLFxuICAgICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKDIwMjAsIDQsIDQsIDE3LCAyMywgNDIsIDExKSxcbiAgICB9O1xuICAgIGNvbnN0IGluaXRVc2VyU3RhdGUgPSB7XG4gICAgICAgIHNob3dTdGF0ZTogJydcbiAgICB9O1xuICAgIGNvbnN0IFtjb250cmFjdFN0YXRlLCBzZXRDb250cmFjdF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoaW5pdENvbnRyYWN0U3RhdGUpO1xuICAgIGNvbnN0IFt1c2VyU3RhdGUsIHNldFVzZXJTdGF0ZV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoaW5pdFVzZXJTdGF0ZSk7XG4gICAgY29uc3QgW2hhc0xvYWRlZCwgc2V0SGFzTG9hZGVkXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZldGNoQ29udHJhY3QgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHlpZWxkIGRhdGFTZXJ2aWNlXzEuZGVmYXVsdC5nZXRCeUFkZHJlc3Moc3BlbmRlcilcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHNldENvbnRyYWN0KHJlcyk7XG4gICAgICAgICAgICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBmZXRjaENvbnRyYWN0KClcbiAgICAgICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIHNldENvbnRyYWN0KGluaXRDb250cmFjdFN0YXRlKTtcbiAgICAgICAgICAgIHNldEhhc0xvYWRlZCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSwgW10pO1xuICAgIGNvbnN0IGV4dGVuc2lvblJlc3BvbnNlID0gKGRhdGEpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UodW5kZWZpbmVkLCB7IGlkLCBkYXRhIH0pO1xuICAgICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICB9KTtcbiAgICBjb25zdCByZWplY3QgPSAoKSA9PiBleHRlbnNpb25SZXNwb25zZShmYWxzZSk7XG4gICAgY29uc3QgYWNjZXB0ID0gKCkgPT4gZXh0ZW5zaW9uUmVzcG9uc2UodHJ1ZSk7XG4gICAgY29uc3QgY2hhbmdlU2VjdGlvbiA9IChzZWN0aW9uKSA9PiB7XG4gICAgICAgIGxldCB1c2VyU3RhdGUgPSB7XG4gICAgICAgICAgICBzaG93U3RhdGU6IHNlY3Rpb25cbiAgICAgICAgfTtcbiAgICAgICAgc2V0VXNlclN0YXRlKHVzZXJTdGF0ZSk7XG4gICAgfTtcbiAgICBpZiAoaGFzTG9hZGVkID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgxXCIsIG51bGwsIFwiTG9hZGluZyAuLi5cIikpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICh1c2VyU3RhdGUuc2hvd1N0YXRlID09PSAnbW9yZUluZm8nKSB7XG4gICAgICAgICAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChtb3JlSW5mb18xLk1vcmVJbmZvLCBudWxsKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtcm93IGdhcC0xIGp1c3RpZnktYXJvdW5kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiAoKSA9PiBjaGFuZ2VTZWN0aW9uKCd0cmFuc2ZlcicpIH0sIFwiIFRyYW5zZmVyIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiAoKSA9PiBjaGFuZ2VTZWN0aW9uKCdyZXBvcnQnKSB9LCBcIiBSZXBvcnQgXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ21vcmVJbmZvJykgfSwgXCIgTW9yZSBJbmZvIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiByZWplY3QgfSwgXCIgUmVqZWN0IFwiKSkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1c2VyU3RhdGUuc2hvd1N0YXRlID09PSAncmVwb3J0Jykge1xuICAgICAgICAgICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVwb3J0XzEuUmVwb3J0LCB7IG5hbWVUYWc6ICcnLCBjYXRlZ29yeVRhZzogJycsIGZlYXR1cmVUYWc6ICcnIH0pLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1yb3cgZ2FwLTEganVzdGlmeS1hcm91bmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ3RyYW5zZmVyJykgfSwgXCIgVHJhbnNmZXIgXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ3JlcG9ydCcpIH0sIFwiIFJlcG9ydCBcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogKCkgPT4gY2hhbmdlU2VjdGlvbignbW9yZUluZm8nKSB9LCBcIiBNb3JlIEluZm8gXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6IHJlamVjdCB9LCBcIiBSZWplY3QgXCIpKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQodHJhbnNmZXJfMS5UcmFuc2ZlciwgT2JqZWN0LmFzc2lnbih7fSwgY29udHJhY3RTdGF0ZSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1yb3cgZ2FwLTEganVzdGlmeS1hcm91bmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ3RyYW5zZmVyJykgfSwgXCIgVHJhbnNmZXIgXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ3JlcG9ydCcpIH0sIFwiIFJlcG9ydCBcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogKCkgPT4gY2hhbmdlU2VjdGlvbignbW9yZUluZm8nKSB9LCBcIiBNb3JlIEluZm8gXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6IHJlamVjdCB9LCBcIiBSZWplY3QgXCIpKSkpO1xuICAgICAgICB9XG4gICAgfVxufTtcbnJlYWN0X2RvbV8xLmRlZmF1bHQucmVuZGVyKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5TdHJpY3RNb2RlLCBudWxsLFxuICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE1lbnUsIG51bGwpKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5SZXBvcnQgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBSZXBvcnQgPSAoZmVlZEJhY2spID0+IHtcbiAgICBjb25zdCBpbml0Q29udHJhY3RGZWVkQmFjayA9IHtcbiAgICAgICAgbmFtZVRhZzogJ0RlZmF1bHQgTmFtZScsXG4gICAgICAgIGNhdGVnb3J5VGFnOiAnRGVmYXVsdCBjYXRlZ29yeScsXG4gICAgICAgIGZlYXR1cmVUYWc6ICdEZWZhdWx0IGZlYXR1cmUnXG4gICAgfTtcbiAgICBjb25zdCBbY29udHJhY3RGZWVkQmFjaywgc2V0Q29udHJhY3RGZWVkQmFja10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoaW5pdENvbnRyYWN0RmVlZEJhY2spO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdmbGV4IGZsZXgtY29sJyB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImZvcm1cIiwgeyBjbGFzc05hbWU6ICdmbGV4IGZsZXgtY29sJyB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IHR5cGU6ICd0ZXh0JywgcGxhY2Vob2xkZXI6ICdOYW1lJyB9KSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyB0eXBlOiAndGV4dCcsIHBsYWNlaG9sZGVyOiAnQ2F0ZWdvcnknIH0pLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IHR5cGU6ICd0ZXh0JywgcGxhY2Vob2xkZXI6ICdGZWF0dXJlJyB9KSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyB0eXBlOiAnc3VibWl0JywgdmFsdWU6IFwiUHJlc3MgdG8gcmVwb3J0XCIgfSkpKSk7XG59O1xuZXhwb3J0cy5SZXBvcnQgPSBSZXBvcnQ7XG4vLyBSZWFjdERvbS5yZW5kZXIoXG4vLyAgICAgPFJlYWN0LlN0cmljdE1vZGU+XG4vLyAgICAgICAgIDxSZXBvcnQgbmFtZVRhZz17Jyd9IGNhdGVnb3J5VGFnPXsnJ30gZmVhdHVyZVRhZz17Jyd9IC8+XG4vLyAgICAgPC9SZWFjdC5TdHJpY3RNb2RlPixcbi8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpXG4vLyApO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18uYW1kTyA9IHt9OyIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInBhZ2VzL21lbnVcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rZ2dsX2NyeFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtnZ2xfY3J4XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9wYWdlcy9tZW51LnRzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9