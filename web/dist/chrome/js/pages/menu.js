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
const postBlockNativeTransactionSimulation = (transaction) => {
    return new Promise((resolve, reject) => {
        let _transaction = JSON.stringify(transaction);
        local_1.default.post(`api/simulate/bn`, _transaction)
            .then((res) => {
            console.log('POST Success');
            console.log(res.data);
            // resolve(res.data)
        }).catch((err) => {
            console.log('POST Err: ', err);
            reject(err);
        });
    });
    //send the txn detail
};
const dataService = {
    getAllContracts,
    create,
    update,
    getByAddress,
    getFeedBackByAddress,
    postFeedBackByAddress,
    postBlockNativeTransactionSimulation
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztXQ2hEQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2dsX2NyeC8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi50c3giLCJ3ZWJwYWNrOi8vZ2dsX2NyeC8uL3NyYy9kYXRhU2VydmljZS50cyIsIndlYnBhY2s6Ly9nZ2xfY3J4Ly4vc3JjL2xvY2FsLnRzIiwid2VicGFjazovL2dnbF9jcngvLi9zcmMvcGFnZXMvbWVudS50c3giLCJ3ZWJwYWNrOi8vZ2dsX2NyeC8uL3NyYy9wYWdlcy9yZXBvcnQudHN4Iiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvYW1kIG9wdGlvbnMiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nZ2xfY3J4L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vZ2dsX2NyeC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2dnbF9jcngvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgQnV0dG9uID0gKHsgY2hpbGRyZW4sIG9uQ2xpY2sgfSkgPT4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcInB4LTIgcHktMSBiZy1ibGFjayB0ZXh0LXdoaXRlIHJvdW5kZWRcIiwgb25DbGljazogb25DbGljayB9LCBjaGlsZHJlbikpO1xuZXhwb3J0cy5kZWZhdWx0ID0gQnV0dG9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBsb2NhbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2xvY2FsXCIpKTtcbi8vIFRoaXMgZmlsZSBpcyB0byBzZW5kIGF4aW9zIHJlcXVlc3QgdG8gdGhlIE15U1FMIGRhdGFiYXNlXG5jb25zdCBnZXRBbGxDb250cmFjdHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGxvY2FsXzEuZGVmYXVsdC5nZXQoXCIvY29udHJhY3RzXCIpO1xufTtcbmNvbnN0IGdldEJ5QWRkcmVzcyA9IChhZGRyKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbG9jYWxfMS5kZWZhdWx0LmdldChgL2NvbnRyYWN0Lz9hZGRyZXNzPSR7YWRkcn1gKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dFVCBTdWNjZXNzJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dFVCBFcnI6ICcsIGVycik7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY29uc3QgZ2V0RmVlZEJhY2tCeUFkZHJlc3MgPSAoYWRkcikgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxvY2FsXzEuZGVmYXVsdC5nZXQoYC9yZXBvcnQvP2FkZHJlc3M9JHthZGRyfWApXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR0VUIFN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR0VUIEVycjogJywgZXJyKTtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5jb25zdCBjcmVhdGUgPSAoZGF0YSkgPT4ge1xuICAgIHJldHVybiBsb2NhbF8xLmRlZmF1bHQucG9zdChcIi9jb250cmFjdHNcIiwgZGF0YSk7XG59O1xuY29uc3QgdXBkYXRlID0gKGFkZHIsIGRhdGEpID0+IHtcbiAgICByZXR1cm4gbG9jYWxfMS5kZWZhdWx0LnB1dChgL2NvbnRyYWN0cy8ke2FkZHJ9YCwgZGF0YSk7XG59O1xuY29uc3QgcG9zdEZlZWRCYWNrQnlBZGRyZXNzID0gKGFkZHIsIGZlZWRCYWNrKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbG9jYWxfMS5kZWZhdWx0LnBvc3QoYC9yZXBvcnQvP2FkZHJlc3M9JHthZGRyfWAsIGZlZWRCYWNrKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BPU1QgU3VjY2VzcycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQT1NUIEVycjogJywgZXJyKTtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5jb25zdCBwb3N0QmxvY2tOYXRpdmVUcmFuc2FjdGlvblNpbXVsYXRpb24gPSAodHJhbnNhY3Rpb24pID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgX3RyYW5zYWN0aW9uID0gSlNPTi5zdHJpbmdpZnkodHJhbnNhY3Rpb24pO1xuICAgICAgICBsb2NhbF8xLmRlZmF1bHQucG9zdChgYXBpL3NpbXVsYXRlL2JuYCwgX3RyYW5zYWN0aW9uKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BPU1QgU3VjY2VzcycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgLy8gcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BPU1QgRXJyOiAnLCBlcnIpO1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vc2VuZCB0aGUgdHhuIGRldGFpbFxufTtcbmNvbnN0IGRhdGFTZXJ2aWNlID0ge1xuICAgIGdldEFsbENvbnRyYWN0cyxcbiAgICBjcmVhdGUsXG4gICAgdXBkYXRlLFxuICAgIGdldEJ5QWRkcmVzcyxcbiAgICBnZXRGZWVkQmFja0J5QWRkcmVzcyxcbiAgICBwb3N0RmVlZEJhY2tCeUFkZHJlc3MsXG4gICAgcG9zdEJsb2NrTmF0aXZlVHJhbnNhY3Rpb25TaW11bGF0aW9uXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGF0YVNlcnZpY2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGF4aW9zXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImF4aW9zXCIpKTtcbmNvbnN0IGF4aW9zX2ZldGNoX2FkYXB0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiQHZlc3BhaWFjaC9heGlvcy1mZXRjaC1hZGFwdGVyXCIpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zXzEuZGVmYXVsdC5jcmVhdGUoe1xuICAgIC8vIENoYW5nZSB0aGUgYmFzZVVSTCB0byBnZXQgdGhlIGNsb3VkIHNlcnZpY2VcbiAgICBiYXNlVVJMOiBcImh0dHA6Ly8xMjcuMC4wLjE6ODA4MFwiLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIGFkYXB0ZXI6IGF4aW9zX2ZldGNoX2FkYXB0ZXJfMS5kZWZhdWx0XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHJlYWN0X2RvbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuY29uc3QgZGF0YVNlcnZpY2VfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vZGF0YVNlcnZpY2VcIikpO1xuY29uc3QgdHJhbnNmZXJfMSA9IHJlcXVpcmUoXCIuL3RyYW5zZmVyXCIpO1xuY29uc3QgbW9yZUluZm9fMSA9IHJlcXVpcmUoXCIuL21vcmVJbmZvXCIpO1xuY29uc3QgcmVwb3J0XzEgPSByZXF1aXJlKFwiLi9yZXBvcnRcIik7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IGJ1dHRvbl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2J1dHRvblwiKSk7XG5jb25zdCBNZW51ID0gKCkgPT4ge1xuICAgIC8vUmVzbG92ZSB0aGUgVVJMIFBhcmFtZXRlcnMgdG8gZ2V0IHRoZSBjaGFpbiBJbmZvcm1hdGlvblxuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgY29uc3Qgc3BlbmRlciA9IHBhcmFtcy5nZXQoJ3NwZW5kZXInKTtcbiAgICBpZiAoc3BlbmRlciA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcIkVSUk9SOiBTcGVuZGVyIEFkZHJlc3MgPT09IE5VTExcIikpO1xuICAgIGNvbnN0IGlkID0gcGFyYW1zLmdldCgnaWQnKTtcbiAgICBjb25zdCBjaGFpbklkID0gTnVtYmVyKHBhcmFtcy5nZXQoJ2NoYWluSWQnKSk7XG4gICAgLy8gY29uc3QgZXhwbG9yZXJVcmwgPSBnZXRFeHBsb3JlclVybChjaGFpbklkKTtcbiAgICAvLyBjb25zdCBuYW1lID0gcGFyYW1zLmdldCgnbmFtZScpO1xuICAgIC8vIGNvbnN0IGFzc2V0ID0gcGFyYW1zLmdldCgnYXNzZXQnKTtcbiAgICAvLyBjb25zdCBzcGVuZGVyTmFtZSA9IHBhcmFtcy5nZXQoJ3NwZW5kZXJOYW1lJyk7XG4gICAgLy8gY29uc3QgYnlwYXNzZWQgPSBwYXJhbXMuZ2V0KCdieXBhc3NlZCcpID09PSAndHJ1ZSc7XG4gICAgY29uc3QgaW5pdENvbnRyYWN0U3RhdGUgPSB7XG4gICAgICAgIEFkZHJlc3M6IFwiMHhBQkNERUZHXCIsXG4gICAgICAgIFRva2VuVHlwZTogXCJEZWZhdWx0IFR5cGVcIixcbiAgICAgICAgSG9sZGVyczogXCJEZWZhdWx0IEhvbGRlcnNcIixcbiAgICAgICAgQmFsYW5jZTogMCxcbiAgICAgICAgQ3JlYXRlVGltZTogbmV3IERhdGUoMjAyMCwgNCwgNCwgMTcsIDIzLCA0MiwgMTEpLFxuICAgICAgICBMYXN0VHJhbnNhY3Rpb25UaW1lOiBuZXcgRGF0ZSgyMDIwLCA0LCA0LCAxNywgMjMsIDQyLCAxMSksXG4gICAgICAgIE51bWJlck9mVHJhbnNhY3Rpb246IDAsXG4gICAgICAgIFJlc2VydmVTcG90T25lOiBcIkRlZmF1bHQgUmVzZXJ2ZWQgU3BvdFwiLFxuICAgICAgICBSZXNlcnZlU3BvdFR3bzogXCJEZWZhdWx0IFJlc2VydmVkIFNwb3RcIixcbiAgICAgICAgUmVzZXJ2ZVNwb3RUaHJlZTogXCJEZWZhdWx0IFJlc2VydmVkIFNwb3RcIixcbiAgICAgICAgUmVzZXJ2ZVNwb3RGb3VyOiBcIkRlZmF1bHQgUmVzZXJ2ZWQgU3BvdFwiLFxuICAgICAgICBSZXNlcnZlU3BvdEZpdmU6IFwiRGVmYXVsdCBSZXNlcnZlZCBTcG90XCIsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoMjAyMCwgNCwgNCwgMTcsIDIzLCA0MiwgMTEpLFxuICAgICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKDIwMjAsIDQsIDQsIDE3LCAyMywgNDIsIDExKSxcbiAgICB9O1xuICAgIGNvbnN0IGluaXRVc2VyU3RhdGUgPSB7XG4gICAgICAgIHNob3dTdGF0ZTogJydcbiAgICB9O1xuICAgIGNvbnN0IGluaXRDb250cmFjdEZlZWRCYWNrID0ge1xuICAgICAgICBQcm92aWRlcjogJ01vY2sgUHJvdmlkZXInLFxuICAgICAgICBSZXBvcnRlZENvbnRyYWN0OiAnTW9jayBBZGRyZXNzJyxcbiAgICAgICAgQ2F0ZWdvcnlUYWc6ICdNb2NrIENhdGVnb3J5JyxcbiAgICAgICAgTmFtZVRhZzogJ01vY2sgTmFtZScsXG4gICAgICAgIFRhZzogWydNb2NrIFRhZyAxJywgJ01vY2sgVGFnIDInLCAnTW9jayBUYWcgMyddXG4gICAgfTtcbiAgICBjb25zdCBbY29udHJhY3RGZWVkQmFjaywgc2V0Q29udHJhY3RGZWVkQmFja10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoaW5pdENvbnRyYWN0RmVlZEJhY2spO1xuICAgIGNvbnN0IFtjb250cmFjdFN0YXRlLCBzZXRDb250cmFjdF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoaW5pdENvbnRyYWN0U3RhdGUpO1xuICAgIGNvbnN0IFt1c2VyU3RhdGUsIHNldFVzZXJTdGF0ZV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoaW5pdFVzZXJTdGF0ZSk7XG4gICAgY29uc3QgW2hhc0xvYWRlZCwgc2V0SGFzTG9hZGVkXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZldGNoRGF0YSA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IGZldGNoQ29udHJhY3QgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhU2VydmljZV8xLmRlZmF1bHQuZ2V0QnlBZGRyZXNzKHNwZW5kZXIpO1xuICAgICAgICAgICAgfSkuY2F0Y2goKHJlaikgPT4ge1xuICAgICAgICAgICAgICAgIHNldENvbnRyYWN0KGluaXRDb250cmFjdFN0YXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IGZldGNoQ29udHJhY3RGZWVkQmFjayA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgICAgIGRhdGFTZXJ2aWNlXzEuZGVmYXVsdC5nZXRGZWVkQmFja0J5QWRkcmVzcyhzcGVuZGVyKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChyZWopID0+IHtcbiAgICAgICAgICAgICAgICBzZXRDb250cmFjdEZlZWRCYWNrKGluaXRDb250cmFjdEZlZWRCYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIGZldGNoQ29udHJhY3RcbiAgICAgICAgICAgICAgICAvLyBmZXRjaENvbnRyYWN0RmVlZEJhY2tcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKFtjb250cmFjdFJlc10pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHNldEhhc0xvYWRlZCh0cnVlKTtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgocmVqKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBmZXRjaERhdGEoKVxuICAgICAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgc2V0Q29udHJhY3QoaW5pdENvbnRyYWN0U3RhdGUpO1xuICAgICAgICAgICAgc2V0Q29udHJhY3RGZWVkQmFjayhpbml0Q29udHJhY3RGZWVkQmFjayk7XG4gICAgICAgICAgICBzZXRIYXNMb2FkZWQodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0sIFtdKTtcbiAgICBjb25zdCBleHRlbnNpb25SZXNwb25zZSA9IChkYXRhKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgeWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHVuZGVmaW5lZCwgeyBpZCwgZGF0YSB9KTtcbiAgICAgICAgd2luZG93LmNsb3NlKCk7XG4gICAgfSk7XG4gICAgY29uc3QgcmVqZWN0ID0gKCkgPT4gZXh0ZW5zaW9uUmVzcG9uc2UoZmFsc2UpO1xuICAgIGNvbnN0IGFjY2VwdCA9ICgpID0+IGV4dGVuc2lvblJlc3BvbnNlKHRydWUpO1xuICAgIGNvbnN0IGNoYW5nZVNlY3Rpb24gPSAoc2VjdGlvbikgPT4ge1xuICAgICAgICBsZXQgdXNlclN0YXRlID0ge1xuICAgICAgICAgICAgc2hvd1N0YXRlOiBzZWN0aW9uXG4gICAgICAgIH07XG4gICAgICAgIHNldFVzZXJTdGF0ZSh1c2VyU3RhdGUpO1xuICAgIH07XG4gICAgaWYgKGhhc0xvYWRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBudWxsLCBcIkxvYWRpbmcgLi4uXCIpKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAodXNlclN0YXRlLnNob3dTdGF0ZSA9PT0gJ21vcmVJbmZvJykge1xuICAgICAgICAgICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQobW9yZUluZm9fMS5Nb3JlSW5mbywgbnVsbCksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LXJvdyBnYXAtMSBqdXN0aWZ5LWFyb3VuZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogKCkgPT4gY2hhbmdlU2VjdGlvbigndHJhbnNmZXInKSB9LCBcIiBUcmFuc2ZlciBcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogKCkgPT4gY2hhbmdlU2VjdGlvbigncmVwb3J0JykgfSwgXCIgUmVwb3J0IFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYnV0dG9uXzEuZGVmYXVsdCwgeyBvbkNsaWNrOiAoKSA9PiBjaGFuZ2VTZWN0aW9uKCdtb3JlSW5mbycpIH0sIFwiIE1vcmUgSW5mbyBcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogcmVqZWN0IH0sIFwiIFJlamVjdCBcIikpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodXNlclN0YXRlLnNob3dTdGF0ZSA9PT0gJ3JlcG9ydCcpIHtcbiAgICAgICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlcG9ydF8xLlJlcG9ydCwgT2JqZWN0LmFzc2lnbih7fSwgY29udHJhY3RGZWVkQmFjaykpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1yb3cgZ2FwLTEganVzdGlmeS1hcm91bmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ3RyYW5zZmVyJykgfSwgXCIgVHJhbnNmZXIgXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ3JlcG9ydCcpIH0sIFwiIFJlcG9ydCBcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogKCkgPT4gY2hhbmdlU2VjdGlvbignbW9yZUluZm8nKSB9LCBcIiBNb3JlIEluZm8gXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6IHJlamVjdCB9LCBcIiBSZWplY3QgXCIpKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQodHJhbnNmZXJfMS5UcmFuc2ZlciwgT2JqZWN0LmFzc2lnbih7fSwgY29udHJhY3RTdGF0ZSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1yb3cgZ2FwLTEganVzdGlmeS1hcm91bmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ3RyYW5zZmVyJykgfSwgXCIgVHJhbnNmZXIgXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6ICgpID0+IGNoYW5nZVNlY3Rpb24oJ3JlcG9ydCcpIH0sIFwiIFJlcG9ydCBcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGJ1dHRvbl8xLmRlZmF1bHQsIHsgb25DbGljazogKCkgPT4gY2hhbmdlU2VjdGlvbignbW9yZUluZm8nKSB9LCBcIiBNb3JlIEluZm8gXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChidXR0b25fMS5kZWZhdWx0LCB7IG9uQ2xpY2s6IHJlamVjdCB9LCBcIiBSZWplY3QgXCIpKSkpO1xuICAgICAgICB9XG4gICAgfVxufTtcbnJlYWN0X2RvbV8xLmRlZmF1bHQucmVuZGVyKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5TdHJpY3RNb2RlLCBudWxsLFxuICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE1lbnUsIG51bGwpKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5SZXBvcnQgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBkYXRhU2VydmljZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9kYXRhU2VydmljZVwiKSk7XG5jb25zdCBSZXBvcnQgPSAoZmVlZEJhY2spID0+IHtcbiAgICBjb25zdCBpbml0Q29udHJhY3RGZWVkQmFjayA9IHtcbiAgICAgICAgbmFtZVRhZzogJycsXG4gICAgICAgIGNhdGVnb3J5VGFnOiAnJyxcbiAgICAgICAgZmVhdHVyZVRhZzogJydcbiAgICB9O1xuICAgIGNvbnN0IFtuYW1lVGFnUmVwb3J0LCBzZXRuYW1lVGFnUmVwb3J0XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgnJyk7XG4gICAgY29uc3QgW2NhdGVnb3J5VGFnUmVwb3J0LCBzZXRjYXRlZ29yeVRhZ1JlcG9ydF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoJycpO1xuICAgIGNvbnN0IFtmZWF0dXJlVGFnUmVwb3J0LCBzZXRmZWF0dXJlVGFnUmVwb3J0XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgnJyk7XG4gICAgLy8gY29uc3QgW2NvbnRyYWN0RmVlZEJhY2ssIHNldENvbnRyYWN0RmVlZEJhY2tdID0gdXNlU3RhdGU8Y29udHJhY3RGZWVkQmFjaz4oaW5pdENvbnRyYWN0RmVlZEJhY2spXG4gICAgY29uc3QgW2lzUmVwb3J0ZWQsIHNldGlzUmVwb3J0ZWRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAvLyBjb25zdCBmaW5pc2hSZXBvcnQgPSBhc3luYyAoKSA9PntcbiAgICAvLyAgICAgbGV0IHRtcDogY29udHJhY3RGZWVkQmFjayA9IHtcbiAgICAvLyAgICAgICAgIG5hbWVUYWc6IG5hbWVUYWdSZXBvcnQsXG4gICAgLy8gICAgICAgICBjYXRlZ29yeVRhZzogY2F0ZWdvcnlUYWdSZXBvcnQsXG4gICAgLy8gICAgICAgICBmZWF0dXJlVGFnOiBmZWF0dXJlVGFnUmVwb3J0XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgc2V0Q29udHJhY3RGZWVkQmFjayh0bXApXG4gICAgLy8gICAgIHNldGlzUmVwb3J0ZWQodHJ1ZSlcbiAgICAvLyB9XG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gKCkgPT4ge1xuICAgICAgICBsZXQgYWRkcmVzcyA9IGZlZWRCYWNrLlJlcG9ydGVkQ29udHJhY3Q7XG4gICAgICAgIGRhdGFTZXJ2aWNlXzEuZGVmYXVsdC5wb3N0RmVlZEJhY2tCeUFkZHJlc3MoYWRkcmVzcywgZmVlZEJhY2spO1xuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2ZsZXggZmxleC1jb2wgYmctYmxhY2snIH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgYmctemluYy04MDAnLCBpZDogJ2JhY2tncm91ZCcgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCB7IGNsYXNzTmFtZTogJ2ZsZXggZmxleC1jb2wnLCBvblN1Ym1pdDogaGFuZGxlU3VibWl0IH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogJ3RleHQtd2hpdGUnIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiTmFtZSBUYWc6XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBjbGFzc05hbWU6ICd0ZXh0LXppbmMtNTAwJywgdHlwZTogJ3RleHQnLCB2YWx1ZTogbmFtZVRhZ1JlcG9ydCwgb25DaGFuZ2U6IChlKSA9PiBzZXRuYW1lVGFnUmVwb3J0KGUudGFyZ2V0LnZhbHVlKSwgcGxhY2Vob2xkZXI6ICdOYW1lJyB9KSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogJ3RleHQtd2hpdGUnIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnkgVGFnOlwiLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgY2xhc3NOYW1lOiAndGV4dC16aW5jLTUwMCcsIHR5cGU6ICd0ZXh0JywgdmFsdWU6IGNhdGVnb3J5VGFnUmVwb3J0LCBvbkNoYW5nZTogKGUpID0+IHNldGNhdGVnb3J5VGFnUmVwb3J0KGUudGFyZ2V0LnZhbHVlKSwgcGxhY2Vob2xkZXI6ICdDYXRlZ29yeScgfSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6ICd0ZXh0LXdoaXRlJyB9LFxuICAgICAgICAgICAgICAgICAgICBcIkZlYXR1cmUgVGFnOlwiLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgY2xhc3NOYW1lOiAndGV4dC16aW5jLTUwMCcsIHR5cGU6ICd0ZXh0JywgdmFsdWU6IGZlYXR1cmVUYWdSZXBvcnQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0ZmVhdHVyZVRhZ1JlcG9ydChlLnRhcmdldC52YWx1ZSksIHBsYWNlaG9sZGVyOiAnRmVhdHVyZScgfSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgdHlwZTogJ3N1Ym1pdCcsIHZhbHVlOiBcIlByZXNzIHRvIHJlcG9ydFwiIH0pKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnZmxleCBmbGV4LXJvdycgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcIlRlc3QgT2JqIERhdGE6IFwiKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBmZWVkQmFjay5OYW1lVGFnKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBmZWVkQmFjay5DYXRlZ29yeVRhZyksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgZmVlZEJhY2suVGFnWzBdKSkpKSk7XG59O1xuZXhwb3J0cy5SZXBvcnQgPSBSZXBvcnQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5hbWRPID0ge307IiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwicGFnZXMvbWVudVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtnZ2xfY3J4XCJdID0gc2VsZltcIndlYnBhY2tDaHVua2dnbF9jcnhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3BhZ2VzL21lbnUudHN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=