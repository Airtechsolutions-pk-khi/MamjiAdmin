(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/@angular/localize/fesm2015/init.js":
/*!*********************************************************!*\
  !*** ./node_modules/@angular/localize/fesm2015/init.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @license Angular v10.0.4
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const __globalThis = typeof globalThis !== 'undefined' && globalThis;
const __window = typeof window !== 'undefined' && window;
const __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
const __global = typeof global !== 'undefined' && global;
// Always use __globalThis if available; this is the spec-defined global variable across all
// environments.
// Then fallback to __global first; in Node tests both __global and __window may be defined.
const _global = __globalThis || __global || __window || __self;

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Tag a template literal string for localization.
 *
 * For example:
 *
 * ```ts
 * $localize `some string to localize`
 * ```
 *
 * **Providing meaning, description and id**
 *
 * You can optionally specify one or more of `meaning`, `description` and `id` for a localized
 * string by pre-pending it with a colon delimited block of the form:
 *
 * ```ts
 * $localize`:meaning|description@@id:source message text`;
 *
 * $localize`:meaning|:source message text`;
 * $localize`:description:source message text`;
 * $localize`:@@id:source message text`;
 * ```
 *
 * This format is the same as that used for `i18n` markers in Angular templates. See the
 * [Angular 18n guide](guide/i18n#template-translations).
 *
 * **Naming placeholders**
 *
 * If the template literal string contains expressions, then the expressions will be automatically
 * associated with placeholder names for you.
 *
 * For example:
 *
 * ```ts
 * $localize `Hi ${name}! There are ${items.length} items.`;
 * ```
 *
 * will generate a message-source of `Hi {$PH}! There are {$PH_1} items`.
 *
 * The recommended practice is to name the placeholder associated with each expression though.
 *
 * Do this by providing the placeholder name wrapped in `:` characters directly after the
 * expression. These placeholder names are stripped out of the rendered localized string.
 *
 * For example, to name the `items.length` expression placeholder `itemCount` you write:
 *
 * ```ts
 * $localize `There are ${items.length}:itemCount: items`;
 * ```
 *
 * **Escaping colon markers**
 *
 * If you need to use a `:` character directly at the start of a tagged string that has no
 * metadata block, or directly after a substitution expression that has no name you must escape
 * the `:` by preceding it with a backslash:
 *
 * For example:
 *
 * ```ts
 * // message has a metadata block so no need to escape colon
 * $localize `:some description::this message starts with a colon (:)`;
 * // no metadata block so the colon must be escaped
 * $localize `\:this message starts with a colon (:)`;
 * ```
 *
 * ```ts
 * // named substitution so no need to escape colon
 * $localize `${label}:label:: ${}`
 * // anonymous substitution so colon must be escaped
 * $localize `${label}\: ${}`
 * ```
 *
 * **Processing localized strings:**
 *
 * There are three scenarios:
 *
 * * **compile-time inlining**: the `$localize` tag is transformed at compile time by a
 * transpiler, removing the tag and replacing the template literal string with a translated
 * literal string from a collection of translations provided to the transpilation tool.
 *
 * * **run-time evaluation**: the `$localize` tag is a run-time function that replaces and
 * reorders the parts (static strings and expressions) of the template literal string with strings
 * from a collection of translations loaded at run-time.
 *
 * * **pass-through evaluation**: the `$localize` tag is a run-time function that simply evaluates
 * the original template literal string without applying any translations to the parts. This
 * version is used during development or where there is no need to translate the localized
 * template literals.
 * @param messageParts a collection of the static parts of the template string.
 * @param expressions a collection of the values of each placeholder in the template string.
 * @returns the translated string, with the `messageParts` and `expressions` interleaved together.
 */
const $localize = function (messageParts, ...expressions) {
    if ($localize.translate) {
        // Don't use array expansion here to avoid the compiler adding `__read()` helper unnecessarily.
        const translation = $localize.translate(messageParts, expressions);
        messageParts = translation[0];
        expressions = translation[1];
    }
    let message = stripBlock(messageParts[0], messageParts.raw[0]);
    for (let i = 1; i < messageParts.length; i++) {
        message += expressions[i - 1] + stripBlock(messageParts[i], messageParts.raw[i]);
    }
    return message;
};
const BLOCK_MARKER = ':';
/**
 * Strip a delimited "block" from the start of the `messagePart`, if it is found.
 *
 * If a marker character (:) actually appears in the content at the start of a tagged string or
 * after a substitution expression, where a block has not been provided the character must be
 * escaped with a backslash, `\:`. This function checks for this by looking at the `raw`
 * messagePart, which should still contain the backslash.
 *
 * @param messagePart The cooked message part to process.
 * @param rawMessagePart The raw message part to check.
 * @returns the message part with the placeholder name stripped, if found.
 * @throws an error if the block is unterminated
 */
function stripBlock(messagePart, rawMessagePart) {
    return rawMessagePart.charAt(0) === BLOCK_MARKER ?
        messagePart.substring(findEndOfBlock(messagePart, rawMessagePart) + 1) :
        messagePart;
}
/**
 * Find the end of a "marked block" indicated by the first non-escaped colon.
 *
 * @param cooked The cooked string (where escaped chars have been processed)
 * @param raw The raw string (where escape sequences are still in place)
 *
 * @returns the index of the end of block marker
 * @throws an error if the block is unterminated
 */
function findEndOfBlock(cooked, raw) {
    /***********************************************************************************************
     * This function is repeated in `src/utils/messages.ts` and the two should be kept in sync.
     * The reason is that this file is marked as having side-effects, and if we import `messages.ts`
     * into it, the whole of `src/utils` will be included in this bundle and none of the functions
     * will be tree shaken.
     ***********************************************************************************************/
    for (let cookedIndex = 1, rawIndex = 1; cookedIndex < cooked.length; cookedIndex++, rawIndex++) {
        if (raw[rawIndex] === '\\') {
            rawIndex++;
        }
        else if (cooked[cookedIndex] === BLOCK_MARKER) {
            return cookedIndex;
        }
    }
    throw new Error(`Unterminated $localize metadata block in "${raw}".`);
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Attach $localize to the global context, as a side-effect of this module.
_global.$localize = $localize;
//# sourceMappingURL=init.js.map


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/company/brands/addbrand/addbrand.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/company/brands/addbrand/addbrand.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Brand</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"brandForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-xl-12\">\r\n            <div class=\"card mb-4\">\r\n                <div class=\"card-header\">Brand Details</div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-8\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                                <input type=\"text\" class=\"form-control\" id=name placeholder=\"\" formControlName=\"name\">\r\n                                <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\r\n                                    <div *ngIf=\"f.name.errors.required\">\r\n                                        Name is required.\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <!-- Form Row-->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Email</label>\r\n                                    <input type=\"email\" class=\"form-control\" id=email placeholder=\"\" formControlName=\"email\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Password</label>\r\n                                    <input type=\"password\" class=\"form-control\" id=displayOrder placeholder=\"\" formControlName=\"password\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group col-md-4 text-center\">\r\n                            <app-imageupload></app-imageupload>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n\r\n                            <label class=\"small mb-1\" for=\"inputLocation\">Description</label>\r\n                            <textarea class=\"form-control\" formControlName=\"address\" height=\"100px\"></textarea>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-6\">\r\n\r\n                            <label class=\"small mb-1\" for=\"inputLocation\">Background App Image</label>\r\n                            <br/>\r\n                            <input type=\"file\" (change)=\"selectFile($event)\" />\r\n                        </div>\r\n\r\n                        <div class=\"form-group col-lg-6\">\r\n                            <label for=\"Item Status\">Status</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- Save changes button-->\r\n                    <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/company/brands/brands.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/company/brands/brands.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Brands</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Brands List</h6>\r\n            </div>\r\n            <!-- <div class=\" col-lg-4 input-group mb-3\">\r\n                <div class=\"input-group-prepend\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div> -->\r\n            <div class=\"col-md-2 text-right\">\r\n              \r\n                <!-- <button  [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                      Add Brand\r\n                </button> -->\r\n            </div>\r\n            \r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"20%\" sortable=\"Name\" (sort)=\"onSort($event)\"> Name </th>\r\n                        <th width=\"30%\" sortable=\"Email\" (sort)=\"onSort($event)\">Email</th>\r\n                        <th width=\"15%\" sortable=\"Password\" (sort)=\"onSort($event)\">Password </th>\r\n                        <th width=\"15%\" sortable=\"Address\" (sort)=\"onSort($event)\">Description </th>\r\n                        <th width=\"15%\" sortable=\"Status\" (sort)=\"onSort($event)\">Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                        <td>\r\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td> {{item.name}} </td>\r\n                        <td> {{item.email}} </td>\r\n                        <td>{{item.password}}</td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.brandID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <!-- <a (click)=\"Delete(item.brandID)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a> -->\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/company/locations/addlocation/addlocation.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/company/locations/addlocation/addlocation.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Location</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"locationForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Location Details</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n              <input type=\"text\" class=\"form-control\" id=Name placeholder=\"\" formControlName=\"name\">\r\n              <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\r\n                <div *ngIf=\"f.name.errors.required\">\r\n                  Name is required.\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Address</label>\r\n              <input type=\"text\" class=\"form-control\" id=address placeholder=\"\" formControlName=\"address\">\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Contact No</label>\r\n              <input type=\"text\" class=\"form-control\" id=contactNo placeholder=\"\" formControlName=\"contactNo\">\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Email</label>\r\n              <input type=\"text\" class=\"form-control\" id=email placeholder=\"\" formControlName=\"email\">\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Passcode</label>\r\n              <input type=\"text\" class=\"form-control\" id=password placeholder=\"\" formControlName=\"passcode\">\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Currency</label>\r\n              <input type=\"text\" class=\"form-control\" id=currency placeholder=\"\" formControlName=\"currency\">\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Delivery Charges</label>\r\n              <input type=\"number\" class=\"form-control\" id=deliveryCharges placeholder=\"\" formControlName=\"deliveryCharges\">\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Tax Percent</label>\r\n              <input type=\"number\" class=\"form-control\" id=deliveryCharges placeholder=\"\" formControlName=\"tax\">\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Minimum Order Amount</label>\r\n              <input type=\"number\" class=\"form-control\" id=deliveryCharges placeholder=\"\" formControlName=\"minOrderAmount\">\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Order Dicount(%)</label>\r\n              <input type=\"number\" class=\"form-control\" id=deliveryCharges placeholder=\"\" formControlName=\"discounts\">\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputLocation\">Description</label>\r\n              <textarea class=\"form-control\" formControlName=\"description\" height=\"100px\"></textarea>\r\n            </div>\r\n            <div class=\"form-group col-md-3\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Open Time</label>\r\n              <ngb-timepicker [(ngModel)]=\"opentime\" [ngModelOptions]=\"{standalone: true}\" [meridian]=\"true\"></ngb-timepicker>\r\n            </div>\r\n            <div class=\"form-group col-md-3\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Close Time</label>\r\n              <ngb-timepicker [(ngModel)]=\"closetime\" [ngModelOptions]=\"{standalone: true}\" [meridian]=\"true\"></ngb-timepicker>\r\n            </div>\r\n\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Delivery Allow</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"isDeliveryAllowed\" formControlName=\"isDeliveryAllowed\">\r\n                <label class=\"custom-control-label\" for=\"isDeliveryAllowed\"></label>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"small mb-1\" for=\"inputFirstName\">Pickup Allow</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"isPickupAllowed\" formControlName=\"isPickupAllowed\">\r\n                <label class=\"custom-control-label\" for=\"isPickupAllowed\"></label>\r\n              </div>\r\n            </div>\r\n            <!-- <div class=\"form-group col-md-6\">\r\n      <label class=\"small mb-1\" for=\"inputFirstName\">Latitude</label>\r\n      <input type=\"text\" class=\"form-control\" id=latitude placeholder=\"\" formControlName=\"latitude\">\r\n  </div>\r\n  <div class=\"form-group col-md-6\">\r\n      <label class=\"small mb-1\" for=\"inputFirstName\">Longitude</label>\r\n      <input type=\"text\" class=\"form-control\" id=longitude placeholder=\"\" formControlName=\"longitude\">\r\n  </div> -->\r\n\r\n          </div>\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Save changes button-->\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/company/locations/locations.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/company/locations/locations.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Location</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Locations List</h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Location\r\n            </button>\r\n            </div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                  <tr class=\"table-header\">\r\n                    <th width=\"20%\" sortable=\"name\" (sort)=\"onSort($event)\"> Name </th>\r\n                    <th width=\"20%\" sortable=\"description\" (sort)=\"onSort($event)\"> Description </th>\r\n                    <th width=\"10%\" sortable=\"discounts\" (sort)=\"onSort($event)\"> Discount</th>\r\n                    <th width=\"10%\" sortable=\"tax\" (sort)=\"onSort($event)\"> Tax</th>\r\n                    <th width=\"10%\" sortable=\"minOrderAmount\" (sort)=\"onSort($event)\"> Min Order Amount</th>\r\n                    <th width=\"10%\" sortable=\"contact\" (sort)=\"onSort($event)\"> Contact </th>\r\n                    <th width=\"10%\" sortable=\"status\" (sort)=\"onSort($event)\">Status </th>\r\n                    <th width=\"10%\"></th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let item of data$ | async \">\r\n\r\n                    <td> {{item.name}} </td>\r\n                    <td> {{item.description}} </td>\r\n                    <td> {{item.discounts}} </td>\r\n                    <td> {{item.tax}} </td>\r\n                    <td> {{item.minOrderAmount}} </td>                    \r\n                    <td> {{item.contactNo}} </td>\r\n                    \r\n                    <td>\r\n                      <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                      </ngb-highlight>\r\n                    </td>\r\n                    <td>\r\n                      <a (click)=\"Edit(item.locationID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                      <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                    </td>\r\n                  </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/customer/customers/addcustomers/addcustomer.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/customer/customers/addcustomers/addcustomer.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Customer</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"customerForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-xl-12\">\r\n            <div class=\"card mb-4\">\r\n                <div class=\"card-header\">Customer Details</div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-8\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                                <input type=\"text\" class=\"form-control\" id=Name placeholder=\"\" formControlName=\"fullName\">\r\n                                <div *ngIf=\"f.fullName.invalid && (f.fullName.dirty || f.fullName.touched)\" class=\"alert alert-danger\">\r\n                                    <div *ngIf=\"f.fullName.errors.required\">\r\n                                        Name is required.\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <!-- Form Row-->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Email</label>\r\n                                    <input type=\"email\" class=\"form-control\" id=email placeholder=\"\" formControlName=\"email\">\r\n                                    <div *ngIf=\"f.email.invalid && (f.email.dirty || f.email.touched)\" class=\"alert alert-danger\">\r\n                                        <div *ngIf=\"f.email.errors.required\">\r\n                                            Email is required.\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Password</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=password placeholder=\"\" formControlName=\"password\">\r\n                                    <div *ngIf=\"f.password.invalid && (f.password.dirty || f.password.touched)\" class=\"alert alert-danger\">\r\n                                        <div *ngIf=\"f.password.errors.required\">\r\n                                            Password is required.\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Mobile</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=mobile placeholder=\"\" formControlName=\"mobile\">\r\n                                    <div *ngIf=\"f.mobile.invalid && (f.mobile.dirty || f.mobile.touched)\" class=\"alert alert-danger\">\r\n                                        <div *ngIf=\"f.mobile.errors.required\">\r\n                                            Contact is required.\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group col-md-4 text-center\">\r\n                            <app-imageupload></app-imageupload>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-lg-12\">\r\n                            <label for=\"Item Status\">Status</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- Save changes button-->\r\n                    <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/customer/customers/customers.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/customer/customers/customers.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Customers</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Customers List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div>\r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button [routerLink]=\"['add']\" class=\"btn btn-primary mt-4 mr-1\">\r\n                    Add Category\r\n                </button>\r\n            </div>\r\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Customer\r\n            </button></div> -->\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"FullName\" (sort)=\"onSort($event)\"> Name </th>\r\n                        <th width=\"15%\" sortable=\"Email\" (sort)=\"onSort($event)\">Email </th>\r\n                        <th width=\"15%\" sortable=\"Mobile\" (sort)=\"onSort($event)\">Mobile </th>\r\n                        <th width=\"15%\" sortable=\"Password\" (sort)=\"onSort($event)\">Password </th>\r\n                        <th width=\"15%\" sortable=\"Status\" (sort)=\"onSort($event)\">Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                        <td>\r\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td> {{item.fullName}} </td>\r\n                        <td> {{item.email}} </td>\r\n                        <td>{{item.mobile}}</td>\r\n                        <td>{{item.password}}</td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.customerID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a (click)=\"Delete(item.customerID)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/dashboard/dashboard.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/dashboard/dashboard.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n <!-- <div class=\"row\">\r\n    <div class=\"col-md-9 form-group\">\r\n        <label>Select Date</label>\r\n        <ngbd-datepicker-range-popup></ngbd-datepicker-range-popup>\r\n    </div>\r\n    <div class=\"col-md-3 form-group text-right\">\r\n        <button class=\"btn btn-primary mt-4\" (click)=\"Filter()\" type=\"submit\">Search</button>\r\n    </div>\r\n</div> -->\r\n\r\n<!-- Page Heading -->\r\n\r\n\r\n<div class=\"row d-sm-flex align-items-center justify-content-between mb-4\">\r\n    <div class=\"col-md-6\">\r\n        <h1 class=\"h3 mb-0 text-gray-800\">Dashboard</h1>\r\n    </div>\r\n    <div class=\" col-md-6 d-flex justify-content-end\">\r\n        <ngbd-datepicker-range-popup></ngbd-datepicker-range-popup>\r\n        <button class=\"btn btn-primary ml-2\" type=\"submit\"  (click)=\"GetDataDashboard()\">Search</button>\r\n\r\n    </div>\r\n</div>\r\n\r\n<!-- <div class=\"d-sm-flex align-items-center justify-content-between mb-4\">\r\n    <h1 class=\"h3 mb-0 text-gray-800\">Dashboard</h1>\r\n\r\n</div> -->\r\n\r\n<!-- Content Row -->\r\n<div class=\"row\">\r\n\r\n    <!-- Earnings (Monthly) Card Example -->\r\n    <div class=\"col-xl-3 col-md-6 mb-4\">\r\n        <div class=\"card border-left-primary shadow h-100 py-2\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row no-gutters align-items-center\">\r\n                    <div class=\"col mr-2\">\r\n                        <div class=\"text-xs font-weight-bold text-orange text-uppercase mb-1\">Total Sales</div>\r\n                        <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{dashboardSummary.sales | number:'1.2-2'}}</div>\r\n                    </div>\r\n                    <div class=\"col-auto\">\r\n                        <i class=\"fas fa-calendar fa-2x text-gray-300\"></i>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Earnings (Monthly) Card Example -->\r\n    <div class=\"col-xl-3 col-md-6 mb-4\">\r\n        <div class=\"card border-left-success shadow h-100 py-2\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row no-gutters align-items-center\">\r\n                    <div class=\"col mr-2\">\r\n                        <div class=\"text-xs font-weight-bold text-success text-uppercase mb-1\">Net Sales</div>\r\n                        <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{dashboardSummary.netSales | number:'1.2-2'}}</div>\r\n                    </div>\r\n                    <div class=\"col-auto\">\r\n                        <i class=\"fas fa-dollar-sign fa-2x text-gray-300\"></i>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- Pending Requests Card Example -->\r\n    <div class=\"col-xl-3 col-md-6 mb-4\">\r\n        <div class=\"card border-left-warning shadow h-100 py-2\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row no-gutters align-items-center\">\r\n                    <div class=\"col mr-2\">\r\n                        <div class=\"text-xs font-weight-bold text-warning text-uppercase mb-1\">Total Tax</div>\r\n                        <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{dashboardSummary.totalTax | number:'1.2-2'}}</div>\r\n                    </div>\r\n                    <div class=\"col-auto\">\r\n                        <i class=\"fas fa-dollar-sign fa-2x text-gray-300\"></i>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- Earnings (Monthly) Card Example -->\r\n    <div class=\"col-xl-3 col-md-6 mb-4\">\r\n        <div class=\"card border-left-info shadow h-100 py-2\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row no-gutters align-items-center\">\r\n                    <div class=\"col mr-2\">\r\n                        <div class=\"text-xs font-weight-bold text-info text-uppercase mb-1\">Total Orders</div>\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col-auto\">\r\n                                <div class=\"h5 mb-0 mr-3 font-weight-bold text-gray-800\">{{dashboardSummary.totalOrders | number:'1.2-2'}}</div>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-auto\">\r\n                        <i class=\"fas fa-clipboard-list fa-2x text-gray-300\"></i>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>\r\n\r\n<!-- Content Row -->\r\n\r\n<div class=\"row\">\r\n\r\n    <!-- Area Chart -->\r\n    <div class=\"col-xl-8 col-lg-7\">\r\n        <div class=\"card shadow mb-4\">\r\n            <!-- Card Header - Dropdown -->\r\n            <div class=\"card-header py-3 d-flex flex-row align-items-center justify-content-between\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Earnings Overview</h6>\r\n                <div class=\"dropdown no-arrow\">\r\n                    <a class=\"dropdown-toggle\" href=\"#\" role=\"button\" id=\"dropdownMenuLink\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                        <i class=\"fas fa-ellipsis-v fa-sm fa-fw text-gray-400\"></i>\r\n                    </a>\r\n                    <div class=\"dropdown-menu dropdown-menu-right shadow animated--fade-in\" aria-labelledby=\"dropdownMenuLink\">\r\n                        <div class=\"dropdown-header\">Dropdown Header:</div>\r\n                        <a class=\"dropdown-item\" href=\"#\">Action</a>\r\n                        <a class=\"dropdown-item\" href=\"#\">Another action</a>\r\n                        <div class=\"dropdown-divider\"></div>\r\n                        <a class=\"dropdown-item\" href=\"#\">Something else here</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- Card Body -->\r\n            <div class=\"card-body\">\r\n                <div class=\"chart-area\">\r\n\r\n                    <div style=\"text-align:center\">\r\n                        <apx-chart [series]=\"chartOptions.series\" [chart]=\"chartOptions.chart\" [xaxis]=\"chartOptions.xaxis\" [title]=\"chartOptions.title\"></apx-chart>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Pie Chart -->\r\n    <div class=\"col-xl-4 col-lg-5\">\r\n        <div class=\"card shadow mb-4 \">\r\n            <!-- Card Header - Dropdown -->\r\n            <div class=\"card-header py-3 d-flex flex-row align-items-center justify-content-between\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Revenue Periodic</h6>\r\n                <div class=\"dropdown no-arrow\">\r\n                    <a class=\"dropdown-toggle\" href=\"#\" role=\"button\" id=\"dropdownMenuLink\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                        <i class=\"fas fa-ellipsis-v fa-sm fa-fw text-gray-400\"></i>\r\n                    </a>\r\n                    <div class=\"dropdown-menu dropdown-menu-right shadow animated--fade-in\" aria-labelledby=\"dropdownMenuLink\">\r\n                        <div class=\"dropdown-header\">Dropdown Header:</div>\r\n                        <a class=\"dropdown-item\" href=\"#\">Action</a>\r\n                        <a class=\"dropdown-item\" href=\"#\">Another action</a>\r\n                        <div class=\"dropdown-divider\"></div>\r\n                        <a class=\"dropdown-item\" href=\"#\">Something else here</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- Card Body -->\r\n            <div class=\"card-body\">\r\n                <div class=\"chart-pie \"   style=\"height: auto !important;\">\r\n                    <div id=\"chart\">\r\n                        <apx-chart [series]=\"chartOptionsDonut.series\" [chart]=\"chartOptionsDonut.chart\" [labels]=\"chartOptionsDonut.labels\" [responsive]=\"chartOptionsDonut.responsive\"></apx-chart>\r\n                    </div>\r\n                </div>\r\n                <div class=\"mt-4 text-center small\">\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/laboratory/uploadreport/uploadreport.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/laboratory/uploadreport/uploadreport.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Upload Lab Report</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Upload Lab Report</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" />\r\n            </div>\r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" >\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button   class=\"btn btn-primary mt-4 mr-1\">\r\n                    Upload\r\n                </button>\r\n            </div>\r\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Customer\r\n            </button></div> -->\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"FullName\" >Customer Name </th>\r\n                        <th width=\"15%\" sortable=\"Email\" >Email </th>\r\n                        <th width=\"15%\" sortable=\"Mobile\" >Mobile </th>\r\n                        <th width=\"15%\" sortable=\"Password\" >Type </th>\r\n                        <th width=\"15%\" sortable=\"Status\" >Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr>\r\n                        <td>\r\n                            <!-- <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" /> -->\r\n                            <div class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td>Ammad </td>\r\n                        <td> ammadraza001@gmail.com </td>\r\n                        <td>03341897997</td>\r\n                        <td>abc123</td>\r\n                        <td>\r\n                            \r\n                        </td>\r\n                        <td>\r\n                            <a  ><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a  ><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <!-- <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results -->\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <!-- <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination> -->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/managedoctor/doctor/doctor.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/managedoctor/doctor/doctor.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Doctors</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Doctor List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" />\r\n            </div>\r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" >\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button [routerLink]=\"['add']\" class=\"btn btn-primary mt-4 mr-1\">\r\n                    Doctor\r\n                </button>\r\n            </div>\r\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Customer\r\n            </button></div> -->\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"FullName\" > Name </th>\r\n                        <th width=\"15%\" sortable=\"Email\" >Email </th>\r\n                        <th width=\"15%\" sortable=\"Profile\" > Profile </th>\r\n                        <th width=\"15%\" sortable=\"Skills\" > Skills </th>\r\n                        <th width=\"15%\" sortable=\"Education\" > Education </th>\r\n                        <th width=\"15%\" sortable=\"Mobile\" >Mobile </th>\r\n                        <!-- <th width=\"15%\" sortable=\"Password\" >Type </th> -->\r\n                        <th width=\"15%\" sortable=\"Status\" >Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr>\r\n                        <td>\r\n                            <!-- <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" /> -->\r\n                            <div class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td>Ammad </td>\r\n                        <td> ammadraza001@gmail.com </td>\r\n                        <td> Profile</td>\r\n                        <td> Skills</td>\r\n                        <td> MBBS</td>\r\n                        <td>03341897997</td>\r\n                        <!-- <td>abc123</td> -->\r\n                        <td>\r\n                            <ngb-highlight  class=\"btn btn-sm\">\r\n                                 \r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a  ><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a  ><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <!-- <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results -->\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <!-- <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination> -->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/addons/addaddons/addaddons.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/addons/addaddons/addaddons.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Addons</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"addonForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-xl-12\">\r\n            <div class=\"card mb-4\">\r\n                <div class=\"card-header\">Addons Details</div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-8\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                                <input type=\"text\" class=\"form-control\" id=Name placeholder=\"\" formControlName=\"name\">\r\n                                <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\r\n                                    <div *ngIf=\"f.name.errors.required\">\r\n                                        Name is required.\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <!-- Form Row-->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Arabic Name</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=arabicName placeholder=\"\" formControlName=\"arabicName\">\r\n                                </div>\r\n                            </div>\r\n                            <!-- <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Display Order</label>\r\n                                    <input type=\"number\" class=\"form-control\" id=displayOrder placeholder=\"\" formControlName=\"displayOrder\">\r\n                                </div>\r\n                            </div> -->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Price</label>\r\n                                    <input type=\"number\" class=\"form-control\" id=price placeholder=\"\" formControlName=\"price\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group col-md-4 text-center\">\r\n                            <app-imageupload></app-imageupload>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n\r\n                            <label class=\"small mb-1\" for=\"inputLocation\">Description</label>\r\n                            <textarea class=\"form-control\" formControlName=\"description\" height=\"100px\"></textarea>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-lg-12\">\r\n                            <label for=\"Item Status\">Status</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- Save changes button-->\r\n                    <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/addons/addons.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/addons/addons.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Addons</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Addons List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div>\r\n           \r\n            <div class=\"col-md-3 text-right\"> \r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button [routerLink]=\"['add']\" class=\"btn btn-primary mt-4 mr-1\" >\r\n                    <span translate>Add Addon</span>\r\n                </button>\r\n                </div>\r\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Modifier\r\n            </button></div> -->\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"Name\" (sort)=\"onSort($event)\"> Name </th>\r\n                        <th width=\"20%\" sortable=\"Description\" (sort)=\"onSort($event)\">Description </th>\r\n                        <th width=\"10%\" sortable=\"Price\" (sort)=\"onSort($event)\">Price</th>\r\n                        <th width=\"15%\" sortable=\"Status\" (sort)=\"onSort($event)\">Status </th>\r\n                        <th width=\"15%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                        <td>\r\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td> {{item.name}} </td>\r\n                        <td> {{item.description}} </td>\r\n                        <td>{{item.price}}</td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.addonID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/category/addcategory/addcategory.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/category/addcategory/addcategory.component.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Category</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"categoryForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-xl-12\">\r\n            <div class=\"card mb-4\">\r\n                <div class=\"card-header\">Category Details</div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-8\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                                <input type=\"text\" class=\"form-control\" id=Name placeholder=\"\" formControlName=\"name\">\r\n                                <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\r\n                                    <div *ngIf=\"f.name.errors.required\">\r\n                                        Name is required.\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <!-- Form Row-->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Arabic Name</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=arabicName placeholder=\"\" formControlName=\"arabicName\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Display Order</label>\r\n                                    <input type=\"number\" class=\"form-control\" id=displayOrder placeholder=\"\" formControlName=\"displayOrder\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group col-md-4 text-center\">\r\n                            <app-imageupload></app-imageupload>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n\r\n                            <label class=\"small mb-1\" for=\"inputLocation\">Description</label>\r\n                            <textarea class=\"form-control\" formControlName=\"description\" height=\"100px\"></textarea>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-lg-12\">\r\n                            <label for=\"Item Status\">Status</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- Save changes button-->\r\n                    <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/category/category.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/category/category.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Category</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Category List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\" style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\" style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div>\r\n\r\n           \r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button [routerLink]=\"['add']\" class=\"btn btn-primary mt-4 mr-1\">\r\n                    Add Category\r\n                </button>\r\n            </div>\r\n\r\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Category\r\n            </button></div>\r\n            -->\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"20%\" sortable=\"Name\" (sort)=\"onSort($event)\"> Name </th>\r\n                        <th width=\"30%\" sortable=\"Description\" (sort)=\"onSort($event)\">Description </th>\r\n                        <th width=\"15%\" sortable=\"DisplayOrder\" (sort)=\"onSort($event)\">Display Order </th>\r\n\r\n                        <th width=\"15%\" sortable=\"Status\" (sort)=\"onSort($event)\">Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                        <td>\r\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td> {{item.name}} </td>\r\n                        <td> {{item.description}} </td>\r\n                        <td>{{item.displayOrder}}</td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.categoryID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/items/additem/additem.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/items/additem/additem.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Item</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"itemsForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-xl-12\">\r\n            <div class=\"card mb-4\">\r\n                <div class=\"card-header\">Item Details</div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-8\">\r\n\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputUsername\">Category</label>\r\n                                    <select class=\"custom-select\" formControlName=\"categoryID\"> \r\n\r\n                                <option [ngValue]=\"option.categoryID\"  selected=\"option.categoryID == categoryID\"\r\n                                    *ngFor=\"let option of CategoriesActive\">\r\n                                    {{option.name}}\r\n                                </option>\r\n                            </select>\r\n                                </div>\r\n                            </div>\r\n                            <!-- Form Row-->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-6\">\r\n                                    <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=Name placeholder=\"\" formControlName=\"name\">\r\n                                    <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\r\n                                        <div *ngIf=\"f.name.errors.required\">\r\n                                            Name is required.\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group col-md-6\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Arabic Name</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=arabicName placeholder=\"\" formControlName=\"arabicName\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-6\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Display Order</label>\r\n                                    <input type=\"number\" class=\"form-control\" id=displayOrder placeholder=\"\" formControlName=\"displayOrder\">\r\n                                </div>\r\n                                <div class=\"form-group col-md-6\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Calories</label>\r\n                                    <input type=\"number\" class=\"form-control\" id=calories placeholder=\"\" formControlName=\"calories\">\r\n                                    <div *ngIf=\"f.calories.invalid && (f.calories.dirty || f.calories.touched)\" class=\"alert alert-danger\">\r\n                                        <div *ngIf=\"f.calories.errors.required\">\r\n                                            Calories is required.\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-6\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Cost</label>\r\n                                    <input type=\"number\" class=\"form-control\" id=cost placeholder=\"\" formControlName=\"cost\">\r\n                                </div>\r\n                                <div class=\"form-group col-md-6\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Price</label>\r\n                                    <input type=\"number\" class=\"form-control\" id=price placeholder=\"\" formControlName=\"price\">\r\n                                    <div *ngIf=\"f.price.invalid && (f.name.dirty || f.price.touched)\" class=\"alert alert-danger\">\r\n                                        <div *ngIf=\"f.price.errors.required\">\r\n                                            Price is required.\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group col-md-4 text-center\">\r\n                            <app-imageupload></app-imageupload>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n\r\n                            <label class=\"small mb-1\" for=\"inputLocation\">Attach Modifiers</label>\r\n                            <ng-select [items]=\"ModifiersList\" bindLabel=\"name\" bindValue=\"modifierID\" [multiple]=\"true\" placeholder=\"\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"selectedModifierIds\">\r\n                                <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                                    <div class=\"ng-value\" *ngFor=\"let item of items\">\r\n                                        <span class=\"ng-value-label\">{{item.name}}</span>\r\n                                        <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                                    </div>\r\n\r\n                                </ng-template>\r\n                            </ng-select>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n\r\n                            <label class=\"small mb-1\" for=\"inputLocation\">Attach Addons</label>\r\n                            <ng-select [items]=\"AddonsList\" bindLabel=\"name\" bindValue=\"addonID\" [multiple]=\"true\" placeholder=\"\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"selectedAddonIds\">\r\n                                <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                                    <div class=\"ng-value\" *ngFor=\"let item of items\">\r\n                                        <span class=\"ng-value-label\">{{item.name}}</span>\r\n                                        <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                                    </div>\r\n\r\n                                </ng-template>\r\n                            </ng-select>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n\r\n                            <label class=\"small mb-1\" for=\"inputLocation\">Description</label>\r\n                            <textarea class=\"form-control\" formControlName=\"description\" height=\"100px\"></textarea>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-lg-4\">\r\n                            <label for=\"Item Status\">Status</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group col-lg-4\">\r\n                            <label for=\"Item Status\">Is Featured</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"isFeatured\" formControlName=\"isFeatured\">\r\n                                <label class=\"custom-control-label\" for=\"isFeatured\"></label>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group col-lg-4\">\r\n                            <label for=\"Item Status\">Is Apply Discount</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                              <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"isApplyDiscount\" formControlName=\"isApplyDiscount\">\r\n                              <label class=\"custom-control-label\" for=\"isApplyDiscount\"></label>\r\n                            </div>\r\n                          </div>\r\n                    </div>\r\n                    <!-- Save changes button-->\r\n                    <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/items/items.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/items/items.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Items</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Items List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div>\r\n          \r\n         \r\n            \r\n            <div class=\"col-md-3 text-right\"> \r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button [routerLink]=\"['add']\" class=\"btn btn-primary mt-4 mr-1\" >\r\n                    <span translate>Add Item</span>\r\n                </button>\r\n                </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                  <tr class=\"table-header\">\r\n                    <th width=\"10%\">IMAGE</th>\r\n                    <th width=\"15%\" sortable=\"Name\" (sort)=\"onSort($event)\"> Name </th>\r\n                    <!--<th width=\"15%\" sortable=\"Description\" (sort)=\"onSort($event)\">Description </th>-->\r\n                    <th width=\"15%\" sortable=\"categoryName\" (sort)=\"onSort($event)\">Category</th>\r\n                    <th width=\"15%\" sortable=\"displayOrder\" (sort)=\"onSort($event)\">Display Order </th>\r\n                    <th width=\"15%\" sortable=\"dalories\" (sort)=\"onSort($event)\">Calories</th>\r\n                    <th width=\"10%\" sortable=\"Price\" (sort)=\"onSort($event)\">Price </th>\r\n                    <th width=\"10%\" sortable=\"status\" (sort)=\"onSort($event)\">Status </th>\r\n                    <th width=\"10%\"></th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                        <td>\r\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td> {{item.name}} </td>\r\n                        <td> {{item.categoryName}} </td>\r\n                        <td>{{item.displayOrder}}</td>\r\n                        <td>{{item.calories}}</td>\r\n                        <td>{{item.price}}</td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.itemID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/items/itemsettings/itemsettings.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/items/itemsettings/itemsettings.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Items Setting</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form class=\"form\">\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-xl-12\">\r\n            <div class=\"card mb-4\">\r\n                <div class=\"card-header\">Set Todays Special Items</div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"form-row\">\r\n                        \r\n                            <div class=\"form-group col-md-12\">\r\n                                <label class=\"small mb-1\" for=\"inputUsername\">Title</label>\r\n                                <input   type=\"text\" class=\"form-control\" id=itemSettingTitle placeholder=\"\"  [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"itemSettingTitle\" >\r\n                               \r\n                            </div>\r\n                           \r\n                       \r\n                        <div class=\"form-group col-md-12\">\r\n\r\n                            <label class=\"small mb-1\" for=\"inputLocation\">Items</label>\r\n                            <ng-select [items]=\"ItemsList\" bindLabel=\"name\" bindValue=\"itemID\" [multiple]=\"true\" placeholder=\"\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"selectedItemIds\">\r\n                                <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                                    <div class=\"ng-value\" *ngFor=\"let item of items\">\r\n                                        <span class=\"ng-value-label\">{{item.name}}</span>\r\n                                        <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                                    </div>\r\n\r\n                                </ng-template>\r\n                            </ng-select>\r\n                        </div>\r\n\r\n                        <div class=\"form-group col-lg-6\">\r\n                            <label for=\"Item Status\">Status</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"isItemSetting\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"isItemSetting\">\r\n                                <label class=\"custom-control-label\" for=\"isItemSetting\"></label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- Save changes button-->\r\n                    <button class=\"btn btn-primary\" type=\"submit\" (click)=\"onSubmit()\">Save changes</button>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    \r\n\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/modifiers/addmodifier/addmodifier.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/modifiers/addmodifier/addmodifier.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Modifier</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"modifierForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-xl-12\">\r\n            <div class=\"card mb-4\">\r\n                <div class=\"card-header\">Modifier Details</div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-8\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                                <input type=\"text\" class=\"form-control\" id=Name placeholder=\"\" formControlName=\"name\">\r\n                                <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\r\n                                    <div *ngIf=\"f.name.errors.required\">\r\n                                        Name is required.\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <!-- Form Row-->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Arabic Name</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=arabicName placeholder=\"\" formControlName=\"arabicName\">\r\n                                </div>\r\n                            </div>\r\n                            <!-- <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Display Order</label>\r\n                                    <input type=\"number\" class=\"form-control\" id=displayOrder placeholder=\"\" formControlName=\"displayOrder\">\r\n                                </div>\r\n                            </div> -->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Price</label>\r\n                                    <input type=\"number\" class=\"form-control\" id=price placeholder=\"\" formControlName=\"price\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group col-md-4 text-center\">\r\n                            <app-imageupload></app-imageupload>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n\r\n                            <label class=\"small mb-1\" for=\"inputLocation\">Description</label>\r\n                            <textarea class=\"form-control\" formControlName=\"description\" height=\"100px\"></textarea>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-lg-12\">\r\n                            <label for=\"Item Status\">Status</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- Save changes button-->\r\n                    <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/modifiers/modifiers.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/modifiers/modifiers.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Modifier</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Modifiers List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div>\r\n           \r\n            <div class=\"col-md-3 text-right\"> \r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button [routerLink]=\"['add']\" class=\"btn btn-primary mt-4 mr-1\" >\r\n                    <span translate>Add Item</span>\r\n                </button>\r\n                </div>\r\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Modifier\r\n            </button></div> -->\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"Name\" (sort)=\"onSort($event)\"> Name </th>\r\n                        <th width=\"20%\" sortable=\"Description\" (sort)=\"onSort($event)\">Description </th>\r\n                        <th width=\"10%\" sortable=\"Price\" (sort)=\"onSort($event)\">Price</th>\r\n                        <th width=\"15%\" sortable=\"Status\" (sort)=\"onSort($event)\">Status </th>\r\n                        <th width=\"15%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                        <td>\r\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td> {{item.name}} </td>\r\n                        <td> {{item.description}} </td>\r\n                        <td>{{item.price}}</td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.modifierID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/customerinquiry/customerinquiry.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/customerinquiry/customerinquiry.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Customer Inquiry</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Customer Inquiry List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" />\r\n            </div>\r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" >\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button [routerLink]=\"['add']\" class=\"btn btn-primary mt-4 mr-1\">\r\n                    Customer Inquiry\r\n                </button>\r\n            </div>\r\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Customer\r\n            </button></div> -->\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"FullName\" > Name </th>\r\n                        <th width=\"15%\" sortable=\"Email\" >Email </th>\r\n                        <th width=\"15%\" sortable=\"Mobile\" >Mobile </th>\r\n                        <th width=\"15%\" sortable=\"Password\" >Type </th>\r\n                        <th width=\"15%\" sortable=\"Status\" >Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr>\r\n                        <td>\r\n                            <!-- <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" /> -->\r\n                            <div class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td>Ammad </td>\r\n                        <td> ammadraza001@gmail.com </td>\r\n                        <td>03341897997</td>\r\n                        <td>abc123</td>\r\n                        <td>\r\n                            <ngb-highlight  class=\"btn btn-sm\">\r\n                                 \r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a  ><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a  ><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <!-- <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results -->\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <!-- <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination> -->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/deliverydetail/deliverydetail.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/deliverydetail/deliverydetail.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Delivery Area</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Delivery Area List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" />\r\n            </div>\r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" >\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button   class=\"btn btn-primary mt-4 mr-1\">\r\n                    Delivery Area\r\n                </button>\r\n            </div>\r\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Customer\r\n            </button></div> -->\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"FullName\" >Area Name </th>\r\n                        <th width=\"15%\" sortable=\"Email\" >Email </th>\r\n                        <th width=\"15%\" sortable=\"Mobile\" >Mobile </th>\r\n                        <th width=\"15%\" sortable=\"Password\" >Type </th>\r\n                        <th width=\"15%\" sortable=\"Status\" >Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr>\r\n                        <td>\r\n                            <!-- <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" /> -->\r\n                            <div class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td>Ammad </td>\r\n                        <td> ammadraza001@gmail.com </td>\r\n                        <td>03341897997</td>\r\n                        <td>abc123</td>\r\n                        <td>\r\n                            \r\n                        </td>\r\n                        <td>\r\n                            <a  ><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a  ><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <!-- <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results -->\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <!-- <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination> -->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/prescription/prescription.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/prescription/prescription.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Medicine Preciption</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Medicine Preciption List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" />\r\n            </div>\r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" >\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <!-- <button   class=\"btn btn-primary mt-4 mr-1\">\r\n                    Medicine Preciption\r\n                </button> -->\r\n            </div>\r\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Customer\r\n            </button></div> -->\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"FullName\" >Customer Name </th>\r\n                        <th width=\"15%\" sortable=\"Email\" >Email </th>\r\n                        <th width=\"15%\" sortable=\"Mobile\" >Mobile </th>\r\n                        <th width=\"15%\" sortable=\"Password\" >Type </th>\r\n                        <th width=\"15%\" sortable=\"Status\" >Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr>\r\n                        <td>\r\n                            <!-- <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" /> -->\r\n                            <div class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td>Ammad </td>\r\n                        <td> ammadraza001@gmail.com </td>\r\n                        <td>03341897997</td>\r\n                        <td>abc123</td>\r\n                        <td>\r\n                            \r\n                        </td>\r\n                        <td>\r\n                            <a  ><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a  ><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <!-- <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results -->\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <!-- <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination> -->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/drappoinment/drappoinment.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/drappoinment/drappoinment.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Doctor Appoinment</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Doctor Appoinment List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" />\r\n            </div>\r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" >\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <!-- <button   class=\"btn btn-primary mt-4 mr-1\">\r\n                    Doctor Appoinment\r\n                </button> -->\r\n            </div>\r\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Customer\r\n            </button></div> -->\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"FullName\" > Name </th>\r\n                        <th width=\"15%\" sortable=\"Email\" >Email </th>\r\n                        <th width=\"15%\" sortable=\"Mobile\" >Mobile </th>\r\n                        <th width=\"15%\" sortable=\"Password\" >Type </th>\r\n                        <th width=\"15%\" sortable=\"Status\" >Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr>\r\n                        <td>\r\n                            <!-- <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" /> -->\r\n                            <div class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td>Ammad </td>\r\n                        <td> ammadraza001@gmail.com </td>\r\n                        <td>03341897997</td>\r\n                        <td>abc123</td>\r\n                        <td>\r\n                            \r\n                        </td>\r\n                        <td>\r\n                            <a  ><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a  ><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <!-- <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results -->\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <!-- <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination> -->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/laboratoryinquiry/laboratoryinquiry.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/laboratoryinquiry/laboratoryinquiry.component.html ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Lab</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Lab Inquiry List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" />\r\n            </div>\r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" >\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <!-- <button   class=\"btn btn-primary mt-4 mr-1\">\r\n                    Lab Inquiry\r\n                </button> -->\r\n            </div>\r\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Customer\r\n            </button></div> -->\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"FullName\" >Customer Name </th>\r\n                        <th width=\"15%\" sortable=\"Email\" >Email </th>\r\n                        <th width=\"15%\" sortable=\"Mobile\" >Mobile </th>\r\n                        <th width=\"15%\" sortable=\"Password\" >Type </th>\r\n                        <th width=\"15%\" sortable=\"Status\" >Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr>\r\n                        <td>\r\n                            <!-- <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" /> -->\r\n                            <div class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td>Ammad </td>\r\n                        <td> ammadraza001@gmail.com </td>\r\n                        <td>03341897997</td>\r\n                        <td>abc123</td>\r\n                        <td>\r\n                            \r\n                        </td>\r\n                        <td>\r\n                            <a  ><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a  ><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <!-- <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results -->\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <!-- <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination> -->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salescategorywise/salescategorywise.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salescategorywise/salescategorywise.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Report</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Sales Categorywise</h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\"> </div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n\r\n    <div class=\"card-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6 form-group\">\r\n                <label>Select Date</label>\r\n                <ngbd-datepicker-range-popup></ngbd-datepicker-range-popup>\r\n            </div>\r\n            <!-- <div class=\" col-lg-4 input-group \" style=\"padding-top: 25px;\">                \r\n                <div class=\"input-group-prepend\" style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div> -->\r\n            <div class=\"col-md-6 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button class=\"btn btn-primary mt-4\" (click)=\"Filter()\" type=\"submit\">Search</button>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12 form-group\">\r\n                <label for=\"inputUsername\">Select Location</label>\r\n                <ng-select [items]=\"Locations\" [multiple]=\"true\" bindLabel=\"name\" [selectableGroup]=\"true\" [selectableGroupAsModel]=\"false\" [closeOnSelect]=\"false\" bindValue=\"locationID\" [(ngModel)]=\"selectedLocations\">\r\n                    <ng-template ng-optgroup-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\r\n                        <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"item$.selected\" /> {{item.locationID }}\r\n                    </ng-template>\r\n                    <ng-template ng-option-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\r\n                        <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"item$.selected\" /> {{item.name}}\r\n                    </ng-template>\r\n                </ng-select>\r\n            </div>\r\n        </div>\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"30%\">Category Name</th>\r\n                        <th width=\"15%\"> Quantity Sold </th>\r\n                        <th width=\"15%\">Total Cost </th>\r\n                        <th width=\"20%\">Total Price </th>\r\n                        <th width=\"20%\">Profit </th>\r\n\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of salesCategoryWise \">\r\n\r\n                        <td> {{item.categoryName}} </td>\r\n                        <td> {{item.quantity}} </td>\r\n                        <td>{{item.cost}}</td>\r\n                        <td>{{item.price}}</td>\r\n                        <td>{{item.price -item.cost}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salescustomerwise/salescustomerwise.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salescustomerwise/salescustomerwise.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Report</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Sales Customerwise</h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\"> </div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n\r\n    <div class=\"card-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6 form-group\">\r\n                <label>Select Date</label>\r\n                <ngbd-datepicker-range-popup></ngbd-datepicker-range-popup>\r\n            </div>\r\n          \r\n            <div class=\"col-md-6 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button class=\"btn btn-primary mt-4\" (click)=\"Filter()\" type=\"submit\">Search</button>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12 form-group\">\r\n                <label for=\"inputUsername\">Select Location</label>\r\n                <ng-select [items]=\"Locations\" [multiple]=\"true\" bindLabel=\"name\" [selectableGroup]=\"true\" [selectableGroupAsModel]=\"false\" [closeOnSelect]=\"false\" bindValue=\"locationID\" [(ngModel)]=\"selectedLocations\">\r\n                    <ng-template ng-optgroup-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\r\n                        <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"item$.selected\" /> {{item.locationID }}\r\n                    </ng-template>\r\n                    <ng-template ng-option-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\r\n                        <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"item$.selected\" /> {{item.name}}\r\n                    </ng-template>\r\n                </ng-select>\r\n            </div>\r\n        </div>\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">Trans #</th>\r\n                        <th width=\"10%\">Order #</th>\r\n                        <th width=\"15%\">Name</th>\r\n                        <th width=\"20%\">Address </th>\r\n                        <th width=\"10%\">Mobile</th>\r\n                        <th width=\"10%\">Amount Total </th>\r\n                        <th width=\"5%\">Tax </th>\r\n                        <th width=\"10%\">Charges </th>\r\n                        <th width=\"10%\">Grand Total </th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of orders \">\r\n                        <td>{{item.transactionNo}} </td>\r\n                        <td>{{item.orderNo}} </td>\r\n                        <td>{{item.customerName}} </td>\r\n                        <td>{{item.customerAddress}} </td>\r\n                        <td>{{item.customerMobile}}</td>\r\n                        <td>{{item.amountTotal}}</td>\r\n                        <td>{{item.tax}}</td>\r\n                        <td>{{item.serviceCharges}}</td>\r\n                        <td>{{item.grandTotal}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salesdetail/salesdetail.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salesdetail/salesdetail.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Report</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Sales Detail</h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\"> </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6 form-group\">\r\n                <label>Select Date</label>\r\n                <ngbd-datepicker-range-popup></ngbd-datepicker-range-popup>\r\n            </div>\r\n\r\n            <!-- <div class=\" col-lg-4 input-group \" style=\"padding-top: 25px;\">                \r\n                <div class=\"input-group-prepend\" style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div> -->\r\n\r\n            <div class=\"col-md-6 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                <span>Export</span>\r\n              </button>\r\n                <button class=\"btn btn-primary mt-4\" (click)=\"Filter()\" type=\"submit\">Search</button>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12 form-group\">\r\n                <label for=\"inputUsername\">Select Location</label>\r\n                <ng-select [items]=\"Locations\" [multiple]=\"true\" bindLabel=\"name\" [selectableGroup]=\"true\" [selectableGroupAsModel]=\"false\" [closeOnSelect]=\"false\" bindValue=\"locationID\" [(ngModel)]=\"selectedLocations\">\r\n                    <ng-template ng-optgroup-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\r\n                        <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"item$.selected\" /> {{item.locationID }}\r\n                    </ng-template>\r\n                    <ng-template ng-option-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\r\n                        <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"item$.selected\" /> {{item.name}}\r\n                    </ng-template>\r\n                </ng-select>\r\n            </div>\r\n        </div>\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">Trans #</th>\r\n                        <th width=\"10%\">Order #</th>\r\n                        <th width=\"15%\">Name</th>\r\n                        <th width=\"20%\">Address </th>\r\n                        <th width=\"10%\">Mobile</th>\r\n                        <th width=\"10%\">Amount Total </th>\r\n                        <th width=\"10%\">Discount </th>\r\n                        <th width=\"5%\">Tax </th>\r\n                        <th width=\"10%\">Charges </th>\r\n                        <th width=\"10%\">Grand Total </th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of orderDetails \">\r\n                        <td>{{item.transactionNo}} </td>\r\n                        <td>{{item.orderNo}} </td>\r\n                        <td>{{item.customerName}} </td>\r\n                        <td>{{item.customerAddress}} </td>\r\n                        <td>{{item.customerMobile}}</td>\r\n                        <td>{{item.amountTotal}}</td>\r\n                        <td>{{item.discountAmount}}</td>\r\n                        <td>{{item.tax}}</td>\r\n                        <td>{{item.serviceCharges}}</td>\r\n                        <td>{{item.grandTotal}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salesitemwise/salesitemwise.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salesitemwise/salesitemwise.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Report</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Sales Itemwise</h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\"> </div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n\r\n    <div class=\"card-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6 form-group\">\r\n                <label>Select Date</label>\r\n                <ngbd-datepicker-range-popup></ngbd-datepicker-range-popup>\r\n            </div>\r\n            <!-- <div class=\" col-lg-4 input-group \" style=\"padding-top: 25px;\">                \r\n                <div class=\"input-group-prepend\" style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div> -->\r\n            <div class=\"col-md-6 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button class=\"btn btn-primary mt-4\" (click)=\"Filter()\" type=\"submit\">Search</button>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12 form-group\">\r\n                <label for=\"inputUsername\">Select Location</label>\r\n                <ng-select [items]=\"Locations\" [multiple]=\"true\" bindLabel=\"name\" [selectableGroup]=\"true\" [selectableGroupAsModel]=\"false\" [closeOnSelect]=\"false\" bindValue=\"locationID\" [(ngModel)]=\"selectedLocations\">\r\n                    <ng-template ng-optgroup-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\r\n                        <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"item$.selected\" /> {{item.locationID }}\r\n                    </ng-template>\r\n                    <ng-template ng-option-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\r\n                        <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"item$.selected\" /> {{item.name}}\r\n                    </ng-template>\r\n                </ng-select>\r\n            </div>\r\n        </div>\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"30%\">Item Name</th>\r\n                        <th width=\"15%\"> Quantity Sold </th>\r\n                        <th width=\"15%\">Total Cost </th>\r\n                        <th width=\"20%\">Total Price </th>\r\n                        <th width=\"20%\">Profit </th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of salesItemWise\">\r\n                        <td> {{item.itemName}} </td>\r\n                        <td> {{item.quantity}} </td>\r\n                        <td>{{item.cost}}</td>\r\n                        <td>{{item.price}}</td>\r\n                        <td>{{item.price -item.cost}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salesuserwise/salesuserwise.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salesuserwise/salesuserwise.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Customers</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Sales Detail Report</h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\"> </div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n\r\n    <div class=\"card-body\">\r\n       \r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-md-2 form-group\">\r\n                <label for=\"inputUsername\">Select Location</label>\r\n                <select class=\"custom-select\" #locationDrp [(ngModel)]=\"locationID\">\r\n                    <option value=\"0\">All</option> \r\n                    <option [ngValue]=\"option.locationID\" \r\n                        *ngFor=\"let option of Locations\">\r\n                        {{option.name}}\r\n                    </option>\r\n               </select>\r\n            </div>\r\n            <div class=\"col-md-7 form-group\">\r\n                <label>Select Date</label>\r\n                <ngbd-datepicker-range-popup></ngbd-datepicker-range-popup>\r\n            </div>\r\n            <div class=\"col-md-3 form-group\">\r\n                <button class=\"btn btn-primary mt-4\" (click)=\"Filter()\" type=\"submit\">Search</button>\r\n            </div>\r\n           \r\n        </div>\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\"> Name </th>\r\n                        <th width=\"15%\">Email </th>\r\n                        <th width=\"15%\">Mobile </th>\r\n                        <th width=\"15%\">Password </th>\r\n                        <th width=\"15%\">Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                        <td>\r\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td> {{item.fullName}} </td>\r\n                        <td> {{item.email}} </td>\r\n                        <td>{{item.mobile}}</td>\r\n                        <td>{{item.password}}</td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.customerID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a (click)=\"Delete(item.customerID)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/summary/summary.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/summary/summary.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Report</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Sales Summary</h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\">\r\n\r\n            </div>\r\n        </div>\r\n        <hr/>\r\n        <div class=\"row\">\r\n\r\n            <div class=\"col-md-9 form-group\">\r\n                <label>Select Date</label>\r\n                <ngbd-datepicker-range-popup></ngbd-datepicker-range-popup>\r\n            </div>\r\n            <div class=\"col-md-3 form-group\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button class=\"btn btn-primary mt-4\" (click)=\"getData()\" type=\"submit\">Search</button>\r\n            </div>\r\n            <div class=\"col-md-6 mb-4\">\r\n                <div class=\"card border-left-primary shadow h-100 py-2\">\r\n\r\n\r\n                    <div class=\"card-body\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-xs font-weight-bold text-primary text-uppercase mb-1\">Total Sales</div>\r\n                                <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{_model.totalSales}}</div>\r\n                            </div>\r\n                            <div class=\"col-auto\">\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"card-body\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-xs font-weight-bold text-primary text-uppercase mb-1\">Total Tax</div>\r\n                                <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{_model.totalTax}}</div>\r\n                            </div>\r\n                            <div class=\"col-auto\">\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-xs font-weight-bold text-primary text-uppercase mb-1\">Total Discount</div>\r\n                                <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{_model.totalDiscount}}</div>\r\n                            </div>\r\n                            <div class=\"col-auto\">\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-xs font-weight-bold text-primary text-uppercase mb-1\">Total NetSales</div>\r\n                                <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{_model.totalNetSales}}</div>\r\n                            </div>\r\n                            <div class=\"col-auto\">\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6 mb-4\">\r\n                <div class=\"card border-left-primary shadow h-100 py-2\">\r\n\r\n\r\n                    <div class=\"card-body\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-xs font-weight-bold text-primary text-uppercase mb-1\">Total Orders</div>\r\n                                <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{_model.totalSalesOrders}}</div>\r\n                            </div>\r\n                            <div class=\"col-auto\">\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"card-body\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-xs font-weight-bold text-primary text-uppercase mb-1\">Total Delivery Orders</div>\r\n                                <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{_model.totalDeliveryOrders}}</div>\r\n                            </div>\r\n                            <div class=\"col-auto\">\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-xs font-weight-bold text-primary text-uppercase mb-1\">Total PickUp Orders</div>\r\n                                <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{_model.totalPickUpOrders}}</div>\r\n                            </div>\r\n                            <div class=\"col-auto\">\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-xs font-weight-bold text-primary text-uppercase mb-1\">Total Cancel Orders</div>\r\n                                <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{_model.totalCancelOrders}}</div>\r\n                            </div>\r\n                            <div class=\"col-auto\">\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/sales/orderdetails/orderdetails.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/sales/orderdetails/orderdetails.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Order Details - <span class=\"badge badge-info\"> {{ order.statusID == 100 ? \"Delivered\" : order.statusID==101 ?\"Order confirmed\" : order.statusID == 102? \"Order prepared\" : order.statusID == 103? \" Order out for delivery\" : order.statusID == 104? \"Order Cancelled\" : \"-\" }}</span></h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\">\r\n\r\n            </div>\r\n        </div>\r\n        <hr/>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12 mb-4\" *ngIf=\"order.statusID!=100\">\r\n                <div class=\"card border-left-info shadow mb-4\">\r\n                    <div class=\"card-header border-bottom-0\">Order Status</div>\r\n                    <div class=\"card-body\">\r\n                      <div class=\"\">\r\n                        <button class=\"btn btn-warning mr-1\" (click)=\"updateOrder(order,102)\" *ngIf=\"order.statusID!=102\">\r\n                          <i class=\"fas fa-check-circle\"></i> Prepared\r\n                        </button>\r\n                        <button class=\"btn btn-info mr-1\" (click)=\"updateOrder(order,103)\" *ngIf=\"order.statusID!=103\">\r\n                          <i class=\"fas fa-truck\"></i> Out For Delivery\r\n                        </button>\r\n                        <button class=\"btn btn-success mr-1\" (click)=\"updateOrder(order,100)\" *ngIf=\"order.statusID!=100\">\r\n                          <i class=\"fas fa-people-carry\"></i> Delivered\r\n                        </button>\r\n                        <button class=\"btn btn-danger mr-1\" (click)=\"updateOrder(order,104)\">\r\n                          <i class=\"fas fa-people-carry\"></i> Cancelled\r\n                        </button>\r\n                      </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6 mb-4\">\r\n\r\n                <div class=\"card border-left-success shadow mb-4\">\r\n                    <div class=\"card-body\">\r\n                        <div class=\"card\">\r\n                            <div class=\"card-header border-bottom-0\">Customer Information</div>\r\n\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                      Customer Name\r\n                                    </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderCustomerInfo.name }}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                     Email\r\n                                    </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderCustomerInfo.email }}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                      Address\r\n                                    </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderCustomerInfo.addressNickName }}</div>\r\n\r\n\r\n\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                    Google Address\r\n                                    </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderCustomerInfo.address }} | Latitude: {{ orderCustomerInfo.latitude }}| Longitude: {{ orderCustomerInfo.longitude }}</div>\r\n\r\n\r\n\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                       Contact Number\r\n                                    </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderCustomerInfo.mobile }}</div>\r\n                            </div>\r\n                            <!-- <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                     Location URL\r\n                                    </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">19th Oct 2020</div>\r\n                            </div> -->\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"card border-left-warning shadow \">\r\n\r\n                    <div class=\"card-body\">\r\n\r\n                        <!-- Report summary card example-->\r\n                        <div class=\"card\">\r\n                            <div class=\"card-header border-bottom-0\">Order Information</div>\r\n\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                           Order No\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.orderNo }}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                           Transaction No\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.transactionNo }}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                           Order Type\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.orderType=='1'?'Home': order.orderType=='2'?'Work':'Other' }}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                          Order Date\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.orderDate | date }}</div>\r\n                            </div>\r\n                            <!-- <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                          Prepared Date\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.orderPreparedDate | date }}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                          Out for Delivery Date\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.orderOFDDate | date }}</div>\r\n                            </div> -->\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                         Status\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"mr-2\">\r\n                                    {{ order.statusID == 100 ? \"Delivered\" : order.statusID==101 ?\"Order confirmed\" : order.statusID == 102? \"Order prepared\" : order.statusID == 103? \" Order out for delivery\" : order.statusID == 104? \"Order Cancelled\" : \"-\" }}\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6 mb-4\">\r\n                <div class=\"card border-left-danger shadow mb-4\">\r\n\r\n                    <div class=\"card-body\">\r\n                        <div class=\"card\">\r\n                            <div class=\"card-header border-bottom-0\">Billing Information</div>\r\n\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                  Amount Total\r\n                                </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ (orderOrderCheckout.amountTotal | number : '1.2-2')}}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                  Discount\r\n                                </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderOrderCheckout.discountAmount | number : '1.2-2'}}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                  Tax\r\n                                </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderOrderCheckout.tax | number : '1.2-2'}}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                  Service Charges\r\n                                </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderOrderCheckout.serviceCharges | number : '1.2-2'}}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                           Grand Total\r\n                                </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderOrderCheckout.grandTotal | number : '1.2-2'}}</div>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"card border-left-primary shadow\">\r\n\r\n                    <div class=\"card-body\">\r\n                        <div class=\"tile-body p-0 table-responsive \">\r\n                            <table class=\"table table-striped\">\r\n                                <thead>\r\n                                    <tr class=\"table-header\">\r\n                                        <th width=\"50%\">Name </th>\r\n                                        <th width=\"25\">Quantity</th>\r\n                                        <th width=\"25\">Price</th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of orderDetails \">\r\n                                        <td> {{item.name}}\r\n                                            <tr *ngFor=\"let item1 of item.orderDetailModifiers \">\r\n                                                <td class=\"badge badge-pill\">Modifier: {{item1.modifierName }} [{{item.Quantity}}X {{item1.price}} ] </td>\r\n\r\n                                            </tr>\r\n                                        </td>\r\n                                        <td> {{item.quantity}} </td>\r\n                                        <td> {{item.price}} </td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n\r\n\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/sales/orders/orders.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/sales/orders/orders.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Orders</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n  <div class=\"card-header py-3\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-5\">\r\n        <h6 class=\"m-0 font-weight-bold text-orange\">Orders List</h6>\r\n      </div>\r\n      <div class=\" col-lg-4 input-group mb-3\" style=\"padding-top: 25px;\">\r\n        <div class=\"input-group-prepend\" style=\"height: 39px;\">\r\n          <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n        </div>\r\n        <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n      </div>\r\n      <div class=\"col-md-3 form-group text-right\">\r\n        <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n          <span translate>Export</span>\r\n        </button>\r\n        <button [routerLink]=\"['add']\" class=\"btn btn-primary mt-4 mr-1\">\r\n          Add Order\r\n        </button>\r\n      </div>\r\n      <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n          Add Customer\r\n      </button></div> -->\r\n    </div>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"tile-body p-0 table-responsive \">\r\n      <table class=\"table table-striped\">\r\n        <thead>\r\n          <tr class=\"table-header\">\r\n            <th width=\"10%\" sortable=\"orderNo\" (sort)=\"onSort($event)\"> Order # </th>\r\n            <th width=\"10%\" sortable=\"transactionNo\" (sort)=\"onSort($event)\">Trans # </th>\r\n            <th width=\"15%\" sortable=\"customerName\" (sort)=\"onSort($event)\">Name </th>\r\n            <th width=\"10%\" sortable=\"customerMobile\" (sort)=\"onSort($event)\">Contact </th>\r\n            <th width=\"10%\" sortable=\"grandTotal\" (sort)=\"onSort($event)\">Total </th>\r\n            <th width=\"10%\" sortable=\"orderDate\" (sort)=\"onSort($event)\">Date </th>\r\n            <th width=\"10%\" sortable=\"orderType\" (sort)=\"onSort($event)\">Order Type </th>\r\n            <th width=\"10%\" sortable=\"statusID\" (sort)=\"onSort($event)\">Status </th>\r\n            <th width=\"5%\"></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n\r\n            <td>112</td>\r\n            <td>123</td>\r\n            <td>Ammad</td>\r\n            <td>+92-331-3565699</td>\r\n            <td>52</td>\r\n            <td>18-Aug-2022</td>\r\n            <td>Urgent</td>\r\n            <td>2</td>\r\n\r\n            <td>\r\n              <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n              </ngb-highlight>\r\n            </td>\r\n            <td>\r\n              <a (click)=\"Edit(item.MedicineID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n              <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n        <p class=\"pagination-count\">\r\n          Showing\r\n          <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n          <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n          <strong>{{(total$ | async)!}}</strong> results\r\n        </p>\r\n      </div>\r\n      <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n        <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n        </ngb-pagination>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n  <!-- Page Heading\r\n  <h1 class=\"h3 mb-2 text-gray-800\">Sales</h1>\r\n  <p class=\"mb-4\"></p>\r\n\r\n  DataTales Example\r\n  <div class=\"card shadow mb-4\">\r\n      <div class=\"card-header py-3\">\r\n          <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                  <h6 class=\"m-0 font-weight-bold text-orange\">Orders List</h6>\r\n              </div>\r\n              <div class=\"col-md-6 text-right\"> </div>\r\n          </div>\r\n      </div>\r\n      <div class=\"card-body\">\r\n          <div class=\"row\">\r\n              <div class=\"col-md-5 form-group\">\r\n                  <label>Select Date</label>\r\n                  <ngbd-datepicker-range-popup></ngbd-datepicker-range-popup>\r\n              </div>\r\n\r\n              <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                  <div class=\"input-group-prepend\" style=\"height: 39px;\">\r\n                      <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                  </div>\r\n                  <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n              </div>\r\n\r\n\r\n              <div class=\"col-md-3 form-group text-right\">\r\n                  <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                      <span translate>Export</span>\r\n                  </button>\r\n                  <button class=\"btn btn-primary mt-4\" (click)=\"Filter()\" type=\"submit\">Search</button>\r\n              </div>\r\n          </div>\r\n          <div class=\"row\">\r\n              <div class=\"col-md-12 form-group\">\r\n                  <label for=\"inputUsername\">Select Location</label>\r\n                  <ng-select [items]=\"Locations\" [multiple]=\"true\" bindLabel=\"name\" [selectableGroup]=\"true\" [selectableGroupAsModel]=\"false\" [closeOnSelect]=\"false\" bindValue=\"locationID\" [(ngModel)]=\"selectedLocations\">\r\n                      <ng-template ng-optgroup-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\r\n                          <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"item$.selected\" /> {{item.locationID }}\r\n                      </ng-template>\r\n                      <ng-template ng-option-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\r\n                          <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"item$.selected\" /> {{item.name}}\r\n                      </ng-template>\r\n                  </ng-select>\r\n              </div>\r\n          </div>\r\n          <div class=\"tile-body p-0 table-responsive \">\r\n              <table class=\"table table-striped\">\r\n                  <thead>\r\n                      <tr class=\"table-header\">\r\n                          <th width=\"10%\" sortable=\"orderNo\" (sort)=\"onSort($event)\"> Order # </th>\r\n                          <th width=\"10%\" sortable=\"transactionNo\" (sort)=\"onSort($event)\">Trans # </th>\r\n                          <th width=\"15%\" sortable=\"customerName\" (sort)=\"onSort($event)\">Name </th>\r\n                          <th width=\"10%\" sortable=\"customerMobile\" (sort)=\"onSort($event)\">Contact </th>\r\n                          <th width=\"10%\" sortable=\"grandTotal\" (sort)=\"onSort($event)\">Total </th>\r\n                          <th width=\"10%\" sortable=\"orderDate\" (sort)=\"onSort($event)\">Date </th>\r\n                          <th width=\"10%\" sortable=\"orderType\" (sort)=\"onSort($event)\">Order Type </th>\r\n                          <th width=\"10%\" sortable=\"statusID\" (sort)=\"onSort($event)\">Status </th>\r\n                          <th width=\"5%\"></th>\r\n                      </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                      <tr *ngFor=\"let item of data$ | async \">\r\n\r\n                          <td> {{item.orderNo}} </td>\r\n                          <td> {{item.transactionNo}} </td>\r\n                          <td> {{item.customerName}} </td>\r\n                          <td> {{item.customerMobile}} </td>\r\n                          <td> {{item.amountTotal | number : '1.2-2'}} </td>\r\n                          <td> {{item.tax | number : '1.2-2'}} </td>\r\n                          <td> {{item.serviceCharges | number : '1.2-2'}} </td>\r\n                          <td> <span class=\"badge badge-success-soft text-success badge-pill py-2 px-3 mb-2\" style=\"background-color: #bfe5dc;\">{{item.grandTotal | number : '1.2-2'}} PKR</span> </td>\r\n                          <td>{{item.orderDate | date}}</td>\r\n                          <td><span class=\"badge badge-yellow\">{{item.orderType==1?\"Delivery\" :\"Pick Up\"}}</span></td>\r\n                          <td>\r\n                              <ngb-highlight [ngClass]=\"{'btn-info': item.statusID === 102,'btn-warning': item.statusID === 101,'btn-success': item.statusID === 100, 'btn-danger':item.statusID === 103, 'btn-danger':item.statusID === 104 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==100 ? 'Delivered' :\r\n                               item.statusID ==101 ? 'Confirmed' :\r\n                               item.statusID ==102 ? 'Prepared' :\r\n                               item.statusID ==103 ? 'On Delivery' :\r\n                               item.statusID ==104 ? 'Cancelled' :'-'\" [term]=\"service.searchTerm\">\r\n                              </ngb-highlight>\r\n                          </td>\r\n                          <td>\r\n                              <a (click)=\"View(item.orderID)\"><i class=\"fas fa-fw fa-eye\"></i> </a>\r\n                              <a (click)=\"open(item.orderID)\"><i class=\"fas fa-fw fa-eye\"></i> </a>\r\n                              <a (click)=\"Print(item.orderID)\"><i class=\"fas fa-fw fa-print\"></i> </a>\r\n                          </td>\r\n                      </tr>\r\n                  </tbody>\r\n              </table>\r\n          </div>\r\n\r\n\r\n          <div class=\"row\">\r\n              <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                  <p class=\"pagination-count\">\r\n                      Showing\r\n                      <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                      <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                      <strong>{{(total$ | async)!}}</strong> results\r\n                  </p>\r\n              </div>\r\n              <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                  <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                  </ngb-pagination>\r\n              </div>\r\n          </div>\r\n      </div>\r\n  </div> -->\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/Delivery/adddelivery/adddelivery.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/Delivery/adddelivery/adddelivery.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Area</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"deliveryForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-xl-12\">\r\n            <div class=\"card mb-4\">\r\n                <div class=\"card-header\">Delivery Area Details</div>\r\n                <div class=\"card-body\">\r\n\r\n                                <div class=\"form-row\">\r\n                                    <div class=\"form-group col-md-12\">\r\n            \r\n                                        <label class=\"small mb-1\" for=\"inputLocation\">Brands</label>\r\n                                        <ng-select [items]=\"BrandsList\" bindLabel=\"name\" bindValue=\"brandID\" [multiple]=\"true\" placeholder=\"\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"selectedBrandIds\">\r\n                                            <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                                                <div class=\"ng-value\" *ngFor=\"let item of items\">\r\n                                                    <span class=\"ng-value-label\">{{item.name}}</span>\r\n                                                    <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                                                </div>\r\n            \r\n                                            </ng-template>\r\n                                        </ng-select>\r\n                                    </div>\r\n                                </div>\r\n                            \r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-8\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                                <input type=\"text\" class=\"form-control\" id=name placeholder=\"\" formControlName=\"name\">\r\n                                <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\r\n                                    <div *ngIf=\"f.name.errors.required\">\r\n                                        Name is required.\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <!-- Form Row-->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Amount</label>\r\n                                    <input type=\"number\" class=\"form-control\" id=amount placeholder=\"\" formControlName=\"amount\">\r\n                                    <div *ngIf=\"f.amount.invalid && (f.amount.dirty || f.amount.touched)\" class=\"alert alert-danger\">\r\n                                        <div *ngIf=\"f.amount.errors.required\">\r\n                                            Amount is required.\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </div>\r\n                     \r\n                    </div>\r\n\r\n\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-lg-12\">\r\n                            <label for=\"Item Status\">Status</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- Save changes button-->\r\n                    <button class=\"btn btn-primary\" type=\"submit\" >Save changes</button>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/appsettings/appsettings.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/appsettings/appsettings.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Timings & Info</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"categoryForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-xl-6\">\r\n            <div class=\"card mb-4\">\r\n                <div class=\"card-header\">Timings & Info Details</div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-8\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"small mb-1\" for=\"inputUsername\"> Branch Name</label>\r\n                                <input type=\"text\" class=\"form-control\" id=BranchName placeholder=\"\" formControlName=\"branchName\">\r\n                                <div *ngIf=\"f.branchName.invalid && (f.branchName.dirty || f.branchName.touched)\" class=\"alert alert-danger\">\r\n                                    <div *ngIf=\"f.branchName.errors.required\">\r\n                                       Branch Name is required.\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <!-- Form Row-->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Branch Address</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=branchAddress placeholder=\"\" formControlName=\"branchAddress\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Discount</label>\r\n                                    <input type=\"number\" class=\"form-control\" id=discount placeholder=\"\" formControlName=\"discount\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Delivery No </label>\r\n                                    <input type=\"text\" class=\"form-control\" id=deliveryNo placeholder=\"\" formControlName=\"deliveryNo\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Whatsapp No </label>\r\n                                    <input type=\"text\" class=\"form-control\" id=whatsappNo placeholder=\"\" formControlName=\"whatsappNo\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Branch Timing </label>\r\n                                    <input type=\"text\" class=\"form-control\" id=branchTiming placeholder=\"\" formControlName=\"branchTiming\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                      \r\n                    </div>\r\n\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n\r\n                            <label class=\"small mb-1\" for=\"inputLocation\">Discount Description</label>\r\n                            <textarea class=\"form-control\" formControlName=\"discountdescription\" height=\"100px\"></textarea>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-lg-12\">\r\n                            <label for=\"Item Status\">Status</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- Save changes button-->\r\n                    <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-xl-6\">\r\n            <div class=\"card mb-4\">\r\n                <div class=\"card-header\">Application Info</div>\r\n                <div class=\"card-body\">\r\n                   \r\n\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n\r\n                            <label class=\"small mb-1\" for=\"inputLocation\">Application Description</label>\r\n                            <textarea class=\"form-control\" formControlName=\"appDescription\" height=\"100px\"></textarea>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n                            <label class=\"small mb-1\" for=\"inputFirstName\">Facebook Link</label>\r\n                            <input type=\"text\" class=\"form-control\" id=facebook placeholder=\"\" formControlName=\"facebook\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n                            <label class=\"small mb-1\" for=\"inputFirstName\">Twitter Link</label>\r\n                            <input type=\"text\" class=\"form-control\" id=twitter placeholder=\"\" formControlName=\"twitter\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n                            <label class=\"small mb-1\" for=\"inputFirstName\">Instagram Link </label>\r\n                            <input type=\"text\" class=\"form-control\" id=instagram placeholder=\"\" formControlName=\"instagram\">\r\n                        </div>\r\n                    </div>\r\n                    \r\n                    <!-- <div class=\"form-row\">\r\n                        <div class=\"form-group col-lg-12\">\r\n                            <label for=\"Item Status\">Status</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n                            </div>\r\n                        </div>\r\n                    </div> -->\r\n                 \r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/banner/addbanner/addbanner.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/banner/addbanner/addbanner.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add banner</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"bannerForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-xl-12\">\r\n            <div class=\"card mb-4\">\r\n                <div class=\"card-header\">Banner Details</div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-8\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                                <input type=\"text\" class=\"form-control\" id=name placeholder=\"\" formControlName=\"name\">\r\n                                <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\r\n                                    <div *ngIf=\"f.name.errors.required\">\r\n                                        Name is required.\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <!-- Form Row-->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Description</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=Description placeholder=\"\" formControlName=\"description\">\r\n                                    <div *ngIf=\"f.description.invalid && (f.description.dirty || f.description.touched)\" class=\"alert alert-danger\">\r\n                                        <div *ngIf=\"f.description.errors.required\">\r\n                                            Description is required.\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </div>\r\n                        <div class=\"form-group col-md-4 text-center\">\r\n                            <app-imageupload></app-imageupload>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-lg-12\">\r\n                            <label for=\"Item Status\">Status</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- Save changes button-->\r\n                    <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/banner/banner.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/banner/banner.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Banners</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Banners List</h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Banner\r\n            </button></div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"name\" (sort)=\"onSort($event)\"> Name </th>\r\n                        <th width=\"15%\" sortable=\"descripiton\" (sort)=\"onSort($event)\">Descripiton </th>\r\n                        <th width=\"15%\" sortable=\"statusID\" (sort)=\"onSort($event)\">Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                        <td>\r\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td> {{item.name}} </td>\r\n                        <td> {{item.description}} </td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.bannerID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/delivery/delivery.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/delivery/delivery.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Delivery</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Delivery Area</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\">\r\n                <div class=\"input-group-prepend\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div>\r\n            <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Area\r\n            </button></div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">                      \r\n                        <th width=\"30%\" sortable=\"name\" (sort)=\"onSort($event)\"> Name </th>\r\n                        <th width=\"10%\" sortable=\"amount\" (sort)=\"onSort($event)\">  Amount </th>  \r\n                        <th width=\"15%\" sortable=\"statusID\" (sort)=\"onSort($event)\"> Status </th>                          \r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                     \r\n                        <td> {{item.name}} </td>\r\n                        <td> {{item.amount}} </td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.deliveryAreaID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/offers/addoffers/addoffers.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/offers/addoffers/addoffers.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add offer</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"offersForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-xl-12\">\r\n            <div class=\"card mb-4\">\r\n                <div class=\"card-header\">Offers Details</div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-8\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                                <input type=\"text\" class=\"form-control\" id=name placeholder=\"\" formControlName=\"name\">\r\n                                <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\r\n                                    <div *ngIf=\"f.name.errors.required\">\r\n                                        Name is required.\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <!-- Form Row-->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Description</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=Description placeholder=\"\" formControlName=\"description\">\r\n\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                    <div class=\"col-md-9 form-group\">\r\n                                        <label>Select Range of offer</label>\r\n                                        <ngbd-datepicker-range-popup></ngbd-datepicker-range-popup>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group col-md-4 text-center\">\r\n                            <app-imageupload></app-imageupload>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-lg-12\">\r\n                            <label for=\"Item Status\">Status</label>\r\n                            <div class=\"custom-control custom-switch custom-switch-md\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- Save changes button-->\r\n                    <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/offers/offers.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/offers/offers.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--  \r\n<h1 class=\"h3 mb-2 text-gray-800\">Offers</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n \r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Offers List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\">\r\n                <div class=\"input-group-prepend\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div>\r\n            <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Offer\r\n            </button></div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"name\" (sort)=\"onSort($event)\"> Name </th>\r\n                        <th width=\"15%\" sortable=\"descripiton\" (sort)=\"onSort($event)\">Descripiton </th>\r\n                        <th width=\"15%\" sortable=\"fromDate\" (sort)=\"onSort($event)\">From</th>\r\n                        <th width=\"15%\" sortable=\"toDate\" (sort)=\"onSort($event)\">To </th>\r\n                        <th width=\"15%\" sortable=\"statusID\" (sort)=\"onSort($event)\">Status </th>\r\n                        <th width=\"10%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                        <td>\r\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td> {{item.name}} </td>\r\n                        <td> {{item.descripiton}} </td>\r\n                        <td> {{item.fromDate | date}} </td>\r\n                        <td> {{item.toDate| date}} </td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.offerID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div> -->\r\n\r\n \r\n<h1 class=\"h3 mb-2 text-gray-800\">Offers</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n \r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Offers List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\">\r\n                <div class=\"input-group-prepend\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\"   />\r\n            </div>\r\n            <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Offer\r\n            </button></div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"name\"  > Name </th>\r\n                        <th width=\"15%\" sortable=\"descripiton\"  >Descripiton </th>\r\n                        <th width=\"15%\" sortable=\"fromDate\"  >From</th>\r\n                        <th width=\"15%\" sortable=\"toDate\"  >To </th>\r\n                        <th width=\"15%\" sortable=\"statusID\"  >Status </th>\r\n                        <th width=\"10%\">Actions</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr >\r\n                        <td>\r\n                            \r\n                        </td>\r\n                        <td> Offer Name </td>\r\n                        <td> Description </td>\r\n                        <td> 15-07-2022 </td>\r\n                        <td> 25-07-2022 </td>\r\n                        <td>\r\n                             \r\n                        </td>\r\n                        <td>\r\n                            <a  ><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n                            <a  ><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                     \r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                \r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/offers/promotions/promotions.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/offers/promotions/promotions.component.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Promotions</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n \r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Promotion List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\">\r\n                <div class=\"input-group-prepend\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\"   />\r\n            </div>\r\n            <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Promotion\r\n            </button></div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"name\"  > Name </th>\r\n                        <th width=\"15%\" sortable=\"descripiton\"  >Descripiton </th>\r\n                        <th width=\"15%\" sortable=\"fromDate\"  >From</th>\r\n                        <th width=\"15%\" sortable=\"toDate\"  >To </th>\r\n                        <th width=\"15%\" sortable=\"statusID\"  >Status </th>\r\n                        <th width=\"10%\">Actions</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr >\r\n                        <td>\r\n                            \r\n                        </td>\r\n                        <td> Offer Name </td>\r\n                        <td> Description </td>\r\n                        <td> 15-07-2022 </td>\r\n                        <td> 25-07-2022 </td>\r\n                        <td>\r\n                             \r\n                        </td>\r\n                        <td>\r\n                            <a  ><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n                            <a  ><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                     \r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                \r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet>\r\n\r\n</router-outlet>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/counter/counter.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/counter/counter.component.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>Counter</h1>\r\n\r\n<p>This is a simple example of an Angular component.</p>\r\n\r\n<p aria-live=\"polite\">Current count: <strong>{{ currentCount }}</strong></p>\r\n\r\n<button class=\"btn btn-primary\" (click)=\"incrementCounter()\">Increment</button>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/datepicker-range/datepicker-range-popup.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/datepicker-range/datepicker-range-popup.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form class=\"form-inline\">\r\n    <div class=\"form-group hidden\">\r\n        <div class=\"input-group\">\r\n            <input name=\"datepicker\" class=\"form-control\" ngbDatepicker #datepicker=\"ngbDatepicker\" [autoClose]=\"'outside'\" (dateSelect)=\"onDateSelection($event)\" [displayMonths]=\"2\" [dayTemplate]=\"t\" outsideDays=\"hidden\" [startDate]=\"fromDate!\">\r\n            <ng-template #t let-date let-focused=\"focused\">\r\n                <span class=\"custom-day\" [class.focused]=\"focused\" [class.range]=\"isRange(date)\" [class.faded]=\"isHovered(date) || isInside(date)\" (mouseenter)=\"hoveredDate = date\" (mouseleave)=\"hoveredDate = null\">\r\n          {{ date.day }}\r\n        </span>\r\n            </ng-template>\r\n        </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <div class=\"input-group\">\r\n            <input #dpFromDate class=\"form-control\" placeholder=\"dd-mm-yyyy\" name=\"dpFromDate\" [value]=\"formatter.format(fromDate)\" (input)=\"fromDate = validateInput(fromDate, dpFromDate.value)\">\r\n            <div class=\"input-group-append\">\r\n                <button class=\"btn btn-outline-secondary calendar\" (click)=\"datepicker.toggle()\" type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"form-group ml-2\">\r\n        <div class=\"input-group\">\r\n            <input #dpToDate class=\"form-control\" placeholder=\"dd-mm-yyyy\" name=\"dpToDate\" [value]=\"formatter.format(toDate)\" (input)=\"toDate = validateInput(toDate, dpToDate.value)\">\r\n            <div class=\"input-group-append\">\r\n                <button class=\"btn btn-outline-secondary \" (click)=\"datepicker.toggle()\" type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/fetch-data/fetch-data.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/fetch-data/fetch-data.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 id=\"tableLabel\">Weather forecast</h1>\r\n\r\n<p>This component demonstrates fetching data from the server.</p>\r\n\r\n<p *ngIf=\"!forecasts\"><em>Loading...</em></p>\r\n\r\n<table class='table table-striped' aria-labelledby=\"tableLabel\" *ngIf=\"forecasts\">\r\n  <thead>\r\n    <tr>\r\n      <th>Date</th>\r\n      <th>Temp. (C)</th>\r\n      <th>Temp. (F)</th>\r\n      <th>Summary</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr *ngFor=\"let forecast of forecasts\">\r\n      <td>{{ forecast.date }}</td>\r\n      <td>{{ forecast.temperatureC }}</td>\r\n      <td>{{ forecast.temperatureF }}</td>\r\n      <td>{{ forecast.summary }}</td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/imageupload/imageupload.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/imageupload/imageupload.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"group-gap mt-4\">\r\n\r\n    <div class=\"avatar-upload\">\r\n        <div class=\"avatar-edit\">\r\n            <input type='file' id=\"imageUpload\" accept=\".png, .jpg, .jpeg\" #fileInput (change)=\"onFileChange($event)\" />\r\n        </div>\r\n        <div class=\"avatar-preview\">\r\n            <div id=\"imagePreview\" [style.backgroundImage]=\"'url('+ imageUrl +')'\">\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- Submit Button -->\r\n\r\n<button type=\"button\" class=\"file-upload-btn\" (click)=\"fileInput.click()\">Upload Image</button>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/layout/layout.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layout/layout.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<body id=\"page-top\">\r\n    <!-- Page Wrapper -->\r\n    <div id=\"wrapper\">\r\n\r\n        <!-- Sidebar -->\r\n        <ul class=\"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion\" id=\"accordionSidebar\">\r\n\r\n            <!-- Sidebar - Brand -->\r\n            <a class=\"sidebar-brand d-flex align-items-center justify-content-center\" [routerLink]=\"['dashboard']\">\r\n                <div class=\"sidebar-brand-icon\">\r\n                    <img src=\"../../assets/img/logo-White.png\" style=\"width: 45%;\" />\r\n                </div>\r\n            </a>\r\n\r\n            <!-- Divider -->\r\n            <hr class=\"sidebar-divider my-0\">\r\n\r\n            <!-- Nav Item - Dashboard -->\r\n            <li class=\"nav-item active\">\r\n                <a class=\"nav-link\" [routerLink]=\"['dashboard']\">\r\n                    <i class=\"fas fa-fw fa-tachometer-alt\"></i>\r\n                    <span>Dashboard</span></a>\r\n            </li>\r\n\r\n            <!-- Divider -->\r\n            <hr class=\"sidebar-divider\">\r\n\r\n            <!-- Heading -->\r\n            <div class=\"sidebar-heading\">\r\n                Modules\r\n            </div>\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseTwo\" aria-expanded=\"true\" aria-controls=\"collapseTwo\">\r\n                    <i class=\"fas fa-fw fa-list\"></i>\r\n                    <span>Manage Doctors</span>\r\n                </a>\r\n                <div id=\"collapseTwo\" class=\"collapse\" aria-labelledby=\"headingTwo\" data-parent=\"#accordionSidebar\">\r\n                    <div class=\"bg-white py-2 collapse-inner rounded\">\r\n\r\n                        <!-- <a class=\"collapse-item\" [routerLink]=\"['/admin/category']\">Category</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/item']\">Items</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/item/settings']\">Item Settings</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/modifier']\">Modifiers</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/addons']\">Addons</a> -->\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/managedoctor/doctor']\"> Doctor</a>\r\n                        \r\n                    </div>\r\n                </div>\r\n            </li>\r\n            <hr class=\"sidebar-divider\">\r\n            <!-- Nav Item - Pages Collapse Menu -->\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseCustomer\" aria-expanded=\"true\" aria-controls=\"collapseCustomer\">\r\n                    <i class=\"fas fa-fw fa-user\"></i>\r\n                    <span>Pharmacy</span>\r\n                </a>\r\n                <div id=\"collapseCustomer\" class=\"collapse\" aria-labelledby=\"headingTwo\" data-parent=\"#accordionSidebar\">\r\n                    <div class=\"bg-white py-2 collapse-inner rounded\">\r\n                        <!-- <a class=\"collapse-item\" [routerLink]=\"['/admin/customer']\">All Customers</a> -->\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/pharmacy/customerinquiry']\">Customer Inquiry</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/pharmacy/prescription']\">Prescription</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/pharmacy/deliverydetail']\">Delivery Details</a>\r\n                    </div>\r\n                </div>\r\n            </li>\r\n            <hr class=\"sidebar-divider\">\r\n            <!-- Nav Item - Utilities Collapse Menu -->\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseCompany\" aria-expanded=\"true\" aria-controls=\"collapseCompany\">\r\n                    <i class=\"fas fa-fw fa-folder\"></i>\r\n                    <span>Reception</span>\r\n                </a>\r\n                <div id=\"collapseCompany\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\r\n                    <div class=\"bg-white py-2 collapse-inner rounded\">\r\n                        <!-- <a class=\"collapse-item\" [routerLink]=\"['/admin/brand']\">Brands</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/location']\">Branch Settings</a> -->\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/reception/customerinquiry']\">Customer Inquiry</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/reception/drappoinment']\">Dr. Appoinment</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/reception/laboratoryinquiry']\">Laboratory Inquiry</a>\r\n                    </div>\r\n                </div>\r\n            </li>\r\n            <hr class=\"sidebar-divider\">\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseLab\" aria-expanded=\"true\" aria-controls=\"collapseLab\">\r\n                    <i class=\"fas fa-fw fa-folder\"></i>\r\n                    <span>Laboratory</span>\r\n                </a>\r\n                <div id=\"collapseLab\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\r\n                    <div class=\"bg-white py-2 collapse-inner rounded\">\r\n                        <!-- <a class=\"collapse-item\" [routerLink]=\"['/admin/orders']\">Orders</a> -->\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/laboratory/uploadreport']\">Upload Reports</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/laboratory/customerinquiry']\">Customer Inquiry</a>\r\n                    </div>\r\n                </div>\r\n            </li>\r\n            <hr class=\"sidebar-divider\">\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseSales\" aria-expanded=\"true\" aria-controls=\"collapseSales\">\r\n                    <i class=\"fas fa-fw fa-folder\"></i>\r\n                    <span>Sales</span>\r\n                </a>\r\n                <div id=\"collapseSales\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\r\n                    <div class=\"bg-white py-2 collapse-inner rounded\">\r\n                         <a class=\"collapse-item\" [routerLink]=\"['/admin/sales/orders']\">Orders</a> \r\n                        <!--<a class=\"collapse-item\">Orders</a>-->\r\n                    </div>\r\n                </div>\r\n            </li>\r\n            <!-- <hr class=\"sidebar-divider\"> -->\r\n            <!-- Nav Item - Utilities Collapse Menu -->\r\n            <!-- <li class=\"nav-item\">\r\n                <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseReports\" aria-expanded=\"true\" aria-controls=\"collapseReports\">\r\n                    <i class=\"fas fa-fw fa-chart-area\"></i>\r\n                    <span>Reports</span>\r\n                </a>\r\n                <div id=\"collapseReports\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\r\n                    <div class=\"bg-white py-2 collapse-inner rounded\">\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/report/summary']\">Sales Summary </a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/report/salesdetail']\"> Sales details</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/report/salesitemwise']\">Item Sales </a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/report/salescustomerwise']\">Customer Sales </a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/report/salescategorywise']\">Category Sales </a>\r\n                        \r\n                        <a class=\"collapse-item\">Sales Summary </a>\r\n                        <a class=\"collapse-item\"> Sales details</a>\r\n                        <a class=\"collapse-item\">Item Sales </a>\r\n                        <a class=\"collapse-item\">Customer Sales </a>\r\n                        <a class=\"collapse-item\">Category Sales </a>\r\n                        \r\n                    </div>\r\n                </div>\r\n            </li> -->\r\n            <!-- <hr class=\"sidebar-divider\">\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseSupport\" aria-expanded=\"true\" aria-controls=\"collapseSupport\">\r\n                    <i class=\"fas fa-fw fa-sign-out-alt\"></i>\r\n                    <span>Support</span>\r\n                </a>\r\n                <div id=\"collapseSupport\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\r\n                    <div class=\"bg-white py-2 collapse-inner rounded\">\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/tickets']\">Tickets </a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/notifcations']\">Push Notifications</a>\r\n\r\n                    </div>\r\n                </div>\r\n            </li> -->\r\n            <hr class=\"sidebar-divider\">\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseSettings\" aria-expanded=\"true\" aria-controls=\"collapseSettings\">\r\n                    <i class=\"fas fa-fw fa-wrench\"></i>\r\n                    <span>Settings</span>\r\n                </a>\r\n                <div id=\"collapseSettings\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\r\n                    <div class=\"bg-white py-2 collapse-inner rounded\">\r\n                        <!-- <a class=\"collapse-item\" [routerLink]=\"['/generalsettings']\">General Settings </a> -->\r\n                        <!-- <a class=\"collapse-item\" [routerLink]=\"['/admin/banner']\">Discount Banners | APP</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/offers']\">Offers | APP</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/delivery']\">Delivery</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/appsettings']\">App Setting</a> -->\r\n\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/setting/promotions']\">Promotions</a>\r\n                        <a class=\"collapse-item\" [routerLink]=\"['/admin/offers']\" >Offers | APP</a>\r\n                      \r\n                        \r\n                    </div>\r\n                </div>\r\n            </li>\r\n\r\n            <!-- Divider -->\r\n            <hr class=\"sidebar-divider d-none d-md-block\">\r\n\r\n            <!-- Sidebar Toggler (Sidebar) -->\r\n            <div class=\"text-center d-none d-md-inline\">\r\n                <button class=\"rounded-circle border-0\" id=\"sidebarToggle\"></button>\r\n            </div>\r\n\r\n        </ul>\r\n        <!-- End of Sidebar -->\r\n\r\n        <!-- Content Wrapper -->\r\n        <div id=\"content-wrapper\" class=\"d-flex flex-column\">\r\n\r\n            <!-- Main Content -->\r\n            <div id=\"content\">\r\n\r\n                <!-- Topbar -->\r\n                <nav class=\"navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow\">\r\n\r\n                    <!-- Sidebar Toggle (Topbar) -->\r\n                    <button id=\"sidebarToggleTop\" class=\"btn btn-link d-md-none rounded-circle mr-3\">\r\n            <i class=\"fa fa-bars\"></i>\r\n          </button>\r\n\r\n                    <!-- Topbar Search -->\r\n                    <div class=\"d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100\">\r\n                        <strong>Branch Name</strong> : {{branchname}} |\r\n                        <strong>Email</strong> : {{email}}\r\n                    </div>\r\n\r\n                    <!-- Topbar Navbar -->\r\n                    <ul class=\"navbar-nav ml-auto\">\r\n                        <!--<li class=\"nav-item dropdown no-arrow\">\r\n                            <div class=\"\">\r\n                                <label for=\"inputUsername\">Select Location</label>\r\n                                <select class=\"custom-select\" [(ngModel)]=\"locationID\" (change)=\"changeloc($event)\">\r\n                                <option value=\"0\">All</option> \r\n                                <option [ngValue]=\"option.locationID\" \r\n                                    *ngFor=\"let option of Locations\">\r\n                                    {{option.name}}\r\n                                </option>\r\n                               </select>\r\n                            </div>\r\n                        </li>\r\n\r\n\r\n                        <div class=\"topbar-divider d-none d-sm-block\"></div>-->\r\n\r\n                        <!-- Nav Item - User Information -->\r\n                        <li class=\"nav-item dropdown no-arrow\">\r\n                            <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"userDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                                <span class=\"mr-2 d-none d-lg-inline text-gray-600 small\">Administrator</span>\r\n                                <img class=\"img-profile rounded-circle\" src=\"https://user-images.githubusercontent.com/16608864/35882949-bbe13aa0-0bab-11e8-859c-ceda3b213818.jpeg\">\r\n                            </a>\r\n                            <!-- Dropdown - User Information -->\r\n                            <div class=\"dropdown-menu dropdown-menu-right shadow animated--grow-in\" aria-labelledby=\"userDropdown\">\r\n                                <!-- <a class=\"dropdown-item\" href=\"#\">\r\n                                    <i class=\"fas fa-user fa-sm fa-fw mr-2 text-gray-400\"></i> Profile\r\n                                </a>\r\n                                <a class=\"dropdown-item\" href=\"#\">\r\n                                    <i class=\"fas fa-cogs fa-sm fa-fw mr-2 text-gray-400\"></i> Settings\r\n                                </a> -->\r\n\r\n                                <div class=\"dropdown-divider\"></div>\r\n                                <a class=\"dropdown-item\" data-toggle=\"modal\" (click)=\"Logout()\">\r\n                                    <i class=\"fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400\"></i> Logout\r\n                                </a>\r\n                            </div>\r\n                        </li>\r\n\r\n                    </ul>\r\n\r\n                </nav>\r\n                <!-- End of Topbar -->\r\n\r\n                <!-- Begin Page Content -->\r\n                <div class=\"container-fluid\">\r\n                    <router-outlet></router-outlet>\r\n                </div>\r\n            </div>\r\n            <!-- End of Main Content -->\r\n\r\n            <!-- Footer -->\r\n            <footer class=\"sticky-footer bg-white\">\r\n                <div class=\"container my-auto\">\r\n                    <div class=\"copyright text-center my-auto\">\r\n                        <span>Copyright &copy; Lunchbox 2020</span>\r\n                    </div>\r\n                </div>\r\n            </footer>\r\n            <!-- End of Footer -->\r\n\r\n        </div>\r\n        <!-- End of Content Wrapper -->\r\n\r\n    </div>\r\n</body>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n\r\n    <!-- Outer Row -->\r\n    <div class=\"row justify-content-center\">\r\n\r\n        <div class=\"col-xl-10 col-lg-12 col-md-9\">\r\n\r\n            <div class=\"card o-hidden border-0 shadow-lg my-5\">\r\n                <div class=\"card-body p-0\">\r\n                    <!-- Nested Row within Card Body -->\r\n                    <div class=\"row\">\r\n                        <div class=\"col-lg-6 d-none d-lg-block bg-login-image\"></div>\r\n                        <div class=\"col-lg-6\">\r\n                            <div class=\"p-5\">\r\n                                <div class=\"text-center mb-4\">\r\n                                    <img src=\"../../assets/img/logo-new.png\" style=\"height:150px\" />\r\n                                </div>\r\n                                <div class=\"text-center\">\r\n                                    <h1 class=\"h4 text-gray-900 mb-4\">Welcome Back!</h1>\r\n                                </div>\r\n                                <form [formGroup]=\"loginForm\" class=\"user\" (ngSubmit)=\"onSubmit()\">\r\n\r\n                                    <div class=\"form-group\">\r\n                                        <input type=\"email\" formControlName=\"username\" class=\"form-control form-control-user\" id=\"username\" aria-describedby=\"emailHelp\" placeholder=\"Enter Email Address...\">\r\n                                        <div *ngIf=\"f.username.invalid && (f.username.dirty || f.username.touched)\" class=\"alert alert-danger\">\r\n                                            <div *ngIf=\"f.username.errors.required\">\r\n                                                username is required.\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <input type=\"password\" class=\"form-control form-control-user\" id=\"password\" formControlName=\"password\" placeholder=\"Password\">\r\n                                        <div *ngIf=\"f.password.invalid && (f.password.dirty || f.password.touched)\" class=\"alert alert-danger\">\r\n                                            <div *ngIf=\"f.password.errors.required\">\r\n                                                password is required.\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n\r\n                                    <button class=\"btn btn-primary btn-user btn-block\">\r\n                                      Login\r\n                                  </button>\r\n                                    <hr>\r\n                                </form>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/nav-menu/nav-menu.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/nav-menu/nav-menu.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<header>\r\n  <nav\r\n    class=\"navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3\"\r\n  >\r\n    <div class=\"container\">\r\n      <a class=\"navbar-brand\" [routerLink]=\"['/']\">MamjiAdmin</a>\r\n      <button\r\n        class=\"navbar-toggler\"\r\n        type=\"button\"\r\n        data-toggle=\"collapse\"\r\n        data-target=\".navbar-collapse\"\r\n        aria-label=\"Toggle navigation\"\r\n        [attr.aria-expanded]=\"isExpanded\"\r\n        (click)=\"toggle()\"\r\n      >\r\n        <span class=\"navbar-toggler-icon\"></span>\r\n      </button>\r\n      <div\r\n        class=\"navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse\"\r\n        [ngClass]=\"{ show: isExpanded }\"\r\n      >\r\n        <ul class=\"navbar-nav flex-grow\">\r\n          <li\r\n            class=\"nav-item\"\r\n            [routerLinkActive]=\"['link-active']\"\r\n            [routerLinkActiveOptions]=\"{ exact: true }\"\r\n          >\r\n            <a class=\"nav-link text-dark\" [routerLink]=\"['/']\">Home</a>\r\n          </li>\r\n          <li class=\"nav-item\" [routerLinkActive]=\"['link-active']\">\r\n            <a class=\"nav-link text-dark\" [routerLink]=\"['/counter']\"\r\n              >Counter</a\r\n            >\r\n          </li>\r\n          <li class=\"nav-item\" [routerLinkActive]=\"['link-active']\">\r\n            <a class=\"nav-link text-dark\" [routerLink]=\"['/fetch-data']\"\r\n              >Fetch data</a\r\n            >\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </nav>\r\n</header>\r\n");

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/ExportExcel/excel.service.ts":
/*!******************************************!*\
  !*** ./src/ExportExcel/excel.service.ts ***!
  \******************************************/
/*! exports provided: ExcelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcelService", function() { return ExcelService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
let ExcelService = class ExcelService {
    constructor() { }
    exportAsExcelFile(json, excelFileName) {
        const worksheet = xlsx__WEBPACK_IMPORTED_MODULE_2__["utils"].json_to_sheet(json);
        console.log('worksheet', worksheet);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx__WEBPACK_IMPORTED_MODULE_2__["write"](workbook, { bookType: 'xlsx', type: 'array' });
        //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }
    saveAsExcelFile(buffer, fileName) {
        const data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        file_saver__WEBPACK_IMPORTED_MODULE_1__["saveAs"](data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
};
ExcelService.ctorParameters = () => [];
ExcelService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ExcelService);



/***/ }),

