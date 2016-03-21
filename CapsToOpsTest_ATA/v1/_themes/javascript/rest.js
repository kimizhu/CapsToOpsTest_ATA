/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		9:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + {"10":"bdbedb5ece3b543b75b7"}[chunkId] + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// DOCS uses docpacker to finalize the theme path. In order to deal with the dynamic path issue,
	// the function provides the entry script path as the module path for the webpack loading system.
	function getPublicPath() {
	    'use strict';
	    var scriptEls = document.getElementsByTagName('script');
	    var thisScriptEl = scriptEls[scriptEls.length - 1];
	    var scriptPath = thisScriptEl.src;
	    return scriptPath.substr(0, scriptPath.lastIndexOf('/') + 1);
	}
	__webpack_require__.p = getPublicPath();
	
	/**
	 * This js is entry for integrating try-it feature on Rest apis. It will:
	 *  1. find all swagger urls and try to resolve these urls.
	 *  2. load vue templates for parameter form/request/response.
	 */
	__webpack_require__.e/* require */(10, function(__webpack_require__) { /* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(34), __webpack_require__(16), __webpack_require__(35), __webpack_require__(36), __webpack_require__(39), __webpack_require__(40), __webpack_require__(41)]; (function(_, Q, Vue, SwaggerApi, SwaggerRegistry, RestTemplate, SwaggerRunner) {
	    "use strict";
	
	    var docsToc = __webpack_require__(5);
	    var docsBread = __webpack_require__(15);
	    docsToc.renderRestApiTocOldDesign();
	    docsBread.renderConceptualBreadcrumbAsync();
	
	    $("div.api-example[data-api-swagger-url]").each(function() {
	        SwaggerRegistry.registerSwaggerApi($(this).data('api-swagger-url'));
	    });
	
	    var buildParameterModel = function(param) {
	        var newModel = {};
	        newModel.name = param.name;
	        newModel.required = param.required;
	        var type = param.type || param.dataType;
	        if (typeof type === 'undefined') {
	            var schema = param.schema;
	            if (schema && schema.$ref) {
	                var ref = schema.$ref;
	                param.default = param.default || schema.example;
	                if (ref.indexOf('#/definitions/') === 0) {
	                    type = ref.substring('#/definitions/'.length);
	                } else {
	                    type = ref;
	                }
	            }
	        }
	
	        newModel.type = type;
	
	        newModel.isArray = newModel.type.toLowerCase() === 'array' || param.allowMultiple;
	        newModel.isArray = !!newModel.isArray;
	        newModel.paramType = param.in || param.paramType;
	        newModel.isBody = param.paramType === 'body' || param.in === 'body';
	
	        if(typeof param.default === 'undefined') {
	            param.default = param.defaultValue;
	        }
	
	        var defaultValue = newModel.isArray && Array.isArray(param.default) ? param.default.join('\n') : param.default;
	        if (_.isObject(defaultValue)) {
	            defaultValue = JSON.stringify(defaultValue, null, 4);
	        }
	
	        newModel.default = defaultValue;
	        newModel.hasDefault = (typeof param.default !== 'undefined');
	        newModel.valueId = 'm' + param.name + new Date().getTime();
	        if (param.allowableValues) {
	            newModel.isList = true;
	            newModel.allowableValues = param.allowableValues;
	        }
	        newModel.enum = param.enum;
	        return newModel;
	    };
	
	    var buildExample = function(definition) {
	        var example;
	        if (definition.examples && _.isPlainObject(definition.examples) && definition.examples['application/json']) {
	            example =  definition.examples['application/json'];
	        } else if (!definition.example) {
	            example = definition.examples;
	        }
	        return (_.isString(example) || _.isUndefined(example))? example : JSON.stringify(example, null, 4);
	    };
	
	    Q.all([SwaggerRegistry.resolveAll(), RestTemplate.loadTemplates()]).then(function() {
	        $("div.api-example[data-api-operation-id]").each(function() {
	            var operationId = $(this).data('api-operation-id').replace(/\s+/g, '_');
	            var swaggerUrl = $(this).data('api-swagger-url');
	            var proxyUrl = $(this).data('api-example-endpoint');
	            // hard-coded runner for graph api, need to be-refactored later
	            SwaggerRunner.register(proxyUrl, "url", "Bearer {token:https://graph.windows.net/}");
	
	            var api = SwaggerRegistry.getApi(swaggerUrl);
	            if (api && api.isBuilt && api.isValid) {
	                var operation = api.getOperationById(operationId);
	                if (operation) {
	                    var parameterModels = _.map(operation.parameters, buildParameterModel);
	                    var restFormId = operationId + Math.random().toString().slice(2);
	                    $(this).attr('id', restFormId);
	
	                    var responseSamples = _.map(_.values(operation.responses), buildExample);
	                    var vue = new Vue({
	                        el: '#' + restFormId,
	                        template: '#rest-form',
	                        data: {
	                            "proxy_url" : proxyUrl,
	                            "swagger_url" : swaggerUrl,
	                            "parameters": parameterModels,
	                            "operation_id": operationId,
	                            "sample_response" : responseSamples.length ? responseSamples[0] : ''
	                        }
	                    });
	                }
	            }
	        });
	    }).catch(function(err) {
	        console.log(err);
	    });
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))});
	


/***/ }
/******/ ]);
//# sourceMappingURL=rest.js.map