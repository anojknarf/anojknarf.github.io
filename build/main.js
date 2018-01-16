webpackJsonp([56],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_model_session__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_service_url_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_feedback_exception_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_feedback_feedback_messages__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_feedback_feedback_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(60);
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
    AuthService.prototype.destroy = function () {
        this.session.expire();
        this.session.set("currentUser", null);
        this.currentUser = null;
        this.authentication = false;
    };
    AuthService.prototype.logout = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_6__config_service_url_config__["a" /* Config */].LOGOUT_URL);
    };
    AuthService.prototype.process = function (credentials) {
        var _this = this;
        var loader = this.feedback.getLoader();
        loader.present();
        var queryString = this.http.convertJsonToQueryString({
            "userName-inputEl": credentials.username, "password-inputEl": credentials.password,
        }).toString();
        var headers = new __WEBPACK_IMPORTED_MODULE_10__angular_http__["Headers"]({ "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" });
        return this.http.post(this.loginUrl, queryString, headers)
            .map(function (response) {
            if (response && response.success === true) {
                _this.session.set("currentUser", response);
                _this.currentUser = response;
                _this.authentication = true;
                _this.getAuthUser();
                // this.setLocalStorageUser();
            }
            else {
                throw Error("Authentication Failed");
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
            // this.setLocalStorageUserInfo();
        });
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__common_utils_http_service__["a" /* HttpService */],
        __WEBPACK_IMPORTED_MODULE_4__common_model_session__["a" /* Session */],
        __WEBPACK_IMPORTED_MODULE_7__providers_feedback_exception_service__["a" /* ExceptionService */],
        __WEBPACK_IMPORTED_MODULE_9__providers_feedback_feedback_service__["a" /* FeedbackService */]])
], AuthService);

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackMessage; });
/**
 * Class to define all the feedback message
 *
 * usage: FeedbackMessage.LOGIN_ERROR type is FeedbackMessage
 */
/**
 * Class to define all the feedback message
 *
 * usage: FeedbackMessage.LOGIN_ERROR type is FeedbackMessage
 */ var FeedbackMessage;
(function (FeedbackMessage) {
    FeedbackMessage[FeedbackMessage["GENERIC_ERROR_MESSAGE"] = "Error occured. Please contact the Support team."] = "GENERIC_ERROR_MESSAGE";
    FeedbackMessage[FeedbackMessage["LOGIN_ERROR"] = "Incorrect username and/or password. Please try again."] = "LOGIN_ERROR";
    FeedbackMessage[FeedbackMessage["INSERT_CREDENTIALS"] = "Please enter username and/or password."] = "INSERT_CREDENTIALS";
    FeedbackMessage[FeedbackMessage["NO_CHANGES"] = "No changes are made."] = "NO_CHANGES";
    FeedbackMessage[FeedbackMessage["TASK_UPDATE_SUCCESS"] = "Task updated successfully."] = "TASK_UPDATE_SUCCESS";
    FeedbackMessage[FeedbackMessage["TASK_MANDATORY_CHECK"] = "Please ensure all mandatory fields are selected."] = "TASK_MANDATORY_CHECK";
    FeedbackMessage[FeedbackMessage["TASK_ADD_SUCCESS"] = "Task added successfully."] = "TASK_ADD_SUCCESS";
    FeedbackMessage[FeedbackMessage["QUICK_QUALIFIER_STATE_MISSING"] = "Please select state."] = "QUICK_QUALIFIER_STATE_MISSING";
    FeedbackMessage[FeedbackMessage["QUICK_QUALIFIER_INCOME_MISSING"] = "Monthly income cannot be 0 or empty."] = "QUICK_QUALIFIER_INCOME_MISSING";
    FeedbackMessage[FeedbackMessage["GENERIC_FAILURE"] = "Something went wrong."] = "GENERIC_FAILURE";
    FeedbackMessage[FeedbackMessage["LOAN_UNLOCK_FAILURE"] = "Error occured while unlocking the loan. Please contact the Support team."] = "LOAN_UNLOCK_FAILURE";
    // Schedule
    FeedbackMessage[FeedbackMessage["SCHEDULE_MANDATORY_CHECK"] = "Please ensure all mandatory fields are entered."] = "SCHEDULE_MANDATORY_CHECK";
    FeedbackMessage[FeedbackMessage["START_TIME_BEFORE_END_TIME_VALIDATION"] = "Start time should be before End time."] = "START_TIME_BEFORE_END_TIME_VALIDATION";
    // Loan condition Documents
    FeedbackMessage[FeedbackMessage["DELETE_CONDITION_DOCUMENT_SUCCESS"] = "Document successfully deleted."] = "DELETE_CONDITION_DOCUMENT_SUCCESS";
    FeedbackMessage[FeedbackMessage["DELETE_CONDITION_DOCUMENT_FAIL"] = "Document deletion failed; please try again."] = "DELETE_CONDITION_DOCUMENT_FAIL";
    FeedbackMessage[FeedbackMessage["DELETE_DOCUMENT_CONFIRM_DIALOG"] = "Do you want to delete the document?"] = "DELETE_DOCUMENT_CONFIRM_DIALOG";
    FeedbackMessage[FeedbackMessage["ADD_DOCUMENT_DESCRIPTION_SAVE"] = "Add a description for the attached document."] = "ADD_DOCUMENT_DESCRIPTION_SAVE";
    FeedbackMessage[FeedbackMessage["DOCUMENT_UPLOAD_SUCCESS"] = "Condition document uploaded."] = "DOCUMENT_UPLOAD_SUCCESS";
    FeedbackMessage[FeedbackMessage["DOCUMENT_UPLOAD_FAILURE"] = "Upload failed; please try again."] = "DOCUMENT_UPLOAD_FAILURE";
    // Affordability calculator
    FeedbackMessage[FeedbackMessage["CHECK_FIELDS"] = "Please fill all the fields."] = "CHECK_FIELDS";
    FeedbackMessage[FeedbackMessage["MONTHLY_INCOME_GREATER_THAN_ZERO"] = "Monthly Income should be greater than 0."] = "MONTHLY_INCOME_GREATER_THAN_ZERO";
    FeedbackMessage[FeedbackMessage["RATIO_COMPARISION"] = "Back-end ratio should be greater than front-end ratio."] = "RATIO_COMPARISION";
    FeedbackMessage[FeedbackMessage["LOAN_AMOUNT_GREATER_THAN_ZERO"] = "Loan Amount should be greater than 0."] = "LOAN_AMOUNT_GREATER_THAN_ZERO";
    // Upcoming events
    FeedbackMessage[FeedbackMessage["DELETE_EVENT_CONFIRM_DIALOG_CONTENT"] = "Are you sure you want to delete this event?"] = "DELETE_EVENT_CONFIRM_DIALOG_CONTENT";
    FeedbackMessage[FeedbackMessage["DELETE_EVENT_CONFIRM_DIALOG_TITLE"] = "Confirm Delete"] = "DELETE_EVENT_CONFIRM_DIALOG_TITLE";
    FeedbackMessage[FeedbackMessage["DELETE_EVENT_SUCCESS"] = "Successfully deleted."] = "DELETE_EVENT_SUCCESS";
    FeedbackMessage[FeedbackMessage["EDIT_EVENT_SUCCESS"] = "Event edit successful."] = "EDIT_EVENT_SUCCESS";
    FeedbackMessage[FeedbackMessage["PLEASE_FILL_ALL_FIELDS"] = "Please fill all fields."] = "PLEASE_FILL_ALL_FIELDS";
    FeedbackMessage[FeedbackMessage["ADD_EVENT_SUCCESS"] = "Event added successfully."] = "ADD_EVENT_SUCCESS";
    // My Contacts
    FeedbackMessage[FeedbackMessage["CONTACT_CREATE_SUCCESS_MESSAGE"] = "Contact added successfully."] = "CONTACT_CREATE_SUCCESS_MESSAGE";
    FeedbackMessage[FeedbackMessage["CONTACT_UPDATE_SUCCESS_MESSAGE"] = "Contact updated successfully."] = "CONTACT_UPDATE_SUCCESS_MESSAGE";
    FeedbackMessage[FeedbackMessage["PHONE_NUMBER_VALIDATION_MESSAGE"] = "Phone Number should be 10 digits."] = "PHONE_NUMBER_VALIDATION_MESSAGE";
    FeedbackMessage[FeedbackMessage["EMAIL_PREFERRED_MESSAGE"] = "Preferred email is set to"] = "EMAIL_PREFERRED_MESSAGE";
    FeedbackMessage[FeedbackMessage["PHONE_NUMBER_PREFERRED_MESSAGE"] = "Preferred Phone is set to"] = "PHONE_NUMBER_PREFERRED_MESSAGE";
    // My Referral Partners
    FeedbackMessage[FeedbackMessage["REFERRAL_ACCOUNT_CREATE_SUCCESS_MESSAGE"] = "Referral Account added successfully."] = "REFERRAL_ACCOUNT_CREATE_SUCCESS_MESSAGE";
    FeedbackMessage[FeedbackMessage["REFERRAL_ACCOUNT_UPDATE_SUCCESS_MESSAGE"] = "Referral Account updated successfully."] = "REFERRAL_ACCOUNT_UPDATE_SUCCESS_MESSAGE";
    FeedbackMessage[FeedbackMessage["FORM_DATA_VALIDATION_MESSAGE"] = "Please complete all required fields."] = "FORM_DATA_VALIDATION_MESSAGE";
    FeedbackMessage[FeedbackMessage["REFERRAL_PARTNER_CREATE_SUCCESS_MESSAGE"] = "Referral Partner added successfully."] = "REFERRAL_PARTNER_CREATE_SUCCESS_MESSAGE";
    FeedbackMessage[FeedbackMessage["REFERRAL_PARTNER_UPDATE_SUCCESS_MESSAGE"] = "Referral Partner updated successfully."] = "REFERRAL_PARTNER_UPDATE_SUCCESS_MESSAGE";
    FeedbackMessage[FeedbackMessage["SEARCH_COMPANY_MESSAGE"] = "Search Company name..."] = "SEARCH_COMPANY_MESSAGE";
    // My Quotes
    FeedbackMessage[FeedbackMessage["MANDATORY_FIELDS_NOT_FILLED"] = "Please enter values for all mandatory fields to proceed."] = "MANDATORY_FIELDS_NOT_FILLED";
    FeedbackMessage[FeedbackMessage["QUOTE_CREATED"] = "Quote has been successfully created."] = "QUOTE_CREATED";
    FeedbackMessage[FeedbackMessage["QUOTE_UPDATED"] = "Quote has been successfully updated."] = "QUOTE_UPDATED";
    FeedbackMessage[FeedbackMessage["QUOTE_STATUS_UPDATED"] = "Quote Status successfully updated."] = "QUOTE_STATUS_UPDATED";
    FeedbackMessage[FeedbackMessage["QUOTE_EMAIL_SUCCESS"] = "The PDF has been generated and mailed successfully."] = "QUOTE_EMAIL_SUCCESS";
    FeedbackMessage[FeedbackMessage["QUOTE_PDF_FAIL"] = "There was some problem in generating the PDF."] = "QUOTE_PDF_FAIL";
    FeedbackMessage[FeedbackMessage["QUOTE_PDF_SUCCESS"] = "The PDF has been generated successfully."] = "QUOTE_PDF_SUCCESS";
    FeedbackMessage[FeedbackMessage["QUOTE_NOT_ELIGIBLE"] = "There are no eligible products for the given inputs."] = "QUOTE_NOT_ELIGIBLE";
    // Pricing
    FeedbackMessage[FeedbackMessage["LOAN_PRICING_UPDATE_FAILURE"] = "Something went wrong."] = "LOAN_PRICING_UPDATE_FAILURE";
    // Photo Editor
    FeedbackMessage[FeedbackMessage["PHOTO_UPLOAD_FAILED"] = "Picture upload failed."] = "PHOTO_UPLOAD_FAILED";
    FeedbackMessage[FeedbackMessage["PHOTO_UPLOAD_SUCCESS"] = "Picture uploaded successfully."] = "PHOTO_UPLOAD_SUCCESS";
})(FeedbackMessage || (FeedbackMessage = {}));
//# sourceMappingURL=feedback.messages.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TasksService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SSN_LENGTH = 9;
var PHONE_LENGTH = 10;
var SSN = "ssn";
var PHONE = "phone";
var NAME = "name";
var TasksService = (function () {
    function TasksService(http, filters) {
        this.http = http;
        this.filters = filters;
    }
    TasksService.prototype.getAllLoanTasks = function (params) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_LOAN_TASKS_URL, params);
    };
    TasksService.prototype.changeStatus = function (task, status) {
        task.taskStatusId = status;
        if (task.category === "CONTACT_STANDARD") {
            return this.updateContactTask(task);
        }
        if (task.category === "HOMELOAN_STANDARD") {
            return this.updateLoanTask(task);
        }
    };
    TasksService.prototype.updateContactTask = function (contactTaskRequest) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_CONTACT_TASK, contactTaskRequest);
    };
    TasksService.prototype.updateLoanTask = function (loanTaskRequest) {
        loanTaskRequest.noteText = loanTaskRequest.noteText ?
            loanTaskRequest.noteText : "";
        loanTaskRequest.taskAssignedToTeamId = loanTaskRequest.taskAssignedToTeamId ?
            loanTaskRequest.taskAssignedToTeamId : "";
        loanTaskRequest.taskAssignedToUserTypeId = loanTaskRequest.taskAssignedToUserTypeId ?
            loanTaskRequest.taskAssignedToUserTypeId : "";
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_LOAN_TASK, loanTaskRequest);
    };
    TasksService.prototype.getContactTaskStatusHistory = function (contactTaskStatusHistoryRequest) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_CONTACT_TASK_STATUS_HISTORY, contactTaskStatusHistoryRequest);
    };
    TasksService.prototype.getLoanTaskStatusHistory = function (loanTaskStatusHistoryRequest) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_LOAN_TASK_STATUS_HISTORY, loanTaskStatusHistoryRequest);
    };
    TasksService.prototype.getTaskStatusList = function () {
        var params = {
            page: 1,
            start: 0,
            limit: 25,
        };
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_TASK_STATUS, params);
    };
    TasksService.prototype.getUsersList = function () {
        var params = {
            page: 1,
            start: 0,
            limit: 25,
        };
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_USERS, params);
    };
    TasksService.prototype.searchContacts = function (searchString) {
        var searchobj = {
            searchparams: {},
            searchtotal: "",
            currentpage: "",
        };
        var params = {
            advSearchYn: true,
            page: 1,
            start: 0,
            limit: 25,
        };
        if (Number(searchString)) {
            if (searchString.length === SSN_LENGTH) {
                params[SSN] = __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].formatSSN(searchString);
            }
            if (searchString.length === PHONE_LENGTH) {
                params[PHONE] = __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].formatPhoneNumber(searchString);
            }
        }
        else {
            params[NAME] = searchString;
        }
        searchobj.searchparams = params;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CONTACT_FLEX_FIND, searchobj.searchparams);
    };
    TasksService.prototype.searchReferrals = function (searchString) {
        var params = {
            searchType: "simple",
            page: 1,
            start: 0,
            limit: 25,
            flexValue: "",
        };
        if (Number(searchString)) {
            if (searchString.length === PHONE_LENGTH) {
                params.flexValue = __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].formatPhoneNumber(searchString);
            }
        }
        else {
            params.flexValue = searchString;
        }
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_REFERRAL_ACCOUNTS, params);
    };
    TasksService.prototype.searchLoans = function (query) {
        var searchParam = {
            flexValue: query,
            advSearchYn: false,
            page: 1,
            start: 0,
            limit: 25,
        };
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LOAN_SEARCH_URL, searchParam);
    };
    TasksService.prototype.getTaskItems = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].TASK_ITEMS);
    };
    TasksService.prototype.getTaskCatagories = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].TASK_CATEGORIES);
    };
    TasksService.prototype.saveTask = function (type, params) {
        var URL = (type === "Loan")
            ? __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].ADD_TASK_LOAN
            : (type === "Contact")
                ? __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].ADD_TASK_CONTACT
                : __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].ADD_TASK_REFERRAL;
        return this.http.post(URL, params);
    };
    TasksService.prototype.getTasksList = function (url, params) {
        return this.http.get(url, params);
    };
    TasksService.prototype.getAllTasks = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_ALL_TASKS_URL);
    };
    TasksService.prototype.getTaskDetails = function (taskId) {
        var taskDetailsParam = {
            id: taskId,
        };
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].TASK_DETAILS, taskDetailsParam);
    };
    return TasksService;
}());
TasksService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */]])
], TasksService);

//# sourceMappingURL=tasks.service.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_service_url_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// tslint:disable max-line-length






var ScheduleService = (function () {
    function ScheduleService(http) {
        this.http = http;
    }
    ScheduleService.prototype.getAppointments = function (startDate, endDate) {
        var params = {
            startDate: startDate,
            endDate: endDate,
        };
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].LIST_APPOINTMENTS_URL, params);
    };
    ScheduleService.prototype.createScheduleDetails = function (schedule) {
        if (!schedule) {
            return {};
        }
        return {
            comment: schedule.hasOwnProperty("comment") ? schedule.comment : "",
            contacts: schedule.contacts,
            referralPartners: schedule.referralPartners,
            description: schedule.description,
            reminder: schedule.hasOwnProperty("reminder") ? schedule.reminder : "",
            startDate: schedule.hasOwnProperty("startDateTime") ? __WEBPACK_IMPORTED_MODULE_2_moment___default()(schedule.startDateTime).format("dddd Do MMMM YYYY") : "No Start DateTime",
            startTime: schedule.hasOwnProperty("startDateTime") ? __WEBPACK_IMPORTED_MODULE_2_moment___default()(schedule.startDateTime).format("LT") : "No Start Time",
            endTime: schedule.hasOwnProperty("endDateTime") ? __WEBPACK_IMPORTED_MODULE_2_moment___default()(schedule.endDateTime).format("LT") : "No End Time",
        };
    };
    ScheduleService.prototype.deleteAppointment = function (scheduleId) {
        var params = {
            appointmentId: scheduleId,
        };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].DELETE_UPPOINTMENT_URL, params);
    };
    ScheduleService.prototype.addAppointment = function (appointmentRequest) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].ADD_APPOINTMENT, appointmentRequest);
    };
    ScheduleService.prototype.editAppointment = function (appointmentRequest) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].EDIT_APPOINTMENT, appointmentRequest);
    };
    ScheduleService.prototype.getUsersList = function () {
        var params = {
            page: 1,
            start: 0,
            limit: 25,
        };
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].LIST_USERS, params);
    };
    ScheduleService.prototype.getAppointmentDetails = function (appointmentId) {
        var params = { appointmentId: appointmentId };
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].READ_APPOINTMENT_DETAILS, params);
    };
    ScheduleService.prototype.getMyScheduleForToday = function () {
        var fromDate = __WEBPACK_IMPORTED_MODULE_2_moment___default.a.utc().format();
        var toDate = __WEBPACK_IMPORTED_MODULE_2_moment___default()().format("YYYY-MM-DD") + "T23:59:59Z";
        return this.getAppointments(fromDate, toDate).catch(function (response) { return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of({}); });
    };
    return ScheduleService;
}());
ScheduleService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__common_utils_http_service__["a" /* HttpService */]])
], ScheduleService);