/***/ "./src/app/_directives/sortable.directive.ts":
/*!***************************************************!*\
  !*** ./src/app/_directives/sortable.directive.ts ***!
  \***************************************************/
/*! exports provided: NgbdSortableHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgbdSortableHeader", function() { return NgbdSortableHeader; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

const rotate = { 'asc': 'desc', 'desc': '', '': 'asc' };
let NgbdSortableHeader = class NgbdSortableHeader {
    constructor() {
        this.sortable = '';
        this.direction = '';
        this.sort = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    }
};
NgbdSortableHeader.propDecorators = {
    sortable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    direction: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    sort: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
};
NgbdSortableHeader = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
        selector: 'th[sortable]',
        host: {
            '[class.asc]': 'direction === "asc"',
            '[class.desc]': 'direction === "desc"',
            '(click)': 'rotate()'
        }
    })
], NgbdSortableHeader);



/***/ }),

/***/ "./src/app/_models/Dashboard.ts":
/*!**************************************!*\
  !*** ./src/app/_models/Dashboard.ts ***!
  \**************************************/
/*! exports provided: DashboardSummary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardSummary", function() { return DashboardSummary; });
class DashboardSummary {
}


/***/ }),

/***/ "./src/app/_models/Orders.ts":
/*!***********************************!*\
  !*** ./src/app/_models/Orders.ts ***!
  \***********************************/
