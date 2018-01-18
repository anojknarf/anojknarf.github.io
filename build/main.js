webpackJsonp([0],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_element_element_component__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rules_service__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_ruleList_service__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rule_list_rule_list_component__ = __webpack_require__(135);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FormComponent = (function () {
    function FormComponent(rulesService, ruleListService, navCtrl, navParams, alertCtrl) {
        this.rulesService = rulesService;
        this.ruleListService = ruleListService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.options = {
            displayFormat: 'MM/DD/YYYY',
            barTitleFormat: 'MMMM YYYY',
        };
        this.tab = "rule";
        this.showDropdown = false;
        this.ruleCatagories = [
            {
                name: 'Purchase',
                value: 'P'
            },
            {
                name: 'Refinance',
                value: 'R'
            },
            {
                name: 'Others',
                value: 'O'
            },
        ];
        this.ruleCatagory = JSON.stringify({
            name: 'Refinance',
            value: 'R'
        });
        this.pageTitle = "Create New Rule";
        this.helpText = "Click anywhere inside the rule area to modify the rule.";
        this.effectiveDate = new Date();
        this.expiryDate = new Date();
        this.formElems = [];
        this.ruleString = "";
        this.errorMessage = "";
        this.exceptionStack = [];
        this.ruleLogicArray = [];
        this.mode = "text";
        this.elementStack = [];
        this.ruleListPage = __WEBPACK_IMPORTED_MODULE_5__rule_list_rule_list_component__["a" /* RuleListComponent */];
    }
    FormComponent.prototype.ionViewWillLoad = function () {
        var _this = this;
        console.log(this.navParams.data);
        if (this.navParams.get('rule-name')) {
            this.pageTitle = "Edit Rule";
            this.ruleName = this.navParams.get('rule-name');
            this.ruleListService.getRule(this.ruleName).subscribe(function (rule) {
                _this.ruleDescription = rule.rule_desc;
                _this.ruleLogic = rule.rule_logic;
                _this.effectiveDate = new Date(rule.effective_date);
                _this.expiryDate = new Date(rule.expiry_date);
                _this.ruleLogicArray = rule.rule_logic_array;
                console.log("form component..", _this.ruleLogicArray);
            });
        }
    };
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.elementStack = [];
        this.rulesService.rule.subscribe(function (res) {
            if (res.elementType === 'starter') {
                _this.elementStack = [];
            }
            _this.elementStack.push(res);
            _this.constructResults();
        });
    };
    FormComponent.prototype.constructResults = function () {
        var _this = this;
        this.formElems = [];
        this.exceptionStack = [];
        this.ruleString = "";
        var resultBlockFound = false;
        this.elementStack.forEach(function (elem, indx) {
            if (elem.elementType == 'field' && !resultBlockFound) {
                var commandString = " #" + elem['value'];
                if (elem['type'] == "date") {
                    commandString = " new Date(#" + elem['value'] + ").getTime() ";
                }
                var operatorElem = _this.elementStack[indx + 1];
                var valueElem = _this.elementStack[indx + 2];
                var fieldCompareTest = _this.elementStack[indx - 2];
                var operatorCompareTest = _this.elementStack[indx - 1];
                if (!operatorElem || !valueElem ||
                    (fieldCompareTest && fieldCompareTest.elementType == 'field'
                        && operatorCompareTest && operatorCompareTest.elementType == 'operator')) {
                    return;
                }
                var value = "'" + valueElem['value'] + "' ";
                if (valueElem.elementType == 'field') {
                    value = "#" + valueElem['value'];
                }
                if (operatorElem['value'] && (operatorElem['value'] == "is" || operatorElem['value'] == "=")) {
                    commandString += " == " + value;
                }
                else if (operatorElem['value'] && operatorElem['value'] == "isNot") {
                    commandString += " != " + value;
                }
                else if (operatorElem['value'] && operatorElem['value'] == "contains") {
                    commandString += ".indexOf(" + value + ") > -1 ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == "startsWith") {
                    commandString += ".indexOf(" + value + ") == 0 ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == ">") {
                    commandString += " > " + value;
                }
                else if (operatorElem['value'] && operatorElem['value'] == "<") {
                    commandString += " < " + value;
                }
                else if (operatorElem['value'] && operatorElem['value'] == "isEqualTo") {
                    commandString += " == new Date(" + value + ").getTime() ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == "isAfter") {
                    commandString += " > new Date(" + value + ").getTime() ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == "isBefore") {
                    commandString += " < new Date(" + value + ").getTime() ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == "isAfterEqualTo") {
                    commandString += " >= new Date(" + value + ").getTime() ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == "isBeforeEqualTo") {
                    commandString += " <= new Date(" + value + ").getTime() ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == "hasNoVal") {
                    commandString += " == null ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == "hasAnyVal") {
                    commandString += " > 0 ";
                }
                if (!_this.checkIfExists(elem, _this.formElems)) {
                    _this.formElems.push(elem);
                }
                _this.ruleString += commandString;
            }
            else if (elem.elementType == 'logicalOperator' && elem['value'] != "then") {
                _this.ruleString += " " + elem['value'] + " ";
            }
            else if (elem.elementType == 'result' && elem.value == "addLoanException") {
                resultBlockFound = true;
                var exceptionMessageElem = _this.elementStack[indx + 1];
                if (!exceptionMessageElem) {
                    return;
                }
                _this.errorMessage = exceptionMessageElem['value'];
            }
            else if (elem.elementType == 'result' && elem.value == "addRuleInputParameter") {
                resultBlockFound = true;
                var exceptionElem = _this.elementStack[indx + 1];
                if (!exceptionElem) {
                    return;
                }
                _this.exceptionStack.push(exceptionElem);
            }
            else if (elem.elementType == 'paranthesis') {
                _this.ruleString += " " + elem['name'] + " ";
            }
        });
    };
    FormComponent.prototype.checkIfExists = function (obj, array) {
        var flag = false;
        array.forEach(function (elm) {
            if (elm.value == obj.value) {
                flag = true;
            }
        });
        return flag;
    };
    FormComponent.prototype.evaluateResults = function () {
        var _this = this;
        var message = "";
        var localRuleString = this.ruleString;
        this.elements.forEach(function (elementComponent) {
            var elmValObj = elementComponent.getValueObject();
            var replaceString = new RegExp(elmValObj.key, 'g');
            var replaceWith = elmValObj.value;
            localRuleString = localRuleString.replace(replaceString, replaceWith);
        });
        console.log("eval all elements", this.ruleString);
        var evalResult = eval(localRuleString);
        var exceptionListMessage = "<br><br> Attributes with exceptions are ";
        this.exceptionStack.forEach(function (elem, indx) {
            exceptionListMessage += "<br>" + elem.name;
            if (indx != (_this.exceptionStack.length - 1)) {
                exceptionListMessage += " , ";
            }
        });
        if (this.exceptionStack.length > 0) {
            this.errorMessage += exceptionListMessage;
        }
        if (!evalResult) {
            message = "No exceptions found in the test data!";
        }
        else {
            message = this.errorMessage;
        }
        console.log(message);
        var alert = this.alertCtrl.create({
            title: 'Test Results',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    FormComponent.prototype.getCleanRuleArray = function () {
        var localRuleArray = [];
        this.elementStack.map(function (elem) {
            var rule = {
                "name": elem.name,
                "elementType": elem.elementType,
                "value": elem.value
            };
            if (elem['type']) {
                rule['type'] = elem['type'];
            }
            localRuleArray.push(rule);
        });
        return localRuleArray;
    };
    FormComponent.prototype.saveRule = function () {
        console.log("Element Stack ::", this.elementStack, "Exception Stack ::", this.exceptionStack);
        var finalRule = {
            'rule_name': this.ruleName ? this.ruleName : '',
            'rule_category': this.ruleCatagory ? JSON.parse(this.ruleCatagory) : '',
            'rule_desc': this.ruleDescription ? this.ruleDescription : '',
            'rule_logic': this.ruleString,
            'rule_exception': this.errorMessage ? this.errorMessage : '',
            'effective_date': this.effectiveDate,
            'expiry_date': this.expiryDate,
            'last_modified': this.effectiveDate,
            'last_published': this.effectiveDate,
            'rule_author': 'Steve Octaviano',
            'rule_logic_array': this.getCleanRuleArray(),
        };
        console.log(JSON.stringify(finalRule, null, '\t'));
        if (this.pageTitle == "Edit Rule") {
            this.ruleListService.updateRule(finalRule);
        }
        else {
            this.ruleListService.saveRule(finalRule);
        }
    };
    FormComponent.prototype.deleteRule = function () {
        if (window.confirm("Are you sure you want to delete this rule ?")) {
            console.log('deleting rule', this.ruleName);
            this.ruleListService.deleteRule(this.ruleName);
            this.navCtrl.pop();
        }
    };
    FormComponent.prototype.changeEditorMode = function () {
        this.mode = this.mode === 'text' ? 'dropdown' : 'text';
    };
    FormComponent.prototype.getRuleJSONString = function () {
        return JSON.stringify(this.getCleanRuleArray(), null, "\t");
    };
    FormComponent.prototype.changeJSON = function (event) {
        var ruleJSON = [];
        try {
            ruleJSON = JSON.parse(event.target.textContent);
            var elementStack = this.elementStack;
            var changedIndex = elementStack.findIndex(function (e, i) {
                return e.value != ruleJSON[i].value ||
                    e.name != ruleJSON[i].name;
            });
            if (changedIndex > 0) {
            }
        }
        catch (err) {
            //console.log(err);
        }
    };
    FormComponent.prototype.stringify = function (value) {
        return JSON.stringify(value);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])(__WEBPACK_IMPORTED_MODULE_2__components_element_element_component__["a" /* ElementComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FormComponent.prototype, "elements", void 0);
    FormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'rule-form',template:/*ion-inline-start:"/Office/Rule-Editor/src/pages/form/form.component.html"*/'<div class="page-title">\n	<div>\n		<span class="title-a" [navPush]="ruleListPage">Loan Validation</span>\n		<span>&nbsp;/&nbsp;</span>\n		<span class="title-b">{{pageTitle}}</span>\n	</div>\n</div>\n<div class="rule-form">\n	<div class="tabs">\n		<div class="tab" [ngClass]="{\'highlight-tab\' : (tab == \'rule\')}" (click)="tab=\'rule\'">Rule</div>\n		<div class="tab" [ngClass]="{\'highlight-tab\' : (tab == \'testRule\')}" (click)="tab=\'testRule\'">Test Rule</div>\n		<div class="tab" [ngClass]="{\'highlight-tab\' : (tab == \'droolsFormat\')}" (click)="tab=\'droolsFormat\'">Drools Format</div>\n		<div class="tab" [ngClass]="{\'highlight-tab\' : (tab == \'jsonFormat\')}" (click)="tab=\'jsonFormat\'">JSON Format</div>\n	</div>\n	<div [ngClass]="{\'show-tab\' : (tab == \'rule\')}" class="tab-content">\n		<div class="rule-section">\n			<div class="row">\n				<div class="short-sec">\n					<div class="rule-label">Rule Name</div>\n					<input class="text-box-long rule-text-box" [(ngModel)]="ruleName">\n				</div>\n				<div class="middle-sec">\n					<div class="rule-label">Rule Category</div>\n				    <ion-select class="type-dropdown" [(ngModel)]="ruleCatagory">\n				      <ion-option *ngFor="let opt of ruleCatagories" [value]="stringify(opt)">{{opt.name}}</ion-option>\n				    </ion-select>\n				</div>\n				<div class="rule-start short-sec">\n					<div class="sec">\n						<div class="rule-label">Effective Date</div>\n						<ng-datepicker [(ngModel)]="effectiveDate" position="bottom-right" [options]="options"></ng-datepicker>\n					</div>\n					<div class="sec">\n						<div class="rule-label">Expiration Date</div>\n						<ng-datepicker [(ngModel)]="expiryDate" position="bottom-left" [options]="options"></ng-datepicker>\n					</div>\n				</div>\n			</div>\n			<div class="row">\n				<div class="large-sec">\n					<div class="rule-label">Description</div>\n					<input class="text-box-long rule-text-box" [(ngModel)]="ruleDescription">\n				</div>\n			</div>\n			<div class="rule-logic-heading">\n				<span>\n					<div class="rule-label">Rule Logic</div>\n					<div class="rule-sub-label">{{helpText}}</div>\n				</span>\n				<button class="editor-type-button" (click)="changeEditorMode()">\n					{{ mode === \'text\' ? \'dropdown\' : \'text\' }} Mode\n				</button>\n			</div>\n			<rule-editor [helpText]="helpText" [mode]="mode" [ruleLogic]="ruleLogicArray" [testRule]="true"></rule-editor>\n			<div class="rule-last-row">\n				<div class="rule-button clear disabled">Validate</div>\n				<div class="rule-end">\n					<div class="rule-button delete" [ngClass]="{\'disabled\':pageTitle == \'Create New Rule\'}" (click)="deleteRule()">Delete</div>\n					<div class="rule-button save" (click)="saveRule()">Save</div>\n				</div>\n			</div>\n		</div>\n	</div>\n	<div [ngClass]="{\'show-tab\' : (tab == \'testRule\')}"  class="tab-content">\n		<div class="rule-creator">\n			<div class="rule-label">Rule Logic</div>\n			<rule-editor [helpText]="helpText" mode=\'text\' [ruleLogic]="elementStack" [testRule]="false"></rule-editor>\n		</div>\n		<div class="rule-test">\n			<div class="rule-label">Test Rule</div>\n			<element *ngFor="let elem of formElems" [elementObject]="elem"></element>\n			<div class="rule-button test" (click)="evaluateResults()" *ngIf="formElems.length > 0" [ngClass]="{ \'disabled\': errorMessage == \'\'}">Test</div>\n		</div>\n	</div>\n	<div [ngClass]="{\'show-tab\' : (tab == \'droolsFormat\')}" class="tab-content">\n		<div class="drools-box">\n			<pre>\n1: package org.drools;\n2:\n3: rule "DU Refi Rule [EX-04001]"\n4:   when\n5:     BSLP_LoanExceptionServiceInputData(occupancyType == ""P"", numberOfUnits == 2, loanToValueRatio > 150)\n6:   then\n7:     BusinessRuleFactList facts = new BusinessRuleFactList();\n8:     facts.addFact(""Occupancy Type"", $l.getOccupancyType());\n9:     facts.addNumericFact(""Number of Units"", $l.getNumberOfUnits());\n10:    facts.addPercentageFact(""LTV Ratio"", $l.getLoanToValueRatio(), 2);\n11:    BusinessRulesList.add(""EX-04002"", false, facts.toArray());\n12: end\n			</pre>\n		</div>\n	</div>\n	<div [ngClass]="{\'show-tab\' : (tab == \'jsonFormat\')}" class="tab-content">\n			<div class="drools-box" contenteditable="true" (keydown) ="changeJSON($event)">\n				<pre>{{getRuleJSONString()}}</pre>\n			</div>\n		</div>\n</div>\n'/*ion-inline-end:"/Office/Rule-Editor/src/pages/form/form.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_rules_service__["a" /* RulesService */], __WEBPACK_IMPORTED_MODULE_4__providers_ruleList_service__["a" /* RuleListService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], FormComponent);
    return FormComponent;
}());

//# sourceMappingURL=form.component.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RulesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RulesService = (function () {
    function RulesService() {
        this.rules = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([
            {
                name: 'IF',
                elementType: 'starter',
                newline: true,
                dropDown: false,
                value: 'if'
            }
        ]);
        this.rule = this.rules.asObservable();
    }
    RulesService.prototype.changeRule = function (rule, index) {
        this.rules.next(rule);
    };
    RulesService.prototype.addRule = function (rule) {
        this.rules.next(rule);
    };
    RulesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], RulesService);
    return RulesService;
}());

//# sourceMappingURL=rules.service.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RuleListService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_rule_list__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_service_url_config__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_utils_http_service__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RuleListService = (function () {
    function RuleListService(http) {
        this.http = http;
        this.ruleList = [];
        console.log(__WEBPACK_IMPORTED_MODULE_1__assets_rule_list__["a" /* default */]);
        this.ruleList = __WEBPACK_IMPORTED_MODULE_1__assets_rule_list__["a" /* default */];
    }
    RuleListService.prototype.getAllRules = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__config_service_url_config__["a" /* Config */].RULE_LIST);
    };
    RuleListService.prototype.getRule = function (name) {
        // return this.ruleList.filter((elem) => {
        // 	if (elem['rule_name'] == name) {
        // 		return true;
        // 	}
        // 	return false;
        // })[0];
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__config_service_url_config__["a" /* Config */].GET_RULE + "/" + name);
    };
    RuleListService.prototype.updateRule = function (rule) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__config_service_url_config__["a" /* Config */].UPDATE_RULE + "/" + rule.name, rule);
    };
    RuleListService.prototype.saveRuleSubscribe = function (rule) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__config_service_url_config__["a" /* Config */].CREATE_RULE, rule);
    };
    RuleListService.prototype.saveRule = function (rule) {
        // this.ruleList.push(rule);
        this.saveRuleSubscribe(rule).subscribe(function (res) {
            console.log(res);
        });
    };
    RuleListService.prototype.deleteRule = function (name) {
        // this.ruleList = this.ruleList.filter((elem) => {
        // 	if (elem['rule_name'] == name) {
        // 		return false;
        // 	}
        // 	return true;
        // });
        this.http.delete(__WEBPACK_IMPORTED_MODULE_2__config_service_url_config__["a" /* Config */].DELETE_RULE + "/" + name).subscribe(function (res) {
            console.log(res);
        });
    };
    RuleListService.prototype.cloneRule = function (rule) {
        var newRule = JSON.parse(JSON.stringify(rule));
        newRule.rule_name = newRule.rule_name + " - Copy";
        newRule.last_published = "";
        newRule.last_modified = new Date();
        // this.ruleList.push(newRule);
        return this.saveRuleSubscribe(newRule);
    };
    RuleListService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__common_utils_http_service__["a" /* HttpService */]])
    ], RuleListService);
    return RuleListService;
}());