//# sourceMappingURL=schedule.service.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the HomeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var HomeService = (function () {
    function HomeService(http) {
        this.http = http;
    }
    HomeService.prototype.getDashboardCounts = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].COUNT_LIST);
    };
    HomeService.prototype.getLoanCounts = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LOAN_LIST_URL, { start: 0, limit: 1 });
    };
    HomeService.prototype.getPipelineCounts = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].PIPLINE_SUMMARY_URL);
    };
    HomeService.prototype.getReferralCounts = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_REFERRAL_ACCOUNTS);
    };
    HomeService.prototype.getAppointmentsCounts = function (startDate, endDate) {
        var params = {
            startDate: startDate,
            endDate: endDate,
        };
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_APPOINTMENTS_URL, params);
    };
    return HomeService;
}());
HomeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */]])
], HomeService);

//# sourceMappingURL=home.service.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpcomingEventsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CONTACT_DETAILS_URL = __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CONTACT_DETAILS_URL, CREATE_EVENT_URL = __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CREATE_EVENT_URL, DELETE_EVENT_URL = __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].DELETE_EVENT_URL, GET_EVENT_TYPES = __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_EVENT_TYPES, LIST_EVENTS_URL = __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_EVENTS_URL, UPDATE_EVENT_URL = __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_EVENT_URL;
var UpcomingEventsService = (function () {
    function UpcomingEventsService(http) {
        this.http = http;
    }
    /**
     * Returns event types
     * @return { Observable }
     * {
     *  "total": 5,
     *   "data": [
     *      {
     *         "id": 1,
     *         "dateTypeId": "BIRTHDAY",
     *         "dateTypeDesc": "Birthday"
     *      }...
     *  }
     */
    UpcomingEventsService.prototype.getUpcomingEvents = function () {
        var params = { page: 1, start: 0, limit: 25, contactId: 3245, dueBy: "END_OF_MONTH" };
        return this.http.get(LIST_EVENTS_URL, params);
    };
    UpcomingEventsService.prototype.getUpcomingEventsForToday = function () {
        var params = { page: 1, start: 0, limit: 25, contactId: 3245, dueBy: "END_OF_DAY" };
        return this.http.get(LIST_EVENTS_URL, params).catch(function (response) { return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of({}); });
    };
    UpcomingEventsService.prototype.getContactDetails = function (contactId) {
        var params = { id: 3245 };
        return this.http.get(CONTACT_DETAILS_URL, params);
    };
    UpcomingEventsService.prototype.addEvent = function (eventDetails) {
        return this.http.post(CREATE_EVENT_URL, eventDetails);
    };
    UpcomingEventsService.prototype.updateEvent = function (eventDetails) {
        return this.http.post(UPDATE_EVENT_URL, eventDetails);
    };
    UpcomingEventsService.prototype.deleteEvent = function (eventId) {
        var accToken = this.http.getAccessToken();
        var url = DELETE_EVENT_URL + "?access_token=" + accToken + "&id=" + eventId;
        return fetch(url, { method: "post" })
            .then(function (res) { return res.json(); });
        // return this.http.post(DELETE_EVENT_URL, {id: eventId});
    };
    return UpcomingEventsService;
}());
UpcomingEventsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */]])
], UpcomingEventsService);

//# sourceMappingURL=upcoming-events.service.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MenuService = (function () {
    function MenuService(platform) {
        this.platform = platform;
        this.menuToggle = true;
        this.menuToggle = (this.platform.is("core") || this.platform.is("tablet")) ? true : false;
    }
    MenuService.prototype.shouldShow = function () {
        return this.menuToggle;
    };
    MenuService.prototype.toggleShow = function () {
        this.menuToggle = this.menuToggle ? false : true;
        this.shouldShow();
    };
    MenuService.prototype.resetToggle = function () {
        this.menuToggle = true;
    };
    MenuService.prototype.showHideMenu = function (show) {
        this.menuToggle = show;
        this.shouldShow();
    };
    return MenuService;
}());
MenuService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */]])
], MenuService);

//# sourceMappingURL=menu.service.js.map

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* unused harmony export CONTENT_TYPE_FORM */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_session__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_feedback_feedback_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_feedback_exception_service__ = __webpack_require__(63);
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
    function HttpService(http, session, feedbackService, exceptionService) {
        this.http = http;
        this.session = session;
        this.feedbackService = feedbackService;
        this.exceptionService = exceptionService;
        this.hasSessionExpired = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.hasSessionExpiredObservable = this.hasSessionExpired.asObservable();
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
        if (!headers) {
            headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        }
        headers.append("Accept", "application/json");
        headers.append("X-Requested-With", "XMLHttpRequest");
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers, withCredentials: true });
        return this.intercept(this.http.post(authUrl, body, options));
    };
    HttpService.prototype.postFile = function (url, body) {
        var authUrl = this.addAccesstokenToUrl(url);
        var opts = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({
            responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["ResponseContentType"].ArrayBuffer,
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
        var reqParams = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        for (var _i = 0, _a = Object.keys(params); _i < _a.length; _i++) {
            var key = _a[_i];
            reqParams.set(key, params[key]);
        }
        return reqParams;
    };
    HttpService.prototype.getRequestOptions = function (params, headers) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]();
        options.search = this.convertJsonToQueryString(params);
        if (!headers) {
            headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        }
        headers.append("Accept", "application/json");
        headers.append("X-Requested-With", "XMLHttpRequest");
        options.headers = headers;
        options.withCredentials = true;
        return options;
    };
    HttpService.prototype.onCatch = function (error, caught) {
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error);
    };
    HttpService.prototype.onSubscribeSuccess = function (response) {
        this.hasSessionExpired.next(false);
    };
    HttpService.prototype.onSubscribeError = function (error) {
        // tslint:disable:no-magic-numbers
        if ((error.status === 0 && error.type === 3) || error.status === 401) {
            this.hasSessionExpired.next(true);
        }
    };
    HttpService.prototype.onFinally = function () {
        // Todo
    };
    HttpService.prototype.addAccesstokenToUrl = function (serviceURL) {
        var accessToken = this.getAccessToken();
        if (serviceURL && accessToken) {
            serviceURL += "?access_token=" + accessToken;
        }
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
        return observable
            .map(function (response) { return response.json(); })
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
    return HttpService;
}());
HttpService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__model_session__["a" /* Session */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__model_session__["a" /* Session */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__providers_feedback_feedback_service__["a" /* FeedbackService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_feedback_feedback_service__["a" /* FeedbackService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__providers_feedback_exception_service__["a" /* ExceptionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_feedback_exception_service__["a" /* ExceptionService */]) === "function" && _d || Object])
], HttpService);

var CONTENT_TYPE_FORM = "Content-Type: application/x-www-form-urlencoded";
var _a, _b, _c, _d;
//# sourceMappingURL=http.service.js.map

/***/ }),

/***/ 155:
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
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
/* tslint:disable max-line-length*/
var Config = (function () {
    function Config() {
    }
    return Config;
}());

Config.LOGIN_URL = "https://blooming-badlands-78815.herokuapp.com/login";
Config.LOGOUT_URL = BASE_URL + "crm/login/logout";
Config.USER_URL = BASE_URL + "crm/login/loginInfo";
// Dashboard
Config.COUNT_LIST = BASE_URL + "crm/dashboard/getDashboardData";
// Contacts
Config.RECENT_CONTACT_URL = BASE_URL + "crm/contact/recentList";
Config.CONTACT_LIST_URL = BASE_URL + "crm/contact/myList";
Config.CONTACT_SEARCH_URL = BASE_URL + "crm/contact/flexFind";
Config.CONTACT_GET_COUNTS = BASE_URL + "crm/contact/myList";
Config.CONTACT_FLEX_FIND = BASE_URL + "crm/contact/flexFind";
Config.LOAN_LIST_URL = BASE_URL + "crm/loan/myLoans";
Config.LOAN_RECENT_LIST = BASE_URL + "crm/loan/recentLoans";
Config.LOAN_SEARCH_URL = BASE_URL + "crm/loan/searchLoans";
// Loan advanced search
Config.LOAN_PURPOSE_TYPES = BASE_URL + "crm/ref/loanPurposeTypes";
Config.LOAN_STATUS_TYPES = BASE_URL + "crm/ref/loanStatusTypes";
Config.LOAN_LOCK_STATUS_TYPES = BASE_URL + "crm/ref/loanLockStatusTypes";
Config.TASKS_GET_COUNT = BASE_URL + "crm/contactTask/listMyTasks";
Config.CONTACT_LOANCOUNTS_URL = BASE_URL + "crm/contact/listLoans";
Config.CONTACT_DETAILS_URL = BASE_URL + "crm/contact/read";
Config.PIPLINE_SUMMARY_URL = BASE_URL + "crm/pipeline/summaryAmounts";
Config.UNLOCKED_LOANS_COUNT = BASE_URL + "crm/sfa/getMyUnlockedLoansCount";
Config.UNLOCKED_LOANS_LIST = BASE_URL + "crm/sfa/listMyUnlockedLoans";
Config.EXPIRED_LOANS_COUNT = BASE_URL + "crm/sfa/getMyLockExpiredLoansCount";
Config.EXPIRED_LOANS_LIST = BASE_URL + "crm/sfa/listMyLockExpiredLoans";
Config.EXPIRING_LOANS_COUNT = BASE_URL + "crm/sfa/getMyLockExpiringLoansCount";
Config.EXPIRING_LOANS_LIST = BASE_URL + "crm/sfa/listMyLockExpiringLoans";
// Loan Summary
Config.LOAN_SUMMARY_AGGREGATOR_API = BASE_URL + "crm/sfa/loanSummary";
Config.LOAN_READ_SUMMARY_URL = BASE_URL + "crm/loan/readSummary";
Config.OPEN_LOAN_URL = BASE_URL + "crm/loan/openLoan";
Config.BORROWER_DETAILS_BY_LOAN_URL = BASE_URL + "crm/loan/getBorrowerDetailsByLoan";
Config.READ_SUBJECT_PROPERTY_URL = BASE_URL + "crm/loanAppPropertyExpense/readSubjectProperty";
Config.READ_EXISTING_LOAN_APP_URL = BASE_URL + "crm/loanAppBorrower/readExistingLoanApp";
// Loan Lock status check
Config.GET_LOAN_LOCKED_STATUS = BASE_URL + "crm/loan/isLoanLocked";
Config.UNLOCK_LOCKED_LOANS = BASE_URL + "crm/loan/unlockMyLoans";
// Loan Conditions list
Config.LOAN_CONDITIONS_LIST = BASE_URL + "crm/conditions/list";
// Loan Condition api to list attached files
Config.LOAN_CONDITION_LIST_FILES = BASE_URL + "crm/conditions/listFilesByCondition";
// Download Loan condition
Config.LOAN_CONDITION_FILE_DOWNLOAD = BASE_URL + "crm/conditions/downloadFile";
// Delete condition document
Config.LOAN_CONDITION_FILE_DELETE = BASE_URL + "crm/conditions/deleteCondDocumentRecord";
// file upload
Config.LOAN_CONDITION_FILE_UPLOAD = BASE_URL + "crm/conditionImageUpload/addImages";
// Add and Edit Contact
Config.SALUTATION_URL = BASE_URL + "crm/ref/salutations";
Config.TELEPHONETYPES_URL = BASE_URL + "crm/ref/telephoneTypes";
Config.CONTACTTYPES_URL = BASE_URL + "crm/ref/contactTypes";
Config.CITYSTATELOOKUP_URL = BASE_URL + "crm/zip/cityStateLookup";
Config.STATELOOKUP_URL = BASE_URL + "crm/ref/states";
Config.CREATECONTACT_URL = BASE_URL + "crm/contact/createContact";
Config.UPDATECONTACT_URL = BASE_URL + "crm/contact/update";
// Notes
Config.NOTES_LIST_URL = BASE_URL + "crm/contact/listNotes";
Config.NOTES_SAVE_URL = BASE_URL + "crm/contact/saveNote";
Config.NOTES_COND_LIST_URL = BASE_URL + "crm/conditions/listNotes";
Config.NOTES_COND_SAVE_URL = BASE_URL + "crm/conditions/saveNote";
Config.NOTES_LOAN_TASK_LIST_URL = BASE_URL + "crm/loanTask/listTaskNotes";
Config.NOTES_LOAN_TASK_SAVE_URL = BASE_URL + "crm/loanTask/saveTaskNote";
Config.NOTES_CONTACT_TASK_LIST_URL = BASE_URL + "crm/contactTask/listTaskNotes";
Config.NOTES_CONTACT_TASK_SAVE_URL = BASE_URL + "crm/contactTask/saveTaskNote";
// Communication and Contact activites
Config.COMMUNICATION_ACTIVITIES_URL = BASE_URL + "crm/contact/listCommunicationActivities";
Config.CONTACT_ACTIVITIES_URL = BASE_URL + "crm/contact/listActivities";
Config.ADD_CONTACT_ACTIVITY_URL = BASE_URL + "crm/activity/addContactActivity";
Config.UPDATE_RECENT_CONTACT_URL = BASE_URL + "crm/contact/updateRecentList";
// Tools
Config.QUICK_QUALIFIER_URL = BASE_URL + "crm/quote/quickQualifierEstimates";
// Refinance Calculator
Config.REFINANCE_CALCULATOR = BASE_URL + "lendingservices/calcs/principalAndInterest";
Config.LOAN_TYPE = BASE_URL + "crm/calculators/app/data/LoanType.json";
Config.LENDING_SERVICES_CALCULATOR = BASE_URL + "lendingservices/calcs/";
Config.AFFORDABILITY_CALCULATOR = Config.LENDING_SERVICES_CALCULATOR + "affordability";
Config.REQUIRED_INCOME_CALCULATOR = Config.LENDING_SERVICES_CALCULATOR + "requiredIncome";
Config.MAX_LOAN_AMOUNT_CALCULATOR = Config.LENDING_SERVICES_CALCULATOR + "maxLoanAmount";
Config.ADDITIONAL_PAYMENT_CALCULATOR = Config.LENDING_SERVICES_CALCULATOR + "AmortizationSchedule";
// Schedule
Config.ADD_APPOINTMENT = BASE_URL + "crm/appointments/createSysUserAppointment";
Config.EDIT_APPOINTMENT = BASE_URL + "crm/appointments/updateSysUserAppointment";
Config.DELETE_UPPOINTMENT_URL = BASE_URL + "crm/appointments/deleteSysUserAppointment";
Config.LIST_APPOINTMENTS_URL = BASE_URL + "crm/appointments/listSysUserAppointments";
Config.READ_APPOINTMENT_DETAILS = BASE_URL + "crm/appointments/readAppointment";
// TASKS
Config.LIST_CONTACT_TASK_STATUS_HISTORY = BASE_URL + "crm/contactTask/listTaskStatusHistory";
Config.LIST_LOAN_TASK_STATUS_HISTORY = BASE_URL + "crm/loanTask/listTaskStatusHistory";
Config.LIST_TASK_STATUS = BASE_URL + "crm/ref/taskStatuses";
Config.LIST_USER_TEAMS = BASE_URL + "crm/ref/userTeams";
Config.LIST_USERS = BASE_URL + "crm/ref/userList";
Config.UPDATE_CONTACT_TASK = BASE_URL + "crm/contactTask/updateTask";
Config.UPDATE_LOAN_TASK = BASE_URL + "crm/loanTask/updateTask";
Config.LIST_ALL_TASKS_URL = BASE_URL + "crm/sfa/listMyTasks";
Config.LIST_DUE_TASKS_URL = BASE_URL + "crm/sfa/listMyDueTasks";
Config.LIST_CONTACT_TASKS_URL = BASE_URL + "crm/contactTask/listMyTasks";
Config.LIST_LOAN_TASKS_URL = BASE_URL + "crm/loanTask/listMyTasks";
Config.TASK_ITEMS = BASE_URL + "crm/ref/taskItems";
Config.TASK_CATEGORIES = BASE_URL + "crm/ref/taskCategoryTypes";
Config.ADD_TASK_LOAN = BASE_URL + "crm/loanTask/createTask";
Config.ADD_TASK_CONTACT = BASE_URL + "crm/contactTask/createTask";
Config.ADD_TASK_REFERRAL = BASE_URL + "crm/referralContactTask/createTask";
Config.TASK_DETAILS = BASE_URL + "crm/readTaskInfo";
// Filestack
Config.GET_FILE_STACK_PROPERTIES_URL = BASE_URL + "crm/fileStack/getFileStackProperties";
Config.ADD_LOAN_CONDITION_DOCUMENT = BASE_URL + "crm/fileStack/addLoanConditionDocument";
// Upcoming Events
Config.GET_EVENT_TYPES = BASE_URL + "crm/ref/dateTypes";
Config.DELETE_EVENT_URL = BASE_URL + "crm/contact/deleteContactDate";
Config.CREATE_EVENT_URL = BASE_URL + "crm/contact/createContactDate";
Config.UPDATE_EVENT_URL = BASE_URL + "crm/contact/updateContactDate";
Config.LIST_EVENTS_URL = BASE_URL + "crm/sfa/listMyDueContactEvents";
// public static LIST_EVENTS_URL = BASE_URL + "crm/contact/listContactDates";
Config.INTEGRATION_OUTLOOK_APPOINMENT = "https://btech-dev2.bluesageusa.com:8081/outlook/appoinment";
Config.LIST_REFERRAL_ACCOUNTS = BASE_URL + "crm/referralContact/listReferralPartners";
Config.LIST_REFERRAL_CONTACTS = BASE_URL + "crm/referralContact/listReferralPartnerAssociates";
Config.LIST_REFERRAL_ACCOUNT_CONTACTS = BASE_URL + "crm/referralContact/listAssociateNamesByPartner";
// Referral Partners
Config.REFERRAL_CONTACT_DETAILS = BASE_URL + "crm/referralContact/readPartnerAssociate";
Config.REFERRAL_ACCOUNT_DETAILS = BASE_URL + "crm/referralContact/readPartner";
Config.CREATE_REFERRAL_ACCOUNT = BASE_URL + "crm/referralContact/createPartner";
Config.UPDATE_REFERRAL_ACCOUNT = BASE_URL + "crm/referralContact/updatePartner";
Config.CREATE_REFERRAL_PARTNER = BASE_URL + "crm/referralContact/createPartnerAssociate";
Config.UPDATE_REFERRAL_PARTNER = BASE_URL + "crm/referralContact/updatePartnerAssociate";
Config.SEARCH_COMPANY_NAMES = BASE_URL + "crm/referralContact/getCompanyNames";
Config.SEARCH_COMPANY_ASSOCIATE = BASE_URL + "crm/referralContact/searchCompanyAssociate";
// Quotes
Config.RECENT_QUOTES = BASE_URL + "crm/quote/recentQuotes";
Config.QUOTES = BASE_URL + "crm/quote/myQuotes";
Config.SEARCH_QUOTES = BASE_URL + "crm/quote/searchQuotes";
Config.UPDATE_QUOTES_STATUS = BASE_URL + "crm/quote/updateQuoteStatus";
// Quotes static lookups
Config.LEAD_TYPES = BASE_URL + "crm/ref/leadTypes";
Config.LEAD_SOURCES = BASE_URL + "crm/ref/leadSources";
Config.QUOTE_STATUS = BASE_URL + "crm/ref/quoteStatusTypes";
Config.BUILDING_TYPES = BASE_URL + "crm/ref/buildingTypes";
Config.PROJ_CLASS_TYPES = BASE_URL + "crm/ref/projClassTypes";
Config.REFI_PURPOSE_TYPES = BASE_URL + "crm/ref/refiPurposeTypes";
Config.PMI_PLAN_TYPES = BASE_URL + "crm/ref/pmiPlanTypes";
Config.CREDIT_RATINGS = BASE_URL + "crm/ref/creditRatings";
Config.RATE_LOCK_TYPE = BASE_URL + "crm/ref/rateLockTypes";
Config.PRODUCT_PRICING_TEMPLATES = BASE_URL + "ref/productPricingTemplates";
Config.COUNTIES = BASE_URL + "crm/ref/countiesLookup";
Config.TAX_RATE = BASE_URL + "crm/quote/getTaxAndInsRates";
Config.AVAILABLE_QUOTE_STATUSES = BASE_URL + "crm/quote/getAvailableQuoteStatuses";
Config.MORTGAGE_TYPES = BASE_URL + "crm/ref/mortgageTypes";
Config.LIABILITY_STATUS_TYPES = BASE_URL + "crm/ref/liabilityStatusTypes";
Config.QUOTES_STATS = BASE_URL + "crm/sfa/getMyQuotesStatusTotals";
// Quotes weather info
Config.WEATHER_INFO = BASE_URL + "crm/quote/getWeatherInfo";
// Quotes core operations
Config.OPEN_QUOTE = BASE_URL + "crm/quote/openQuote";
Config.READ_QUOTE = BASE_URL + "crm/quote/readQuote";
Config.RATE_EXISTS = BASE_URL + "crm/quote/ratesExist";
Config.CALC_LTV_RATIO = BASE_URL + "crm/quote/calcLTVRatios";
Config.CREATE_QUOTE = BASE_URL + "crm/quote/createQuote";
Config.QUOTES_UPDATE_PURPOSE_PROPERTY = BASE_URL + "crm/quote/updateQuotePurposeAndProperty";
Config.UPDATE_QUOTE_PURCHASE_LOAN_SCENARIO = BASE_URL + "crm/quote/updatePurchaseLoanScenario";
Config.UPDATE_QUOTE_REFINANCE_LOAN_SCENARIO = BASE_URL + "crm/quote/updateRefinanceLoanScenario";
Config.UPDATE_QUOTE_EQUITY_LOAN_SCENARIO = BASE_URL + "crm/quote/updateEquityLoanScenario";
Config.GET_QUOTE_RESULTS = BASE_URL + "crm/quote/price";
Config.UPDATE_QUOTE_DESIRED_PRODUCTS = BASE_URL + "crm/quote/updateQuoteDesiredProducts";
Config.UPDATE_QUOTE_PRICING_GOALS = BASE_URL + "crm/quote/updateQuotePricingGoals";
Config.READ_QUOTE_STATUS = BASE_URL + "crm/quote/readQuoteStatus";
Config.UPDATE_EXISTING_LIENS = BASE_URL + "crm/quote/updateQuoteExistingLiens";
Config.DOWNLOAD_PDF = BASE_URL + "crm/quote/printProductCompareDocument";
Config.EMAIL_PDF = BASE_URL + "crm/quote/emailProductCompareDocument";
Config.QUOTE_GET_NOTES = BASE_URL + "crm/quote/listNotes";
Config.QUOTE_SAVE_NOTES = BASE_URL + "crm/quote/saveNote";
Config.PAYMENT_BALANCE = BASE_URL + "crm/quote/calcPaymentAndBalance";
Config.QUOTE_FEES = BASE_URL + "crm/quote/getFees";
Config.QUOTE_RATES = BASE_URL + "crm/quote/getRates";
Config.UPDATE_QUOTE_HOME = BASE_URL + "crm/quote/updateQuoteHome";
// Pricing section
Config.GET_SUBJECT_PROPERTY_TYPES = BASE_URL + "crm/ref/buildingTypes";
Config.GET_PROJECT_TYPES = BASE_URL + "crm/ref/projClassTypes";
Config.GET_PROPERTY_TYPES = BASE_URL + "crm/ref/propertyTypes";
Config.UPDATE_PROPERTY_INFO = BASE_URL + "crm/property/updateProperty";
Config.GET_LOAN_HEADER_INFO = BASE_URL + "crm/loan/getLoanHeaderInfo";
Config.GET_LOAN_PURPOSES = BASE_URL + "crm/ref/loanPurposeTypes";
Config.GET_REFINANCE_PURPOSES = BASE_URL + "crm/ref/refiPurposeTypes";
Config.GET_DOCUMENTATION_TYPES = BASE_URL + "crm/ref/documentationTypes";
Config.GET_OCCUPANCY_TYPES = BASE_URL + "crm/ref/occupancyTypes";
Config.SAVE_ALL_LOAN_TERMS = BASE_URL + "crm/retailLoanTerms/saveAllLoanTerms";
Config.GET_LOCK_PERIODS = BASE_URL + "crm/ref/rateLockTypes";
Config.GET_PRICING_RATELOCK_INFO = BASE_URL + "crm/retailPricing/getPricingAndRateLockInfo";
Config.GET_HOME_LOAN_MAPPING_DATA = BASE_URL + "crm/loan/homeLoanMappingData";
Config.GET_RETAIL_LOAN_TERMS = BASE_URL + "crm/retailLoanTerms/read";
Config.GET_PRICING_HISTORY = BASE_URL + "crm/retailPricing/listPriceHistory";
Config.GET_RATES = BASE_URL + "crm/retailPricing/getPricingTotals";
Config.GET_PRICING_ADJUSTMENTS = BASE_URL + "crm/retailPricing/getPricingAdjustments";
Config.UPDATE_PRICING = BASE_URL + "crm/retailPricing/updatePricing";
Config.GET_CORE_CHANGE_REASONS = BASE_URL + "crm/ref/changeReasonTypes";
Config.GET_EXCEPTION_TYPES = BASE_URL + "crm/ref/pricingExceptionTypes";
Config.GET_LOAN_TYPES = BASE_URL + "crm/ref/listLoanTypes";
Config.GET_LIEN_TYPES = BASE_URL + "crm/ref/lienTypes";
Config.GET_PRICING_TIERS = BASE_URL + "crm/ref/pricingTiers";
Config.GET_AMORTIZATION_TYPES = BASE_URL + "crm/ref/amortizationTypes";
Config.GET_PRODUCT_TYPES = BASE_URL + "crm/ref/productPricingTemplates";
Config.GET_INVESTOR_INFO = BASE_URL + "crm/ref/investorInfos";
Config.READ_LOAN_TERMS = BASE_URL + "crm/loanAppLoanTerms/readTerms";
Config.GET_LENDER_INFOS = BASE_URL + "crm/ref/lenderInfos";
Config.GET_FULFILLMENT_CENTERS = BASE_URL + "crm/ref/fulfillmentCenters";
Config.GET_SALES_REGIONS = BASE_URL + "crm/ref/salesRegions";
Config.GET_SALES_BRANCHES = BASE_URL + "crm/ref/salesBranches";
Config.GET_MARKET_TYPES = BASE_URL + "crm/ref/marketTypes";
Config.GET_LEAD_TYPES = BASE_URL + "crm/ref/leadTypes";
Config.GET_LEAD_SOURCES = BASE_URL + "crm/ref/leadSources";
Config.GET_USERTEAMS = BASE_URL + "crm/ref/userTeams";
Config.GET_BROKERINFOS = BASE_URL + "crm/ref/brokerInfos";
Config.GET_SUB_CHANNELS = BASE_URL + "crm/ref/subChannels";
Config.GET_SALESSUBREGIONS = BASE_URL + "crm/ref/salesSubRegions";
Config.GET_PRODUCT_PRICING_MAPPINGS = BASE_URL + "crm/ref/productPricingMappings";
Config.GET_BROKER_TYPES = BASE_URL + "crm/ref/listRefBrokerTypes";
Config.GET_CHANNELS = BASE_URL + "crm/ref/channels";
Config.GET_PROMOTIONS = BASE_URL + "crm/loanAppLoanSource/listPromotions";
Config.GET_ASSIGNED_TEAMS = BASE_URL + "crm/loanAppAssignment/getAssignedTeams";
Config.GET_ASSIGNED_USERS = BASE_URL + "crm/loanAppAssignment/getAssignedUsers";
Config.GET_LOAN_MAPPING_DATA = BASE_URL + "crm/loan/homeLoanMappingData";
Config.GET_LOAN_SOURCE_DETAILS = BASE_URL + "crm/loanAppLoanSource/read";
// Stats section
Config.GET_COMPARE_QUOTES_CONVERSION = BASE_URL + "crm/sfa/compareQuotesConversion";
Config.GET_AVERAGE_QUOTES_CONVERSION = BASE_URL + "crm/sfa/getAverageConvertedQuotesTotals";
Config.GET_MY_QUOTES_CONVERSION = BASE_URL + "crm/sfa/getMyConvertedQuotesTotals";
Config.GET_MY_CLOSED_LOANS_FUNDED = BASE_URL + "crm/sfa/getMyClosedLoansMonthlyTotals";
Config.GET_AVG_CLOSED_LOANS_FUNDED = BASE_URL + "crm/sfa/getAllClosedLoansMonthlyTotals";
Config.GET_MY_CLOSED_LOANS_ADVERSED = BASE_URL + "crm/sfa/getMyAdverseActionedLoansMonthlyTotals";
Config.GET_AVG_CLOSED_LOANS_ADVERSED = BASE_URL + "crm/sfa/getAllAdverseActionedLoansMonthlyTotals";
Config.GET_MY_CLOSED_LOANS_ORIGIN = BASE_URL + "crm/sfa/getMyOriginatedLoansMonthlyTotals";
Config.GET_AVG_CLOSED_LOANS_ORIGIN = BASE_URL + "crm/sfa/getAllOriginatedLoansMonthlyTotals";
//# sourceMappingURL=service-url.config.js.map