/*! exports provided: Orders, OrderDetails, OrderDetailModifiers, OrderCheckout, CustomerOrders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Orders", function() { return Orders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDetails", function() { return OrderDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDetailModifiers", function() { return OrderDetailModifiers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderCheckout", function() { return OrderCheckout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerOrders", function() { return CustomerOrders; });
class Orders {
}
class OrderDetails {
}
class OrderDetailModifiers {
}
class OrderCheckout {
}
class CustomerOrders {
}


/***/ }),

/***/ "./src/app/_models/Report.ts":
/*!***********************************!*\
  !*** ./src/app/_models/Report.ts ***!
  \***********************************/
/*! exports provided: Report, SummaryReport, SalesdetailReport, SalesitemwiseReport, SalescustomerwiseReport, SalesuserwiseReport, SalescategorywiseReport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Report", function() { return Report; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SummaryReport", function() { return SummaryReport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesdetailReport", function() { return SalesdetailReport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesitemwiseReport", function() { return SalesitemwiseReport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalescustomerwiseReport", function() { return SalescustomerwiseReport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesuserwiseReport", function() { return SalesuserwiseReport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalescategorywiseReport", function() { return SalescategorywiseReport; });
class Report {
}
class SummaryReport {
}
class SalesdetailReport {
}
class SalesitemwiseReport {
}
class SalescustomerwiseReport {
}
class SalesuserwiseReport {
}
class SalescategorywiseReport {
}


/***/ }),