//# sourceMappingURL=ruleList.service.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
/* tslint:disable max-line-length*/
var Config = (function () {
    function Config() {
    }
    Config.LOGIN_URL = BASE_URL + "/login";
    Config.USER_URL = BASE_URL + "crm/v1/api/login/loginInfo";
    Config.RULE_LIST = BASE_URL + "/rule_list";
    Config.GET_RULE = BASE_URL + "/rule_list";
    Config.UPDATE_RULE = BASE_URL + "/rule_list";
    Config.DELETE_RULE = BASE_URL + "/rule_list";
    Config.CREATE_RULE = BASE_URL + "/rule_list";
    Config.DOWNLOAD_XLS = BASE_URL + "/download_file";
    return Config;
}());

//# sourceMappingURL=service-url.config.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* unused harmony export CONTENT_TYPE_FORM */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_session__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_feedback_feedback_service__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Wrapper for @angular/http
 */
var HttpService = (function () {
    function HttpService(http, session, feedbackService) {
        this.http = http;
        this.session = session;
        this.feedbackService = feedbackService;
    }
    /**
     * Performs a request with `get` http method.
     * @param url
     * @param params
     * @returns {Observable<any>}
     */
    HttpService.prototype.get = function (url, params, headers) {
        // let loader: any;
        // if (!FeedbackService.isLoaderVisible) {
        //   loader = this.feedbackService.getLoader();
        //   loader.present();
        // }
        params = this.addAccessTokenToParams(params);
        return this.intercept(this.http.get(url, this.getRequestOptions(params)));
    };
    /**
     * Performs a request with `Post` http method.
     * @param url
     * @param params
     * @returns {Observable<any>}
     */
    HttpService.prototype.post = function (url, body, headers, queryString) {
        // let loader: any;
        // if (!FeedbackService.isLoaderVisible) {
        //   loader = this.feedbackService.getLoader();
        //   loader.present();
        // }
        var authUrl = this.addAccesstokenToUrl(url);
        if (queryString) {
            authUrl = authUrl + queryString;
        }
        // Create a request option
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.intercept(this.http.post(authUrl, body, options));
    };
    /**
     * Performs a request with `Put` http method.
     * @param url
     * @param params
     * @returns {Observable<any>}
     */
    HttpService.prototype.put = function (url, body, headers, queryString) {
        // let loader: any;
        // if (!FeedbackService.isLoaderVisible) {
        //   loader = this.feedbackService.getLoader();
        //   loader.present();
        // }
        var authUrl = this.addAccesstokenToUrl(url);
        if (queryString) {
            authUrl = authUrl + queryString;
        }
        // Create a request option
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.intercept(this.http.put(authUrl, body, options));
    };
    /**
     * Performs a request with `Delete` http method.
     * @param url
     * @returns {Observable<any>}
     */
    HttpService.prototype.delete = function (url, headers, queryString) {
        // let loader: any;
        // if (!FeedbackService.isLoaderVisible) {
        //   loader = this.feedbackService.getLoader();
        //   loader.present();
        // }
        var authUrl = this.addAccesstokenToUrl(url);
        if (queryString) {
            authUrl = authUrl + queryString;
        }
        // Create a request option
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.intercept(this.http.delete(authUrl, options));
    };
    HttpService.prototype.postFile = function (url, body) {
        var authUrl = this.addAccesstokenToUrl(url);
        var opts = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({
            responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* ResponseContentType */].ArrayBuffer,
        });
        return this.http.post(authUrl, body, opts);
    };
    /**
     * To retrive accesstoken for the logged in user
     * @returns {String} accessToken
     */
    HttpService.prototype.getAccessToken = function () {
        if (this.session.get("currentUser")) {
            return this.session.get("currentUser").access_token;
        }
        return null;
    };
    /**
     * Converts the JSON object to query
     */
    HttpService.prototype.convertJsonToQueryString = function (params) {
        var reqParams = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* URLSearchParams */]();
        for (var _i = 0, _a = Object.keys(params); _i < _a.length; _i++) {
            var key = _a[_i];
            reqParams.set(key, params[key]);
        }
        return reqParams;
    };
    HttpService.prototype.getRequestOptions = function (params, headers) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]();
        options.search = this.convertJsonToQueryString(params);
        options.headers = headers;
        return options;
    };
    HttpService.prototype.onCatch = function (error, caught) {
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error);
    };
    HttpService.prototype.onSubscribeSuccess = function (response) {
        // Todo
    };
    HttpService.prototype.onSubscribeError = function (error) {
        // Todo
    };
    HttpService.prototype.onFinally = function () {
        // Todo
    };
    HttpService.prototype.addAccesstokenToUrl = function (serviceURL) {
        var accessToken = this.getAccessToken();
        // if (serviceURL && accessToken) {
        //   serviceURL += "?access_token=" + accessToken;
        // }
        return serviceURL;
    };
    HttpService.prototype.addAccessTokenToParams = function (data) {
        var computedData = {
            access_token: null,
        };
        if (data) {
            computedData = JSON.parse(JSON.stringify(data));
        }
        if (!computedData.access_token) {
            var accessToken = this.getAccessToken();
            if (accessToken) {
                computedData.access_token = accessToken;
            }
        }
        return computedData;
    };
    HttpService.prototype.intercept = function (observable) {
        var _this = this;
        return observable.map(function (response) { return response.json(); })
            .catch(this.onCatch)
            .do(function (res) {
            _this.onSubscribeSuccess(res);
        }, function (error) {
            _this.onSubscribeError(error);
        })
            .finally(function () {
            // this.checkAndCloseLoader(loader);
            _this.onFinally();
        });
    };
    HttpService.prototype.checkAndCloseLoader = function (loader) {
        if (loader) {
            loader.dismiss();
        }
    };
    HttpService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__model_session__["a" /* Session */],
            __WEBPACK_IMPORTED_MODULE_5__providers_feedback_feedback_service__["a" /* FeedbackService */]])
    ], HttpService);
    return HttpService;
}());

var CONTENT_TYPE_FORM = "Content-Type: application/x-www-form-urlencoded";
//# sourceMappingURL=http.service.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Session; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Session = (function () {
    function Session() {
        this.map = {};
        if (typeof (Storage) !== "undefined" && window.localStorage.getItem("sessionMap")) {
            this.map = JSON.parse(window.localStorage.getItem("sessionMap"));
        }
    }
    Session.prototype.set = function (key, value) {
        this.map[key] = value;
        if (typeof (Storage) !== "undefined") {
            window.localStorage.setItem("sessionMap", JSON.stringify(this.map));
        }
    };
    Session.prototype.get = function (key) {
        return this.map[key];
    };
    Session.prototype.expire = function () {
        this.map = {};
    };
    Session = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], Session);
    return Session;
}());