/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/mobile/dashboard/dashboard.module": [
		726,
		0
	],
	"../pages/mobile/dashboard/edit-dashboard/edit-dashboard.module": [
		727,
		55
	],
	"../pages/mobile/home/home.module": [
		725,
		54
	],
	"../pages/mobile/loans/advanced-search/advanced-search.module": [
		729,
		34
	],
	"../pages/mobile/loans/condition-summary/condition-summary.module": [
		730,
		4
	],
	"../pages/mobile/loans/conditions/conditions.module": [
		723,
		13
	],
	"../pages/mobile/loans/documents/documents.module": [
		721,
		20
	],
	"../pages/mobile/loans/loan-summary/loan-summary.module": [
		731,
		10
	],
	"../pages/mobile/loans/loans.module": [
		728,
		2
	],
	"../pages/mobile/loans/pricing-history/pricing-history.module": [
		733,
		53
	],
	"../pages/mobile/loans/pricing/pricing.module": [
		732,
		9
	],
	"../pages/mobile/loans/select-rate/select-rate.module": [
		734,
		52
	],
	"../pages/mobile/login/login.module": [
		735,
		51
	],
	"../pages/mobile/my-contacts/add-edit-contact/add-edit-contact.module": [
		737,
		26
	],
	"../pages/mobile/my-contacts/communication-log/communication-log.module": [
		738,
		31
	],
	"../pages/mobile/my-contacts/contact-details/contact-details.module": [
		739,
		14
	],
	"../pages/mobile/my-contacts/my-contacts.module": [
		736,
		16
	],
	"../pages/mobile/my-quotes/advanced-search/advanced-search.module": [
		741,
		35
	],
	"../pages/mobile/my-quotes/eligible-products/eligible-products.module": [
		742,
		50
	],
	"../pages/mobile/my-quotes/loan-calculator/loan-calculator.module": [
		743,
		49
	],
	"../pages/mobile/my-quotes/my-quotes.module": [
		740,
		8
	],
	"../pages/mobile/my-quotes/new-quote/new-quote.module": [
		744,
		12
	],
	"../pages/mobile/my-quotes/quotes-calculator/quotes-calculator.module": [
		745,
		48
	],
	"../pages/mobile/my-quotes/quotes-comparison/quotes-comparison.module": [
		746,
		47
	],
	"../pages/mobile/my-quotes/quotes-product/quotes-product.module": [
		747,
		46
	],
	"../pages/mobile/my-quotes/quotes-rates/quotes-rates.module": [
		748,
		45
	],
	"../pages/mobile/my-referral-partners/add-edit-referral-account/add-edit-referral-account.module": [
		750,
		44
	],
	"../pages/mobile/my-referral-partners/add-edit-referral-partner/add-edit-referral-partner.module": [
		751,
		25
	],
	"../pages/mobile/my-referral-partners/my-referral-partners.module": [
		749,
		15
	],
	"../pages/mobile/my-referral-partners/referral-account-contacts/referral-account-contacts.module": [
		752,
		33
	],
	"../pages/mobile/my-referral-partners/referral-account-details/referral-account-details.module": [
		753,
		18
	],
	"../pages/mobile/my-referral-partners/referral-partner-details/referral-partner-details.module": [
		754,
		17
	],
	"../pages/mobile/my-schedule/add-edit-event/add-edit-event.module": [
		757,
		19
	],
	"../pages/mobile/my-schedule/month-view/month-view.module": [
		756,
		43
	],
	"../pages/mobile/my-schedule/my-schedule.module": [
		755,
		21
	],
	"../pages/mobile/my-schedule/view-event/view-event.module": [
		758,
		32
	],
	"../pages/mobile/my-tasks/add-task/add-task.module": [
		759,
		24
	],
	"../pages/mobile/my-tasks/edit-task/edit-task.module": [
		760,
		23
	],
	"../pages/mobile/my-tasks/my-tasks.module": [
		722,
		22
	],
	"../pages/mobile/my-tasks/task-filter-popover/task-filter-popover.module": [
		761,
		42
	],
	"../pages/mobile/my-tasks/task-status-popover/task-status-popover.module": [
		762,
		41
	],
	"../pages/mobile/my-tools/additional-payment-calculator-results/additional-payment-calculator-results.module": [
		765,
		40
	],
	"../pages/mobile/my-tools/additional-payment-calculator/additional-payment-calculator.module": [
		764,
		7
	],
	"../pages/mobile/my-tools/affordability-calculator/affordability-calculator-results/affordability-calculator-results.module": [
		767,
		27
	],
	"../pages/mobile/my-tools/affordability-calculator/affordability-calculator.module": [
		766,
		39
	],
	"../pages/mobile/my-tools/my-tools.module": [
		763,
		38
	],
	"../pages/mobile/my-tools/quick-qualifier/quick-qualifier-results/quick-qualifier-results.module": [
		769,
		37
	],
	"../pages/mobile/my-tools/quick-qualifier/quick-qualifier.module": [
		768,
		11
	],
	"../pages/mobile/notes-page/notes-page.module": [
		724,
		30
	],
	"../pages/mobile/picture-editor/picture-editor.module": [
		770,
		28
	],
	"../pages/mobile/score-card/score-card.module": [
		771,
		1
	],
	"../pages/mobile/settings/settings.module": [
		772,
		36
	],
	"../pages/mobile/upcoming-events/add-event/add-event.module": [
		774,
		3
	],
	"../pages/mobile/upcoming-events/event-details/event-details.module": [
		775,
		5
	],
	"../pages/mobile/upcoming-events/upcoming-events.module": [
		773,
		6
	],
	"../pages/mobile/viewer/viewer.module": [
		776,
		29
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 204;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FeedbackService = FeedbackService_1 = (function () {
    function FeedbackService(toastCtrl, loadingCtrl, alertCtrl) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
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
        if (!FeedbackService_1.isToastVisible) {
            toast.present();
            FeedbackService_1.isToastVisible = true;
        }
        toast.onDidDismiss(function () {
            FeedbackService_1.isToastVisible = false;
        });
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
            title: "Error",
        });
        alert.present();
    };
    return FeedbackService;
}());
FeedbackService.isLoaderVisible = false;
FeedbackService.isToastVisible = false;
FeedbackService = FeedbackService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], FeedbackService);

var FeedbackService_1;
//# sourceMappingURL=feedback.service.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomNavService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__feedback_feedback_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CustomNavService = (function () {
    function CustomNavService(feedback) {
        this.feedback = feedback;
    }
    CustomNavService.prototype.push = function (navCtrl, page, params, opts, done) {
        var loader = this.feedback.getLoader();
        loader.present();
        return navCtrl.push(page, params, opts, done).then(function (response) {
            loader.dismiss();
            return response;
        });
    };
    return CustomNavService;
}());
CustomNavService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__feedback_feedback_service__["a" /* FeedbackService */]])
], CustomNavService);

//# sourceMappingURL=custom-nav.service.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationConstants; });
/* tslint:disable max-line-length*/
var ApplicationConstants = (function () {
    function ApplicationConstants() {
    }
    return ApplicationConstants;
}());

ApplicationConstants.CONTACT_ACTIVITY_TYPEID = { CALL: "PHONE_CALL_CONTACT", SMS: "PHONE_CALL_CONTACT", EMAIL: "SEND_EMAIL_CONTACT" };
ApplicationConstants.CONTACT_ACTIVITY_DETAILTEXT = { CALL: "Outgoing call", SMS: "Message sent", EMAIL: "Email sent" };
ApplicationConstants.REMINDERS = [{ text: "None", value: "" }, { text: "At start time", value: "0" },
    { text: "5 minutes before start", value: "5" }, { text: "15 minutes before start", value: "15" },
    { text: "30 minutes before start", value: "30" }, { text: "1 hour before start", value: "60" },
    { text: "1.5 hours before start", value: "90" }, { text: "2 hours before start", value: "120" },
    { text: "3 hours before start", value: "180" }, { text: "6 hours before start", value: "360" },
    { text: "12 hours before start", value: "720" }, { text: "1 day before start", value: "1440" },
    { text: "2 days before start", value: "2880" }, { text: "3 days before start", value: "4320" },
    { text: "4 days before start", value: "5760" }, { text: "5 days before start", value: "7200" },
    { text: "1 week before start", value: "10080" }, { text: "2 weeks before start", value: "20160" }];
ApplicationConstants.TIMEZONES = [{ text: "US/Alaska" }, { text: "US/Aleutian" }, { text: "US/Arizona" }, { text: "US/Central" },
    { text: "US/East-Indiana" }, { text: "US/Eastern" }, { text: "US/Hawaii" }, { text: "US/Indiana-Starke" },
    { text: "US/Michigan" }, { text: "US/Mountain" }, { text: "US/Pacific" }, { text: "US/Pacific-New" }, { text: "US/Samoa" }];
ApplicationConstants.ACCOUNT_TYPES = [{ partnerTypeDesc: "Accounting Firm", partnerTypeId: "ACCTFIRM" },
    { partnerTypeDesc: "Builder", partnerTypeId: "BUILDER" },
    { partnerTypeDesc: "Law Firm", partnerTypeId: "LAWFIRM" },
    { partnerTypeDesc: "Mortgage Banker", partnerTypeId: "MTGBANKER" },
    { partnerTypeDesc: "Mortgage Broker", partnerTypeId: "MTGBROKER" },
    { partnerTypeDesc: "Real Estate Brokerage", partnerTypeId: "REB" },
    { partnerTypeDesc: "Title Agency", partnerTypeId: "TITLEAGN" }];