/***/ "./src/app/_services/addons.service.ts":
/*!*********************************************!*\
  !*** ./src/app/_services/addons.service.ts ***!
  \*********************************************/
/*! exports provided: AddonsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonsService", function() { return AddonsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    return data.name.toLowerCase().includes(term.toLowerCase());
}
let AddonsService = class AddonsService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    ExportList(brandId) {
        return this.http.get(`api/addons/all/${brandId}`);
    }
    getById(id, brandId) {
        return this.http.get(`api/addons/${id}/brand/${brandId}`);
    }
    getAllData(brandId) {
        const url = `api/addons/all/${brandId}`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.addons = res;
                this._data$.next(this.addons);
                this._allData$.next(this.addons);
                this._search$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this._search()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(false))).subscribe(result => {
                    this._data$.next(result.data);
                    this._total$.next(result.total);
                });
                this._search$.next();
            });
    }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    _search() {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        // 1. sort
        let sortedData = sort(this.addons, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    insert(data) {
        return this.http.post(`api/addons/insert`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/addons/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(updateData) {
        return this.http.post(`api/addons/delete`, updateData);
    }
};
AddonsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
AddonsService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], AddonsService);



/***/ }),

/***/ "./src/app/_services/appsetting.service.ts":
/*!*************************************************!*\
  !*** ./src/app/_services/appsetting.service.ts ***!
  \*************************************************/
/*! exports provided: AppsettingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppsettingService", function() { return AppsettingService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    return data.name.toLowerCase().includes(term.toLowerCase());
}
let AppsettingService = class AppsettingService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    getById(brandId) {
        return this.http.get(`api/About/brand/${brandId}`);
    }
    // getAllData(brandId) {
    //   const url = `api/category/all/${brandId}`;
    //   console.log(url);
    //   tap(() => this._loading$.next(true)),
    //     this.http.get<Category[]>(url).subscribe(res => {
    //       this.categories = res;
    //         debugger
    //       this._data$.next(this.categories);
    //       this._allData$.next(this.categories);
    //       this._search$.pipe(
    //         switchMap(() => this._search()),
    //         tap(() => this._loading$.next(false))
    //       ).subscribe(result => {
    //         // this._data$.next(result.data);
    //         this._total$.next(result.total);
    //       });
    //       this._search$.next();
    //     });
    // }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    insert(data) {
        debugger;
        return this.http.post(`api/About/insert`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/About/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(updateData) {
        return this.http.post(`api/category/delete`, updateData);
    }
};
AppsettingService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
AppsettingService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], AppsettingService);



/***/ }),

/***/ "./src/app/_services/banner.service.ts":
/*!*********************************************!*\
  !*** ./src/app/_services/banner.service.ts ***!
  \*********************************************/
/*! exports provided: BannerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerService", function() { return BannerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    debugger;
    return data.name.toLowerCase().includes(term.toLowerCase());
}
let BannerService = class BannerService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    getById(id, brandId) {
        return this.http.get(`api/banner/${id}/brand/${brandId}`);
    }
    getAllData(brandId) {
        const url = `api/banner/all/${brandId}`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.Banner = res;
                debugger;
                this._data$.next(this.Banner);
                this._allData$.next(this.Banner);
                this._search$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this._search()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(false))).subscribe(result => {
                    this._data$.next(result.data);
                    this._total$.next(result.total);
                });
                this._search$.next();
            });
    }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    _search() {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        // 1. sort
        let sortedData = sort(this.Banner, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    insert(data) {
        debugger;
        return this.http.post(`api/banner/insert`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/banner/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(updateData) {
        return this.http.post(`api/banner/delete`, updateData);
    }
};
BannerService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
BannerService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], BannerService);



/***/ }),

/***/ "./src/app/_services/brands.service.ts":
/*!*********************************************!*\
  !*** ./src/app/_services/brands.service.ts ***!
  \*********************************************/
/*! exports provided: BrandsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrandsService", function() { return BrandsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    return data.name.toLowerCase().includes(term.toLowerCase());
}
let BrandsService = class BrandsService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    getById(id, brandId) {
        return this.http.get(`api/brand/${id}`);
    }
    getAllData(brandId) {
        const url = `api/brand/all/${brandId}`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.brands = res;
                this._data$.next(this.brands);
                this._allData$.next(this.brands);
                this._search$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this._search()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(false))).subscribe(result => {
                    this._data$.next(result.data);
                    this._total$.next(result.total);
                });
                this._search$.next();
            });
    }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    _search() {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        // 1. sort
        let sortedData = sort(this.brands, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    insert(data) {
        return this.http.post(`api/brand/insert`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/brand/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(id) {
        return this.http.delete(`api/brand/delete/${id}`);
    }
};
BrandsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
BrandsService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], BrandsService);



/***/ }),

/***/ "./src/app/_services/category.service.ts":
/*!***********************************************!*\
  !*** ./src/app/_services/category.service.ts ***!
  \***********************************************/
/*! exports provided: CategoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryService", function() { return CategoryService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    return data.name.toLowerCase().includes(term.toLowerCase());
}
let CategoryService = class CategoryService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    getById(id, brandId) {
        return this.http.get(`api/category/${id}/brand/${brandId}`);
    }
    ExportList(brandId) {
        return this.http.get(`api/category/all/${brandId}`);
    }
    getAllData(brandId) {
        const url = `api/category/all/${brandId}`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.categories = res;
                this._data$.next(this.categories);
                this._allData$.next(this.categories);
                this._search$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this._search()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(false))).subscribe(result => {
                    this._data$.next(result.data);
                    this._total$.next(result.total);
                });
                this._search$.next();
            });
    }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    _search() {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        // 1. sort
        let sortedData = sort(this.categories, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    insert(data) {
        return this.http.post(`api/category/insert`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/category/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(updateData) {
        return this.http.post(`api/category/delete`, updateData);
    }
};
CategoryService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
CategoryService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], CategoryService);



/***/ }),

/***/ "./src/app/_services/customers.service.ts":
/*!************************************************!*\
  !*** ./src/app/_services/customers.service.ts ***!
  \************************************************/
/*! exports provided: CustomersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersService", function() { return CustomersService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    return data.fullName.toLowerCase().includes(term.toLowerCase());
}
let CustomersService = class CustomersService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    ExportList(brandId) {
        return this.http.get(`api/customer/all/${brandId}`);
    }
    getById(id, brandId) {
        return this.http.get(`api/customer/${id}/brand/${brandId}`);
    }
    getAllData(brandId) {
        const url = `api/customer/all/${brandId}`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.customers = res;
                this._data$.next(this.customers);
                this._allData$.next(this.customers);
                this._search$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this._search()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(false))).subscribe(result => {
                    this._data$.next(result.data);
                    this._total$.next(result.total);
                });
                this._search$.next();
            });
    }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    _search() {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        // 1. sort
        let sortedData = sort(this.customers, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    insert(data) {
        debugger;
        return this.http.post(`api/customer/insert`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/customer/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(updateData) {
        return this.http.post(`api/customer/delete`, updateData);
    }
};
CustomersService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
CustomersService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], CustomersService);



/***/ }),

/***/ "./src/app/_services/dashboard.service.ts":
/*!************************************************!*\
  !*** ./src/app/_services/dashboard.service.ts ***!
  \************************************************/
/*! exports provided: DashboadService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboadService", function() { return DashboadService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let DashboadService = class DashboadService {
    constructor(http) {
        this.http = http;
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
    }
    GetDashboard(locationID, date) {
        var today = date;
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + dd + '-' + mm;
        return this.http.get(`api/dashboard/get/${locationID}/${today}`);
    }
    GetDashboardRange(locationID, fdate, tdate) {
        return this.http.get(`api/dashboard/range/get/${locationID}/${fdate}/${tdate}`);
    }
};
DashboadService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
DashboadService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], DashboadService);



/***/ }),

/***/ "./src/app/_services/delivery.service.ts":
/*!***********************************************!*\
  !*** ./src/app/_services/delivery.service.ts ***!
  \***********************************************/
/*! exports provided: DeliveryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryService", function() { return DeliveryService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    return data.name.toLowerCase().includes(term.toLowerCase());
}
let DeliveryService = class DeliveryService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    loadBrands(brandId) {
        return this.http.get(`api/brand/all/${brandId}`);
    }
    getById(id) {
        return this.http.get(`api/delivery/${id}`);
    }
    // getBrands(brandId) {
    //   return this.http.get<Delivery[]>(`api/delivery/settings/${brandId}`);
    // }
    getAllData(brandId) {
        const url = `api/delivery/all/${brandId}`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.Delivery = res;
                this._data$.next(this.Delivery);
                this._allData$.next(this.Delivery);
                this._search$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this._search()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(false))).subscribe(result => {
                    this._data$.next(result.data);
                    this._total$.next(result.total);
                });
                this._search$.next();
            });
    }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    _search() {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        // 1. sort
        let sortedData = sort(this.Delivery, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    insert(data) {
        return this.http.post(`api/delivery/insert`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/delivery/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(updateData) {
        return this.http.post(`api/delivery/delete`, updateData);
    }
};
DeliveryService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
DeliveryService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], DeliveryService);



/***/ }),

/***/ "./src/app/_services/items.service.ts":
/*!********************************************!*\
  !*** ./src/app/_services/items.service.ts ***!
  \********************************************/
/*! exports provided: ItemsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemsService", function() { return ItemsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    return data.name.toLowerCase().includes(term.toLowerCase());
}
let ItemsService = class ItemsService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    ExportList(brandId) {
        return this.http.get(`api/item/all/${brandId}`);
    }
    loadCategories(brandId) {
        return this.http.get(`api/category/all/${brandId}`);
    }
    loadActiveCategories(brandId) {
        return this.http.get(`api/category/allActive/${brandId}`);
    }
    loadItems(brandId) {
        return this.http.get(`api/item/all/${brandId}`);
    }
    loadModifierList(brandId) {
        return this.http.get(`api/modifier/all/${brandId}`);
    }
    loadAddonList(brandId) {
        return this.http.get(`api/addons/all/${brandId}`);
    }
    getById(id, brandId) {
        return this.http.get(`api/item/${id}/brand/${brandId}`);
    }
    getTodaysItems(brandId) {
        return this.http.get(`api/item/settings/${brandId}`);
    }
    getAllData(brandId) {
        const url = `api/item/all/${brandId}`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.items = res;
                this._data$.next(this.items);
                this._allData$.next(this.items);
                this._search$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this._search()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(false))).subscribe(result => {
                    this._data$.next(result.data);
                    this._total$.next(result.total);
                });
                this._search$.next();
            });
    }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    _search() {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        // 1. sort
        let sortedData = sort(this.items, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    insert(data) {
        return this.http.post(`api/item/insert`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/item/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    updateSettings(updateData) {
        return this.http.post(`api/item/update/settings`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(updateData) {
        return this.http.post(`api/item/delete`, updateData);
    }
};
ItemsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
ItemsService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], ItemsService);



/***/ }),

/***/ "./src/app/_services/local-storage.service.ts":
/*!****************************************************!*\
  !*** ./src/app/_services/local-storage.service.ts ***!
  \****************************************************/
/*! exports provided: LocalStorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStorageService", function() { return LocalStorageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let LocalStorageService = class LocalStorageService {
    constructor() {
    }
    setSelectedBrand(brand) {
        sessionStorage.setItem('_autheticatedUser', JSON.stringify(brand));
    }
    setSelectedLocation(location) {
        sessionStorage.setItem('selectedLocation', JSON.stringify(location));
    }
    getSelectedLocation() {
        return JSON.parse(sessionStorage.getItem('selectedLocation'));
    }
    setLocation(location) {
        sessionStorage.setItem('_Locations', JSON.stringify(location));
    }
    getLocation() {
        return JSON.parse(sessionStorage.getItem('_Locations'));
    }
    getSelectedBrand() {
        return JSON.parse(sessionStorage.getItem('_autheticatedUser'));
    }
    getSelectedUser() {
        let userInfo = JSON.parse(sessionStorage.getItem("currentUser"));
        if (userInfo !== null) {
            userInfo = JSON.parse(userInfo.data);
            return userInfo;
        }
    }
};
LocalStorageService.ctorParameters = () => [];
LocalStorageService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], LocalStorageService);



/***/ }),

/***/ "./src/app/_services/locations.service.ts":
/*!************************************************!*\
  !*** ./src/app/_services/locations.service.ts ***!
  \************************************************/
/*! exports provided: LocationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationsService", function() { return LocationsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    return data.name.toLowerCase().includes(term.toLowerCase());
}
let LocationsService = class LocationsService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    getById(id, brandId) {
        return this.http.get(`api/location/${id}/brand/${brandId}`);
    }
    getAllLocations(brandId) {
        return this.http.get(`api/location/all/${brandId}`);
    }
    getAllData(brandId) {
        const url = `api/location/all/${brandId}`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.locations = res;
                this._data$.next(this.locations);
                this._allData$.next(this.locations);
                this._search$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this._search()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(false))).subscribe(result => {
                    this._data$.next(result.data);
                    this._total$.next(result.total);
                });
                this._search$.next();
            });
    }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    _search() {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        // 1. sort
        let sortedData = sort(this.locations, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    insert(data) {
        debugger;
        return this.http.post(`api/location/insertlocation`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        debugger;
        return this.http.post(`api/location/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(updateData) {
        return this.http.post(`api/location/delete`, updateData);
    }
};
LocationsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
LocationsService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], LocationsService);



/***/ }),

/***/ "./src/app/_services/login.service.ts":
/*!********************************************!*\
  !*** ./src/app/_services/login.service.ts ***!
  \********************************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let LoginService = class LoginService {
    constructor(http) {
        this.http = http;
        this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](JSON.parse(sessionStorage.getItem('_autheticatedUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }
    login(username, password) {
        debugger;
        return this.http.get(`api/login/authenticate/${username}/${password}`);
    }
    getAllLocations(brandId) {
        return this.http.get(`api/location/all/${brandId}`);
    }
};
LoginService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
LoginService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], LoginService);



/***/ }),

/***/ "./src/app/_services/modifiers.service.ts":
/*!************************************************!*\
  !*** ./src/app/_services/modifiers.service.ts ***!
  \************************************************/
/*! exports provided: ModifiersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifiersService", function() { return ModifiersService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    return data.name.toLowerCase().includes(term.toLowerCase());
}
let ModifiersService = class ModifiersService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    ExportList(brandId) {
        return this.http.get(`api/modifier/all/${brandId}`);
    }
    getById(id, brandId) {
        return this.http.get(`api/modifier/${id}/brand/${brandId}`);
    }
    getAllData(brandId) {
        const url = `api/modifier/all/${brandId}`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.modifiers = res;
                this._data$.next(this.modifiers);
                this._allData$.next(this.modifiers);
                this._search$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this._search()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(false))).subscribe(result => {
                    this._data$.next(result.data);
                    this._total$.next(result.total);
                });
                this._search$.next();
            });
    }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    _search() {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        // 1. sort
        let sortedData = sort(this.modifiers, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    insert(data) {
        return this.http.post(`api/modifier/insert`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/modifier/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(updateData) {
        return this.http.post(`api/modifier/delete`, updateData);
    }
};
ModifiersService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
ModifiersService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], ModifiersService);



/***/ }),

/***/ "./src/app/_services/offers.service.ts":
/*!*********************************************!*\
  !*** ./src/app/_services/offers.service.ts ***!
  \*********************************************/
/*! exports provided: OffersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OffersService", function() { return OffersService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    debugger;
    return data.fullName.toLowerCase().includes(term.toLowerCase());
}
let OffersService = class OffersService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    getById(id, brandId) {
        return this.http.get(`api/offers/${id}/brand/${brandId}`);
    }
    getAllData(brandId) {
        const url = `api/offers/all/${brandId}`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.offerss = res;
                this._data$.next(this.offerss);
                this._allData$.next(this.offerss);
                this._search$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this._search()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(false))).subscribe(result => {
                    this._data$.next(result.data);
                    this._total$.next(result.total);
                });
                this._search$.next();
            });
    }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    _search() {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        // 1. sort
        let sortedData = sort(this.offerss, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    insert(data) {
        debugger;
        return this.http.post(`api/offers/insert`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/offers/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(updateData) {
        return this.http.post(`api/offers/delete`, updateData);
    }
};
OffersService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
OffersService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], OffersService);



/***/ }),

/***/ "./src/app/_services/orders.service.ts":
/*!*********************************************!*\
  !*** ./src/app/_services/orders.service.ts ***!
  \*********************************************/
/*! exports provided: OrdersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersService", function() { return OrdersService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    return data.orderNo.toLowerCase().includes(term.toLowerCase());
}
let OrdersService = class OrdersService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    loadLocations(brandId) {
        return this.http.get(`api/location/all/${brandId}`);
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    getById(id, brandId) {
        return this.http.get(`api/orders/${id}/brand/${brandId}`);
    }
    printorder(id, brandId) {
        return this.http.get(`api/orders/print/${id}`);
    }
    getAllData(brandID, locationID, fromDate, toDate) {
        const url = `api/orders/all/${brandID}/${locationID}/0/${fromDate}/${toDate}`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.orders = res;
                this._data$.next(this.orders);
                this._allData$.next(this.orders);
                this._search$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this._search()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(false))).subscribe(result => {
                    this._data$.next(result.data);
                    this._total$.next(result.total);
                });
                this._search$.next();
            });
    }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    _search() {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        // 1. sort
        let sortedData = sort(this.orders, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    update(updateData) {
        return this.http.post(`api/orders/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
};
OrdersService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
OrdersService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], OrdersService);



/***/ }),

/***/ "./src/app/_services/report.service.ts":
/*!*********************************************!*\
  !*** ./src/app/_services/report.service.ts ***!
  \*********************************************/
/*! exports provided: ReportService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportService", function() { return ReportService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(data, column, direction) {
    if (direction === '' || column === '') {
        return data;
    }
    else {
        return [...data].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(data, term) {
    return data.categoryName.toLowerCase().includes(term.toLowerCase());
}
let ReportService = class ReportService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._total$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page) { this._set({ page }); }
    set pageSize(pageSize) { this._set({ pageSize }); }
    set searchTerm(searchTerm) { this._set({ searchTerm }); }
    set sortColumn(sortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection) { this._set({ sortDirection }); }
    get data$() {
        debugger;
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    _set(patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    }
    _search() {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        // 1. sort
        let sortedData = sort(this.salescategorywiseReport, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
        // clear by calling subject.next() without parameters
        this._search$.next();
        this._data$.next(null);
        this._allData$.next(null);
        this._total$.next(null);
        this._loading$.next(null);
        this._state = {
            page: 1,
            pageSize: 10,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
    }
    SalesSummaryRpt(brandID, fromDate, toDate) {
        return this.http.get(`api/report/summary/${brandID}/${fromDate}/${toDate}`);
    }
    SalesDetailRpt(brandID, locationID, fromDate, toDate) {
        return this.http.get(`api/report/salesdetail/${brandID}/${locationID}/${fromDate}/${toDate}`);
    }
    SalesItemwiseRpt(brandID, locationID, fromDate, toDate) {
        return this.http.get(`api/report/salesitemwise/${brandID}/${locationID}/${fromDate}/${toDate}`);
    }
    SalesCategorywiseRpt(brandID, locationID, fromDate, toDate) {
        return this.http.get(`api/report/salescategorywise/${brandID}/${locationID}/${fromDate}/${toDate}`);
    }
    SalesCustomerwiseRpt(brandID, locationID, customerID, fromDate, toDate) {
        return this.http.get(`api/report/salescustomerwise/${brandID}/${locationID}/${customerID}/${fromDate}/${toDate}`);
    }
    SalesUserwiseRpt(brandID, locationID, fromDate, toDate) {
        return this.http.get(`api/report/salesuserwise/${brandID}/${locationID}/${fromDate}/${toDate}`);
    }
    loadLocations(brandId) {
        return this.http.get(`api/location/all/${brandId}`);
    }
};
ReportService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
ReportService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], ReportService);



/***/ }),

/***/ "./src/app/_services/toastservice.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/toastservice.ts ***!
  \*******************************************/
/*! exports provided: ToastService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToastService", function() { return ToastService; });
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/__ivy_ngcc__/fesm2015/ngx-toastr.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ToastService = class ToastService {
    constructor(toastr) {
        this.toastr = toastr;
    }
    showSuccess(_title, _message) {
        this.toastr.success(_title, _message, {
            timeOut: 3000,
        });
    }
    showError(_title, _message) {
        this.toastr.error(_title, _message, {
            timeOut: 3000,
        });
    }
    showWarning(_title, _message) {
        this.toastr.warning(_title, _message, {
            timeOut: 3000,
        });
    }
};
ToastService.ctorParameters = () => [
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_0__["ToastrService"] }
];
ToastService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [ngx_toastr__WEBPACK_IMPORTED_MODULE_0__["ToastrService"]])
], ToastService);



/***/ }),

/***/ "./src/app/admin/company/brands/addbrand/addbrand.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/admin/company/brands/addbrand/addbrand.component.css ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2NvbXBhbnkvYnJhbmRzL2FkZGJyYW5kL2FkZGJyYW5kLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/company/brands/addbrand/addbrand.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/admin/company/brands/addbrand/addbrand.component.ts ***!
  \*********************************************************************/