//# sourceMappingURL=session.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RuleListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ruleList_service__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home_component__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__form_form_component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_service_url_config__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RuleListComponent = (function () {
    function RuleListComponent(ruleListService, navCtrl) {
        this.ruleListService = ruleListService;
        this.navCtrl = navCtrl;
        this.options = {
            displayFormat: 'MM/DD/YYYY',
            barTitleFormat: 'MMMM YYYY',
        };
        this.localRuleList = [];
        this.cachedRuleList = [];
        this.showSearch = false;
        this.selectedRules = [];
        this.searchLastModDate = new Date();
        this.searchLastPubDate = new Date();
        this.homePage = __WEBPACK_IMPORTED_MODULE_3__home_home_component__["a" /* HomeComponent */];
        this.formPage = __WEBPACK_IMPORTED_MODULE_4__form_form_component__["a" /* FormComponent */];
    }
    RuleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.localRuleList = this.cachedRuleList = this.ruleListService.ruleList;
        this.ruleListService.getAllRules().subscribe(function (resp) {
            _this.localRuleList = _this.cachedRuleList = resp;
            _this.localRuleList.sort(function (a, b) {
                var compA = a["rule_name"];
                var compB = b["rule_name"];
                if (compA < compB) {
                    return -1;
                }
                else if (compA > compB) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        });
    };
    RuleListComponent.prototype.formatDate = function (date) {
        if (date) {
            var localDate = new Date(date);
            return (localDate.getMonth() + 1) + '/' + localDate.getDate() + '/' + localDate.getFullYear();
        }
        else {
            return "-";
        }
    };
    RuleListComponent.prototype.sortList = function (column, event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var direction = target.className.split(" ")[1] == 'sort-down' ? -1 : 1;
        target.classList.toggle("sort-down");
        target.classList.toggle("sort-up");
        this.localRuleList.sort(function (a, b) {
            var compA = a[column];
            var compB = b[column];
            if (column == "rule_category") {
                compA = a[column].name;
                compB = b[column].name;
            }
            if (compA < compB) {
                return -1 * direction;
            }
            else if (compA > compB) {
                return 1 * direction;
            }
            else {
                return 0;
            }
        });
    };
    RuleListComponent.prototype.searchList = function (column, event) {
        var value = event.target.value;
        this.localRuleList = this.cachedRuleList.filter(function (elem) {
            var toCheck = elem[column];
            if (column == "rule_category") {
                toCheck = elem[column].name;
            }
            if (toCheck.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    RuleListComponent.prototype.toggleCheckBox = function (event, rule) {
        var checked = event.target.checked;
        if (checked) {
            this.selectedRules.push(rule);
        }
        else {
            this.selectedRules = this.selectedRules.filter(function (elem) {
                if (elem.rule_name == rule.rule_name) {
                    return false;
                }
                return true;
            });
        }
        console.log(this.selectedRules);
    };
    RuleListComponent.prototype.deleteRules = function () {
        var _this = this;
        if (window.confirm("Are you sure you want to delete the selected rule(s) ? ")) {
            this.selectedRules.forEach(function (rule) {
                _this.ruleListService.deleteRule(rule.rule_name);
                _this.selectedRules = _this.selectedRules.filter(function (elem) {
                    if (elem.rule_name == rule.rule_name) {
                        return false;
                    }
                    return true;
                });
            });
            this.ngOnInit();
        }
    };
    RuleListComponent.prototype.cloneRules = function () {
        var _this = this;
        this.selectedRules.forEach(function (rule) {
            _this.ruleListService.cloneRule(rule).subscribe(function (res) {
                console.log(res);
                _this.ngOnInit();
                var ruleListRowElements = _this.ruleListRows.nativeElement.querySelectorAll('input');
                ruleListRowElements.forEach(function (elem) {
                    if (elem.checked) {
                        elem.click();
                    }
                });
            });
        });
    };
    RuleListComponent.prototype.tickAll = function (event) {
        var check = event.target.checked;
        var ruleListRowElements = this.ruleListRows.nativeElement.querySelectorAll('input');
        ruleListRowElements.forEach(function (elem) {
            if (elem.checked != check) {
                elem.click();
            }
        });
    };
    RuleListComponent.prototype.searchDate = function (column, date) {
        console.log('cal');
        this.localRuleList = this.cachedRuleList.filter(function (elem) {
            var toCheckFullDate = new Date(elem[column]);
            var toCheckDate = toCheckFullDate.getDate();
            var toCheckMonth = toCheckFullDate.getMonth();
            var toCheckYear = toCheckFullDate.getFullYear();
            if (toCheckDate == date.getDate() && toCheckMonth == date.getMonth() && toCheckYear == date.getFullYear()) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    RuleListComponent.prototype.openRule = function (rule) {
        this.navCtrl.push("form", { 'rule-name': rule.rule_name });
    };
    RuleListComponent.prototype.downloadUrl = function () {
        return __WEBPACK_IMPORTED_MODULE_5__config_service_url_config__["a" /* Config */].DOWNLOAD_XLS;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("ruleListRows"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], RuleListComponent.prototype, "ruleListRows", void 0);
    RuleListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'rule-list',template:/*ion-inline-start:"/Office/Rule-Editor/src/pages/rule-list/rule-list.component.html"*/'<div class="header-2">\n  <div class="header-content">\n    <div class="title-2">\n      <span class="title-a" [navPush]="homePage">Rules Project</span>\n      <span>&nbsp;/&nbsp;</span>\n      <span class="title-b">Loan Exception Rules</span>\n    </div>\n    <span class="buttons">\n      <div class="button-set">\n        <span (click)="cloneRules()" class="duplicate-button"> </span>\n        <span (click)="deleteRules()" class="delete-button"> </span>\n      </div>\n      <button class="download-button">\n        <a [href]="downloadUrl()" >Download Spreadsheet</a>\n      </button>\n      <div class="button-create">\n        <span class="plus"> + </span>\n        <span class="create-rules-project" [navPush]="formPage"> Create New Rule </span>\n      </div>\n    </span>\n  </div>\n</div>\n<div class="body">\n  <div class="table">\n    <div class="table-header-outer">\n      <span class="table-header">\n\n        <div class="col-1" >\n          <input type="checkbox" (click)="tickAll($event)">\n        </div>\n\n        <div class="col-2 sort-down" (click)="sortList(\'rule_name\', $event)">\n          Rule Name\n        </div>\n        <div class="col-3 sort-down" (click)="sortList(\'rule_category\', $event)">\n          Category\n        </div>\n        <div class="col-4 sort-down" (click)="sortList(\'rule_desc\', $event)">\n          Description\n        </div>\n        <div class="col-5 sort-down" (click)="sortList(\'last_modified\', $event)">\n          Last Modified\n        </div>\n        <div class="col-6 sort-down" (click)="sortList(\'last_published\', $event)">\n          Last Published\n        </div>\n        <div class="col-7 sort-down" (click)="sortList(\'rule_author\', $event)">\n          Last Modifier\n        </div>\n        <div class="col-8">\n          <span class="search-button" (click)="showSearch = showSearch ? false : true; localRuleList = cachedRuleList;" [ngClass]="{\'outline\' : showSearch}"></span>\n    </div>\n    </span>\n    <span *ngIf="showSearch" class="table-header">\n        <div class="col-1" >\n        </div>\n        <div class="col-2">\n          <input (keyup)="searchList(\'rule_name\',$event)" value="" type="text">\n        </div>\n        <div class="col-3">\n          <input (keyup)="searchList(\'rule_category\',$event)" value="" type="text">\n        </div>\n        <div class="col-4">\n          <input (keyup)="searchList(\'rule_desc\',$event)" value="" type="text">\n        </div>\n        <div class="col-5">\n          <ng-datepicker [(ngModel)]="searchLastModDate" (ngModelChange)="searchDate(\'last_modified\',searchLastModDate)" [options]="options" position="bottom-right"></ng-datepicker>\n        </div>\n        <div class="col-6">\n          <ng-datepicker [(ngModel)]="searchLastPubDate" [options]="options" (ngModelChange)="searchDate(\'last_published\',searchLastPubDate)" position="bottom-left"></ng-datepicker>\n        </div>\n        <div class="col-7">\n          <input (keyup)="searchList(\'rule_author\',$event)" value="" type="text">\n        </div>\n        <div class="col-8">\n        </div>\n      </span>\n  </div>\n  <div class="table-rows" #ruleListRows>\n    <div *ngFor="let rule of localRuleList" class="table-row" >\n      <div class="col-1">\n        <input type="checkbox" (change)="toggleCheckBox($event, rule)">\n      </div>\n      <div class="col-2" (click)="openRule(rule)">\n        DU Refi Rule [{{rule.rule_name}}]\n      </div>\n      <div class="col-3" (click)="openRule(rule)">\n        {{rule.rule_category.name}}\n      </div>\n      <div class="col-4" title="{{rule.rule_desc}}" (click)="openRule(rule)">\n        {{rule.rule_desc}}\n      </div>\n      <div class="col-5" [navPush]="formPage" (click)="openRule(rule)">\n        {{formatDate(rule.last_modified)}}\n      </div>\n      <div class="col-6" [navPush]="formPage" (click)="openRule(rule)">\n        {{formatDate(rule.last_published)}}\n      </div>\n      <div class="col-7" [navPush]="formPage" (click)="openRule(rule)">\n        {{rule.rule_author}}\n      </div>\n      <div class="col-8" [navPush]="formPage" (click)="openRule(rule)">\n      </div>\n    </div>\n  </div>\n</div>\n</div>'/*ion-inline-end:"/Office/Rule-Editor/src/pages/rule-list/rule-list.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_ruleList_service__["a" /* RuleListService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], RuleListComponent);
    return RuleListComponent;
}());

//# sourceMappingURL=rule-list.component.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(navCtrl) {
        this.navCtrl = navCtrl;
        this.localProjectList = [
            {
                "id": "1",
                "name": "Loan Exception Rules",
                "last_modified": "2017-11-11T17:36:43.704Z",
                "last_published": "2017-11-05T17:36:43.704Z",
                "project_desc": "Contains loan exception rules",
                "project_author": "Steve Octaviano"
            },
            {
                "id": "2",
                "name": "Pricing Rules",
                "last_modified": "2018-01-03T17:36:43.704Z",
                "last_published": "2018-01-05T17:36:43.704Z",
                "project_desc": "Contains pricing rules",
                "project_author": "Supree Periasamy"
            }
        ];
        this.addNew = false;
        this.addNewTitle = "Create Rules Project";
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.deleteRow = function (id) {
        if (window.confirm("Are you sure you want to delete the selected project ? (All associated rules will also be deleted) ")) {
            this.localProjectList = this.localProjectList.filter(function (elem) {
                if (elem.id == id) {
                    return false;
                }
                return true;
            });
        }
    };
    HomeComponent.prototype.formatDate = function (date) {
        if (date) {
            var localDate = new Date(date);
            return (localDate.getMonth() + 1) + '/' + localDate.getDate() + '/' + localDate.getFullYear();
        }
        else {
            return "-";
        }
    };
    HomeComponent.prototype.toggleAddNewProject = function () {
        this.projName.nativeElement.value = "";
        this.projDesc.nativeElement.value = "";
        this.addNewTitle = "Create Rules Project";
        this.addNew = this.addNew ? false : true;
    };
    HomeComponent.prototype.saveNewProject = function () {
        if (!this.projName.nativeElement.value || !this.projDesc.nativeElement.value) {
            alert('Project name and/or Project Description is empty !');
            return;
        }
        var project = {
            "id": Math.ceil(Math.random() * 100),
            "name": this.projName.nativeElement.value,
            "project_desc": this.projDesc.nativeElement.value,
            "last_modified": new Date(),
            "last_published": new Date(),
            "project_author": "Steve Octaviano"
        };
        this.localProjectList.push(project);
        this.toggleAddNewProject();
    };
    HomeComponent.prototype.editProj = function (project) {
        this.toggleAddNewProject();
        this.addNewTitle = "Edit Rules Project";
        this.projName.nativeElement.value = project.name;
        this.projDesc.nativeElement.value = project.project_desc;
    };
    HomeComponent.prototype.openProject = function (project) {
        this.navCtrl.push("rule-list", {
            id: project.id
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('projName'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], HomeComponent.prototype, "projName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('projDesc'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], HomeComponent.prototype, "projDesc", void 0);
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'home',template:/*ion-inline-start:"/Office/Rule-Editor/src/pages/home/home.component.html"*/'<div class="header-2">\n  <div class="header-content">\n    <div class="title-2">\n      Rules Project\n    </div>\n    <div class="button-create" (click)="toggleAddNewProject()" >\n        <span class="plus"> + </span>\n        <span class="create-rules-project"> Create Rules Project </span>\n    </div>\n  </div>\n</div>\n<div class="body">\n  <div class="table">\n\n    <div class="table-header">\n      <div class="col-1">\n        Project Name\n      </div>\n      <div class="col-2">\n        Last Modified\n      </div>\n      <div class="col-3">\n        Last Published\n      </div>\n      <div class="col-4">\n        Last Modifier\n      </div>\n      <div class="col-5">\n      </div>\n    </div>\n\n\n    <div class="table-row" *ngFor="let project of localProjectList">\n      <div class="col-1" (click)="openProject(project)">\n        {{project.name}}\n      </div>\n      <div class="col-2" (click)="openProject(project)">\n        {{formatDate(project.last_modified)}}\n      </div>\n      <div class="col-3" (click)="openProject(project)">\n        {{formatDate(project.last_published)}}\n      </div>\n      <div class="col-4" (click)="openProject(project)">\n        {{project.project_author}}\n      </div>\n      <div class="col-5">\n        <span class="edit-button" (click)="editProj(project)"></span>\n        <span class="delete-button" (click)="deleteRow(project.id)">\n        </span>\n      </div>\n    </div>\n\n\n  </div>\n</div>\n<div class="add-project" [ngClass]="{\'show\' : addNew }">\n  <div class="new-header">{{addNewTitle}}</div>\n  <div class="row-line first-line">\n    <div class="label">Project Name</div>\n    <input type="text" #projName value="" name="projectName">\n  </div>\n  <div class="row-line">\n    <div class="label">Project Description</div>\n    <input type="text" #projDesc value="" name="projectDesc">\n  </div>\n  <div class="last-row">\n    <div class="button cancel" (click)="toggleAddNewProject()">Cancel</div>\n    <div class="button save" (click)="saveNewProject()">Save</div>\n  </div>\n</div>\n<div class="overlay" [ngClass]="{\'show\' : addNew }"></div>\n'/*ion-inline-end:"/Office/Rule-Editor/src/pages/home/home.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], HomeComponent);
    return HomeComponent;
}());

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(138);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginPage = (function () {
    function LoginPage(nav, auth, alertCtrl, platform, menuCtrl, keyboard) {
        this.nav = nav;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.menuCtrl = menuCtrl;
        this.keyboard = keyboard;
        this.credentials = { username: "", password: "" };
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.auth.login(this.credentials).subscribe(function (allowed) {
            if (allowed) {
                _this.nav.setRoot("home");
            }
        });
    };
    LoginPage.prototype.isLargeScreen = function () {
        if ((this.platform.is("core") || this.platform.is("ipad") || this.platform.is("tablet"))
            && (this.platform.isLandscape())) {
            return true;
        }
        return false;
    };
    LoginPage.prototype.getAppVersion = function () {
        if (BUILD_NUMBER === "<BUILD_NUMBER>") {
            return BUILD_VERSION;
        }
        else {
            return BUILD_VERSION + "-" + BUILD_NUMBER;
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-login",template:/*ion-inline-start:"/Office/Rule-Editor/src/pages/login/login.component.html"*/'<ion-scroll direction="x" scrollbar-y="true">\n  <div class="login-item">\n    <form (ngSubmit)="login()" #registerForm="ngForm">\n      <ion-card>\n        <ion-card-header>\n          <!-- <div class="logo-box">\n          </div> -->\n        </ion-card-header>\n        <ion-card-content>\n          <input required id="username" type="text" autocomplete="off" autocapitalize="off" placeholder="User ID" name="username" [(ngModel)]="credentials.username"\n            class="row" />\n          <input required id="password" type="password" placeholder="Password" name="password"\n          [(ngModel)]="credentials.password" class="row"/>\n          <button id="submit" ion-button block type="submit" [disabled]="!registerForm.form.valid" class="row space">Login</button>\n        </ion-card-content>\n      </ion-card>\n    </form>\n  </div>\n</ion-scroll>\n<ion-footer *ngIf="!keyboard.isOpen()">\n  <!-- <label class="row build-version">{{ \'Build Version : \' + getAppVersion() }}</label> -->\n</ion-footer>\n'/*ion-inline-end:"/Office/Rule-Editor/src/pages/login/login.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Keyboard */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_model_session__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_utils_http_service__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_service_url_config__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_feedback_exception_service__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_feedback_feedback_messages__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_feedback_feedback_service__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AuthService = (function () {
    function AuthService(http, session, exception, feedback) {
        this.http = http;
        this.session = session;
        this.exception = exception;
        this.feedback = feedback;
        this.currentUserInfo = {};
        this.loginUrl = __WEBPACK_IMPORTED_MODULE_6__config_service_url_config__["a" /* Config */].LOGIN_URL;
        this.authentication = false;
        if (typeof (Storage) !== "undefined" && window.localStorage.getItem("currentUser")) {
            this.authentication = true;
            this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
            this.currentUserInfo = JSON.parse(window.localStorage.getItem("currentUserInfo"));
        }
    }
    AuthService.prototype.login = function (credentials) {
        if (credentials.username === null || credentials.password === null) {
            return this.exception
                .handleErrorResponseAsAlert("Login Error", __WEBPACK_IMPORTED_MODULE_8__providers_feedback_feedback_messages__["a" /* FeedbackMessage */].INSERT_CREDENTIALS);
        }
        return this.process(credentials);
    };
    AuthService.prototype.register = function (credentials) {
        if (credentials.username === null || credentials.password === null) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            // At this point store the credentials to your backend!
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
                observer.next(true);
                observer.complete();
            });
        }
    };
    AuthService.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthService.prototype.getUserName = function () {
        return this.currentUser.username;
    };
    AuthService.prototype.getUserId = function () {
        return this.currentUserInfo.userId;
    };
    AuthService.prototype.getUserFullName = function () {
        return this.currentUserInfo.fullName;
    };
    AuthService.prototype.logout = function () {
        this.session.expire();
        this.session.set("currentUser", null);
        this.currentUser = null;
        this.authentication = false;
        this.clearLocalStorage();
    };
    AuthService.prototype.process = function (credentials) {
        var _this = this;
        var loader = this.feedback.getLoader();
        loader.present();
        return this.http.post(this.loginUrl, credentials)
            .map(function (response) {
            if (response) {
                _this.session.set("currentUser", response);
                _this.currentUser = response;
                _this.authentication = true;
                // this.getAuthUser();
                _this.setLocalStorageUser();
            }
            return _this.authentication;
        })
            .catch(function (err) {
            return _this.exception
                .handleErrorResponseAsAlert(err, __WEBPACK_IMPORTED_MODULE_8__providers_feedback_feedback_messages__["a" /* FeedbackMessage */].LOGIN_ERROR);
        })
            .finally(function () {
            loader.dismiss();
        });
    };
    AuthService.prototype.setLocalStorageUser = function () {
        if (typeof (Storage) !== "undefined") {
            window.localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
        }
    };
    AuthService.prototype.setLocalStorageUserInfo = function () {
        if (typeof (Storage) !== "undefined") {
            window.localStorage.setItem("currentUserInfo", JSON.stringify(this.currentUserInfo));
        }
    };
    AuthService.prototype.clearLocalStorage = function () {
        if (typeof (Storage) !== "undefined") {
            window.localStorage.clear();
        }
    };
    // tslint:disable-next-line:member-ordering
    AuthService.prototype.getAuthUser = function () {
        var _this = this;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_6__config_service_url_config__["a" /* Config */].USER_URL).subscribe(function (response) {
            _this.currentUserInfo = response;
            _this.setLocalStorageUserInfo();
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__common_utils_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_4__common_model_session__["a" /* Session */],
            __WEBPACK_IMPORTED_MODULE_7__providers_feedback_exception_service__["a" /* ExceptionService */],
            __WEBPACK_IMPORTED_MODULE_9__providers_feedback_feedback_service__["a" /* FeedbackService */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 173;

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/form/form.component.module": [
		219
	],
	"../pages/home/home.component.module": [
		321
	],
	"../pages/login/login.component.module": [
		322
	],
	"../pages/rule-list/rule-list.component.module": [
		324
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 218;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormComponentModule", function() { return FormComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_editor_editor_component__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_element_element_component__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_datepicker__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_datepicker__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var FormComponentModule = (function () {
    function FormComponentModule() {
    }
    FormComponentModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__form_component__["a" /* FormComponent */],
                __WEBPACK_IMPORTED_MODULE_3__components_editor_editor_component__["a" /* EditorComponent */],
                __WEBPACK_IMPORTED_MODULE_4__components_element_element_component__["a" /* ElementComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__form_component__["a" /* FormComponent */]),
                __WEBPACK_IMPORTED_MODULE_5_ng2_datepicker__["NgDatepickerModule"],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__form_component__["a" /* FormComponent */],
            ],
        })
    ], FormComponentModule);
    return FormComponentModule;
}());

//# sourceMappingURL=form.component.module.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ElementComponent = (function () {
    function ElementComponent() {
        this.showDropdown = false;
        this.selectedValue = "";
    }
    ElementComponent.prototype.ngOnInit = function () {
        this.selectedValue = this.elementObject.type === 'options' ? this.elementObject.options[0] : '';
    };
    ElementComponent.prototype.getValueObject = function () {
        var key = "#" + this.elementObject['value'];
        var value = this.selectedValue;
        if (typeof (this.selectedValue) == "object") {
            value = value['value'];
        }
        return { 'key': key, 'value': "'" + value + "'" };
    };
    ElementComponent.prototype.numberRestrict = function (evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault)
                theEvent.preventDefault();
        }
    };
    ElementComponent.prototype.suppress = function () {
        // console.trace('click element event');
        // Dummy method to supress clicks and stop its propogation
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ElementComponent.prototype, "elementObject", void 0);
    ElementComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'element',template:/*ion-inline-start:"/Office/Rule-Editor/src/components/element/element.component.html"*/'<div class="element-container">\n	<div class="element-label">{{elementObject.name}}</div>\n	<ion-select *ngIf="elementObject.type == \'options\'" class="element-value type-dropdown" [(ngModel)]="selectedValue">\n    	<ion-option *ngFor="let opt of elementObject.options" [value]="opt">{{opt.name}}</ion-option>\n  	</ion-select>\n	<input *ngIf="elementObject.type == \'number\'" (click)="suppress()" (keypress)=\'numberRestrict(event)\' [(ngModel)]="selectedValue" class="element-value type-number">\n	<input *ngIf="elementObject.type == \'string\'" (click)="suppress()" [(ngModel)]="selectedValue" class="element-value">\n	<input *ngIf="elementObject.type == \'date\'" type="date" (click)="suppress()" [(ngModel)]="selectedValue" class="element-value">\n</div>'/*ion-inline-end:"/Office/Rule-Editor/src/components/element/element.component.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ElementComponent);
    return ElementComponent;
}());

//# sourceMappingURL=element.component.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FieldsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FieldsService = (function () {
    function FieldsService() {
        this.fields = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([
            {
                "name": "Amortization Term Months",
                "value": "amortizationTermMonths",
                "type": "options",
                "elementType": "field",
                "options": [
                    {
                        "name": "Fixed Rate",
                        "value": "F"
                    },
                    {
                        "name": "Adjustable Rate",
                        "value": "A"
                    }
                ]
            },
            {
                "name": "Amortization Type",
                "value": "amortizationType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Annual MIP Pct",
                "value": "annualMIPPct",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Anticipated Settlement Date",
                "value": "anticipatedSettlementDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Applicant Data",
                "value": "applicantData",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Application Date",
                "value": "applicationDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Appraisal Date",
                "value": "appraisalDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Appraisal Document Id",
                "value": "appraisalDocumentId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Appraisal Fieldwork Type",
                "value": "appraisalFieldworkType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Appraisal Valuation Method Type",
                "value": "appraisalValuationMethodType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Appraisal Verification Effective Date",
                "value": "appraisalVerificationEffectiveDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Appraisal Verification Expiration Date",
                "value": "appraisalVerificationExpirationDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "ARM Lifetime Cap Pct",
                "value": "armLifetimeCapPct",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "ARM Margin",
                "value": "armMargin",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "ARM Plan Id",
                "value": "armPlanId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Asset Verification Effective Date",
                "value": "assetVerificationEffectiveDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Asset Verification Expiration Date",
                "value": "assetVerificationExpirationDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "AUS Case File Id",
                "value": "ausCaseFileId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "AUS Result Code",
                "value": "ausResultCode",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "AUS Type",
                "value": "ausType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Balloon Term Months",
                "value": "balloonTermMonths",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Bankruptcy Age In Years",
                "value": "bankruptcyAgeInYears",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Bankruptcy Date",
                "value": "bankruptcyDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Base Combined Loan To Value Ratio",
                "value": "baseCombinedLoanToValueRatio",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Base High Credit Loan To Value Ratio",
                "value": "baseHighCreditLoanToValueRatio",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Base Loan To Value Ratio",
                "value": "baseLoanToValueRatio",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Birth Date",
                "value": "birthDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Bond Authority Type",
                "value": "bondAuthorityType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Bond Program Type",
                "value": "bondProgramType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Borrower Role",
                "value": "borrowerRole",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Broker Compensation Pct",
                "value": "brokerCompensationPct",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Broker Id",
                "value": "brokerId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Broker NMLS Id",
                "value": "brokerNmlsId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Broker Pricing Tier",
                "value": "brokerPricingTier",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Building Status Type",
                "value": "buildingStatusType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Building Type",
                "value": "buildingType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Cash Out Amount",
                "value": "cashOutAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Channel Type",
                "value": "channelType",
                "type": "options",
                "elementType": "field",
                "options": [
                    {
                        "name": "Retail",
                        "value": "R"
                    },
                    {
                        "name": "Wholesale",
                        "value": "W"
                    }
                ]
            },
            {
                "name": "Citizenship Type",
                "value": "citizenshipType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Combined Loan To Value Ratio",
                "value": "combinedLoanToValueRatio",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Conforming Loan Limit Amount",
                "value": "conformingLoanLimitAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Correspondent Id",
                "value": "correspondentId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Correspondent NMLS Id",
                "value": "correspondentNmlsId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Correspondent Pricing Tier",
                "value": "correspondentPricingTier",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Counseling Agency Id",
                "value": "counselingAgencyId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Counseling Agency Name",
                "value": "counselingAgencyName",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "County FIPS Code",
                "value": "countyFIPSCode",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Credit Report Type",
                "value": "creditReportType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Credit Score",
                "value": "creditScore",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Credit Verification Effective Date",
                "value": "creditVerificationEffectiveDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Credit Verification Expiration Date",
                "value": "creditVerificationExpirationDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Current Date",
                "value": "currentDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Debt To Income Ratio",
                "value": "debtToIncomeRatio",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Deed In Lieu Age In Years",
                "value": "deedInLieuAgeInYears",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Deed In Lieu Date",
                "value": "deedInLieuDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Documentation Type",
                "value": "documentationType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Downpayment Pct",
                "value": "downpaymentPct",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "DU Result Code",
                "value": "duResultCode",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Employer Name",
                "value": "employerName",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Employment Data",
                "value": "employmentData",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Employment Type",
                "value": "employmentType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Employment Verification Effective Date",
                "value": "employmentVerificationEffectiveDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Employment Verification Expiration Date",
                "value": "employmentVerificationExpirationDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Escrow For Completion HUD Consultant Name",
                "value": "escrowForCompletionHUDConsultantName",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Estate Holding Type",
                "value": "estateHoldingType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Ethnicity",
                "value": "ethnicity",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Existing Subordinate Financing Amount",
                "value": "existingSubordinateFinancingAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Existing Subordinate HELOC Amount",
                "value": "existingSubordinateHELOCAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Existing Subordinate HELOC Max Credit Amount",
                "value": "existingSubordinateHELOCMaxCreditAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "FHA Case Number Assignment Date",
                "value": "fhaCaseNumberAssignmentDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "FHA Prior Loan Endorsement Date",
                "value": "fhaPriorLoanEndorsementDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "FHA Section Of Act",
                "value": "FHASectionOfAct",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Financed Properties Count",
                "value": "financedPropertiesCount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "First ARM Adjustment Decrease Cap Pct",
                "value": "firstARMAdjustmentDecreaseCapPct",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "First ARM Adjustment Increase Cap Pct",
                "value": "firstARMAdjustmentIncreaseCapPct",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "First ARM Adjustment Payment Number",
                "value": "firstARMAdjustmentPaymentNumber",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "First Name",
                "value": "firstName",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Flood Certificate Verification Effective Date",
                "value": "floodCertificateVerificationEffectiveDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Flood Certificate Verification Expiration Date",
                "value": "floodCertificateVerificationExpirationDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Foreclosure Age In Years",
                "value": "foreclosureAgeInYears",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Foreclosure Date",
                "value": "foreclosureDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Gender",
                "value": "gender",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Guidelines Id",
                "value": "guidelinesId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Guidelines Version",
                "value": "guidelinesVersion",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Guidelines Version Date",
                "value": "guidelinesVersionDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "High Credit Loan To Value Ratio",
                "value": "highCreditLoanToValueRatio",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Housing Expense Ratio",
                "value": "housingExpenseRatio",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Income",
                "value": "income",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Income Verification Effective Date",
                "value": "incomeVerificationEffectiveDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Income Verification Expiration Date",
                "value": "incomeVerificationExpirationDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Initial Closing Disclosure Delivery Date",
                "value": "initialClosingDisclosureDeliveryDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Initial Closing Disclosure Receipt Date",
                "value": "initialClosingDisclosureReceiptDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Initial Loan Estimate Delivery Date",
                "value": "initialLoanEstimateDeliveryDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Initial Loan Estimate Receipt Date",
                "value": "initialLoanEstimateReceiptDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Interest Only Term Months",
                "value": "interestOnlyTermMonths",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Interest Rate",
                "value": "interestRate",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Interviewer Name",
                "value": "interviewerName",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Investor",
                "value": "investor",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Investor Id",
                "value": "investorId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Adverse Modification Applicable",
                "value": "adverseModificationApplicable",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Alimony Child Support Obligated",
                "value": "alimonyChildSupportObligated",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Asset Depletion Income Used",
                "value": "assetDepletionIncomeUsed",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Assumable Product",
                "value": "assumableProduct",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Bankruptcy Applicable",
                "value": "bankruptcyApplicable",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Cash Out Refinance",
                "value": "cashOutRefinance",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Citizen",
                "value": "citizen",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Closed End Loan",
                "value": "closedEndLoan",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Condominium Property",
                "value": "condominiumProperty",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Coop Property",
                "value": "coopProperty",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Correspondent Channel",
                "value": "correspondentChannel",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Declining Balance Renewals",
                "value": "decliningBalanceRenewals",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Deed In Lieu Applicable",
                "value": "deedInLieuApplicable",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Delegated Underwriting",
                "value": "delegatedUnderwriting",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is DU Refi Plus Loan",
                "value": "duRefiPlusLoan",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Escrows Waived",
                "value": "escrowsWaived",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Fee Buy Out",
                "value": "feeBuyOut",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is First Time Home Buyer",
                "value": "firstTimeHomeBuyer",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Foreclosure Applicable",
                "value": "foreclosureApplicable",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Full Eligibility",
                "value": "fullEligibility",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Hoepa Applicable",
                "value": "hoepaApplicable",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Home Equity Loan",
                "value": "homeEquityLoan",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Home Ready Loan",
                "value": "homeReadyLoan",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Home Style Renovation Loan",
                "value": "homeStyleRenovationLoan",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is In House Loan",
                "value": "inHouseLoan",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is In House Servicing",
                "value": "inHouseServicing",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Initialized",
                "value": "initialized",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Insurance Escrows Waived",
                "value": "insuranceEscrowsWaived",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Lender Paid Mortgage Insurance",
                "value": "lenderPaidMortgageInsurance",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Limited Cash Out Refinance",
                "value": "limitedCashOutRefinance",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Manual Underwriting",
                "value": "manualUnderwriting",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Manufactured Home Property",
                "value": "manufacturedHomeProperty",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Modification Applicable",
                "value": "modificationApplicable",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Mortgage Insurance Premium Financed",
                "value": "mortgageInsurancePremiumFinanced",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is My Community Mortgage Loan",
                "value": "myCommunityMortgageLoan",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is New Construction Property",
                "value": "newConstructionProperty",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Non Occupant Borrower",
                "value": "nonOccupantBorrower",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Non Warrantable Project",
                "value": "nonWarrantableProject",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Partial Term Buydown",
                "value": "partialTermBuydown",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Permanent Resident Alien",
                "value": "permanentResidentAlien",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is PMI Attributes Initialized",
                "value": "pmiAttributesInitialized",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Prepayment Penalty",
                "value": "prepaymentPenalty",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Primary Borrower",
                "value": "primaryBorrower",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Primary Employment Indicated",
                "value": "primaryEmploymentIndicated",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Property Fully Occupied",
                "value": "propertyFullyOccupied",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Property Inspection Waiver",
                "value": "propertyInspectionWaiver",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is PUD",
                "value": "pud",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Quote Service Call",
                "value": "quoteServiceCall",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Rate Lock Expired",
                "value": "rateLockExpired",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Rate Lock Pending",
                "value": "rateLockPending",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Rate Locked",
                "value": "rateLocked",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Recent Home Owner",
                "value": "recentHomeOwner",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Refundable Premium",
                "value": "refundablePremium",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Retail Channel",
                "value": "retailChannel",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Self Employed",
                "value": "selfEmployed",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Self Employed",
                "value": "selfEmployed",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Short Sale Applicable",
                "value": "shortSaleApplicable",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Single Premium Mortgage Insurance",
                "value": "singlePremiumMortgageInsurance",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Streamline Refi Program",
                "value": "streamlineRefiProgram",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Tax Escrows Waived",
                "value": "taxEscrowsWaived",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is VA Entitlement Used",
                "value": "vaEntitlementUsed",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is VA Funding Fee Exempt",
                "value": "vaFundingFeeExempt",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is VA Prior Use Manufactured Home",
                "value": "vaPriorUseManufacturedHome",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Is Wholesale Channel",
                "value": "wholesaleChannel",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Last Name",
                "value": "lastName",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Lead Campaign Type Id",
                "value": "leadCampaignTypeId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Lead Source Type Id",
                "value": "leadSourceTypeId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Lead Type Id",
                "value": "leadTypeId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Lender Id",
                "value": "lenderId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Lender NMLS Id",
                "value": "lenderNmlsId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Lien Position",
                "value": "lienPosition",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Lien Type",
                "value": "lienType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Lien Type",
                "value": "lienType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Loan Amount",
                "value": "loanAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Loan Closed Date",
                "value": "loanClosedDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Loan Eligibility Date",
                "value": "loanEligibilityDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Loan Exception Type Id",
                "value": "loanExceptionTypeId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Loan Funding Date",
                "value": "loanFundingDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Loan Note Date",
                "value": "loanNoteDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Loan Number",
                "value": "loanNumber",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Loan Product Type",
                "value": "loanProductType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Loan Program Type",
                "value": "loanProgramType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Loan Prospector Key Identifier",
                "value": "loanProspectorKeyIdentifier",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Loan Purpose Type",
                "value": "loanPurposeType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Loan Status Level",
                "value": "loanStatusLevel",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Loan Status Type",
                "value": "loanStatusType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Loan Submitted From Correspondent Portal Date",
                "value": "loanSubmittedFromCorrespondentPortalDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Loan To Value Ratio",
                "value": "loanToValueRatio",
                "type": "number",
                "elementType": "field"
            },
            {
                "name": "Lot Size",
                "value": "lotSize",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Marital Status",
                "value": "maritalStatus",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Maximum Credit Line Amount",
                "value": "maximumCreditLineAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Maximum Days To Complete Repairs",
                "value": "maximumDaysToCompleteRepairs",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Maximum Loan Limit Amount",
                "value": "maximumLoanLimitAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Maximum Months To Complete Repairs",
                "value": "maximumMonthsToCompleteRepairs",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Military Duty Type",
                "value": "militaryDutyType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Modification Age In Years",
                "value": "modificationAgeInYears",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Modification Date",
                "value": "modificationDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Months Reserves",
                "value": "monthsReserves",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Mortgage Insurance Certificate Verification Effective Date",
                "value": "mortgageInsuranceCertificateVerificationEffectiveDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Mortgage Insurance Certificate Verification Expiration Date",
                "value": "mortgageInsuranceCertificateVerificationExpirationDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Mortgage Insurance Financed Amount",
                "value": "mortgageInsuranceFinancedAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Mortgage Late 30 Past 12 Months",
                "value": "mortgageLate30past12Months",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Mortgage Late 30 Past 24 Months",
                "value": "mortgageLate30past24Months",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Mortgage Late 30 Past 36 Months",
                "value": "mortgageLate30past36Months",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Mortgage Late 60 Past 12 Months",
                "value": "mortgageLate60past12Months",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Mortgage Late 60 Past 24 Months",
                "value": "mortgageLate60past24Months",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Mortgage Late 60 Past 36 Months",
                "value": "mortgageLate60past36Months",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Mortgage Late 90 Past 12 Months",
                "value": "mortgageLate90past12Months",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Mortgage Late 90 Past 24 Months",
                "value": "mortgageLate90past24Months",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Mortgage Late 90 Past 36 Months",
                "value": "mortgageLate90past36Months",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Mortgage Type",
                "value": "mortgageType",
                "type": "options",
                "elementType": "field",
                "options": [
                    {
                        "name": "Conventional",
                        "value": "C"
                    },
                    {
                        "name": "FHA",
                        "value": "F"
                    },
                    {
                        "name": "USDA/Rural Housing Service",
                        "value": "U"
                    },
                    {
                        "name": "VA",
                        "value": "V"
                    }
                ]
            },
            {
                "name": "Number Of Units",
                "value": "numberOfUnits",
                "type": "number",
                "elementType": "field"
            },
            {
                "name": "Occupancy Type",
                "value": "occupancyType",
                "type": "options",
                "elementType": "field",
                "options": [
                    {
                        "name": "Purchase",
                        "value": "p"
                    },
                    {
                        "name": "Refinance",
                        "value": "R"
                    }
                ]
            },
            {
                "name": "Originator NMLS Id",
                "value": "originatorNmlsId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Payment Rounding Type",
                "value": "paymentRoundingType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "PMI Coverage Percent",
                "value": "pmiCoveragePercent",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "PMI Plan Type",
                "value": "pmiPlanType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "PMI Type",
                "value": "pmiType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Present Address City",
                "value": "presentAddressCity",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Present Address Line One",
                "value": "presentAddressLineOne",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Present Address Line Two",
                "value": "presentAddressLineTwo",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Present Address Postal Code",
                "value": "presentAddressPostalCode",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Present Address State",
                "value": "presentAddressState",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Present Address Status",
                "value": "presentAddressStatus",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Price",
                "value": "price",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Pricing Date",
                "value": "pricingDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Pricing Tier",
                "value": "pricingTier",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Product Pricing Template",
                "value": "productPricingTemplate",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Project Classification Type",
                "value": "projectClassificationType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Property Acquisition Cost",
                "value": "propertyAcquisitionCost",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Property Acquisition Date",
                "value": "propertyAcquisitionDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Property City",
                "value": "propertyCity",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Property Debt To Income Ratio",
                "value": "propertyDebtToIncomeRatio",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Property Ownership Age In Months",
                "value": "propertyOwnershipAgeInMonths",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Property Postal Code",
                "value": "propertyPostalCode",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Property Rehabilitation Costs",
                "value": "propertyRehabilitationCosts",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Property State",
                "value": "propertyState",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Property Type",
                "value": "propertyType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Property Value Amount",
                "value": "propertyValueAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Purchase Price Amount",
                "value": "purchasePriceAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Qualified Mortgage Type",
                "value": "qualifiedMortgageType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Race",
                "value": "race",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Rate Lock Data",
                "value": "rateLockData",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Rate Lock Date",
                "value": "rateLockDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Rate Lock Days",
                "value": "rateLockDays",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Rate Lock Expiration Date",
                "value": "rateLockExpirationDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Rate Lock Option Type",
                "value": "rateLockOptionType",
                "type": "options",
                "elementType": "field",
                "options": [
                    {
                        "name": "Floating",
                        "value": "F"
                    },
                    {
                        "name": "15 Day Rate Lock",
                        "value": "15"
                    },
                    {
                        "name": "30 Day Rate Lock",
                        "value": "30"
                    },
                    {
                        "name": "45 Day Rate Lock",
                        "value": "45"
                    },
                    {
                        "name": "60 Day Rate Lock",
                        "value": "60"
                    },
                    {
                        "name": "90 Day Rate Lock",
                        "value": "90"
                    }
                ]
            },
            {
                "name": "Rate Lock Status",
                "value": "rateLockStatus",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Refi Loan Data",
                "value": "refiLoanData",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Refinance Amount",
                "value": "refinanceAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Refinance Purpose Type",
                "value": "refinancePurposeType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Refinance Type",
                "value": "refinanceType",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Relock Date",
                "value": "relockDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Required Months Reserves",
                "value": "requiredMonthsReserves",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Revised Closing Disclosure Delivery Date",
                "value": "revisedClosingDisclosureDeliveryDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Revised Closing Disclosure Receipt Date",
                "value": "revisedClosingDisclosureReceiptDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Revised Loan Estimate Delivery Date",
                "value": "revisedLoanEstimateDeliveryDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Revised Loan Estimate Receipt Date",
                "value": "revisedLoanEstimateReceiptDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Rule Group Name",
                "value": "ruleGroupName",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Sales Branch Id",
                "value": "salesBranchId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Scheduled Closing Date",
                "value": "scheduledClosingDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Second ARM Adjustment Decrease Cap Pct",
                "value": "secondARMAdjustmentDecreaseCapPct",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Second ARM Adjustment Increase Cap Pct",
                "value": "secondARMAdjustmentIncreaseCapPct",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Second ARM Adjustment Payment Number",
                "value": "secondARMAdjustmentPaymentNumber",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Short Sale Age In Years",
                "value": "shortSaleAgeInYears",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Short Sale Date",
                "value": "shortSaleDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Special Features",
                "value": "specialFeatures",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Square Footage",
                "value": "squareFootage",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "State FIPS Code",
                "value": "stateFIPSCode",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Subordinate Credit Line Amount",
                "value": "subordinateCreditLineAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Subordinate Financing Amount",
                "value": "subordinateFinancingAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "System Type Id",
                "value": "systemTypeId",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Tax Id Number",
                "value": "taxIdNumber",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Title Verification Effective Date",
                "value": "titleVerificationEffectiveDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Title Verification Expiration Date",
                "value": "titleVerificationExpirationDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Total Combined Loan To Value Ratio",
                "value": "totalCombinedLoanToValueRatio",
                "type": "number",
                "elementType": "field"
            },
            {
                "name": "Total Cost Of Repairs",
                "value": "totalCostOfRepairs",
                "type": "number",
                "elementType": "field"
            },
            {
                "name": "Total High Credit Loan To Value Ratio",
                "value": "totalHighCreditLoanToValueRatio",
                "type": "number",
                "elementType": "field"
            },
            {
                "name": "Total Loan To Value Ratio",
                "value": "totalLoanToValueRatio",
                "type": "number",
                "elementType": "field"
            },
            {
                "name": "Up Front MIP Pct",
                "value": "upFrontMIPPct",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Usda Case Number Assignment Date",
                "value": "usdaCaseNumberAssignmentDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "VA Case Number Assignment Date",
                "value": "vaCaseNumberAssignmentDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "VA Guarantee Available Amount",
                "value": "VAGuaranteeAvailableAmount",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Verification Document Date",
                "value": "verificationDocumentDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Verification Document Exp Date",
                "value": "verificationDocumentExpDate",
                "type": "date",
                "elementType": "field"
            },
            {
                "name": "Year Built",
                "value": "yearBuilt",
                "type": "string",
                "elementType": "field"
            }
        ]);
        this.field = this.fields.asObservable();
    }
    FieldsService.prototype.changeField = function (field) {
        this.fields.next(field);
    };
    FieldsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], FieldsService);
    return FieldsService;
}());

//# sourceMappingURL=fields.service.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogicalOperatorsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LogicalOperatorsService = (function () {
    function LogicalOperatorsService() {
        this.logicalOperators = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]({
            'AND': {
                name: 'and',
                value: '&&',
            },
            'OR': {
                name: 'or',
                value: '||',
            },
            'THEN': {
                name: 'then',
                value: 'then',
            },
        });
        this.logicalOperator = this.logicalOperators.asObservable();
    }
    LogicalOperatorsService.prototype.changeOperator = function (logicalOperator) {
        this.logicalOperators.next(logicalOperator);
    };
    LogicalOperatorsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], LogicalOperatorsService);
    return LogicalOperatorsService;
}());

//# sourceMappingURL=logical.service.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OperatorsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OperatorsService = (function () {
    function OperatorsService() {
        this.operators = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]({
            'number': [
                {
                    name: 'is equal to',
                    value: '=',
                },
                {
                    name: 'is equal to',
                    value: '!=',
                },
                {
                    name: 'is greater than',
                    value: '>',
                },
                {
                    name: 'is lesser than',
                    value: '<',
                },
                {
                    name: 'is greater than or equal to',
                    value: '>=',
                },
                {
                    name: 'is lesser than or equal to',
                    value: '<=',
                },
            ],
            'string': [
                {
                    name: 'contains',
                    value: 'contains',
                },
                {
                    name: 'does not contain',
                    value: 'doesNotContain',
                },
                {
                    name: 'starts with',
                    value: 'startsWith',
                },
                {
                    name: 'does not start with',
                    value: 'doesNotStartWith',
                },
                {
                    name: 'ends with',
                    value: 'endsWith',
                },
                {
                    name: 'does not end with',
                    value: 'doesNotEndWith',
                },
                {
                    name: 'is',
                    value: 'is',
                },
                {
                    name: 'is not',
                    value: 'isNot',
                },
            ],
            'options': [
                {
                    name: 'is',
                    value: 'is',
                },
                {
                    name: 'is not',
                    value: 'isNot',
                },
            ],
            'date': [
                {
                    name: 'is equal to',
                    value: 'isEqualTo',
                },
                {
                    name: 'is not equal to',
                    value: 'isNotEqualTo',
                },
                {
                    name: 'is after',
                    value: 'isAfter',
                },
                {
                    name: 'is after or equal to',
                    value: 'isAfterEqualTo',
                },
                {
                    name: 'is before',
                    value: 'isBefore',
                },
                {
                    name: 'is before or equal to',
                    value: 'isBeforeEqualTo',
                },
                {
                    name: 'has no value',
                    value: 'hasNoVal',
                },
                {
                    name: 'has any value',
                    value: 'hasAnyVal',
                },
            ],
        });
        this.operator = this.operators.asObservable();
    }
    OperatorsService.prototype.changeOperator = function (operator) {
        this.operators.next(operator);
    };
    OperatorsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], OperatorsService);
    return OperatorsService;
}());

//# sourceMappingURL=operators.service.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ResultsService = (function () {
    function ResultsService() {
        this.results = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([
            {
                name: 'Add Loan Exception',
                value: 'addLoanException',
                elementType: 'result',
            },
            {
                name: 'Add Rule Input Parameter',
                value: 'addRuleInputParameter',
                elementType: 'result',
            },
        ]);
        this.result = this.results.asObservable();
    }
    ResultsService.prototype.changeResult = function (result) {
        this.results.next(result);
    };
    ResultsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], ResultsService);
    return ResultsService;
}());

//# sourceMappingURL=result.service.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponentModule", function() { return HomeComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_component__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomeComponentModule = (function () {
    function HomeComponentModule() {
    }
    HomeComponentModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home_component__["a" /* HomeComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home_component__["a" /* HomeComponent */]),
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__home_component__["a" /* HomeComponent */],
            ],
        })
    ], HomeComponentModule);
    return HomeComponentModule;
}());