ApplicationConstants.APP_VERSION = "0.1";
ApplicationConstants.BUILD_NUMBER = "201704150444";
ApplicationConstants.RESPONSE_DATA_LIMIT = 25;
ApplicationConstants.SSN_DIGIT = 9;
ApplicationConstants.PHONENUMBER_DIGIT = 10;
ApplicationConstants.POSTALCODE_DIGIT = 5;
ApplicationConstants.DOB_YEAR_TO_MINUS = 16;
ApplicationConstants.PICTURE_CROP = 165;
//# sourceMappingURL=application-constants.config.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_utils_filters__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_service_url_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_application_constants_config__ = __webpack_require__(383);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the ContactService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ContactService = (function () {
    function ContactService(httpservice, filters) {
        this.httpservice = httpservice;
        this.filters = filters;
        this.cache = {
            contacts: "",
            total: "",
        };
        this.searchobj = {
            searchparams: {},
            searchtotal: "",
            currentpage: "",
        };
    }
    ContactService.prototype.makeParam = function (start, limit) {
        var param = { start: start, limit: limit };
        return param;
    };
    // Private method to create list of params
    ContactService.prototype.getParamList = function () {
        // Hardcoding , this needs to be moved to constants
        var limit = 25;
        // tslint:disable-next-line:prefer-const
        var total = this.cache.total;
        var paramList = [];
        var start = 0;
        while (start <= total) {
            paramList.push(this.makeParam(start, limit));
            start = start + limit - 1;
        }
        return paramList;
    };
    /*
     * Returns the promise of get contacts list api
     * Input param object with start and limit
     * param{
     *  start: 20,
     *  limit: 20
     * }
     */
    ContactService.prototype.getContactsPromise = function (param) {
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].CONTACT_LIST_URL, param).map(function (response) {
            return (response.data);
        });
    };
    /*
     * Method to fetch contacts
     * Returns an array of contact chunks
     * eg: [chunk1,chunk2...]
     * where chunk1 is an array containing contacts and so on..
     */
    // getContacts() {
    //   const paramList = this.getParamList();
    //   return (paramList.map((param) => this.getContactsPromise(param) ));
    // }
    ContactService.prototype.searchContacts = function (searchString) {
        var _this = this;
        var params = {
            advSearchYn: true,
            page: 1,
            start: 0,
            limit: 25,
            name: null,
            ssn: null,
            phone: null,
        };
        if (Number(searchString)) {
            //  if (searchString.length === ApplicationConstants.SSN_DIGIT) {
            //    params.ssn = Filters.formatSSN(searchString);
            //  }
            if (searchString.length === __WEBPACK_IMPORTED_MODULE_5__config_application_constants_config__["a" /* ApplicationConstants */].PHONENUMBER_DIGIT) {
                params.phone = __WEBPACK_IMPORTED_MODULE_3__common_utils_filters__["a" /* Filters */].formatPhoneNumber(searchString);
            }
        }
        else {
            params.name = searchString;
        }
        this.searchobj.searchparams = params;
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].CONTACT_FLEX_FIND, this.searchobj.searchparams).map(function (response) {
            _this.searchobj.searchTotal = response.total;
            _this.searchobj.currentpage = 1;
            return response;
        });
        // handle errors
        // .catch(() => {#<{(| do something here |)}>#});
    };
    ContactService.prototype.getNextPage = function () {
        if (this.searchobj.searchtotal) {
            // tslint:disable-next-line:max-line-length
            if (this.searchobj.searchtotal > (this.searchobj.currentpage * __WEBPACK_IMPORTED_MODULE_5__config_application_constants_config__["a" /* ApplicationConstants */].RESPONSE_DATA_LIMIT)) {
                // tslint:disable-next-line:max-line-length
                // tslint:disable-next-line:no-string-literal
                this.searchobj.searchparams["start"] = this.searchobj.currentpage * __WEBPACK_IMPORTED_MODULE_5__config_application_constants_config__["a" /* ApplicationConstants */].RESPONSE_DATA_LIMIT;
                this.searchobj.currentpage += 1;
                // tslint:disable-next-line:no-string-literal
                this.searchobj.searchparams["page"] = this.searchobj.currentpage;
                return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].CONTACT_FLEX_FIND, this.searchobj.searchparams);
            }
        }
    };
    /*
     * Method to fetch cached contacts
     */
    ContactService.prototype.getCachedContacts = function () {
        return this.cache.contacts;
    };
    /*
    * Method to check if contacts cached
    */
    ContactService.prototype.isCached = function () {
        if (this.cache.contacts) {
            return true;
        }
        else {
            return false;
        }
    };
    /*
    * Method to search contacts based on the flex value
    */
    ContactService.prototype.search = function (flexValue, start, limit) {
        var params = {
            advancedSearch: true,
            start: start,
            limit: limit,
        };
        if (Number(flexValue)) {
            if (flexValue.toString.length === __WEBPACK_IMPORTED_MODULE_5__config_application_constants_config__["a" /* ApplicationConstants */].SSN_DIGIT) {
                // tslint:disable-next-line:no-string-literal
                params["ssn"] = flexValue;
            }
            if (flexValue.toString.length === __WEBPACK_IMPORTED_MODULE_5__config_application_constants_config__["a" /* ApplicationConstants */].PHONENUMBER_DIGIT) {
                // tslint:disable-next-line:no-string-literal
                params["phone"] = flexValue;
            }
        }
        else {
            // tslint:disable-next-line:no-string-literal
            params["name"] = flexValue;
        }
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].CONTACT_SEARCH_URL, params).map(function (response) {
            return response.data;
        });
    };
    /*
    * Method to retrive the recent contacts
    */
    ContactService.prototype.getRecentContacts = function (start, limit) {
        var params = {
            start: start,
            limit: limit,
        };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].RECENT_CONTACT_URL, params).map(function (response) {
            return response.data;
        });
    };
    ContactService.prototype.getTotal = function () {
        var _this = this;
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].CONTACT_LIST_URL)
            .map(function (response) {
            _this.cache.total = response.total;
            return response.total;
        });
    };
    /*
    * Filter borrower contacts
    */
    ContactService.prototype.filterBorrowerContacts = function (contacts) {
        var tempContacts = contacts.filter(function (contact) {
            return (contact.contactTypeId === "INDIVIDUAL");
        });
        return tempContacts;
    };
    /*
    * Filter borrower contacts
    */
    ContactService.prototype.filterBusinessContacts = function (contacts) {
        var tempContacts = contacts.filter(function (contact) {
            return (contact.contactTypeId !== "INDIVIDUAL");
        });
        return tempContacts;
    };
    ContactService.prototype.getLoanCounts = function (contactId) {
        var params = {
            contactId: contactId,
        };
        return this.httpservice.post(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].CONTACT_LOANCOUNTS_URL, params).map(function (response) {
            return response;
        });
    };
    ContactService.prototype.getContactDetails = function (contactId) {
        var _this = this;
        var params = {
            id: contactId,
        };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].CONTACT_DETAILS_URL, params).map(function (response) {
            _this.cache.total = response.total;
            return response;
        });
    };
    ContactService.prototype.getSalutationsList = function () {
        var salutationRequest = { page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].SALUTATION_URL, salutationRequest).map(function (response) {
            return response;
        });
    };
    ContactService.prototype.getTelephoneTypes = function () {
        var telephoneTypesRequest = { page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].TELEPHONETYPES_URL, telephoneTypesRequest)
            .map(function (response) {
            return response;
        });
    };
    ContactService.prototype.getContactTypes = function () {
        var contactTypesRequest = { page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].CONTACTTYPES_URL, contactTypesRequest).map(function (response) {
            return response;
        });
    };
    ContactService.prototype.getStates = function () {
        var contactTypesRequest = { page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].STATELOOKUP_URL, contactTypesRequest).map(function (response) {
            return response;
        });
    };
    ContactService.prototype.getCityStateLookup = function (zipcode) {
        var cityStateLookupRequest = { zipCode: zipcode, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].CITYSTATELOOKUP_URL, cityStateLookupRequest)
            .map(function (response) {
            return response;
        });
    };
    ContactService.prototype.createContact = function (createContactRequest) {
        return this.httpservice.post(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].CREATECONTACT_URL, createContactRequest).map(function (response) {
            return response;
        });
    };
    ContactService.prototype.updateContact = function (updateContactRequest) {
        return this.httpservice.post(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].UPDATECONTACT_URL, updateContactRequest).map(function (response) {
            return response;
        });
    };
    ContactService.prototype.getCommunicationActivities = function (contactId) {
        var contactRequest = { contactId: contactId };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].COMMUNICATION_ACTIVITIES_URL, contactRequest)
            .map(function (response) {
            return response;
        });
    };
    ContactService.prototype.getContactActivities = function (contactId) {
        var contactRequest = { contactId: contactId };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].CONTACT_ACTIVITIES_URL, contactRequest).map(function (response) {
            return response;
        });
    };
    ContactService.prototype.addContactActivity = function (activityRequest) {
        return this.httpservice.post(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].ADD_CONTACT_ACTIVITY_URL, activityRequest)
            .map(function (response) {
            return response;
        });
    };
    ContactService.prototype.updateRecentContact = function (contactId) {
        var contactRequest = { id: contactId };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].UPDATE_RECENT_CONTACT_URL, contactRequest);
    };
    ContactService.prototype.getContactsList = function (start, limit) {
        var params = {
            start: start,
            limit: limit,
        };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_4__config_service_url_config__["a" /* Config */].CONTACT_LIST_URL, params).map(function (response) {
            return response.data;
        });
    };
    ContactService.prototype.getContacts = function (apiURL, params) {
        if (!params) {
            params = { start: 0, limit: 1000 };
        }
        else {
            // tslint:disable-next-line:no-magic-numbers
            params.limit = 1000;
        }
        return this.httpservice.get(apiURL, params).map(function (response) {
            return response.data;
        });
    };
    return ContactService;
}());
ContactService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_3__common_utils_filters__["a" /* Filters */]])
], ContactService);

//# sourceMappingURL=contact-service.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuoteService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_feedback_feedback_service__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var QuoteService = (function () {
    function QuoteService(http, feedback) {
        this.http = http;
        this.feedback = feedback;
    }
    QuoteService.prototype.getLeadType = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LEAD_TYPES)
            .map(function (response) {
            return response.data.map(function (element) { return ({
                value: element.leadTypeId,
                name: element.leadTypeDesc,
            }); });
        });
    };
    QuoteService.prototype.getLeadSource = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LEAD_SOURCES)
            .map(function (response) {
            return response.data.map(function (element) { return ({
                value: element.leadSourceId,
                name: element.leadSourceDesc,
            }); });
        });
    };
    QuoteService.prototype.getStatus = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].QUOTE_STATUS)
            .map(function (response) {
            return response.data.map(function (element) { return ({
                value: element.quoteStatusTypeId,
                name: element.quoteStatusDescription,
            }); });
        });
    };
    QuoteService.prototype.updateStatus = function (quote, item) {
        var params = {
            quoteId: quote.quoteId,
            newStatus: item.value,
            newStatusDesc: item.name,
            oldStatusDesc: quote.quoteStatusDescription,
        };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_QUOTES_STATUS, params);
    };
    QuoteService.prototype.getPropertyTypes = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].BUILDING_TYPES);
    };
    QuoteService.prototype.getProjectTypes = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].PROJ_CLASS_TYPES);
    };
    QuoteService.prototype.getTaxRates = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].TAX_RATE);
    };
    QuoteService.prototype.getMIPlanTypes = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].PMI_PLAN_TYPES);
    };
    QuoteService.prototype.getCreditRatings = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CREDIT_RATINGS);
    };
    QuoteService.prototype.getDesiredPricingOptions = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].RATE_LOCK_TYPE);
    };
    QuoteService.prototype.getRefinancePurposeTypes = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].REFI_PURPOSE_TYPES);
    };
    QuoteService.prototype.getCounty = function (zipCode) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].COUNTIES, {
            zipCode: zipCode,
        });
    };
    QuoteService.prototype.createQuote = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CREATE_QUOTE, params);
    };
    QuoteService.prototype.readQuote = function (quoteId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].READ_QUOTE, {
            quoteId: quoteId,
        });
    };
    QuoteService.prototype.updateQuoteHome = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_QUOTE_HOME, params);
    };
    QuoteService.prototype.updatePurposeAndProperty = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].QUOTES_UPDATE_PURPOSE_PROPERTY, params);
    };
    QuoteService.prototype.updatePurchaseLoanScenario = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_QUOTE_PURCHASE_LOAN_SCENARIO, params);
    };
    QuoteService.prototype.updateRefinanceLoanScenario = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_QUOTE_REFINANCE_LOAN_SCENARIO, params);
    };
    QuoteService.prototype.updateEquityLoanScenario = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_QUOTE_EQUITY_LOAN_SCENARIO, params);
    };
    QuoteService.prototype.updatePricingGoals = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_QUOTE_PRICING_GOALS, params);
    };
    QuoteService.prototype.updateExistingLiens = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_EXISTING_LIENS, params);
    };
    QuoteService.prototype.getQuoteResults = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_QUOTE_RESULTS, params);
    };
    QuoteService.prototype.getLTVRatios = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CALC_LTV_RATIO, params);
    };
    QuoteService.prototype.getMyQuotes = function () {
        var params = {
            start: 0,
            limit: 25,
        };
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].QUOTES, params);
    };
    QuoteService.prototype.getAvailableQuoteStatuses = function (quoteId, statusType) {
        var params = {
            quoteId: quoteId,
            statusType: statusType,
            start: 0,
            page: 1,
            limit: 25,
        };
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].AVAILABLE_QUOTE_STATUSES, params);
    };
    QuoteService.prototype.getQuoteStatusHistory = function (quoteId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].READ_QUOTE_STATUS, {
            quoteId: quoteId,
        });
    };
    QuoteService.prototype.updateQuoteStatus = function (updateQuoteStatusRequest) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_QUOTES_STATUS, updateQuoteStatusRequest);
    };
    QuoteService.prototype.getMortgageTypes = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].MORTGAGE_TYPES);
    };
    QuoteService.prototype.getLiablilityStatusTypes = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIABILITY_STATUS_TYPES);
    };
    QuoteService.prototype.saveDesiredProducts = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_QUOTE_DESIRED_PRODUCTS, params);
    };
    QuoteService.prototype.emailPDF = function (params) {
        var formData = new FormData();
        Object.keys(params).forEach(function (key) {
            formData.append(key, params[key]);
        });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].EMAIL_PDF, formData);
    };
    QuoteService.prototype.downloadPDF = function (params) {
        var formData = new FormData();
        Object.keys(params).forEach(function (key) {
            formData.append(key, params[key]);
        });
        return this.http.postFile(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].DOWNLOAD_PDF, formData);
    };
    QuoteService.prototype.getPaymentAndBalance = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].PAYMENT_BALANCE, params);
    };
    QuoteService.prototype.getQuoteFees = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].QUOTE_FEES, params);
    };
    QuoteService.prototype.getQuoteRates = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].QUOTE_RATES, params);
    };
    QuoteService.prototype.getQuoteStats = function () {
        var params = {
            intervalType: "ALL",
        };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].QUOTES_STATS, params);
    };
    return QuoteService;
}());
QuoteService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_feedback_feedback_service__["a" /* FeedbackService */]])
], QuoteService);

//# sourceMappingURL=quote.service.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PricingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loans_loan_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PricingService = (function () {
    function PricingService(httpservice, loanService) {
        this.httpservice = httpservice;
        this.loanService = loanService;
    }
    PricingService.prototype.getCityStateLookup = function (zipcode) {
        var cityStateLookupRequest = { zipCode: zipcode, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CITYSTATELOOKUP_URL, cityStateLookupRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getSubjectPropertyTypes = function (authLoanId) {
        var subjectPropertyTypesRequest = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_SUBJECT_PROPERTY_TYPES, subjectPropertyTypesRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getProjectTypes = function (authLoanId) {
        var subjectPropertyTypesRequest = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_PROJECT_TYPES, subjectPropertyTypesRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getPropertyTypes = function (authLoanId) {
        var subjectPropertyTypesRequest = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_PROPERTY_TYPES, subjectPropertyTypesRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.updateProperty = function (updatePropertyRequest) {
        return this.httpservice.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_PROPERTY_INFO, updatePropertyRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getLoanHeaderInfo = function (authLoanId, loanId) {
        var loanHeaderInfoRequest = { authLoanId: authLoanId, loanId: loanId };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_PROJECT_TYPES, loanHeaderInfoRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getLoanPurposes = function (authLoanId) {
        var loanPurposesRequest = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_LOAN_PURPOSES, loanPurposesRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getRefinancePurposes = function (authLoanId) {
        var refinancePurposesRequest = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_REFINANCE_PURPOSES, refinancePurposesRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getDocumentationTypes = function (authLoanId) {
        var documentationTypesRequest = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_DOCUMENTATION_TYPES, documentationTypesRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getOccupancyTypes = function (authLoanId) {
        var occupancyTypesRequest = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_OCCUPANCY_TYPES, occupancyTypesRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.saveAllLoanTerms = function (loanTermsRequest) {
        return this.httpservice.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].SAVE_ALL_LOAN_TERMS, loanTermsRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getLockPeriods = function (authLoanId) {
        var lockPeriodsRequest = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_LOCK_PERIODS, lockPeriodsRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getPricingAndRateLockInfo = function (authLoanId, id) {
        var pricingAndRateLockInfoRequest = { authLoanId: authLoanId, id: id };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_PRICING_RATELOCK_INFO, pricingAndRateLockInfoRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getHomeLoanMappingDataWithLoanNumber = function (loanNumber) {
        var _this = this;
        return this.loanService.getAuthLoanId(loanNumber).flatMap(function (data) {
            var pricingAndRateLockInfoRequest = {
                lenderLoanNumber: loanNumber,
                authLoanId: data.loanId,
                id: "",
            };
            return _this.getHomeLoanMappingDataWithAuthId(pricingAndRateLockInfoRequest);
        });
    };
    PricingService.prototype.getHomeLoanMappingDataWithAuthId = function (pricingAndRateLockInfoRequest) {
        return this.httpservice
            .get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_HOME_LOAN_MAPPING_DATA, pricingAndRateLockInfoRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getRetailLoanTermsDataWithLoanNumber = function (loanNumber) {
        var _this = this;
        return this.loanService.getAuthLoanId(loanNumber).flatMap(function (data) {
            var pricingAndRateLockInfoRequest = {
                lenderLoanNumber: loanNumber,
                authLoanId: data.loanId,
                id: "",
            };
            return _this.getRetailLoanTermsDataWithAuthId(pricingAndRateLockInfoRequest);
        });
    };
    PricingService.prototype.getRetailLoanTermsDataWithAuthId = function (pricingAndRateLockInfoRequest) {
        return this.httpservice
            .get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_RETAIL_LOAN_TERMS, pricingAndRateLockInfoRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getPricingHistoryList = function (authLoanId, loanId) {
        var listPriceHistoryRequest = this.httpservice.convertJsonToQueryString({ authLoanId: authLoanId, loanId: loanId })
            .toString();
        listPriceHistoryRequest = "&" + listPriceHistoryRequest;
        return this.httpservice.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_PRICING_HISTORY, "", null, listPriceHistoryRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getRates = function (ratesRequest) {
        return this.httpservice.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_RATES, ratesRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getPricingAdjustments = function (pricingAdjustmentsRequest, authLoanId) {
        return this.httpservice.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_PRICING_ADJUSTMENTS, pricingAdjustmentsRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.updatePricing = function (pricingRequest) {
        return this.httpservice.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_PRICING, pricingRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getCoreChangeReasons = function (authLoanId) {
        var coreChangeReasonsRequest = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_CORE_CHANGE_REASONS, coreChangeReasonsRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getExceptionTypes = function (authLoanId) {
        var exceptionTypesRequest = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_EXCEPTION_TYPES, exceptionTypesRequest)
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getLoanTypes = function (authLoanId) {
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_LOAN_TYPES, { authLoanId: authLoanId })
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getLienTypes = function (authLoanId) {
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_LOAN_TYPES, { authLoanId: authLoanId })
            .map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getLookUpData = function (lookupService, authLoanId) {
        var _this = this;
        var lookup = lookupService.map(function (url) {
            return _this.httpservice.get(url, { authLoanId: authLoanId })
                .map(function (response) {
                return response.data;
            }).catch(function (response) { return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of([]); });
        });
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].forkJoin.apply(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"], lookup);
    };
    PricingService.prototype.getHomeLoanMappingData = function (homeLoanMappingdataRequest) {
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_HOME_LOAN_MAPPING_DATA, homeLoanMappingdataRequest).map(function (response) {
            return response;
        });
    };
    PricingService.prototype.readTerms = function (authLoanId) {
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].READ_LOAN_TERMS, { id: authLoanId, authLoanId: authLoanId }).map(function (response) {
            return response;
        });
    };
    PricingService.prototype.getPropertyAddress = function (lenderLoanNumber, authLoanId) {
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].READ_SUBJECT_PROPERTY_URL, { lenderLoanNumber: lenderLoanNumber, authLoanId: authLoanId }).map(function (response) {
            return response;
        });
    };
    // getLookUpData(url: any, authLoanId) {
    //   return this.httpservice.get(url, { authLoanId })
    //     .map((response) => {
    //       return response.data;
    //     });
    // }
    PricingService.prototype.getLenderInfos = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_LENDER_INFOS, params);
    };
    PricingService.prototype.getFulfillmentCenters = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_FULFILLMENT_CENTERS, params);
    };
    PricingService.prototype.getSalesRegions = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_SALES_REGIONS, params);
    };
    PricingService.prototype.getSalesBranches = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_SALES_BRANCHES, params);
    };
    PricingService.prototype.getMarketTypes = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_MARKET_TYPES, params);
    };
    PricingService.prototype.getLeadTypes = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_LEAD_TYPES, params);
    };
    PricingService.prototype.getLeadSources = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_LEAD_SOURCES, params);
    };
    PricingService.prototype.getUserTeams = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_USERTEAMS, params);
    };
    PricingService.prototype.getBrokerInfos = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_BROKERINFOS, params);
    };
    PricingService.prototype.getSubChannels = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_SUB_CHANNELS, params);
    };
    PricingService.prototype.getSalesSubRegions = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_SALESSUBREGIONS, params);
    };
    PricingService.prototype.getProductPricingMappings = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_PRODUCT_PRICING_MAPPINGS, params);
    };
    PricingService.prototype.getBrokerTypes = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_BROKER_TYPES, params);
    };
    PricingService.prototype.getChannels = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_CHANNELS, params);
    };
    PricingService.prototype.getPromotions = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_PROMOTIONS, params);
    };
    PricingService.prototype.getAssignedTeams = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_ASSIGNED_TEAMS, params);
    };
    PricingService.prototype.getAssignedUsers = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_ASSIGNED_USERS, params);
    };
    PricingService.prototype.getLoanMappingData = function (authLoanId) {
        var params = { authLoanId: authLoanId, page: 1, start: 0, limit: 25 };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_LOAN_MAPPING_DATA, params);
    };
    PricingService.prototype.getLoanSourceDetails = function (authLoanId) {
        var params = { authLoanId: authLoanId, id: authLoanId };
        return this.httpservice.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_LOAN_SOURCE_DETAILS, params);
    };
    return PricingService;
}());
PricingService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */],
        __WEBPACK_IMPORTED_MODULE_4__loans_loan_service__["a" /* LoanService */]])
], PricingService);