/*! exports provided: AddbrandComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddbrandComponent", function() { return AddbrandComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_brands_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/brands.service */ "./src/app/_services/brands.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let AddbrandComponent = class AddbrandComponent {
    constructor(formBuilder, router, route, ls, ts, brandService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.brandService = brandService;
        this.submitted = false;
        this.loading = false;
        this.loadingBrand = false;
        this.ButtonText = "Save";
        this.imageBgUrl = "";
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedBrand();
    }
    get f() { return this.brandForm.controls; }
    createForm() {
        this.brandForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: [''],
            password: [''],
            address: [''],
            companyURl: [''],
            currency: [''],
            statusID: [true],
            displayOrder: [0],
            brandID: 0,
            image: [''],
            locationID: null
        });
    }
    editForm(obj) {
        this.f.name.setValue(obj.name);
        this.f.email.setValue(obj.email);
        this.f.password.setValue(obj.password);
        this.f.brandID.setValue(obj.brandID);
        this.f.image.setValue(obj.image);
        this.f.address.setValue(obj.address);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.f.companyURl.setValue(obj.companyURl);
        this.imageBgUrl = obj.imageUrl;
        this.imgComp.imageUrl = obj.image;
    }
    setSelectedBrand() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingBrand = true;
                this.f.brandID.setValue(sid);
                this.brandService.getById(sid, this.f.brandID.value).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingBrand = false;
                });
            }
        });
    }
    onSubmit() {
        debugger;
        this.brandForm.markAllAsTouched();
        this.submitted = true;
        if (this.brandForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.image.setValue(this.imgComp.imageUrl);
        if (parseInt(this.f.brandID.value) === 0) {
            //Insert brand
            console.log(JSON.stringify(this.brandForm.value));
            this.brandService.insert(this.brandForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/brand']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update brand
            this.brandService.update(this.brandForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/brand']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
    selectFile(event) {
        this.fileData = event.target.files[0];
        if (this.fileData.type == 'image/jpeg' || this.fileData.type == 'image/jpeg' || this.fileData.type == 'image/jpg') {
            debugger;
            const reader = new FileReader();
            reader.readAsDataURL(this.fileData);
            reader.onload = () => {
                debugger;
                this.imageBgUrl = reader.result;
                this.f.companyURl.setValue(this.imageBgUrl);
            };
        }
        else {
            alert("file type should be image");
            return;
        }
    }
};
AddbrandComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: src_app_services_brands_service__WEBPACK_IMPORTED_MODULE_6__["BrandsService"] }
];
AddbrandComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddbrandComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addbrand',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addbrand.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/company/brands/addbrand/addbrand.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./addbrand.component.css */ "./src/app/admin/company/brands/addbrand/addbrand.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        src_app_services_brands_service__WEBPACK_IMPORTED_MODULE_6__["BrandsService"]])
], AddbrandComponent);



/***/ }),

/***/ "./src/app/admin/company/brands/brands.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/admin/company/brands/brands.component.ts ***!
  \**********************************************************/
/*! exports provided: BrandComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrandComponent", function() { return BrandComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_brands_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/brands.service */ "./src/app/_services/brands.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let BrandComponent = class BrandComponent {
    constructor(service, ls, ts, router) {
        this.service = service;
        this.ls = ls;
        this.ts = ts;
        this.router = router;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.service.getAllData(this.selectedBrand);
        this.data$ = this.service.data$;
        this.total$ = this.service.total$;
        this.loading$ = this.service.loading$;
    }
    onSort({ column, direction }) {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }
    Edit(brand) {
        this.router.navigate(["admin/brand/edit", brand]);
    }
    Delete(id) {
        this.service.delete(parseInt(id)).subscribe((res) => {
            if (res != 0) {
                this.ts.showSuccess("Success", "Record deleted successfully.");
                this.getData();
            }
            else
                this.ts.showError("Error", "Failed to delete record.");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    Deactive(id, rowVersion) {
        //   this.service.deactive(parseInt(id), rowVersion).subscribe((res: any) => {
        //     this.alertService.success("Brand has been Deactived");
        //     this.getBrandData();
        //   }, error => {
        //     this.alertService.error(error);
        //   });
    }
};
BrandComponent.ctorParameters = () => [
    { type: src_app_services_brands_service__WEBPACK_IMPORTED_MODULE_4__["BrandsService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
BrandComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
BrandComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-brand',
        template: __importDefault(__webpack_require__(/*! raw-loader!./brands.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/company/brands/brands.component.html")).default,
        providers: []
    }),
    __metadata("design:paramtypes", [src_app_services_brands_service__WEBPACK_IMPORTED_MODULE_4__["BrandsService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], BrandComponent);



/***/ }),

/***/ "./src/app/admin/company/locations/addlocation/addlocation.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/company/locations/addlocation/addlocation.component.css ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2NvbXBhbnkvbG9jYXRpb25zL2FkZGxvY2F0aW9uL2FkZGxvY2F0aW9uLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/company/locations/addlocation/addlocation.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/company/locations/addlocation/addlocation.component.ts ***!
  \******************************************************************************/
/*! exports provided: AddlocationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddlocationComponent", function() { return AddlocationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_locations_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/locations.service */ "./src/app/_services/locations.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let AddlocationComponent = class AddlocationComponent {
    constructor(formBuilder, router, route, ls, ts, locationService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.locationService = locationService;
        this.submitted = false;
        this.loading = false;
        this.loadingLocations = false;
        this.ButtonText = "Save";
        this.opentime = { hour: new Date().getHours(), minute: new Date().getMinutes() };
        this.closetime = { hour: new Date().getHours(), minute: new Date().getMinutes() };
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedLocations();
    }
    get f() { return this.locationForm.controls; }
    createForm() {
        debugger;
        this.locationForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: [''],
            address: [''],
            deliveryServices: [false],
            deliveryCharges: [0],
            tax: [0],
            discounts: [0],
            minOrderAmount: [0],
            contactNo: [''],
            password: [''],
            currency: [''],
            latitude: [''],
            longitude: [''],
            description: [''],
            passcode: [''],
            statusID: [true],
            locationID: 0,
            opentime: [''],
            closetime: [''],
            brandID: this.ls.getSelectedBrand().brandID,
            isPickupAllowed: [true],
            isDeliveryAllowed: [true]
        });
    }
    editForm(obj) {
        debugger;
        this.f.name.setValue(obj.name);
        this.f.email.setValue(obj.email);
        this.f.contactNo.setValue(obj.contactNo);
        this.f.minOrderAmount.setValue(obj.minOrderAmount);
        this.f.deliveryCharges.setValue(obj.deliveryCharges);
        this.f.tax.setValue(obj.tax);
        this.f.discounts.setValue(obj.discounts);
        this.f.address.setValue(obj.address);
        // this.f.password.setValue(obj.password);
        this.f.currency.setValue(obj.currency);
        this.f.latitude.setValue(obj.latitude);
        this.f.longitude.setValue(obj.longitude);
        this.f.description.setValue(obj.description);
        this.f.passcode.setValue(obj.passcode);
        this.f.locationID.setValue(obj.locationID);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.f.opentime.setValue(obj.opentime);
        this.f.closetime.setValue(obj.closetime);
        this.f.isPickupAllowed.setValue(obj.isPickupAllowed === 1 ? true : false);
        this.f.isDeliveryAllowed.setValue(obj.isDeliveryAllowed === 1 ? true : false);
        //this.opentime.hour = new Date("01/01/1900 " + obj.opentime).getHours();
        //this.opentime.minute = new Date("01/01/1900 " + obj.opentime).getMinutes();
        //this.closetime.hour = new Date("01/01/1900 " + obj.closetime).getHours();
        //this.closetime.minute = new Date("01/01/1900 " + obj.closetime).getMinutes();
        this.opentime = { hour: new Date("1/1/1900 " + obj.opentime).getHours(), minute: new Date("1/1/1900 " + obj.opentime).getMinutes() };
        this.closetime = { hour: new Date("1/1/1900 " + obj.closetime).getHours(), minute: new Date("1/1/1900 " + obj.closetime).getMinutes() };
    }
    setSelectedLocations() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingLocations = true;
                this.f.locationID.setValue(sid);
                this.locationService.getById(sid, this.f.brandID.value).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingLocations = false;
                });
            }
        });
    }
    onSubmit() {
        debugger;
        this.locationForm.markAllAsTouched();
        this.submitted = true;
        this.f.opentime.setValue(this.opentime.hour + ":" + this.opentime.minute);
        this.f.closetime.setValue(this.closetime.hour + ":" + this.closetime.minute);
        if (this.locationForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.isPickupAllowed.setValue(this.f.isPickupAllowed.value === true ? 1 : 2);
        this.f.isDeliveryAllowed.setValue(this.f.isDeliveryAllowed.value === true ? 1 : 2);
        if (parseInt(this.f.locationID.value) === 0) {
            //Insert location
            this.locationService.insert(this.locationForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/location']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update location
            this.locationService.update(this.locationForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/location']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AddlocationComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: src_app_services_locations_service__WEBPACK_IMPORTED_MODULE_4__["LocationsService"] }
];
AddlocationComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addlocation',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addlocation.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/company/locations/addlocation/addlocation.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./addlocation.component.css */ "./src/app/admin/company/locations/addlocation/addlocation.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        src_app_services_locations_service__WEBPACK_IMPORTED_MODULE_4__["LocationsService"]])
], AddlocationComponent);



/***/ }),

/***/ "./src/app/admin/company/locations/locations.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/admin/company/locations/locations.component.ts ***!
  \****************************************************************/
/*! exports provided: LocationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationsComponent", function() { return LocationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_locations_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/locations.service */ "./src/app/_services/locations.service.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let LocationsComponent = class LocationsComponent {
    constructor(service, ls, ts, router) {
        this.service = service;
        this.ls = ls;
        this.ts = ts;
        this.router = router;
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.service.getAllData(this.selectedBrand);
        this.data$ = this.service.data$;
        this.total$ = this.service.total$;
        this.loading$ = this.service.loading$;
    }
    onSort({ column, direction }) {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }
    Edit(locations) {
        this.router.navigate(["admin/location/edit", locations]);
    }
    Delete(obj) {
        this.service.delete(obj).subscribe((res) => {
            if (res != 0) {
                this.ts.showSuccess("Success", "Record deleted successfully.");
                this.getData();
            }
            else
                this.ts.showError("Error", "Failed to delete record.");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    Deactive(id, rowVersion) {
        //   this.service.deactive(parseInt(id), rowVersion).subscribe((res: any) => {
        //     this.alertService.success("Locations has been Deactived");
        //     this.getBrandData();
        //   }, error => {
        //     this.alertService.error(error);
        //   });
    }
};
LocationsComponent.ctorParameters = () => [
    { type: src_app_services_locations_service__WEBPACK_IMPORTED_MODULE_2__["LocationsService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
LocationsComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
LocationsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-locations',
        template: __importDefault(__webpack_require__(/*! raw-loader!./locations.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/company/locations/locations.component.html")).default,
        providers: []
    }),
    __metadata("design:paramtypes", [src_app_services_locations_service__WEBPACK_IMPORTED_MODULE_2__["LocationsService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], LocationsComponent);



/***/ }),

/***/ "./src/app/admin/customer/customers/addcustomers/addcustomer.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/admin/customer/customers/addcustomers/addcustomer.component.css ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2N1c3RvbWVyL2N1c3RvbWVycy9hZGRjdXN0b21lcnMvYWRkY3VzdG9tZXIuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/admin/customer/customers/addcustomers/addcustomer.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/admin/customer/customers/addcustomers/addcustomer.component.ts ***!
  \********************************************************************************/
/*! exports provided: AddcustomerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddcustomerComponent", function() { return AddcustomerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_customers_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/customers.service */ "./src/app/_services/customers.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let AddcustomerComponent = class AddcustomerComponent {
    constructor(formBuilder, router, route, ls, ts, customerService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.customerService = customerService;
        this.submitted = false;
        this.loading = false;
        this.loadingCustomer = false;
        this.ButtonText = "Save";
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedCustomer();
    }
    get f() { return this.customerForm.controls; }
    createForm() {
        this.customerForm = this.formBuilder.group({
            fullName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            statusID: [true],
            mobile: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            customerID: 0,
            image: [''],
            brandID: this.ls.getSelectedBrand().brandID,
            locationID: null
        });
    }
    editForm(obj) {
        this.f.fullName.setValue(obj.fullName);
        this.f.email.setValue(obj.email);
        this.f.password.setValue(obj.password);
        this.f.mobile.setValue(obj.mobile);
        this.f.customerID.setValue(obj.customerID);
        this.f.image.setValue(obj.image);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.imgComp.imageUrl = obj.image;
    }
    setSelectedCustomer() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingCustomer = true;
                this.f.customerID.setValue(sid);
                this.customerService.getById(sid, this.f.brandID.value).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingCustomer = false;
                });
            }
        });
    }
    onSubmit() {
        debugger;
        this.customerForm.markAllAsTouched();
        this.submitted = true;
        if (this.customerForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.image.setValue(this.imgComp.imageUrl);
        if (parseInt(this.f.customerID.value) === 0) {
            //Insert customer
            console.log(JSON.stringify(this.customerForm.value));
            this.customerService.insert(this.customerForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/customer']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update customer
            this.customerService.update(this.customerForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/customer']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AddcustomerComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_customers_service__WEBPACK_IMPORTED_MODULE_5__["CustomersService"] }
];
AddcustomerComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddcustomerComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addcustomer',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addcustomer.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/customer/customers/addcustomers/addcustomer.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./addcustomer.component.css */ "./src/app/admin/customer/customers/addcustomers/addcustomer.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_customers_service__WEBPACK_IMPORTED_MODULE_5__["CustomersService"]])
], AddcustomerComponent);



/***/ }),

/***/ "./src/app/admin/customer/customers/customers.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/customer/customers/customers.component.ts ***!
  \*****************************************************************/
/*! exports provided: CustomersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersComponent", function() { return CustomersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_customers_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/customers.service */ "./src/app/_services/customers.service.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let CustomersComponent = class CustomersComponent {
    constructor(service, ls, excelService, ts, router) {
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    exportAsXLSX() {
        this.service.ExportList(this.selectedBrand).subscribe((res) => {
            this.excelService.exportAsExcelFile(res, 'Report_Export');
        }, error => {
            this.ts.showError("Error", "Failed to export");
        });
    }
    getData() {
        this.service.getAllData(this.selectedBrand);
        this.data$ = this.service.data$;
        this.total$ = this.service.total$;
        this.loading$ = this.service.loading$;
    }
    onSort({ column, direction }) {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }
    Edit(customers) {
        this.router.navigate(["admin/customer/edit", customers]);
    }
    Delete(obj) {
        this.service.delete(obj).subscribe((res) => {
            if (res != 0) {
                this.ts.showSuccess("Success", "Record deleted successfully.");
                this.getData();
            }
            else
                this.ts.showError("Error", "Failed to delete record.");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    Deactive(id, rowVersion) {
        //   this.service.deactive(parseInt(id), rowVersion).subscribe((res: any) => {
        //     this.alertService.success("Customers has been Deactived");
        //     this.getBrandData();
        //   }, error => {
        //     this.alertService.error(error);
        //   });
    }
};
CustomersComponent.ctorParameters = () => [
    { type: src_app_services_customers_service__WEBPACK_IMPORTED_MODULE_2__["CustomersService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
CustomersComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
CustomersComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-customers',
        template: __importDefault(__webpack_require__(/*! raw-loader!./customers.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/customer/customers/customers.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_customers_service__WEBPACK_IMPORTED_MODULE_2__["CustomersService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], CustomersComponent);



/***/ }),

/***/ "./src/app/admin/dashboard/dashboard.component.css":
/*!*********************************************************!*\
  !*** ./src/app/admin/dashboard/dashboard.component.css ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".card-body{\r\n    padding: 20px;\r\n}\r\n\r\n  .advanced-pie-legend-wrapper{display: none !important;}\r\n\r\n  .dashboard-labels{\r\n      font-size: 13px;\r\n  }\r\n\r\n  ngx-charts-advanced-pie-chart:first-child{\r\nheight:200px ;\r\n  }\r\n\r\n  .content-wrapper-padding{\r\n    padding-top: 4rem;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtBQUNqQjs7RUFFRSw2QkFBNkIsd0JBQXdCLENBQUM7O0VBRXREO01BQ0ksZUFBZTtFQUNuQjs7RUFDQTtBQUNGLGFBQWE7RUFDWDs7RUFFQTtJQUNFLGlCQUFpQjtBQUNyQiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJkLWJvZHl7XHJcbiAgICBwYWRkaW5nOiAyMHB4O1xyXG59XHJcblxyXG4gIC5hZHZhbmNlZC1waWUtbGVnZW5kLXdyYXBwZXJ7ZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O31cclxuXHJcbiAgLmRhc2hib2FyZC1sYWJlbHN7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICB9XHJcbiAgbmd4LWNoYXJ0cy1hZHZhbmNlZC1waWUtY2hhcnQ6Zmlyc3QtY2hpbGR7XHJcbmhlaWdodDoyMDBweCA7XHJcbiAgfVxyXG5cclxuICAuY29udGVudC13cmFwcGVyLXBhZGRpbmd7XHJcbiAgICBwYWRkaW5nLXRvcDogNHJlbTtcclxufSJdfQ== */");

/***/ }),

/***/ "./src/app/admin/dashboard/dashboard.component.ts":
/*!********************************************************!*\
  !*** ./src/app/admin/dashboard/dashboard.component.ts ***!
  \********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-apexcharts */ "./node_modules/ng-apexcharts/__ivy_ngcc__/fesm2015/ng-apexcharts.js");
/* harmony import */ var src_app_services_dashboard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/dashboard.service */ "./src/app/_services/dashboard.service.ts");
/* harmony import */ var src_app_models_Dashboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_models/Dashboard */ "./src/app/_models/Dashboard.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/datepicker-range/datepicker-range-popup */ "./src/app/datepicker-range/datepicker-range-popup.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






const now = new Date();
let DashboardComponent = class DashboardComponent {
    constructor(service, ls) {
        this.service = service;
        this.ls = ls;
        this.selectedLocations = [];
        this.dashboardSummary = new src_app_models_Dashboard__WEBPACK_IMPORTED_MODULE_3__["DashboardSummary"]();
    }
    ngOnInit() {
        // const date: NgbDate = new NgbDate(now.getFullYear(), now.getMonth() + 1, 1);   
        // this._datepicker.fromDate=date;
        this.GetDataDashboard();
    }
    BindTodaysSales(sales, timeSlot) {
        this.chartOptions = {
            series: [
                {
                    name: "Sales",
                    data: sales
                }
            ],
            chart: {
                height: 300,
                type: "bar"
            },
            title: {
                text: ""
            },
            xaxis: {
                categories: timeSlot
            }
        };
    }
    BindMAEN(maen) {
        this.chartOptionsDonut = {
            series: [maen.morning, maen.afterNoon, maen.evening, maen.night],
            chart: {
                type: "donut"
            },
            labels: ["Morning", "Evening", "Afternoon", "Night"],
            responsive: [
                {
                    breakpoint: 250,
                    options: {
                        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
                        chart: {
                            width: 100
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        };
    }
    GetDashboard() {
        // this.service.GetDashboard(this.ls.getSelectedLocation().locationID,new Date()).subscribe((res: any) => {
        //   this.dashboardSummary = res.summarysales;
        //   this.BindTodaysSales(res.todaysales.sales, res.todaysales.timeSlot);
        //   this.BindMAEN(res.maensales);
        // }, error => {
        // });
    }
    GetDataDashboard() {
        // this.service.GetDashboardRange(this.ls.getSelectedLocation().locationID,this.parseDate(this._datepicker.fromDate),this.parseDate(this._datepicker.toDate)).subscribe((res: any) => {
        //   this.dashboardSummary = res.summarysales;
        //   this.BindTodaysSales(res.todaysales.sales, res.todaysales.timeSlot);
        //   this.BindMAEN(res.maensales);
        // }, error => {
        // });
    }
    parseDate(obj) {
        return obj.year + "-" + obj.month + "-" + obj.day;
        ;
    }
};
DashboardComponent.ctorParameters = () => [
    { type: src_app_services_dashboard_service__WEBPACK_IMPORTED_MODULE_2__["DashboadService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] }
];
DashboardComponent.propDecorators = {
    chart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ["chart",] }],
    _datepicker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_5__["NgbdDatepickerRangePopup"], { static: true },] }]
};
DashboardComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-dashboard',
        template: __importDefault(__webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/dashboard/dashboard.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./dashboard.component.css */ "./src/app/admin/dashboard/dashboard.component.css")).default]
    }),
    __metadata("design:paramtypes", [src_app_services_dashboard_service__WEBPACK_IMPORTED_MODULE_2__["DashboadService"], src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"]])
], DashboardComponent);



/***/ }),

/***/ "./src/app/admin/laboratory/uploadreport/uploadreport.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/admin/laboratory/uploadreport/uploadreport.component.css ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2xhYm9yYXRvcnkvdXBsb2FkcmVwb3J0L3VwbG9hZHJlcG9ydC5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/admin/laboratory/uploadreport/uploadreport.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/admin/laboratory/uploadreport/uploadreport.component.ts ***!
  \*************************************************************************/
/*! exports provided: UploadreportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadreportComponent", function() { return UploadreportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let UploadreportComponent = class UploadreportComponent {
    constructor() { }
    ngOnInit() {
    }
};
UploadreportComponent.ctorParameters = () => [];
UploadreportComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-uploadreport',
        template: __importDefault(__webpack_require__(/*! raw-loader!./uploadreport.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/laboratory/uploadreport/uploadreport.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./uploadreport.component.css */ "./src/app/admin/laboratory/uploadreport/uploadreport.component.css")).default]
    }),
    __metadata("design:paramtypes", [])
], UploadreportComponent);



/***/ }),

/***/ "./src/app/admin/managedoctor/doctor/doctor.component.css":
/*!****************************************************************!*\
  !*** ./src/app/admin/managedoctor/doctor/doctor.component.css ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL21hbmFnZWRvY3Rvci9kb2N0b3IvZG9jdG9yLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/managedoctor/doctor/doctor.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/managedoctor/doctor/doctor.component.ts ***!
  \***************************************************************/
/*! exports provided: DoctorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoctorComponent", function() { return DoctorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let DoctorComponent = class DoctorComponent {
    constructor() { }
    ngOnInit() {
    }
};
DoctorComponent.ctorParameters = () => [];
DoctorComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-doctor',
        template: __importDefault(__webpack_require__(/*! raw-loader!./doctor.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/managedoctor/doctor/doctor.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./doctor.component.css */ "./src/app/admin/managedoctor/doctor/doctor.component.css")).default]
    }),
    __metadata("design:paramtypes", [])
], DoctorComponent);



/***/ }),

/***/ "./src/app/admin/menu/addons/addaddons/addaddons.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/admin/menu/addons/addaddons/addaddons.component.css ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL21lbnUvYWRkb25zL2FkZGFkZG9ucy9hZGRhZGRvbnMuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/admin/menu/addons/addaddons/addaddons.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/admin/menu/addons/addaddons/addaddons.component.ts ***!
  \********************************************************************/
/*! exports provided: AddaddonsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddaddonsComponent", function() { return AddaddonsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_addons_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/addons.service */ "./src/app/_services/addons.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let AddaddonsComponent = class AddaddonsComponent {
    constructor(formBuilder, router, route, ts, ls, addonsService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ts = ts;
        this.ls = ls;
        this.addonsService = addonsService;
        this.submitted = false;
        this.loading = false;
        this.loadingaddon = false;
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedaddon();
    }
    get f() { return this.addonForm.controls; }
    createForm() {
        this.addonForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            arabicName: [''],
            description: [''],
            statusID: [true],
            displayOrder: [0],
            price: [0],
            addonID: 0,
            image: [''],
            brandID: this.ls.getSelectedBrand().brandID,
            locationID: null
        });
    }
    editForm(obj) {
        this.f.name.setValue(obj.name);
        this.f.arabicName.setValue(obj.arabicName);
        this.f.displayOrder.setValue(obj.displayOrder);
        this.f.price.setValue(obj.price);
        this.f.addonID.setValue(obj.addonID);
        this.f.image.setValue(obj.image);
        this.f.description.setValue(obj.description);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.imgComp.imageUrl = obj.image;
    }
    setSelectedaddon() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingaddon = true;
                this.f.addonID.setValue(sid);
                this.addonsService.getById(sid, this.f.brandID.value).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingaddon = false;
                });
            }
        });
    }
    onSubmit() {
        this.addonForm.markAllAsTouched();
        this.submitted = true;
        if (this.addonForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.image.setValue(this.imgComp.imageUrl);
        if (parseInt(this.f.addonID.value) === 0) {
            //Insert modifier
            console.log(JSON.stringify(this.addonForm.value));
            this.addonsService.insert(this.addonForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/addons']);
                }
                // this.alertService.success("Item has been created");
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update modifier
            this.addonsService.update(this.addonForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/addons']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AddaddonsComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_addons_service__WEBPACK_IMPORTED_MODULE_5__["AddonsService"] }
];
AddaddonsComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddaddonsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addaddons',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addaddons.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/addons/addaddons/addaddons.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./addaddons.component.css */ "./src/app/admin/menu/addons/addaddons/addaddons.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_addons_service__WEBPACK_IMPORTED_MODULE_5__["AddonsService"]])
], AddaddonsComponent);



/***/ }),

/***/ "./src/app/admin/menu/addons/addons.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/admin/menu/addons/addons.component.ts ***!
  \*******************************************************/
/*! exports provided: AddonsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonsComponent", function() { return AddonsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_addons_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/addons.service */ "./src/app/_services/addons.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let AddonsComponent = class AddonsComponent {
    constructor(service, ls, excelService, ts, router) {
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    exportAsXLSX() {
        this.service.ExportList(this.selectedBrand).subscribe((res) => {
            this.excelService.exportAsExcelFile(res, 'Report_Export');
        }, error => {
            this.ts.showError("Error", "Failed to export");
        });
    }
    getData() {
        this.service.getAllData(this.selectedBrand);
        this.data$ = this.service.data$;
        this.total$ = this.service.total$;
        this.loading$ = this.service.loading$;
    }
    onSort({ column, direction }) {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }
    Edit(addons) {
        this.router.navigate(["admin/addons/edit", addons]);
    }
    Delete(obj) {
        this.service.delete(obj).subscribe((res) => {
            if (res != 0) {
                this.ts.showSuccess("Success", "Record deleted successfully.");
                this.getData();
            }
            else
                this.ts.showError("Error", "Failed to delete record.");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    Deactive(id, rowVersion) {
        //   this.service.deactive(parseInt(id), rowVersion).subscribe((res: any) => {
        //     this.alertService.success("Modifiers has been Deactived");
        //     this.getBrandData();
        //   }, error => {
        //     this.alertService.error(error);
        //   });
    }
};
AddonsComponent.ctorParameters = () => [
    { type: src_app_services_addons_service__WEBPACK_IMPORTED_MODULE_4__["AddonsService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
AddonsComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
AddonsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addons',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addons.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/addons/addons.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_addons_service__WEBPACK_IMPORTED_MODULE_4__["AddonsService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], AddonsComponent);



/***/ }),

/***/ "./src/app/admin/menu/category/addcategory/addcategory.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/admin/menu/category/addcategory/addcategory.component.css ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL21lbnUvY2F0ZWdvcnkvYWRkY2F0ZWdvcnkvYWRkY2F0ZWdvcnkuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/admin/menu/category/addcategory/addcategory.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/admin/menu/category/addcategory/addcategory.component.ts ***!
  \**************************************************************************/
/*! exports provided: AddcategoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddcategoryComponent", function() { return AddcategoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_services_category_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/category.service */ "./src/app/_services/category.service.ts");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let AddcategoryComponent = class AddcategoryComponent {
    constructor(formBuilder, router, route, ls, ts, categoryService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.categoryService = categoryService;
        this.submitted = false;
        this.loading = false;
        this.loadingCategory = false;
        this.ButtonText = "Save";
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedCategory();
    }
    get f() { return this.categoryForm.controls; }
    createForm() {
        this.categoryForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            arabicName: [''],
            description: [''],
            statusID: [true],
            displayOrder: [0],
            categoryID: 0,
            image: [''],
            brandID: this.ls.getSelectedBrand().brandID,
            locationID: null
        });
    }
    editForm(obj) {
        this.f.name.setValue(obj.name);
        this.f.arabicName.setValue(obj.arabicName);
        this.f.displayOrder.setValue(obj.displayOrder);
        this.f.categoryID.setValue(obj.categoryID);
        this.f.image.setValue(obj.image);
        this.f.description.setValue(obj.description);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.imgComp.imageUrl = obj.image;
    }
    setSelectedCategory() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingCategory = true;
                this.f.categoryID.setValue(sid);
                this.categoryService.getById(sid, this.f.brandID.value).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingCategory = false;
                });
            }
        });
    }
    onSubmit() {
        this.categoryForm.markAllAsTouched();
        this.submitted = true;
        if (this.categoryForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.image.setValue(this.imgComp.imageUrl);
        if (parseInt(this.f.categoryID.value) === 0) {
            //Insert category
            this.categoryService.insert(this.categoryForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/category']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update category
            this.categoryService.update(this.categoryForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/category']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AddcategoryComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_category_service__WEBPACK_IMPORTED_MODULE_2__["CategoryService"] }
];
AddcategoryComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_3__["ImageuploadComponent"], { static: true },] }]
};
AddcategoryComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addcategory',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addcategory.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/category/addcategory/addcategory.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./addcategory.component.css */ "./src/app/admin/menu/category/addcategory/addcategory.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_category_service__WEBPACK_IMPORTED_MODULE_2__["CategoryService"]])
], AddcategoryComponent);



/***/ }),

/***/ "./src/app/admin/menu/category/category.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/menu/category/category.component.ts ***!
  \***********************************************************/
/*! exports provided: CategoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryComponent", function() { return CategoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_category_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/category.service */ "./src/app/_services/category.service.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/__ivy_ngcc__/fesm2015/ngx-toastr.js");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








