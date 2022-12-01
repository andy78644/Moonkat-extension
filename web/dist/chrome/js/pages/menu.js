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
                initContractState.Address = '0x0' + res.Address + '1111';
                setContract(initContractState);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcGFnZXMvbWVudS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxnQ0FBZ0MsbUJBQU8sQ0FBQyw0Q0FBTztBQUMvQyxrQkFBa0IsbUJBQW1CLGdEQUFnRCxzRUFBc0U7QUFDM0osa0JBQWU7Ozs7Ozs7Ozs7O0FDUEY7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxnQ0FBZ0MsbUJBQU8sQ0FBQywrQkFBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsS0FBSztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLEtBQUs7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNuQ0Y7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxnQ0FBZ0MsbUJBQU8sQ0FBQyw0Q0FBTztBQUMvQyw4Q0FBOEMsbUJBQU8sQ0FBQyw4RkFBZ0M7QUFDdEYsa0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7Ozs7Ozs7Ozs7O0FDZFk7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDBDQUEwQyw0QkFBNEI7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDZCQUE2QixtQkFBTyxDQUFDLDRDQUFPO0FBQzVDLG9DQUFvQyxtQkFBTyxDQUFDLG9EQUFXO0FBQ3ZELHNDQUFzQyxtQkFBTyxDQUFDLDRDQUFnQjtBQUM5RCxtQkFBbUIsbUJBQU8sQ0FBQyw0Q0FBWTtBQUN2QyxtQkFBbUIsbUJBQU8sQ0FBQyw0Q0FBWTtBQUN2QyxpQkFBaUIsbUJBQU8sQ0FBQyx3Q0FBVTtBQUNuQyxnREFBZ0QsbUJBQU8sQ0FBQyw0RkFBdUI7QUFDL0UsaUNBQWlDLG1CQUFPLENBQUMseURBQXNCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLCtFQUErRSxVQUFVO0FBQ3pGO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGlEQUFpRDtBQUN4RyxzRUFBc0UsMENBQTBDO0FBQ2hILHNFQUFzRSx3Q0FBd0M7QUFDOUcsc0VBQXNFLDBDQUEwQztBQUNoSCxzRUFBc0UsaUJBQWlCO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSw4Q0FBOEM7QUFDL0csdURBQXVELGlEQUFpRDtBQUN4RyxzRUFBc0UsMENBQTBDO0FBQ2hILHNFQUFzRSx3Q0FBd0M7QUFDOUcsc0VBQXNFLDBDQUEwQztBQUNoSCxzRUFBc0UsaUJBQWlCO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBLG1GQUFtRjtBQUNuRix1REFBdUQsaURBQWlEO0FBQ3hHLHNFQUFzRSwwQ0FBMEM7QUFDaEgsc0VBQXNFLHdDQUF3QztBQUM5RyxzRUFBc0UsMENBQTBDO0FBQ2hILHNFQUFzRSxpQkFBaUI7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNoSmE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDBDQUEwQyw0QkFBNEI7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWM7QUFDZCw2QkFBNkIsbUJBQU8sQ0FBQyw0Q0FBTztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCw0QkFBNEI7QUFDL0UsZ0RBQWdELDRCQUE0QjtBQUM1RSxxREFBcUQsbUNBQW1DO0FBQ3hGLHFEQUFxRCx1Q0FBdUM7QUFDNUYscURBQXFELHNDQUFzQztBQUMzRixxREFBcUQsMENBQTBDO0FBQy9GO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSw0QkFBNEIsSUFBSSxhQUFhLElBQUksWUFBWSxJQUFJO0FBQ2pFO0FBQ0E7QUFDQTs7Ozs7OztVQy9DQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0M1QkE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NKQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDaERBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZ2xfY3J4Ly4vc3JjL2NvbXBvbmVudHMvYnV0dG9uLnRzeCIsIndlYnBhY2s6Ly9nZ2xfY3J4Ly4vc3JjL2RhdGFTZXJ2aWNlLnRzIiwid2VicGFjazovL2dnbF9jcngvLi9zcmMvbG9jYWwudHMiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC8uL3NyYy9wYWdlcy9tZW51LnRzeCIsIndlYnBhY2s6Ly9nZ2xfY3J4Ly4vc3JjL3BhZ2VzL3JlcG9ydC50c3giLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9hbWQgb3B0aW9ucyIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBCdXR0b24gPSAoeyBjaGlsZHJlbiwgb25DbGljayB9KSA9PiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwicHgtMiBweS0xIGJnLWJsYWNrIHRleHQtd2hpdGUgcm91bmRlZFwiLCBvbkNsaWNrOiBvbkNsaWNrIH0sIGNoaWxkcmVuKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBCdXR0b247XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGxvY2FsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vbG9jYWxcIikpO1xuLy8gVGhpcyBmaWxlIGlzIHRvIHNlbmQgYXhpb3MgcmVxdWVzdCB0byB0aGUgTXlTUUwgZGF0YWJhc2VcbmNvbnN0IGdldEFsbENvbnRyYWN0cyA9ICgpID0+IHtcbiAgICByZXR1cm4gbG9jYWxfMS5kZWZhdWx0LmdldChcIi9jb250cmFjdHNcIik7XG59O1xuY29uc3QgZ2V0QnlBZGRyZXNzID0gKGFkZHIpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsb2NhbF8xLmRlZmF1bHQuZ2V0KGAvY29udHJhY3QvP2FkZHJlc3M9JHthZGRyfWApXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR0VUIFN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR0VUIEVycjogJywgZXJyKTtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5jb25zdCBjcmVhdGUgPSAoZGF0YSkgPT4ge1xuICAgIHJldHVybiBsb2NhbF8xLmRlZmF1bHQucG9zdChcIi9jb250cmFjdHNcIiwgZGF0YSk7XG59O1xuY29uc3QgdXBkYXRlID0gKGFkZHIsIGRhdGEpID0+IHtcbiAgICByZXR1cm4gbG9jYWxfMS5kZWZhdWx0LnB1dChgL2NvbnRyYWN0cy8ke2FkZHJ9YCwgZGF0YSk7XG59O1xuY29uc3QgZGF0YVNlcnZpY2UgPSB7XG4gICAgZ2V0QWxsQ29udHJhY3RzLFxuICAgIGNyZWF0ZSxcbiAgICB1cGRhdGUsXG4gICAgZ2V0QnlBZGRyZXNzLFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRhdGFTZXJ2aWNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBheGlvc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJheGlvc1wiKSk7XG5jb25zdCBheGlvc19mZXRjaF9hZGFwdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIkB2ZXNwYWlhY2gvYXhpb3MtZmV0Y2gtYWRhcHRlclwiKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBheGlvc18xLmRlZmF1bHQuY3JlYXRlKHtcbiAgICAvLyBDaGFuZ2UgdGhlIGJhc2VVUkwgdG8gZ2V0IHRoZSBjbG91ZCBzZXJ2aWNlXG4gICAgYmFzZVVSTDogXCJodHRwOi8vMTI3LjAuMC4xOjgwODBcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBhZGFwdGVyOiBheGlvc19mZXRjaF9hZGFwdGVyXzEuZGVmYXVsdFxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCByZWFjdF9kb21fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcbmNvbnN0IGRhdGFTZXJ2aWNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2RhdGFTZXJ2aWNlXCIpKTtcbmNvbnN0IHRyYW5zZmVyXzEgPSByZXF1aXJlKFwiLi90cmFuc2ZlclwiKTtcbmNvbnN0IG1vcmVJbmZvXzEgPSByZXF1aXJlKFwiLi9tb3JlSW5mb1wiKTtcbmNvbnN0IHJlcG9ydF8xID0gcmVxdWlyZShcIi4vcmVwb3J0XCIpO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCBidXR0b25fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vY29tcG9uZW50cy9idXR0b25cIikpO1xuY29uc3QgTWVudSA9ICgpID0+IHtcbiAgICAvL1Jlc2xvdmUgdGhlIFVSTCBQYXJhbWV0ZXJzIHRvIGdldCB0aGUgY2hhaW4gSW5mb3JtYXRpb25cbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IHNwZW5kZXIgPSBwYXJhbXMuZ2V0KCdzcGVuZGVyJyk7XG4gICAgaWYgKHNwZW5kZXIgPT09IG51bGwpXG4gICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJFUlJPUjogU3BlbmRlciBBZGRyZXNzID09PSBOVUxMXCIpKTtcbiAgICBjb25zdCBpZCA9IHBhcmFtcy5nZXQoJ2lkJyk7XG4gICAgY29uc3QgY2hhaW5JZCA9IE51bWJlcihwYXJhbXMuZ2V0KCdjaGFpbklkJykpO1xuICAgIC8vIGNvbnN0IGNyZWF0ZXRpbWUgPSBwYXJhbXMuZ2V0KCdjcmVhdGVUaW1lJyk7XG4gICAgLy8gY29uc3QgZXhwbG9yZXJVcmwgPSBnZXRFeHBsb3JlclVybChjaGFpbklkKTtcbiAgICAvLyBjb25zdCBuYW1lID0gcGFyYW1zLmdldCgnbmFtZScpO1xuICAgIC8vIGNvbnN0IGFzc2V0ID0gcGFyYW1zLmdldCgnYXNzZXQnKTtcbiAgICAvLyBjb25zdCBhZGRyZXNzID0gcGFyYW1zLmdldCgnYWRkcmVzcycpO1xuICAgIC8vIGNvbnN0IHNwZW5kZXJOYW1lID0gcGFyYW1zLmdldCgnc3BlbmRlck5hbWUnKTtcbiAgICAvLyBjb25zdCBieXBhc3NlZCA9IHBhcmFtcy5nZXQoJ2J5cGFzc2VkJykgPT09ICd0cnVlJztcbiAgICBjb25zdCBpbml0Q29udHJhY3RTdGF0ZSA9IHtcbiAgICAgICAgQWRkcmVzczogXCIweEFCQ0RFRkdcIixcbiAgICAgICAgVG9rZW5UeXBlOiBcIkRlZmF1bHQgVHlwZVwiLFxuICAgICAgICBIb2xkZXJzOiBcIkRlZmF1bHQgSG9sZGVyc1wiLFxuICAgICAgICBCYWxhbmNlOiAwLFxuICAgICAgICBDcmVhdGVUaW1lOiBuZXcgRGF0ZSgyMDIwLCA0LCA0LCAxNywgMjMsIDQyLCAxMSksXG4gICAgICAgIExhc3RUcmFuc2FjdGlvblRpbWU6IG5ldyBEYXRlKDIwMjAsIDQsIDQsIDE3LCAyMywgNDIsIDExKSxcbiAgICAgICAgTnVtYmVyT2ZUcmFuc2FjdGlvbjogMCxcbiAgICAgICAgUmVzZXJ2ZVNwb3RPbmU6IFwiRGVmYXVsdCBSZXNlcnZlZCBTcG90XCIsXG4gICAgICAgIFJlc2VydmVTcG90VHdvOiBcIkRlZmF1bHQgUmVzZXJ2ZWQgU3BvdFwiLFxuICAgICAgICBSZXNlcnZlU3BvdFRocmVlOiBcIkRlZmF1bHQgUmVzZXJ2ZWQgU3BvdFwiLFxuICAgICAgICBSZXNlcnZlU3BvdEZvdXI6IFwiRGVmYXVsdCBSZXNlcnZlZCBTcG90XCIsXG4gICAgICAgIFJlc2VydmVTcG90Rml2ZTogXCJEZWZhdWx0IFJlc2VydmVkIFNwb3RcIixcbiAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgyMDIwLCA0LCA0LCAxNywgMjMsIDQyLCAxMSksXG4gICAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoMjAyMCwgNCwgNCwgMTcsIDIzLCA0MiwgMTEpLFxuICAgIH07XG4gICAgY29uc3QgaW5pdFVzZXJTdGF0ZSA9IHtcbiAgICAgICAgc2hvd1N0YXRlOiAnJ1xuICAgIH07XG4gICAgY29uc3QgW2NvbnRyYWN0U3RhdGUsIHNldENvbnRyYWN0XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShpbml0Q29udHJhY3RTdGF0ZSk7XG4gICAgY29uc3QgW3VzZXJTdGF0ZSwgc2V0VXNlclN0YXRlXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShpbml0VXNlclN0YXRlKTtcbiAgICBjb25zdCBbaGFzTG9hZGVkLCBzZXRIYXNMb2FkZWRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgY29uc3QgZmV0Y2hDb250cmFjdCA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgeWllbGQgZGF0YVNlcnZpY2VfMS5kZWZhdWx0LmdldEJ5QWRkcmVzcyhzcGVuZGVyKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaW5pdENvbnRyYWN0U3RhdGUuQWRkcmVzcyA9ICcweDAnICsgcmVzLkFkZHJlc3MgKyAnMTExMSc7XG4gICAgICAgICAgICAgICAgc2V0Q29udHJhY3QoaW5pdENvbnRyYWN0U3RhdGUpO1xuICAgICAgICAgICAgICAgIHNldEhhc0xvYWRlZCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZmV0Y2hDb250cmFjdCgpXG4gICAgICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBzZXRDb250cmFjdChpbml0Q29udHJhY3RTdGF0ZSk7XG4gICAgICAgICAgICBzZXRIYXNMb2FkZWQodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0sIFtdKTtcbiAgICBjb25zdCBleHRlbnNpb25SZXNwb25zZSA9IChkYXRhKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgeWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHVuZGVmaW5lZCwgeyBpZCwgZGF0YSB9KTtcbiAgICAgICAgd2luZG93LmNsb3NlKCk7XG4gICAgfSk7XG4gICAgY29uc3QgcmVqZWN0ID0gKCkgPT4gZXh0ZW5zaW9uUmVzcG9uc2UoZmFsc2UpO1xuICAgIGNvbnN0IGFjY2VwdCA9ICgpID0+IGV4dGVuc2lvblJlc3BvbnNlKHRydWUpO1xuICAgIGNvbnN0IGNoYW5nZVNlY3Rpb24gPSAoc2VjdGlvbikgPT4ge1xuICAgICAgICBsZXQgdXNlclN0YXRlID0ge1xuICAgICAgICAgICAgc2hvd1N0YXRlOiBzZWN0aW9uXG4gICAgICAgIH07XG4gICAgICAgIHNldFVzZXJTdGF0ZSh1c2VyU3RhdGUpO1xuICAgIH07XG4gICAgaWYgKGhhc0xvYWRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBudWxsLCBcIkxvYWRpbmcgLi4uXCIpKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAodXNlclN0YXRlLnNob3dTdGF0ZSA9PT0gJ21vcmVJbmZvJykge1xuICAgICAgICAgICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQobW9yZUluZm9fMS5Nb3JlSW5mbywgbnVsbCksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LXJvdyBnYXAtMSBqdXN0aWZ5LWFyb3VuZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogKCkgPT4gY2hhbmdlU2VjdGlvbigndHJhbnNmZXInKSB9LCBcIiBUcmFuc2ZlciBcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogKCkgPT4gY2hhbmdlU2VjdGlvbigncmVwb3J0JykgfSwgXCIgUmVwb3J0IFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiAoKSA9PiBjaGFuZ2VTZWN0aW9uKCdtb3JlSW5mbycpIH0sIFwiIE1vcmUgSW5mbyBcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogcmVqZWN0IH0sIFwiIFJlamVjdCBcIikpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodXNlclN0YXRlLnNob3dTdGF0ZSA9PT0gJ3JlcG9ydCcpIHtcbiAgICAgICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlcG9ydF8xLlJlcG9ydCwgeyBuYW1lVGFnOiAnJywgY2F0ZWdvcnlUYWc6ICcnLCBmZWF0dXJlVGFnOiAnJyB9KSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtcm93IGdhcC0xIGp1c3RpZnktYXJvdW5kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiAoKSA9PiBjaGFuZ2VTZWN0aW9uKCd0cmFuc2ZlcicpIH0sIFwiIFRyYW5zZmVyIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiAoKSA9PiBjaGFuZ2VTZWN0aW9uKCdyZXBvcnQnKSB9LCBcIiBSZXBvcnQgXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ21vcmVJbmZvJykgfSwgXCIgTW9yZSBJbmZvIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiByZWplY3QgfSwgXCIgUmVqZWN0IFwiKSkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHRyYW5zZmVyXzEuVHJhbnNmZXIsIE9iamVjdC5hc3NpZ24oe30sIGNvbnRyYWN0U3RhdGUpKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtcm93IGdhcC0xIGp1c3RpZnktYXJvdW5kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiAoKSA9PiBjaGFuZ2VTZWN0aW9uKCd0cmFuc2ZlcicpIH0sIFwiIFRyYW5zZmVyIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiAoKSA9PiBjaGFuZ2VTZWN0aW9uKCdyZXBvcnQnKSB9LCBcIiBSZXBvcnQgXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ21vcmVJbmZvJykgfSwgXCIgTW9yZSBJbmZvIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiByZWplY3QgfSwgXCIgUmVqZWN0IFwiKSkpKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5yZWFjdF9kb21fMS5kZWZhdWx0LnJlbmRlcihyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuU3RyaWN0TW9kZSwgbnVsbCxcbiAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChNZW51LCBudWxsKSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmVwb3J0ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgUmVwb3J0ID0gKGZlZWRCYWNrKSA9PiB7XG4gICAgY29uc3QgaW5pdENvbnRyYWN0RmVlZEJhY2sgPSB7XG4gICAgICAgIG5hbWVUYWc6ICdEZWZhdWx0IE5hbWUnLFxuICAgICAgICBjYXRlZ29yeVRhZzogJ0RlZmF1bHQgY2F0ZWdvcnknLFxuICAgICAgICBmZWF0dXJlVGFnOiAnRGVmYXVsdCBmZWF0dXJlJ1xuICAgIH07XG4gICAgY29uc3QgW2NvbnRyYWN0RmVlZEJhY2ssIHNldENvbnRyYWN0RmVlZEJhY2tdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGluaXRDb250cmFjdEZlZWRCYWNrKTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnZmxleCBmbGV4LWNvbCcgfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIsIHsgY2xhc3NOYW1lOiAnZmxleCBmbGV4LWNvbCcgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyB0eXBlOiAndGV4dCcsIHBsYWNlaG9sZGVyOiAnTmFtZScgfSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgdHlwZTogJ3RleHQnLCBwbGFjZWhvbGRlcjogJ0NhdGVnb3J5JyB9KSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyB0eXBlOiAndGV4dCcsIHBsYWNlaG9sZGVyOiAnRmVhdHVyZScgfSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgdHlwZTogJ3N1Ym1pdCcsIHZhbHVlOiBcIlByZXNzIHRvIHJlcG9ydFwiIH0pKSkpO1xufTtcbmV4cG9ydHMuUmVwb3J0ID0gUmVwb3J0O1xuLy8gUmVhY3REb20ucmVuZGVyKFxuLy8gICAgIDxSZWFjdC5TdHJpY3RNb2RlPlxuLy8gICAgICAgICA8UmVwb3J0IG5hbWVUYWc9eycnfSBjYXRlZ29yeVRhZz17Jyd9IGZlYXR1cmVUYWc9eycnfSAvPlxuLy8gICAgIDwvUmVhY3QuU3RyaWN0TW9kZT4sXG4vLyAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuLy8gKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmFtZE8gPSB7fTsiLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJwYWdlcy9tZW51XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2dnbF9jcnhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZ2dsX2NyeFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcGFnZXMvbWVudS50c3hcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==