//# sourceMappingURL=pricing.service.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AvatarModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__avatar__ = __webpack_require__(700);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AvatarModule = (function () {
    function AvatarModule() {
    }
    return AvatarModule;
}());
AvatarModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__avatar__["a" /* Avatar */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__avatar__["a" /* Avatar */],
        ],
    })
], AvatarModule);

//# sourceMappingURL=avatar.module.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReferralPartnerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the ReferralPartnerService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ReferralPartnerService = (function () {
    function ReferralPartnerService(httpService) {
        this.httpService = httpService;
    }
    ReferralPartnerService.prototype.getAccountsList = function (start, limit) {
        var params = {
            start: start,
            limit: limit,
        };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_REFERRAL_ACCOUNTS, params).map(function (response) {
            return response.data;
        });
    };
    ReferralPartnerService.prototype.getPartnersList = function (start, limit) {
        var params = {
            start: start,
            limit: limit,
        };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_REFERRAL_CONTACTS, params).map(function (response) {
            return response.data;
        });
    };
    ReferralPartnerService.prototype.getReferralPartners = function (apiURL, params) {
        if (!params) {
            params = { start: 0, limit: 1000 };
        }
        else {
            // tslint:disable-next-line:no-magic-numbers
            params.limit = 1000;
        }
        return this.httpService.get(apiURL, params).map(function (response) {
            return response.data;
        });
    };
    ReferralPartnerService.prototype.getContactDetails = function (contactId) {
        var params = {
            id: contactId,
        };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].REFERRAL_CONTACT_DETAILS, params)
            .map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.getAccountDetails = function (accountId) {
        var params = {
            id: accountId,
        };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].REFERRAL_ACCOUNT_DETAILS, params)
            .map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.getSalutationsList = function () {
        var salutationRequest = { page: 1, start: 0, limit: 25 };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].SALUTATION_URL, salutationRequest)
            .map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.getTelephoneTypes = function () {
        var telephoneTypesRequest = { page: 1, start: 0, limit: 25 };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].TELEPHONETYPES_URL, telephoneTypesRequest)
            .map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.getContactTypes = function () {
        var contactTypesRequest = { page: 1, start: 0, limit: 25 };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CONTACTTYPES_URL, contactTypesRequest)
            .map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.getStates = function () {
        var contactTypesRequest = { page: 1, start: 0, limit: 25 };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].STATELOOKUP_URL, contactTypesRequest)
            .map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.getCityStateLookup = function (zipcode) {
        var cityStateLookupRequest = { zipCode: zipcode, page: 1, start: 0, limit: 25 };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CITYSTATELOOKUP_URL, cityStateLookupRequest)
            .map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.createContact = function (createContactRequest) {
        return this.httpService.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CREATECONTACT_URL, createContactRequest)
            .map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.updateContact = function (updateContactRequest) {
        return this.httpService.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATECONTACT_URL, updateContactRequest)
            .map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.getCommunicationActivities = function (contactId) {
        var contactRequest = { contactId: contactId };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].COMMUNICATION_ACTIVITIES_URL, contactRequest).map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.getContactActivities = function (contactId) {
        var contactRequest = { contactId: contactId };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CONTACT_ACTIVITIES_URL, contactRequest).map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.addContactActivity = function (activityRequest) {
        return this.httpService.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].ADD_CONTACT_ACTIVITY_URL, activityRequest)
            .map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.updateRecentContact = function (contactId) {
        var contactRequest = { id: contactId };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_RECENT_CONTACT_URL, contactRequest).map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.getReferralAccountContacts = function (partnerId) {
        var referralAccountContactsRequest = { partnerId: partnerId };
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LIST_REFERRAL_ACCOUNT_CONTACTS, referralAccountContactsRequest).map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.createReferralAccount = function (createReferralAccountRequest) {
        return this.httpService.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CREATE_REFERRAL_ACCOUNT, createReferralAccountRequest).map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.updateReferralAccount = function (updateReferralAccountRequest) {
        return this.httpService.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_REFERRAL_ACCOUNT, updateReferralAccountRequest).map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.searchCompanyNames = function (searchCompanyNamesRequest) {
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].SEARCH_COMPANY_NAMES, searchCompanyNamesRequest);
    };
    ReferralPartnerService.prototype.createReferralPartner = function (createReferralPartnerRequest) {
        return this.httpService.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].CREATE_REFERRAL_PARTNER, createReferralPartnerRequest).map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.updateReferralPartner = function (updateReferralPartnerRequest) {
        return this.httpService.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UPDATE_REFERRAL_PARTNER, updateReferralPartnerRequest).map(function (response) {
            return response;
        });
    };
    ReferralPartnerService.prototype.searchCompanyAssociate = function (searchCompanyAssociateRequest) {
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].SEARCH_COMPANY_ASSOCIATE, searchCompanyAssociateRequest).map(function (response) {
            return response;
        });
    };
    return ReferralPartnerService;
}());
ReferralPartnerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */]])
], ReferralPartnerService);

//# sourceMappingURL=referral-partner.service.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteScroll; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_http_service__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* tslint:disable max-line-length*/


var InfiniteScroll = (function () {
    function InfiniteScroll(httpservice) {
        this.httpservice = httpservice;
        this.PARAM_KEY_START = "start";
        this.PARAM_KEY_PAGE = "page";
        this.results = {};
    }
    InfiniteScroll.prototype.init = function (url, params, results, options) {
        this.loadDefault();
        this.url = url;
        this.params = params;
        this.results = results;
        if (options) {
            if (options.hasOwnProperty("pageSize")) {
                this.options.pageSize = options.pageSize;
            }
            if (options.hasOwnProperty("keyData")) {
                this.options.keyData = options.keyData;
            }
            if (options.hasOwnProperty("keyTotal")) {
                this.options.keyTotal = options.keyTotal;
            }
        }
    };
    InfiniteScroll.prototype.loadInitialData = function () {
        var _this = this;
        var initialData = this.httpservice.get(this.url, this.params).map(function (response) {
            if (response) {
                _this.currentpage = 1;
                _this.total = response[_this.options.keyTotal];
                return response.hasOwnProperty(_this.options.keyData) ? response[_this.options.keyData] : {};
            }
        });
        return initialData.toPromise().then(function (results) {
            return (_a = _this.results).push.apply(_a, results);
            var _a;
        }).catch(function (err) {
            return err;
        });
    };
    InfiniteScroll.prototype.loadMoreData = function (event) {
        var _this = this;
        if (this.total) {
            if (this.total > (this.currentpage * this.options.pageSize)) {
                this.params[this.PARAM_KEY_START] = this.currentpage * this.options.pageSize;
                this.currentpage += 1;
                this.params[this.PARAM_KEY_PAGE] = this.currentpage;
                this.httpservice.get(this.url, this.params).map(function (response) {
                    event.complete();
                    // event.enable(this.total > this.currentpage * this.options.pageSize);
                    return response[_this.options.keyData];
                }).subscribe(function (results) {
                    (_a = _this.results).push.apply(_a, results);
                    var _a;
                });
            }
            else {
                event.complete();
                // event.enable(false);
            }
        }
    };
    InfiniteScroll.prototype.loadDefault = function () {
        this.url = null;
        this.params = null;
        this.results = null;
        this.options = { pageSize: 25, keyData: "data", keyTotal: "total" };
    };
    return InfiniteScroll;
}());
InfiniteScroll = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__utils_http_service__["a" /* HttpService */]])
], InfiniteScroll);

//# sourceMappingURL=infinite-scroll.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StatsService = (function () {
    function StatsService(http) {
        this.http = http;
    }
    StatsService.prototype.getCompareQuotesConversion = function (intervalType, intervalValue) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_COMPARE_QUOTES_CONVERSION, {
            intervalType: intervalType,
            intervalValue: intervalValue,
        });
    };
    StatsService.prototype.getMyFundedAndClosedLoans = function (intervalType, intervalValue) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_MY_CLOSED_LOANS_FUNDED, {
            intervalType: intervalType,
            intervalValue: intervalValue,
        });
    };
    StatsService.prototype.getAvgFundedAndClosedLoans = function (intervalType, intervalValue) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_AVG_CLOSED_LOANS_FUNDED, {
            intervalType: intervalType,
            intervalValue: intervalValue,
        });
    };
    StatsService.prototype.getMyAdversedAndClosedLoans = function (intervalType, intervalValue) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_MY_CLOSED_LOANS_ADVERSED, {
            intervalType: intervalType,
            intervalValue: intervalValue,
        });
    };
    StatsService.prototype.getAvgAdversedAndClosedLoans = function (intervalType, intervalValue) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_AVG_CLOSED_LOANS_ADVERSED, {
            intervalType: intervalType,
            intervalValue: intervalValue,
        });
    };
    StatsService.prototype.getMyOriginatedLoans = function (intervalType, intervalValue) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_MY_CLOSED_LOANS_ORIGIN, {
            intervalType: intervalType,
            intervalValue: intervalValue,
        });
    };
    StatsService.prototype.getAvgOriginatedLoans = function (intervalType, intervalValue) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_AVG_CLOSED_LOANS_ORIGIN, {
            intervalType: intervalType,
            intervalValue: intervalValue,
        });
    };
    return StatsService;
}());
StatsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */]])
], StatsService);

//# sourceMappingURL=stats.service.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NotesService = (function () {
    function NotesService(http) {
        this.http = http;
    }
    NotesService.prototype.getNotes = function (params, type) {
        var url = type === "contact" ? __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].NOTES_LIST_URL : type ===
            "contact_task" ? __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].NOTES_CONTACT_TASK_LIST_URL : type ===
            "loan_task" ? __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].NOTES_LOAN_TASK_LIST_URL : type ===
            "quote" ? __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].QUOTE_GET_NOTES : __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].NOTES_COND_LIST_URL;
        return this.http.get(url, params);
    };
    NotesService.prototype.saveNote = function (params, type) {
        var url = type === "contact" ? __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].NOTES_SAVE_URL : type ===
            "contact_task" ? __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].NOTES_CONTACT_TASK_SAVE_URL : type ===
            "loan_task" ? __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].NOTES_LOAN_TASK_SAVE_URL : type ===
            "quote" ? __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].QUOTE_SAVE_NOTES : __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].NOTES_COND_SAVE_URL;
        return this.http.post(url, params);
    };
    return NotesService;
}());
NotesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */]])
], NotesService);

//# sourceMappingURL=notes.service.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utilities; });
var Utilities = (function () {
    function Utilities() {
    }
    // mergeObject() merge Orgin object with dest Obejct
    // dest object is base object over that
    // orgin object will be applied by iterating based on arrKeys
    // exceptionList arry is used to
    // ignore some of the attributes in the orgin object
    Utilities.mergeObject = function (dest, orgin, exceptionList) {
        var _this = this;
        if (!dest && !orgin) {
            return {};
        }
        if (!dest) {
            return orgin;
        }
        if (!orgin) {
            return dest;
        }
        var arrKeys = Object.keys(orgin);
        arrKeys.forEach(function (key) {
            if (exceptionList && exceptionList.length > 0
                && exceptionList.indexOf(key) > 0) {
                return;
            }
            if (orgin[key] && Object.keys(orgin[key]).length > 0) {
                // Process object
                if (dest[key]) {
                    dest[key] = _this.mergeObject(dest[key], orgin[key], exceptionList);
                }
                else {
                    dest[key] = orgin[key];
                }
            }
            else {
                // all other premitive types
                dest[key] = orgin[key];
            }
        });
        return dest;
    };
    return Utilities;
}());

//# sourceMappingURL=utilities.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScorecardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/*
  Generated class for the ScorecardProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ScorecardService = (function () {
    function ScorecardService() {
        this.scoreCardScrollSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.scoreCardScrollSource$ = this.scoreCardScrollSource.asObservable();
    }
    ScorecardService.prototype.scoreCardScorll = function (scrollHeight) {
        this.scoreCardScrollSource.next(scrollHeight);
    };
    return ScorecardService;
}());
ScorecardService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], ScorecardService);

