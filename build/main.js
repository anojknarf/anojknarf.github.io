webpackJsonp([1],{

/***/ 119:
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
webpackEmptyAsyncContext.id = 119;

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/form/form.component.module": [
		161
	],
	"../pages/home/home.component.module": [
		290,
		0
	],
	"../pages/rule-list/rule-list.component.module": [
		169
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
webpackAsyncContext.id = 160;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormComponentModule", function() { return FormComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_editor_editor_component__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_element_element_component__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_datepicker__ = __webpack_require__(167);
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
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__form_component__["a" /* FormComponent */]),
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

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
            selector: 'element',template:/*ion-inline-start:"/Office/Rule-Editor/src/components/element/element.component.html"*/'<div class="element-container">\n	<div class="element-label">{{elementObject.name}}</div>\n	<ion-select *ngIf="elementObject.type == \'options\'" class="element-value type-dropdown" [(ngModel)]="selectedValue">\n    	<ion-option *ngFor="let opt of elementObject.options" [value]="opt">{{opt.name}}</ion-option>\n  	</ion-select>\n	<input *ngIf="elementObject.type == \'number\'" (click)="suppress()" (keypress)=\'numberRestrict(event)\' [(ngModel)]="selectedValue" class="element-value type-number">\n	<input *ngIf="elementObject.type == \'string\'" (click)="suppress()" [(ngModel)]="selectedValue" class="element-value">\n</div>'/*ion-inline-end:"/Office/Rule-Editor/src/components/element/element.component.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ElementComponent);
    return ElementComponent;
}());

//# sourceMappingURL=element.component.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FieldsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(41);
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
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Appraisal Date",
                "value": "appraisalDate",
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Appraisal Verification Expiration Date",
                "value": "appraisalVerificationExpirationDate",
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Asset Verification Expiration Date",
                "value": "assetVerificationExpirationDate",
                "type": "string",
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
                "type": "string",
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
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Credit Verification Expiration Date",
                "value": "creditVerificationExpirationDate",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Current Date",
                "value": "currentDate",
                "type": "string",
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
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Employment Verification Expiration Date",
                "value": "employmentVerificationExpirationDate",
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "FHA Prior Loan Endorsement Date",
                "value": "fhaPriorLoanEndorsementDate",
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Flood Certificate Verification Expiration Date",
                "value": "floodCertificateVerificationExpirationDate",
                "type": "string",
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
                "type": "string",
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
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Income Verification Expiration Date",
                "value": "incomeVerificationExpirationDate",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Initial Closing Disclosure Delivery Date",
                "value": "initialClosingDisclosureDeliveryDate",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Initial Closing Disclosure Receipt Date",
                "value": "initialClosingDisclosureReceiptDate",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Initial Loan Estimate Delivery Date",
                "value": "initialLoanEstimateDeliveryDate",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Initial Loan Estimate Receipt Date",
                "value": "initialLoanEstimateReceiptDate",
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Loan Eligibility Date",
                "value": "loanEligibilityDate",
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Loan Note Date",
                "value": "loanNoteDate",
                "type": "string",
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
                "type": "string",
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
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Mortgage Insurance Certificate Verification Expiration Date",
                "value": "mortgageInsuranceCertificateVerificationExpirationDate",
                "type": "string",
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
                    },
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
                "type": "string",
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
                "type": "string",
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
                "type": "string",
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
                "type": "string",
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
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Revised Closing Disclosure Receipt Date",
                "value": "revisedClosingDisclosureReceiptDate",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Revised Loan Estimate Delivery Date",
                "value": "revisedLoanEstimateDeliveryDate",
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Revised Loan Estimate Receipt Date",
                "value": "revisedLoanEstimateReceiptDate",
                "type": "string",
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
                "type": "string",
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
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Title Verification Expiration Date",
                "value": "titleVerificationExpirationDate",
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "VA Case Number Assignment Date",
                "value": "vaCaseNumberAssignmentDate",
                "type": "string",
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
                "type": "string",
                "elementType": "field"
            },
            {
                "name": "Verification Document Exp Date",
                "value": "verificationDocumentExpDate",
                "type": "string",
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

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogicalOperatorsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(41);
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

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OperatorsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(41);
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

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(41);
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

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuleListComponentModule", function() { return RuleListComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rule_list_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_datepicker__ = __webpack_require__(167);
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
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__rule_list_component__["a" /* RuleListComponent */]),
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

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(234);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home_component__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_rule_list_rule_list_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_form_form_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_rule_list_rule_list_component_module__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_form_form_component_module__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_fields_service__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_operators_service__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_logical_service__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_rules_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_result_service__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_ruleList_service__ = __webpack_require__(82);
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
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home_component__["a" /* HomeComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_9__pages_rule_list_rule_list_component_module__["RuleListComponentModule"],
                __WEBPACK_IMPORTED_MODULE_10__pages_form_form_component_module__["FormComponentModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/form/form.component.module#FormComponentModule', name: 'form', segment: 'form/:rule-name', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.component.module#HomeComponentModule', name: 'home', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rule-list/rule-list.component.module#RuleListComponentModule', name: 'rule-list', segment: 'rule-list', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_7__pages_rule_list_rule_list_component__["a" /* RuleListComponent */],
                __WEBPACK_IMPORTED_MODULE_8__pages_form_form_component__["a" /* FormComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_fields_service__["a" /* FieldsService */],
                __WEBPACK_IMPORTED_MODULE_12__providers_operators_service__["a" /* OperatorsService */],
                __WEBPACK_IMPORTED_MODULE_13__providers_logical_service__["a" /* LogicalOperatorsService */],
                __WEBPACK_IMPORTED_MODULE_14__providers_rules_service__["a" /* RulesService */],
                __WEBPACK_IMPORTED_MODULE_15__providers_result_service__["a" /* ResultsService */],
                __WEBPACK_IMPORTED_MODULE_16__providers_ruleList_service__["a" /* RuleListService */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 259:
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

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_fields_service__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_logical_service__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_operators_service__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_result_service__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rules_service__ = __webpack_require__(81);
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
            // if(this.ruleLogic[this.ruleLogic.length -1].elementType === 'value') {
            //   this.ruleLogic.pop();
            // }
            if (this.ruleLogic.length === 0) {
                this.ruleLogic.push({
                    name: 'IF',
                    elementType: 'starter',
                    value: 'if',
                });
            }
            this.setDropdown({ code: '' });
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
                if (this.ruleLogic[this.ruleLogic.length - 1].customMode) {
                    this.setCustomString(this.customString + key);
                    return;
                }
                this.setCurrentText(this.currentText + key);
                this.filterDropDown(this.currentText);
                break;
        }
        var base = this;
        setTimeout(function () {
            base.setDropDownPos(base);
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
            // return l.name.toUpperCase().includes(text.toUpperCase());
            return l.name.toUpperCase().startsWith(text.toUpperCase());
        });
    };
    EditorComponent.prototype.pushLogic = function () {
        this.dropDownIndex++;
        if (this.dropDownIndex > this.ruleLogic.length) {
            this.dropDownIndex = this.ruleLogic.length - 1;
        }
        this.setCurrentElement();
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
        this.setFocusToRuleEditor();
        this.enterCustomMode();
        this.ruleLogic[this.ruleLogic.length - 1].value = '';
    };
    EditorComponent.prototype.setCustomString = function (text) {
        this.customString = text;
    };
    EditorComponent.prototype.enterCustomMode = function () {
        this.ruleLogic[this.ruleLogic.length - 1].customMode = true;
        this.customMode = true;
    };
    EditorComponent.prototype.exitCustomMode = function () {
        this.ruleLogic[this.ruleLogic.length - 1].customMode = false;
        this.customMode = false;
    };
    EditorComponent.prototype.setCustomValueInRule = function (customString) {
        this.ruleLogic[this.ruleLogic.length - 1].value = customString;
        this.addRuleToObservable(this.ruleLogic[this.ruleLogic.length - 1]);
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
        this.setFocusToRuleEditor();
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
    EditorComponent.prototype.logicSelectChange = function (logic, index, event) {
        var _a = event.target.value.split(','), name = _a[0], value = _a[1];
        if (value === undefined) {
            logic.value = name;
            this.ruleLogic[index] = logic;
            return;
        }
        logic.name = name;
        logic.value = value;
        this.ruleLogic[index] = logic;
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
            selector: 'rule-editor',template:/*ion-inline-start:"/Office/Rule-Editor/src/components/editor/editor.component.html"*/'<span *ngIf="mode === \'text\'">\n  <div class="rule-editor rule-text-box text-box-long"\n        #ruleEditor\n        contenteditable      = "true"\n        spellcheck           = "false"\n        (click)              = enterEditingMode($event)\n        (keypress)           = \'setDropdown($event); setEndOfContenteditable($event)\'\n        (keydown.arrowright) = rightArrow()\n        (keydown.arrowleft)  = leftArrow()\n        (keydown.arrowdown)  = setFocusToDropDown()\n        (keydown.backspace)  = backspace($event)\n        (keydown.control.z)  = undoDelete()\n        (keydown.esc)        = exitEditingMode()\n        [ngClass]            = "(ruleLogic.length > 1) ? \'rule-editor-edit\' : \'rule-editor-start\'">\n\n    <span class="initial-text" *ngIf="!(ruleLogic.length > 0)">\n      - Click anywhere inside the rule area to modify the rule. -\n    </span>\n\n    <span class="rule-edit-mode" *ngIf="ruleLogic.length > 0">\n      <span *ngFor="let logic of ruleLogic; index as i"\n          class="logic"\n          [ngClass]="logic.elementType === \'logicalOperator\' && logic.name === \'then\'\n                    ? \'starter\'\n                    : dropDownIndex === i\n                    ? \'current-logic \' + logic.elementType\n                    : logic.elementType "\n\n          (click) ="logicClicked($event, logic, i)"\n          >\n\n        <br *ngIf="logic.elementType === \'logicalOperator\' && logic.name === \'then\'">\n\n\n        <span *ngIf="!logic.custom">\n\n          <br *ngIf="logic.elementType === \'result\'">\n          <span *ngIf="logic.elementType === \'result\'"> &nbsp; </span>\n\n          <!-- {{ logic.value === \'OPEN_PARANTHESIS\' || logic.value === \'CLOSE_PARANTHESIS\'\n             ? logic.name + \'  \'\n             : logic.value + \'  \'\n           }} -->\n\n           {{ logic.name === \'Enter a string\' || logic.name === \'Enter String\' || logic.name === \'Enter a number\'\n           ? logic.value : logic.name }}\n\n          <br *ngIf="isNewLineRequired(logic)" >\n          <span *ngIf="isNewLineRequired(logic)"> &nbsp; </span>\n\n        </span>\n\n        <span *ngIf="logic.custom">\n          {{ logic.customMode ? customString : logic.value }}\n          <br *ngIf="isNewLineRequired(logic)" >\n          <span *ngIf="isNewLineRequired(logic)"> &nbsp; </span>\n        </span>\n\n      </span>\n    </span>\n\n    <span>{{currentText}}</span>\n\n    <span #endElement>\n\n    .</span>\n\n  </div>\n\n  <div class="drop-down"\n      #dropDownElement\n      contenteditable     = "true"\n      spellcheck          = "false"\n      (keypress)          = prevent($event)\n      (click)             = prevent($event)\n      (keydown.arrowup)   = upArrow($event)\n      (keydown.arrowdown) = downArrow($event)\n      (keydown.enter)     = enter($event)\n      (keydown.arrowright)= setFocusToRuleEditor()\n      (keydown.arrowleft) = setFocusToRuleEditor()\n      [ngClass]           = "dropDown.length > 0 && ruleEditMode ? \'show\' : \'hide\'">\n    <div class="dropDownElement drop-down-element"\n          *ngFor="let ele of dropDown; index as i"\n          [ngClass]="i === dropDownSelectedIndex ? \'active-drop-down-element\' : \'\'"\n          (click) ="selectOption(ele)">\n      {{ ele.name }}\n    </div>\n  </div>\n</span>\n\n<span *ngIf="mode === \'dropdown\'">\n  <div class="drop-down-header">\n    <span>\n      WHEN\n    </span>\n    <span>\n      Add Parantheses &nbsp;\n      <button> ( </button>\n      <button>  ) </button>\n    </span>\n  </div>\n\n  <div class="drop-down-headers">\n    <div class="drop-down-head col-2">\n      Field\n    </div>\n    <div class="drop-down-head col-3">\n      Operator\n    </div>\n    <div class="drop-down-head col-4">\n      Value\n    </div>\n    <div class="drop-down-head col-6">\n      Join\n    </div>\n  </div>\n\n  <div class="rules-drop-down-elements" *ngFor="let logic of ruleLogic; index as i">\n\n    <select\n          class="col-2"\n          *ngIf="logic.elementType===\'field\' && logic.name !== \'\'" [value] = "logic.name + \',\' + logic.value"\n          (change) = "logicSelectChange(logic, i, $event)">\n      <option *ngFor="let logic of getOptions(logic, i)" [value]="logic.name + \',\' + logic.value">\n        {{ logic.name }}\n      </option>\n    </select>\n\n    <select\n          class="col-3"\n          *ngIf="logic.elementType===\'operator\' && logic.name !== \'\'" [value] = "logic.name + \',\' + logic.value"\n          (change) = "logicSelectChange(logic, i, $event)">\n      <option *ngFor="let logic of getOptions(logic, i)" [value]="logic.name + \',\' + logic.value">\n        {{ logic.name }}\n      </option>\n    </select>\n\n    <select\n          class="col-4"\n          *ngIf="logic.elementType===\'value\' &&\n            !(logic.name === \'Enter a string\' || logic.name === \'Enter String\' || logic.name === \'Enter a number\' || logic.name === \'\')"\n          [value] = "logic.name + \',\' + logic.value"\n          (change) = "logicSelectChange(logic, i, $event)">\n      <option *ngFor="let logic of getOptions(logic, i)"\n              [value]="logic.name + \',\' + logic.value">\n        {{ logic.name === \'Enter a string\' || logic.name === \'Enter String\' ? logic.value : logic.name }}\n      </option>\n    </select>\n\n    <input\n        class="col-4"\n        *ngIf="logic.elementType===\'value\' &&\n                (logic.name === \'Enter a string\' || logic.name === \'Enter String\' || logic.name === \'Enter a number\') &&\n                logic.name !== \'\'"\n        [value] = "logic.value"\n        (change) = "logicSelectChange(logic, i, $event)">\n\n    <select\n          class="col-6"\n          *ngIf="logic.elementType===\'logicalOperator\'"\n          [value] = "logic.name + \',\' + logic.value"\n          (change) = "logicSelectChange(logic, i, $event)">\n      <option *ngFor="let logic of getOptions(logic, i)"\n              [value]="logic.name + \',\' + logic.value">\n        {{ logic.name }}\n      </option>\n    </select>\n\n    <input class="result"\n        *ngIf="logic.elementType===\'result\' && logic.name !== \'\'"\n        [value] = "logic.name"\n        readonly>\n\n  </div>\n\n</span>\n\n\n<!-- <span *ngIf="mode === \'dropdown\'">\n  <div class="drop-down-header">\n    <span>\n      WHEN\n    </span>\n    <span>\n      Add Parantheses\n      <button> ( </button>\n      <button>  ) </button>\n    </span>\n  </div>\n\n  <div class="drop-down-headers">\n    <div class="drop-down-head col-1">\n      (\n    </div>\n    <div class="drop-down-head col-2">\n      Field\n    </div>\n    <div class="drop-down-head col-3">\n      Operator\n    </div>\n    <div class="drop-down-head col-4">\n      Value\n    </div>\n    <div class="drop-down-head col-5">\n      )\n    </div>\n    <div class="drop-down-head col-6">\n      Join\n    </div>\n  </div>\n\n  <div class="rules-drop-down-elements" *ngFor="let logic of ruleLogic; index as i">\n    <input type="text" class="col-2" *ngIf="logic.elementType===\'field\'" [value] = "logic.value">\n    <input type="text" class="col-3" *ngIf="logic.elementType===\'operator\'" [value] = "logic.value">\n    <input type="text" class="col-4" *ngIf="logic.elementType===\'value\'" [value] = "logic.value">\n    <input type="text" class="col-6" *ngIf="logic.elementType===\'logicalOperator\'" [value] = "logic.value">\n  </div>\n\n</span> -->\n'/*ion-inline-end:"/Office/Rule-Editor/src/components/editor/editor.component.html"*/
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

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home_component__ = __webpack_require__(51);
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
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home_component__["a" /* HomeComponent */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Office/Rule-Editor/src/app/app.html"*/'<ion-header>\n  <div class="title">\n    Blue Sage <strong> Rules Editor</strong>\n  </div>\n  <div class="user-info">\n    <div class="user-name">\n      Steve Octaviano\n    </div>\n    <div class="mug-shot mugshot-circle"></div>\n  </div>\n</ion-header>\n<ion-content>\n	<ion-nav [root]="rootPage"></ion-nav>\n</ion-content>\n'/*ion-inline-end:"/Office/Rule-Editor/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], HomeComponent);
    return HomeComponent;
}());

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_element_element_component__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rules_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_ruleList_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rule_list_rule_list_component__ = __webpack_require__(83);
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
        console.log(this.navParams.data);
        if (this.navParams.get('rule-name')) {
            this.pageTitle = "Edit Rule";
            this.ruleName = this.navParams.get('rule-name');
            var rule = this.ruleListService.getRule(this.ruleName);
            this.ruleDescription = rule.rule_desc;
            this.ruleLogic = rule.rule_logic;
            this.effectiveDate = new Date(rule.effective_date);
            this.expiryDate = new Date(rule.expiry_date);
            this.ruleLogicArray = rule.rule_logic_array;
            console.log("form component..", this.ruleLogicArray);
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
                var operatorElem = _this.elementStack[indx + 1];
                var valueElem = _this.elementStack[indx + 2];
                if (!operatorElem || !valueElem) {
                    return;
                }
                if (operatorElem['value'] && (operatorElem['value'] == "is" || operatorElem['value'] == "=")) {
                    commandString += " == '" + valueElem['value'] + "' ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == "isNot") {
                    commandString += " != '" + valueElem['value'] + "' ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == "contains") {
                    commandString += ".indexOf('" + valueElem['value'] + "') > -1 ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == "startsWith") {
                    commandString += ".indexOf('" + valueElem['value'] + "') == 0 ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == ">") {
                    commandString += " > '" + valueElem['value'] + "' ";
                }
                else if (operatorElem['value'] && operatorElem['value'] == "<") {
                    commandString += " < '" + valueElem['value'] + "' ";
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
            'rule_category': this.ruleCatagory ? this.ruleCatagory : '',
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
        return JSON.stringify(this.getCleanRuleArray(), null, "  ");
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
            selector: 'rule-form',template:/*ion-inline-start:"/Office/Rule-Editor/src/pages/form/form.component.html"*/'<div class="page-title">\n	<div>\n		<span class="title-a" [navPush]="ruleListPage">Loan Validation</span>\n		<span>&nbsp;/&nbsp;</span>\n		<span class="title-b">{{pageTitle}}</span>\n	</div>\n</div>\n<div class="rule-form">\n	<div class="tabs">\n		<div class="tab" [ngClass]="{\'highlight-tab\' : (tab == \'rule\')}" (click)="tab=\'rule\'">Rule</div>\n		<div class="tab" [ngClass]="{\'highlight-tab\' : (tab == \'testRule\')}" (click)="tab=\'testRule\'">Test Rule</div>\n		<div class="tab" [ngClass]="{\'highlight-tab\' : (tab == \'droolsFormat\')}" (click)="tab=\'droolsFormat\'">Drools Format</div>\n		<div class="tab" [ngClass]="{\'highlight-tab\' : (tab == \'jsonFormat\')}" (click)="tab=\'jsonFormat\'">JSON Format</div>\n	</div>\n	<div [hidden]="tab != \'rule\'" class="tab-content">\n		<div class="rule-section">\n			<div class="row">\n				<div class="short-sec">\n					<div class="rule-label">Rule Name</div>\n					<input class="text-box-long rule-text-box" [(ngModel)]="ruleName">\n				</div>\n				<div class="middle-sec">\n					<div class="rule-label">Rule Category</div>\n				    <ion-select class="type-dropdown" [(ngModel)]="ruleCatagory">\n				      <ion-option *ngFor="let opt of ruleCatagories" [value]="stringify(opt)">{{opt.name}}</ion-option>\n				    </ion-select>\n				</div>\n				<div class="rule-start short-sec">\n					<div class="sec">\n						<div class="rule-label">Effective Date</div>\n						<ng-datepicker [(ngModel)]="effectiveDate" position="bottom-right" [options]="options"></ng-datepicker>\n					</div>\n					<div class="sec">\n						<div class="rule-label">Expiration Date</div>\n						<ng-datepicker [(ngModel)]="expiryDate" position="bottom-left" [options]="options"></ng-datepicker>\n					</div>\n				</div>\n			</div>\n			<div class="row">\n				<div class="large-sec">\n					<div class="rule-label">Description</div>\n					<input class="text-box-long rule-text-box" [(ngModel)]="ruleDescription">\n				</div>\n			</div>\n			<div class="rule-logic-heading">\n				<span>\n					<div class="rule-label">Rule Logic</div>\n					<div class="rule-sub-label">{{helpText}}</div>\n				</span>\n				<button class="editor-type-button" (click)="changeEditorMode()">\n					{{ mode === \'text\' ? \'dropdown\' : \'text\' }} Mode\n				</button>\n			</div>\n			<rule-editor [helpText]="helpText" [mode]="mode" [ruleLogic]="ruleLogicArray" [testRule]="true"></rule-editor>\n			<div class="rule-last-row">\n				<div class="rule-button clear disabled">Validate</div>\n				<div class="rule-end">\n					<div class="rule-button delete" [ngClass]="{\'disabled\':pageTitle == \'Create New Rule\'}" (click)="deleteRule()">Delete</div>\n					<div class="rule-button save" (click)="saveRule()">Save</div>\n				</div>\n			</div>\n		</div>\n	</div>\n	<div [hidden]="tab != \'testRule\'" class="tab-content">\n		<div class="rule-creator">\n			<div class="rule-label">Rule Logic</div>\n			<rule-editor [helpText]="helpText" mode=\'text\' [ruleLogic]="elementStack" [testRule]="false"></rule-editor>\n		</div>\n		<div class="rule-test">\n			<div class="rule-label">Test Rule</div>\n			<element *ngFor="let elem of formElems" [elementObject]="elem"></element>\n			<div class="rule-button test" (click)="evaluateResults()" *ngIf="formElems.length > 0" [ngClass]="{ \'disabled\': errorMessage == \'\'}">Test</div>\n		</div>\n	</div>\n	<div [hidden]="tab != \'droolsFormat\'" class="tab-content">\n		<div class="drools-box">\n			<pre>\n1: package org.drools;\n2:\n3: rule "DU Refi Rule [EX-04001]"\n4:   when\n5:     BSLP_LoanExceptionServiceInputData(occupancyType == ""P"", numberOfUnits == 2, loanToValueRatio > 150)\n6:   then\n7:     BusinessRuleFactList facts = new BusinessRuleFactList();\n8:     facts.addFact(""Occupancy Type"", $l.getOccupancyType());\n9:     facts.addNumericFact(""Number of Units"", $l.getNumberOfUnits());\n10:    facts.addPercentageFact(""LTV Ratio"", $l.getLoanToValueRatio(), 2);\n11:    BusinessRulesList.add(""EX-04002"", false, facts.toArray());\n12: end\n			</pre>\n		</div>\n		<div [hidden]="tab != \'testRule\'" class="tab-content">\n			JSON FORMAT\n		</div>\n	</div>\n	<div [hidden]="tab != \'jsonFormat\'" class="tab-content">\n			<div class="drools-box">\n				<pre>{{getRuleJSONString()}}</pre>\n			</div>\n		</div>\n</div>\n'/*ion-inline-end:"/Office/Rule-Editor/src/pages/form/form.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_rules_service__["a" /* RulesService */], __WEBPACK_IMPORTED_MODULE_4__providers_ruleList_service__["a" /* RuleListService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], FormComponent);
    return FormComponent;
}());

//# sourceMappingURL=form.component.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RulesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(41);
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

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RuleListService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_rule_list__ = __webpack_require__(259);
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
    function RuleListService() {
        this.ruleList = [];
        console.log(__WEBPACK_IMPORTED_MODULE_1__assets_rule_list__["a" /* default */]);
        this.ruleList = __WEBPACK_IMPORTED_MODULE_1__assets_rule_list__["a" /* default */];
    }
    RuleListService.prototype.getRule = function (name) {
        return this.ruleList.filter(function (elem) {
            if (elem['rule_name'] == name) {
                return true;
            }
            return false;
        })[0];
    };
    RuleListService.prototype.updateRule = function (rule) {
        this.deleteRule(rule.rule_name);
        this.saveRule(rule);
    };
    RuleListService.prototype.saveRule = function (rule) {
        this.ruleList.push(rule);
    };
    RuleListService.prototype.deleteRule = function (name) {
        this.ruleList = this.ruleList.filter(function (elem) {
            if (elem['rule_name'] == name) {
                return false;
            }
            return true;
        });
    };
    RuleListService.prototype.cloneRule = function (rule) {
        var newRule = JSON.parse(JSON.stringify(rule));
        newRule.rule_name = newRule.rule_name + " - Copy";
        newRule.last_published = "";
        newRule.last_modified = new Date();
        this.ruleList.push(newRule);
    };
    RuleListService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], RuleListService);
    return RuleListService;
}());