let CategoryComponent = class CategoryComponent {
    constructor(service, excelService, ls, ts, tss, router) {
        this.service = service;
        this.excelService = excelService;
        this.ls = ls;
        this.ts = ts;
        this.tss = tss;
        this.router = router;
        this.categories = [];
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    exportAsXLSX() {
        this.service.ExportList(this.selectedBrand).subscribe((res) => {
            this.excelService.exportAsExcelFile(res, 'Report_Export');
        }, error => {
            this.ts.showError("Error", "Failed to export");
        });
    }
    getData() {
        this.service.getAllData(this.selectedBrand);
        this.data$ = this.service.data$;
        this.total$ = this.service.total$;
        this.loading$ = this.service.loading$;
    }
    onSort({ column, direction }) {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }
    Edit(category) {
        this.router.navigate(["admin/category/edit", category]);
    }
    Delete(obj) {
        this.service.delete(obj).subscribe((res) => {
            if (res != 0) {
                this.ts.showSuccess("Success", "Record deleted successfully.");
                this.getData();
            }
            else {
                this.ts.showError("Error", "Failed to delete record.");
            }
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    Deactive(id, rowVersion) {
        //   this.service.deactive(parseInt(id), rowVersion).subscribe((res: any) => {
        //     this.alertService.success("Category has been Deactived");
        //     this.getBrandData();
        //   }, error => {
        //     this.alertService.error(error);
        //   });
    }
};
CategoryComponent.ctorParameters = () => [
    { type: src_app_services_category_service__WEBPACK_IMPORTED_MODULE_2__["CategoryService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_7__["ExcelService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
CategoryComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
CategoryComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-category',
        template: __importDefault(__webpack_require__(/*! raw-loader!./category.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/category/category.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_7__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_category_service__WEBPACK_IMPORTED_MODULE_2__["CategoryService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_7__["ExcelService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], CategoryComponent);



/***/ }),

/***/ "./src/app/admin/menu/items/additem/additem.component.css":
/*!****************************************************************!*\
  !*** ./src/app/admin/menu/items/additem/additem.component.css ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL21lbnUvaXRlbXMvYWRkaXRlbS9hZGRpdGVtLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/menu/items/additem/additem.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/menu/items/additem/additem.component.ts ***!
  \***************************************************************/
/*! exports provided: AdditemsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdditemsComponent", function() { return AdditemsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_services_items_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/items.service */ "./src/app/_services/items.service.ts");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let AdditemsComponent = class AdditemsComponent {
    constructor(formBuilder, router, route, ls, ts, itemsService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.itemsService = itemsService;
        this.submitted = false;
        this.loading = false;
        this.loadingItems = false;
        // Categories = [];
        this.CategoriesActive = [];
        this.ModifiersList = [];
        this.AddonsList = [];
        this.createForm();
        // this.loadCategory();
        this.loadActiveCategory();
        this.loadModifiers();
        this.loadAddons();
    }
    ngOnInit() {
        this.setSelecteditem();
    }
    get f() { return this.itemsForm.controls; }
    createForm() {
        this.itemsForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            arabicName: [''],
            description: [''],
            statusID: [true],
            isFeatured: [false],
            isApplyDiscount: [true],
            displayOrder: [0],
            cost: [0],
            categoryID: [null],
            price: [0, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            itemID: 0,
            calories: [0, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            image: [''],
            brandID: this.ls.getSelectedBrand().brandID,
            locationID: null,
            modifiers: [],
            addons: [],
        });
    }
    editForm(obj) {
        this.f.name.setValue(obj.name);
        this.f.arabicName.setValue(obj.arabicName);
        this.f.displayOrder.setValue(obj.displayOrder);
        this.f.price.setValue(obj.price);
        this.f.cost.setValue(obj.cost);
        this.f.calories.setValue(obj.calories);
        this.f.itemID.setValue(obj.itemID);
        if (obj.modifiers != "") {
            var stringToConvert = obj.modifiers;
            this.selectedModifierIds = stringToConvert.split(',').map(Number);
            this.f.modifiers.setValue(obj.modifiers);
        }
        if (obj.addons != "") {
            var stringToConvert = obj.addons;
            this.selectedAddonIds = stringToConvert.split(',').map(Number);
            this.f.addons.setValue(obj.addons);
        }
        this.f.categoryID.setValue(obj.categoryID);
        this.f.image.setValue(obj.image);
        this.f.description.setValue(obj.description);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.f.isFeatured.setValue(obj.isFeatured);
        obj.isApplyDiscount = obj.isApplyDiscount == null ? true : obj.isApplyDiscount;
        this.f.isApplyDiscount.setValue(obj.isApplyDiscount);
        this.imgComp.imageUrl = obj.image;
    }
    setSelecteditem() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingItems = true;
                this.f.itemID.setValue(sid);
                this.itemsService.getById(sid, this.f.brandID.value).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingItems = false;
                });
            }
        });
    }
    onSubmit() {
        this.itemsForm.markAllAsTouched();
        this.submitted = true;
        if (this.itemsForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.modifiers.setValue(this.selectedModifierIds == undefined ? "" : this.selectedModifierIds.toString());
        this.f.addons.setValue(this.selectedAddonIds == undefined ? "" : this.selectedAddonIds.toString());
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.image.setValue(this.imgComp.imageUrl);
        if (parseInt(this.f.itemID.value) === 0) {
            //Insert item
            console.log(JSON.stringify(this.itemsForm.value));
            this.itemsService.insert(this.itemsForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/item']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update item
            this.itemsService.update(this.itemsForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/item']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
    // private loadCategory() {
    //   this.itemsService.loadCategories(this.f.brandID.value).subscribe((res: any) => {
    //     this.Categories = res;
    //   });
    // }
    loadActiveCategory() {
        this.itemsService.loadActiveCategories(this.f.brandID.value).subscribe((res) => {
            this.CategoriesActive = res;
        });
    }
    loadModifiers() {
        this.itemsService.loadModifierList(this.f.brandID.value).subscribe((res) => {
            this.ModifiersList = res;
        });
    }
    loadAddons() {
        this.itemsService.loadAddonList(this.f.brandID.value).subscribe((res) => {
            this.AddonsList = res;
        });
    }
};
AdditemsComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_items_service__WEBPACK_IMPORTED_MODULE_2__["ItemsService"] }
];
AdditemsComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_3__["ImageuploadComponent"], { static: true },] }]
};
AdditemsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-additem',
        template: __importDefault(__webpack_require__(/*! raw-loader!./additem.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/items/additem/additem.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./additem.component.css */ "./src/app/admin/menu/items/additem/additem.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_items_service__WEBPACK_IMPORTED_MODULE_2__["ItemsService"]])
], AdditemsComponent);



/***/ }),

/***/ "./src/app/admin/menu/items/items.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/admin/menu/items/items.component.ts ***!
  \*****************************************************/
/*! exports provided: ItemsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemsComponent", function() { return ItemsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_items_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/items.service */ "./src/app/_services/items.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let ItemsComponent = class ItemsComponent {
    constructor(service, ls, excelService, ts, router) {
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    exportAsXLSX() {
        this.service.ExportList(this.selectedBrand).subscribe((res) => {
            this.excelService.exportAsExcelFile(res, 'Report_Export');
        }, error => {
            this.ts.showError("Error", "Failed to export");
        });
    }
    getData() {
        this.service.getAllData(this.selectedBrand);
        this.data$ = this.service.data$;
        this.total$ = this.service.total$;
        this.loading$ = this.service.loading$;
    }
    onSort({ column, direction }) {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }
    Edit(items) {
        this.router.navigate(["admin/item/edit", items]);
    }
    Delete(obj) {
        this.service.delete(obj).subscribe((res) => {
            if (res != 0) {
                this.ts.showSuccess("Success", "Record deleted successfully.");
                this.getData();
            }
            else
                this.ts.showError("Error", "Failed to delete record.");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    Deactive(id, rowVersion) {
        //   this.service.deactive(parseInt(id), rowVersion).subscribe((res: any) => {
        //     this.alertService.success("items has been Deactived");
        //     this.getBrandData();
        //   }, error => {
        //     this.alertService.error(error);
        //   });
    }
};
ItemsComponent.ctorParameters = () => [
    { type: src_app_services_items_service__WEBPACK_IMPORTED_MODULE_4__["ItemsService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
ItemsComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
ItemsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-items',
        template: __importDefault(__webpack_require__(/*! raw-loader!./items.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/items/items.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_items_service__WEBPACK_IMPORTED_MODULE_4__["ItemsService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], ItemsComponent);



/***/ }),

/***/ "./src/app/admin/menu/items/itemsettings/itemsettings.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/admin/menu/items/itemsettings/itemsettings.component.css ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL21lbnUvaXRlbXMvaXRlbXNldHRpbmdzL2l0ZW1zZXR0aW5ncy5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/admin/menu/items/itemsettings/itemsettings.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/admin/menu/items/itemsettings/itemsettings.component.ts ***!
  \*************************************************************************/
/*! exports provided: ItemsettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemsettingsComponent", function() { return ItemsettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_services_items_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/items.service */ "./src/app/_services/items.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let ItemsettingsComponent = class ItemsettingsComponent {
    constructor(router, route, formBuilder, ls, ts, itemsService) {
        this.router = router;
        this.route = route;
        this.formBuilder = formBuilder;
        this.ls = ls;
        this.ts = ts;
        this.itemsService = itemsService;
        this.submitted = false;
        this.loading = false;
        this.loadingItems = false;
        this.ItemsList = [];
        this.loadItems();
    }
    ngOnInit() {
    }
    setSelecteditem() {
        this.itemsService.getTodaysItems(this.ls.getSelectedBrand().brandID)
            .subscribe((res) => {
            debugger;
            var stringToConvert = res.items;
            this.isItemSetting = res.isItemSetting;
            this.itemSettingTitle = res.itemSettingTitle;
            this.selectedItemIds = stringToConvert.split(',').map(Number);
        });
    }
    onSubmit() {
        var obj = new Object();
        obj["Items"] = this.selectedItemIds.toString();
        obj["BrandID"] = this.ls.getSelectedBrand().brandID;
        obj["ItemSettingTitle"] = this.itemSettingTitle;
        obj["IsItemSetting"] = this.isItemSetting;
        this.loading = true;
        this.itemsService.updateSettings(obj).subscribe(data => {
            this.loading = false;
            if (data != 0) {
                this.ts.showSuccess("Success", "Updated successfully.");
                this.router.navigate(['/admin/item/settings']);
            }
        }, error => {
            this.ts.showError("Error", "Failed to update.");
            this.loading = false;
        });
    }
    loadItems() {
        this.itemsService.loadItems(this.ls.getSelectedBrand().brandID).subscribe((res) => {
            debugger;
            this.ItemsList = res;
            this.setSelecteditem();
        });
    }
};
ItemsettingsComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: src_app_services_items_service__WEBPACK_IMPORTED_MODULE_2__["ItemsService"] }
];
ItemsettingsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-itemsettings',
        template: __importDefault(__webpack_require__(/*! raw-loader!./itemsettings.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/items/itemsettings/itemsettings.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./itemsettings.component.css */ "./src/app/admin/menu/items/itemsettings/itemsettings.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        src_app_services_items_service__WEBPACK_IMPORTED_MODULE_2__["ItemsService"]])
], ItemsettingsComponent);



/***/ }),

/***/ "./src/app/admin/menu/modifiers/addmodifier/addmodifier.component.css":
/*!****************************************************************************!*\
  !*** ./src/app/admin/menu/modifiers/addmodifier/addmodifier.component.css ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL21lbnUvbW9kaWZpZXJzL2FkZG1vZGlmaWVyL2FkZG1vZGlmaWVyLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/menu/modifiers/addmodifier/addmodifier.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/admin/menu/modifiers/addmodifier/addmodifier.component.ts ***!
  \***************************************************************************/
/*! exports provided: AddmodifierComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddmodifierComponent", function() { return AddmodifierComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_modifiers_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/modifiers.service */ "./src/app/_services/modifiers.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let AddmodifierComponent = class AddmodifierComponent {
    constructor(formBuilder, router, route, ts, ls, modifierService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ts = ts;
        this.ls = ls;
        this.modifierService = modifierService;
        this.submitted = false;
        this.loading = false;
        this.loadingmodifier = false;
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedmodifier();
    }
    get f() { return this.modifierForm.controls; }
    createForm() {
        this.modifierForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            arabicName: [''],
            description: [''],
            statusID: [true],
            displayOrder: [0],
            price: [0],
            modifierID: 0,
            image: [''],
            brandID: this.ls.getSelectedBrand().brandID,
            locationID: null
        });
    }
    editForm(obj) {
        this.f.name.setValue(obj.name);
        this.f.arabicName.setValue(obj.arabicName);
        this.f.displayOrder.setValue(obj.displayOrder);
        this.f.price.setValue(obj.price);
        this.f.modifierID.setValue(obj.modifierID);
        this.f.image.setValue(obj.image);
        this.f.description.setValue(obj.description);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.imgComp.imageUrl = obj.image;
    }
    setSelectedmodifier() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingmodifier = true;
                this.f.modifierID.setValue(sid);
                this.modifierService.getById(sid, this.f.brandID.value).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingmodifier = false;
                });
            }
        });
    }
    onSubmit() {
        this.modifierForm.markAllAsTouched();
        this.submitted = true;
        if (this.modifierForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.image.setValue(this.imgComp.imageUrl);
        if (parseInt(this.f.modifierID.value) === 0) {
            //Insert modifier
            console.log(JSON.stringify(this.modifierForm.value));
            this.modifierService.insert(this.modifierForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/modifier']);
                }
                // this.alertService.success("Item has been created");
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update modifier
            this.modifierService.update(this.modifierForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/modifier']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AddmodifierComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_modifiers_service__WEBPACK_IMPORTED_MODULE_5__["ModifiersService"] }
];
AddmodifierComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddmodifierComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addmodifier',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addmodifier.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/modifiers/addmodifier/addmodifier.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./addmodifier.component.css */ "./src/app/admin/menu/modifiers/addmodifier/addmodifier.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_modifiers_service__WEBPACK_IMPORTED_MODULE_5__["ModifiersService"]])
], AddmodifierComponent);



/***/ }),

/***/ "./src/app/admin/menu/modifiers/modifiers.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/menu/modifiers/modifiers.component.ts ***!
  \*************************************************************/
/*! exports provided: ModifiersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifiersComponent", function() { return ModifiersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_modifiers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/modifiers.service */ "./src/app/_services/modifiers.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let ModifiersComponent = class ModifiersComponent {
    constructor(service, ls, excelService, ts, router) {
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    exportAsXLSX() {
        this.service.ExportList(this.selectedBrand).subscribe((res) => {
            this.excelService.exportAsExcelFile(res, 'Report_Export');
        }, error => {
            this.ts.showError("Error", "Failed to export");
        });
    }
    getData() {
        this.service.getAllData(this.selectedBrand);
        this.data$ = this.service.data$;
        this.total$ = this.service.total$;
        this.loading$ = this.service.loading$;
    }
    onSort({ column, direction }) {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }
    Edit(modifiers) {
        this.router.navigate(["admin/modifier/edit", modifiers]);
    }
    Delete(obj) {
        this.service.delete(obj).subscribe((res) => {
            if (res != 0) {
                this.ts.showSuccess("Success", "Record deleted successfully.");
                this.getData();
            }
            else
                this.ts.showError("Error", "Failed to delete record.");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    Deactive(id, rowVersion) {
        //   this.service.deactive(parseInt(id), rowVersion).subscribe((res: any) => {
        //     this.alertService.success("Modifiers has been Deactived");
        //     this.getBrandData();
        //   }, error => {
        //     this.alertService.error(error);
        //   });
    }
};
ModifiersComponent.ctorParameters = () => [
    { type: src_app_services_modifiers_service__WEBPACK_IMPORTED_MODULE_4__["ModifiersService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
ModifiersComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
ModifiersComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-modifiers',
        template: __importDefault(__webpack_require__(/*! raw-loader!./modifiers.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/modifiers/modifiers.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_modifiers_service__WEBPACK_IMPORTED_MODULE_4__["ModifiersService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], ModifiersComponent);



/***/ }),

/***/ "./src/app/admin/pharmacy/customerinquiry/customerinquiry.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/admin/pharmacy/customerinquiry/customerinquiry.component.css ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3BoYXJtYWN5L2N1c3RvbWVyaW5xdWlyeS9jdXN0b21lcmlucXVpcnkuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/admin/pharmacy/customerinquiry/customerinquiry.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/pharmacy/customerinquiry/customerinquiry.component.ts ***!
  \*****************************************************************************/
/*! exports provided: CustomerinquiryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerinquiryComponent", function() { return CustomerinquiryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let CustomerinquiryComponent = class CustomerinquiryComponent {
    constructor() { }
    ngOnInit() {
    }
};
CustomerinquiryComponent.ctorParameters = () => [];
CustomerinquiryComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-customerinquiry',
        template: __importDefault(__webpack_require__(/*! raw-loader!./customerinquiry.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/customerinquiry/customerinquiry.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./customerinquiry.component.css */ "./src/app/admin/pharmacy/customerinquiry/customerinquiry.component.css")).default]
    }),
    __metadata("design:paramtypes", [])
], CustomerinquiryComponent);



/***/ }),

/***/ "./src/app/admin/pharmacy/deliverydetail/deliverydetail.component.css":
/*!****************************************************************************!*\
  !*** ./src/app/admin/pharmacy/deliverydetail/deliverydetail.component.css ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3BoYXJtYWN5L2RlbGl2ZXJ5ZGV0YWlsL2RlbGl2ZXJ5ZGV0YWlsLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/pharmacy/deliverydetail/deliverydetail.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/admin/pharmacy/deliverydetail/deliverydetail.component.ts ***!
  \***************************************************************************/
/*! exports provided: DeliverydetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliverydetailComponent", function() { return DeliverydetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let DeliverydetailComponent = class DeliverydetailComponent {
    constructor() { }
    ngOnInit() {
    }
};
DeliverydetailComponent.ctorParameters = () => [];
DeliverydetailComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-deliverydetail',
        template: __importDefault(__webpack_require__(/*! raw-loader!./deliverydetail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/deliverydetail/deliverydetail.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./deliverydetail.component.css */ "./src/app/admin/pharmacy/deliverydetail/deliverydetail.component.css")).default]
    }),
    __metadata("design:paramtypes", [])
], DeliverydetailComponent);



/***/ }),

/***/ "./src/app/admin/pharmacy/prescription/prescription.component.css":
/*!************************************************************************!*\
  !*** ./src/app/admin/pharmacy/prescription/prescription.component.css ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3BoYXJtYWN5L3ByZXNjcmlwdGlvbi9wcmVzY3JpcHRpb24uY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/admin/pharmacy/prescription/prescription.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/admin/pharmacy/prescription/prescription.component.ts ***!
  \***********************************************************************/
/*! exports provided: PrescriptionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrescriptionComponent", function() { return PrescriptionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let PrescriptionComponent = class PrescriptionComponent {
    constructor() { }
    ngOnInit() {
    }
};
PrescriptionComponent.ctorParameters = () => [];
PrescriptionComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-prescription',
        template: __importDefault(__webpack_require__(/*! raw-loader!./prescription.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/prescription/prescription.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./prescription.component.css */ "./src/app/admin/pharmacy/prescription/prescription.component.css")).default]
    }),
    __metadata("design:paramtypes", [])
], PrescriptionComponent);



/***/ }),

/***/ "./src/app/admin/reception/drappoinment/drappoinment.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/admin/reception/drappoinment/drappoinment.component.css ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3JlY2VwdGlvbi9kcmFwcG9pbm1lbnQvZHJhcHBvaW5tZW50LmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/reception/drappoinment/drappoinment.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/admin/reception/drappoinment/drappoinment.component.ts ***!
  \************************************************************************/
/*! exports provided: DrappoinmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrappoinmentComponent", function() { return DrappoinmentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let DrappoinmentComponent = class DrappoinmentComponent {
    constructor() { }
    ngOnInit() {
    }
};
DrappoinmentComponent.ctorParameters = () => [];
DrappoinmentComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-drappoinment',
        template: __importDefault(__webpack_require__(/*! raw-loader!./drappoinment.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/drappoinment/drappoinment.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./drappoinment.component.css */ "./src/app/admin/reception/drappoinment/drappoinment.component.css")).default]
    }),
    __metadata("design:paramtypes", [])
], DrappoinmentComponent);



/***/ }),

/***/ "./src/app/admin/reception/laboratoryinquiry/laboratoryinquiry.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/admin/reception/laboratoryinquiry/laboratoryinquiry.component.css ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3JlY2VwdGlvbi9sYWJvcmF0b3J5aW5xdWlyeS9sYWJvcmF0b3J5aW5xdWlyeS5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/admin/reception/laboratoryinquiry/laboratoryinquiry.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/admin/reception/laboratoryinquiry/laboratoryinquiry.component.ts ***!
  \**********************************************************************************/
/*! exports provided: LaboratoryinquiryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LaboratoryinquiryComponent", function() { return LaboratoryinquiryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let LaboratoryinquiryComponent = class LaboratoryinquiryComponent {
    constructor() { }
    ngOnInit() {
    }
};
LaboratoryinquiryComponent.ctorParameters = () => [];
LaboratoryinquiryComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-laboratoryinquiry',
        template: __importDefault(__webpack_require__(/*! raw-loader!./laboratoryinquiry.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/laboratoryinquiry/laboratoryinquiry.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./laboratoryinquiry.component.css */ "./src/app/admin/reception/laboratoryinquiry/laboratoryinquiry.component.css")).default]
    }),
    __metadata("design:paramtypes", [])
], LaboratoryinquiryComponent);



/***/ }),

/***/ "./src/app/admin/report/salescategorywise/salescategorywise.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/report/salescategorywise/salescategorywise.component.ts ***!
  \*******************************************************************************/
/*! exports provided: SalescategorywiseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalescategorywiseComponent", function() { return SalescategorywiseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/report.service */ "./src/app/_services/report.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/datepicker-range/datepicker-range-popup */ "./src/app/datepicker-range/datepicker-range-popup.ts");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};










let SalescategorywiseComponent = class SalescategorywiseComponent {
    constructor(service, ls, excelService, ts, router) {
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.Locations = [];
        this.selectedLocations = [];
        this.locationID = 0;
        this.salesCategoryWise = [];
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        this.loadLocations();
    }
    ngOnInit() {
    }
    exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.salesCategoryWise, 'Report_Export');
    }
    getData(locaionID) {
        this.service.SalesCategorywiseRpt(this.selectedBrand, locaionID, this.parseDate(this._datepicker.fromDate), this.parseDate(this._datepicker.toDate))
            .subscribe((res) => {
            if (res != null) {
                this.salesCategoryWise = res;
            }
            else
                this.ts.showError("Error", "Something went wrong");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    parseDate(obj) {
        return obj.year + "-" + obj.month + "-" + obj.day;
        ;
    }
    loadLocations() {
        this.service.loadLocations(this.selectedBrand).subscribe((res) => {
            this.Locations = res;
            this.locationID = this.selectedLocation;
            this.loadLocationsMulti()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(x => x.filter(y => !y.disabled)))
                .subscribe((res) => {
                this.Locations = res;
                var arr = [];
                this.Locations.forEach(element => {
                    arr.push(element.locationID);
                });
                this.selectedLocations = arr;
                this.getData(this.selectedLocations.toString());
            });
        });
    }
    loadLocationsMulti(term = null) {
        let items = this.Locations;
        if (term) {
            items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["delay"])(500));
    }
    Filter() {
        this.getData(this.selectedLocations.toString());
    }
};
SalescategorywiseComponent.ctorParameters = () => [
    { type: src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
SalescategorywiseComponent.propDecorators = {
    _datepicker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_8__["NgbdDatepickerRangePopup"], { static: true },] }],
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_2__["NgbdSortableHeader"],] }],
    drplocation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['locationDrp',] }]
};
SalescategorywiseComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-salescategorywise',
        template: __importDefault(__webpack_require__(/*! raw-loader!./salescategorywise.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salescategorywise/salescategorywise.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], SalescategorywiseComponent);



/***/ }),

/***/ "./src/app/admin/report/salescustomerwise/salescustomerwise.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/report/salescustomerwise/salescustomerwise.component.ts ***!
  \*******************************************************************************/
/*! exports provided: SalescustomerwiseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalescustomerwiseComponent", function() { return SalescustomerwiseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/report.service */ "./src/app/_services/report.service.ts");
/* harmony import */ var src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/datepicker-range/datepicker-range-popup */ "./src/app/datepicker-range/datepicker-range-popup.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};










let SalescustomerwiseComponent = class SalescustomerwiseComponent {
    constructor(service, ls, ts, excelService, router) {
        this.service = service;
        this.ls = ls;
        this.ts = ts;
        this.excelService = excelService;
        this.router = router;
        this.Locations = [];
        this.selectedLocations = [];
        this.locationID = 0;
        this.orders = [];
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        // this.selectedLocation = this.ls.getSelectedLocation().locationID
        this.loadLocations();
    }
    ngOnInit() {
    }
    exportAsXLSX() {
        debugger;
        this.excelService.exportAsExcelFile(this.orders, 'Report_Export');
    }
    getData(locaionID) {
        this.service.SalesCustomerwiseRpt(this.selectedBrand, locaionID, 0, this.parseDate(this._datepicker.fromDate), this.parseDate(this._datepicker.toDate))
            .subscribe((res) => {
            if (res != null) {
                this.orders = res;
            }
            else
                this.ts.showError("Error", "Something went wrong");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    parseDate(obj) {
        return obj.year + "-" + obj.month + "-" + obj.day;
        ;
    }
    loadLocations() {
        this.service.loadLocations(this.selectedBrand).subscribe((res) => {
            this.Locations = res;
            this.locationID = this.selectedLocation;
            this.loadLocationsMulti()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(x => x.filter(y => !y.disabled)))
                .subscribe((res) => {
                this.Locations = res;
                var arr = [];
                this.Locations.forEach(element => {
                    arr.push(element.locationID);
                });
                this.selectedLocations = arr;
                this.getData(this.selectedLocations.toString());
            });
        });
    }
    loadLocationsMulti(term = null) {
        let items = this.Locations;
        if (term) {
            items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["delay"])(500));
    }
    Filter() {
        this.getData(this.selectedLocations.toString());
    }
};
SalescustomerwiseComponent.ctorParameters = () => [
    { type: src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
SalescustomerwiseComponent.propDecorators = {
    _datepicker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_7__["NgbdDatepickerRangePopup"], { static: true },] }],
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_2__["NgbdSortableHeader"],] }],
    drplocation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['locationDrp',] }]
};
SalescustomerwiseComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-salescustomerwise',
        template: __importDefault(__webpack_require__(/*! raw-loader!./salescustomerwise.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salescustomerwise/salescustomerwise.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], SalescustomerwiseComponent);



/***/ }),

/***/ "./src/app/admin/report/salesdetail/salesdetail.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/admin/report/salesdetail/salesdetail.component.ts ***!
  \*******************************************************************/
/*! exports provided: SalesdetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesdetailComponent", function() { return SalesdetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/report.service */ "./src/app/_services/report.service.ts");
/* harmony import */ var src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/datepicker-range/datepicker-range-popup */ "./src/app/datepicker-range/datepicker-range-popup.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};










let SalesdetailComponent = class SalesdetailComponent {
    constructor(service, ls, ts, excelService, router) {
        this.service = service;
        this.ls = ls;
        this.ts = ts;
        this.excelService = excelService;
        this.router = router;
        this.Locations = [];
        this.selectedLocations = [];
        this.locationID = 0;
        this.orderDetails = [];
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        // this.selectedLocation = this.ls.getSelectedLocation().locationID
        this.loadLocations();
    }
    ngOnInit() {
    }
    getData(locaionIDs) {
        this.service.SalesDetailRpt(this.selectedBrand, locaionIDs, this.parseDate(this._datepicker.fromDate), this.parseDate(this._datepicker.toDate))
            .subscribe((res) => {
            if (res != null) {
                this.orderDetails = res;
            }
            else
                this.ts.showError("Error", "Something went wrong");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    parseDate(obj) {
        return obj.year + "-" + obj.month + "-" + obj.day;
        ;
    }
    exportAsXLSX() {
        debugger;
        this.excelService.exportAsExcelFile(this.orderDetails, 'Report_Export');
    }
    loadLocations() {
        this.service.loadLocations(this.selectedBrand).subscribe((res) => {
            this.Locations = res;
            this.locationID = this.selectedLocation;
            this.loadLocationsMulti()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(x => x.filter(y => !y.disabled)))
                .subscribe((res) => {
                this.Locations = res;
                var arr = [];
                this.Locations.forEach(element => {
                    arr.push(element.locationID);
                });
                this.selectedLocations = arr;
                this.getData(this.selectedLocations.toString());
            });
        });
    }
    loadLocationsMulti(term = null) {
        let items = this.Locations;
        if (term) {
            items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["delay"])(500));
    }
    Filter() {
        this.getData(this.selectedLocations.toString());
    }
};
SalesdetailComponent.ctorParameters = () => [
    { type: src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
SalesdetailComponent.propDecorators = {
    _datepicker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_7__["NgbdDatepickerRangePopup"], { static: true },] }],
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_2__["NgbdSortableHeader"],] }],
    drplocation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['locationDrp',] }]
};
SalesdetailComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-salesdetail',
        template: __importDefault(__webpack_require__(/*! raw-loader!./salesdetail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salesdetail/salesdetail.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], SalesdetailComponent);



/***/ }),

/***/ "./src/app/admin/report/salesitemwise/salesitemwise.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/admin/report/salesitemwise/salesitemwise.component.ts ***!
  \***********************************************************************/
/*! exports provided: SalesitemwiseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesitemwiseComponent", function() { return SalesitemwiseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/report.service */ "./src/app/_services/report.service.ts");
/* harmony import */ var src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/datepicker-range/datepicker-range-popup */ "./src/app/datepicker-range/datepicker-range-popup.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};










let SalesitemwiseComponent = class SalesitemwiseComponent {
    constructor(service, ls, excelService, ts, router) {
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.Locations = [];
        this.selectedLocations = [];
        this.locationID = 0;
        this.salesItemWise = [];
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        this.loadLocations();
    }
    ngOnInit() {
    }
    exportAsXLSX() {
        debugger;
        this.excelService.exportAsExcelFile(this.salesItemWise, 'Report_Export');
    }
    getData(locaionID) {
        this.service.SalesItemwiseRpt(this.selectedBrand, locaionID, this.parseDate(this._datepicker.fromDate), this.parseDate(this._datepicker.toDate))
            .subscribe((res) => {
            if (res != null) {
                this.salesItemWise = res;
            }
            else
                this.ts.showError("Error", "Something went wrong");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    parseDate(obj) {
        return obj.year + "-" + obj.month + "-" + obj.day;
        ;
    }
    loadLocationsMulti(term = null) {
        let items = this.Locations;
        if (term) {
            items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["delay"])(500));
    }
    Filter() {
        this.getData(this.selectedLocations.toString());
    }
    loadLocations() {
        this.service.loadLocations(this.selectedBrand).subscribe((res) => {
            this.Locations = res;
            this.locationID = this.selectedLocation;
            this.loadLocationsMulti()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(x => x.filter(y => !y.disabled)))
                .subscribe((res) => {
                this.Locations = res;
                var arr = [];
                this.Locations.forEach(element => {
                    arr.push(element.locationID);
                });
                this.selectedLocations = arr;
                this.getData(this.selectedLocations.toString());
            });
        });
    }
};
SalesitemwiseComponent.ctorParameters = () => [
    { type: src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
SalesitemwiseComponent.propDecorators = {
    _datepicker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_7__["NgbdDatepickerRangePopup"], { static: true },] }],
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_2__["NgbdSortableHeader"],] }],
    drplocation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['locationDrp',] }]
};
SalesitemwiseComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-salesitemwise',
        template: __importDefault(__webpack_require__(/*! raw-loader!./salesitemwise.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salesitemwise/salesitemwise.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], SalesitemwiseComponent);



/***/ }),

/***/ "./src/app/admin/report/salesuserwise/salesuserwise.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/admin/report/salesuserwise/salesuserwise.component.ts ***!
  \***********************************************************************/
/*! exports provided: SalesuserwiseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesuserwiseComponent", function() { return SalesuserwiseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_report_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/report.service */ "./src/app/_services/report.service.ts");
/* harmony import */ var src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/datepicker-range/datepicker-range-popup */ "./src/app/datepicker-range/datepicker-range-popup.ts");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








let SalesuserwiseComponent = class SalesuserwiseComponent {
    constructor(service, ls, ts, excelService, router) {
        this.service = service;
        this.ls = ls;
        this.ts = ts;
        this.excelService = excelService;
        this.router = router;
        this.locationID = 0;
        this.salesUserWise = [];
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        this.selectedLocation = this.ls.getSelectedLocation().locationID;
    }
    ngOnInit() {
        this.getData(this.selectedLocation);
        this.loadLocations();
    }
    exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.salesUserWise, 'Report_Export');
    }
    getData(locaionID) {
        this.service.SalesDetailRpt(this.selectedBrand, locaionID, this.parseDate(this._datepicker.fromDate), this.parseDate(this._datepicker.toDate))
            .subscribe((res) => {
            if (res != null) {
                this.data$ = res;
            }
            else
                this.ts.showError("Error", "Something went wrong");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    parseDate(obj) {
        return obj.year + "-" + obj.month + "-" + obj.day;
        ;
    }
    loadLocations() {
        this.service.loadLocations(this.selectedBrand).subscribe((res) => {
            this.Locations = res;
            this.locationID = this.selectedLocation;
        });
    }
    Filter() {
        debugger;
        // this.getData(obj.target.value);
    }
};
SalesuserwiseComponent.ctorParameters = () => [
    { type: src_app_services_report_service__WEBPACK_IMPORTED_MODULE_5__["ReportService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_7__["ExcelService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
SalesuserwiseComponent.propDecorators = {
    _datepicker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_6__["NgbdDatepickerRangePopup"], { static: true },] }],
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }],
    drplocation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['locationDrp',] }]
};
SalesuserwiseComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-salesuserwise',
        template: __importDefault(__webpack_require__(/*! raw-loader!./salesuserwise.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/salesuserwise/salesuserwise.component.html")).default,
        providers: []
    }),
    __metadata("design:paramtypes", [src_app_services_report_service__WEBPACK_IMPORTED_MODULE_5__["ReportService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_7__["ExcelService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], SalesuserwiseComponent);



/***/ }),

/***/ "./src/app/admin/report/summary/summary.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/report/summary/summary.component.ts ***!
  \***********************************************************/
/*! exports provided: SummaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SummaryComponent", function() { return SummaryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_report_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/report.service */ "./src/app/_services/report.service.ts");
/* harmony import */ var src_app_models_Report__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_models/Report */ "./src/app/_models/Report.ts");
/* harmony import */ var src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/datepicker-range/datepicker-range-popup */ "./src/app/datepicker-range/datepicker-range-popup.ts");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