//# sourceMappingURL=scorecard.service.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__upcoming_events_service__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__schedule_schedule_service__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tasks_service__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loans_loan_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config_service_url_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_model_dashboard_alert_model__ = __webpack_require__(699);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var DashboardService = (function () {
    function DashboardService(http, eventsService, scheduleService, tasksService, loanService) {
        this.http = http;
        this.eventsService = eventsService;
        this.scheduleService = scheduleService;
        this.tasksService = tasksService;
        this.loanService = loanService;
        this.eventTypes = [
            { icon: "icon-birthday", dateTypeDesc: "Birthday" },
            { icon: "icon-birthday", dateTypeDesc: "Spouse Birthday" },
            { icon: "icon-anniversary", dateTypeDesc: "Wedding Anniversary" },
            { icon: "icon-loan-closure", dateTypeDesc: "Closing on New Home Loan" },
            { icon: "icon-loan-closure", dateTypeDesc: "Closing on Refi Loan" }
        ];
        this.taskParams = {
            sort: '[{"property":"dueDateTime","direction":"ASC"}]',
        };
    }
    DashboardService.prototype.getTaskDueToday = function () {
        this.taskParams.dueBy = "END_OF_DAY";
        return this.tasksService.getTasksList(__WEBPACK_IMPORTED_MODULE_7__config_service_url_config__["a" /* Config */].LIST_DUE_TASKS_URL, this.taskParams);
    };
    DashboardService.prototype.getEventsAndAppointments = function () {
        var services = [];
        services.push(this.eventsService.getUpcomingEventsForToday());
        services.push(this.scheduleService.getMyScheduleForToday());
        return __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__["Observable"].forkJoin.apply(__WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__["Observable"], services);
    };
    DashboardService.prototype.getEventsAndAppointmentsAlerts = function (eventsAndAppointments) {
        var eventAppointmentCards = [];
        if (this.isEventsAndAppointmentsEmpty(eventsAndAppointments)) {
            //  eventAppointmentCards.push(
            //    this.getEmptyEventsAndAppointments("No Events or Appointments Today"));
            return eventAppointmentCards;
        }
        eventAppointmentCards.push.apply(eventAppointmentCards, this.getEventAlerts(eventsAndAppointments[0]));
        eventAppointmentCards.push.apply(eventAppointmentCards, this.getAppointmentAlerts(eventsAndAppointments[1]));
        return eventAppointmentCards;
    };
    DashboardService.prototype.getEmptyEventsAndAppointments = function (feedback) {
        var appointmentEventCard = new __WEBPACK_IMPORTED_MODULE_9__common_model_dashboard_alert_model__["a" /* AlertModel */]();
        appointmentEventCard.display = true;
        appointmentEventCard.paragraph = [feedback];
        return appointmentEventCard;
    };
    DashboardService.prototype.isEventsAndAppointmentsEmpty = function (eventsAndAppointments) {
        var isEventsEmpty = false;
        var isAppointmentsEmpty = false;
        if (!eventsAndAppointments) {
            return true;
        }
        if (!eventsAndAppointments[0] || !eventsAndAppointments[0].data
            || eventsAndAppointments[0].data.length === 0) {
            isEventsEmpty = true;
        }
        if (!eventsAndAppointments[1] || !eventsAndAppointments[1].data
            || eventsAndAppointments[1].data.length === 0) {
            isAppointmentsEmpty = true;
        }
        if (isEventsEmpty && isAppointmentsEmpty) {
            return true;
        }
        return false;
    };
    DashboardService.prototype.getTodaysTaskOverdue = function () {
        this.taskParams.dueBy = "PAST_DUE";
        return this.tasksService.getTasksList(__WEBPACK_IMPORTED_MODULE_7__config_service_url_config__["a" /* Config */].LIST_DUE_TASKS_URL, this.taskParams);
    };
    DashboardService.prototype.getTaskOverDueAlerts = function (tasks) {
        var overDueTasks = new __WEBPACK_IMPORTED_MODULE_9__common_model_dashboard_alert_model__["a" /* AlertModel */]();
        overDueTasks.header = this.getOverDueCount(tasks);
        overDueTasks.paragraph = ["Tasks Overdue"];
        overDueTasks.icon = "icon-overdue";
        overDueTasks.id = "overdue";
        overDueTasks.name = "Overdue Tasks";
        overDueTasks.display = true;
        overDueTasks.drilldown.page = "MyTasks";
        overDueTasks.drilldown.params = {
            segment: "TasksAll",
            filterBy: "Past Due",
            dueBy: "PAST_DUE",
        };
        return overDueTasks;
    };
    DashboardService.prototype.getOverDueCount = function (tasks) {
        return tasks.contactTasks.length +
            tasks.contactTasks.length + tasks.referalPartnerTasks.length;
    };
    DashboardService.prototype.getLoanAlerts = function (loans) {
        var loanAlerts = [];
        var drilldown1 = { page: "MyLoans", params: { alertParams: { url: __WEBPACK_IMPORTED_MODULE_7__config_service_url_config__["a" /* Config */].UNLOCKED_LOANS_LIST } } };
        var drilldown2 = { page: "MyLoans", params: { alertParams: { url: __WEBPACK_IMPORTED_MODULE_7__config_service_url_config__["a" /* Config */].EXPIRED_LOANS_LIST } } };
        var drilldown3 = { page: "MyLoans", params: { alertParams: { url: __WEBPACK_IMPORTED_MODULE_7__config_service_url_config__["a" /* Config */].EXPIRING_LOANS_LIST } } };
        var drilldown4 = { page: "MyLoans", params: { alertParams: { url: __WEBPACK_IMPORTED_MODULE_7__config_service_url_config__["a" /* Config */].EXPIRING_LOANS_LIST } } };
        if (loans && loans[0].success) {
            var loanNotLocked = this.getAlertModel(loans[0].count, ["Loans Not locked"], "icon-unlock", "unlock-loans", "Loans Not locked", true, drilldown1);
            loanAlerts.push(loanNotLocked);
        }
        if (loans && loans[1].success) {
            var rateExpired = this.getAlertModel(loans[1].count, ["Rate Locks Expired"], "icon-expired-ratelock", "rate-lock", "Rate Locks Expired", true, drilldown2);
            loanAlerts.push(rateExpired);
        }
        if (loans && loans[2].success) {
            var locksDue = this.getAlertModel(loans[2].count, ["Locks Coming Due in 5 Days"], "icon-due", "unlock-due", "Locks Coming Due in 5 Days", true, drilldown3);
            loanAlerts.push(locksDue);
        }
        var exceedServiceLevel = this.getAlertModel(loans[2].count, ["Loans Exceeding Service Level Days"], "icon-exceed", "exceding-level", "Loans Exceeding Service Level Days", true, drilldown4);
        loanAlerts.push(exceedServiceLevel);
        return loanAlerts;
    };
    DashboardService.prototype.getTaskAlerts = function (tasks) {
        var drilldown1 = { page: "MyTasks", params: { segment: "TasksContacts", filterBy: "Due Today",
                dueBy: "END_OF_DAY" } };
        var drilldown2 = { page: "MyTasks", params: { segment: "TasksLoans", filterBy: "Due Today",
                dueBy: "END_OF_DAY" } };
        var drilldown3 = { page: "MyTasks", params: { segment: "TasksReferral", filterBy: "Due Today",
                dueBy: "END_OF_DAY" } };
        var contactTasks = this.getAlertModel(tasks.contactTasks.length, ["Contact-related Tasks Due Today"], "icon-contact-task", "contact-task", "Contact Related Tasks", true, drilldown1);
        var loanTasks = this.getAlertModel(tasks.loanTasks.length, ["Loan-related Tasks Due Today"], "icon-loan-task", "ref-task", "Loan Related Tasks", true, drilldown2);
        var partnersTask = this.getAlertModel(tasks.referalPartnerTasks.length, ["Referral-related Tasks Due Today"], "icon-ref-task", "referral-task", "Referal Related Tasks", true, drilldown3);
        return [loanTasks, contactTasks, partnersTask];
    };
    DashboardService.prototype.getAppointmentAlerts = function (appointments) {
        var _this = this;
        var appointmentCards = [];
        if (!appointments || !appointments.data) {
            return;
        }
        appointments.data.forEach(function (appointment) {
            var appointmentCard = new __WEBPACK_IMPORTED_MODULE_9__common_model_dashboard_alert_model__["a" /* AlertModel */]();
            appointmentCard.id = "meeting";
            appointmentCard.icon = "icon-meeting";
            appointmentCard.display = true;
            if (appointment.contacts[0]) {
                appointmentCard.header = appointment.contacts[0].contactName;
            }
            appointmentCard.paragraph =
                [appointment.description, _this.getFormattedDateTime(appointment.startDateTime) + " -\n         " + _this.getFormattedDateTime(appointment.endDateTime)];
            appointmentCard.name = "Appointment";
            appointmentCards.push(appointmentCard);
            appointmentCard.drilldown.page = "ViewEvent";
            appointmentCard.drilldown.params = {
                appointmentId: appointment.appointmentId,
            };
        });
        return appointmentCards;
    };
    DashboardService.prototype.getEventAlerts = function (upcomingEvents) {
        var _this = this;
        var eventCards = [];
        if (!upcomingEvents || !upcomingEvents.data) {
            return;
        }
        upcomingEvents.data.forEach(function (event) {
            var eventCard = new __WEBPACK_IMPORTED_MODULE_9__common_model_dashboard_alert_model__["a" /* AlertModel */]();
            eventCard.id = "event";
            eventCard.icon = _this.getEventIcon(event.dateTypeDesc);
            eventCard.display = true;
            eventCard.header = event.contactName;
            eventCard.paragraph = [event.dateTypeDesc + " Today"];
            eventCard.name = "event";
            eventCard.drilldown.page = "EventDetails";
            eventCard.drilldown.params = event;
            eventCards.push(eventCard);
        });
        return eventCards;
    };
    DashboardService.prototype.getLoanAlertsCount = function () {
        var services = [];
        services.push(this.loanService.getUnlockedLoansCount());
        services.push(this.loanService.getExpiredLoansCount());
        services.push(this.loanService.getExpiringLoansCount());
        return __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__["Observable"].forkJoin.apply(__WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__["Observable"], services);
    };
    DashboardService.prototype.getAlertModel = function (count, desc, icon, id, name, display, drilldown) {
        var alertModel = new __WEBPACK_IMPORTED_MODULE_9__common_model_dashboard_alert_model__["a" /* AlertModel */]();
        alertModel.header = count;
        alertModel.paragraph = desc;
        alertModel.icon = icon;
        alertModel.id = id;
        alertModel.name = name;
        alertModel.display = display;
        alertModel.drilldown = drilldown;
        return alertModel;
    };
    DashboardService.prototype.getEventIcon = function (dateTypeDesc) {
        return this.getEventTypeByDesc(dateTypeDesc)[0].icon;
    };
    DashboardService.prototype.getEventTypeByDesc = function (dateTypeDesc) {
        return this.eventTypes.filter(function (eventType) {
            return eventType.dateTypeDesc === dateTypeDesc;
        });
    };
    DashboardService.prototype.getFormattedDateTime = function (dateTime) {
        return __WEBPACK_IMPORTED_MODULE_10_moment___default()(dateTime).local().format("hh:mm A");
    };
    return DashboardService;
}());
DashboardService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"],
        __WEBPACK_IMPORTED_MODULE_3__upcoming_events_service__["a" /* UpcomingEventsService */],
        __WEBPACK_IMPORTED_MODULE_4__schedule_schedule_service__["a" /* ScheduleService */],
        __WEBPACK_IMPORTED_MODULE_5__tasks_service__["a" /* TasksService */],
        __WEBPACK_IMPORTED_MODULE_6__loans_loan_service__["a" /* LoanService */]])
], DashboardService);

//# sourceMappingURL=dashboard.service.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OutLookService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_service_url_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_model_session__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OutLookService = (function () {
    function OutLookService(http, session) {
        this.http = http;
        this.session = session;
    }
    OutLookService.prototype.addScheduleAppoinment = function (appointmentRequest) {
        // moment
        var user = this.session.get("currentUser").username;
        var outlookAppoinment = {
            userId: user,
            subject: appointmentRequest.description,
            content: appointmentRequest.comment,
            startDateTime: appointmentRequest.startDateTime,
            endDateTime: appointmentRequest.endDateTime,
            isOutlookIntegration: "true",
        };
        this.addAppoinment(outlookAppoinment);
    };
    OutLookService.prototype.addEventAppoinment = function (eventRequest) {
        var user = this.session.get("currentUser").username;
        var outlookAppoinment = {
            userId: user,
            subject: eventRequest.dateTypeId + " - " + eventRequest.contactId,
            content: eventRequest.comment,
            startDateTime: eventRequest.dateValue,
            EndDateTime: eventRequest.dateValue,
            isAllDayEvent: "true",
            isOutlookIntegration: "true",
        };
        this.addAppoinment(outlookAppoinment);
    };
    OutLookService.prototype.addAppoinment = function (outlookAppoinment) {
        var user = this.session.get("currentUser").username;
        outlookAppoinment.userId = user;
        this.http.post(__WEBPACK_IMPORTED_MODULE_2__config_service_url_config__["a" /* Config */].INTEGRATION_OUTLOOK_APPOINMENT, outlookAppoinment)
            .subscribe(function (response) {
            if (response && response.status) {
                // console.log(response.status)
            }
        });
        // .catch((error) => {
        //   // console.log('Error : ', error)
        // });
    };
    return OutLookService;
}());
OutLookService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__common_utils_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__common_model_session__["a" /* Session */]])
], OutLookService);

//# sourceMappingURL=outlook-integration.service.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ToolsService = (function () {
    function ToolsService(http) {
        this.http = http;
    }
    ToolsService.prototype.getAdditionalCalculatorResults = function (params) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].ADDITIONAL_PAYMENT_CALCULATOR, params);
    };
    return ToolsService;
}());
ToolsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */]])
], ToolsService);

//# sourceMappingURL=tools.service.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AffordabilityCalculatorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AffordabilityCalculatorService = (function () {
    function AffordabilityCalculatorService(http) {
        this.http = http;
    }
    AffordabilityCalculatorService.prototype.getAffordabilityResult = function (params) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].AFFORDABILITY_CALCULATOR, params);
    };
    AffordabilityCalculatorService.prototype.getRequiredIncomeResult = function (params) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].REQUIRED_INCOME_CALCULATOR, params);
    };
    AffordabilityCalculatorService.prototype.getMaxLoanAmountResult = function (params) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].MAX_LOAN_AMOUNT_CALCULATOR, params);
    };
    return AffordabilityCalculatorService;
}());
AffordabilityCalculatorService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */]])
], AffordabilityCalculatorService);

//# sourceMappingURL=affordability-calculator.service.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuickQualifierService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var QuickQualifierService = (function () {
    function QuickQualifierService(http) {
        this.http = http;
    }
    QuickQualifierService.prototype.getQualifingResults = function (params) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].QUICK_QUALIFIER_URL, params);
    };
    return QuickQualifierService;
}());
QuickQualifierService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */]])
], QuickQualifierService);

//# sourceMappingURL=quick-qualifier.service.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(406);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_model_session__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_utils_infinite_scroll__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_utils_utilities__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_mobile_progress_bar_progress_bar__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_schedule_schedule_service__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_upcoming_events_service__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_auth_service__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_feedback_app_error_handler__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_feedback_exception_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_feedback_feedback_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_home_service__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_tasks_service__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_component__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_contact_service__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_referral_partner_service__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__common_utils_filters__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_loans_loan_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_loans_stats_service__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_notes_service__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_quick_qualifier_service__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_affordability_calculator_service__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_tools_service__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_outlook_integration_service__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_nav_custom_nav_service__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_quotes_quote_service__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_pricing_service__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_dashboard_dashboard_service__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_avatar_avatar_module__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_menu_service__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_scorecard_scorecard_service__ = __webpack_require__(395);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* IonicApp */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_mobile_progress_bar_progress_bar__["a" /* ProgressBar */],
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_mobile_progress_bar_progress_bar__["a" /* ProgressBar */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_34__components_avatar_avatar_module__["a" /* AvatarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */], {
                backButtonIcon: "arrow-left",
                backButtonText: "",
            }, {
                links: [
                    { loadChildren: '../pages/mobile/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/dashboard/dashboard.module#DashboardModule', name: 'Dashboard', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/dashboard/edit-dashboard/edit-dashboard.module#EditDashboardModule', name: 'EditDashboard', segment: 'edit-dashboard', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/loans/loans.module#LoansModule', name: 'MyLoans', segment: 'loans', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/loans/advanced-search/advanced-search.module#AdvancedSearchModule', name: 'advanced-search', segment: 'advanced-search', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/loans/condition-summary/condition-summary.module#ConditionSummaryModule', name: 'conditionSummary', segment: 'condition-summary', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/loans/conditions/conditions.module#ConditionsModule', name: 'conditions', segment: 'conditions', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/loans/documents/documents.module#DocumentsModule', name: 'documents', segment: 'documents', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/loans/loan-summary/loan-summary.module#LoanSummaryModule', name: 'loan-summary', segment: 'loan-summary', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/loans/pricing/pricing.module#PricingModule', name: 'Pricing', segment: 'pricing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/loans/pricing-history/pricing-history.module#PricingHistoryModule', name: 'pricing-history', segment: 'pricing-history', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/loans/select-rate/select-rate.module#SelectRateModule', name: 'SelectRate', segment: 'select-rate', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-contacts/my-contacts.module#MyContactsModule', name: 'MyContacts', segment: 'my-contacts', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-contacts/add-edit-contact/add-edit-contact.module#AddEditContactModule', name: 'AddEditContact', segment: 'add-edit-contact', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-contacts/communication-log/communication-log.module#CommunicationLogModule', name: 'CommunicationLog', segment: 'communication-log', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-contacts/contact-details/contact-details.module#ContactDetailsModule', name: 'ContactDetails', segment: 'contact-details', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-quotes/my-quotes.module#MyQuotesModule', name: 'MyQuotes', segment: 'my-quotes', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-quotes/advanced-search/advanced-search.module#AdvancedSearchModule', name: 'QuotesAdvancedSearch', segment: 'advanced-search', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-quotes/eligible-products/eligible-products.module#EligibleProductsModule', name: 'EligibleProducts', segment: 'eligible-products', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-quotes/loan-calculator/loan-calculator.module#LoanCalculatorModule', name: 'LoanCalculator', segment: 'loan-calculator', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-quotes/new-quote/new-quote.module#NewQuoteModule', name: 'NewQuote', segment: 'new-quote', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/notes-page/notes-page.module#NotesPageModule', name: 'NotesPage', segment: 'notes-page', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-quotes/quotes-calculator/quotes-calculator.module#QuotesCalculatorModule', name: 'QuotesCalculator', segment: 'quotes-calculator', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-quotes/quotes-comparison/quotes-comparison.module#QuotesComparisonModule', name: 'QuotesComparison', segment: 'quotes-comparison', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-quotes/quotes-product/quotes-product.module#QuotesProductModule', name: 'QuotesProduct', segment: 'quotes-product', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-quotes/quotes-rates/quotes-rates.module#QuotesRatesModule', name: 'QuotesRates', segment: 'quotes-rates', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-referral-partners/my-referral-partners.module#MyReferralPartnersModule', name: 'MyReferralPartners', segment: 'my-referral-partners', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-referral-partners/add-edit-referral-account/add-edit-referral-account.module#AddEditReferralAccountModule', name: 'AddEditReferralAccount', segment: 'add-edit-referral-account', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-referral-partners/add-edit-referral-partner/add-edit-referral-partner.module#AddEditReferralPartnerModule', name: 'AddEditReferralPartner', segment: 'add-edit-referral-partner', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-referral-partners/referral-account-contacts/referral-account-contacts.module#ReferralAccountContactsModule', name: 'ReferralAccountContacts', segment: 'referral-account-contacts', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-referral-partners/referral-account-details/referral-account-details.module#ReferralAccountDetailsModule', name: 'ReferralAccountDetails', segment: 'referral-account-details', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-tasks/my-tasks.module#MyTasksModule', name: 'MyTasks', segment: 'my-tasks', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-referral-partners/referral-partner-details/referral-partner-details.module#ReferralPartnerDetailsModule', name: 'ReferralPartnerDetails', segment: 'referral-partner-details', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-schedule/my-schedule.module#MyScheduleModule', name: 'MySchedule', segment: 'my-schedule', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-schedule/month-view/month-view.module#MonthViewModule', name: 'MonthView', segment: 'month-view', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-schedule/add-edit-event/add-edit-event.module#AddEditEventModule', name: 'AddEditEvent', segment: 'add-edit-event', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-schedule/view-event/view-event.module#ViewEventModule', name: 'ViewEvent', segment: 'view-event', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-tasks/add-task/add-task.module#AddTaskModule', name: 'AddTask', segment: 'add-task', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-tasks/edit-task/edit-task.module#EditTaskModule', name: 'EditTask', segment: 'edit-task', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-tasks/task-filter-popover/task-filter-popover.module#TaskFilterPopoverModule', name: 'TaskFilterPopover', segment: 'task-filter-popover', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-tasks/task-status-popover/task-status-popover.module#TaskStatusPopoverModule', name: 'TaskStatusPopover', segment: 'task-status-popover', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-tools/my-tools.module#MyToolsModule', name: 'MyTools', segment: 'my-tools', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-tools/additional-payment-calculator/additional-payment-calculator.module#AdditionalPaymentCalculatorModule', name: 'AdditionalPaymentCalculator', segment: 'additional-payment-calculator', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-tools/additional-payment-calculator-results/additional-payment-calculator-results.module#AdditionalPaymentCalculatorResultsModule', name: 'AdditionalPaymentCalculatorResults', segment: 'additional-payment-calculator-results', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-tools/affordability-calculator/affordability-calculator.module#AffordabilityCalculatorModule', name: 'AffordabilityCalculator', segment: 'affordability-calculator', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-tools/affordability-calculator/affordability-calculator-results/affordability-calculator-results.module#AffordabilityCalculatorResultsModule', name: 'AffordabilityCalculatorResults', segment: 'affordability-calculator-results', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-tools/quick-qualifier/quick-qualifier.module#QuickQualifierModule', name: 'QuickQualifier', segment: 'quick-qualifier', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/my-tools/quick-qualifier/quick-qualifier-results/quick-qualifier-results.module#QuickQualifierResultsModule', name: 'QuickQualifierResults', segment: 'quick-qualifier-results', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/picture-editor/picture-editor.module#PictureEditorModule', name: 'PictureEditor', segment: 'picture-editor', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/score-card/score-card.module#ScoreCardPageModule', name: 'ScoreCardPage', segment: 'score-card', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/settings/settings.module#SettingsModule', name: 'Settings', segment: 'settings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/upcoming-events/upcoming-events.module#UpcomingEventsModule', name: 'UpcomingEvents', segment: 'upcoming-events', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/upcoming-events/add-event/add-event.module#AddEventModule', name: 'AddEvent', segment: 'add-event', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/upcoming-events/event-details/event-details.module#EventDetailsModule', name: 'EventDetails', segment: 'event-details', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobile/viewer/viewer.module#ViewerModule', name: 'viewer', segment: 'viewer', priority: 'low', defaultHistory: [] }
                ]
            }),
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__common_utils_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_13__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_10__pages_mobile_progress_bar_progress_bar__["a" /* ProgressBar */],
            __WEBPACK_IMPORTED_MODULE_16__providers_feedback_feedback_service__["a" /* FeedbackService */],
            __WEBPACK_IMPORTED_MODULE_17__providers_home_service__["a" /* HomeService */],
            __WEBPACK_IMPORTED_MODULE_8__common_utils_infinite_scroll__["a" /* InfiniteScroll */],
            __WEBPACK_IMPORTED_MODULE_9__common_utils_utilities__["a" /* Utilities */],
            __WEBPACK_IMPORTED_MODULE_12__providers_upcoming_events_service__["a" /* UpcomingEventsService */],
            __WEBPACK_IMPORTED_MODULE_20__providers_contact_service__["a" /* ContactService */],
            __WEBPACK_IMPORTED_MODULE_21__providers_referral_partner_service__["a" /* ReferralPartnerService */],
            __WEBPACK_IMPORTED_MODULE_22__common_utils_filters__["a" /* Filters */],
            __WEBPACK_IMPORTED_MODULE_11__providers_schedule_schedule_service__["a" /* ScheduleService */],
            __WEBPACK_IMPORTED_MODULE_18__providers_tasks_service__["a" /* TasksService */],
            __WEBPACK_IMPORTED_MODULE_6__common_model_session__["a" /* Session */],
            __WEBPACK_IMPORTED_MODULE_15__providers_feedback_exception_service__["a" /* ExceptionService */],
            __WEBPACK_IMPORTED_MODULE_23__providers_loans_loan_service__["a" /* LoanService */],
            __WEBPACK_IMPORTED_MODULE_24__providers_loans_stats_service__["a" /* StatsService */],
            __WEBPACK_IMPORTED_MODULE_25__providers_notes_service__["a" /* NotesService */],
            __WEBPACK_IMPORTED_MODULE_26__providers_quick_qualifier_service__["a" /* QuickQualifierService */],
            __WEBPACK_IMPORTED_MODULE_29__providers_outlook_integration_service__["a" /* OutLookService */],
            __WEBPACK_IMPORTED_MODULE_27__providers_affordability_calculator_service__["a" /* AffordabilityCalculatorService */],
            __WEBPACK_IMPORTED_MODULE_28__providers_tools_service__["a" /* ToolsService */],
            __WEBPACK_IMPORTED_MODULE_30__providers_nav_custom_nav_service__["a" /* CustomNavService */],
            __WEBPACK_IMPORTED_MODULE_31__providers_quotes_quote_service__["a" /* QuoteService */],
            __WEBPACK_IMPORTED_MODULE_32__providers_pricing_service__["a" /* PricingService */],
            __WEBPACK_IMPORTED_MODULE_33__providers_dashboard_dashboard_service__["a" /* DashboardService */],
            __WEBPACK_IMPORTED_MODULE_35__providers_menu_service__["a" /* MenuService */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_14__providers_feedback_app_error_handler__["a" /* AppErrorHandler */] }, __WEBPACK_IMPORTED_MODULE_36__providers_scorecard_scorecard_service__["a" /* ScorecardService */],
        ],
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Filters; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// tslint:disable



