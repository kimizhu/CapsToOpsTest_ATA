webpackJsonp([7,3],{

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  * $script.js JS loader & dependency manager
	  * https://github.com/ded/script.js
	  * (c) Dustin Diaz 2014 | License MIT
	  */
	
	(function (name, definition) {
	  if (typeof module != 'undefined' && module.exports) module.exports = definition()
	  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  else this[name] = definition()
	})('$script', function () {
	  var doc = document
	    , head = doc.getElementsByTagName('head')[0]
	    , s = 'string'
	    , f = false
	    , push = 'push'
	    , readyState = 'readyState'
	    , onreadystatechange = 'onreadystatechange'
	    , list = {}
	    , ids = {}
	    , delay = {}
	    , scripts = {}
	    , scriptpath
	    , urlArgs
	
	  function every(ar, fn) {
	    for (var i = 0, j = ar.length; i < j; ++i) if (!fn(ar[i])) return f
	    return 1
	  }
	  function each(ar, fn) {
	    every(ar, function (el) {
	      return !fn(el)
	    })
	  }
	
	  function $script(paths, idOrDone, optDone) {
	    paths = paths[push] ? paths : [paths]
	    var idOrDoneIsDone = idOrDone && idOrDone.call
	      , done = idOrDoneIsDone ? idOrDone : optDone
	      , id = idOrDoneIsDone ? paths.join('') : idOrDone
	      , queue = paths.length
	    function loopFn(item) {
	      return item.call ? item() : list[item]
	    }
	    function callback() {
	      if (!--queue) {
	        list[id] = 1
	        done && done()
	        for (var dset in delay) {
	          every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = [])
	        }
	      }
	    }
	    setTimeout(function () {
	      each(paths, function loading(path, force) {
	        if (path === null) return callback()
	        
	        if (!force && !/^https?:\/\//.test(path) && scriptpath) {
	          path = (path.indexOf('.js') === -1) ? scriptpath + path + '.js' : scriptpath + path;
	        }
	        
	        if (scripts[path]) {
	          if (id) ids[id] = 1
	          return (scripts[path] == 2) ? callback() : setTimeout(function () { loading(path, true) }, 0)
	        }
	
	        scripts[path] = 1
	        if (id) ids[id] = 1
	        create(path, callback)
	      })
	    }, 0)
	    return $script
	  }
	
	  function create(path, fn) {
	    var el = doc.createElement('script'), loaded
	    el.onload = el.onerror = el[onreadystatechange] = function () {
	      if ((el[readyState] && !(/^c|loade/.test(el[readyState]))) || loaded) return;
	      el.onload = el[onreadystatechange] = null
	      loaded = 1
	      scripts[path] = 2
	      fn()
	    }
	    el.async = 1
	    el.src = urlArgs ? path + (path.indexOf('?') === -1 ? '?' : '&') + urlArgs : path;
	    head.insertBefore(el, head.lastChild)
	  }
	
	  $script.get = create
	
	  $script.order = function (scripts, id, done) {
	    (function callback(s) {
	      s = scripts.shift()
	      !scripts.length ? $script(s, id, done) : $script(s, callback)
	    }())
	  }
	
	  $script.path = function (p) {
	    scriptpath = p
	  }
	  $script.urlArgs = function (str) {
	    urlArgs = str;
	  }
	  $script.ready = function (deps, ready, req) {
	    deps = deps[push] ? deps : [deps]
	    var missing = [];
	    !each(deps, function (dep) {
	      list[dep] || missing[push](dep);
	    }) && every(deps, function (dep) {return list[dep]}) ?
	      ready() : !function (key) {
	      delay[key] = delay[key] || []
	      delay[key][push](ready)
	      req && req(missing)
	    }(deps.join('|'))
	    return $script
	  }
	
	  $script.done = function (idOrDone) {
	    $script([null], idOrDone)
	  }
	
	  return $script
	});


/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    "use strict";
	    return {
	        paths: {
	            livefyre: "//cdn.livefyre.com/Livefyre.js",
	            openfeedback: "https://openfeedback.blob.core.windows.net/openfeedback/openfeedback.js",
	            opencomment: "https://openfeedback.blob.core.windows.net/commenting/opencomment.js",
	            wedcs: "//c.microsoft.com/ms.js"
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/* Sample:
	    Experiment.IsEnabledAsync('experiment_name').done(function(fEnabled){
	        if (fEnabled) {
	            // do something, in case the experiment is ON for this specific session
	        } else {
	            // do something else, in case the experiment is OFF for this specific session
	        }
	    });
	*/
	
	// jshint ignore:start
	window.Experiment = new(function(){
	    var root = (function(){return this;}).call(null);
	    var _ = this;
	
	    var m_objConfigurationPromise = (function() {
	        var retval = root.NinjaMode ? $.Deferred().resolve({}) : $.ajax({url: '/_chrome/experiment.json'});
	        retval.then(function(configuration) {
	            _.m_objConfiguration = configuration;
	        }, function() {
	            _.m_objConfiguration = null;
	        });
	        return retval;
	    })();
	
	    _.GetCookie = function(name) {
	        var cookies = root.document.cookie ? root.document.cookie.split('; ') : [];
	        for (var i = 0; i < cookies.length; i++) {
	            var pos = cookies[i].indexOf('=');
	            if (name === root.decodeURIComponent(cookies[i].slice(0, pos)))
	            {
	                var cookie = cookies[i].slice(pos + 1).replace(/\+/g, ' ');
	                cookie = root.decodeURIComponent(cookie);
	                return cookie;
	            }
	        }
	    };
	
	    _.GetHashCode = function(input) {
	        var result = 0;
	        if (input) {
	            for (var i = 0; i < input.length; i++) {
	                var c = input.charCodeAt(i);
	                result = ((result << 5) - result) + c;
	                result = result & result;
	            }
	        }
	        return result;
	    };
	
	    _.GetConfigurationAsync = function() {
	        if (_.m_objConfiguration) {
	            return $.Deferred().resolve(_.m_objConfiguration);
	        }
	        return m_objConfigurationPromise;
	    };
	
	    _.GetCustomSettings = function() {
	        var result = _.GetCookie('EXP');
	        result = result && _.JsonDeserialize(result);
	        return result;
	    };
	
	    _.IsEnabled = function(experimentName, configuration) {
	        try {
	            var customSettings = _.GetCustomSettings();
	            if (customSettings && customSettings.hasOwnProperty(experimentName)) {
	                return Boolean(customSettings[experimentName]);
	            }
	            if (!configuration) {
	                return false;
	            }
	            var experimentSetting = configuration[experimentName];
	            if (experimentSetting) {
	                if (experimentSetting.hasOwnProperty('enabled') && !experimentSetting['enabled']) {
	                    return false;
	                }
	                var experimentRatio = experimentSetting['ratio'];
	                if (experimentRatio <= 0)
	                {
	                    return false;
	                }
	                if (experimentRatio >= 100)
	                {
	                    return true;
	                }
	                var sessionId = _.GetCookie('SID');
	                if (!sessionId) {
	                    return false;
	                }
	                var hash = _.GetHashCode(sessionId + ':' + experimentName);
	                if (hash === -2147483648)
	                {
	                    hash = 0;
	                }
	                if (hash < 0)
	                {
	                    hash = -hash;
	                }
	                return hash < root.Math.floor(2147483647 / 100) * experimentRatio;
	            }
	        } catch (ex) {
	            // do nothing
	        }
	        return false;
	    };
	
	    _.IsEnabledAsync = function(experimentName) {
	        return _.GetConfigurationAsync().then(function(configuration) {
	            return $.Deferred().resolve(_.IsEnabled(experimentName, configuration));
	        }, function() {
	            return $.Deferred().resolve(_.IsEnabled(experimentName));
	        });
	    };
	
	    _.JsonDeserialize = function(content) {
	        return root.JSON && root.JSON.parse ? root.JSON.parse(content) : (new Function('return (' + content + ')'))();
	    };
	
	    _.SetCookie = function(name, value, options) {
	        var cookie = root.encodeURIComponent(name) + '=' + root.encodeURIComponent(value);
	        options = options || {};
	
	        if (typeof options.expires === 'number' || options.expires instanceof Number) {
	            var milliseconds = options.expires * 86400 * 1000;
	            options.expires = new Date();
	            options.expires.setTime(Number(options.expires) + milliseconds);
	        }
	
	        if (options.expires) {
	            cookie += '; expires=' + options.expires.toUTCString();
	        }
	        if (options.path) {
	            cookie += '; path=' + options.path;
	        }
	        if (options.domain) {
	            cookie += '; domain=' + options.domain;
	        }
	        if (options.secure) {
	            cookie += '; secure';
	        }
	        return root.document.cookie = cookie;
	    };
	
	    try {
	        root.AmbientContext = _.GetCookie('AmbientContext');
	        root.AmbientContext = root.AmbientContext && _.JsonDeserialize(root.AmbientContext);
	    } catch(ex) {
	    } finally {
	        root.AmbientContext = root.AmbientContext || {};
	        root.AmbientContext['EXP'] = _.GetCustomSettings();
	        root.AmbientContext['SID'] = _.GetCookie('SID');
	    }
	})();
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {(function(){
	    "use strict";
	
	    var Trace = __webpack_require__(27);
	
	    if (window.insight) {
	        Trace.traceError("insight.js is loaded more than once.");
	        return;
	    }
	    var insight = {};
	
	    insight.debugConsoleLogEnabled = false;
	    insight.debugLogMsgs = [];
	    insight.debugLog = function (inMsg) {
	        insight.debugLogMsgs.push(inMsg);
	        if (insight.debugConsoleLogEnabled) {
	            console.log(inMsg);
	        }
	    };
	    //Common function to fire custom event on clicked element
	    insight.processWEDCSCustomEventFromArray = function (inArray) {
	        if (typeof window.MscomCustomEvent !== "function") {
	            return;
	        } else if (!inArray || inArray.length === 0) {
	            window.MscomCustomEvent();
	            return;
	        }
	        window.MscomCustomEvent.apply(this, inArray);
	    };
	    ////////////////////// ERROR RELATED
	    var formatErrorObjectToWedcsArray = function (errorObject) {
	        var array = [];
	        if (!errorObject) {
	            return array;
	        }
	        if (errorObject.error) {
	            array.push("ms.error", errorObject.error.toString().substring(0, 100));
	        }
	        if (errorObject.message) {
	            array.push("ms.errormsg", errorObject.message.substring(0, 30));
	        }
	        if (errorObject.source) {
	            array.push("ms.errorsrc", errorObject.source);
	        }
	        if (errorObject.lineno) {
	            array.push("ms.errorlineno", errorObject.lineno);
	        }
	        if (errorObject.colno) {
	            array.push("ms.errorcolno", errorObject.colno);
	        }
	        return array;
	    };
	    var errorSubscriber = function (errorObject) {
	        try {
	            var tArray = formatErrorObjectToWedcsArray(errorObject);
	            if (tArray.length > 0) {
	                insight.processWEDCSCustomEventFromArray(tArray);
	            }
	        } catch (ex) {
	            if (window.console) {
	                console.error(ex.toString());
	            }
	        }
	    };
	    insight.subscribeErrors = function () {
	        var Errors = __webpack_require__(28);
	        Errors.subscribe(errorSubscriber);
	    };
	    ////////////////////// FOCUS EVENT
	    insight.firePageFocusEvent = function (type) {
	        insight.debugLog("stepped inside firePageFocusEvent function");
	        var tArray = [];
	        tArray.push("ms.focuseventtime", new Date().getTime());
	        tArray.push("ms.focusorblue", type);
	        insight.processWEDCSCustomEventFromArray(tArray);
	    };
	    insight.setupPageFocusTracking = function () {
	
	        $(window).on("blur focus", function (e) {
	            var prevType = $(this).data("prevType");
	
	            if (prevType !== e.type) {   //reduce double fire issues
	                switch (e.type) {
	                    case "blur":
	                        insight.debugLog("Blured");
	                        insight.firePageFocusEvent("Blured");
	                        break;
	                    case "focus":
	                        insight.debugLog("Focused");
	                        insight.firePageFocusEvent("Focused");
	                        break;
	                }
	            }
	            $(this).data("prevType", e.type);
	        });
	
	    };
	    ////////////////////// COPY EVENT
	    insight.fireCopyEvent = function (txt, length) {
	        insight.debugLog("stepped inside fireCopyEvent function");
	        var tArray = [];
	        tArray.push("ms.copyeventtime", new Date().getTime());
	        tArray.push("ms.copycontent", txt);
	        tArray.push("ms.copycontentlength", length);
	        insight.processWEDCSCustomEventFromArray(tArray);
	    };
	    insight.setupCopyTracking = function () {
	        $(window).bind("copy", function (e) {
	            var txt = window.getSelection().toString();
	            var length = txt.length;
	            txt = txt.substring(0, 20); //truncate to limit the length of WEDCS event
	            insight.fireCopyEvent(txt, length);
	        });
	    };
	    ////////////////////// SWITCHER SELECTION
	    insight.fireSwitcherEvent = function (switcher, selectedValue) {
	        insight.debugLog("stepped inside fireSwitcherEvent function");
	        var tArray = [];
	        tArray.push("ms.switcheventtime", new Date().getTime());
	        tArray.push("ms.switcher", switcher);
	        tArray.push("ms.switchervalue", selectedValue);
	        insight.processWEDCSCustomEventFromArray(tArray);
	    };
	    insight.setupSwitcherTracking = function () {
	        $(".menu-theme select").change(function () {
	            var selectedValue = $(".menu-theme select").val();
	            insight.fireSwitcherEvent("theme", selectedValue);
	        });
	        $('.menu-platform select').change(function () {
	            var selectedValue = $(".menu-platform select").val();
	            insight.fireSwitcherEvent("platform", selectedValue);
	        });
	        $('.menu-lang select').change(function () {
	            var selectedValue = $(".menu-lang select").val();
	            insight.fireSwitcherEvent("lang", selectedValue);
	        });
	    };
	    ////////////////////// SCROLL TRACKING
	    //Scroll Area definition
	    insight.scrollArea = function (inName) {
	        this.name = inName;
	        this.scrollNA = false;
	        this.scrollQuarter = false;
	        this.scrollHalf = false;
	        this.scrollThreeQuarter = false;
	        this.scrollBot = false;
	    };
	    //Track multiple scroll areas per page
	    insight.currScrollArea = null;
	    insight.scrollAreaList = [];
	
	    insight.setCurrScrollArea = function (inIndex) {
	        if (typeof inIndex !== "number") {
	            return;
	        } else if (insight.scrollAreaList.length <= inIndex) {
	            return;
	        }
	
	        insight.currScrollArea = insight.scrollAreaList[inIndex];
	    };
	
	    //Page dimension variables
	    insight.scrollBottomElement = null;
	    insight.scrollPageHeight = -1;
	    insight.viewportBottom = -1;
	    insight.refreshScrollPageDimVars = function () {
	        var tBottom = 0;
	        if (insight.scrollBottomElement) {
	            tBottom = insight.scrollBottomElement.getBoundingClientRect().top + window.pageYOffset;
	        }
	        if (tBottom <= 0) {
	            tBottom = document.body.getBoundingClientRect().height;
	        }
	        insight.scrollPageHeight = tBottom;
	        insight.viewportBottom = window.pageYOffset + window.innerHeight;
	    };
	    insight.suppressMobileEvents = false;
	    insight.fireScrollEvent = function (inScrollValue) {
	        insight.fireScrollEvent(inScrollValue, "scroll");
	    };
	    insight.fireScrollStopEvent = function (inScrollValue) {
	        insight.fireScrollEvent(inScrollValue, "scroll-stop");
	    };
	    insight.fireScrollEvent = function (inScrollValue, eventType) {
	        insight.debugLog("stepped inside fireScrollEvent function");
	        var tArray = [];
	        tArray.push("ms.pgarea", "body");
	        tArray.push("ms.scnum", "scroll-" + inScrollValue);
	        tArray.push("ms.interactiontype", "4");
	        tArray.push("ms.scn", eventType);
	        insight.processWEDCSCustomEventFromArray(tArray);
	    };
	    insight.processScroll = function (stopEvent) {
	        window.clearTimeout(insight.scrollResizeTimer);
	        if (insight.currScrollArea === null) {
	            return;
	        }
	        insight.refreshScrollPageDimVars();
	        if (insight.scrollPageHeight <= 0) {
	            return;
	        } else if (insight.suppressMobileEvents && window.innerWidth <= 510) {
	            return;
	        }
	
	        var tCurrPercent = insight.viewportBottom / insight.scrollPageHeight;
	
	        if (stopEvent === true) {
	            insight.fireScrollStopEvent(Math.round(tCurrPercent * 100) + "%");
	            return;
	        }
	
	        if (window.innerHeight > insight.scrollPageHeight * 0.90) {
	            //Visitor can see the whole page, fire special -na event
	            if (!insight.currScrollArea.scrollNA) {
	                insight.currScrollArea.scrollNA = true;
	                insight.fireScrollEvent("na");
	            }
	            return;
	        }
	
	        if (tCurrPercent > 0.25 && !insight.currScrollArea.scrollQuarter) {
	            insight.currScrollArea.scrollQuarter = true;
	            insight.fireScrollEvent("25%");
	        }
	        if (tCurrPercent > 0.50 && !insight.currScrollArea.scrollHalf) {
	            insight.currScrollArea.scrollHalf = true;
	            insight.fireScrollEvent("50%");
	        }
	        if (tCurrPercent > 0.75 && !insight.currScrollArea.scrollThreeQuarter) {
	            insight.currScrollArea.scrollThreeQuarter = true;
	            insight.fireScrollEvent("75%");
	        }
	        if (tCurrPercent > 0.99 && !insight.currScrollArea.scrollBot) {
	            insight.currScrollArea.scrollBot = true;
	            insight.fireScrollEvent("100%");
	        }
	    };
	
	    insight.scrollTimer = null;
	    insight.scrollResizeTimer = 0;
	    insight.setupScrollTracking = function () {
	        insight.scrollBottomElement = $("#footer")[0];
	
	        insight.scrollAreaList.push(new insight.scrollArea("body"));
	        insight.setCurrScrollArea(0);
	
	        window.addEventListener("scroll", function () {
	            insight.processScroll(false);
	        });
	
	        //catch scroll stop event (stop more than 10 seconds)
	        if (insight.scrollTimer !== null) {
	            window.clearTimeout(insight.scrollTimer);
	        }
	        insight.scrollTimer = window.setTimeout(function () {
	            insight.processScroll(true);
	        }, 1000 * 10);
	
	        //Note: resize also catches zoom in/out
	        $(window).resize(function () {
	            window.clearTimeout(insight.scrollResizeTimer);
	            insight.scrollResizeTimer = window.setTimeout(function () {
	                insight.processScroll(false);
	            }, 500);
	        });
	    };
	    insight.extractMetaFromAmbientContext = function () {
	        if (window.AmbientContext) {
	            for (var key in window.AmbientContext) {
	                if (window.AmbientContext.hasOwnProperty(key)) {
	                    var content = window.AmbientContext[key];
	                    if (content) {
	                        if (!(typeof(content) === "string" || content instanceof String)) {
	                            content = JSON.stringify(content);
	                        }
	                    }
	                    $("head").append("<meta name='ms." + encodeURI(key.replace(".", "_")) +
	                        "' content='" + encodeURI(content) + "' />");
	                }
	            }
	        }
	    };
	    insight.setupPerfTiming = function () {
	        if (!window.performance || !window.performance.timing) {
	            return;
	        }
	        var navigationStart = window.performance.timing.navigationStart;
	        if (typeof navigationStart !== "number") {
	            return;
	        }
	        //Navigation timing attributes, ref: https://w3c.github.io/navigation-timing/
	        var keys = ["redirectStart", "redirectEnd", "fetchStart", "connectStart", "connectEnd", "requestStart", "responseStart",
	                    "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd",
	                    "domComplete", "loadEventStart", "loadEventEnd"];
	        var timeInfoArr = [];
	        for (var index = 0; index < keys.length; index++) {
	            var key = keys[index];
	            if (typeof window.performance.timing[key] !== "number") {
	                timeInfoArr.push("");
	            } else {
	                var elapsed = window.performance.timing[key] !== 0 ? window.performance.timing[key] - navigationStart : "";
	                timeInfoArr.push(elapsed);
	            }
	        }
	        $("head").append("<meta name='ms.perf.timing' content='" + timeInfoArr.join() + "' />");
	    };
	    insight.enableWEDCS = function () {
	        //WEDCS base settings
	        window.varClickTracking = 1;
	        window.varCustomerTracking = 0;
	        window.varAutoFirePV = 1;
	        window.route = "";
	        window.ctrl = "";
	
	        __webpack_require__.e/* require */(3, function(__webpack_require__) { /* WEBPACK VAR INJECTION */(function($script) {var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(23)]; (function(config){
	            $script(config.paths.wedcs);
	        }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(22)))});
	    };
	
	    $(document).ready(function () {
	        try {
	            insight.subscribeErrors();
	            insight.extractMetaFromAmbientContext();
	            insight.setupPerfTiming();
	            insight.enableWEDCS();
	            insight.setupPageFocusTracking();
	            insight.setupScrollTracking();
	            insight.setupCopyTracking();
	            insight.setupSwitcherTracking();
	        } catch (ex) {
	            Trace.traceError(ex.toString());
	        }
	    });
	
	    window.insight = insight;
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function($) {!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    "use strict";
	
	    var TraceLevel = {
	        error: 1,
	        warning: 2,
	        information: 3
	    };
	
	    var TraceCategory = {
	        regular: 1,
	        performance: 2
	    };
	
	    var traceEntries = [];
	    var listeners = $.Callbacks();
	
	    var isBroadcasting = false;
	    function broadcast() {
	        if (isBroadcasting || !listeners.has()) {
	            return;
	        }
	
	        isBroadcasting = true;
	
	        try {
	            var entry = traceEntries.shift();
	            while (entry) {
	                listeners.fire(entry);
	                entry = traceEntries.shift();
	            }
	        } finally {
	            isBroadcasting = false;
	        }
	    }
	
	    function trace(category, level, message, dataObject) {
	        var entry = {
	            category: category || TraceCategory.regular,
	            level: level || TraceLevel.information,
	            message: message,
	            data: dataObject,
	            timeStamp: Date.now()
	        };
	
	        traceEntries.push(entry);
	        broadcast();
	    }
	
	    function traceError(message, dataObject) {
	        trace(TraceCategory.regular, TraceLevel.error, message, dataObject);
	    }
	
	    function traceWarning(message, dataObject) {
	        trace(TraceCategory.regular, TraceLevel.warning, message, dataObject);
	    }
	
	    function traceInfo(message, dataObject) {
	        trace(TraceCategory.regular, TraceLevel.information, message, dataObject);
	    }
	
	    var subscribe = function (callback) {
	        listeners.add(callback);
	        window.setTimeout(broadcast);
	    };
	
	    var unsubscribe = function (callback) {
	        listeners.remove(callback);
	    };
	
	    module.exports.TraceCategory = TraceCategory;
	    module.exports.TraceLevel = TraceLevel;
	    module.exports.subscribe = subscribe;
	    module.exports.unsubscribe = unsubscribe;
	    module.exports.trace = trace;
	    module.exports.traceError = traceError;
	    module.exports.traceWarning = traceWarning;
	    module.exports.traceInfo = traceInfo;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function($) {!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    "use strict";
	
	    var pendingErrors = [];
	    var errorHandlers = $.Callbacks();
	
	    // avoid reentry
	    var isBroadcasting = false;
	    function broadcastErrors() {
	        if (isBroadcasting) {
	            return;
	        }
	
	        isBroadcasting = true;
	
	        try {
	            var errorObject = pendingErrors.shift();
	            while (errorObject) {
	                errorHandlers.fire(errorObject);
	                errorObject = pendingErrors.shift();
	            }
	        } finally {
	            isBroadcasting = false;
	        }
	    }
	
	    function handleError(errorObject) {
	        pendingErrors.push(errorObject);
	
	        if (!errorHandlers.has()) {
	            return;
	        }
	
	        broadcastErrors();
	    }
	
	    window.onerror = function (message, source, lineno, colno, error) {
	        var errorObject = {
	            isBubbled: false,
	            message: message,
	            source: source,
	            lineno: lineno,
	            colno: colno,
	            error: error
	        };
	
	        handleError(errorObject);
	    };
	
	    $(window).bind('error', function (event) {
	        var errorObject = {
	            isBubbled: true,
	            error: event.originalEvent || event
	        };
	
	        handleError(errorObject);
	    });
	
	    module.exports.subscribe = function (handler) {
	        errorHandlers.add(handler);
	        window.setTimeout(broadcastErrors);
	    };
	
	    module.exports.unsubscribe = function (handler) {
	        errorHandlers.remove(handler);
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 29:
/***/ function(module, exports) {

	// load openfeedback
	window.openFeedbackOptions = {
	    containerElementId: "openFeedbackContainer",
	    siteNameMetaName: "ms.sitename",
	    documentMetaName: "ms.assetid",
	    localeMetaName: "ms.locale"
	};

/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		return new Worker(__webpack_require__.p + "93ddffa0c72a12968ca6.worker.js");
	};

/***/ }

});
//# sourceMappingURL=67de30fbb4b7fa7ea7ac.js.map