//# sourceMappingURL=home.component.module.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_component__ = __webpack_require__(137);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login_component__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login_component__["a" /* LoginPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__login_component__["a" /* LoginPage */],
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.component.module.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExceptionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feedback_service__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Service class to handle all the exceptions
 */
var ExceptionService = (function () {
    function ExceptionService(feedback) {
        this.feedback = feedback;
    }
    /**
     * Converts the error response to string and logs it to the console
     * Shows the toast with the corresponding ErrorMessage
     */
    ExceptionService.prototype.handleErrorResponse = function (errorResponse, errorMessage) {
        return this.handleErrorResponseAsToast(errorResponse, errorMessage);
    };
    /**
     * Converts the error response to string and logs it to the console
     * Shows the toast with the corresponding ErrorMessage
     */
    ExceptionService.prototype.handleErrorResponseAsToast = function (errorResponse, errorMessage) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].of(errorResponse).map(function (data) {
            var res = errorResponse;
            var emsg = res ? JSON.stringify(res) : "unknown error";
            // console.debug("Error Occurred", emsg);
            _this.feedback.showToast(errorMessage.toString());
        });
    };
    /**
     * Converts the error response to string and logs it to the console
     * Shows the toast with the corresponding ErrorMessage
     */
    ExceptionService.prototype.handleErrorResponseAsAlert = function (errorResponse, errorMessage) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].of(errorResponse).map(function (data) {
            var res = errorResponse;
            var emsg = res ? JSON.stringify(res) : "unknown error";
            // console.debug("Error Occurred", emsg);
            _this.feedback.showError(errorMessage.toString());
        });
    };
    /**
     * Converts the error response to string and logs it to the console
     * Shows the toast with the corresponding ErrorMessage
     * Saves the error response in the server side
     */
    ExceptionService.prototype.handleErrorResponseAndSave = function (errorResponse, errorMessage) {
        this.log(errorResponse);
        return this.handleErrorResponseAsToast(errorResponse, errorMessage);
    };
    ExceptionService.prototype.log = function (error) {
        // Todo add logic to log the errors in the server side
    };
    ExceptionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__feedback_service__["a" /* FeedbackService */]])
    ], ExceptionService);
    return ExceptionService;
}());

