webpackJsonp([1],{

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function($) {/**
	 * The Azure Selector component of the DOCS website.
	 * Azure Selector is a component consists of one or two dropdowns displayed inline. When all of the dropdowns has a valid
	 * value, the website will jump to the target page. If the user selects a value in one of the dropdown, the other dropdown
	 * will also populate all the available values accordign the first selected one.
	 *
	 * Dependencies:
	 *     - urijs: Find the current selected item by comparing the URLs
	 *     - docs.mainframe: Construct/Manipulate Azure DOM elements
	 */
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function(URI, mainframe) {
	    "use strict";
	
	    // I will do a unified implementation of the Azure Selector for both one-dropdown and two-dropdowns.
	    // For the single azure selector, the input HTML would like to be:
	    // <div class="op_single_selector">
	    //   <ul>
	    //     <li><a href="../a1.html">A1</a></li>
	    //     <li><a href="../a2.html">A2</a></li>
	    //     <li><a href="../a3.html">A3</a></li>
	    //   </ul>
	    // </div>
	    //
	    // For the double azure selectors, the input HTML would look like:
	    // <div class="op_multi_selector" title1="First Opt" title2="Second Opt">
	    //   <ul>
	    //     <li><a href="../c1.html">(A1 | B1)</a></li>
	    //     <li><a href="../c2.html">(A1 | B2)</a></li>
	    //     <li><a href="../c3.html">(A2 | B1)</a></li>
	    //     <li><a href="../c4.html">(A2 | B3)</a></li>
	    //     <li><a href="../c5.html">(A3 | B1)</a></li>
	    //     <li><a href="../c6.html">(A3 | B2)</a></li>
	    //     <li><a href="../c7.html">(A3 | B3)</a></li>
	    //   </ul>
	    // </div>
	
	    /**
	     * First of all, we need to generate a Dictionary of the available options. For example, the mapping table of the single azure selector should be like:
	     * {
	     *     A1: { default: "../a1.html" },
	     *     A2: { default: "../a2.html" },
	     *     A3: { default: "../a3.html" }
	     * }
	     * But the mapping table for the double azure selectors would be a little bit compilicated:
	     * {
	     *     A1: {
	     *         B1: "../c1.html",
	     *         B2: "../c2.html"
	     *     }
	     *     A2: {
	     *         B1: "../c3.html",
	     *         B3: "../c4.html"
	     *     },
	     *     A3: {
	     *         B1: "../c5.html",
	     *         B2: "../c6.html",
	     *         B3: "../c7.html"
	     *     }
	     * }
	     */
	    function generateOptionsMap(selectorDivElement, isSingleSelector) {
	        var optionsMap = {};
	        mainframe.getAzureSelectorAnchors(selectorDivElement).each(function () {
	            if ($(this) && $(this).text()) {
	                var contents = (isSingleSelector ? [$(this).text(), "default"] : $(this).text().trim().slice(1, -1).split("|"));
	                if (contents.length === 2) {
	                    var firstOption = contents[0].trim();
	                    var secondOption = contents[1].trim();
	                    var targetLink = $(this).attr("href");
	                    if (firstOption && secondOption && targetLink) {
	                        if (!optionsMap[firstOption]) {
	                            optionsMap[firstOption] = {};
	                        }
	                        optionsMap[firstOption][secondOption] = targetLink;
	                    }
	                }
	            }
	        });
	        return optionsMap;
	    }
	
	    /**
	     * Get the current selected options from the optionsMap and return a two-element tuple. For the single selector, the second option is always "default".
	     */
	    function getCurrentSelectedOptions(optionsMap, isSingleSelector) {
	        var browserUrlString = window.location.href.toLowerCase();
	        for (var mainOptionValue in optionsMap) {
	            for (var secondaryOptionValue in optionsMap[mainOptionValue]) {
	                var targetUrlString = optionsMap[mainOptionValue][secondaryOptionValue].toLowerCase();
	                if (URI(targetUrlString, browserUrlString).equals(browserUrlString)) {
	                    return [mainOptionValue, secondaryOptionValue];
	                }
	            }
	        }
	        return [null, null];
	    }
	
	    /**
	     * Next, one or two dropdowns are need to be created according to the generated optionsMap. The dropdowns are differentiate by main and secondary.
	     * The secondary dropdown's availble options will always be populated according to the main dropdown's current selection (If no item is selected, just
	     * make the secondary dropdown's availble options to empty).
	     */
	    function createDropdowns(selectorDivElement, isSingleSelector) {
	
	        function dropdownItemTemplate(key) { return [key, key]; }
	        function jumpToUrl(targetUrl) { window.location.href = targetUrl; }
	
	        var optionsMap = generateOptionsMap(selectorDivElement, isSingleSelector);
	        var selectedOptions = getCurrentSelectedOptions(optionsMap, isSingleSelector);
	
	        var container = mainframe.createAzureSelectorsContainer();
	        var firstDropdown = mainframe.createAzureSelectorDropdown(container, selectorDivElement.attr("title1"));
	        var secondDropdown = null;
	        mainframe.populateDropdownOptions(firstDropdown, optionsMap, dropdownItemTemplate);
	        firstDropdown.val(selectedOptions[0]);
	        if (!isSingleSelector) {
	            secondDropdown = mainframe.createAzureSelectorDropdown(container, selectorDivElement.attr("title2"));
	            firstDropdown.change(function () {
	                mainframe.populateDropdownOptions(secondDropdown, firstDropdown.val() ? optionsMap[firstDropdown.val()] : {}, dropdownItemTemplate);
	            });
	            secondDropdown.change(function () {
	                if (firstDropdown.val() && secondDropdown.val()) {
	                    jumpToUrl(optionsMap[firstDropdown.val()][secondDropdown.val()]);
	                }
	            });
	            firstDropdown.change();
	            secondDropdown.val(selectedOptions[1]);
	        } else {
	            firstDropdown.change(function () {
	                if (firstDropdown.val()) {
	                    jumpToUrl(optionsMap[firstDropdown.val()]["default"]);
	                }
	            });
	        }
	
	        selectorDivElement.replaceWith(container);
	    }
	
	    /**
	     * This function will convert both the Azure Single Selector as well as the Azure Double Selector HTMLs to the corresponding dropdown within the text.
	     * @returns void
	     */
	    function renderAzureSelectors() {
	        mainframe.getSingleAzureSelectors().each(function () { createDropdowns($(this), true); });
	        mainframe.getDoubleAzureSelectors().each(function () { createDropdowns($(this), false); });
	    }
	
	    return {
	        renderAzureSelectors: renderAzureSelectors
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function($) {/**
	 * The Branch Selector component of the DOCS website
	 *
	 * Dependencies:
	 *     - cookies: Read and write cookies to the website
	 *     - urijs: Parse and append query string to the current URL
	 *     - docs.mainframe: Construct/Manipulate selector DOM elements
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(6), __webpack_require__(11),  __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function(cookies, URI, utilities, mainframe) {
	    "use strict";
	
	    function isInTestEnvironment() {
	        return !!cookies.getCookie("AppServiceAuthSession");
	    }
	
	    function getAvailableBranchesAsync() {
	        try {
	            var windowUrl = URI(window.location.href);
	            var baseUrlString = URI(window.location.href).origin();
	            var apiUrlString = "/_api/branches?docPath=" + encodeURIComponent(windowUrl.pathname());
	            var apiUrl = URI(apiUrlString, baseUrlString);
	            return utilities.loadJsonFileAsync(apiUrl.toString());
	        } catch (err) {
	            return $.when(null);
	        }
	    }
	
	    /**
	     * Renders the branch selector if it is in the DEVINT or SANBOX environment.
	     * @returns {JQueryPromise} An async operation which represents the process of contructing the branch selector
	     */
	    function renderBranchSelectorAsync() {
	        if (!isInTestEnvironment()) {
	            return $.when();
	        }
	        return getAvailableBranchesAsync().done(function (branches) {
	            if (branches && branches.length) {
	                var dropdown = mainframe.createBranchSelectorDropdown(branches);
	                dropdown.change(function () {
	                    var targetBranchName = dropdown.val();
	                    if (targetBranchName) {
	                        cookies.setCookie("CONTENT_BRANCH", targetBranchName);
	                        window.location.href = URI(window.location.href).search("branch=" + targetBranchName).toString();
	                    }
	                });
	                dropdown.val(cookies.getCookie("CONTENT_BRANCH"));
	                mainframe.appendToSocialActions(dropdown);
	            }
	        });
	    }
	
	    return {
	        renderBranchSelectorAsync: renderBranchSelectorAsync
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(2, function(__webpack_require__) { /* WEBPACK VAR INJECTION */(function($script) {var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(23), __webpack_require__(24)]; (function (config, callbacks) {
	    "use strict";
	    $script([config.paths.livefyre, config.paths.opencomment], function () {
	        //commenting configurations.
	        var commentOptions = {
	            network: "microsoft-int-0.fyre.co",
	            siteId: "306034",
	            containerElementId: "comments-container",
	            documentIdMetaName: "ms.assetid",
	            sidenoteSelectors: {
	                include: "p",
	                exclude: "div.fyre-editor-editable p, div.fyre-comment p, div.button p, div.step-by-step p"
	            },
	            localeMetaName: "ms.locale",
	            theme: "docs",
	            commentCallback: function (commentsWidget) {
	                callbacks.resolve("comment-init", commentsWidget);
	            },
	            sidenoteCallback: function (sidenotesWidget) {
	                callbacks.resolve("sidenote-init", sidenotesWidget);
	            }
	        };
	
	        // load commenting widget
	        opencomment(commentOptions);
	    });
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(22)))});

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

/***/ }

});
//# sourceMappingURL=81ad448dad249b35d577.js.map