let SummaryComponent = class SummaryComponent {
    constructor(service, ls, ts, excelService, router) {
        this.service = service;
        this.ls = ls;
        this.ts = ts;
        this.excelService = excelService;
        this.router = router;
        this._model = new src_app_models_Report__WEBPACK_IMPORTED_MODULE_5__["SummaryReport"]();
        this.export = [];
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
    }
    ngOnInit() {
        this.getData();
    }
    exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.export, 'Report_Export');
    }
    getData() {
        this.service.SalesSummaryRpt(this.selectedBrand, this.parseDate(this._datepicker.fromDate), this.parseDate(this._datepicker.toDate))
            .subscribe((res) => {
            if (res != null) {
                this._model = res[0];
                this.export.push(this._model);
            }
            else
                this.ts.showError("Error", "Something went wrong");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
    parseDate(obj) {
        return obj.year + "-" + obj.month + "-" + obj.day;
        ;
    }
};
SummaryComponent.ctorParameters = () => [
    { type: src_app_services_report_service__WEBPACK_IMPORTED_MODULE_4__["ReportService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_1__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_3__["ToastService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_7__["ExcelService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
SummaryComponent.propDecorators = {
    _datepicker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_6__["NgbdDatepickerRangePopup"], { static: true },] }]
};
SummaryComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-summary',
        template: __importDefault(__webpack_require__(/*! raw-loader!./summary.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/report/summary/summary.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_7__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_report_service__WEBPACK_IMPORTED_MODULE_4__["ReportService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_1__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_3__["ToastService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_7__["ExcelService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], SummaryComponent);



/***/ }),

/***/ "./src/app/admin/sales/orderdetails/orderdetails.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/admin/sales/orderdetails/orderdetails.component.ts ***!
  \********************************************************************/
/*! exports provided: OrderdetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderdetailsComponent", function() { return OrderdetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_models_Orders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_models/Orders */ "./src/app/_models/Orders.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_orders_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/orders.service */ "./src/app/_services/orders.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let OrderdetailsComponent = class OrderdetailsComponent {
    constructor(service, ls, ts, router, route) {
        this.service = service;
        this.ls = ls;
        this.ts = ts;
        this.router = router;
        this.route = route;
        this.order = new src_app_models_Orders__WEBPACK_IMPORTED_MODULE_3__["Orders"]();
        this.Locations = [];
        this.selectedLocations = [];
        this.locationID = 0;
        this.orderDetails = new src_app_models_Orders__WEBPACK_IMPORTED_MODULE_3__["OrderDetails"]();
        this.orderOrderCheckout = new src_app_models_Orders__WEBPACK_IMPORTED_MODULE_3__["OrderCheckout"]();
        this.orderCustomerInfo = new src_app_models_Orders__WEBPACK_IMPORTED_MODULE_3__["CustomerOrders"]();
        debugger;
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
    }
    ngOnInit() {
        this.setSelectedOrder();
    }
    setSelectedOrder() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.service.getById(sid, this.selectedBrand).subscribe(res => {
                    //Set Forms
                    debugger;
                    this.editForm(res);
                });
            }
        });
    }
    updateOrder(order, status) {
        debugger;
        order.statusID = status;
        //Update customer
        this.service.update(order).subscribe(data => {
            if (data != 0) {
                this.ts.showSuccess("Success", "Record updated successfully.");
                this.router.navigate(['/admin/orders']);
            }
        }, error => {
            this.ts.showError("Error", "Failed to update record.");
        });
    }
    editForm(obj) {
        debugger;
        this.order = obj.order;
        this.orderDetails = obj.orderDetails;
        this.orderCustomerInfo = obj.customerOrders;
        this.orderOrderCheckout = obj.orderCheckouts;
    }
};
OrderdetailsComponent.ctorParameters = () => [
    { type: src_app_services_orders_service__WEBPACK_IMPORTED_MODULE_5__["OrdersService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_1__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
];
OrderdetailsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-orderdetails',
        template: __importDefault(__webpack_require__(/*! raw-loader!./orderdetails.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/sales/orderdetails/orderdetails.component.html")).default,
        providers: []
    }),
    __metadata("design:paramtypes", [src_app_services_orders_service__WEBPACK_IMPORTED_MODULE_5__["OrdersService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_1__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
], OrderdetailsComponent);



/***/ }),

/***/ "./src/app/admin/sales/orders/orders.component.css":
/*!*********************************************************!*\
  !*** ./src/app/admin/sales/orders/orders.component.css ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3NhbGVzL29yZGVycy9vcmRlcnMuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/admin/sales/orders/orders.component.ts":
/*!********************************************************!*\
  !*** ./src/app/admin/sales/orders/orders.component.ts ***!
  \********************************************************/
/*! exports provided: OrdersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersComponent", function() { return OrdersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let OrdersComponent = class OrdersComponent {
    constructor() { }
    ngOnInit() {
    }
};
OrdersComponent.ctorParameters = () => [];
OrdersComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-orders',
        template: __importDefault(__webpack_require__(/*! raw-loader!./orders.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/sales/orders/orders.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./orders.component.css */ "./src/app/admin/sales/orders/orders.component.css")).default]
    }),
    __metadata("design:paramtypes", [])
], OrdersComponent);

// import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
// import { Observable, of, Subscription } from 'rxjs';
// import { NgbdSortableHeader, SortEvent } from 'src/app/_directives/sortable.directive';
// import { LocalStorageService } from 'src/app/_services/local-storage.service';
// import { Router } from '@angular/router';
// import { Orders } from 'src/app/_models/Orders';
// import { ToastService } from 'src/app/_services/toastservice';
// import { OrdersService } from 'src/app/_services/orders.service';
// import { delay, map } from 'rxjs/operators';
// import { Location } from 'src/app/_models/Location';
// import { NgbdDatepickerRangePopup } from 'src/app/datepicker-range/datepicker-range-popup';
// import { ExcelService } from 'src/ExportExcel/excel.service';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { CustomerOrders, OrderCheckout, OrderDetails } from 'src/app/_models/Orders';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgbdModalContent } from './modal-content/ngbd-OrderDetail-content.component';
// @Component({
//   selector: 'app-orders',
//   templateUrl: './orders.component.html',
//   providers: [ExcelService]
// })
// export class OrdersComponent implements OnInit {
//   data$: Observable<Orders[]>;
//   oldData: Orders[];
//   total$: Observable<number>;
//   loading$: Observable<boolean>;
//   private selectedBrand;
//   private selectedLocation;
//   Locations: Location[] = [];
//   selectedLocations = [];
//   locationID = 0;
//   @ViewChild(NgbdDatepickerRangePopup, { static: true }) _datepicker;
//   locationSubscription: Subscription;
//   submit: boolean;
//   salesorders: Orders[] = [];
//   @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
//   @ViewChild('locationDrp') drplocation: any;
//   constructor(public service: OrdersService,private modalService: NgbModal,
//     public ls: LocalStorageService,
//     public excelService: ExcelService,
//     public ts: ToastService,
//     public router: Router) {
//     this.loading$ = service.loading$;
//     this.submit = false;
//     this.selectedBrand = this.ls.getSelectedBrand().brandID;
//     this.loadLocations();
//   }
//   open(orders) 
//   {    
//     this.service.getById(orders, this.selectedBrand).subscribe(res => {          
//       console.log(res);
//       const modalRef = this.modalService.open(NgbdModalContent);
//       modalRef.componentInstance.dataObj = res;      
//     });        
//   }
//   updateOrder(order, status) {
//     debugger
//     order.statusID = status;
//     //Update customer
//     this.service.update(order).subscribe(data => {
//       if (data != 0) {
//         this.ts.showSuccess("Success", "Record updated successfully.")
//         this.router.navigate(['/admin/orders']);
//       }
//     }, error => {
//       this.ts.showError("Error", "Failed to update record.")
//     });
//   }
//   ngOnInit() {
//   }
//   getData(locaionID) {
//     this.service.getAllData(this.selectedBrand, locaionID, this.parseDate(this._datepicker.fromDate), this.parseDate(this._datepicker.toDate));
//     this.data$ = this.service.data$;
//     this.total$ = this.service.total$;
//     this.loading$ = this.service.loading$;
//   }
//   onSort({ column, direction }: SortEvent) {
//     this.headers.forEach(header => {
//       if (header.sortable !== column) {
//         header.direction = '';
//       }
//     });
//     this.service.sortColumn = column;
//     this.service.sortDirection = direction;
//   }
//   View(orders) {
//     this.router.navigate(["admin/orders/view", orders]);
//   }
//   Print(sid) {
//     this.service.printorder(sid, this.selectedBrand).subscribe((res: any) => {
//       //Set Forms
//       if (res.status == 1) {
//         this.printout(res.html);
//       }
//       else
//         this.ts.showError("Error", "Failed to print.")
//     });
//   }
//   parseDate(obj) {
//     return obj.year + "-" + obj.month + "-" + obj.day;;
//   }
//   loadLocations() {
//     this.service.loadLocations(this.selectedBrand).subscribe((res: any) => {
//       this.Locations = res;
//       this.locationID = this.selectedLocation;
//       this.loadLocationsMulti()
//         .pipe(map(x => x.filter(y => !y.disabled)))
//         .subscribe((res) => {
//           this.Locations = res;
//           var arr = [];
//           this.Locations.forEach(element => {
//             arr.push(element.locationID);
//           });
//           this.selectedLocations = arr;
//           this.getData(this.selectedLocations.toString());
//         });
//     });
//   }
//   loadLocationsMulti(term: string = null): Observable<Location[]> {
//     let items = this.Locations;
//     if (term) {
//       items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
//     }
//     return of(items).pipe(delay(500));
//   }
//   Filter() {
//     this.getData(this.selectedLocations.toString());
//   }
//   printout(html) {
//     var newWindow = window.open('_self');
//     newWindow.document.write(html);
//     newWindow.print();
//   }
// }


/***/ }),

/***/ "./src/app/admin/settings/Delivery/adddelivery/adddelivery.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/settings/Delivery/adddelivery/adddelivery.component.css ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3NldHRpbmdzL0RlbGl2ZXJ5L2FkZGRlbGl2ZXJ5L2FkZGRlbGl2ZXJ5LmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/settings/Delivery/adddelivery/adddelivery.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/settings/Delivery/adddelivery/adddelivery.component.ts ***!
  \******************************************************************************/
/*! exports provided: AdddeliveryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdddeliveryComponent", function() { return AdddeliveryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_delivery_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/delivery.service */ "./src/app/_services/delivery.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let AdddeliveryComponent = class AdddeliveryComponent {
    constructor(formBuilder, router, route, ls, ts, deliveryService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.deliveryService = deliveryService;
        this.submitted = false;
        this.loading = false;
        this.loadingCustomer = false;
        this.ButtonText = "Save";
        this.BrandsList = [];
        this.createForm();
        this.loadBrands();
        this.selectedBrand = this.ls.getSelectedBrand();
    }
    ngOnInit() {
        this.setSelecteditem();
    }
    get f() { return this.deliveryForm.controls; }
    createForm() {
        this.deliveryForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            amount: [0],
            statusID: [true],
            // brandIDs :[''],
            deliveryAreaID: 0,
            brandID: this.ls.getSelectedBrand().brandID,
            brands: [],
        });
    }
    editForm(obj) {
        this.f.name.setValue(obj.name);
        this.f.amount.setValue(obj.amount);
        this.f.deliveryAreaID.setValue(obj.deliveryAreaID);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        debugger;
        if (obj.brands != "") {
            var stringToConvert = obj.brands;
            this.selectedBrandIds = stringToConvert.split(',').map(Number);
            this.f.brands.setValue(obj.brands);
        }
    }
    setSelecteditem() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loading = true;
                this.f.deliveryAreaID.setValue(sid);
                this.deliveryService.getById(sid).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loading = false;
                    //BrandsFill
                    // this.deliveryService.getBrands(this.ls.getSelectedBrand().brandID)
                    // .subscribe((res: any) => {            
                    //   var stringToConvert = res.items;
                    //   this.selectedBrandIds = stringToConvert.split(',').map(Number);              
                    // });
                });
            }
        });
    }
    onSubmit() {
        this.deliveryForm.markAllAsTouched();
        this.submitted = true;
        if (this.deliveryForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.brands.setValue(this.selectedBrandIds == undefined ? "" : this.selectedBrandIds.toString());
        if (parseInt(this.f.deliveryAreaID.value) === 0) {
            //Insert delivery
            this.deliveryService.insert(this.deliveryForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/delivery']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update delivery
            this.deliveryService.update(this.deliveryForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/delivery']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
    loadBrands() {
        this.deliveryService.loadBrands(this.f.brandID).subscribe((res) => {
            this.BrandsList = res;
            // this.setSelecteditem();
        });
    }
};
AdddeliveryComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_delivery_service__WEBPACK_IMPORTED_MODULE_5__["DeliveryService"] }
];
AdddeliveryComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AdddeliveryComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-adddelivery',
        template: __importDefault(__webpack_require__(/*! raw-loader!./adddelivery.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/Delivery/adddelivery/adddelivery.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./adddelivery.component.css */ "./src/app/admin/settings/Delivery/adddelivery/adddelivery.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_delivery_service__WEBPACK_IMPORTED_MODULE_5__["DeliveryService"]])
], AdddeliveryComponent);



/***/ }),

/***/ "./src/app/admin/settings/appsettings/appsettings.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/admin/settings/appsettings/appsettings.component.css ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3NldHRpbmdzL2FwcHNldHRpbmdzL2FwcHNldHRpbmdzLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/settings/appsettings/appsettings.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/admin/settings/appsettings/appsettings.component.ts ***!
  \*********************************************************************/
/*! exports provided: AppsettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppsettingsComponent", function() { return AppsettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_appsetting_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/appsetting.service */ "./src/app/_services/appsetting.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let AppsettingsComponent = class AppsettingsComponent {
    constructor(ts, appsettingService, router, route, formBuilder, ls) {
        this.ts = ts;
        this.appsettingService = appsettingService;
        this.router = router;
        this.route = route;
        this.formBuilder = formBuilder;
        this.ls = ls;
        this.submitted = false;
        this.loadingCategory = false;
        this.loading = false;
        this.createForm();
        brandID: this.ls.getSelectedBrand().brandID;
        this.setSelectedCategory();
    }
    ngOnInit() {
    }
    get f() { return this.categoryForm.controls; }
    createForm() {
        this.categoryForm = this.formBuilder.group({
            branchName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            branchAddress: [''],
            branchTiming: [''],
            statusID: [true],
            deliveryNo: [''],
            whatsappNo: [''],
            discount: 0,
            discountdescription: [''],
            brandID: this.ls.getSelectedBrand().brandID,
            ID: 0,
            AppInfoID: 0,
            appDescription: [''],
            facebook: [''],
            twitter: [''],
            instagram: [''],
        });
    }
    editForm(obj) {
        debugger;
        this.f.branchName.setValue(obj.branchName);
        this.f.branchAddress.setValue(obj.branchAddress);
        this.f.branchTiming.setValue(obj.branchTiming);
        this.f.deliveryNo.setValue(obj.deliveryNo);
        this.f.discount.setValue(obj.discount);
        this.f.discountdescription.setValue(obj.discountdescription);
        this.f.whatsappNo.setValue(obj.whatsappNo);
        this.f.appDescription.setValue(obj.appDescription);
        this.f.facebook.setValue(obj.facebook);
        this.f.twitter.setValue(obj.twitter);
        this.f.instagram.setValue(obj.instagram);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.f.ID.setValue(obj.id);
        this.f.appInfoID.setValue(obj.appInfoID);
    }
    setSelectedCategory() {
        this.loadingCategory = true;
        this.appsettingService.getById(this.f.brandID.value).subscribe(res => {
            //Set Forms
            this.editForm(res);
            this.loadingCategory = false;
        });
    }
    onSubmit() {
        this.categoryForm.markAllAsTouched();
        this.submitted = true;
        if (this.categoryForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        debugger;
        if (parseInt(this.f.ID.value) === 0) {
            //Insert appsetting
            this.appsettingService.insert(this.categoryForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/appsettings']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update appsetting
            this.appsettingService.update(this.categoryForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/appsettings']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AppsettingsComponent.ctorParameters = () => [
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_2__["ToastService"] },
    { type: src_app_services_appsetting_service__WEBPACK_IMPORTED_MODULE_3__["AppsettingService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__["LocalStorageService"] }
];
AppsettingsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-appsettings',
        template: __importDefault(__webpack_require__(/*! raw-loader!./appsettings.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/appsettings/appsettings.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./appsettings.component.css */ "./src/app/admin/settings/appsettings/appsettings.component.css")).default]
    }),
    __metadata("design:paramtypes", [src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_2__["ToastService"],
        src_app_services_appsetting_service__WEBPACK_IMPORTED_MODULE_3__["AppsettingService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__["LocalStorageService"]])
], AppsettingsComponent);



/***/ }),

/***/ "./src/app/admin/settings/banner/addbanner/addbanner.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/admin/settings/banner/addbanner/addbanner.component.css ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3NldHRpbmdzL2Jhbm5lci9hZGRiYW5uZXIvYWRkYmFubmVyLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/settings/banner/addbanner/addbanner.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/admin/settings/banner/addbanner/addbanner.component.ts ***!
  \************************************************************************/
/*! exports provided: AddbannerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddbannerComponent", function() { return AddbannerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_banner_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/banner.service */ "./src/app/_services/banner.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let AddbannerComponent = class AddbannerComponent {
    constructor(formBuilder, router, route, ls, ts, bannerService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.bannerService = bannerService;
        this.submitted = false;
        this.loading = false;
        this.loadingCustomer = false;
        this.ButtonText = "Save";
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedCustomer();
    }
    get f() { return this.bannerForm.controls; }
    createForm() {
        this.bannerForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: [''],
            statusID: [true],
            bannerID: 0,
            image: [''],
            brandID: this.ls.getSelectedBrand().brandID,
            locationID: null
        });
    }
    editForm(obj) {
        this.f.name.setValue(obj.name);
        this.f.description.setValue(obj.description);
        this.f.bannerID.setValue(obj.bannerID);
        this.f.image.setValue(obj.image);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.imgComp.imageUrl = obj.image;
    }
    setSelectedCustomer() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingCustomer = true;
                this.f.bannerID.setValue(sid);
                this.bannerService.getById(sid, this.f.brandID.value).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingCustomer = false;
                });
            }
        });
    }
    onSubmit() {
        this.bannerForm.markAllAsTouched();
        this.submitted = true;
        if (this.bannerForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.image.setValue(this.imgComp.imageUrl);
        if (parseInt(this.f.bannerID.value) === 0) {
            //Insert banner
            console.log(JSON.stringify(this.bannerForm.value));
            this.bannerService.insert(this.bannerForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/banner']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update banner
            this.bannerService.update(this.bannerForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/banner']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AddbannerComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_banner_service__WEBPACK_IMPORTED_MODULE_5__["BannerService"] }
];
AddbannerComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddbannerComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addbanner',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addbanner.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/banner/addbanner/addbanner.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./addbanner.component.css */ "./src/app/admin/settings/banner/addbanner/addbanner.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_banner_service__WEBPACK_IMPORTED_MODULE_5__["BannerService"]])
], AddbannerComponent);



/***/ }),

/***/ "./src/app/admin/settings/banner/banner.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/settings/banner/banner.component.ts ***!
  \***********************************************************/
/*! exports provided: BannerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerComponent", function() { return BannerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_banner_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/banner.service */ "./src/app/_services/banner.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let BannerComponent = class BannerComponent {
    constructor(service, ls, ts, router) {
        this.service = service;
        this.ls = ls;
        this.ts = ts;
        this.router = router;
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.service.getAllData(this.selectedBrand);
        this.data$ = this.service.data$;
        this.total$ = this.service.total$;
        this.loading$ = this.service.loading$;
    }
    onSort({ column, direction }) {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }
    Edit(banner) {
        this.router.navigate(["admin/banner/edit", banner]);
    }
    Delete(obj) {
        this.service.delete(obj).subscribe((res) => {
            if (res != 0) {
                this.ts.showSuccess("Success", "Record deleted successfully.");
                this.getData();
            }
            else
                this.ts.showError("Error", "Failed to delete record.");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
};
BannerComponent.ctorParameters = () => [
    { type: src_app_services_banner_service__WEBPACK_IMPORTED_MODULE_5__["BannerService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
BannerComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
BannerComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-banner',
        template: __importDefault(__webpack_require__(/*! raw-loader!./banner.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/banner/banner.component.html")).default,
        providers: []
    }),
    __metadata("design:paramtypes", [src_app_services_banner_service__WEBPACK_IMPORTED_MODULE_5__["BannerService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], BannerComponent);



/***/ }),

/***/ "./src/app/admin/settings/delivery/delivery.component.css":
/*!****************************************************************!*\
  !*** ./src/app/admin/settings/delivery/delivery.component.css ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3NldHRpbmdzL2RlbGl2ZXJ5L2RlbGl2ZXJ5LmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/settings/delivery/delivery.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/settings/delivery/delivery.component.ts ***!
  \***************************************************************/
/*! exports provided: DeliveryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryComponent", function() { return DeliveryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_delivery_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/delivery.service */ "./src/app/_services/delivery.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let DeliveryComponent = class DeliveryComponent {
    constructor(service, ls, ts, router) {
        this.service = service;
        this.ls = ls;
        this.ts = ts;
        this.router = router;
        this.selectedBrand = this.ls.getSelectedBrand().brandID;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.service.getAllData(this.selectedBrand);
        this.data$ = this.service.data$;
        this.total$ = this.service.total$;
        this.loading$ = this.service.loading$;
    }
    onSort({ column, direction }) {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }
    Edit(delivery) {
        this.router.navigate(["admin/delivery/edit", delivery]);
    }
    Delete(obj) {
        this.service.delete(obj).subscribe((res) => {
            if (res != 0) {
                this.ts.showSuccess("Success", "Record deleted successfully.");
                this.getData();
            }
            else
                this.ts.showError("Error", "Failed to delete record.");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
};
DeliveryComponent.ctorParameters = () => [
    { type: src_app_services_delivery_service__WEBPACK_IMPORTED_MODULE_5__["DeliveryService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
DeliveryComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
DeliveryComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-delivery',
        template: __importDefault(__webpack_require__(/*! raw-loader!./delivery.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/delivery/delivery.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./delivery.component.css */ "./src/app/admin/settings/delivery/delivery.component.css")).default]
    }),
    __metadata("design:paramtypes", [src_app_services_delivery_service__WEBPACK_IMPORTED_MODULE_5__["DeliveryService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], DeliveryComponent);



/***/ }),

/***/ "./src/app/admin/settings/offers/addoffers/addoffers.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/admin/settings/offers/addoffers/addoffers.component.css ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3NldHRpbmdzL29mZmVycy9hZGRvZmZlcnMvYWRkb2ZmZXJzLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/settings/offers/addoffers/addoffers.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/admin/settings/offers/addoffers/addoffers.component.ts ***!
  \************************************************************************/
/*! exports provided: AddoffersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddoffersComponent", function() { return AddoffersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_offers_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/offers.service */ "./src/app/_services/offers.service.ts");
/* harmony import */ var src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/datepicker-range/datepicker-range-popup */ "./src/app/datepicker-range/datepicker-range-popup.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








let AddoffersComponent = class AddoffersComponent {
    constructor(formBuilder, router, route, ls, ts, offersService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.offersService = offersService;
        this.submitted = false;
        this.loading = false;
        this.loadingOffers = false;
        this.ButtonText = "Save";
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedOffers();
    }
    get f() { return this.offersForm.controls; }
    createForm() {
        this.offersForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: [''],
            statusID: [true],
            offerID: 0,
            image: [''],
            fromDate: [''],
            toDate: [''],
            brandID: this.ls.getSelectedBrand().brandID,
            locationID: null
        });
    }
    editForm(obj) {
        debugger;
        this.f.name.setValue(obj.name);
        this.f.description.setValue(obj.description);
        this.f.offerID.setValue(obj.offerID);
        this.f.fromDate.setValue(obj.fromDate);
        this.f.toDate.setValue(obj.toDate);
        this.f.image.setValue(obj.image);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.imgComp.imageUrl = obj.image;
    }
    setSelectedOffers() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingOffers = true;
                this.f.offerID.setValue(sid);
                this.offersService.getById(sid, this.f.brandID.value).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingOffers = false;
                });
            }
        });
    }
    onSubmit() {
        this.offersForm.markAllAsTouched();
        this.submitted = true;
        if (this.offersForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.image.setValue(this.imgComp.imageUrl);
        this.f.fromDate.setValue(this.parseDate(this._datepicker.fromDate));
        this.f.toDate.setValue(this.parseDate(this._datepicker.toDate));
        if (parseInt(this.f.offerID.value) === 0) {
            //Insert offers
            debugger;
            this.offersService.insert(this.offersForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/offers']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update offers
            this.offersService.update(this.offersForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/offers']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
    parseDate(obj) {
        return obj.year + "-" + obj.month + "-" + obj.day;
        ;
    }
};
AddoffersComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: src_app_services_offers_service__WEBPACK_IMPORTED_MODULE_6__["OffersService"] }
];
AddoffersComponent.propDecorators = {
    _datepicker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_7__["NgbdDatepickerRangePopup"], { static: true },] }],
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddoffersComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addoffers',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addoffers.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/offers/addoffers/addoffers.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./addoffers.component.css */ "./src/app/admin/settings/offers/addoffers/addoffers.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        src_app_services_offers_service__WEBPACK_IMPORTED_MODULE_6__["OffersService"]])
], AddoffersComponent);



/***/ }),

/***/ "./src/app/admin/settings/offers/offers.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/settings/offers/offers.component.ts ***!
  \***********************************************************/
/*! exports provided: OffersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OffersComponent", function() { return OffersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_offers_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/offers.service */ "./src/app/_services/offers.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let OffersComponent = class OffersComponent {
    constructor(service, ls, ts, router) {
        //this.selectedBrand = this.ls.getSelectedBrand().brandID;
        this.service = service;
        this.ls = ls;
        this.ts = ts;
        this.router = router;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.service.getAllData(this.selectedBrand);
        this.data$ = this.service.data$;
        this.total$ = this.service.total$;
        this.loading$ = this.service.loading$;
    }
    onSort({ column, direction }) {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }
    Edit(offers) {
        this.router.navigate(["admin/offers/edit", offers]);
    }
    Delete(obj) {
        this.service.delete(obj).subscribe((res) => {
            if (res != 0) {
                this.ts.showSuccess("Success", "Record deleted successfully.");
                this.getData();
            }
            else
                this.ts.showError("Error", "Failed to delete record.");
        }, error => {
            this.ts.showError("Error", "Failed to delete record.");
        });
    }
};
OffersComponent.ctorParameters = () => [
    { type: src_app_services_offers_service__WEBPACK_IMPORTED_MODULE_5__["OffersService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
OffersComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
OffersComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-offers',
        template: __importDefault(__webpack_require__(/*! raw-loader!./offers.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/offers/offers.component.html")).default,
        providers: []
    }),
    __metadata("design:paramtypes", [src_app_services_offers_service__WEBPACK_IMPORTED_MODULE_5__["OffersService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], OffersComponent);



/***/ }),

/***/ "./src/app/admin/settings/offers/promotions/promotions.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/admin/settings/offers/promotions/promotions.component.css ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3NldHRpbmdzL29mZmVycy9wcm9tb3Rpb25zL3Byb21vdGlvbnMuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/admin/settings/offers/promotions/promotions.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/admin/settings/offers/promotions/promotions.component.ts ***!
  \**************************************************************************/
/*! exports provided: PromotionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromotionsComponent", function() { return PromotionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let PromotionsComponent = class PromotionsComponent {
    constructor() { }
    ngOnInit() {
    }
};
PromotionsComponent.ctorParameters = () => [];
PromotionsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-promotions',
        template: __importDefault(__webpack_require__(/*! raw-loader!./promotions.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/offers/promotions/promotions.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./promotions.component.css */ "./src/app/admin/settings/offers/promotions/promotions.component.css")).default]
    }),
    __metadata("design:paramtypes", [])
], PromotionsComponent);



/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let AppComponent = class AppComponent {
    constructor() {
        this.title = 'app';
    }
};
AppComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-root',
        template: __importDefault(__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _nav_menu_nav_menu_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nav-menu/nav-menu.component */ "./src/app/nav-menu/nav-menu.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _counter_counter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./counter/counter.component */ "./src/app/counter/counter.component.ts");
/* harmony import */ var _fetch_data_fetch_data_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./fetch-data/fetch-data.component */ "./src/app/fetch-data/fetch-data.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _admin_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./admin/dashboard/dashboard.component */ "./src/app/admin/dashboard/dashboard.component.ts");
/* harmony import */ var _layout_layout_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./layout/layout.component */ "./src/app/layout/layout.component.ts");
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/service-worker */ "./node_modules/@angular/service-worker/__ivy_ngcc__/fesm2015/service-worker.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _admin_menu_category_category_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./admin/menu/category/category.component */ "./src/app/admin/menu/category/category.component.ts");
/* harmony import */ var _admin_menu_category_addcategory_addcategory_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./admin/menu/category/addcategory/addcategory.component */ "./src/app/admin/menu/category/addcategory/addcategory.component.ts");
/* harmony import */ var _imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _admin_menu_items_items_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./admin/menu/items/items.component */ "./src/app/admin/menu/items/items.component.ts");
/* harmony import */ var _admin_menu_items_additem_additem_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./admin/menu/items/additem/additem.component */ "./src/app/admin/menu/items/additem/additem.component.ts");
/* harmony import */ var _admin_menu_modifiers_modifiers_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./admin/menu/modifiers/modifiers.component */ "./src/app/admin/menu/modifiers/modifiers.component.ts");
/* harmony import */ var _admin_menu_modifiers_addmodifier_addmodifier_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./admin/menu/modifiers/addmodifier/addmodifier.component */ "./src/app/admin/menu/modifiers/addmodifier/addmodifier.component.ts");
/* harmony import */ var _admin_customer_customers_customers_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./admin/customer/customers/customers.component */ "./src/app/admin/customer/customers/customers.component.ts");
/* harmony import */ var _admin_customer_customers_addcustomers_addcustomer_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./admin/customer/customers/addcustomers/addcustomer.component */ "./src/app/admin/customer/customers/addcustomers/addcustomer.component.ts");
/* harmony import */ var _admin_company_locations_locations_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./admin/company/locations/locations.component */ "./src/app/admin/company/locations/locations.component.ts");
/* harmony import */ var _admin_company_locations_addlocation_addlocation_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./admin/company/locations/addlocation/addlocation.component */ "./src/app/admin/company/locations/addlocation/addlocation.component.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/__ivy_ngcc__/fesm2015/ng-select-ng-select.js");
/* harmony import */ var _admin_company_brands_addbrand_addbrand_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./admin/company/brands/addbrand/addbrand.component */ "./src/app/admin/company/brands/addbrand/addbrand.component.ts");
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ng-apexcharts */ "./node_modules/ng-apexcharts/__ivy_ngcc__/fesm2015/ng-apexcharts.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/__ivy_ngcc__/fesm2015/ngx-toastr.js");
/* harmony import */ var _admin_company_brands_brands_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./admin/company/brands/brands.component */ "./src/app/admin/company/brands/brands.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _admin_report_summary_summary_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./admin/report/summary/summary.component */ "./src/app/admin/report/summary/summary.component.ts");
/* harmony import */ var _datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./datepicker-range/datepicker-range-popup */ "./src/app/datepicker-range/datepicker-range-popup.ts");
/* harmony import */ var _admin_settings_banner_banner_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./admin/settings/banner/banner.component */ "./src/app/admin/settings/banner/banner.component.ts");
/* harmony import */ var _admin_settings_banner_addbanner_addbanner_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./admin/settings/banner/addbanner/addbanner.component */ "./src/app/admin/settings/banner/addbanner/addbanner.component.ts");
/* harmony import */ var _admin_report_salesdetail_salesdetail_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./admin/report/salesdetail/salesdetail.component */ "./src/app/admin/report/salesdetail/salesdetail.component.ts");
/* harmony import */ var _admin_report_salesuserwise_salesuserwise_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./admin/report/salesuserwise/salesuserwise.component */ "./src/app/admin/report/salesuserwise/salesuserwise.component.ts");
/* harmony import */ var _admin_report_salescustomerwise_salescustomerwise_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./admin/report/salescustomerwise/salescustomerwise.component */ "./src/app/admin/report/salescustomerwise/salescustomerwise.component.ts");
/* harmony import */ var _admin_report_salescategorywise_salescategorywise_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./admin/report/salescategorywise/salescategorywise.component */ "./src/app/admin/report/salescategorywise/salescategorywise.component.ts");
/* harmony import */ var _admin_report_salesitemwise_salesitemwise_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./admin/report/salesitemwise/salesitemwise.component */ "./src/app/admin/report/salesitemwise/salesitemwise.component.ts");
/* harmony import */ var _admin_settings_offers_offers_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./admin/settings/offers/offers.component */ "./src/app/admin/settings/offers/offers.component.ts");
/* harmony import */ var _admin_settings_offers_addoffers_addoffers_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./admin/settings/offers/addoffers/addoffers.component */ "./src/app/admin/settings/offers/addoffers/addoffers.component.ts");
/* harmony import */ var _admin_sales_orders_orders_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./admin/sales/orders/orders.component */ "./src/app/admin/sales/orders/orders.component.ts");
/* harmony import */ var _admin_sales_orderdetails_orderdetails_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./admin/sales/orderdetails/orderdetails.component */ "./src/app/admin/sales/orderdetails/orderdetails.component.ts");
/* harmony import */ var _admin_menu_items_itemsettings_itemsettings_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./admin/menu/items/itemsettings/itemsettings.component */ "./src/app/admin/menu/items/itemsettings/itemsettings.component.ts");
/* harmony import */ var _admin_settings_delivery_delivery_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./admin/settings/delivery/delivery.component */ "./src/app/admin/settings/delivery/delivery.component.ts");
/* harmony import */ var _admin_settings_Delivery_adddelivery_adddelivery_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./admin/settings/Delivery/adddelivery/adddelivery.component */ "./src/app/admin/settings/Delivery/adddelivery/adddelivery.component.ts");
/* harmony import */ var _admin_settings_appsettings_appsettings_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./admin/settings/appsettings/appsettings.component */ "./src/app/admin/settings/appsettings/appsettings.component.ts");
/* harmony import */ var _admin_menu_addons_addons_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./admin/menu/addons/addons.component */ "./src/app/admin/menu/addons/addons.component.ts");
/* harmony import */ var _admin_menu_addons_addaddons_addaddons_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./admin/menu/addons/addaddons/addaddons.component */ "./src/app/admin/menu/addons/addaddons/addaddons.component.ts");
/* harmony import */ var _admin_managedoctor_doctor_doctor_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./admin/managedoctor/doctor/doctor.component */ "./src/app/admin/managedoctor/doctor/doctor.component.ts");
/* harmony import */ var _admin_pharmacy_customerinquiry_customerinquiry_component__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./admin/pharmacy/customerinquiry/customerinquiry.component */ "./src/app/admin/pharmacy/customerinquiry/customerinquiry.component.ts");
/* harmony import */ var _admin_pharmacy_prescription_prescription_component__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./admin/pharmacy/prescription/prescription.component */ "./src/app/admin/pharmacy/prescription/prescription.component.ts");
/* harmony import */ var _admin_reception_drappoinment_drappoinment_component__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./admin/reception/drappoinment/drappoinment.component */ "./src/app/admin/reception/drappoinment/drappoinment.component.ts");
/* harmony import */ var _admin_reception_laboratoryinquiry_laboratoryinquiry_component__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./admin/reception/laboratoryinquiry/laboratoryinquiry.component */ "./src/app/admin/reception/laboratoryinquiry/laboratoryinquiry.component.ts");
/* harmony import */ var _admin_laboratory_uploadreport_uploadreport_component__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./admin/laboratory/uploadreport/uploadreport.component */ "./src/app/admin/laboratory/uploadreport/uploadreport.component.ts");
/* harmony import */ var _admin_pharmacy_deliverydetail_deliverydetail_component__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./admin/pharmacy/deliverydetail/deliverydetail.component */ "./src/app/admin/pharmacy/deliverydetail/deliverydetail.component.ts");
/* harmony import */ var _admin_settings_offers_promotions_promotions_component__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./admin/settings/offers/promotions/promotions.component */ "./src/app/admin/settings/offers/promotions/promotions.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















































