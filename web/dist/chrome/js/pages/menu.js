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
const getFeedBackByAddress = (addr) => {
    return new Promise((resolve, reject) => {
        local_1.default.get(`/report/?address=${addr}`)
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
const postFeedBackByAddress = (addr, feedBack) => {
    return new Promise((resolve, reject) => {
        local_1.default.post(`/report/?address=${addr}`, feedBack)
            .then((res) => {
            console.log('POST Success');
            console.log(res.data);
            resolve(res.data);
        }).catch((err) => {
            console.log('POST Err: ', err);
            reject(err);
        });
    });
};
const dataService = {
    getAllContracts,
    create,
    update,
    getByAddress,
    getFeedBackByAddress,
    postFeedBackByAddress
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
    // const explorerUrl = getExplorerUrl(chainId);
    // const name = params.get('name');
    // const asset = params.get('asset');
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
    const initContractFeedBack = {
        Provider: 'Mock Provider',
        ReportedContract: 'Mock Address',
        CategoryTag: 'Mock Category',
        NameTag: 'Mock Name',
        Tag: ['Mock Tag 1', 'Mock Tag 2', 'Mock Tag 3']
    };
    const [contractFeedBack, setContractFeedBack] = (0, react_1.useState)(initContractFeedBack);
    const [contractState, setContract] = (0, react_1.useState)(initContractState);
    const [userState, setUserState] = (0, react_1.useState)(initUserState);
    const [hasLoaded, setHasLoaded] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            let fetchContract = new Promise((res, rej) => {
                dataService_1.default.getByAddress(spender);
            }).catch((rej) => {
                setContract(initContractState);
            });
            let fetchContractFeedBack = new Promise((res, rej) => {
                dataService_1.default.getFeedBackByAddress(spender);
            }).catch((rej) => {
                setContractFeedBack(initContractFeedBack);
            });
            Promise.all([
                fetchContract
                // fetchContractFeedBack
            ])
                .then(([contractRes]) => __awaiter(void 0, void 0, void 0, function* () {
                setHasLoaded(true);
            }))
                .catch((rej) => {
                setHasLoaded(true);
            });
        });
        fetchData()
            .catch(e => {
            setContract(initContractState);
            setContractFeedBack(initContractFeedBack);
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
                react_1.default.createElement(report_1.Report, Object.assign({}, contractFeedBack)),
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Report = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const dataService_1 = __importDefault(__webpack_require__(/*! ../dataService */ "./src/dataService.ts"));
const Report = (feedBack) => {
    const initContractFeedBack = {
        nameTag: '',
        categoryTag: '',
        featureTag: ''
    };
    const [nameTagReport, setnameTagReport] = (0, react_1.useState)('');
    const [categoryTagReport, setcategoryTagReport] = (0, react_1.useState)('');
    const [featureTagReport, setfeatureTagReport] = (0, react_1.useState)('');
    // const [contractFeedBack, setContractFeedBack] = useState<contractFeedBack>(initContractFeedBack)
    const [isReported, setisReported] = (0, react_1.useState)(false);
    // const finishReport = async () =>{
    //     let tmp: contractFeedBack = {
    //         nameTag: nameTagReport,
    //         categoryTag: categoryTagReport,
    //         featureTag: featureTagReport
    //     }
    //     setContractFeedBack(tmp)
    //     setisReported(true)
    // }
    const handleSubmit = () => {
        let address = feedBack.ReportedContract;
        dataService_1.default.postFeedBackByAddress(address, feedBack);
    };
    return (react_1.default.createElement("div", { className: 'flex flex-col bg-black' },
        react_1.default.createElement("div", { className: 'flex flex-col justify-center items-center bg-zinc-800', id: 'backgroud' },
            react_1.default.createElement("form", { className: 'flex flex-col', onSubmit: handleSubmit },
                react_1.default.createElement("label", { className: 'text-white' },
                    "Name Tag:",
                    react_1.default.createElement("input", { className: 'text-zinc-500', type: 'text', value: nameTagReport, onChange: (e) => setnameTagReport(e.target.value), placeholder: 'Name' })),
                react_1.default.createElement("label", { className: 'text-white' },
                    "Category Tag:",
                    react_1.default.createElement("input", { className: 'text-zinc-500', type: 'text', value: categoryTagReport, onChange: (e) => setcategoryTagReport(e.target.value), placeholder: 'Category' })),
                react_1.default.createElement("label", { className: 'text-white' },
                    "Feature Tag:",
                    react_1.default.createElement("input", { className: 'text-zinc-500', type: 'text', value: featureTagReport, onChange: (e) => setfeatureTagReport(e.target.value), placeholder: 'Feature' })),
                react_1.default.createElement("button", { type: 'submit', value: "Press to report" })),
            react_1.default.createElement("div", { className: 'flex flex-row' },
                react_1.default.createElement("div", null, "Test Obj Data: "),
                react_1.default.createElement("div", null, feedBack.NameTag),
                react_1.default.createElement("div", null, feedBack.CategoryTag),
                react_1.default.createElement("div", null, feedBack.Tag[0])))));
};
exports.Report = Report;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7V0NoREE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2dnbF9jcngvLi9zcmMvY29tcG9uZW50cy9idXR0b24udHN4Iiwid2VicGFjazovL2dnbF9jcngvLi9zcmMvZGF0YVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC8uL3NyYy9sb2NhbC50cyIsIndlYnBhY2s6Ly9nZ2xfY3J4Ly4vc3JjL3BhZ2VzL21lbnUudHN4Iiwid2VicGFjazovL2dnbF9jcngvLi9zcmMvcGFnZXMvcmVwb3J0LnRzeCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL2FtZCBvcHRpb25zIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IEJ1dHRvbiA9ICh7IGNoaWxkcmVuLCBvbkNsaWNrIH0pID0+IChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJweC0yIHB5LTEgYmctYmxhY2sgdGV4dC13aGl0ZSByb3VuZGVkXCIsIG9uQ2xpY2s6IG9uQ2xpY2sgfSwgY2hpbGRyZW4pKTtcbmV4cG9ydHMuZGVmYXVsdCA9IEJ1dHRvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbG9jYWxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9sb2NhbFwiKSk7XG4vLyBUaGlzIGZpbGUgaXMgdG8gc2VuZCBheGlvcyByZXF1ZXN0IHRvIHRoZSBNeVNRTCBkYXRhYmFzZVxuY29uc3QgZ2V0QWxsQ29udHJhY3RzID0gKCkgPT4ge1xuICAgIHJldHVybiBsb2NhbF8xLmRlZmF1bHQuZ2V0KFwiL2NvbnRyYWN0c1wiKTtcbn07XG5jb25zdCBnZXRCeUFkZHJlc3MgPSAoYWRkcikgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxvY2FsXzEuZGVmYXVsdC5nZXQoYC9jb250cmFjdC8/YWRkcmVzcz0ke2FkZHJ9YClcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHRVQgU3VjY2VzcycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHRVQgRXJyOiAnLCBlcnIpO1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmNvbnN0IGdldEZlZWRCYWNrQnlBZGRyZXNzID0gKGFkZHIpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsb2NhbF8xLmRlZmF1bHQuZ2V0KGAvcmVwb3J0Lz9hZGRyZXNzPSR7YWRkcn1gKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dFVCBTdWNjZXNzJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dFVCBFcnI6ICcsIGVycik7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY29uc3QgY3JlYXRlID0gKGRhdGEpID0+IHtcbiAgICByZXR1cm4gbG9jYWxfMS5kZWZhdWx0LnBvc3QoXCIvY29udHJhY3RzXCIsIGRhdGEpO1xufTtcbmNvbnN0IHVwZGF0ZSA9IChhZGRyLCBkYXRhKSA9PiB7XG4gICAgcmV0dXJuIGxvY2FsXzEuZGVmYXVsdC5wdXQoYC9jb250cmFjdHMvJHthZGRyfWAsIGRhdGEpO1xufTtcbmNvbnN0IHBvc3RGZWVkQmFja0J5QWRkcmVzcyA9IChhZGRyLCBmZWVkQmFjaykgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxvY2FsXzEuZGVmYXVsdC5wb3N0KGAvcmVwb3J0Lz9hZGRyZXNzPSR7YWRkcn1gLCBmZWVkQmFjaylcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQT1NUIFN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUE9TVCBFcnI6ICcsIGVycik7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY29uc3QgZGF0YVNlcnZpY2UgPSB7XG4gICAgZ2V0QWxsQ29udHJhY3RzLFxuICAgIGNyZWF0ZSxcbiAgICB1cGRhdGUsXG4gICAgZ2V0QnlBZGRyZXNzLFxuICAgIGdldEZlZWRCYWNrQnlBZGRyZXNzLFxuICAgIHBvc3RGZWVkQmFja0J5QWRkcmVzc1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRhdGFTZXJ2aWNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBheGlvc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJheGlvc1wiKSk7XG5jb25zdCBheGlvc19mZXRjaF9hZGFwdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIkB2ZXNwYWlhY2gvYXhpb3MtZmV0Y2gtYWRhcHRlclwiKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBheGlvc18xLmRlZmF1bHQuY3JlYXRlKHtcbiAgICAvLyBDaGFuZ2UgdGhlIGJhc2VVUkwgdG8gZ2V0IHRoZSBjbG91ZCBzZXJ2aWNlXG4gICAgYmFzZVVSTDogXCJodHRwOi8vMTI3LjAuMC4xOjgwODBcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBhZGFwdGVyOiBheGlvc19mZXRjaF9hZGFwdGVyXzEuZGVmYXVsdFxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCByZWFjdF9kb21fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcbmNvbnN0IGRhdGFTZXJ2aWNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2RhdGFTZXJ2aWNlXCIpKTtcbmNvbnN0IHRyYW5zZmVyXzEgPSByZXF1aXJlKFwiLi90cmFuc2ZlclwiKTtcbmNvbnN0IG1vcmVJbmZvXzEgPSByZXF1aXJlKFwiLi9tb3JlSW5mb1wiKTtcbmNvbnN0IHJlcG9ydF8xID0gcmVxdWlyZShcIi4vcmVwb3J0XCIpO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCBidXR0b25fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vY29tcG9uZW50cy9idXR0b25cIikpO1xuY29uc3QgTWVudSA9ICgpID0+IHtcbiAgICAvL1Jlc2xvdmUgdGhlIFVSTCBQYXJhbWV0ZXJzIHRvIGdldCB0aGUgY2hhaW4gSW5mb3JtYXRpb25cbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IHNwZW5kZXIgPSBwYXJhbXMuZ2V0KCdzcGVuZGVyJyk7XG4gICAgaWYgKHNwZW5kZXIgPT09IG51bGwpXG4gICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJFUlJPUjogU3BlbmRlciBBZGRyZXNzID09PSBOVUxMXCIpKTtcbiAgICBjb25zdCBpZCA9IHBhcmFtcy5nZXQoJ2lkJyk7XG4gICAgY29uc3QgY2hhaW5JZCA9IE51bWJlcihwYXJhbXMuZ2V0KCdjaGFpbklkJykpO1xuICAgIC8vIGNvbnN0IGV4cGxvcmVyVXJsID0gZ2V0RXhwbG9yZXJVcmwoY2hhaW5JZCk7XG4gICAgLy8gY29uc3QgbmFtZSA9IHBhcmFtcy5nZXQoJ25hbWUnKTtcbiAgICAvLyBjb25zdCBhc3NldCA9IHBhcmFtcy5nZXQoJ2Fzc2V0Jyk7XG4gICAgLy8gY29uc3Qgc3BlbmRlck5hbWUgPSBwYXJhbXMuZ2V0KCdzcGVuZGVyTmFtZScpO1xuICAgIC8vIGNvbnN0IGJ5cGFzc2VkID0gcGFyYW1zLmdldCgnYnlwYXNzZWQnKSA9PT0gJ3RydWUnO1xuICAgIGNvbnN0IGluaXRDb250cmFjdFN0YXRlID0ge1xuICAgICAgICBBZGRyZXNzOiBcIjB4QUJDREVGR1wiLFxuICAgICAgICBUb2tlblR5cGU6IFwiRGVmYXVsdCBUeXBlXCIsXG4gICAgICAgIEhvbGRlcnM6IFwiRGVmYXVsdCBIb2xkZXJzXCIsXG4gICAgICAgIEJhbGFuY2U6IDAsXG4gICAgICAgIENyZWF0ZVRpbWU6IG5ldyBEYXRlKDIwMjAsIDQsIDQsIDE3LCAyMywgNDIsIDExKSxcbiAgICAgICAgTGFzdFRyYW5zYWN0aW9uVGltZTogbmV3IERhdGUoMjAyMCwgNCwgNCwgMTcsIDIzLCA0MiwgMTEpLFxuICAgICAgICBOdW1iZXJPZlRyYW5zYWN0aW9uOiAwLFxuICAgICAgICBSZXNlcnZlU3BvdE9uZTogXCJEZWZhdWx0IFJlc2VydmVkIFNwb3RcIixcbiAgICAgICAgUmVzZXJ2ZVNwb3RUd286IFwiRGVmYXVsdCBSZXNlcnZlZCBTcG90XCIsXG4gICAgICAgIFJlc2VydmVTcG90VGhyZWU6IFwiRGVmYXVsdCBSZXNlcnZlZCBTcG90XCIsXG4gICAgICAgIFJlc2VydmVTcG90Rm91cjogXCJEZWZhdWx0IFJlc2VydmVkIFNwb3RcIixcbiAgICAgICAgUmVzZXJ2ZVNwb3RGaXZlOiBcIkRlZmF1bHQgUmVzZXJ2ZWQgU3BvdFwiLFxuICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKDIwMjAsIDQsIDQsIDE3LCAyMywgNDIsIDExKSxcbiAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgyMDIwLCA0LCA0LCAxNywgMjMsIDQyLCAxMSksXG4gICAgfTtcbiAgICBjb25zdCBpbml0VXNlclN0YXRlID0ge1xuICAgICAgICBzaG93U3RhdGU6ICcnXG4gICAgfTtcbiAgICBjb25zdCBpbml0Q29udHJhY3RGZWVkQmFjayA9IHtcbiAgICAgICAgUHJvdmlkZXI6ICdNb2NrIFByb3ZpZGVyJyxcbiAgICAgICAgUmVwb3J0ZWRDb250cmFjdDogJ01vY2sgQWRkcmVzcycsXG4gICAgICAgIENhdGVnb3J5VGFnOiAnTW9jayBDYXRlZ29yeScsXG4gICAgICAgIE5hbWVUYWc6ICdNb2NrIE5hbWUnLFxuICAgICAgICBUYWc6IFsnTW9jayBUYWcgMScsICdNb2NrIFRhZyAyJywgJ01vY2sgVGFnIDMnXVxuICAgIH07XG4gICAgY29uc3QgW2NvbnRyYWN0RmVlZEJhY2ssIHNldENvbnRyYWN0RmVlZEJhY2tdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGluaXRDb250cmFjdEZlZWRCYWNrKTtcbiAgICBjb25zdCBbY29udHJhY3RTdGF0ZSwgc2V0Q29udHJhY3RdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGluaXRDb250cmFjdFN0YXRlKTtcbiAgICBjb25zdCBbdXNlclN0YXRlLCBzZXRVc2VyU3RhdGVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGluaXRVc2VyU3RhdGUpO1xuICAgIGNvbnN0IFtoYXNMb2FkZWQsIHNldEhhc0xvYWRlZF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBjb25zdCBmZXRjaERhdGEgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxldCBmZXRjaENvbnRyYWN0ID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICAgICAgZGF0YVNlcnZpY2VfMS5kZWZhdWx0LmdldEJ5QWRkcmVzcyhzcGVuZGVyKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChyZWopID0+IHtcbiAgICAgICAgICAgICAgICBzZXRDb250cmFjdChpbml0Q29udHJhY3RTdGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBmZXRjaENvbnRyYWN0RmVlZEJhY2sgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhU2VydmljZV8xLmRlZmF1bHQuZ2V0RmVlZEJhY2tCeUFkZHJlc3Moc3BlbmRlcik7XG4gICAgICAgICAgICB9KS5jYXRjaCgocmVqKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0Q29udHJhY3RGZWVkQmFjayhpbml0Q29udHJhY3RGZWVkQmFjayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBmZXRjaENvbnRyYWN0XG4gICAgICAgICAgICAgICAgLy8gZmV0Y2hDb250cmFjdEZlZWRCYWNrXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIC50aGVuKChbY29udHJhY3RSZXNdKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBzZXRIYXNMb2FkZWQodHJ1ZSk7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlaikgPT4ge1xuICAgICAgICAgICAgICAgIHNldEhhc0xvYWRlZCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZmV0Y2hEYXRhKClcbiAgICAgICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIHNldENvbnRyYWN0KGluaXRDb250cmFjdFN0YXRlKTtcbiAgICAgICAgICAgIHNldENvbnRyYWN0RmVlZEJhY2soaW5pdENvbnRyYWN0RmVlZEJhY2spO1xuICAgICAgICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgZXh0ZW5zaW9uUmVzcG9uc2UgPSAoZGF0YSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh1bmRlZmluZWQsIHsgaWQsIGRhdGEgfSk7XG4gICAgICAgIHdpbmRvdy5jbG9zZSgpO1xuICAgIH0pO1xuICAgIGNvbnN0IHJlamVjdCA9ICgpID0+IGV4dGVuc2lvblJlc3BvbnNlKGZhbHNlKTtcbiAgICBjb25zdCBhY2NlcHQgPSAoKSA9PiBleHRlbnNpb25SZXNwb25zZSh0cnVlKTtcbiAgICBjb25zdCBjaGFuZ2VTZWN0aW9uID0gKHNlY3Rpb24pID0+IHtcbiAgICAgICAgbGV0IHVzZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIHNob3dTdGF0ZTogc2VjdGlvblxuICAgICAgICB9O1xuICAgICAgICBzZXRVc2VyU3RhdGUodXNlclN0YXRlKTtcbiAgICB9O1xuICAgIGlmIChoYXNMb2FkZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDFcIiwgbnVsbCwgXCJMb2FkaW5nIC4uLlwiKSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHVzZXJTdGF0ZS5zaG93U3RhdGUgPT09ICdtb3JlSW5mbycpIHtcbiAgICAgICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KG1vcmVJbmZvXzEuTW9yZUluZm8sIG51bGwpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1yb3cgZ2FwLTEganVzdGlmeS1hcm91bmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ3RyYW5zZmVyJykgfSwgXCIgVHJhbnNmZXIgXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ3JlcG9ydCcpIH0sIFwiIFJlcG9ydCBcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogKCkgPT4gY2hhbmdlU2VjdGlvbignbW9yZUluZm8nKSB9LCBcIiBNb3JlIEluZm8gXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6IHJlamVjdCB9LCBcIiBSZWplY3QgXCIpKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVzZXJTdGF0ZS5zaG93U3RhdGUgPT09ICdyZXBvcnQnKSB7XG4gICAgICAgICAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZXBvcnRfMS5SZXBvcnQsIE9iamVjdC5hc3NpZ24oe30sIGNvbnRyYWN0RmVlZEJhY2spKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtcm93IGdhcC0xIGp1c3RpZnktYXJvdW5kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiAoKSA9PiBjaGFuZ2VTZWN0aW9uKCd0cmFuc2ZlcicpIH0sIFwiIFRyYW5zZmVyIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiAoKSA9PiBjaGFuZ2VTZWN0aW9uKCdyZXBvcnQnKSB9LCBcIiBSZXBvcnQgXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ21vcmVJbmZvJykgfSwgXCIgTW9yZSBJbmZvIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiByZWplY3QgfSwgXCIgUmVqZWN0IFwiKSkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHRyYW5zZmVyXzEuVHJhbnNmZXIsIE9iamVjdC5hc3NpZ24oe30sIGNvbnRyYWN0U3RhdGUpKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtcm93IGdhcC0xIGp1c3RpZnktYXJvdW5kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiAoKSA9PiBjaGFuZ2VTZWN0aW9uKCd0cmFuc2ZlcicpIH0sIFwiIFRyYW5zZmVyIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiAoKSA9PiBjaGFuZ2VTZWN0aW9uKCdyZXBvcnQnKSB9LCBcIiBSZXBvcnQgXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ21vcmVJbmZvJykgfSwgXCIgTW9yZSBJbmZvIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiByZWplY3QgfSwgXCIgUmVqZWN0IFwiKSkpKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5yZWFjdF9kb21fMS5kZWZhdWx0LnJlbmRlcihyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuU3RyaWN0TW9kZSwgbnVsbCxcbiAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChNZW51LCBudWxsKSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmVwb3J0ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgZGF0YVNlcnZpY2VfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vZGF0YVNlcnZpY2VcIikpO1xuY29uc3QgUmVwb3J0ID0gKGZlZWRCYWNrKSA9PiB7XG4gICAgY29uc3QgaW5pdENvbnRyYWN0RmVlZEJhY2sgPSB7XG4gICAgICAgIG5hbWVUYWc6ICcnLFxuICAgICAgICBjYXRlZ29yeVRhZzogJycsXG4gICAgICAgIGZlYXR1cmVUYWc6ICcnXG4gICAgfTtcbiAgICBjb25zdCBbbmFtZVRhZ1JlcG9ydCwgc2V0bmFtZVRhZ1JlcG9ydF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoJycpO1xuICAgIGNvbnN0IFtjYXRlZ29yeVRhZ1JlcG9ydCwgc2V0Y2F0ZWdvcnlUYWdSZXBvcnRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKCcnKTtcbiAgICBjb25zdCBbZmVhdHVyZVRhZ1JlcG9ydCwgc2V0ZmVhdHVyZVRhZ1JlcG9ydF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoJycpO1xuICAgIC8vIGNvbnN0IFtjb250cmFjdEZlZWRCYWNrLCBzZXRDb250cmFjdEZlZWRCYWNrXSA9IHVzZVN0YXRlPGNvbnRyYWN0RmVlZEJhY2s+KGluaXRDb250cmFjdEZlZWRCYWNrKVxuICAgIGNvbnN0IFtpc1JlcG9ydGVkLCBzZXRpc1JlcG9ydGVkXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgLy8gY29uc3QgZmluaXNoUmVwb3J0ID0gYXN5bmMgKCkgPT57XG4gICAgLy8gICAgIGxldCB0bXA6IGNvbnRyYWN0RmVlZEJhY2sgPSB7XG4gICAgLy8gICAgICAgICBuYW1lVGFnOiBuYW1lVGFnUmVwb3J0LFxuICAgIC8vICAgICAgICAgY2F0ZWdvcnlUYWc6IGNhdGVnb3J5VGFnUmVwb3J0LFxuICAgIC8vICAgICAgICAgZmVhdHVyZVRhZzogZmVhdHVyZVRhZ1JlcG9ydFxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHNldENvbnRyYWN0RmVlZEJhY2sodG1wKVxuICAgIC8vICAgICBzZXRpc1JlcG9ydGVkKHRydWUpXG4gICAgLy8gfVxuICAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFkZHJlc3MgPSBmZWVkQmFjay5SZXBvcnRlZENvbnRyYWN0O1xuICAgICAgICBkYXRhU2VydmljZV8xLmRlZmF1bHQucG9zdEZlZWRCYWNrQnlBZGRyZXNzKGFkZHJlc3MsIGZlZWRCYWNrKTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdmbGV4IGZsZXgtY29sIGJnLWJsYWNrJyB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2ZsZXggZmxleC1jb2wganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIGJnLXppbmMtODAwJywgaWQ6ICdiYWNrZ3JvdWQnIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImZvcm1cIiwgeyBjbGFzc05hbWU6ICdmbGV4IGZsZXgtY29sJywgb25TdWJtaXQ6IGhhbmRsZVN1Ym1pdCB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6ICd0ZXh0LXdoaXRlJyB9LFxuICAgICAgICAgICAgICAgICAgICBcIk5hbWUgVGFnOlwiLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgY2xhc3NOYW1lOiAndGV4dC16aW5jLTUwMCcsIHR5cGU6ICd0ZXh0JywgdmFsdWU6IG5hbWVUYWdSZXBvcnQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0bmFtZVRhZ1JlcG9ydChlLnRhcmdldC52YWx1ZSksIHBsYWNlaG9sZGVyOiAnTmFtZScgfSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6ICd0ZXh0LXdoaXRlJyB9LFxuICAgICAgICAgICAgICAgICAgICBcIkNhdGVnb3J5IFRhZzpcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IGNsYXNzTmFtZTogJ3RleHQtemluYy01MDAnLCB0eXBlOiAndGV4dCcsIHZhbHVlOiBjYXRlZ29yeVRhZ1JlcG9ydCwgb25DaGFuZ2U6IChlKSA9PiBzZXRjYXRlZ29yeVRhZ1JlcG9ydChlLnRhcmdldC52YWx1ZSksIHBsYWNlaG9sZGVyOiAnQ2F0ZWdvcnknIH0pKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiAndGV4dC13aGl0ZScgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJGZWF0dXJlIFRhZzpcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IGNsYXNzTmFtZTogJ3RleHQtemluYy01MDAnLCB0eXBlOiAndGV4dCcsIHZhbHVlOiBmZWF0dXJlVGFnUmVwb3J0LCBvbkNoYW5nZTogKGUpID0+IHNldGZlYXR1cmVUYWdSZXBvcnQoZS50YXJnZXQudmFsdWUpLCBwbGFjZWhvbGRlcjogJ0ZlYXR1cmUnIH0pKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IHR5cGU6ICdzdWJtaXQnLCB2YWx1ZTogXCJQcmVzcyB0byByZXBvcnRcIiB9KSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2ZsZXggZmxleC1yb3cnIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJUZXN0IE9iaiBEYXRhOiBcIiksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgZmVlZEJhY2suTmFtZVRhZyksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgZmVlZEJhY2suQ2F0ZWdvcnlUYWcpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIGZlZWRCYWNrLlRhZ1swXSkpKSkpO1xufTtcbmV4cG9ydHMuUmVwb3J0ID0gUmVwb3J0O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18uYW1kTyA9IHt9OyIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInBhZ2VzL21lbnVcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rZ2dsX2NyeFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtnZ2xfY3J4XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9wYWdlcy9tZW51LnRzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9