var Filters = Filters_1 = (function () {
    function Filters() {
    }
    /**
     * Currency filter
     * 12345 => $12,345.00
     * @param {Number} value
     * @param {String} Currency ($)
     * @param {Number} decimals Decimal places
     */
    Filters.currency = function (value, currency, decimals) {
        var digitsRE = /(\d{3})(?=\d)/g;
        value = parseFloat(value);
        if (!isFinite(value) || (!value && value !== 0)) {
            return "";
        }
        currency = currency != null ? currency : "$";
        var SOME = 2;
        decimals = decimals != null ? decimals : SOME;
        var STRINGIFIED = Math.abs(value).toFixed(decimals);
        var interger = decimals
            ? STRINGIFIED.slice(0, -1 - decimals)
            : STRINGIFIED;
        var i = interger.length % 3;
        var head = i > 0
            ? (interger.slice(0, i) + (interger.length > 3 ? "," : ""))
            : "";
        var floatValue = decimals
            ? STRINGIFIED.slice(-1 - decimals)
            : "";
        var sign = value < 0 ? "-" : "";
        return sign + currency + head +
            interger.slice(i).replace(digitsRE, "$1,") +
            floatValue;
    };
    /**
     Percent filter
      10 => 10.00%
       20.012 => 20.012%
       0 => 0.00%
       @param {Number} value
       @param {Number} decimals Decimal places
     */
    Filters.percent = function (value, decimals) {
        value = parseFloat(value);
        if (!isFinite(value) || (!value && value !== 0)) {
            return "";
        }
        decimals = decimals != null ? decimals : 2;
        if (Number.isInteger(value)) {
            var stringified = Math.abs(value).toFixed(decimals);
            return stringified + "%";
        }
        return value + "%";
    };
    //
    Filters.stripPhoneFormatting = function (phone) {
        return phone.replace(/[^\d]/g, "");
    };
    //
    Filters.formatPhoneNumber = function (phone) {
        phone = Filters_1.stripPhoneFormatting(phone);
        return "(" + phone.substr(0, 3) + ") " + phone.substr(3, 3) + "-" + phone.substr(6, 4);
    };
    Filters.formatSSN = function (ssn) {
        return ssn.substr(0, 3) + "-" + ssn.substr(3, 2) + "-" + ssn.substr(5, 4);
    };
    // public camelize(str) {
    //   return str
    //       .replace(/\s(.)/g, function($1) { return $1.toUpperCase() })
    //       .replace(/\s/g, "")
    //       .replace(/^(.)/, function($1) { return $1.toLowerCase() });
    // }
    //
    // tslint:disable-next-line:member-ordering
    Filters.concat = function (value1, value2, delimiter) {
        if (!value2 && !value1) {
            return "";
        }
        delimiter = delimiter != null ? delimiter : "/";
        if (!value1) {
            return delimiter + " " + value2;
        }
        if (!value2) {
            return value1 + " " + delimiter;
        }
        return value1 + " " + delimiter + " " + value2;
    };
    // public formatDateTime(dateTime) {
    //   if (!this.isDate(dateTime)) {
    //     return "";
    //   }
    //   return Moment(dateTime).format("MM/DD/YYYY HH:mm A");
    // }
    //
    // public calendar(date) {
    //   if (!this.isDate(date)) {
    //     return "";
    //   }
    //   date = date.toString();
    //   return Moment(new Date(date)).calendar(null, {
    //     sameDay: "[Today] HH:mm A",
    //     nextDay: "[Tomorrow] HH:mm A",
    //     nextWeek: "MM/DD/YYYY HH:mm A",
    //     lastDay: "[Yesterday] HH:mm A",
    //     lastWeek: "MM/DD/YYYY HH:mm A",
    //     sameElse: "MM/DD/YYYY HH:mm A",
    //   });
    // }
    // Returns USA FORMAT MM/DD/YYYY
    Filters.formatDate = function (date) {
        if (!Filters_1.isDate(date)) {
            return "";
        }
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(date).format("MM/DD/YYYY");
    };
    // format Currency - Billions like  $1B, Millions like $1M, Thousands like $1K
    Filters.formatCurrencyShort = function (num, doNotShowCurrency, enableHtml) {
        if (enableHtml === void 0) { enableHtml = false; }
        var currency = doNotShowCurrency ? '' : '$';
        if (num >= 1000000000) {
            return currency + (num / 1000000000).toFixed(1).replace(/\.0$/, "") + (enableHtml ? "<i>B</i>" : "B");
        }
        if (num >= 1000000) {
            return currency + (num / 1000000).toFixed(1).replace(/\.0$/, "") + (enableHtml ? "<i>M</i>" : "M");
        }
        if (num >= 1000) {
            return currency + (num / 1000).toFixed(1).replace(/\.0$/, "") + (enableHtml ? "<i>K</i>" : "K");
        }
        return currency + num;
    };
    // /**
    //    get Date in the format "Saturday 24th June 2017"
    //    "Saturday 24th June 2017"
    //    @param {date} Date
    // */
    Filters.getFullDateString = function (date) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(date).format("dddd Do MMMM YYYY");
    };
    // /**
    //   * get Time in the format "2:56 PM"
    //   * "2:56 PM"
    //   * @param {date} Date
    // */
    Filters.getTimeString = function (date) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(date).format("LT");
    };
    // Method to check if the string can be parsed to date
    Filters.isDate = function (date) {
        if (!date) {
            return false;
        }
        if (isNaN(Date.parse(date))) {
            return false;
        }
        return true;
    };
    Filters.removePercent = function (value) {
        return parseFloat(value.toString().replace("%", ""));
    };
    Filters.getFullMonth = function (monthShortForm) {
        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December", ""];
        var myDate = new Date(monthShortForm + " 1, 2000");
        var monthDigit = myDate.getMonth();
        return months[isNaN(monthDigit) ? 12 : (monthDigit)];
    };
    // returns in objects- { currency: '$', value: '2.5', denomination: 'B'}
    Filters.formatCurrencyShortObject = function (num, doNotShowCurrency) {
        var currency = doNotShowCurrency ? '' : '$';
        if (num >= 1000000000) {
            return { currency: currency, value: (num / 1000000000).toFixed(1).replace(/\.0$/, ""), denomination: "B" };
        }
        if (num >= 1000000) {
            return { currency: currency, value: (num / 1000000).toFixed(1).replace(/\.0$/, ""), denomination: "M" };
        }
        if (num >= 1000) {
            return { currency: currency, value: (num / 1000).toFixed(1).replace(/\.0$/, ""), denomination: "K" };
        }
        return { currency: currency, value: num, denomination: '' };
    };
    return Filters;
}());
Filters = Filters_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Filters);

var Filters_1;
//# sourceMappingURL=filters.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoanService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service_url_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_model_loan_loan_summary_model__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_model_loan_loan_model__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_model_loan_borrower_model__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_model_loan_property_model__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_feedback_feedback_service__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LoanService = (function () {
    function LoanService(http, feedback) {
        this.http = http;
        this.feedback = feedback;
    }
    LoanService.prototype.getAllLoanStatus = function () {
        var _this = this;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LOAN_STATUS_TYPES)
            .map(function (response) {
            var result = [];
            if (response && response.data) {
                result = response.data.map(function (element) { return ({
                    value: element.loanStatusTypeId, name: element.loanStatusDescription,
                }); });
                result.push.apply(result, _this.getStaticLoanTypes());
                return result;
            }
        });
    };
    LoanService.prototype.getAllLockStatus = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LOAN_LOCK_STATUS_TYPES)
            .map(function (response) {
            return response.data.map(function (element) { return ({
                value: element.rateLockStatusTypeId,
                name: element.rateLockStatusTypeDesc,
            }); });
        });
    };
    LoanService.prototype.getAllLoanPurpose = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LOAN_PURPOSE_TYPES)
            .map(function (response) {
            return response.data.map(function (element) { return ({
                value: element.loanPurposeTypeId, name: element.loanPurposeTypeDesc,
            }); });
        });
    };
    LoanService.prototype.getMyPipelines = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].PIPLINE_SUMMARY_URL);
    };
    LoanService.prototype.getAuthLoanId = function (loanNumber) {
        var params = {
            lenderLoanNumber: loanNumber,
        };
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].OPEN_LOAN_URL, params);
    };
    LoanService.prototype.setBorrowerDetails = function (borrowers, borrowerLoanDetails) {
        if (!borrowerLoanDetails) {
            return;
        }
        borrowerLoanDetails.forEach(function (borrower) {
            var borrowerInfo = new __WEBPACK_IMPORTED_MODULE_7__common_model_loan_borrower_model__["a" /* BorrowerModel */]();
            borrowerInfo.income = __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].currency(borrower.borrowerIncome, "$", 0);
            borrowerInfo.assets = __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].currency(borrower.borrowerTotalAssets, "$", 0);
            borrowerInfo.liabilites = __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].currency(borrower.borrowerTotalLiabilities, "$", 0);
            borrowerInfo.telephone = borrower.borrowerContactNumber;
            borrowerInfo.name = borrower.borrowerName;
            borrowerInfo.type = borrower.borrowerRoleId;
            borrowerInfo.email = borrower.emailAddress;
            borrowerInfo.contactId = borrower.contactId;
            borrowers.push(borrowerInfo);
        });
    };
    LoanService.prototype.setSummary = function (loan, readSummary) {
        if (!readSummary) {
            return;
        }
        loan.status = readSummary.loanStatusDesc;
        loan.intrest = __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].percent(readSummary.interestRate, 2);
        loan.ltvcltv = __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].concat(__WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].percent(readSummary.ltvRatioPct, 2), __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].percent(readSummary.cltvRatioPct, 2));
        loan.product = readSummary.loanProductDesc;
        loan.program = readSummary.loanProgramTypeDesc;
        loan.purpose = readSummary.loanPurposeTypeDesc;
        loan.creditScore = readSummary.qualCreditScore;
        loan.frontBackRatio = __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].concat(__WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].percent(readSummary.housingExpenseRatio, 2), __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].percent(readSummary.debtRatio, 2));
        loan.amount = __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].currency(readSummary.totalLoanAmt, "$", 2);
        loan.amountWithoutFormat = readSummary.totalLoanAmt;
    };
    LoanService.prototype.setPropertyInfo = function (property, subjectProperty, summary) {
        if (!property || !subjectProperty || !summary) {
            return;
        }
        property.address = subjectProperty.addressLineOne + ", " + subjectProperty.city + ",\n     " + subjectProperty.stateId + " " + subjectProperty.postalCodeId;
        property.type = subjectProperty.propertyTypeId;
        property.occupancy = summary.occupancyTypeDesc;
        property.purchasePrice = __WEBPACK_IMPORTED_MODULE_4__common_utils_filters__["a" /* Filters */].currency(summary.purchasePrice, "$", 2);
    };
    LoanService.prototype.getLoanSummary = function (loanNumber) {
        var _this = this;
        var params = {
            loanNumber: loanNumber,
        };
        var loader = this.feedback.getLoader();
        loader.present();
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].LOAN_SUMMARY_AGGREGATOR_API, params)
            .map(function (response) {
            var loanSummaryModel = new __WEBPACK_IMPORTED_MODULE_5__common_model_loan_loan_summary_model__["a" /* LoanSummaryModel */]();
            var loan = new __WEBPACK_IMPORTED_MODULE_6__common_model_loan_loan_model__["a" /* LoanModel */]();
            var borrowers = [];
            var propertyInfo = new __WEBPACK_IMPORTED_MODULE_8__common_model_loan_property_model__["a" /* PropertyModel */]();
            _this.setSummary(loan, response.loanSummary);
            loan.loanNumber = loanNumber;
            _this.setBorrowerDetails(borrowers, response.borrowers);
            _this.setPropertyInfo(propertyInfo, response.propertyInfo, response.loanSummary);
            loanSummaryModel.loan = loan;
            loanSummaryModel.borrowers = borrowers;
            loanSummaryModel.property = propertyInfo;
            return loanSummaryModel;
        }).finally(function () {
            loader.dismiss();
        });
    };
    LoanService.prototype.getStaticLoanTypes = function () {
        return [
            {
                name: "0000..0099 - All Lead",
                value: "0000..0099",
            },
            {
                name: "0100..0199 - All Prospect",
                value: "0100..0199",
            },
            {
                name: "0200..0299 - All Application",
                value: "0200..0299",
            },
            {
                name: "0300..0399 - All Set-Up ",
                value: "0300..0399",
            },
            {
                name: "0400..0499 - All Processing",
                value: "0400..0499",
            },
            {
                name: "0500..0599 - All Underwriting",
                value: "0500..0599",
            },
            {
                name: "0600..0699 - All Approved",
                value: "0600..0699",
            },
            {
                name: "0700..0799 - All Clear to Close",
                value: "0700..0799",
            },
            {
                name: "0800..0899 - All Closing",
                value: "0800..0899",
            },
            {
                name: "0900..1099 - All Funding",
                value: "0900..1099",
            },
            {
                name: "1100..1199 - All Post Closing",
                value: "1100..1199",
            },
            {
                name: "1200..1299 - All Delivery",
                value: "1200..1299",
            },
            {
                name: "1300..1399 - All Withdrawn",
                value: "1300..1399",
            },
            {
                name: "1400..1499 - All Cancelled",
                value: "1400..1499",
            },
            {
                name: "1500..9999 - All Denied ",
                value: "1500..9999",
            },
        ];
    };
    LoanService.prototype.getUnlockedLoansCount = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UNLOCKED_LOANS_COUNT);
    };
    LoanService.prototype.getExpiredLoansCount = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].EXPIRED_LOANS_COUNT);
    };
    LoanService.prototype.getExpiringLoansCount = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].EXPIRING_LOANS_COUNT);
    };
    LoanService.prototype.getLoanLockedStatus = function (lenderLoanNumber) {
        var loanLockedStatusRequest = { lenderLoanNumber: lenderLoanNumber };
        var formData = new FormData();
        formData.append("lenderLoanNumber", lenderLoanNumber);
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].GET_LOAN_LOCKED_STATUS, formData);
    };
    LoanService.prototype.unlockLockedLoans = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__config_service_url_config__["a" /* Config */].UNLOCK_LOCKED_LOANS);
    };
    return LoanService;
}());
LoanService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_utils_http_service__["a" /* HttpService */],
        __WEBPACK_IMPORTED_MODULE_9__providers_feedback_feedback_service__["a" /* FeedbackService */]])
], LoanService);

//# sourceMappingURL=loan.service.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExceptionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feedback_service__ = __webpack_require__(36);
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
    return ExceptionService;
}());
ExceptionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__feedback_service__["a" /* FeedbackService */]])
], ExceptionService);

//# sourceMappingURL=exception.service.js.map

/***/ }),