//# sourceMappingURL=exception.service.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuleListComponentModule", function() { return RuleListComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rule_list_component__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_datepicker__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_datepicker__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var RuleListComponentModule = (function () {
    function RuleListComponentModule() {
    }
    RuleListComponentModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__rule_list_component__["a" /* RuleListComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__rule_list_component__["a" /* RuleListComponent */]),
                __WEBPACK_IMPORTED_MODULE_3_ng2_datepicker__["NgDatepickerModule"],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__rule_list_component__["a" /* RuleListComponent */],
            ],
        })
    ], RuleListComponentModule);
    return RuleListComponentModule;
}());

//# sourceMappingURL=rule-list.component.module.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(373);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home_component__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_rule_list_rule_list_component__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_form_form_component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login_component_module__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home_component_module__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_rule_list_rule_list_component_module__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_form_form_component_module__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__common_model_session__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__common_utils_http_service__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_feedback_exception_service__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_feedback_feedback_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_auth_service__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_fields_service__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_operators_service__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_logical_service__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_rules_service__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_result_service__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_ruleList_service__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login_component_module__["LoginPageModule"],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home_component_module__["HomeComponentModule"],
                __WEBPACK_IMPORTED_MODULE_13__pages_rule_list_rule_list_component_module__["RuleListComponentModule"],
                __WEBPACK_IMPORTED_MODULE_14__pages_form_form_component_module__["FormComponentModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/form/form.component.module#FormComponentModule', name: 'form', segment: 'form/:rule-name', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.component.module#HomeComponentModule', name: 'home', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.component.module#LoginPageModule', name: 'LoginPage', segment: 'login.component', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rule-list/rule-list.component.module#RuleListComponentModule', name: 'rule-list', segment: 'rule-list', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login_component__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_9__pages_rule_list_rule_list_component__["a" /* RuleListComponent */],
                __WEBPACK_IMPORTED_MODULE_10__pages_form_form_component__["a" /* FormComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_15__common_model_session__["a" /* Session */],
                __WEBPACK_IMPORTED_MODULE_16__common_utils_http_service__["a" /* HttpService */],
                __WEBPACK_IMPORTED_MODULE_17__providers_feedback_exception_service__["a" /* ExceptionService */],
                __WEBPACK_IMPORTED_MODULE_18__providers_feedback_feedback_service__["a" /* FeedbackService */],
                __WEBPACK_IMPORTED_MODULE_19__providers_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_20__providers_fields_service__["a" /* FieldsService */],
                __WEBPACK_IMPORTED_MODULE_21__providers_operators_service__["a" /* OperatorsService */],
                __WEBPACK_IMPORTED_MODULE_22__providers_logical_service__["a" /* LogicalOperatorsService */],
                __WEBPACK_IMPORTED_MODULE_23__providers_rules_service__["a" /* RulesService */],
                __WEBPACK_IMPORTED_MODULE_24__providers_result_service__["a" /* ResultsService */],
                __WEBPACK_IMPORTED_MODULE_25__providers_ruleList_service__["a" /* RuleListService */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var data = [
    {
        "rule_name": "EX-04001",
        "rule_category": { "name": "Refinance", "value": "R" },
        "rule_desc": "The maximum LTV is 150% for a DU Refi Plus single family primary residence.",
        "rule_logic": "occupancyType = 'p' AND numberOfUnits = 1 AND loanToValueRatio > 150",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04002",
        "rule_category": { "name": "Purchase", "value": "P" },
        "rule_desc": "The maximum LTV is 150% for a DU Refi Plus two family primary residence.",
        "rule_logic": "occupancyType = 'p' AND numberOfUnits = 2 AND loanToValueRatio > 150",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-12-25T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04003",
        "rule_category": { "name": "Refinance", "value": "R" },
        "rule_desc": "The maximum LTV is 150% for a DU Refi Plus three family primary residence.",
        "rule_logic": "occupancyType = 'p' AND numberOfUnits = 3 AND loanToValueRatio > 150",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-12-25T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04004",
        "rule_category": { "name": "Refinance", "value": "R" },
        "rule_desc": "The maximum LTV is 150% for a DU Refi Plus four family primary residence.",
        "rule_logic": "occupancyType = 'p' AND numberOfUnits = 4 AND loanToValueRatio > 150",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04005",
        "rule_category": { "name": "Purchase", "value": "P" },
        "rule_desc": "The maximum LTV is 150% for a DU Refi Plus single family second home.",
        "rule_logic": "occupancyType = 's' AND numberOfUnits = 1 AND loanToValueRatio > 150",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04006",
        "rule_category": { "name": "Refinance", "value": "R" },
        "rule_desc": "The maximum LTV is 125% for a DU Refi Plus single family investment property.",
        "rule_logic": "occupancyType = 'I' AND numberOfUnits = 1 AND loanToValueRatio > 125",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04007",
        "rule_category": { "name": "Refinance", "value": "R" },
        "rule_desc": "The maximum LTV is 125% for a DU Refi Plus two family investment property.",
        "rule_logic": "occupancyType = 'I' AND numberOfUnits = 2 AND loanToValueRatio > 125",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04008",
        "rule_category": { "name": "Refinance", "value": "R" },
        "rule_desc": "The maximum LTV is 125% for a DU Refi Plus three family investment property.",
        "rule_logic": "occupancyType = 'I' AND numberOfUnits = 3 AND loanToValueRatio > 125",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04009",
        "rule_category": { "name": "Purchase", "value": "P" },
        "rule_desc": "The maximum LTV is 125% for a DU Refi Plus four family investment property.",
        "rule_logic": "occupancyType = 'I' AND numberOfUnits = 4 AND loanToValueRatio > 125",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04010",
        "rule_category": { "name": "Other", "value": "O" },
        "rule_desc": "The maximum loan amount for a conforming, single family loan has been exceeded.",
        "rule_logic": "pricingTier = 'CONF' AND numberOfUnits = 1 AND propertyState NOT IN ('AK', 'HI') AND totalLoanAmount > conformingLoanLimitAmount",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04011",
        "rule_category": { "name": "Other", "value": "O" },
        "rule_desc": "The maximum loan amount for a conforming, two family loan has been exceeded.",
        "rule_logic": "pricingTier = 'CONF' AND numberOfUnits = 2 AND propertyState NOT IN ('AK', 'HI') AND totalLoanAmount > conformingLoanLimitAmount",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04012",
        "rule_category": { "name": "Other", "value": "O" },
        "rule_desc": "The maximum loan amount for a conforming, three family loan has been exceeded.",
        "rule_logic": "pricingTier = 'CONF' AND numberOfUnits = 3 AND propertyState NOT IN ('AK', 'HI') AND totalLoanAmount > conformingLoanLimitAmount",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04013",
        "rule_category": { "name": "Other", "value": "O" },
        "rule_desc": "The maximum loan amount for a conforming, four family loan has been exceeded.",
        "rule_logic": "pricingTier = 'CONF' AND numberOfUnits = 4 AND propertyState NOT IN ('AK', 'HI') AND totalLoanAmount > conformingLoanLimitAmount",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04014",
        "rule_category": { "name": "Refinance", "value": "R" },
        "rule_desc": "The maximum loan amount for a conforming, single family loan has been exceeded.",
        "rule_logic": "pricingTier = 'CONF' AND numberOfUnits = 1 AND propertyState IN ('AK', 'HI') AND totalLoanAmount > conformingLoanLimitAmount",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04015",
        "rule_category": { "name": "Refinance", "value": "R" },
        "rule_desc": "The maximum loan amount for a conforming, two family loan has been exceeded.",
        "rule_logic": "pricingTier = 'CONF' AND numberOfUnits = 2 AND propertyState IN ('AK', 'HI') AND totalLoanAmount > conformingLoanLimitAmount",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04016",
        "rule_category": { "name": "Refinance", "value": "R" },
        "rule_desc": "The maximum loan amount for a conforming, three family loan has been exceeded.",
        "rule_logic": "pricingTier = 'CONF' AND numberOfUnits = 3 AND propertyState IN ('AK', 'HI') AND totalLoanAmount > conformingLoanLimitAmount",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04017",
        "rule_category": { "name": "Refinance", "value": "R" },
        "rule_desc": "The maximum loan amount for a conforming, four family loan has been exceeded.",
        "rule_logic": "pricingTier = 'CONF' AND numberOfUnits = 4 AND propertyState IN ('AK', 'HI') AND totalLoanAmount > conformingLoanLimitAmount",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04018",
        "rule_category": { "name": "Refinance", "value": "R" },
        "rule_desc": "The maximum loan amount for a high balance, single family loan has been exceeded.",
        "rule_logic": "pricingTier <> 'CONF' AND numberOfUnits = 1 AND propertyState NOT IN ('AK', 'HI') AND maximumLoanLimitAmount > conformingLoanLimitAmount AND totalLoanAmount > maximumLoanLimitAmount",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04019",
        "rule_category": { "name": "Purchase", "value": "P" },
        "rule_desc": "The maximum loan amount for a high balance, two family loan has been exceeded.",
        "rule_logic": "pricingTier <> 'CONF' AND numberOfUnits = 2 AND propertyState NOT IN ('AK', 'HI') AND maximumLoanLimitAmount > conformingLoanLimitAmount AND totalLoanAmount > maximumLoanLimitAmount",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    },
    {
        "rule_name": "EX-04020",
        "rule_category": { "name": "Other", "value": "O" },
        "rule_desc": "The maximum loan amount for a high balance, three family loan has been exceeded.",
        "rule_logic": "pricingTier <> 'CONF' AND numberOfUnits = 3 AND propertyState NOT IN ('AK', 'HI') AND maximumLoanLimitAmount > conformingLoanLimitAmount AND totalLoanAmount > maximumLoanLimitAmount",
        "rule_exception": "Loan cannot be processed",
        "effective_date": "2017-12-25T17:36:43.704Z",
        "last_modified": "2017-11-11T17:36:43.704Z",
        "last_published": "2017-11-05T17:36:43.704Z",
        "expiry_date": "2017-12-25T17:36:43.704Z",
        "rule_author": "Steve Octaviano",
        "rule_logic_array": [{ "name": "IF", "elementType": "starter", "value": "if" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "is", "elementType": "operator", "value": "is" }, { "name": "Purchase", "elementType": "value", "value": "p" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "is equal to", "elementType": "operator", "value": "=" }, { "name": "Enter a number", "elementType": "value", "value": "1" }, { "name": "and", "elementType": "logicalOperator", "value": "&&" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }, { "name": "is greater than", "elementType": "operator", "value": ">" }, { "name": "Enter a number", "elementType": "value", "value": "150" }, { "name": "then", "elementType": "logicalOperator", "value": "then" }, { "name": "Add Loan Exception", "elementType": "result", "value": "addLoanException" }, { "name": "Enter a number", "elementType": "value", "value": "the maximum ltv is 150% for DU Refi Plus Single family primary residency" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Occupancy Type", "elementType": "field", "value": "occupancyType", "type": "options" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Number Of Units", "elementType": "field", "value": "numberOfUnits", "type": "number" }, { "name": "Add Rule Input Parameter", "elementType": "result", "value": "addRuleInputParameter" }, { "name": "Loan To Value Ratio", "elementType": "field", "value": "loanToValueRatio", "type": "number" }]
    }
];
/* harmony default export */ __webpack_exports__["a"] = (data);
//# sourceMappingURL=rule_list.js.map

/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_fields_service__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_logical_service__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_operators_service__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_result_service__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rules_service__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EditorComponent = (function () {
    function EditorComponent(fieldsService, logicalOperatorsService, operatorsService, rulesService, resultsService) {
        this.fieldsService = fieldsService;
        this.logicalOperatorsService = logicalOperatorsService;
        this.operatorsService = operatorsService;
        this.rulesService = rulesService;
        this.resultsService = resultsService;
        this.ruleLogic = [];
        this.mode = 'text';
        this.ruleEditMode = false;
        this.fields = [];
        this.logicalOperators = [];
        this.operators = [];
        this.values = [];
        this.results = [];
        this.dropDownTypes = [
            'fields',
            'operators',
            'values',
            'logicalOperators',
            'results',
        ];
        this.dropDownType = 0;
        this.dropDown = [];
        this.fieldsLogic = {
            name: '',
            elementType: 'field',
            value: '',
        };
        this.operatorsLogic = {
            name: '',
            elementType: 'operator',
            value: '',
        };
        this.valuesLogic = {
            name: '',
            elementType: 'value',
            value: '',
        };
        this.logicalOperatorsLogic = {
            name: '',
            elementType: 'logicalOperator',
            value: '',
        };
        this.resultsLogic = {
            name: '',
            elementType: 'result',
            value: '',
        };
        this.inputFieldsLogic = {
            name: '',
            elementType: 'inputField',
            value: '',
        };
        this.messagesLogic = {
            name: '',
            elementType: 'value',
            value: '',
        };
        this.currentFieldSelected = { type: '', options: [] };
        this.currentText = "";
        this.dropDownSelectedIndex = -1;
        this.customMode = false;
        this.customString = '';
        this.resultMode = false;
        this.currentResult = { value: '' };
        this.inputParameters = [];
        this.openParanthesis = 0;
        this.dropDownIndex = 0;
        this.deletedElements = [];
    }
    EditorComponent.prototype.clickedOutside = function ($event) {
        this.exitEditingMode($event);
    };
    EditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fieldsService.field.subscribe(function (res) {
            _this.fields = res; //.slice();
        });
        this.logicalOperatorsService.logicalOperator.subscribe(function (res) {
            _this.logicalOperators = res; //.slice();
        });
        this.operatorsService.operator.subscribe(function (res) {
            _this.operators = res; //.slice();
        });
        this.resultsService.result.subscribe(function (res) {
            _this.results = res.slice();
        });
        // console .log(this.helpText);
        this.ruleLogic = this.ruleLogic.length ? this.ruleLogic : [
            {
                name: 'IF',
                elementType: 'starter',
                value: 'if',
            },
        ];
        if (this.ruleLogic.length > 1) {
            this.ruleLogic = this.addOptionsToRules(this.ruleLogic);
            this.addRulesToObservable(this.ruleLogic);
        }
    };
    EditorComponent.prototype.ngOnChanges = function (changes) {
        if (changes && changes.ruleLogic && changes.ruleLogic.currentValue) {
            this.ruleLogic = this.addOptionsToRules(this.ruleLogic);
            this.addRulesToObservable(this.ruleLogic);
        }
    };
    EditorComponent.prototype.addOptionsToRules = function (ruleLogic) {
        var fields = this.fields;
        return ruleLogic.map(function (rule) {
            if (rule.elementType === 'field' && rule.type === 'options') {
                var field = fields.find(function (f) {
                    return f.value === rule.value;
                });
                rule.options = field.options;
            }
            return rule;
        });
    };
    EditorComponent.prototype.addRuleToObservable = function (rule) {
        // this.rulesService.addRule(rule);
    };
    EditorComponent.prototype.addRulesToObservable = function (rules) {
        var _this = this;
        if (!this.testRule) {
            return;
        }
        rules.forEach(function (rule) {
            _this.rulesService.addRule(rule);
        });
    };
    EditorComponent.prototype.isNewLineRequired = function (logic) {
        if ((logic.elementType === 'logicalOperator' && logic.value != 'then') || logic.elementType === 'starter') {
            return true;
        }
        else {
            return false;
        }
    };
    EditorComponent.prototype.enterEditingMode = function (event) {
        if (!this.testRule) {
            return;
        }
        var element = event.srcElement;
        if (!this.ruleEditMode) {
            this.ruleEditMode = true;
            if (this.ruleLogic.length === 0) {
                this.ruleLogic.push({
                    name: 'IF',
                    elementType: 'starter',
                    value: 'if',
                });
            }
            if (!this.customMode) {
                this.setDropdown({ code: '' });
            }
        }
        // $event.preventDefault();
        event.stopPropagation();
    };
    EditorComponent.prototype.setCurrentElement = function () {
        var ruleElements = [].slice.call(this.ruleEditor.nativeElement.children[0].children);
        var element = ruleElements[this.dropDownIndex];
        this.currentElement = element;
    };
    EditorComponent.prototype.exitEditingMode = function (event) {
        this.ruleEditMode = false;
        var lastLogic = this.ruleLogic[this.ruleLogic.length - 1];
        this.ruleLogic = this.ruleLogic.filter(function (r) { return r.name.length || r.value.length; });
        if (!(lastLogic.name.length && lastLogic.value.length)) {
            this.ruleLogic.push(lastLogic);
        }
        this.addRulesToObservable(this.ruleLogic);
    };
    EditorComponent.prototype.setNextDropDownType = function (result, exception, input) {
        if (result === void 0) { result = false; }
        if (exception === void 0) { exception = false; }
        if (input === void 0) { input = false; }
        this.dropDownType++;
        if (!result && this.dropDownType >= this.dropDownTypes.length - 1 || this.dropDownType < 0) {
            this.dropDownType = 0;
        }
        if (result && this.dropDownType >= this.dropDownTypes.length) {
            this.dropDownType = 0;
        }
        // if (exception || input ) {
        //   this.dropDownType = 1;
        // }
    };
    EditorComponent.prototype.emptyDropDown = function () {
        this.dropDown = [];
    };
    EditorComponent.prototype.rightArrow = function () {
        if (this.dropDownIndex < this.ruleLogic.length - 1) {
            this.dropDownIndex++;
            this.setCurrentElement();
            this.setDropDownPosOnEdit(this.currentElement);
            this.pushDropDownElements(this.dropDownIndex);
        }
    };
    EditorComponent.prototype.leftArrow = function () {
        // .log('leftArrow', this.dropDownIndex);
        if (this.dropDownIndex > 0) {
            this.dropDownIndex--;
            this.setCurrentElement();
            this.setDropDownPosOnEdit(this.currentElement);
            this.pushDropDownElements(this.dropDownIndex);
        }
    };
    EditorComponent.prototype.backspace = function (event) {
        event.preventDefault();
        if (this.ruleLogic[this.ruleLogic.length - 1].customMode
            || this.ruleLogic[this.dropDownIndex].customMode) {
            this.setCustomString(this.customString.substring(0, this.customString.length - 1));
            return;
        }
        if (this.currentText.length) {
            this.setCurrentText(this.currentText.substring(0, this.currentText.length - 1));
            this.filterDropDown(this.currentText, true);
            return;
        }
        this.deleteRuleBlock(this.ruleLogic[this.dropDownIndex], this.dropDownIndex, this.ruleLogic);
    };
    EditorComponent.prototype.deleteRuleBlock = function (ruleElement, index, ruleLogic) {
        var elementType = ruleElement.elementType;
        var deleteStartIndex = 0;
        var deleteEndIndex = 0;
        var noOfElementsToDelete = 0;
        if (elementType === 'field' || elementType === 'value') {
            elementType = (ruleLogic[index - 1].elementType === 'result')
                ? 'result-param'
                : elementType;
        }
        switch (elementType) {
            case 'value':
                deleteStartIndex = index - 2;
                deleteEndIndex = index + 1;
                noOfElementsToDelete = 4;
                break;
            case 'field':
                deleteStartIndex = index;
                deleteEndIndex = index + 3;
                noOfElementsToDelete = 4;
                break;
            case 'operator':
                deleteStartIndex = index - 2;
                deleteEndIndex = index + 1;
                noOfElementsToDelete = 4;
                break;
            case 'logicalOperator':
                deleteStartIndex = index - 3;
                deleteEndIndex = index;
                noOfElementsToDelete = 4;
                break;
            case 'result':
                deleteStartIndex = index;
                deleteEndIndex = index + 1;
                noOfElementsToDelete = 2;
                break;
            case 'result-param':
                deleteStartIndex = index - 1;
                deleteEndIndex = index;
                noOfElementsToDelete = 2;
                break;
        }
        var deletedElements = this.ruleLogic.splice(deleteStartIndex, noOfElementsToDelete);
        this.deletedElements.push({ elementsDeleted: deletedElements, index: deleteStartIndex });
        this.setDropdown({ code: '' }, true);
    };
    EditorComponent.prototype.undoDelete = function () {
        if (this.deletedElements.length) {
            var deletedElement = this.deletedElements.pop();
            (_a = this.ruleLogic).splice.apply(_a, [deletedElement.index, 0].concat(deletedElement.elementsDeleted));
        }
        this.setDropdown({ code: '' }, true);
        var _a;
    };
    EditorComponent.prototype.setDropdown = function (event, empty) {
        var _this = this;
        if (empty === void 0) { empty = false; }
        var code = event.code;
        var key = event.key;
        if (empty) {
            this.emptyDropDown();
        }
        if (event.preventDefault) {
            event.preventDefault();
        }
        switch (code) {
            case '':
                this.pushLogic();
                this.pushDropDownElements();
                break;
            case 'Space':
                if (!this.customMode) {
                    // this.dropDownSelectedIndex = 0;
                    // this.enter();
                    this.setCurrentText(this.currentText + key);
                    this.filterDropDown(this.currentText);
                }
                if (this.ruleLogic[this.ruleLogic.length - 1].customMode) {
                    this.setCustomString(this.customString + key);
                }
                break;
            case 'Backslash':
                this.setCurrentText(this.currentText.substr(0, this.currentText.length - 2));
                this.filterDropDown(this.currentText);
                break;
            case 'Enter':
                if (this.customMode) {
                    this.exitCustomMode();
                    this.setCustomValueInRule(this.customString);
                }
                else {
                    this.dropDownSelectedIndex = 0;
                    this.enter();
                }
                break;
            default:
                if (this.ruleLogic[this.dropDownIndex].customMode) {
                    this.setCustomString(this.customString + key);
                    return;
                }
                this.setCurrentText(this.currentText + key);
                this.filterDropDown(this.currentText);
                break;
        }
        var base = this;
        setTimeout(function () {
            if (_this.mode != 'dropdown') {
                base.setDropDownPos(base);
            }
        }, 20);
    };
    EditorComponent.prototype.setEndOfContenteditable = function (event) {
        var contentEditableElement = event.srcElement;
        var range, selection;
        if (document.createRange) {
            range = document.createRange();
            range.selectNodeContents(contentEditableElement);
            range.collapse(false);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
    EditorComponent.prototype.filterDropDown = function (text, backspace) {
        var dropDown = this.filterList(this.dropDown, text);
        this.dropDown = dropDown;
        if (backspace) {
            this.pushDropDownElements();
            var dropDown_1 = this.filterList(this.dropDown, text);
            this.dropDown = dropDown_1;
        }
        if (dropDown.length < 1) {
            this.emptyCurrentText();
            this.pushDropDownElements();
        }
    };
    EditorComponent.prototype.filterList = function (list, text) {
        return list.filter(function (l) {
            return l.name.toUpperCase().startsWith(text.toUpperCase());
        });
    };
    EditorComponent.prototype.pushLogic = function () {
        this.dropDownIndex++;
        if (this.dropDownIndex > this.ruleLogic.length) {
            this.dropDownIndex = this.ruleLogic.length - 1;
        }
        if (this.mode != 'dropdown') {
            this.setCurrentElement();
        }
        var logic = this.ruleLogic[this.dropDownIndex]
            ? this.ruleLogic[this.dropDownIndex]
            : this[this.dropDownTypes[this.dropDownType] + 'Logic'];
        var dropDownType = logic.elementType + 's';
        this.ruleLogic.push(this[dropDownType + 'Logic']);
    };
    EditorComponent.prototype.getStringFields = function () {
        return this.fields.filter(function (f) {
            return f.type === 'string';
        });
    };
    EditorComponent.prototype.getNumberFields = function () {
        return this.fields.filter(function (f) {
            return f.type === 'number';
        });
    };
    EditorComponent.prototype.getDateFields = function () {
        return this.fields.filter(function (f) {
            return f.type === 'date';
        });
    };
    EditorComponent.prototype.pushDropDownElements = function (dropDownIndex) {
        this.emptyDropDown();
        var logic = this.ruleLogic[this.dropDownIndex] ? this.ruleLogic[this.dropDownIndex] : this[this.dropDownTypes[this.dropDownType] + 'Logic'];
        var dropDownType = logic.elementType + 's';
        // let dropDownType = this.dropDownTypes[this.dropDownType];
        if (this.ruleLogic[dropDownIndex] === undefined) {
            // console .log('undefiend rule logic')
        }
        if (dropDownIndex != undefined) {
            dropDownType = this.ruleLogic[dropDownIndex].elementType + 's';
        }
        if (this['get' + dropDownType] === undefined) {
            return;
        }
        var dropDownElements = this['get' + dropDownType]();
        if (dropDownType === 'fields') {
            this.dropDown.push(this.getOpenParanthesis());
        }
        else if (dropDownType === 'logicalOperators' && this.openParanthesis > 0) {
            this.dropDown.push(this.getCloseParanthesis());
        }
        (_a = this.dropDown).push.apply(_a, dropDownElements);
        var _a;
    };
    EditorComponent.prototype.getOpenParanthesis = function () {
        return {
            name: '(',
            value: 'OPEN_PARANTHESIS',
            elementType: 'paranthesis',
        };
    };
    EditorComponent.prototype.getCloseParanthesis = function () {
        return {
            name: ')',
            value: 'CLOSE_PARANTHESIS',
            elementType: 'paranthesis',
        };
    };
    EditorComponent.prototype.getfields = function () {
        return this.fields;
    };
    EditorComponent.prototype.getlogicalOperators = function () {
        var _this = this;
        return Object.keys(this.logicalOperators).map(function (k) {
            return _this.logicalOperators[k];
        });
    };
    EditorComponent.prototype.getoperators = function () {
        var fieldType = this.currentFieldSelected.type;
        if (this.dropDownIndex < this.ruleLogic.length - 1 && this.ruleLogic[this.dropDownIndex - 1] != undefined) {
            fieldType = this.ruleLogic[this.dropDownIndex - 1].type;
        }
        return this.operators[fieldType];
    };
    EditorComponent.prototype.getvalues = function () {
        var dropdown = [];
        if (this.resultMode) {
            dropdown.push.apply(dropdown, this.getEnterAStringObject());
            return dropdown;
        }
        var fieldType = this.currentFieldSelected.type;
        if (this.dropDownIndex < this.ruleLogic.length - 1 && this.ruleLogic[this.dropDownIndex - 2] != undefined) {
            fieldType = this.ruleLogic[this.dropDownIndex - 2].type;
        }
        switch (fieldType) {
            case 'number':
                dropdown.push({
                    name: 'Enter a number',
                    value: 'CUSTOM',
                    custom: true,
                });
                dropdown.push.apply(dropdown, this.getNumberFields());
                return dropdown;
            case 'string':
                dropdown = this.getEnterAStringObject();
                dropdown.push.apply(dropdown, this.getStringFields());
                return dropdown;
            case 'options':
                if (this.dropDownIndex === this.ruleLogic.length - 1) {
                    return this.currentFieldSelected.options;
                }
                else {
                    return this.ruleLogic[this.dropDownIndex - 2].options;
                }
            case 'date':
                dropdown = this.getEnterADateObject();
                dropdown.push.apply(dropdown, this.getDateFields());
                return dropdown;
        }
    };
    EditorComponent.prototype.getresults = function () {
        return this.results;
    };
    EditorComponent.prototype.getmessages = function () {
        return this.getEnterAStringObject();
    };
    EditorComponent.prototype.getEnterAStringObject = function () {
        return [{
                name: 'Enter a string',
                value: 'CUSTOM',
                custom: true,
            }];
    };
    EditorComponent.prototype.getEnterADateObject = function () {
        return [{
                name: 'Enter a date',
                value: 'CUSTOM',
                custom: true,
            }];
    };
    EditorComponent.prototype.getinputFields = function () {
        return this.inputParameters;
    };
    EditorComponent.prototype.upArrow = function (event) {
        this.dropDownSelectedIndex--;
        this.dropDownSelectedIndex = this.dropDownSelectedIndex < 0
            ? 0
            : this.dropDownSelectedIndex;
    };
    EditorComponent.prototype.downArrow = function (event) {
        this.dropDownSelectedIndex++;
        this.dropDownSelectedIndex = this.dropDownSelectedIndex >= this.dropDown.length
            ? this.dropDown.length
            : this.dropDownSelectedIndex;
    };
    EditorComponent.prototype.enter = function (event) {
        event && event.preventDefault ? event.preventDefault() : {};
        var selectedDropDown = this.dropDown[this.dropDownSelectedIndex];
        this.selectOption(selectedDropDown);
        this.dropDownSelectedIndex = -1;
    };
    EditorComponent.prototype.setDropDownPos = function (base) {
        base = base ? base : this;
        if (this.dropDownIndex != this.ruleLogic.length - 1 && this.currentElement != undefined) {
            this.setDropDownPosOnEdit(this.currentElement);
            return;
        }
        var dropDown = this.dropDownElement;
        var endElement = this.endElement;
        var ruleEditor = this.ruleEditor;
        var offsetLeft = ruleEditor.nativeElement.offsetLeft;
        var offsetTop = ruleEditor.nativeElement.offsetTop;
        var fontHeight = parseFloat(getComputedStyle(endElement.nativeElement).fontSize);
        var x = endElement.nativeElement.offsetTop + (fontHeight * 2);
        var y = endElement.nativeElement.offsetLeft;
        dropDown.nativeElement.style.top = x + 'px';
        dropDown.nativeElement.style.left = y + 'px';
    };
    EditorComponent.prototype.setDropDownPosOnEdit = function (element) {
        var base = this;
        var dropDown = this.dropDownElement;
        var ruleEditor = this.ruleEditor;
        var offsetLeft = ruleEditor.nativeElement.offsetLeft;
        var offsetTop = ruleEditor.nativeElement.offsetTop;
        var fontHeight = parseFloat(getComputedStyle(element).fontSize);
        var x = element.offsetTop + (fontHeight * 2);
        var y = element.offsetLeft;
        dropDown.nativeElement.style.top = x + 'px';
        dropDown.nativeElement.style.left = y + 'px';
    };
    EditorComponent.prototype.selectOption = function (dropDownEle) {
        var ruleIndex = this.dropDownIndex;
        this.dropDownSelectedIndex = -1;
        var move = true;
        if (this.dropDownIndex < this.ruleLogic.length - 1) {
            move = false;
        }
        if (dropDownEle.value === 'OPEN_PARANTHESIS' || dropDownEle.value === 'CLOSE_PARANTHESIS') {
            this.ruleLogic.splice(this.ruleLogic.length - 1, 0, dropDownEle);
            this.addRuleToObservable(this.ruleLogic[this.ruleLogic.length - 2]);
            this.dropDownType = 0;
            if (dropDownEle.value === 'CLOSE_PARANTHESIS') {
                this.dropDownType = -1;
                move = false;
            }
            dropDownEle.value === 'OPEN_PARANTHESIS' ? this.openParanthesis++ : this.openParanthesis--;
            this.moveToNextElement();
            return;
        }
        var ruleLogic = this.ruleLogic[ruleIndex];
        this.ruleLogic[ruleIndex] = Object.assign({}, ruleLogic, dropDownEle);
        ruleLogic = this.ruleLogic[ruleIndex];
        if (ruleLogic.elementType === 'field' && !this.resultMode) {
            var inputParamIndex = this.inputParameters.findIndex(function (i) { return i.value === ruleLogic.value; });
            if (inputParamIndex < 0) {
                this.inputParameters.push(dropDownEle);
            }
            this.currentFieldSelected = ruleLogic;
        }
        this.emptyCurrentText();
        this.emptyDropDown();
        if (dropDownEle.custom) {
            this.setCustomOption();
            return;
        }
        if (this.resultMode) {
            this.currentResult = ruleLogic;
            if (ruleLogic.value === 'addLoanException') {
                this.results.splice(0, 1);
                this.askCustomMessage();
            }
            if (ruleLogic.value === 'addRuleInputParameter') {
                this.setInputParametersInDropDown();
            }
        }
        if (ruleLogic.elementType === 'field' && this.resultMode) {
            var inputParamIndex = this.inputParameters.findIndex(function (i) { return i.value === dropDownEle.value; });
            this.inputParameters.splice(inputParamIndex, 1);
            this.addRuleToObservable(this.ruleLogic[this.ruleLogic.length - 1]);
            if (this.inputParameters.length === 0) {
                var resultIndex = this.results.findIndex(function (i) { return i.value === 'addRuleInputParameter'; });
                this.results.splice(resultIndex, 1);
            }
            var resultExceptionIndex = this.results.findIndex(function (i) { return i.value === 'addLoanException'; });
            if (this.inputParameters.length || resultExceptionIndex >= 0) {
                this.moveToNextElement(true);
            }
            // end of rule logic is reached
            if (this.inputParameters.length === 0 && resultExceptionIndex < 0) {
                console.log('End of Rule Logic..', this.ruleLogic);
            }
            this.addRulesToObservable(this.ruleLogic);
            return;
        }
        if (ruleLogic.elementType === 'logicalOperator' && ruleLogic.name === 'then') {
            if (ruleIndex < this.ruleLogic.length - 1) {
                this.ruleLogic = this.ruleLogic.slice(0, ruleIndex + 1);
                // this.results.push({
                //   name: 'Add Loan Exception',
                //   value: 'addLoanException',
                //   elementType: 'result',
                // });
            }
            this.addRuleToObservable(this.ruleLogic[ruleIndex]);
            this.moveToResult();
            return;
        }
        this.addRuleToObservable(this.ruleLogic[ruleIndex]);
        if (this.dropDownIndex === this.ruleLogic.length - 2) {
            this.dropDownIndex = this.ruleLogic.length - 1;
        }
        this.moveToNextElement(this.resultMode, move);
    };
    EditorComponent.prototype.setCustomOption = function () {
        if (this.mode != 'dropdown') {
            this.setFocusToRuleEditor();
        }
        this.enterCustomMode();
        this.ruleLogic[this.dropDownIndex].value = '';
    };
    EditorComponent.prototype.setCustomString = function (text) {
        this.customString = text;
    };
    EditorComponent.prototype.enterCustomMode = function () {
        this.ruleLogic[this.dropDownIndex].customMode = true;
        this.emptyDropDown();
        this.customMode = true;
    };
    EditorComponent.prototype.exitCustomMode = function () {
        this.ruleLogic[this.dropDownIndex].customMode = false;
        this.customMode = false;
    };
    EditorComponent.prototype.setCustomValueInRule = function (customString) {
        this.ruleLogic[this.dropDownIndex].value = customString;
        this.addRuleToObservable(this.ruleLogic[this.dropDownIndex]);
        this.setCustomString('');
        if (this.resultMode) {
            this.addRulesToObservable(this.ruleLogic);
        }
        this.moveToNextElement(this.resultMode);
    };
    EditorComponent.prototype.moveToNextElement = function (result, move) {
        if (result === void 0) { result = false; }
        if (move === void 0) { move = true; }
        if (move) {
            this.setNextDropDownType(result);
        }
        this.setDropdown({ code: '' }, true);
        if (this.mode != 'dropdown') {
            this.setFocusToRuleEditor();
        }
    };
    EditorComponent.prototype.moveToResult = function () {
        this.resultMode = true;
        this.moveToNextElement(true);
    };
    EditorComponent.prototype.askCustomMessage = function () {
        this.dropDownType = -1;
        this.dropDownTypes = ['messages', 'results'];
    };
    EditorComponent.prototype.setInputParametersInDropDown = function () {
        this.dropDownType = -1;
        this.dropDownTypes = ['inputFields', 'results'];
    };
    EditorComponent.prototype.emptyCurrentText = function () {
        this.currentText = '';
    };
    EditorComponent.prototype.setCurrentText = function (text) {
        this.currentText = text;
    };
    EditorComponent.prototype.setFocusToRuleEditor = function () {
        this.setFocusToElement(this.ruleEditor.nativeElement);
        this.dropDownSelectedIndex = -1;
    };
    EditorComponent.prototype.setFocusToDropDown = function () {
        this.setFocusToElement(this.dropDownElement.nativeElement);
        this.dropDownSelectedIndex++;
    };
    EditorComponent.prototype.setFocusToElement = function (element) {
        var p = element, s = window.getSelection(), r = document.createRange();
        r.setStart(p, 0);
        r.setEnd(p, 0);
        s.removeAllRanges();
        s.addRange(r);
    };
    EditorComponent.prototype.prevent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    EditorComponent.prototype.logicClicked = function (event, logic, index) {
        this.dropDownIndex = index;
        if (logic.value === 'then' || logic.elementType === 'result') {
            this.emptyDropDown();
            return;
        }
        this.setDropDownPosOnEdit(event.target);
        this.pushDropDownElements(this.dropDownIndex);
    };
    EditorComponent.prototype.getClasses = function (logic) {
        switch (logic.elementType) {
            case 'field':
                return 'col-2';
            case 'operator':
                return 'col-3';
            case 'value':
                return 'col-4';
            case 'logicalOperator':
                return 'col-6';
        }
    };
    EditorComponent.prototype.getOptions = function (logic, index) {
        this.dropDownIndex = index;
        var options = this['get' + logic.elementType + 's']();
        return options;
    };
    EditorComponent.prototype.logicSelectChange = function (logic, index, event, options) {
        var _a = event.target.value.split(','), name = _a[0], value = _a[1];
        this.dropDownIndex = index;
        var dropDownEle = this.getDropDownEle(logic.elementType, name, value, options);
        this.selectOption(dropDownEle);
    };
    EditorComponent.prototype.logicCustomChange = function (logic, index, value) {
        if (value != undefined) {
            logic.value = value;
            this.ruleLogic[index] = logic;
            return;
        }
    };
    EditorComponent.prototype.getDropDownEle = function (elementType, name, value, options) {
        return options.find(function (o) { return o.name === name && o.value === value; });
    };
    EditorComponent.prototype.selectDate = function (event, index) {
        this.exitCustomMode();
        var date = event.target.value;
        if (this.dropDownIndex == index) {
            this.exitCustomMode();
            this.setCustomValueInRule(date);
        }
        else {
            this.ruleLogic[index].value = date;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('helpText'),
        __metadata("design:type", String)
    ], EditorComponent.prototype, "helpText", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('ruleLogic'),
        __metadata("design:type", Object)
    ], EditorComponent.prototype, "ruleLogic", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('testRule'),
        __metadata("design:type", Boolean)
    ], EditorComponent.prototype, "testRule", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mode'),
        __metadata("design:type", String)
    ], EditorComponent.prototype, "mode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dropDownElement'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], EditorComponent.prototype, "dropDownElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('endElement'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], EditorComponent.prototype, "endElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('ruleEditor'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], EditorComponent.prototype, "ruleEditor", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('document:click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], EditorComponent.prototype, "clickedOutside", null);
    EditorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'rule-editor',template:/*ion-inline-start:"/Office/Rule-Editor/src/components/editor/editor.component.html"*/'<span *ngIf="mode === \'text\'">\n  <div class="rule-editor rule-text-box text-box-long"\n        #ruleEditor\n        contenteditable      = "true"\n        spellcheck           = "false"\n        (click)              = enterEditingMode($event)\n        (keypress)           = \'setDropdown($event); setEndOfContenteditable($event)\'\n        (keydown.arrowright) = rightArrow()\n        (keydown.arrowleft)  = leftArrow()\n        (keydown.arrowdown)  = setFocusToDropDown()\n        (keydown.backspace)  = backspace($event)\n        (keydown.control.z)  = undoDelete()\n        (keydown.esc)        = exitEditingMode()\n        [ngClass]            = "(ruleLogic.length > 1) ? \'rule-editor-edit\' : \'rule-editor-start\'">\n\n    <span class="initial-text" *ngIf="!(ruleLogic.length > 0)">\n      - Click anywhere inside the rule area to modify the rule. -\n    </span>\n\n    <span class="rule-edit-mode" *ngIf="ruleLogic.length > 0">\n      <span *ngFor="let logic of ruleLogic; index as i"\n          class="logic"\n          [ngClass]="logic.elementType === \'logicalOperator\' && logic.name === \'then\'\n                    ? \'starter\'\n                    : dropDownIndex === i\n                    ? \'current-logic \' + logic.elementType\n                    : logic.elementType "\n\n          (click) ="logicClicked($event, logic, i)"\n          >\n\n        <br *ngIf="logic.elementType === \'logicalOperator\' && logic.name === \'then\'">\n\n\n        <span *ngIf="!logic.custom">\n\n          <br *ngIf="logic.elementType === \'result\'">\n          <span *ngIf="logic.elementType === \'result\'"> &nbsp; </span>\n\n          <!-- {{ logic.value === \'OPEN_PARANTHESIS\' || logic.value === \'CLOSE_PARANTHESIS\'\n             ? logic.name + \'  \'\n             : logic.value + \'  \'\n           }} -->\n\n           {{ logic.name === \'Enter a string\' || logic.name === \'Enter String\' || logic.name === \'Enter a number\'\n           ? logic.value : logic.name }}\n\n          <br *ngIf="isNewLineRequired(logic)" >\n          <span *ngIf="isNewLineRequired(logic)"> &nbsp; </span>\n\n        </span>\n\n        <span *ngIf="logic.custom">\n          <span *ngIf="logic.name ===\'Enter a date\'">\n            <input type="date" [value]="logic.value"  (change) = "selectDate($event, i)">\n          </span>\n          <span *ngIf="logic.name !==\'Enter a date\'">\n            {{ logic.customMode ? customString : logic.value }}\n            <br *ngIf="isNewLineRequired(logic)" >\n            <span *ngIf="isNewLineRequired(logic)"> &nbsp; </span>\n          </span>\n        </span>\n\n      </span>\n    </span>\n\n    <span>{{currentText}}</span>\n\n    <span #endElement>\n\n    .</span>\n\n  </div>\n\n  <div class="drop-down"\n      #dropDownElement\n      contenteditable     = "true"\n      spellcheck          = "false"\n      (keypress)          = prevent($event)\n      (click)             = prevent($event)\n      (keydown.arrowup)   = upArrow($event)\n      (keydown.arrowdown) = downArrow($event)\n      (keydown.enter)     = enter($event)\n      (keydown.arrowright)= setFocusToRuleEditor()\n      (keydown.arrowleft) = setFocusToRuleEditor()\n      [ngClass]           = "dropDown.length > 0 && ruleEditMode ? \'show\' : \'hide\'">\n    <div class="dropDownElement drop-down-element"\n          *ngFor="let ele of dropDown; index as i"\n          [ngClass]="i === dropDownSelectedIndex ? \'active-drop-down-element\' : \'\'"\n          (click) ="selectOption(ele)">\n      {{ ele.name }}\n    </div>\n  </div>\n</span>\n\n<span *ngIf="mode === \'dropdown\'">\n  <div class="drop-down-header">\n    <span>\n      WHEN\n    </span>\n    <span>\n      Add Parantheses &nbsp;\n      <button> ( </button>\n      <button>  ) </button>\n    </span>\n  </div>\n\n  <div class="drop-down-headers">\n    <div class="drop-down-head col-2">\n      Field\n    </div>\n    <div class="drop-down-head col-3">\n      Operator\n    </div>\n    <div class="drop-down-head col-4">\n      Value\n    </div>\n    <div class="drop-down-head col-6">\n      Join\n    </div>\n  </div>\n\n  <div class="rules-drop-down-elements" *ngFor="let logic of ruleLogic; index as i">\n\n    <select\n          class="col-2"\n          *ngIf="logic.elementType===\'field\'"\n          [value] = "logic.name + \',\' + logic.value"\n          (change) = "logicSelectChange(logic, i, $event, getOptions(logic, i))">\n      <option *ngFor="let logic of getOptions(logic, i)"\n        [value]="logic.name + \',\' + logic.value"\n      >\n        {{ logic.name }}\n      </option>\n    </select>\n\n    <select\n          class="col-3"\n          *ngIf="logic.elementType===\'operator\'" [value] = "logic.name + \',\' + logic.value"\n          (change) = "logicSelectChange(logic, i, $event, getOptions(logic, i))">\n      <option *ngFor="let logic of getOptions(logic, i)" [value]="logic.name + \',\' + logic.value">\n        {{ logic.name }}\n      </option>\n    </select>\n\n    <select\n          class="col-4"\n          *ngIf="logic.elementType===\'value\' &&\n            !(logic.name === \'Enter a string\' || logic.name === \'Enter String\' || logic.name === \'Enter a number\' || logic.name === \'Enter a date\')"\n          [value] = "logic.name + \',\' + logic.value"\n          (change) = "logicSelectChange(logic, i, $event, getOptions(logic, i))">\n      <option *ngFor="let logic of getOptions(logic, i)"\n              [value]="logic.name + \',\' + logic.value">\n        {{ logic.name === \'Enter a string\' || logic.name === \'Enter String\' ? logic.value : logic.name }}\n      </option>\n    </select>\n\n    <input\n        class="col-4"\n        *ngIf="logic.elementType===\'value\' &&\n                (logic.name === \'Enter a string\' || logic.name === \'Enter String\' || logic.name === \'Enter a number\' || logic.name === \'Enter a date\')"\n        [value] = "logic.value"\n        [type] = "logic.name === \'Enter a date\' ? \'date\' : \'text\'"\n        (change) = "logic.name === \'Enter a date\'\n              ? selectDate($event, i)\n              : logicCustomChange(logic, i, value)">\n\n    <select\n          class="col-6"\n          *ngIf="logic.elementType===\'logicalOperator\'"\n          [value] = "logic.name + \',\' + logic.value"\n          (change) = "logicSelectChange(logic, i, $event, getOptions(logic, i))">\n      <option *ngFor="let logic of getOptions(logic, i)"\n              [value]="logic.name + \',\' + logic.value">\n        {{ logic.name }}\n      </option>\n    </select>\n\n    <input class="result"\n        *ngIf="logic.elementType===\'result\' && logic.name !== \'\'"\n        [value] = "logic.name"\n        readonly>\n\n  </div>\n\n</span>\n\n\n<!-- <span *ngIf="mode === \'dropdown\'">\n  <div class="drop-down-header">\n    <span>\n      WHEN\n    </span>\n    <span>\n      Add Parantheses\n      <button> ( </button>\n      <button>  ) </button>\n    </span>\n  </div>\n\n  <div class="drop-down-headers">\n    <div class="drop-down-head col-1">\n      (\n    </div>\n    <div class="drop-down-head col-2">\n      Field\n    </div>\n    <div class="drop-down-head col-3">\n      Operator\n    </div>\n    <div class="drop-down-head col-4">\n      Value\n    </div>\n    <div class="drop-down-head col-5">\n      )\n    </div>\n    <div class="drop-down-head col-6">\n      Join\n    </div>\n  </div>\n\n  <div class="rules-drop-down-elements" *ngFor="let logic of ruleLogic; index as i">\n    <input type="text" class="col-2" *ngIf="logic.elementType===\'field\'" [value] = "logic.value">\n    <input type="text" class="col-3" *ngIf="logic.elementType===\'operator\'" [value] = "logic.value">\n    <input type="text" class="col-4" *ngIf="logic.elementType===\'value\'" [value] = "logic.value">\n    <input type="text" class="col-6" *ngIf="logic.elementType===\'logicalOperator\'" [value] = "logic.value">\n  </div>\n\n</span> -->\n'/*ion-inline-end:"/Office/Rule-Editor/src/components/editor/editor.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_fields_service__["a" /* FieldsService */],
            __WEBPACK_IMPORTED_MODULE_2__providers_logical_service__["a" /* LogicalOperatorsService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_operators_service__["a" /* OperatorsService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_rules_service__["a" /* RulesService */],
            __WEBPACK_IMPORTED_MODULE_4__providers_result_service__["a" /* ResultsService */]])
    ], EditorComponent);
    return EditorComponent;
}());