//# sourceMappingURL=ruleList.service.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RuleListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ruleList_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home_component__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__form_form_component__ = __webpack_require__(80);
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
        this.localRuleList = this.cachedRuleList = this.ruleListService.ruleList;
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
            _this.ruleListService.cloneRule(rule);
        });
        this.ngOnInit();
        this.localRuleList.sort(function (a, b) {
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
        var ruleListRowElements = this.ruleListRows.nativeElement.querySelectorAll('input');
        ruleListRowElements.forEach(function (elem) {
            if (elem.checked) {
                elem.click();
            }
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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("ruleListRows"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], RuleListComponent.prototype, "ruleListRows", void 0);
    RuleListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'rule-list',template:/*ion-inline-start:"/Office/Rule-Editor/src/pages/rule-list/rule-list.component.html"*/'<div class="header-2">\n  <div class="header-content">\n    <div class="title-2">\n      <span class="title-a" [navPush]="homePage">Rules Project</span>\n      <span>&nbsp;/&nbsp;</span>\n      <span class="title-b">Loan Exception Rules</span>\n    </div>\n    <span class="buttons">\n      <div class="button-set">\n        <span (click)="cloneRules()" class="duplicate-button"> </span>\n        <span (click)="deleteRules()" class="delete-button"> </span>\n      </div>\n      <!-- <button class="edit-json-button">\n        Edit JSON\n      </button> -->\n      <div class="button-create">\n        <span class="plus"> + </span>\n        <span class="create-rules-project" [navPush]="formPage"> Create New Rule </span>\n      </div>\n    </span>\n  </div>\n</div>\n<div class="body">\n  <div class="table">\n    <div class="table-header-outer">\n      <span class="table-header">\n\n        <div class="col-1" >\n          <input type="checkbox" (click)="tickAll($event)">\n        </div>\n\n        <div class="col-2 sort-down" (click)="sortList(\'rule_name\', $event)">\n          Rule Name\n        </div>\n        <div class="col-3 sort-down" (click)="sortList(\'rule_category\', $event)">\n          Category\n        </div>\n        <div class="col-4 sort-down" (click)="sortList(\'rule_desc\', $event)">\n          Description\n        </div>\n        <div class="col-5 sort-down" (click)="sortList(\'last_modified\', $event)">\n          Last Modified\n        </div>\n        <div class="col-6 sort-down" (click)="sortList(\'last_published\', $event)">\n          Last Published\n        </div>\n        <div class="col-7 sort-down" (click)="sortList(\'rule_author\', $event)">\n          Last Modifier\n        </div>\n        <div class="col-8">\n          <span class="search-button" (click)="showSearch = showSearch ? false : true; localRuleList = cachedRuleList;" [ngClass]="{\'outline\' : showSearch}"></span>\n    </div>\n    </span>\n    <span *ngIf="showSearch" class="table-header">\n        <div class="col-1" >\n        </div>\n        <div class="col-2">\n          <input (keyup)="searchList(\'rule_name\',$event)" value="" type="text">\n        </div>\n        <div class="col-3">\n          <input (keyup)="searchList(\'rule_category\',$event)" value="" type="text">\n        </div>\n        <div class="col-4">\n          <input (keyup)="searchList(\'rule_desc\',$event)" value="" type="text">\n        </div>\n        <div class="col-5">\n          <ng-datepicker [(ngModel)]="searchLastModDate" (ngModelChange)="searchDate(\'last_modified\',searchLastModDate)" [options]="options" position="bottom-right"></ng-datepicker>\n        </div>\n        <div class="col-6">\n          <ng-datepicker [(ngModel)]="searchLastPubDate" [options]="options" (ngModelChange)="searchDate(\'last_published\',searchLastPubDate)" position="bottom-left"></ng-datepicker>\n        </div>\n        <div class="col-7">\n          <input (keyup)="searchList(\'rule_author\',$event)" value="" type="text">\n        </div>\n        <div class="col-8">\n        </div>\n      </span>\n  </div>\n  <div class="table-rows" #ruleListRows>\n    <div *ngFor="let rule of localRuleList" class="table-row" >\n      <div class="col-1">\n        <input type="checkbox" (change)="toggleCheckBox($event, rule)">\n      </div>\n      <div class="col-2" (click)="openRule(rule)">\n        DU Refi Rule [{{rule.rule_name}}]\n      </div>\n      <div class="col-3" (click)="openRule(rule)">\n        {{rule.rule_category.name}}\n      </div>\n      <div class="col-4" title="{{rule.rule_desc}}" (click)="openRule(rule)">\n        {{rule.rule_desc}}\n      </div>\n      <div class="col-5" [navPush]="formPage" (click)="openRule(rule)">\n        {{formatDate(rule.last_modified)}}\n      </div>\n      <div class="col-6" [navPush]="formPage" (click)="openRule(rule)">\n        {{formatDate(rule.last_published)}}\n      </div>\n      <div class="col-7" [navPush]="formPage" (click)="openRule(rule)">\n        {{rule.rule_author}}\n      </div>\n      <div class="col-8" [navPush]="formPage" (click)="openRule(rule)">\n      </div>\n    </div>\n  </div>\n</div>\n</div>'/*ion-inline-end:"/Office/Rule-Editor/src/pages/rule-list/rule-list.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_ruleList_service__["a" /* RuleListService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], RuleListComponent);
    return RuleListComponent;
}());

//# sourceMappingURL=rule-list.component.js.map

/***/ })

},[213]);
//# sourceMappingURL=main.js.map