/***/ 694:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 228,
	"./af.js": 228,
	"./ar": 229,
	"./ar-dz": 230,
	"./ar-dz.js": 230,
	"./ar-kw": 231,
	"./ar-kw.js": 231,
	"./ar-ly": 232,
	"./ar-ly.js": 232,
	"./ar-ma": 233,
	"./ar-ma.js": 233,
	"./ar-sa": 234,
	"./ar-sa.js": 234,
	"./ar-tn": 235,
	"./ar-tn.js": 235,
	"./ar.js": 229,
	"./az": 236,
	"./az.js": 236,
	"./be": 237,
	"./be.js": 237,
	"./bg": 238,
	"./bg.js": 238,
	"./bn": 239,
	"./bn.js": 239,
	"./bo": 240,
	"./bo.js": 240,
	"./br": 241,
	"./br.js": 241,
	"./bs": 242,
	"./bs.js": 242,
	"./ca": 243,
	"./ca.js": 243,
	"./cs": 244,
	"./cs.js": 244,
	"./cv": 245,
	"./cv.js": 245,
	"./cy": 246,
	"./cy.js": 246,
	"./da": 247,
	"./da.js": 247,
	"./de": 248,
	"./de-at": 249,
	"./de-at.js": 249,
	"./de-ch": 250,
	"./de-ch.js": 250,
	"./de.js": 248,
	"./dv": 251,
	"./dv.js": 251,
	"./el": 252,
	"./el.js": 252,
	"./en-au": 253,
	"./en-au.js": 253,
	"./en-ca": 254,
	"./en-ca.js": 254,
	"./en-gb": 255,
	"./en-gb.js": 255,
	"./en-ie": 256,
	"./en-ie.js": 256,
	"./en-nz": 257,
	"./en-nz.js": 257,
	"./eo": 258,
	"./eo.js": 258,
	"./es": 259,
	"./es-do": 260,
	"./es-do.js": 260,
	"./es.js": 259,
	"./et": 261,
	"./et.js": 261,
	"./eu": 262,
	"./eu.js": 262,
	"./fa": 263,
	"./fa.js": 263,
	"./fi": 264,
	"./fi.js": 264,
	"./fo": 265,
	"./fo.js": 265,
	"./fr": 266,
	"./fr-ca": 267,
	"./fr-ca.js": 267,
	"./fr-ch": 268,
	"./fr-ch.js": 268,
	"./fr.js": 266,
	"./fy": 269,
	"./fy.js": 269,
	"./gd": 270,
	"./gd.js": 270,
	"./gl": 271,
	"./gl.js": 271,
	"./gom-latn": 272,
	"./gom-latn.js": 272,
	"./he": 273,
	"./he.js": 273,
	"./hi": 274,
	"./hi.js": 274,
	"./hr": 275,
	"./hr.js": 275,
	"./hu": 276,
	"./hu.js": 276,
	"./hy-am": 277,
	"./hy-am.js": 277,
	"./id": 278,
	"./id.js": 278,
	"./is": 279,
	"./is.js": 279,
	"./it": 280,
	"./it.js": 280,
	"./ja": 281,
	"./ja.js": 281,
	"./jv": 282,
	"./jv.js": 282,
	"./ka": 283,
	"./ka.js": 283,
	"./kk": 284,
	"./kk.js": 284,
	"./km": 285,
	"./km.js": 285,
	"./kn": 286,
	"./kn.js": 286,
	"./ko": 287,
	"./ko.js": 287,
	"./ky": 288,
	"./ky.js": 288,
	"./lb": 289,
	"./lb.js": 289,
	"./lo": 290,
	"./lo.js": 290,
	"./lt": 291,
	"./lt.js": 291,
	"./lv": 292,
	"./lv.js": 292,
	"./me": 293,
	"./me.js": 293,
	"./mi": 294,
	"./mi.js": 294,
	"./mk": 295,
	"./mk.js": 295,
	"./ml": 296,
	"./ml.js": 296,
	"./mr": 297,
	"./mr.js": 297,
	"./ms": 298,
	"./ms-my": 299,
	"./ms-my.js": 299,
	"./ms.js": 298,
	"./my": 300,
	"./my.js": 300,
	"./nb": 301,
	"./nb.js": 301,
	"./ne": 302,
	"./ne.js": 302,
	"./nl": 303,
	"./nl-be": 304,
	"./nl-be.js": 304,
	"./nl.js": 303,
	"./nn": 305,
	"./nn.js": 305,
	"./pa-in": 306,
	"./pa-in.js": 306,
	"./pl": 307,
	"./pl.js": 307,
	"./pt": 308,
	"./pt-br": 309,
	"./pt-br.js": 309,
	"./pt.js": 308,
	"./ro": 310,
	"./ro.js": 310,
	"./ru": 311,
	"./ru.js": 311,
	"./sd": 312,
	"./sd.js": 312,
	"./se": 313,
	"./se.js": 313,
	"./si": 314,
	"./si.js": 314,
	"./sk": 315,
	"./sk.js": 315,
	"./sl": 316,
	"./sl.js": 316,
	"./sq": 317,
	"./sq.js": 317,
	"./sr": 318,
	"./sr-cyrl": 319,
	"./sr-cyrl.js": 319,
	"./sr.js": 318,
	"./ss": 320,
	"./ss.js": 320,
	"./sv": 321,
	"./sv.js": 321,
	"./sw": 322,
	"./sw.js": 322,
	"./ta": 323,
	"./ta.js": 323,
	"./te": 324,
	"./te.js": 324,
	"./tet": 325,
	"./tet.js": 325,
	"./th": 326,
	"./th.js": 326,
	"./tl-ph": 327,
	"./tl-ph.js": 327,
	"./tlh": 328,
	"./tlh.js": 328,
	"./tr": 329,
	"./tr.js": 329,
	"./tzl": 330,
	"./tzl.js": 330,
	"./tzm": 331,
	"./tzm-latn": 332,
	"./tzm-latn.js": 332,
	"./tzm.js": 331,
	"./uk": 333,
	"./uk.js": 333,
	"./ur": 334,
	"./ur.js": 334,
	"./uz": 335,
	"./uz-latn": 336,
	"./uz-latn.js": 336,
	"./uz.js": 335,
	"./vi": 337,
	"./vi.js": 337,
	"./x-pseudo": 338,
	"./x-pseudo.js": 338,
	"./yo": 339,
	"./yo.js": 339,
	"./zh-cn": 340,
	"./zh-cn.js": 340,
	"./zh-hk": 341,
	"./zh-hk.js": 341,
	"./zh-tw": 342,
	"./zh-tw.js": 342
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 694;

/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoanSummaryModel; });
var LoanSummaryModel = (function () {
    function LoanSummaryModel() {
    }
    return LoanSummaryModel;
}());

//# sourceMappingURL=loan-summary.model.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoanModel; });
var LoanModel = (function () {
    function LoanModel() {
    }
    return LoanModel;
}());

//# sourceMappingURL=loan.model.js.map

/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BorrowerModel; });
var BorrowerModel = (function () {
    function BorrowerModel() {
    }
    return BorrowerModel;
}());

//# sourceMappingURL=borrower.model.js.map

/***/ }),

/***/ 698:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyModel; });
var PropertyModel = (function () {
    function PropertyModel() {
    }
    return PropertyModel;
}());

//# sourceMappingURL=property.model.js.map

/***/ }),

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertModel; });
var AlertModel = (function () {
    function AlertModel() {
        this.drilldown = {
            page: null,
            params: null,
        };
    }
    return AlertModel;
}());

//# sourceMappingURL=alert.model.js.map

/***/ }),

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Avatar; });
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

var Avatar = (function () {
    // tslint:disable-next-line:no-empty
    function Avatar() {
        this.size = "45px";
        this.letters = 2;
        this.borderradius = "";
    }
    Avatar.prototype.getRandomColor = function () {
        var letters = "0123456789ABCDEF".split("");
        var color = "#";
        // tslint:disable-next-line:no-magic-numbers
        for (var i = 0; i < 6; i++) {
            // tslint:disable-next-line:no-magic-numbers
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    Avatar.prototype.ngOnChanges = function () {
        if (this.name && this.name.trim().length) {
            var nameInitials = this.name.match(/\b(\w)/g);
            // const nameLetters = nameInitials.slice(0, 3).join('');
            this.name = nameInitials.slice(0, 3).join("").toUpperCase();
            if (this.letters > 0) {
                this.name = this.name.substr(0, this.letters);
            }
        }
        switch (this.displayType) {
            case "rounded":
                this.borderradius = "5%";
                break;
            case "circle":
                this.borderradius = "50%";
                break;
            default:
                this.borderradius = "50%";
        }
    };
    return Avatar;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("imageUrl"),
    __metadata("design:type", String)
], Avatar.prototype, "imageUrl", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("name"),
    __metadata("design:type", String)
], Avatar.prototype, "name", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("size"),
    __metadata("design:type", String)
], Avatar.prototype, "size", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("displayType"),
    __metadata("design:type", String)
], Avatar.prototype, "displayType", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("letters"),
    __metadata("design:type", Number)
], Avatar.prototype, "letters", void 0);
Avatar = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "avatar",template:/*ion-inline-start:"/Office/SFA-Angular2/src/components/avatar/avatar.html"*/'<div class="avatar" [style.width]="size" [style.line-height]=\'size\' [style.height]=\'size\' [style.border-radius]=\'borderradius\'>\n  <img *ngIf="imageUrl" [src]="imageUrl" />\n  <span *ngIf="name" class="name">{{ name }}</span>\n</div>'/*ion-inline-end:"/Office/SFA-Angular2/src/components/avatar/avatar.html"*/,
    }),
    __metadata("design:paramtypes", [])
], Avatar);

//# sourceMappingURL=avatar.js.map

/***/ }),

/***/ 718:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
 * USAGE:
 * - include <progress-bar></progress-bar> in the html file
 * - To set progress value programatically:
 *    - inject ProgressBar in constructor
 *    - this.progressBar.setProgress(<progress value>)
 *  progressvalue should be in the range (0, 100)
 */
var ProgressBar = (function () {
    function ProgressBar() {
    }
    ProgressBar.prototype.setProgress = function (progress) {
        if (!this.progressBarEl) {
            this.progressBarEl = document.getElementById("progress-value");
        }
        if (progress >= 0 && progress <= 100) {
            this.progressBarEl.style.width = progress + "vw";
        }
    };
    return ProgressBar;
}());
ProgressBar = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "progress-bar",template:/*ion-inline-start:"/Office/SFA-Angular2/src/pages/mobile/progress-bar/progress-bar.html"*/'<div id="progress-bar" class="progress-bar">\n  <div id="progress-value" class="progress">\n  </div>\n</div>\n'/*ion-inline-end:"/Office/SFA-Angular2/src/pages/mobile/progress-bar/progress-bar.html"*/,
    })
], ProgressBar);

//# sourceMappingURL=progress-bar.js.map

/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppErrorHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__exception_service__ = __webpack_require__(63);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Default implementation of ErrorHandler.
 * This is a global error handler, handles all the errors thrown
 * from the low level implementations.
 */
var AppErrorHandler = (function (_super) {
    __extends(AppErrorHandler, _super);
    function AppErrorHandler(exceptionService) {
        var _this = _super.call(this) || this;
        _this.exceptionService = exceptionService;
        return _this;
    }
    /**
     * Logs the error in the console.
     */
    AppErrorHandler.prototype.handleError = function (error) {
        this.log(error);
        _super.prototype.handleError.call(this, error);
    };
    /**
     * Logs the error in the server side
     */
    AppErrorHandler.prototype.log = function (error) {
        this.exceptionService.log(error);
    };
    return AppErrorHandler;
}(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"]));
AppErrorHandler = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__exception_service__["a" /* ExceptionService */]])
], AppErrorHandler);

//# sourceMappingURL=app-error.handler.js.map

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_home_service__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_menu_service__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_utils_http_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_nav_custom_nav_service__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_loans_loan_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_feedback_feedback_messages__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_feedback_feedback_service__ = __webpack_require__(36);
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
    function MyApp(platform, statusBar, splashScreen, auth, homeService, ngZone, app, http, navService, menuService, menuCtrl, modalCtrl, loanService, feedbackService) {
        this.platform = platform;
        this.auth = auth;
        this.homeService = homeService;
        this.ngZone = ngZone;
        this.app = app;
        this.http = http;
        this.navService = navService;
        this.menuService = menuService;
        this.menuCtrl = menuCtrl;
        this.modalCtrl = modalCtrl;
        this.loanService = loanService;
        this.feedbackService = feedbackService;
        this.rootPage = "LoginPage";
        this.firstTime = true;
        this.firstLoad = true;
        this.activePage = "Dashboard";
        this.displayMenu = true;
        this.pictureURL = "assets/images/steve.jpg";
        this.showSplitPane = false;
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.initPages();
        this.onResize();
    }
    MyApp.prototype.ngOnInit = function () {
        var _this = this;
        // this.persistPage();
        // Logout if the session has expired
        this.hasSessionExpired = this.http.hasSessionExpiredObservable.subscribe(function (value) {
            if (value) {
                _this.logout();
            }
        });
    };
    /**
     * 1) Observe changes everytime a new page is entered
     * 2) If it is a fresh instance of the app and if a entry for the last visted
     *  page exists in the local storage, navigate to that page to resume state
     * 3) Set the new instance flag to false and set the new page entered into the local storage
     */
    MyApp.prototype.persistPage = function () {
        var _this = this;
        this.nav.viewDidEnter.subscribe(function (view) {
            var pageName = view.instance.constructor.name;
            if (typeof (Storage) !== "undefined") {
                if (_this.firstLoad &&
                    window.localStorage.getItem("currentLocation") &&
                    window.localStorage.getItem("currentLocation") !== pageName) {
                    _this.firstLoad = false;
                    _this.nav.setRoot(window.localStorage.getItem("currentLocation")).then(function () {
                        // tslint:disable:no-magic-numbers
                        _this.activePage = window.localStorage.getItem("currentLocation");
                        if (window.innerWidth >= 800 && window.localStorage.getItem("currentLocation") !== "Dashboard"
                            && window.localStorage.getItem("currentLocation") !== "LoginPage") {
                            _this.showSplitPane = true;
                        }
                    });
                }
                _this.firstLoad = false;
                window.localStorage.setItem("currentLocation", pageName);
            }
        });
    };
    MyApp.prototype.menuOpened = function () {
        if (this.firstTime) {
            this.getLiveCounts();
            this.username = this.auth.getUserName();
            this.firstTime = false;
        }
    };
    MyApp.prototype.onResize = function () {
        // tslint:disable-next-line:no-magic-numbers
        if (window.innerWidth >= 800 && this.activePage !== "Dashboard") {
            this.showSplitPane = true;
        }
        else {
            this.showSplitPane = false;
        }
    };
    MyApp.prototype.openMenuContentPage = function (menuItem) {
        var _this = this;
        if (this.activePage === "MyLoans") {
            this.loanService.unlockLockedLoans().subscribe(function (response) {
                if (response && !response.success) {
                    _this.feedbackService.showError(__WEBPACK_IMPORTED_MODULE_10__providers_feedback_feedback_messages__["a" /* FeedbackMessage */].GENERIC_ERROR_MESSAGE.toString());
                }
            });
        }
        this.activePage = menuItem;
        this.onResize();
        this.nav.setRoot(menuItem);
    };
    MyApp.prototype.getLiveCounts = function () {
        var _this = this;
        this.homeService.getDashboardCounts().subscribe(function (response) {
            _this.contactsCount = response.contacts;
            _this.tasksCount = response.tasks;
            _this.referralCount = response.referalPartners;
            _this.scheduleCount = response.appointments;
            _this.eventsCount = response.events;
            _this.quotesCount = response.quotes;
            _this.ngZone.run(function () {
                // console.log('Value Updated !');
            });
        }, function (error) {
            // console.log(error);
        });
        this.homeService.getLoanCounts().subscribe(function (response) {
            _this.loanCount = response.total;
            _this.ngZone.run(function () {
                // console.log('Value Updated !');
            });
        }, function (error) {
            // console.log(error);
        });
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        this.app.getRootNav().setRoot("LoginPage").then(function () {
            _this.auth.logout().subscribe(function (response) {
                if (response && response.success) {
                    _this.menuCtrl.enable(false, "menu");
                    _this.auth.destroy();
                    _this.firstTime = true;
                    _this.firstLoad = true;
                    _this.showSplitPane = false;
                    _this.activePage = "Dashboard";
                }
                else {
                    _this.feedbackService.showError(__WEBPACK_IMPORTED_MODULE_10__providers_feedback_feedback_messages__["a" /* FeedbackMessage */].GENERIC_ERROR_MESSAGE.toString());
                }
            });
        });
    };
    MyApp.prototype.authenticated = function () {
        if (this.auth.authentication) {
            this.menuOpened();
        }
        return this.auth.authentication;
    };
    MyApp.prototype.isLargeScreen = function () {
        if ((this.platform.is("core") || this.platform.is("ipad") || this.platform.is("tablet"))
            && (this.platform.isLandscape())) {
            return true;
        }
        return false;
    };
    MyApp.prototype.getValue = function (key) {
        return this[key];
    };
    MyApp.prototype.checkActive = function (page) {
        return page === this.activePage;
    };
    MyApp.prototype.initPages = function () {
        this.pages = [
            { id: "home", title: "Home", pageName: "Dashboard", count: "", icon: "icon-home", iconBgColor: "#396" },
            {
                id: "contacts", title: "My Contacts", pageName: "MyContacts",
                count: "contactsCount", icon: "icon-users", iconBgColor: "#4798ba",
            },
            {
                id: "partners", title: "My Referral Partners", pageName: "MyReferralPartners",
                count: "referralCount", icon: "icon-business1", iconBgColor: "#4772ba",
            },
            {
                id: "loans", title: "My Loans", pageName: "MyLoans",
                count: "loanCount", icon: "icon-house", iconBgColor: "#8d68ad",
            },
            {
                id: "quotes", title: "My Quotes", pageName: "MyQuotes",
                count: "quotesCount", icon: "icon-quotes", iconBgColor: "#ad68a9",
            },
            {
                id: "scorecard", title: "My Scorecard", pageName: "ScoreCardPage",
                count: "", icon: "icon-stats", iconBgColor: "#b55d7e",
            },
            {
                id: "tasks", title: "My Tasks", pageName: "MyTasks",
                count: "tasksCount", icon: "icon-task", iconBgColor: "#b5a35d",
            },
            {
                id: "schedule", title: "My Schedule", pageName: "MySchedule",
                count: "scheduleCount", icon: "icon-schedule-1", iconBgColor: "#9db55d",
            },
            {
                id: "events", title: "My Upcoming Events", pageName: "UpcomingEvents",
                count: "eventsCount", icon: "icon-events", iconBgColor: "#7ab55d",
            },
            {
                id: "tools", title: "My Tools", pageName: "MyTools", count: "",
                icon: "icon-calculator", iconBgColor: "#67bfba ",
            },
        ];
        this.activePage = this.pages[0].pageName;
    };
    MyApp.prototype.openPictureEditor = function (pictureURL) {
        var _this = this;
        var pictureEditorModalWindow = this.modalCtrl.create("PictureEditor", {
            paramObject: {
                pictureURL: pictureURL,
            },
        }, {
            showBackdrop: true,
        });
        pictureEditorModalWindow.onDidDismiss(function (response) {
            _this.pictureURL = response.pictureURL;
        });
        pictureEditorModalWindow.present();
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("appContent"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavController */])
], MyApp.prototype, "nav", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Content */])
], MyApp.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])("window:resize"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MyApp.prototype, "onResize", null);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Office/SFA-Angular2/src/app/app.html"*/'<!-- <ion-split-pane [when]="menuService.shouldShow()"></ion-split-pane> -->\n<ion-split-pane [when]="showSplitPane">\n    <ion-nav #appContent [root]="rootPage" main ></ion-nav>\n    <ng-container *ngIf="authenticated()">\n        <ion-menu id="menu" persistent="true" type="overlay" [content]="appContent">\n            <ion-header class="menu-top">\n                <ion-item class="menu-header">\n                    <ion-avatar *ngIf="pictureURL">\n                        <img class="menu-avatar" [src]="pictureURL" (click)="openPictureEditor(pictureURL)">\n                    </ion-avatar>\n                    <avatar class="avatar-align" *ngIf="!pictureURL" name="{{username}}" size="60px" (click)="openPictureEditor(pictureURL)"></avatar>\n                    <ion-title id="menu-title" mode="ios" class="font-regular-large" text-capitalize>{{username}}</ion-title>\n                </ion-item>\n            </ion-header>\n            <ion-content overflow-scroll="true">\n                <ion-list id="optionsList" class="options-list" no-padding no-lines>\n                    <button ion-item [id]="page.id" *ngFor="let page of pages" [class.active-highlight]=checkActive(page.pageName) (click)="openMenuContentPage(page.pageName)" menuClose detail-none>\n                        <ion-icon class="tab-icon font-bold-small" [ngClass]="page.icon" item-left [ngStyle]="{\'background-color\': page.iconBgColor}"></ion-icon>\n                        <span class="font-bold-small" [class.active-highlight-font]=checkActive(page.pageName)>{{page.title}}</span>\n                        <label class="font-regular-small" item-right>\n                          {{getValue(page.count)}}\n                        </label>\n                    </button>\n                </ion-list>\n                <ion-list class="options-list" no-lines>\n                    <button ion-item id="logout" (click)="logout()" menuClose detail-none>\n                        <ion-icon class="icon-logout font-bold-small tab-icon" item-left></ion-icon>\n                        <span class="font-bold-small">Log Out</span>\n                    </button>\n                </ion-list>\n            </ion-content>\n        </ion-menu>\n    </ng-container>\n</ion-split-pane>\n'/*ion-inline-end:"/Office/SFA-Angular2/src/app/app.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_5__providers_home_service__["a" /* HomeService */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_7__common_utils_http_service__["a" /* HttpService */],
        __WEBPACK_IMPORTED_MODULE_8__providers_nav_custom_nav_service__["a" /* CustomNavService */],
        __WEBPACK_IMPORTED_MODULE_6__providers_menu_service__["a" /* MenuService */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_9__providers_loans_loan_service__["a" /* LoanService */],
        __WEBPACK_IMPORTED_MODULE_11__providers_feedback_feedback_service__["a" /* FeedbackService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 75:
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
    return Session;
}());
Session = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], Session);

//# sourceMappingURL=session.js.map

/***/ })

},[401]);
//# sourceMappingURL=main.js.map