//# sourceMappingURL=editor.component.js.map

/***/ }),

/***/ 674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackMessage; });
/**
 * Class to define all the feedback message
 *
 * usage: FeedbackMessage.LOGIN_ERROR type is FeedbackMessage
 */
var FeedbackMessage;
(function (FeedbackMessage) {
    FeedbackMessage[FeedbackMessage["LOGIN_ERROR"] = "Invalid credentials , please try again"] = "LOGIN_ERROR";
    FeedbackMessage[FeedbackMessage["INSERT_CREDENTIALS"] = "Please insert credentials"] = "INSERT_CREDENTIALS";
    FeedbackMessage[FeedbackMessage["NO_CHANGES"] = "No changes are made"] = "NO_CHANGES";
})(FeedbackMessage || (FeedbackMessage = {}));
//# sourceMappingURL=feedback.messages.js.map

/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service__ = __webpack_require__(138);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, auth, app) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login_component__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.app = app;
        this.auth = auth;
    }
    MyApp.prototype.authenticated = function () {
        return this.auth.authentication;
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        this.app.getRootNav().setRoot("LoginPage").then(function () {
            _this.auth.logout();
        });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Office/Rule-Editor/src/app/app.html"*/'<ion-header>\n  <div class="title">\n    Blue Sage <strong> Rules Editor</strong>\n  </div>\n  <div class="user-info" *ngIf="authenticated()">\n    <div class="user-name">\n      Steve Octaviano\n    </div>\n    <div class="mug-shot mugshot-circle" (click)="logout()"></div>\n  </div>\n</ion-header>\n<ion-content>\n	<ion-nav [root]="rootPage"></ion-nav>\n</ion-content>\n'/*ion-inline-end:"/Office/Rule-Editor/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FeedbackService = (function () {
    function FeedbackService(toastCtrl, loadingCtrl, alertCtrl) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    FeedbackService_1 = FeedbackService;
    FeedbackService.prototype.showToast = function (message, toastType, duration, position) {
        if (toastType === void 0) { toastType = "info"; }
        if (duration === void 0) { duration = 2000; }
        if (position === void 0) { position = "bottom"; }
        /*
         * toastType could be one of ['info', 'warning', 'error']
         * usage:
         *      this.feedbackService.showToast(
         *         <toast message>,
         *         <toastType>,
         *         <duration>,
         *         <position>,
         *      )
         */
        var toast = this.toastCtrl.create({ message: message, duration: duration, position: position,
            cssClass: "toast__" + toastType,
        });
        toast.present();
    };
    FeedbackService.prototype.getLoader = function (content) {
        if (content === void 0) { content = "loading ..."; }
        // usage:
        // const loader = feedback.getLoader(<message>)
        // loader.present() => show loader with the message
        // loader.dismiss() => dismiss loader
        var loader = this.loadingCtrl.create({ content: content });
        return {
            dismiss: function () { loader.dismiss(); FeedbackService_1.isLoaderVisible = false; },
            present: function () { loader.present(); FeedbackService_1.isLoaderVisible = true; },
        };
    };
    FeedbackService.prototype.showError = function (text) {
        var alert = this.alertCtrl.create({
            buttons: ["OK"],
            subTitle: text,
            title: "Fail",
        });
        alert.present();
    };
    FeedbackService.isLoaderVisible = false;
    FeedbackService = FeedbackService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], FeedbackService);
    return FeedbackService;
    var FeedbackService_1;
}());

//# sourceMappingURL=feedback.service.js.map

/***/ })

},[368]);
//# sourceMappingURL=main.js.map