//import { ModalContentComponent } from './admin/sales/orders/modal-content/modal-OrderDetail.component';
//import { NgbdModalContent } from './admin/sales/orders/modal-content/ngbd-OrderDetail-content.component';








//import { MedicineComponent } from './admin/pharmacy/medicine/medicine.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            _nav_menu_nav_menu_component__WEBPACK_IMPORTED_MODULE_6__["NavMenuComponent"],
            _home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"],
            _admin_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_11__["DashboardComponent"],
            _layout_layout_component__WEBPACK_IMPORTED_MODULE_12__["LayoutComponent"],
            _counter_counter_component__WEBPACK_IMPORTED_MODULE_8__["CounterComponent"],
            _login_login_component__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"],
            _fetch_data_fetch_data_component__WEBPACK_IMPORTED_MODULE_9__["FetchDataComponent"],
            _admin_menu_category_category_component__WEBPACK_IMPORTED_MODULE_16__["CategoryComponent"],
            _admin_menu_category_addcategory_addcategory_component__WEBPACK_IMPORTED_MODULE_17__["AddcategoryComponent"],
            _admin_menu_items_items_component__WEBPACK_IMPORTED_MODULE_19__["ItemsComponent"],
            _admin_menu_items_additem_additem_component__WEBPACK_IMPORTED_MODULE_20__["AdditemsComponent"],
            _admin_menu_modifiers_modifiers_component__WEBPACK_IMPORTED_MODULE_21__["ModifiersComponent"],
            _admin_menu_modifiers_addmodifier_addmodifier_component__WEBPACK_IMPORTED_MODULE_22__["AddmodifierComponent"],
            _admin_customer_customers_customers_component__WEBPACK_IMPORTED_MODULE_23__["CustomersComponent"],
            _admin_customer_customers_addcustomers_addcustomer_component__WEBPACK_IMPORTED_MODULE_24__["AddcustomerComponent"],
            _admin_company_brands_brands_component__WEBPACK_IMPORTED_MODULE_31__["BrandComponent"],
            _admin_company_brands_addbrand_addbrand_component__WEBPACK_IMPORTED_MODULE_28__["AddbrandComponent"],
            _admin_company_locations_locations_component__WEBPACK_IMPORTED_MODULE_25__["LocationsComponent"],
            _admin_company_locations_addlocation_addlocation_component__WEBPACK_IMPORTED_MODULE_26__["AddlocationComponent"],
            _imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_18__["ImageuploadComponent"],
            _admin_report_summary_summary_component__WEBPACK_IMPORTED_MODULE_33__["SummaryComponent"],
            _datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_34__["NgbdDatepickerRangePopup"],
            _admin_settings_banner_banner_component__WEBPACK_IMPORTED_MODULE_35__["BannerComponent"],
            _admin_settings_banner_addbanner_addbanner_component__WEBPACK_IMPORTED_MODULE_36__["AddbannerComponent"],
            _admin_settings_offers_offers_component__WEBPACK_IMPORTED_MODULE_42__["OffersComponent"],
            _admin_settings_offers_addoffers_addoffers_component__WEBPACK_IMPORTED_MODULE_43__["AddoffersComponent"],
            _admin_report_salesdetail_salesdetail_component__WEBPACK_IMPORTED_MODULE_37__["SalesdetailComponent"],
            _admin_report_salescategorywise_salescategorywise_component__WEBPACK_IMPORTED_MODULE_40__["SalescategorywiseComponent"],
            _admin_report_salescustomerwise_salescustomerwise_component__WEBPACK_IMPORTED_MODULE_39__["SalescustomerwiseComponent"],
            _admin_report_salesitemwise_salesitemwise_component__WEBPACK_IMPORTED_MODULE_41__["SalesitemwiseComponent"],
            _admin_report_salesuserwise_salesuserwise_component__WEBPACK_IMPORTED_MODULE_38__["SalesuserwiseComponent"],
            _admin_sales_orders_orders_component__WEBPACK_IMPORTED_MODULE_44__["OrdersComponent"],
            _admin_sales_orderdetails_orderdetails_component__WEBPACK_IMPORTED_MODULE_45__["OrderdetailsComponent"],
            _admin_menu_items_itemsettings_itemsettings_component__WEBPACK_IMPORTED_MODULE_46__["ItemsettingsComponent"],
            _admin_settings_delivery_delivery_component__WEBPACK_IMPORTED_MODULE_47__["DeliveryComponent"],
            _admin_settings_Delivery_adddelivery_adddelivery_component__WEBPACK_IMPORTED_MODULE_48__["AdddeliveryComponent"],
            _admin_settings_appsettings_appsettings_component__WEBPACK_IMPORTED_MODULE_49__["AppsettingsComponent"],
            _admin_menu_addons_addons_component__WEBPACK_IMPORTED_MODULE_50__["AddonsComponent"],
            _admin_menu_addons_addaddons_addaddons_component__WEBPACK_IMPORTED_MODULE_51__["AddaddonsComponent"],
            //ModalContentComponent,
            // NgbdModalContent,
            _admin_managedoctor_doctor_doctor_component__WEBPACK_IMPORTED_MODULE_52__["DoctorComponent"],
            _admin_pharmacy_customerinquiry_customerinquiry_component__WEBPACK_IMPORTED_MODULE_53__["CustomerinquiryComponent"],
            _admin_pharmacy_prescription_prescription_component__WEBPACK_IMPORTED_MODULE_54__["PrescriptionComponent"],
            _admin_reception_drappoinment_drappoinment_component__WEBPACK_IMPORTED_MODULE_55__["DrappoinmentComponent"],
            _admin_reception_laboratoryinquiry_laboratoryinquiry_component__WEBPACK_IMPORTED_MODULE_56__["LaboratoryinquiryComponent"],
            _admin_laboratory_uploadreport_uploadreport_component__WEBPACK_IMPORTED_MODULE_57__["UploadreportComponent"],
            _admin_settings_offers_promotions_promotions_component__WEBPACK_IMPORTED_MODULE_59__["PromotionsComponent"],
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"].withServerTransition({ appId: 'ng-cli-universal' }),
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_27__["NgSelectModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_30__["ToastrModule"].forRoot(),
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_32__["BrowserAnimationsModule"],
            ng_apexcharts__WEBPACK_IMPORTED_MODULE_29__["NgApexchartsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forRoot([
                { path: '', component: _login_login_component__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"], pathMatch: 'full' },
                {
                    path: 'admin', component: _layout_layout_component__WEBPACK_IMPORTED_MODULE_12__["LayoutComponent"],
                    children: [
                        { path: 'dashboard', component: _admin_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_11__["DashboardComponent"] },
                        { path: 'category', component: _admin_menu_category_category_component__WEBPACK_IMPORTED_MODULE_16__["CategoryComponent"] },
                        { path: 'category/add', component: _admin_menu_category_addcategory_addcategory_component__WEBPACK_IMPORTED_MODULE_17__["AddcategoryComponent"] },
                        { path: 'category/edit/:id', component: _admin_menu_category_addcategory_addcategory_component__WEBPACK_IMPORTED_MODULE_17__["AddcategoryComponent"] },
                        { path: 'item', component: _admin_menu_items_items_component__WEBPACK_IMPORTED_MODULE_19__["ItemsComponent"] },
                        { path: 'item/add', component: _admin_menu_items_additem_additem_component__WEBPACK_IMPORTED_MODULE_20__["AdditemsComponent"] },
                        { path: 'item/settings', component: _admin_menu_items_itemsettings_itemsettings_component__WEBPACK_IMPORTED_MODULE_46__["ItemsettingsComponent"] },
                        { path: 'item/edit/:id', component: _admin_menu_items_additem_additem_component__WEBPACK_IMPORTED_MODULE_20__["AdditemsComponent"] },
                        { path: 'modifier', component: _admin_menu_modifiers_modifiers_component__WEBPACK_IMPORTED_MODULE_21__["ModifiersComponent"] },
                        { path: 'modifier/add', component: _admin_menu_modifiers_addmodifier_addmodifier_component__WEBPACK_IMPORTED_MODULE_22__["AddmodifierComponent"] },
                        { path: 'modifier/edit/:id', component: _admin_menu_modifiers_addmodifier_addmodifier_component__WEBPACK_IMPORTED_MODULE_22__["AddmodifierComponent"] },
                        //{ path: 'orders', component: OrdersComponent },
                        { path: 'orders/add', component: _admin_sales_orderdetails_orderdetails_component__WEBPACK_IMPORTED_MODULE_45__["OrderdetailsComponent"] },
                        { path: 'orders/view/:id', component: _admin_sales_orderdetails_orderdetails_component__WEBPACK_IMPORTED_MODULE_45__["OrderdetailsComponent"] },
                        { path: 'customer', component: _admin_customer_customers_customers_component__WEBPACK_IMPORTED_MODULE_23__["CustomersComponent"] },
                        { path: 'customer/add', component: _admin_customer_customers_addcustomers_addcustomer_component__WEBPACK_IMPORTED_MODULE_24__["AddcustomerComponent"] },
                        { path: 'customer/edit/:id', component: _admin_customer_customers_addcustomers_addcustomer_component__WEBPACK_IMPORTED_MODULE_24__["AddcustomerComponent"] },
                        { path: 'location', component: _admin_company_locations_locations_component__WEBPACK_IMPORTED_MODULE_25__["LocationsComponent"] },
                        { path: 'location/add', component: _admin_company_locations_addlocation_addlocation_component__WEBPACK_IMPORTED_MODULE_26__["AddlocationComponent"] },
                        { path: 'location/edit/:id', component: _admin_company_locations_addlocation_addlocation_component__WEBPACK_IMPORTED_MODULE_26__["AddlocationComponent"] },
                        { path: 'brand', component: _admin_company_brands_brands_component__WEBPACK_IMPORTED_MODULE_31__["BrandComponent"] },
                        { path: 'brand/add', component: _admin_company_brands_addbrand_addbrand_component__WEBPACK_IMPORTED_MODULE_28__["AddbrandComponent"] },
                        { path: 'brand/edit/:id', component: _admin_company_brands_addbrand_addbrand_component__WEBPACK_IMPORTED_MODULE_28__["AddbrandComponent"] },
                        { path: 'banner', component: _admin_settings_banner_banner_component__WEBPACK_IMPORTED_MODULE_35__["BannerComponent"] },
                        { path: 'banner/add', component: _admin_settings_banner_addbanner_addbanner_component__WEBPACK_IMPORTED_MODULE_36__["AddbannerComponent"] },
                        { path: 'banner/edit/:id', component: _admin_settings_banner_addbanner_addbanner_component__WEBPACK_IMPORTED_MODULE_36__["AddbannerComponent"] },
                        { path: 'offers', component: _admin_settings_offers_offers_component__WEBPACK_IMPORTED_MODULE_42__["OffersComponent"] },
                        { path: 'offers/add', component: _admin_settings_offers_addoffers_addoffers_component__WEBPACK_IMPORTED_MODULE_43__["AddoffersComponent"] },
                        { path: 'offers/edit/:id', component: _admin_settings_offers_addoffers_addoffers_component__WEBPACK_IMPORTED_MODULE_43__["AddoffersComponent"] },
                        { path: 'report/summary', component: _admin_report_summary_summary_component__WEBPACK_IMPORTED_MODULE_33__["SummaryComponent"] },
                        { path: 'report/salesdetail', component: _admin_report_salesdetail_salesdetail_component__WEBPACK_IMPORTED_MODULE_37__["SalesdetailComponent"] },
                        { path: 'report/salesuserwise', component: _admin_report_salesuserwise_salesuserwise_component__WEBPACK_IMPORTED_MODULE_38__["SalesuserwiseComponent"] },
                        { path: 'report/salescustomerwise', component: _admin_report_salescustomerwise_salescustomerwise_component__WEBPACK_IMPORTED_MODULE_39__["SalescustomerwiseComponent"] },
                        { path: 'report/salescategorywise', component: _admin_report_salescategorywise_salescategorywise_component__WEBPACK_IMPORTED_MODULE_40__["SalescategorywiseComponent"] },
                        { path: 'report/salesitemwise', component: _admin_report_salesitemwise_salesitemwise_component__WEBPACK_IMPORTED_MODULE_41__["SalesitemwiseComponent"] },
                        { path: 'delivery', component: _admin_settings_delivery_delivery_component__WEBPACK_IMPORTED_MODULE_47__["DeliveryComponent"] },
                        { path: 'delivery/add', component: _admin_settings_Delivery_adddelivery_adddelivery_component__WEBPACK_IMPORTED_MODULE_48__["AdddeliveryComponent"] },
                        { path: 'delivery/edit/:id', component: _admin_settings_Delivery_adddelivery_adddelivery_component__WEBPACK_IMPORTED_MODULE_48__["AdddeliveryComponent"] },
                        { path: 'appsettings', component: _admin_settings_appsettings_appsettings_component__WEBPACK_IMPORTED_MODULE_49__["AppsettingsComponent"] },
                        { path: 'addons', component: _admin_menu_addons_addons_component__WEBPACK_IMPORTED_MODULE_50__["AddonsComponent"] },
                        { path: 'addons/add', component: _admin_menu_addons_addaddons_addaddons_component__WEBPACK_IMPORTED_MODULE_51__["AddaddonsComponent"] },
                        { path: 'addons/edit/:id', component: _admin_menu_addons_addaddons_addaddons_component__WEBPACK_IMPORTED_MODULE_51__["AddaddonsComponent"] },
                        { path: 'managedoctor/doctor', component: _admin_managedoctor_doctor_doctor_component__WEBPACK_IMPORTED_MODULE_52__["DoctorComponent"] },
                        { path: 'pharmacy/customerinquiry', component: _admin_pharmacy_customerinquiry_customerinquiry_component__WEBPACK_IMPORTED_MODULE_53__["CustomerinquiryComponent"] },
                        { path: 'pharmacy/prescription', component: _admin_pharmacy_prescription_prescription_component__WEBPACK_IMPORTED_MODULE_54__["PrescriptionComponent"] },
                        { path: 'reception/customerinquiry', component: _admin_pharmacy_customerinquiry_customerinquiry_component__WEBPACK_IMPORTED_MODULE_53__["CustomerinquiryComponent"] },
                        { path: 'reception/drappoinment', component: _admin_reception_drappoinment_drappoinment_component__WEBPACK_IMPORTED_MODULE_55__["DrappoinmentComponent"] },
                        { path: 'reception/laboratoryinquiry', component: _admin_reception_laboratoryinquiry_laboratoryinquiry_component__WEBPACK_IMPORTED_MODULE_56__["LaboratoryinquiryComponent"] },
                        { path: 'laboratory/customerinquiry', component: _admin_pharmacy_customerinquiry_customerinquiry_component__WEBPACK_IMPORTED_MODULE_53__["CustomerinquiryComponent"] },
                        { path: 'laboratory/uploadreport', component: _admin_laboratory_uploadreport_uploadreport_component__WEBPACK_IMPORTED_MODULE_57__["UploadreportComponent"] },
                        { path: 'pharmacy/deliverydetail', component: _admin_pharmacy_deliverydetail_deliverydetail_component__WEBPACK_IMPORTED_MODULE_58__["DeliverydetailComponent"] },
                        { path: 'setting/promotions', component: _admin_settings_offers_promotions_promotions_component__WEBPACK_IMPORTED_MODULE_59__["PromotionsComponent"] },
                        // { path: 'pharmacy/medicine', component: MedicineComponent },
                        { path: 'sales/orders', component: _admin_sales_orders_orders_component__WEBPACK_IMPORTED_MODULE_44__["OrdersComponent"] },
                    ]
                }
            ]),
            _angular_service_worker__WEBPACK_IMPORTED_MODULE_13__["ServiceWorkerModule"].register('ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].production }),
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__["NgbModule"]
        ],
        providers: [],
        exports: [_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_34__["NgbdDatepickerRangePopup"]],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_34__["NgbdDatepickerRangePopup"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/counter/counter.component.ts":
/*!**********************************************!*\
  !*** ./src/app/counter/counter.component.ts ***!
  \**********************************************/
/*! exports provided: CounterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CounterComponent", function() { return CounterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let CounterComponent = class CounterComponent {
    constructor() {
        this.currentCount = 0;
    }
    incrementCounter() {
        this.currentCount++;
    }
};
CounterComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-counter-component',
        template: __importDefault(__webpack_require__(/*! raw-loader!./counter.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/counter/counter.component.html")).default
    })
], CounterComponent);



/***/ }),

/***/ "./src/app/datepicker-range/datepicker-range-popup.ts":
/*!************************************************************!*\
  !*** ./src/app/datepicker-range/datepicker-range-popup.ts ***!
  \************************************************************/
/*! exports provided: NgbdDatepickerRangePopup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgbdDatepickerRangePopup", function() { return NgbdDatepickerRangePopup; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


let NgbdDatepickerRangePopup = class NgbdDatepickerRangePopup {
    constructor(calendar, formatter) {
        //var date = new Date();
        //this.fromDate = new NgbDate(date.getFullYear(), date.getMonth(), 1);
        //this.toDate = new NgbDate(date.getFullYear(), date.getMonth() + 1 ,0);
        this.calendar = calendar;
        this.formatter = formatter;
        this.hoveredDate = null;
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 0);
    }
    onDateSelection(date) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        }
        else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
            this.toDate = date;
        }
        else {
            this.toDate = null;
            this.fromDate = date;
        }
    }
    isHovered(date) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }
    isInside(date) {
        return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }
    isRange(date) {
        return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
    }
    validateInput(currentValue, input) {
        const parsed = this.formatter.parse(input);
        return parsed && this.calendar.isValid(_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbDate"].from(parsed)) ? _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbDate"].from(parsed) : currentValue;
    }
};
NgbdDatepickerRangePopup.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbCalendar"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbDateParserFormatter"] }
];
NgbdDatepickerRangePopup = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'ngbd-datepicker-range-popup',
        template: __importDefault(__webpack_require__(/*! raw-loader!./datepicker-range-popup.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/datepicker-range/datepicker-range-popup.html")).default,
        styles: ["\n    .form-group.hidden {\n      width: 0;\n      margin: 0;\n      border: none;\n      padding: 0;\n    }\n    .custom-day {\n      text-align: center;\n      padding: 0.185rem 0.25rem;\n      display: inline-block;\n      height: 2rem;\n      width: 2rem;\n    }\n    .custom-day.focused {\n      background-color: #e6e6e6;\n    }\n    .custom-day.range, .custom-day:hover {\n      background-color: rgb(2, 117, 216);\n      color: white;\n    }\n    .custom-day.faded {\n      background-color: rgba(2, 117, 216, 0.5);\n    }\n  "]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbCalendar"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbDateParserFormatter"]])
], NgbdDatepickerRangePopup);



/***/ }),

/***/ "./src/app/fetch-data/fetch-data.component.ts":
/*!****************************************************!*\
  !*** ./src/app/fetch-data/fetch-data.component.ts ***!
  \****************************************************/
/*! exports provided: FetchDataComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchDataComponent", function() { return FetchDataComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


let FetchDataComponent = class FetchDataComponent {
    constructor(http, baseUrl) {
        http.get(baseUrl + 'weatherforecast').subscribe(result => {
            this.forecasts = result;
        }, error => console.error(error));
    }
};
FetchDataComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: ['BASE_URL',] }] }
];
FetchDataComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-fetch-data',
        template: __importDefault(__webpack_require__(/*! raw-loader!./fetch-data.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/fetch-data/fetch-data.component.html")).default
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], String])
], FetchDataComponent);



/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let HomeComponent = class HomeComponent {
};
HomeComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-home',
        template: __importDefault(__webpack_require__(/*! raw-loader!./home.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.component.html")).default,
    })
], HomeComponent);



/***/ }),

/***/ "./src/app/imageupload/imageupload.component.ts":
/*!******************************************************!*\
  !*** ./src/app/imageupload/imageupload.component.ts ***!
  \******************************************************/
/*! exports provided: ImageuploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageuploadComponent", function() { return ImageuploadComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


let ImageuploadComponent = class ImageuploadComponent {
    constructor(fb, cd) {
        this.fb = fb;
        this.cd = cd;
        this.imageUrl = "https://marnpossastorage.blob.core.windows.net/marnpos-v2-images/default-product.PNG";
        this.editFile = true;
        this.removeUpload = false;
        this.currentFile = null;
        this.registrationForm = this.fb.group({
            file: [null]
        });
    }
    onFileChange(event) {
        let reader = new FileReader(); // HTML5 FileReader API
        let file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);
            // When file uploads set it to file formcontrol
            reader.onload = () => {
                this.imageUrl = reader.result;
                this.registrationForm.patchValue({
                    file: reader.result
                });
                this.editFile = false;
                this.removeUpload = true;
            };
            // ChangeDetectorRef since file is loading outside the zone
            this.cd.markForCheck();
        }
    }
};
ImageuploadComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }
];
ImageuploadComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-imageupload',
        template: __importDefault(__webpack_require__(/*! raw-loader!./imageupload.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/imageupload/imageupload.component.html")).default
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
], ImageuploadComponent);



/***/ }),

/***/ "./src/app/layout/layout.component.css":
/*!*********************************************!*\
  !*** ./src/app/layout/layout.component.css ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".nav-bar-inner-spaces{\r\n  display: -webkit-box;  \r\n}\r\n\r\n.horizontal-menu .bottom-navbar .page-navigation > .nav-item{\r\n    margin-right: 10px;\r\n}\r\n\r\n.flag-icon-us {\r\n  font-size: 17PX !important;\r\n}\r\n\r\n.flag-icon-sa {\r\n  font-size: 17PX !important;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2xheW91dC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUNBO0VBQ0UsMEJBQTBCO0FBQzVCOztBQUNBO0VBQ0UsMEJBQTBCO0FBQzVCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2xheW91dC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5hdi1iYXItaW5uZXItc3BhY2Vze1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94OyAgXHJcbn1cclxuXHJcbi5ob3Jpem9udGFsLW1lbnUgLmJvdHRvbS1uYXZiYXIgLnBhZ2UtbmF2aWdhdGlvbiA+IC5uYXYtaXRlbXtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG4uZmxhZy1pY29uLXVzIHtcclxuICBmb250LXNpemU6IDE3UFggIWltcG9ydGFudDtcclxufVxyXG4uZmxhZy1pY29uLXNhIHtcclxuICBmb250LXNpemU6IDE3UFggIWltcG9ydGFudDtcclxufSJdfQ== */");

/***/ }),

/***/ "./src/app/layout/layout.component.ts":
/*!********************************************!*\
  !*** ./src/app/layout/layout.component.ts ***!
  \********************************************/
/*! exports provided: LayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutComponent", function() { return LayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _services_locations_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/locations.service */ "./src/app/_services/locations.service.ts");
/* harmony import */ var _services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




let LayoutComponent = class LayoutComponent {
    constructor(router, service, ls) {
        this.router = router;
        this.service = service;
        this.ls = ls;
        this._Langname = "";
        this.branchname = "";
        this.email = "";
        //this.branchname = this.ls.getSelectedBrand().name;
        //this.email = this.ls.getSelectedBrand().email;
    }
    ngOnInit() {
        var data = this.ls.getSelectedBrand();
        //this.loadLocations();
        // if (data == null)
        //   this.router.navigate(["/"]);
    }
    Logout() {
        sessionStorage.clear();
        this.router.navigate(['/']);
    }
    loadLocations() {
        // var loc = this.ls.getLocation();
        // if (loc != null) {
        //   this.Locations = this.ls.getLocation();
        //   this.locationID = this.ls.getSelectedLocation().locationID;
        // }
        // else {
        //   this.service.getAllLocations(this.ls.getSelectedBrand().brandID).subscribe((res: any) => {
        //     debugger
        //     if (res.length > 0) {
        //       this.ls.setLocation(res);
        //       this.ls.setSelectedLocation(res[0]);
        //       this.locationID =res[0].locationID;
        //       this.Locations =res;
        //     }
        //     else {
        //       this.router.navigate(['/']);
        //     }
        //   });
        // }
        //this.Locations = this.ls.getLocation();
        //this.locationID = this.ls.getSelectedLocation().locationID;
    }
    changeloc(LocObj) {
        //this.locationID = this.ls.selectedLocation().locationID;
    }
};
LayoutComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
    { type: _services_locations_service__WEBPACK_IMPORTED_MODULE_2__["LocationsService"] },
    { type: _services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] }
];
LayoutComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-layout',
        template: __importDefault(__webpack_require__(/*! raw-loader!./layout.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/layout/layout.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./layout.component.css */ "./src/app/layout/layout.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
        _services_locations_service__WEBPACK_IMPORTED_MODULE_2__["LocationsService"],
        _services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"]])
], LayoutComponent);



/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/login.service */ "./src/app/_services/login.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let LoginComponent = class LoginComponent {
    constructor(formBuilder, service, ts, router, ls) {
        this.formBuilder = formBuilder;
        this.service = service;
        this.ts = ts;
        this.router = router;
        this.ls = ls;
    }
    ngOnInit() {
        this.createForm();
    }
    onSubmit() {
        this.loginForm.markAllAsTouched();
        if (this.loginForm.invalid) {
            return;
        }
        this.service.login(this.f.username.value, this.f.password.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(data => {
            if (data != null) {
                this.router.navigate(["/admin/dashboard"]);
            }
            else {
                this.ts.showError("Error", "Username or password is not correct.");
            }
        }, error => {
            this.ts.showError("Error", "Something went wrong.");
        });
    }
    get f() { return this.loginForm.controls; }
    createForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
    }
};
LoginComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _services_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"] },
    { type: _services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
    { type: _services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] }
];
LoginComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-login',
        template: __importDefault(__webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html")).default
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _services_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"],
        _services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
        _services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"]])
], LoginComponent);



/***/ }),

/***/ "./src/app/nav-menu/nav-menu.component.css":
/*!*************************************************!*\
  !*** ./src/app/nav-menu/nav-menu.component.css ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("a.navbar-brand {\r\n  white-space: normal;\r\n  text-align: center;\r\n  word-break: break-all;\r\n}\r\n\r\nhtml {\r\n  font-size: 14px;\r\n}\r\n\r\n@media (min-width: 768px) {\r\n  html {\r\n    font-size: 16px;\r\n  }\r\n}\r\n\r\n.box-shadow {\r\n  box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2LW1lbnUvbmF2LW1lbnUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFDQTtFQUNFO0lBQ0UsZUFBZTtFQUNqQjtBQUNGOztBQUVBO0VBQ0UsOENBQThDO0FBQ2hEIiwiZmlsZSI6InNyYy9hcHAvbmF2LW1lbnUvbmF2LW1lbnUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImEubmF2YmFyLWJyYW5kIHtcclxuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XHJcbn1cclxuXHJcbmh0bWwge1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcclxuICBodG1sIHtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICB9XHJcbn1cclxuXHJcbi5ib3gtc2hhZG93IHtcclxuICBib3gtc2hhZG93OiAwIC4yNXJlbSAuNzVyZW0gcmdiYSgwLCAwLCAwLCAuMDUpO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "./src/app/nav-menu/nav-menu.component.ts":
/*!************************************************!*\
  !*** ./src/app/nav-menu/nav-menu.component.ts ***!
  \************************************************/
/*! exports provided: NavMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavMenuComponent", function() { return NavMenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let NavMenuComponent = class NavMenuComponent {
    constructor() {
        this.isExpanded = false;
    }
    collapse() {
        this.isExpanded = false;
    }
    toggle() {
        this.isExpanded = !this.isExpanded;
    }
};
NavMenuComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-nav-menu',
        template: __importDefault(__webpack_require__(/*! raw-loader!./nav-menu.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/nav-menu/nav-menu.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./nav-menu.component.css */ "./src/app/nav-menu/nav-menu.component.css")).default]
    })
], NavMenuComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! exports provided: getBaseUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBaseUrl", function() { return getBaseUrl; });
/* harmony import */ var _angular_localize_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/localize/init */ "./node_modules/@angular/localize/fesm2015/init.js");
/* harmony import */ var _angular_localize_init__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_angular_localize_init__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/__ivy_ngcc__/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */





function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
const providers = [
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];
if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])(providers).bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.log(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Rar File\MamjiAdmin\ClientApp\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** stream (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map