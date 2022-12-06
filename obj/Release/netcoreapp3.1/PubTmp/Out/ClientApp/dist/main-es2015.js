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

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/dashboard/dashboard.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/dashboard/dashboard.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n\r\n<!--<div class=\"row d-sm-flex align-items-center justify-content-between mb-4\">\r\n    <div class=\"col-md-6\">\r\n        <h1 class=\"h3 mb-0 text-gray-800\">Dashboard</h1>\r\n    </div>\r\n    <div class=\" col-md-6 d-flex justify-content-end\">\r\n        <ngbd-datepicker-range-popup></ngbd-datepicker-range-popup>\r\n        <button class=\"btn btn-primary ml-2\" type=\"submit\"  (click)=\"GetDataDashboard()\">Search</button>\r\n\r\n    </div>\r\n</div>-->\r\n\r\n\r\n<!-- Content Row -->\r\n<div class=\"row\">\r\n\r\n    <!-- Earnings (Monthly) Card Example -->\r\n    <div class=\"col-xl-3 col-md-6 mb-4\">\r\n        <div class=\"card border-left-primary shadow h-100 py-2\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row no-gutters align-items-center\">\r\n                    <div class=\"col mr-2\">\r\n                        <div class=\"text-xs font-weight-bold text-orange text-uppercase mb-1\">Total Doctors</div>\r\n                        <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{dashboardSummary.totalDoctors}}</div>\r\n                    </div>\r\n                    <div class=\"col-auto\">\r\n                        <i class=\"fas fa-calendar fa-2x text-gray-300\"></i>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Earnings (Monthly) Card Example -->\r\n    <div class=\"col-xl-3 col-md-6 mb-4\">\r\n        <div class=\"card border-left-success shadow h-100 py-2\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row no-gutters align-items-center\">\r\n                    <div class=\"col mr-2\">\r\n                        <div class=\"text-xs font-weight-bold text-success text-uppercase mb-1\">Total Patients</div>\r\n                        <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{dashboardSummary.totalPatients}}</div>\r\n                    </div>\r\n                    <div class=\"col-auto\">\r\n                        <i class=\"fas fa-dollar-sign fa-2x text-gray-300\"></i>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- Pending Requests Card Example -->\r\n    <div class=\"col-xl-3 col-md-6 mb-4\">\r\n        <div class=\"card border-left-warning shadow h-100 py-2\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row no-gutters align-items-center\">\r\n                    <div class=\"col mr-2\">\r\n                        <div class=\"text-xs font-weight-bold text-warning text-uppercase mb-1\">Total Dr.Appointments</div>\r\n                        <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{dashboardSummary.totalAppointments}}</div>\r\n                    </div>\r\n                    <div class=\"col-auto\">\r\n                        <i class=\"fas fa-dollar-sign fa-2x text-gray-300\"></i>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-xl-3 col-md-6 mb-4\">\r\n        <div class=\"card border-left-warning shadow h-100 py-2\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row no-gutters align-items-center\">\r\n                    <div class=\"col mr-2\">\r\n                        <div class=\"text-xs font-weight-bold text-warning text-uppercase mb-1\">Total Nursing Appointments</div>\r\n                        <div class=\"h5 mb-0 font-weight-bold text-gray-800\">{{dashboardSummary.totalAppointments}}</div>\r\n                    </div>\r\n                    <div class=\"col-auto\">\r\n                        <i class=\"fas fa-dollar-sign fa-2x text-gray-300\"></i>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- Earnings (Monthly) Card Example -->\r\n    <div class=\"col-xl-3 col-md-6 mb-4\">\r\n        <div class=\"card border-left-info shadow h-100 py-2\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row no-gutters align-items-center\">\r\n                    <div class=\"col mr-2\">\r\n                        <div class=\"text-xs font-weight-bold text-info text-uppercase mb-1\">Today Appointments</div>\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col-auto\">\r\n                              \r\n                                <!-- <div class=\"h5 mb-0 mr-3 font-weight-bold text-gray-800\" >{{ dashboardSummary.todayAppointments}}</div> -->\r\n                                <div class=\"h5 mb-0 mr-3 font-weight-bold text-gray-800\" >0</div>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-auto\">\r\n                        <i class=\"fas fa-clipboard-list fa-2x text-gray-300\"></i>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>\r\n\r\n \r\n\r\n \r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/laboratory/uploadreport/addreports/addreports.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/laboratory/uploadreport/addreports/addreports.component.html ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Upload Reports</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"reportForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Report Details</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-8\">\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputlabReferenceNo\">Lab Reference#</label>\r\n                  <input type=\"text\" class=\"form-control\" id=labReferenceNo placeholder=\"\" formControlName=\"labReferenceNo\">\r\n                  <div *ngIf=\"f.labReferenceNo.invalid && (f.labReferenceNo.dirty || f.labReferenceNo.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.labReferenceNo.errors.required\">\r\n                      Lab Reference No is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!-- <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputcustomerID\">Customer Name</label>\r\n                  <ng-select [items]=\"CustomerList\" bindLabel=\"fullName\" bindValue=\"customerID\" [multiple]=\"false\" placeholder=\"\">\r\n                    <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                      <div class=\"ng-value\" *ngFor=\"let item of items\" [value]=\"items.customerID\">\r\n                        <span class=\"ng-value-label\">{{item.fullName}}</span>\r\n                        <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                      </div>\r\n                    </ng-template>\r\n                  </ng-select>\r\n                </div>\r\n              </div> -->\r\n\r\n\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                    <label class=\"small mb-1\" for=\"inputUsername\">Customer Name</label>\r\n                    <select class=\"custom-select\" formControlName=\"customerID\"> \r\n\r\n                <option [ngValue]=\"option.customerID\"  selected=\"option.customerID == customerID\"\r\n                    *ngFor=\"let option of CustomerList\">\r\n                    {{option.fullName}}\r\n                </option>\r\n            </select>\r\n                </div>\r\n            </div>\r\n\r\n\r\n\r\n            </div>\r\n\r\n            <div class=\"form-group col-md-4 text-center\">\r\n              <app-imageupload></app-imageupload>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Save changes button-->\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/laboratory/uploadreport/uploadreport.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/laboratory/uploadreport/uploadreport.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Laboratory Reports</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n  <div class=\"card-header py-3\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-5\">\r\n        <h6 class=\"m-0 font-weight-bold text-orange\">Lab Reports List</h6>\r\n      </div>\r\n      <div class=\" col-lg-4 input-group mb-3\" style=\"padding-top: 25px;\">\r\n        <div class=\"input-group-prepend\" style=\"height: 39px;\">\r\n          <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n        </div>\r\n        <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" />\r\n      </div>\r\n      <div class=\"col-md-3 form-group text-right\">\r\n        <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\">\r\n          <span translate>Export</span>\r\n        </button>\r\n        <button [routerLink]=\"['addreports']\" class=\"btn btn-primary mt-4 mr-1\">\r\n          Upload Report\r\n        </button>\r\n      </div>\r\n    </div>\r\n\r\n\r\n\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"tile-body p-0 table-responsive \">\r\n      <table class=\"table table-striped\">\r\n        <thead>\r\n          <tr class=\"table-header\">\r\n            <th width=\"10%\">IMAGE</th>\r\n            <th width=\"15%\" sortable=\"LabReference\">Lab Reference#</th>\r\n            <th width=\"15%\" sortable=\"LabReference\">Customer Name</th>\r\n            <th width=\"15%\" sortable=\"Status\">Status </th>\r\n            <th width=\"10%\">Action</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let item of data$ | async \">\r\n            <td>\r\n              <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n              <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n            </td>\r\n            <td>{{item.labReferenceNo}}</td>\r\n            <td>{{item.fullName}}</td>\r\n            <td>\r\n              <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n              </ngb-highlight>\r\n            </td>\r\n            <td>\r\n              <a (click)=\"Edit(item.laboratoryID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n              <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n        <p class=\"pagination-count\">\r\n          Showing\r\n          <!--<strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n          <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n          <strong>{{(total$ | async)!}}</strong> results-->\r\n        </p>\r\n      </div>\r\n      <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n        <!--<ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n        </ngb-pagination>-->\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/managedoctor/doctor/adddoctors/adddoctors.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/managedoctor/doctor/adddoctors/adddoctors.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <h1 class=\"h3 mb-2 text-gray-800\">Add Doctor</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"doctorForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Doctor Details</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-8\">\r\n\r\n\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                <input type=\"text\" class=\"form-control\" id=Name placeholder=\"\" formControlName=\"fullName\">\r\n                <div *ngIf=\"f.fullName.invalid && (f.fullName.dirty || f.fullName.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.fullName.errors.required\">\r\n                    Name is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputFirstName\">Email</label>\r\n                  <input type=\"email\" class=\"form-control\" id=email placeholder=\"\" formControlName=\"email\">\r\n                  <div *ngIf=\"f.email.invalid && (f.email.dirty || f.email.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.email.errors.required\">\r\n                      Email is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLastName\">Profile</label>\r\n                  <input type=\"text\" class=\"form-control\" id=profile placeholder=\"\" formControlName=\"profile\">\r\n                  <div *ngIf=\"f.profile.invalid && (f.profile.dirty || f.profile.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.profile.errors.required\">\r\n                      Profile is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLastName\">Skills</label>\r\n                  <input type=\"text\" class=\"form-control\" id=skills placeholder=\"\" formControlName=\"skills\">\r\n                  <div *ngIf=\"f.skills.invalid && (f.skills.dirty || f.skills.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.skills.errors.required\">\r\n                      Skills is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLastName\">Education</label>\r\n                  <input type=\"text\" class=\"form-control\" id=education placeholder=\"\" formControlName=\"education\">\r\n                  <div *ngIf=\"f.education.invalid && (f.education.dirty || f.education.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.education.errors.required\">\r\n                      Education is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group col-md-4 text-center\">\r\n              <app-imageupload formControlName=\"image\"></app-imageupload>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form> -->\r\n<!-- <h1 class=\"h3 mb-2 text-gray-800\">Add Doctor</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"doctorForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\"> Doctor</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-6\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputFullName\">Name </label>\r\n                <input type=\"text\" class=\"form-control\" id=name placeholder=\"\" formControlName=\"fullName\">\r\n                <div *ngIf=\"f.fullName.invalid && (f.fullName.dirty || f.fullName.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.fullName.errors.required\">\r\n                    Name is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group\">\r\n\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLocation\">Speciality</label>\r\n                  <ng-select [items]=\"selectedSpecialityList\" bindLabel=\"name\" bindValue=\"specialistID\" [multiple]=\"true\" placeholder=\"\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"selectedSpecialistIds\">\r\n                      <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                          <div class=\"ng-value\" *ngFor=\"let item of items\">\r\n                              <span class=\"ng-value-label\">{{item.name}}</span>\r\n                              <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                          </div>\r\n                      </ng-template>\r\n                  </ng-select>\r\n              </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputTimeslot\">Timeslot</label>\r\n                  <select type=\"time\" class=\"form-control\" id=timeslot placeholder=\"\" formControlName=\"timeslot\">\r\n                    <option selected disabled> -- Please Select -- </option>\r\n                    <option>10:00 AM - 11:00 AM</option>\r\n                    <option>11:00 AM - 12:00 PM</option>\r\n                    <option>12:00 PM - 01:00 PM</option>\r\n                    <option>01:00 PM - 02:00 PM</option>\r\n                  </select>\r\n                  <div *ngIf=\"f.timeslot.invalid && (f.timeslot.dirty || f.timeslot.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.timeslot.errors.required\">\r\n                      Timeslot is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputEmail\">Email</label>\r\n                <input type=\"text\" class=\"form-control\" id=patientName placeholder=\"\" formControlName=\"email\">\r\n                <div *ngIf=\"f.email.invalid && (f.email.dirty || f.email.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.email.errors.required\">\r\n                    Email is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputAge\">Skills</label>\r\n                <input type=\"text\" class=\"form-control\" id=skills placeholder=\"\" formControlName=\"skills\">\r\n                <div *ngIf=\"f.skills.invalid && (f.skills.dirty || f.skills.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.skills.errors.required\">\r\n                    Skill is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputappointmentStatus\">Appointment Status</label>\r\n                  <select type=\"text\" class=\"form-control\" id=appointmentStatus placeholder=\"\" formControlName=\"appointmentStatus\">\r\n                    <option selected disabled> -- Please Select -- </option>\r\n                    <option>Pending</option>\r\n                    <option>Approved</option>\r\n                    <option>Cancelled</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputEducation\">Education</label>\r\n                <input type=\"text\" class=\"form-control\" id=education placeholder=\"\" formControlName=\"education\">\r\n                <div *ngIf=\"f.education.invalid && (f.education.dirty || f.education.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.education.errors.required\">\r\n                    Education is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n\r\n\r\n\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLocation\">Days</label>\r\n                  <ng-select [items]=\"DoctorDaysList\" bindLabel=\"name\" bindValue=\"daysID\" [multiple]=\"true\" placeholder=\"\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"selectedDaysID\">\r\n                      <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                          <div class=\"ng-value\" *ngFor=\"let item of items\">\r\n                              <span class=\"ng-value-label\">{{item.name}}</span>\r\n                              <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                          </div>\r\n                      </ng-template>\r\n                  </ng-select>\r\n              </div>\r\n\r\n\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputFees\">Fees</label>\r\n                  <input type=\"text\" class=\"form-control\" id=fees placeholder=\"\" formControlName=\"fees\">\r\n                  <div *ngIf=\"f.fees.invalid && (f.fees.dirty || f.fees.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.fees.errors.required\">\r\n                      Fees is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputGender\">Gender</label>\r\n                  <select type=\"text\" class=\"form-control\" id=gender placeholder=\"\" formControlName=\"gender\">\r\n                    <option selected disabled> -- Please Select -- </option>\r\n                    <option>Male</option>\r\n                    <option>Female</option>\r\n                  </select>\r\n                  <div *ngIf=\"f.gender.invalid && (f.gender.dirty || f.gender.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.gender.errors.required\">\r\n                      Gender is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group col-md-4 text-center\">\r\n            <app-imageupload></app-imageupload>\r\n        </div>\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<h1 class=\"h3 mb-2 text-gray-800\">Add Doctor</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"doctorForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Item Details</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-8\">\r\n\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-12\">\r\n                                  <label class=\"small mb-1\" for=\"inputUsername\">Name </label>\r\n                                  <input type=\"text\" class=\"form-control\" id=name placeholder=\"\" formControlName=\"fullName\">\r\n                                  <div *ngIf=\"f.fullName.invalid && (f.fullName.dirty || f.fullName.touched)\" class=\"alert alert-danger\">\r\n                                    <div *ngIf=\"f.fullName.errors.required\">\r\n                                      Name is required.\r\n                                    </div>  \r\n                                  </div>\r\n                                </div>\r\n                            </div>\r\n                            <!-- Form Row-->\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-6\">\r\n                                    <label class=\"small mb-1\" for=\"inputUsername\">Email</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=email placeholder=\"\" formControlName=\"email\">\r\n                                    <div *ngIf=\"f.email.invalid && (f.email.dirty || f.email.touched)\" class=\"alert alert-danger\">\r\n                                        <div *ngIf=\"f.email.errors.required\">\r\n                                            Email is required.\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group col-md-6\">\r\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Skills</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=skills placeholder=\"\" formControlName=\"skills\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                              <div class=\"form-group col-md-12\">\r\n                                <label class=\"small mb-1\" for=\"inputLastName\">Gender</label>\r\n                                <select type=\"text\" class=\"form-control\" id=gender placeholder=\"\" formControlName=\"gender\">\r\n                                  <option selected disabled> -- Please Select -- </option>\r\n                                  <option>Male</option>\r\n                                  <option>Female</option>\r\n                                </select>\r\n                                 \r\n                              </div>\r\n                            </div>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"form-group col-md-6\">\r\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Education</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=education placeholder=\"\" formControlName=\"education\">\r\n                                </div>\r\n                                 \r\n                                <div class=\"form-group col-md-6\">\r\n                                  <label class=\"small mb-1\" for=\"inputLastName\">Fees</label>\r\n                                  <input type=\"number\" class=\"form-control\" id=fees placeholder=\"\" formControlName=\"fees\">\r\n                              </div>\r\n                               \r\n                            </div>\r\n \r\n                        </div>\r\n                        <div class=\"form-group col-md-4 text-center\">\r\n                            <app-imageupload></app-imageupload>\r\n                        </div>\r\n \r\n                    </div>\r\n \r\n                    <div class=\"form-row\">\r\n                        <div class=\"form-group col-md-12\">\r\n                            <label class=\"small mb-1\" for=\"inputLocation\">Attach Speciality</label>\r\n                            <ng-select [items]=\"selectedSpecialityList\" bindLabel=\"name\" bindValue=\"specialistID\" [multiple]=\"true\" placeholder=\"\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"selectedSpecialistIds\">\r\n                              <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                                  <div class=\"ng-value\" *ngFor=\"let item of items\">\r\n                                      <span class=\"ng-value-label\">{{item.name}}</span>\r\n                                      <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                                  </div>\r\n                              </ng-template>\r\n                          </ng-select>\r\n                        </div>\r\n                    </div>\r\n\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-12\">\r\n\r\n              <label class=\"small mb-1\" for=\"inputLocation\">Attach Days</label>\r\n              <ng-select [items]=\"DoctorDaysList\" bindLabel=\"name\" [multiple]=\"true\" bindValue=\"name\" placeholder=\"\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"selectedDaysID\">\r\n                <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                  <div class=\"ng-value\" *ngFor=\"let item of items\">\r\n                    <span class=\"ng-value-label\">{{item}}</span>\r\n                    <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                  </div>\r\n                </ng-template>\r\n              </ng-select>\r\n              <!-- <ng-select [items]=\"DoctorDaysList\" bindLabel=\"name\" bindValue=\"daysID\" [multiple]=\"true\" placeholder=\"\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"selectedDaysID\">\r\n                  <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                      <div class=\"ng-value\" *ngFor=\"let item of items\">\r\n                          <span class=\"ng-value-label\">{{item.name}}</span>\r\n                          <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                      </div>\r\n                  </ng-template>\r\n              </ng-select> -->\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-12\">\r\n              <label class=\"small mb-1\" for=\"inputUsername\">Timeslot</label>\r\n              <ng-select [items]=\"TimeList\" bindLabel=\"name\" [multiple]=\"true\" bindValue=\"name\" placeholder=\"\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"selectedTimeslot\">\r\n                <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                  <div class=\"ng-value\" *ngFor=\"let item of items\">\r\n                    <span class=\"ng-value-label\">{{item}}</span>\r\n                    <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                  </div>\r\n                </ng-template>\r\n              </ng-select>\r\n\r\n                        <!-- <select type=\"time\" class=\"form-control\" id=timeslot placeholder=\"\" formControlName=\"timeslot\">\r\n                          <option selected disabled> -- Please Select -- </option>\r\n                          <option>10:00 AM - 11:00 AM</option>\r\n                          <option>11:00 AM - 12:00 PM</option>\r\n                          <option>12:00 PM - 01:00 PM</option>\r\n                          <option>01:00 PM - 02:00 PM</option>\r\n                        </select> -->\r\n                        <!-- <div *ngIf=\"f.timeslot.invalid && (f.timeslot.dirty || f.timeslot.touched)\" class=\"alert alert-danger\">\r\n                          <div *ngIf=\"f.timeslot.errors.required\">\r\n                            Timeslot is required.\r\n                          </div>\r\n                        </div> -->\r\n                      </div>\r\n                    </div>\r\n                \r\n                    <div class=\"form-group col-md-2\">\r\n                      <label class=\"small mb-1\" for=\"inputLastName\">Action</label>\r\n                      <br/>\r\n                      <button class=\"btn btn-primary\" type=\"submit\" (click)=\"AddChild(doctorForm)\" [disabled]=\"doctorForm==null\">Add</button>\r\n                  </div>\r\n                  <div class=\"tile-body p-0 table-responsive \">\r\n                    <table class=\"table table-striped\">\r\n                        <thead>\r\n                            <tr class=\"table-header\">\r\n                                <th width=\"25%\">Speciality </th>\r\n                                <th width=\"25%\">Days </th>\r\n                                <th width=\"25%\">Timeslot</th>                                \r\n                                <th width=\"25%\">Action</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngFor=\"let item of  selectedSpecialistIds\">\r\n                                 \r\n                                <td>\r\n                                  {{item.name}}\r\n                                  <!-- <tr *ngFor=\"let item1 of item.doctorDetailTimes \">\r\n                                      <td class=\"badge badge-pill\">Times: {{item1.TimeSlot }}  </td>\r\n                                  </tr> -->\r\n                              </td>                              \r\n                                <td> Days </td>\r\n                                <td> Timeslot </td>\r\n                                \r\n                                <td>\r\n                                    <i  class=\"fas fa-fw fa-trash-alt \"></i>\r\n                                </td>\r\n                            </tr>\r\n\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <!-- Save changes button-->\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/managedoctor/doctor/doctor.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/managedoctor/doctor/doctor.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Doctors</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Doctors List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div>\r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button [routerLink]=\"['adddoctors']\" class=\"btn btn-primary mt-4 mr-1\">\r\n                    Add Doctor\r\n                </button>\r\n            </div>\r\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Customer\r\n            </button></div> -->\r\n        </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"FullName\" > Name </th>\r\n                        <th width=\"15%\" sortable=\"Email\" >Email </th>\r\n                        \r\n                        <th width=\"15%\" sortable=\"Skills\" > Skills </th>\r\n                        <th width=\"15%\" sortable=\"Education\" > Education </th>\r\n                        <th width=\"15%\" sortable=\"Status\" >Status </th>\r\n                        <th width=\"10%\">Action</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                        <td>\r\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td> {{item.fullName}} </td>\r\n                        <td> {{item.email}} </td>\r\n                         \r\n                        <td> {{item.skills}} </td>\r\n                        <td> {{item.education}} </td>\r\n                        <td> \r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.doctorID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/addons/addaddons/addaddons.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/addons/addaddons/addaddons.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Addons</h1>\n<p class=\"mb-4\"></p>\n\n<form [formGroup]=\"addonForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\n    <div class=\"row\">\n\n        <div class=\"col-xl-12\">\n            <div class=\"card mb-4\">\n                <div class=\"card-header\">Addons Details</div>\n                <div class=\"card-body\">\n                    <div class=\"form-row\">\n                        <div class=\"form-group col-md-8\">\n                            <div class=\"form-group\">\n                                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\n                                <input type=\"text\" class=\"form-control\" id=Name placeholder=\"\" formControlName=\"name\">\n                                <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\n                                    <div *ngIf=\"f.name.errors.required\">\n                                        Name is required.\n                                    </div>\n                                </div>\n                            </div>\n                            <!-- Form Row-->\n                            <div class=\"form-row\">\n                                <div class=\"form-group col-md-12\">\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Arabic Name</label>\n                                    <input type=\"text\" class=\"form-control\" id=arabicName placeholder=\"\" formControlName=\"arabicName\">\n                                </div>\n                            </div>\n                            <!-- <div class=\"form-row\">\n                                <div class=\"form-group col-md-12\">\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Display Order</label>\n                                    <input type=\"number\" class=\"form-control\" id=displayOrder placeholder=\"\" formControlName=\"displayOrder\">\n                                </div>\n                            </div> -->\n                            <div class=\"form-row\">\n                                <div class=\"form-group col-md-12\">\n                                    <label class=\"small mb-1\" for=\"inputLastName\">Price</label>\n                                    <input type=\"number\" class=\"form-control\" id=price placeholder=\"\" formControlName=\"price\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"form-group col-md-4 text-center\">\n                            <app-imageupload></app-imageupload>\n                        </div>\n                    </div>\n\n                    <div class=\"form-row\">\n                        <div class=\"form-group col-md-12\">\n\n                            <label class=\"small mb-1\" for=\"inputLocation\">Description</label>\n                            <textarea class=\"form-control\" formControlName=\"description\" height=\"100px\"></textarea>\n                        </div>\n                    </div>\n                    <div class=\"form-row\">\n                        <div class=\"form-group col-lg-12\">\n                            <label for=\"Item Status\">Status</label>\n                            <div class=\"custom-control custom-switch custom-switch-md\">\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\n                            </div>\n                        </div>\n                    </div>\n                    <!-- Save changes button-->\n                    <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\n\n                </div>\n            </div>\n        </div>\n    </div>\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/addons/addons.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/menu/addons/addons.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\n<h1 class=\"h3 mb-2 text-gray-800\">Addons</h1>\n<p class=\"mb-4\"></p>\n\n<!-- DataTales Example -->\n<div class=\"card shadow mb-4\">\n    <div class=\"card-header py-3\">\n        <div class=\"row\">\n            <div class=\"col-md-5\">\n                <h6 class=\"m-0 font-weight-bold text-orange\">Addons List</h6>\n            </div>\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\n                </div>\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\n            </div>\n           \n            <div class=\"col-md-3 text-right\"> \n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\n                    <span translate>Export</span>\n                </button>\n                <button [routerLink]=\"['add']\" class=\"btn btn-primary mt-4 mr-1\" >\n                    <span translate>Add Addon</span>\n                </button>\n                </div>\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\n                Add Modifier\n            </button></div> -->\n        </div>\n\n\n\n    </div>\n    <div class=\"card-body\">\n        <div class=\"tile-body p-0 table-responsive \">\n            <table class=\"table table-striped\">\n                <thead>\n                    <tr class=\"table-header\">\n                        <th width=\"10%\">IMAGE</th>\n                        <th width=\"15%\" sortable=\"Name\" (sort)=\"onSort($event)\"> Name </th>\n                        <th width=\"20%\" sortable=\"Description\" (sort)=\"onSort($event)\">Description </th>\n                        <th width=\"10%\" sortable=\"Price\" (sort)=\"onSort($event)\">Price</th>\n                        <th width=\"15%\" sortable=\"Status\" (sort)=\"onSort($event)\">Status </th>\n                        <th width=\"15%\"></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let item of data$ | async \">\n                        <td>\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\n                        </td>\n                        <td> {{item.name}} </td>\n                        <td> {{item.description}} </td>\n                        <td>{{item.price}}</td>\n                        <td>\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\n                            </ngb-highlight>\n                        </td>\n                        <td>\n                            <a (click)=\"Edit(item.addonID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\n\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n\n\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <p class=\"pagination-count\">\n                    Showing\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\n                    <strong>{{(total$ | async)!}}</strong> results\n                </p>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\n                </ngb-pagination>\n            </div>\n        </div>\n    </div>\n</div>");

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
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\n<h1 class=\"h3 mb-2 text-gray-800\">Customer Inquiry</h1>\n<p class=\"mb-4\"></p>\n\n<!-- DataTales Example -->\n<div class=\"card shadow mb-4\">\n    <div class=\"card-header py-3\">\n        <div class=\"row\">\n            <div class=\"col-md-5\">\n                <h6 class=\"m-0 font-weight-bold text-orange\">Customer Inquiry List</h6>\n            </div>\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\n                </div>\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" />\n            </div>\n            <div class=\"col-md-3 form-group text-right\">\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" >\n                    <span translate>Export</span>\n                </button>\n                <button [routerLink]=\"['add']\" class=\"btn btn-primary mt-4 mr-1\">\n                    Customer Inquiry\n                </button>\n            </div>\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\n                Add Customer\n            </button></div> -->\n        </div>\n\n\n\n    </div>\n    <div class=\"card-body\">\n        <div class=\"tile-body p-0 table-responsive \">\n            <table class=\"table table-striped\">\n                <thead>\n                    <tr class=\"table-header\">\n                        <th width=\"10%\">IMAGE</th>\n                        <th width=\"15%\" sortable=\"FullName\" > Name </th>\n                        <th width=\"15%\" sortable=\"Email\" >Email </th>\n                        <th width=\"15%\" sortable=\"Mobile\" >Mobile </th>\n                        <th width=\"15%\" sortable=\"Password\" >Type </th>\n                        <th width=\"15%\" sortable=\"Status\" >Status </th>\n                        <th width=\"10%\"></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr>\n                        <td>\n                            <!-- <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" /> -->\n                            <div class=\"image-replace\"></div>\n                        </td>\n                        <td>Ammad </td>\n                        <td> ammadraza001@gmail.com </td>\n                        <td>03341897997</td>\n                        <td>abc123</td>\n                        <td>\n                            <ngb-highlight  class=\"btn btn-sm\">\n                                 \n                            </ngb-highlight>\n                        </td>\n                        <td>\n                            <a  ><i class=\"fas fa-fw fa-edit\"></i> </a>\n\n                            <a  ><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n\n\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <p class=\"pagination-count\">\n                    Showing\n                    <!-- <strong>{{(service.pageSize * service.page)-9}}</strong> to\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\n                    <strong>{{(total$ | async)!}}</strong> results -->\n                </p>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <!-- <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\n                </ngb-pagination> -->\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/deliverydetail/deliverydetail.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/deliverydetail/deliverydetail.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\n<h1 class=\"h3 mb-2 text-gray-800\">Delivery Area</h1>\n<p class=\"mb-4\"></p>\n\n<!-- DataTales Example -->\n<div class=\"card shadow mb-4\">\n    <div class=\"card-header py-3\">\n        <div class=\"row\">\n            <div class=\"col-md-5\">\n                <h6 class=\"m-0 font-weight-bold text-orange\">Delivery Area List</h6>\n            </div>\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\n                </div>\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" />\n            </div>\n            <div class=\"col-md-3 form-group text-right\">\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" >\n                    <span translate>Export</span>\n                </button>\n                <button   class=\"btn btn-primary mt-4 mr-1\">\n                    Delivery Area\n                </button>\n            </div>\n            <!-- <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\n                Add Customer\n            </button></div> -->\n        </div>\n\n\n\n    </div>\n    <div class=\"card-body\">\n        <div class=\"tile-body p-0 table-responsive \">\n            <table class=\"table table-striped\">\n                <thead>\n                    <tr class=\"table-header\">\n                        <th width=\"10%\">IMAGE</th>\n                        <th width=\"15%\" sortable=\"FullName\" >Area Name </th>\n                        <th width=\"15%\" sortable=\"Email\" >Email </th>\n                        <th width=\"15%\" sortable=\"Mobile\" >Mobile </th>\n                        <th width=\"15%\" sortable=\"Password\" >Type </th>\n                        <th width=\"15%\" sortable=\"Status\" >Status </th>\n                        <th width=\"10%\"></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr>\n                        <td>\n                            <!-- <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" /> -->\n                            <div class=\"image-replace\"></div>\n                        </td>\n                        <td>Ammad </td>\n                        <td> ammadraza001@gmail.com </td>\n                        <td>03341897997</td>\n                        <td>abc123</td>\n                        <td>\n                            \n                        </td>\n                        <td>\n                            <a  ><i class=\"fas fa-fw fa-edit\"></i> </a>\n\n                            <a  ><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n\n\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <p class=\"pagination-count\">\n                    Showing\n                    <!-- <strong>{{(service.pageSize * service.page)-9}}</strong> to\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\n                    <strong>{{(total$ | async)!}}</strong> results -->\n                </p>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <!-- <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\n                </ngb-pagination> -->\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/medicine/addmedicines/addmedicine.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/medicine/addmedicines/addmedicine.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Medicine</h1>\r\n<p class=\"mb-4\"></p>\r\n<form [formGroup]=\"medicineForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Medicine Details</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-8\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                <input type=\"text\" class=\"form-control\" id=name placeholder=\"\" formControlName=\"name\">\r\n                <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.name.errors.required\">\r\n                    Name is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Description</label>\r\n                <input type=\"text\" class=\"form-control\" id=description placeholder=\"\" formControlName=\"description\">\r\n                <div *ngIf=\"f.description.invalid && (f.description.dirty || f.description.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.description.errors.required\">\r\n                    Description is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Brand Details</label>\r\n                <input type=\"text\" class=\"form-control\" id=brandDetails placeholder=\"\" formControlName=\"brandDetails\">\r\n                <div *ngIf=\"f.brandDetails.invalid && (f.brandDetails.dirty || f.brandDetails.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.brandDetails.errors.required\">\r\n                    Brand is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Price</label>\r\n                <input type=\"number\" class=\"form-control\" id=price placeholder=\"\" formControlName=\"price\">\r\n                <div *ngIf=\"f.price.invalid && (f.price.dirty || f.price.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.price.errors.required\">\r\n                    Price is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!-- <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Quantity Description</label>\r\n                <input type=\"text\" class=\"form-control\" id=quantityDescription placeholder=\"\" formControlName=\"quantityDescription\">\r\n                <div *ngIf=\"f.quantityDescription.invalid && (f.quantitydescription.dirty || f.quantityDescription.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.quantityDescription.errors.required\">\r\n                    Quantity is required.\r\n                  </div>\r\n                </div>\r\n              </div> -->\r\n\r\n\r\n                  \r\n                                <div class=\"form-group  \">\r\n                                    <label class=\"small mb-1\" for=\"inputUsername\">Quantity Description</label>\r\n                                    <input type=\"text\" class=\"form-control\" id=quantityDescription placeholder=\"\" formControlName=\"quantityDescription\">\r\n                                </div>\r\n                             \r\n\r\n\r\n\r\n            </div>\r\n            <div class=\"form-group col-md-4 text-center\">\r\n              <app-imageupload></app-imageupload>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n        </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/medicine/medicine.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/medicine/medicine.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Medicines</h1>\r\n<p class=\"mb-4\"></p>\r\n<div class=\"card shadow mb-4\">\r\n  <div class=\"card-header py-3\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-5\">\r\n        <h6 class=\"m-0 font-weight-bold text-orange\">Medicine List</h6>\r\n      </div>\r\n      <div class=\" col-lg-4 input-group mb-3\" style=\"padding-top: 25px;\">\r\n        <div class=\"input-group-prepend\" style=\"height: 39px;\">\r\n          <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n        </div>\r\n        <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n      </div>\r\n      <div class=\"col-md-3 form-group text-right\">\r\n        <!-- <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n          <span translate>Export</span>\r\n        </button> -->\r\n        <button [routerLink]=\"['addmedicines']\" class=\"btn btn-primary mt-4 mr-1\">\r\n          Add Medicine\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"tile-body p-0 table-responsive \">\r\n        <table class=\"table table-striped\">\r\n          <thead>\r\n            <tr class=\"table-header\">\r\n              <th width=\"10%\">IMAGE</th>\r\n              <th width=\"15%\" sortable=\"FullName\"> Name </th>\r\n              <th width=\"15%\" sortable=\"Description\">Description </th>\r\n              <th width=\"15%\" sortable=\"BrandDetails\"> Brand Details </th>\r\n              <th width=\"15%\" sortable=\"Price\"> Price </th>\r\n              <th width=\"15%\" sortable=\"Quantity\"> Quantity Description </th>\r\n              <th width=\"15%\" sortable=\"Status\">Status </th>\r\n              <th width=\"10%\">Action</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let item of data$ | async \">\r\n              <td>\r\n                <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n              </td>\r\n              <td> {{item.name}} </td>\r\n              <td> {{item.description}} </td>\r\n              <td> {{item.brandDetails}} </td>\r\n              <td> {{item.price}} </td>\r\n              <td> {{item.quantityDescription}} </td>\r\n              <td>\r\n                <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                </ngb-highlight>\r\n              </td>\r\n              <td>\r\n                <a (click)=\"Edit(item.medicineID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                <a (click)=\"Delete(item.medicineID)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n          <p class=\"pagination-count\">\r\n            Showing\r\n            <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n            <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n            <strong>{{(total$ | async)!}}</strong> results\r\n          </p>\r\n        </div>\r\n        <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n          <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n          </ngb-pagination>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/orderdetails/orderdetails.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/orderdetails/orderdetails.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Order Details - <span class=\"badge badge-info\"> {{ order.statusID == 100 ? \"Delivered\" : order.statusID==101 ?\"Order confirmed\" : order.statusID == 102? \"Order prepared\" : order.statusID == 103? \" Order out for delivery\" : order.statusID == 104? \"Order Cancelled\" : \"-\" }}</span></h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\">\r\n\r\n            </div>\r\n        </div>\r\n        <hr/>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12 mb-4\" *ngIf=\"order.statusID!=100\">\r\n                <div class=\"card border-left-info shadow mb-4\">\r\n                    <div class=\"card-header border-bottom-0\">Order Status</div>\r\n                    <div class=\"card-body\">\r\n                      <div class=\"\">\r\n                        <!-- <button class=\"btn btn-warning mr-1\" (click)=\"updateOrder(order,102)\" *ngIf=\"order.statusID!=102\">\r\n                          <i class=\"fas fa-check-circle\"></i> Prepared\r\n                        </button> -->\r\n                        <button class=\"btn btn-info mr-1\" (click)=\"updateOrder(order,103)\" *ngIf=\"order.statusID!=103\">\r\n                          <i class=\"fas fa-truck\"></i> Out For Delivery\r\n                        </button>\r\n                        <button class=\"btn btn-success mr-1\" (click)=\"updateOrder(order,100)\" *ngIf=\"order.statusID!=100\">\r\n                          <i class=\"fas fa-people-carry\"></i> Delivered\r\n                        </button>\r\n                        <button class=\"btn btn-danger mr-1\" (click)=\"updateOrder(order,104)\">\r\n                          <i class=\"fas fa-people-carry\"></i> Cancelled\r\n                        </button>\r\n                      </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6 mb-4\">\r\n\r\n                <div class=\"card border-left-success shadow mb-4\">\r\n                    <div class=\"card-body\">\r\n                        <div class=\"card\">\r\n                            <div class=\"card-header border-bottom-0\">Customer Information</div>\r\n\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                      Customer Name\r\n                                    </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderCustomerInfo.name }}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                     Email\r\n                                    </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderCustomerInfo.email }}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                      Address\r\n                                    </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderCustomerInfo.addressNickName }}</div>\r\n\r\n\r\n\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                    Google Address\r\n                                    </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderCustomerInfo.address }} | Latitude: {{ orderCustomerInfo.latitude }}| Longitude: {{ orderCustomerInfo.longitude }}</div>\r\n\r\n\r\n\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                       Contact Number\r\n                                    </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ orderCustomerInfo.mobile }}</div>\r\n                            </div>\r\n                            <!-- <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                     Location URL\r\n                                    </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">19th Oct 2020</div>\r\n                            </div> -->\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"card border-left-warning shadow \">\r\n\r\n                    <div class=\"card-body\">\r\n\r\n                        <!-- Report summary card example-->\r\n                        <div class=\"card\">\r\n                            <div class=\"card-header border-bottom-0\">Order Information</div>\r\n\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                           Order No\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.orderNo }}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                           Transaction No\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.transactionNo }}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                           Order Type\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.orderType=='1'?'Home': order.orderType=='2'?'Work':'Other' }}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                          Order Date\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.orderDate | date }}</div>\r\n                            </div>\r\n                            <!-- <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                          Prepared Date\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.orderPreparedDate | date }}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                          Out for Delivery Date\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.orderOFDDate | date }}</div>\r\n                            </div> -->\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                         Status\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"mr-2\">\r\n                                    {{ order.statusID == 100 ? \"Delivered\" : order.statusID==101 ?\"Order confirmed\" : order.statusID == 102? \"Order prepared\" : order.statusID == 103? \" Order out for delivery\" : order.statusID == 104? \"Order Cancelled\" : \"-\" }}\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6 mb-4\">\r\n                <div class=\"card border-left-danger shadow mb-4\">\r\n\r\n                    <div class=\"card-body\">\r\n                        <div class=\"card\">\r\n                            <div class=\"card-header border-bottom-0\">Billing Information</div>\r\n\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                  Amount Total\r\n                                </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ (order.amountTotal | number : '1.2-2')}}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                  Discount\r\n                                </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.discountAmount | number : '1.2-2'}}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                  Tax\r\n                                </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.tax | number : '1.2-2'}}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                                  Service Charges\r\n                                </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.serviceCharges | number : '1.2-2'}}</div>\r\n                            </div>\r\n                            <div class=\"d-flex align-items-center\">\r\n                                <div class=\"flex-grow-1\">\r\n                                    <div class=\"list-group list-group-flush small\">\r\n                                        <a class=\"list-group-item list-group-item-action\" href=\"#!\">\r\n                           Grand Total\r\n                                </a>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mr-2\">{{ order.grandTotal | number : '1.2-2'}}</div>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"card border-left-primary shadow\">\r\n\r\n                    <div class=\"card-body\">\r\n                        <div class=\"tile-body p-0 table-responsive \">\r\n                            <table class=\"table table-striped\">\r\n                                <thead>\r\n                                    <tr class=\"table-header\">\r\n                                        <th width=\"50%\">Name </th>\r\n                                        <th width=\"25\">Quantity</th>\r\n                                        <th width=\"25\">Price</th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of orderDetails \">\r\n                                        <td> {{item.name}}</td>\r\n                                        <td> {{item.quantity}} </td>\r\n                                        <td> {{item.price}} </td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n\r\n\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/orders/orders.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/orders/orders.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Sales</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Orders List</h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\"> </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5 form-group\">\r\n                <label>Select Date</label>\r\n                <ngbd-datepicker-range-popup></ngbd-datepicker-range-popup>\r\n            </div>\r\n\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\" style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n            </div>\r\n\r\n\r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <!-- <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                    <span translate>Export</span>\r\n                </button> -->\r\n                <button class=\"btn btn-primary mt-4\" (click)=\"Filter()\" type=\"submit\">Search</button>\r\n            </div>\r\n        </div>\r\n        \r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\" sortable=\"orderNo\" (sort)=\"onSort($event)\"> Order # </th>\r\n                        <th width=\"10%\" sortable=\"transactionNo\" (sort)=\"onSort($event)\">Trans # </th>\r\n                        <th width=\"15%\" sortable=\"customerName\" (sort)=\"onSort($event)\">Name </th>\r\n                        <th width=\"10%\" sortable=\"customerMobile\" (sort)=\"onSort($event)\">Contact </th>\r\n                        <th width=\"10%\" sortable=\"grandTotal\" (sort)=\"onSort($event)\">Total </th>\r\n                        <th width=\"10%\" sortable=\"orderDate\" (sort)=\"onSort($event)\">Date </th>\r\n                        <th width=\"10%\" sortable=\"orderType\" (sort)=\"onSort($event)\">Order Type </th>\r\n                        <th width=\"10%\" sortable=\"statusID\" (sort)=\"onSort($event)\">Status </th>\r\n                        <th width=\"5%\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n\r\n                        <td> {{item.orderNo}} </td>\r\n                        <td> {{item.transactionNo}} </td>\r\n                        <td> {{item.customerName}} </td>\r\n                        <td> {{item.customerMobile}} </td>\r\n                        \r\n                        <td> <span class=\"badge badge-success-soft text-success badge-pill py-2 px-3 mb-2\" style=\"background-color: #bfe5dc;\">{{item.grandTotal | number : '1.2-2'}} PKR</span> </td>\r\n                        <td>{{item.orderDate | date}}</td>\r\n                        <td><span class=\"badge badge-yellow\">{{item.orderType==1?\"Delivery\" :\"Pick Up\"}}</span></td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-info': item.statusID === 102,'btn-warning': item.statusID === 101,'btn-success': item.statusID === 100, 'btn-danger':item.statusID === 103, 'btn-danger':item.statusID === 104 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==100 ? 'Delivered' :\r\n                             item.statusID ==101 ? 'Confirmed' :\r\n                             item.statusID ==102 ? 'Prepared' :\r\n                             item.statusID ==103 ? 'On Delivery' :\r\n                             item.statusID ==104 ? 'Cancelled' :'-'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"View(item.orderID)\"><i class=\"fas fa-fw fa-eye\"></i> </a>\r\n                            <a (click)=\"Print(item.orderID)\"><i class=\"fas fa-fw fa-print\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/prescription/add/addprescription.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/prescription/add/addprescription.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Prescription</h1>\r\n<p class=\"mb-4\"></p>\r\n<form [formGroup]=\"prescriptionForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Prescription Details</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-8\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Customer Name</label>\r\n                <input type=\"text\" class=\"form-control\" id=customerName placeholder=\"\" formControlName=\"customerName\">\r\n                <div *ngIf=\"f.customerName.invalid && (f.customerName.dirty || f.customerName.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.customerName.errors.required\">\r\n                    Customer Name is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Mobile</label>\r\n                <input type=\"text\" class=\"form-control\" id=mobile placeholder=\"\" formControlName=\"mobile\">\r\n                <div *ngIf=\"f.mobile.invalid && (f.mobile.dirty || f.mobile.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.mobile.errors.required\">\r\n                    Mobile is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!-- Form Row-->\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputFirstName\">Address</label>\r\n                  <input type=\"text\" class=\"form-control\" id=address placeholder=\"\" formControlName=\"address\">\r\n                  <div *ngIf=\"f.address.invalid && (f.address.dirty || f.address.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.address.errors.required\">\r\n                      Address is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLastName\">Notes</label>\r\n                  <input type=\"text\" class=\"form-control\" id=note placeholder=\"\" formControlName=\"note\">\r\n                  <div *ngIf=\"f.note.invalid && (f.note.dirty || f.note.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.note.errors.required\">\r\n                      Notes is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group col-md-4 text-center\">\r\n              <app-imageupload></app-imageupload>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Save changes button-->\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/prescription/prescription.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/prescription/prescription.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Medicine Prescription</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n  <div class=\"card-header py-3\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-5\">\r\n        <h6 class=\"m-0 font-weight-bold text-orange\">Prescription List</h6>\r\n      </div>\r\n      <div class=\" col-lg-4 input-group mb-3\" style=\"padding-top: 25px;\">\r\n        <div class=\"input-group-prepend\" style=\"height: 39px;\">\r\n          <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n        </div>\r\n        <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n      </div>\r\n      <div class=\"col-md-3 form-group text-right\">\r\n        <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n          <span translate>Export</span>\r\n        </button>\r\n        <button [routerLink]=\"['addprescription']\" class=\"btn btn-primary mt-4 mr-1\">\r\n          Add Prescription\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"tile-body p-0 table-responsive \">\r\n      <table class=\"table table-striped\">\r\n        <thead>\r\n          <tr class=\"table-header\">\r\n            <th width=\"10%\">IMAGE</th>\r\n            <th width=\"15%\" sortable=\"FullName\">Customer Name </th>\r\n            <th width=\"15%\" sortable=\"Mobile\">Mobile </th>\r\n            <th width=\"15%\" sortable=\"Address\">Address </th>\r\n            <th width=\"15%\" sortable=\"Notes\">Notes </th>\r\n            <th width=\"15%\" sortable=\"Status\">Status </th>\r\n            <th width=\"10%\">Action</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let item of data$ | async \">\r\n            <td>\r\n              <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" data-lightbox=\"image-1\" class=\"table-img\" alt=\"\" />\r\n              <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n            </td>\r\n            <td> {{item.customerName}} </td>\r\n            <td> {{item.mobile}} </td>\r\n            <td> {{item.address}} </td>\r\n            <td> {{item.note}} </td>\r\n            <td>\r\n              <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n              </ngb-highlight>\r\n            </td>\r\n            <td>\r\n              <a (click)=\"Edit(item.prescriptionID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n              <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n        <p class=\"pagination-count\">\r\n          Showing\r\n          <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n          <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n          <strong>{{(total$ | async)!}}</strong> results\r\n        </p>\r\n      </div>\r\n      <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n        <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n        </ngb-pagination>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/appointment/addappointment/addappointment.component.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/appointment/addappointment/addappointment.component.html ***!
  \********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Appointment</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"appointmentForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Book Appointment</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-6\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputAppointmentNo\">Appointment No</label>\r\n                <input type=\"text\" class=\"form-control\" id=appointmentNo placeholder=\"\" formControlName=\"appointmentNo\">\r\n                <div *ngIf=\"f.appointmentNo.invalid && (f.appointmentNo.dirty || f.appointmentNo.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.appointmentNo.errors.required\">\r\n                    Appointment is required.\r\n                  </div>  \r\n                </div>\r\n              </div>\r\n            \r\n                \r\n\r\n                <!-- <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLocation\">Speciality</label>\r\n                  <ng-select [items]=\"selectedSpecialityList\" bindLabel=\"name\" bindValue=\"specialistID\" [multiple]=\"true\" placeholder=\"\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"selectedSpecialistIds\">\r\n                      <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                          <div class=\"ng-value\" *ngFor=\"let item of items\">\r\n                              <span class=\"ng-value-label\">{{item.name}}</span>\r\n                              <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                          </div>\r\n                      </ng-template>\r\n                  </ng-select>\r\n              </div> -->\r\n              \r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputTimeslot\">Timeslot</label>\r\n                  <select type=\"time\" class=\"form-control\" id=timeslot placeholder=\"\" formControlName=\"timeslot\">\r\n                    <option selected disabled> -- Please Select -- </option>\r\n                    <option>10:00 AM - 11:00 AM</option>\r\n                    <option>11:00 AM - 12:00 PM</option>\r\n                    <option>12:00 PM - 01:00 PM</option>\r\n                    <option>01:00 PM - 02:00 PM</option>\r\n                  </select>\r\n                  <div *ngIf=\"f.timeslot.invalid && (f.timeslot.dirty || f.timeslot.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.timeslot.errors.required\">\r\n                      Timeslot is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputPatientname\">Patient Name</label>\r\n                <input type=\"text\" class=\"form-control\" id=patientName placeholder=\"\" formControlName=\"patientName\">\r\n                <div *ngIf=\"f.patientName.invalid && (f.patientName.dirty || f.patientName.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.patientName.errors.required\">\r\n                    Patient Name is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputAge\">Age</label>\r\n                <input type=\"text\" class=\"form-control\" id=age placeholder=\"\" formControlName=\"age\">\r\n                <div *ngIf=\"f.age.invalid && (f.age.dirty || f.age.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.age.errors.required\">\r\n                    Age is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputappointmentStatus\">Appointment Status</label>\r\n                  <select type=\"text\" class=\"form-control\" id=appointmentStatus placeholder=\"\" formControlName=\"appointmentStatus\">\r\n                    <option selected disabled> -- Please Select -- </option>\r\n                    <option>Pending</option>\r\n                    <option>Approved</option>\r\n                    <option>Cancelled</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <!-- <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputAppointmentNo\">Doctor Name</label>\r\n                <ng-select [items]=\"DoctorList\" bindLabel=\"fullName\" bindValue=\"doctorID\" [multiple]=\"false\" placeholder=\"\" (change)=\"onChange(DoctorList)\" >\r\n                  <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                    <div class=\"ng-value\" *ngFor=\"let item of items\"  [value]=\"items.doctorID\">\r\n                      <span class=\"ng-value-label\">{{item.fullName}}</span>\r\n                      <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                    </div>\r\n                  </ng-template>\r\n                </ng-select>\r\n              </div> -->\r\n              <!-- <div class=\"form-row\">\r\n                \r\n\r\n\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLocation\">Days</label>\r\n                  <ng-select [items]=\"DoctorDaysList\" bindLabel=\"name\" bindValue=\"daysID\" [multiple]=\"true\" placeholder=\"\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"selectedDaysID\">\r\n                      <ng-template ng-multi-label-tmp let-items=\"items\" let-clear=\"clear\">\r\n                          <div class=\"ng-value\" *ngFor=\"let item of items\">\r\n                              <span class=\"ng-value-label\">{{item.name}}</span>\r\n                              <span class=\"ng-value-icon right\" style=\"border-left: 1px solid #000;\" (click)=\"clear(item)\" aria-hidden=\"true\">×</span>\r\n                          </div>\r\n                      </ng-template>\r\n                  </ng-select>\r\n              </div>\r\n\r\n\r\n              </div> -->\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputFees\">Fees</label>\r\n                  <input type=\"text\" class=\"form-control\" id=fees placeholder=\"\" formControlName=\"fees\">\r\n                  <div *ngIf=\"f.fees.invalid && (f.fees.dirty || f.fees.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.fees.errors.required\">\r\n                      Fees is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLastName\">Booking Date</label>\r\n                  <input type=\"date\" class=\"form-control\" id=bookingDate placeholder=\"\" formControlName=\"bookingDate\">\r\n                  <div *ngIf=\"f.bookingDate.invalid && (f.bookingDate.dirty || f.bookingDate.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.bookingDate.errors.required\">\r\n                      Booking Date is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputGender\">Gender</label>\r\n                  <select type=\"text\" class=\"form-control\" id=gender placeholder=\"\" formControlName=\"gender\">\r\n                    <option selected disabled> -- Please Select -- </option>\r\n                    <option>Male</option>\r\n                    <option>Female</option>\r\n                  </select>\r\n                  <div *ngIf=\"f.gender.invalid && (f.gender.dirty || f.gender.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.gender.errors.required\">\r\n                      Gender is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Save changes button-->\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/appointment/appointment.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/appointment/appointment.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Doctor Appoinment</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Doctor Appoinment List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" />\r\n            </div>\r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" >\r\n                    <span translate>Export</span>\r\n                </button>\r\n                 <button [routerLink]=\"['addappointment']\" class=\"btn btn-primary mt-4 mr-1\">\r\n                    Doctor Appoinment\r\n                </button> \r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\" sortable=\"AppointmentNo\" > Appoint. No.</th>\r\n                        <th width=\"15%\" sortable=\"PatientName\" > Patient Name </th>\r\n                        <th width=\"10%\" sortable=\"Age\" > Age </th>\r\n                        <th width=\"10%\" sortable=\"Gender\" > Gender </th>\r\n                        <th width=\"10%\" sortable=\"Fees\" > Fees </th>\r\n                        <th width=\"15%\" sortable=\"BookingDate\" > Booking Date </th>\r\n                        <th width=\"20%\" sortable=\"Timeslot\" > Time Slot </th>\r\n                        <th width=\"15%\" sortable=\"Status\" > Status </th>\r\n                        <th width=\"10%\">Action</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let item of data$ | async \">\r\n                    <td> {{item.appointmentNo}} </td>\r\n                    <td> {{item.patientName}} </td>\r\n                    <td> {{item.age}} </td>\r\n                    <td> {{item.gender}} </td>\r\n                    <td> {{item.fees}} </td>\r\n                    <td> {{item.bookingDate}} </td>\r\n                    <td> {{item.timeslot}} </td>\r\n                    <td>\r\n                      <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                      </ngb-highlight>\r\n                    </td>\r\n                    <td>\r\n                      <a (click)=\"Edit(item.appointmentID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n                      <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                    </td>\r\n                  </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                     <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results \r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                 <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination> \r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/customers/addcustomers/addcustomer.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/customers/addcustomers/addcustomer.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Customer</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"customerForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Customer Details</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-8\">\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLastName\">Full Name</label>\r\n                  <input type=\"text\" class=\"form-control\" id=fullName placeholder=\"\" formControlName=\"fullName\">\r\n                  <div *ngIf=\"f.fullName.invalid && (f.fullName.dirty || f.fullName.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.fullName.errors.required\">\r\n                      Full Name is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLastName\">Email</label>\r\n                  <input type=\"text\" class=\"form-control\" id=email placeholder=\"\" formControlName=\"email\">\r\n                  <div *ngIf=\"f.email.invalid && (f.email.dirty || f.email.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.email.errors.required\">\r\n                      Email is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLastName\">Password</label>\r\n                  <input type=\"password\" class=\"form-control\" id=password placeholder=\"\" formControlName=\"password\">\r\n                  <div *ngIf=\"f.password.invalid && (f.password.dirty || f.password.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.password.errors.required\">\r\n                      Password is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLastName\">Contact No.</label>\r\n                  <input type=\"text\" class=\"form-control\" id=mobile placeholder=\"\" formControlName=\"mobile\">\r\n                  <div *ngIf=\"f.mobile.invalid && (f.mobile.dirty || f.mobile.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.mobile.errors.required\">\r\n                      Phone is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group col-md-4 text-center\">\r\n              <app-imageupload></app-imageupload>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Save changes button-->\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/customers/customers.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/customers/customers.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Customers</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Customers List</h6>\r\n            </div>\r\n            <div class=\" col-lg-4 input-group mb-3\"style=\"padding-top: 25px;\">\r\n                <!--<div class=\"input-group-prepend\"style=\"height: 39px;\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n                </div>\r\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />-->\r\n            </div>\r\n            <div class=\"col-md-3 form-group text-right\">\r\n                <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n                    <span translate>Export</span>\r\n                </button>\r\n                <button [routerLink]=\"['addcustomers']\" class=\"btn btn-primary mt-4 mr-1\">\r\n                    Add Customers\r\n                </button>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                  <tr class=\"table-header\">\r\n                    <th width=\"10%\">IMAGE</th>\r\n                    <th width=\"15%\" sortable=\"FullName\" (sort)=\"onSort($event)\"> Name </th>\r\n                    <th width=\"15%\" sortable=\"Mobile\" (sort)=\"onSort($event)\">Mobile </th>\r\n                    <th width=\"15%\" sortable=\"Email\" (sort)=\"onSort($event)\">Email </th>\r\n                    <th width=\"15%\" sortable=\"Password\" (sort)=\"onSort($event)\">Password </th>\r\n                    <th width=\"15%\" sortable=\"Status\" (sort)=\"onSort($event)\">Status </th>\r\n                    <th width=\"10%\" style=\"text-align:center\">Action</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let item of data$ | async \">\r\n                    <td>\r\n                      <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                      <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                    </td>\r\n                    <td> {{item.fullName}} </td>\r\n                    <td>{{item.mobile}}</td>\r\n                    <td> {{item.email}} </td>\r\n                    <td>{{item.password}}</td>\r\n\r\n                    <td>\r\n                      <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                      </ngb-highlight>\r\n                    </td>\r\n                    <td style=\"text-align:center\">\r\n                      <a (click)=\"Edit(item.customerID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                      <a (click)=\"Delete(item.customerID)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                    </td>\r\n                  </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

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

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/Delivery/adddelivery/adddelivery.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/Delivery/adddelivery/adddelivery.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Area</h1>\n<p class=\"mb-4\"></p>\n\n<form [formGroup]=\"deliveryForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\n    <div class=\"row\">\n\n        <div class=\"col-xl-12\">\n            <div class=\"card mb-4\">\n                <div class=\"card-header\">Delivery Area Details</div>\n                <div class=\"card-body\">\n\n                                \n                            \n                    <div class=\"form-row\">\n                        <div class=\"form-group col-md-8\">\n                            <div class=\"form-group\">\n                                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\n                                <input type=\"text\" class=\"form-control\" id=name placeholder=\"\" formControlName=\"name\">\n                                <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\n                                    <div *ngIf=\"f.name.errors.required\">\n                                        Name is required.\n                                    </div>\n                                </div>\n                            </div>\n                            <!-- Form Row-->\n                            <div class=\"form-row\">\n                                <div class=\"form-group col-md-12\">\n                                    <label class=\"small mb-1\" for=\"inputFirstName\">Amount</label>\n                                    <input type=\"number\" class=\"form-control\" id=amount placeholder=\"\" formControlName=\"amount\">\n                                    <div *ngIf=\"f.amount.invalid && (f.amount.dirty || f.amount.touched)\" class=\"alert alert-danger\">\n                                        <div *ngIf=\"f.amount.errors.required\">\n                                            Amount is required.\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                        </div>\n                     \n                    </div>\n\n\n                    <div class=\"form-row\">\n                        <div class=\"form-group col-lg-12\">\n                            <label for=\"Item Status\">Status</label>\n                            <div class=\"custom-control custom-switch custom-switch-md\">\n                                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\n                                <label class=\"custom-control-label\" for=\"statusID\"></label>\n                            </div>\n                        </div>\n                    </div>\n                    <!-- Save changes button-->\n                    <button class=\"btn btn-primary\" type=\"submit\" >Save changes</button>\n\n                </div>\n            </div>\n        </div>\n    </div>\n</form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/appsettings/addappsettings/Addsettings.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/appsettings/addappsettings/Addsettings.component.html ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Update Setting</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"settingForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Setting Details</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-6\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Discount</label>\r\n                <input type=\"text\" class=\"form-control\" id=discount placeholder=\"\" formControlName=\"discount\">\r\n                <div *ngIf=\"f.discount.invalid && (f.discount.dirty || f.discount.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.discount.errors.required\">\r\n                    Discount is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!-- Form Row-->\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputFirstName\">DeliveryCharges</label>\r\n                  <input type=\"text\" class=\"form-control\" id=deliveryCharges placeholder=\"\" formControlName=\"deliveryCharges\">\r\n                  <div *ngIf=\"f.deliveryCharges.invalid && (f.deliveryCharges.dirty || f.deliveryCharges.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.deliveryCharges.errors.required\">\r\n                      Delivery Charges is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Tax</label>\r\n                <input type=\"text\" class=\"form-control\" id=tax placeholder=\"\" formControlName=\"tax\">\r\n                <div *ngIf=\"f.tax.invalid && (f.tax.dirty || f.tax.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.tax.errors.required\">\r\n                    Tax is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!-- Form Row-->\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputFirstName\">Minimum Order Amount</label>\r\n                  <input type=\"text\" class=\"form-control\" id=minimumOrderAmount placeholder=\"\" formControlName=\"minimumOrderAmount\">\r\n                  <div *ngIf=\"f.minimumOrderAmount.invalid && (f.minimumOrderAmount.dirty || f.minimumOrderAmount.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.minimumOrderAmount.errors.required\">\r\n                      Minimum Order Amount is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Save changes button-->\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/appsettings/appsettings.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/appsettings/appsettings.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">App Settings</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n  <div class=\"card-header py-3\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n        <h6 class=\"m-0 font-weight-bold text-orange\">Setting List</h6>\r\n      </div>\r\n      <div class=\"col-md-6 text-right\">\r\n        <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n          Add Settings\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"tile-body p-0 table-responsive \">\r\n      <table class=\"table table-striped\">\r\n        <thead>\r\n          <tr class=\"table-header\">\r\n            <th width=\"15%\" sortable=\"name\" (sort)=\"onSort($event)\"> Discount </th>\r\n            <th width=\"15%\" sortable=\"descripiton\" (sort)=\"onSort($event)\">Delivery Charges </th>\r\n            <th width=\"15%\" sortable=\"minimumOrderAmount\" (sort)=\"onSort($event)\">Minimum Order Amount </th>\r\n            <th width=\"15%\" sortable=\"tax\" (sort)=\"onSort($event)\">Tax </th>\r\n            <th width=\"15%\" sortable=\"statusID\" (sort)=\"onSort($event)\">Status</th>\r\n            <th width=\"10%\">Action</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let item of data$ | async \">\r\n            <td> {{item.discount}} </td>\r\n            <td> {{item.deliveryCharges}} </td>\r\n            <td> {{item.minimumOrderAmount}} </td>\r\n            <td> {{item.tax}} </td>\r\n            <td>\r\n              <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n              </ngb-highlight>\r\n            </td>\r\n            <td>\r\n              <a (click)=\"Edit(item.appSettingID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n              <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n        <p class=\"pagination-count\">\r\n          Showing\r\n          <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n          <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n          <strong>{{(total$ | async)!}}</strong> results\r\n        </p>\r\n      </div>\r\n      <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n        <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n        </ngb-pagination>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/banner/addbanner/addbanner.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/banner/addbanner/addbanner.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add banner</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"bannerForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Banner Details</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-8\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                <input type=\"text\" class=\"form-control\" id=name placeholder=\"\" formControlName=\"name\">\r\n                <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.name.errors.required\">\r\n                    Name is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!-- Form Row-->\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputFirstName\">Description</label>\r\n                  <input type=\"text\" class=\"form-control\" id=Description placeholder=\"\" formControlName=\"description\">\r\n                  <div *ngIf=\"f.description.invalid && (f.description.dirty || f.description.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.description.errors.required\">\r\n                      Description is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              \r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputLastName\">Banner Type</label>\r\n                  <select type=\"text\" class=\"form-control\" id=type placeholder=\"\" formControlName=\"type\">\r\n                    <option selected disabled> -- Please Select -- </option>\r\n                    <option>Header</option>\r\n                    <option>Featured</option>\r\n                  </select>\r\n                   \r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!-- <div class=\"form-row\">\r\n            <div class=\"form-group col-md-8\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Banner Type</label>              \r\n              <select class=\"custom-select\" formControlName=\"type\" class=\"form-control\">\r\n                <option disabled>Select Type</option>                  \r\n                <option *ngFor=\"let web of NursingTypeActive\" >{{web}}</option>\r\n            </select>          \r\n              </div>\r\n            </div>          \r\n          </div> -->\r\n\r\n\r\n            </div>\r\n            <div class=\"form-group col-md-4 text-center\">\r\n              <app-imageupload></app-imageupload>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Save changes button-->\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/banner/banner.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/banner/banner.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Banners</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Banners List</h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Banner\r\n            </button></div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"name\" (sort)=\"onSort($event)\"> Name </th>\r\n                        <th width=\"15%\" sortable=\"type\" (sort)=\"onSort($event)\"> Type </th>\r\n                        <th width=\"15%\" sortable=\"descripiton\" (sort)=\"onSort($event)\">Descripiton </th>\r\n                        <th width=\"15%\" sortable=\"statusID\" (sort)=\"onSort($event)\">Status </th>\r\n                        <th width=\"10%\">Action</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                        <td>\r\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td> {{item.name}} </td>\r\n                        <td> {{item.type}} </td>\r\n                        <td> {{item.description}} </td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.bannerID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/coupon/addcoupon/addcoupon.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/coupon/addcoupon/addcoupon.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Coupon</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"couponForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Coupon Details</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-6\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Title</label>\r\n                <input type=\"text\" class=\"form-control\" id=Title placeholder=\"\" formControlName=\"title\">\r\n                <div *ngIf=\"f.title.invalid && (f.title.dirty || f.title.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.title.errors.required\">\r\n                    Title is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Type</label>\r\n                <input type=\"text\" class=\"form-control\" id=Type placeholder=\"\" formControlName=\"type\">\r\n                <div *ngIf=\"f.type.invalid && (f.type.dirty || f.type.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.type.errors.required\">\r\n                    Type is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Amount</label>\r\n                <input type=\"text\" class=\"form-control\" id=Amount placeholder=\"\" formControlName=\"amount\">\r\n                <div *ngIf=\"f.amount.invalid && (f.amount.dirty || f.amount.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.amount.errors.required\">\r\n                    Amount is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Coupon Code</label>\r\n                <input type=\"text\" class=\"form-control\" id=CouponCode placeholder=\"\" formControlName=\"couponCode\">\r\n                <div *ngIf=\"f.couponCode.invalid && (f.couponCode.dirty || f.couponCode.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.couponCode.errors.required\">\r\n                    Coupon Code is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Save changes button-->\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/coupon/coupon.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/coupon/coupon.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Coupons</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n  <div class=\"card-header py-3\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-5\">\r\n        <h6 class=\"m-0 font-weight-bold text-orange\">Coupon List</h6>\r\n      </div>\r\n      <div class=\" col-lg-4 input-group mb-3\" style=\"padding-top: 25px;\">\r\n        <div class=\"input-group-prepend\" style=\"height: 39px;\">\r\n          <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\r\n        </div>\r\n        <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\r\n      </div>\r\n      <div class=\"col-md-3 form-group text-right\">\r\n        <button type=\"submit\" class=\"btn btn-primary mt-4 mr-1\" (click)=\"exportAsXLSX()\">\r\n          <span translate>Export</span>\r\n        </button>\r\n        <button [routerLink]=\"['add']\" class=\"btn btn-primary mt-4 mr-1\">\r\n          Add Coupon\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"tile-body p-0 table-responsive \">\r\n      <table class=\"table table-striped\">\r\n        <thead>\r\n          <tr class=\"table-header\">\r\n            <th width=\"15%\" sortable=\"Title\"> Title </th>\r\n            <th width=\"15%\" sortable=\"Type\">Type </th>\r\n            <th width=\"15%\" sortable=\"Amount\"> Amount</th>\r\n            <th width=\"15%\" sortable=\"CouponCode\"> Coupon Code</th>\r\n            <th width=\"15%\" sortable=\"Status\">Status </th>\r\n            <th width=\"10%\">Action</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let item of data$ | async \">\r\n            <td> {{item.title}} </td>\r\n            <td> {{item.type}} </td>\r\n            <td> {{item.amount}} </td>\r\n            <td> {{item.couponCode}} </td>\r\n            <td>\r\n              <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n              </ngb-highlight>\r\n            </td>\r\n            <td>\r\n              <a (click)=\"Edit(item.couponID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n              <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n        <p class=\"pagination-count\">\r\n          Showing\r\n          <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n          <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n          <strong>{{(total$ | async)!}}</strong> results\r\n        </p>\r\n      </div>\r\n      <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n        <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n        </ngb-pagination>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/delivery/delivery.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/delivery/delivery.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<!-- Page Heading -->\n<h1 class=\"h3 mb-2 text-gray-800\">Delivery</h1>\n<p class=\"mb-4\"></p>\n\n<!-- DataTales Example -->\n<div class=\"card shadow mb-4\">\n    <div class=\"card-header py-3\">\n        <div class=\"row\">\n            <div class=\"col-md-6\">\n                <h6 class=\"m-0 font-weight-bold text-orange\">Delivery Area</h6>\n            </div>\n            <div class=\" col-lg-4 input-group mb-3\">\n                <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\n                </div>\n                <input class=\"form-control search-filter\" placeholder=\"Filter by name\" type=\"text\" name=\"searchTerm\" [(ngModel)]=\"service.searchTerm\" />\n            </div>\n            <div class=\"col-md-2 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\n                Add Area\n            </button></div>\n        </div>\n\n\n\n    </div>\n    <div class=\"card-body\">\n        <div class=\"tile-body p-0 table-responsive \">\n            <table class=\"table table-striped\">\n                <thead>\n                    <tr class=\"table-header\">                      \n                        <th width=\"30%\" sortable=\"name\" (sort)=\"onSort($event)\"> Name </th>\n                        <th width=\"10%\" sortable=\"amount\" (sort)=\"onSort($event)\">  Amount </th>  \n                        <th width=\"15%\" sortable=\"statusID\" (sort)=\"onSort($event)\"> Status </th>                          \n                        <th width=\"10%\"></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let item of data$ | async \">\n                     \n                        <td> {{item.name}} </td>\n                        <td> {{item.amount}} </td>\n                        <td>\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\n                            </ngb-highlight>\n                        </td>\n                        <td>\n                            <a (click)=\"Edit(item.deliveryAreaID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\n\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n\n\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <p class=\"pagination-count\">\n                    Showing\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\n                    <strong>{{(total$ | async)!}}</strong> results\n                </p>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\n                </ngb-pagination>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/medicalservices/add/addservice.component.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/medicalservices/add/addservice.component.html ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Service</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"servicesForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Medical Services Details</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            \r\n              <div class=\"form-group col-md-8\">\r\n                <div class=\"form-group\">\r\n                  <label class=\"small mb-1\" for=\"inputUsername\">Nursing Type</label>\r\n                  <select class=\"custom-select\" formControlName=\"nursingTypeID\"> \r\n                  <option [ngValue]=\"option.nursingTypeID\"  selected=\"option.nursingTypeID == nursingTypeID\"\r\n                  *ngFor=\"let option of NursingTypeActive\">\r\n                  {{option.type}}\r\n                  </option>\r\n                  </select>\r\n                </div>\r\n              </div>          \r\n\r\n            <div class=\"form-group col-md-8\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Name</label>\r\n                <input type=\"text\" class=\"form-control\" id=name placeholder=\"\" formControlName=\"name\">\r\n                <div *ngIf=\"f.name.invalid && (f.name.dirty || f.name.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.name.errors.required\">\r\n                    Name is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!-- Form Row-->\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputFirstName\">Description</label>\r\n                  <input type=\"text\" class=\"form-control\" id=Description placeholder=\"\" formControlName=\"description\">\r\n                  <div *ngIf=\"f.description.invalid && (f.description.dirty || f.description.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.description.errors.required\">\r\n                      Description is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!-- <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputFirstName\">Requirement</label>\r\n                  <input type=\"text\" class=\"form-control\" id=requirment placeholder=\"\" formControlName=\"requirment\">\r\n                  <div *ngIf=\"f.requirment.invalid && (f.requirment.dirty || f.requirment.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.requirment.errors.required\">\r\n                      Requirement is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div> -->\r\n\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                    <label class=\"small mb-1\" for=\"inputFirstName\">Requirement</label>\r\n                    <input type=\"text\" class=\"form-control\" id=requirment placeholder=\"\" formControlName=\"requirment\">\r\n\r\n                </div>\r\n            </div>\r\n\r\n              <div class=\"form-row\">\r\n                <div class=\"form-group col-md-12\">\r\n                  <label class=\"small mb-1\" for=\"inputFirstName\">Fees</label>\r\n                  <input type=\"number\" class=\"form-control\" id=fees placeholder=\"\" formControlName=\"fees\">\r\n                  <div *ngIf=\"f.fees.invalid && (f.fees.dirty || f.fees.touched)\" class=\"alert alert-danger\">\r\n                    <div *ngIf=\"f.fees.errors.required\">\r\n                      Fees is required.\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              \r\n\r\n            </div>\r\n            <div class=\"form-group col-md-4 text-center\">\r\n              <app-imageupload></app-imageupload>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Save changes button-->\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/medicalservices/service.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/medicalservices/service.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Medical Service</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Services List</h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Services\r\n            </button></div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                        <th width=\"10%\">IMAGE</th>\r\n                        <th width=\"15%\" sortable=\"name\" (sort)=\"onSort($event)\"> Name </th>\r\n                        <th width=\"15%\" sortable=\"descripiton\" (sort)=\"onSort($event)\">Descripiton </th>\r\n                        <th width=\"15%\" sortable=\"requirement\" (sort)=\"onSort($event)\">Requirement </th>\r\n                        <th width=\"15%\" sortable=\"fees\" (sort)=\"onSort($event)\">Fees </th>\r\n                        <th width=\"15%\" sortable=\"statusID\" (sort)=\"onSort($event)\">Status </th>\r\n                        <th width=\"10%\">Action</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                        <td>\r\n                            <img *ngIf=\"item.image !== ''\" [src]=\"item.image\" class=\"table-img\" alt=\"\" />\r\n                            <div *ngIf=\"item.image === ''\" class=\"image-replace\"></div>\r\n                        </td>\r\n                        <td> {{item.name}} </td>\r\n                        <td> {{item.description}} </td>\r\n                        <td> {{item.requirment}} </td>\r\n                        <td> {{item.fees}} </td>\r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.medicalServiceID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/medicalservicetype/add/addmedicalservicetype.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/medicalservicetype/add/addmedicalservicetype.component.html ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"h3 mb-2 text-gray-800\">Add Service Type</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<form [formGroup]=\"servicesForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-xl-12\">\r\n      <div class=\"card mb-4\">\r\n        <div class=\"card-header\">Medical Type Details</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-md-8\">\r\n              <div class=\"form-group\">\r\n                <label class=\"small mb-1\" for=\"inputUsername\">Type</label>\r\n                <input type=\"text\" class=\"form-control\" id=type placeholder=\"\" formControlName=\"type\">\r\n                <div *ngIf=\"f.type.invalid && (f.type.dirty || f.type.touched)\" class=\"alert alert-danger\">\r\n                  <div *ngIf=\"f.type.errors.required\">\r\n                    Type is required.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!-- Form Row-->\r\n              \r\n            </div>\r\n            \r\n          </div>\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group col-lg-12\">\r\n              <label for=\"Item Status\">Status</label>\r\n              <div class=\"custom-control custom-switch custom-switch-md\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"statusID\" formControlName=\"statusID\">\r\n                <label class=\"custom-control-label\" for=\"statusID\"></label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Save changes button-->\r\n          <button class=\"btn btn-primary\" type=\"submit\">Save changes</button>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/medicalservicetype/medicalservicetype.component.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/medicalservicetype/medicalservicetype.component.html ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page Heading -->\r\n<h1 class=\"h3 mb-2 text-gray-800\">Medical Servic Type</h1>\r\n<p class=\"mb-4\"></p>\r\n\r\n<!-- DataTales Example -->\r\n<div class=\"card shadow mb-4\">\r\n    <div class=\"card-header py-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h6 class=\"m-0 font-weight-bold text-orange\">Service Type List</h6>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\"> <button [routerLink]=\"['add']\" class=\"btn btn-primary \">\r\n                Add Service Type\r\n            </button></div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"tile-body p-0 table-responsive \">\r\n            <table class=\"table table-striped\">\r\n                <thead>\r\n                    <tr class=\"table-header\">\r\n                         \r\n                        <th width=\"15%\" sortable=\"name\" (sort)=\"onSort($event)\"> Type </th>                        \r\n                        <th width=\"15%\" sortable=\"statusID\" (sort)=\"onSort($event)\">Status </th>\r\n                        <th width=\"10%\">Action</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of data$ | async \">\r\n                       \r\n                        <td> {{item.type}} </td>                      \r\n                        <td>\r\n                            <ngb-highlight [ngClass]=\"{'btn-success': item.statusID === 1, 'btn-danger':item.statusID !== 1 }\" class=\"btn btn-sm\" [result]=\"item.statusID ==1?'Active':'Inactive'\" [term]=\"service.searchTerm\">\r\n                            </ngb-highlight>\r\n                        </td>\r\n                        <td>\r\n                            <a (click)=\"Edit(item.nursingTypeID)\"><i class=\"fas fa-fw fa-edit\"></i> </a>\r\n\r\n                            <a (click)=\"Delete(item)\"><i class=\"fas fa-fw fa-trash-alt\"></i> </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <p class=\"pagination-count\">\r\n                    Showing\r\n                    <strong>{{(service.pageSize * service.page)-9}}</strong> to\r\n                    <strong>{{(service.pageSize * service.page) > (total$ | async)!?(total$ | async)!:service.pageSize * service.page}}</strong> of\r\n                    <strong>{{(total$ | async)!}}</strong> results\r\n                </p>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n                <ngb-pagination [collectionSize]=\"(total$ | async)!\" class=\"float-right\" [(page)]=\"service.page\" [pageSize]=\"service.pageSize\" [maxSize]=\"3\" [rotate]=\"true\" [boundaryLinks]=\"true\">\r\n                </ngb-pagination>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

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
/* harmony default export */ __webpack_exports__["default"] = ("<body id=\"page-top\">\r\n  <!-- Page Wrapper -->\r\n  <div id=\"wrapper\">\r\n\r\n    <!-- Sidebar -->\r\n    <ul class=\"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion\" id=\"accordionSidebar\">\r\n      <!-- Sidebar - Brand -->\r\n      <a class=\"sidebar-brand d-flex align-items-center justify-content-center\" [routerLink]=\"['dashboard']\">\r\n        <div class=\"sidebar-brand-icon\">\r\n          <img src=\"../../assets/img/logo-White.png\" style=\"width: 45%;\" />\r\n        </div>\r\n      </a>\r\n      <!-- Divider -->\r\n      <hr class=\"sidebar-divider my-0\">\r\n      <!-- Nav Item - Dashboard -->\r\n      <li class=\"nav-item active\">\r\n        <a class=\"nav-link\" [routerLink]=\"['dashboard']\">\r\n          <i class=\"fas fa-fw fa-tachometer-alt\"></i>\r\n          <span>Dashboard</span>\r\n        </a>\r\n      </li>\r\n      <!-- Divider -->\r\n      <hr class=\"sidebar-divider\">\r\n      <!-- Heading -->\r\n      <div class=\"sidebar-heading\">\r\n        Modules\r\n      </div>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseTwo\" aria-expanded=\"true\" aria-controls=\"collapseTwo\">\r\n          <i class=\"fas fa-fw fa-list\"></i>\r\n          <span>Manage Doctors</span>\r\n        </a>\r\n        <div id=\"collapseTwo\" class=\"collapse\" aria-labelledby=\"headingTwo\" data-parent=\"#accordionSidebar\">\r\n          <div class=\"bg-white py-2 collapse-inner rounded\">\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/managedoctor/doctor']\"> Doctor</a>\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/reception/appointment']\">Dr. Appoinment</a>\r\n          </div>\r\n        </div>\r\n      </li>\r\n      <hr class=\"sidebar-divider\">\r\n      <!-- Nav Item - Pages Collapse Menu -->\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseCustomer\" aria-expanded=\"true\" aria-controls=\"collapseCustomer\">\r\n          <i class=\"fas fa-fw fa-user\"></i>\r\n          <span>Pharmacy</span>\r\n        </a>\r\n        <div id=\"collapseCustomer\" class=\"collapse\" aria-labelledby=\"headingTwo\" data-parent=\"#accordionSidebar\">\r\n          <div class=\"bg-white py-2 collapse-inner rounded\">\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/pharmacy/medicine']\">Medicine</a>\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/pharmacy/prescription']\">Prescription</a>\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/pharmacy/orders']\">Orders</a>\r\n          </div>\r\n        </div>\r\n      </li>\r\n      <hr class=\"sidebar-divider\">\r\n      <!-- Nav Item - Utilities Collapse Menu -->\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseCompany\" aria-expanded=\"true\" aria-controls=\"collapseCompany\">\r\n          <i class=\"fas fa-fw fa-folder\"></i>\r\n          <span>Reception</span>\r\n        </a>\r\n        <div id=\"collapseCompany\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\r\n          <div class=\"bg-white py-2 collapse-inner rounded\">\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/reception/customers']\">Customer Informations</a>\r\n            \r\n          </div>\r\n        </div>\r\n      </li>\r\n      <hr class=\"sidebar-divider\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseLab\" aria-expanded=\"true\" aria-controls=\"collapseLab\">\r\n          <i class=\"fas fa-fw fa-folder\"></i>\r\n          <span>Laboratory</span>\r\n        </a>\r\n        <div id=\"collapseLab\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\r\n          <div class=\"bg-white py-2 collapse-inner rounded\">\r\n            <!-- <a class=\"collapse-item\" [routerLink]=\"['/admin/orders']\">Orders</a> -->\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/laboratory/uploadreport']\">Upload Reports</a>\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/laboratory/customerinquiry']\">Customer Inquiry</a>\r\n          </div>\r\n        </div>\r\n      </li>\r\n      <hr class=\"sidebar-divider\">\r\n      \r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseMedicalService\" aria-expanded=\"true\" aria-controls=\"collapseSettings\">\r\n          <i class=\"fas fa-fw fa-wrench\"></i>\r\n          <span>Home Nursing</span>\r\n        </a>\r\n        <div id=\"collapseMedicalService\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\r\n          <div class=\"bg-white py-2 collapse-inner rounded\">\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/settings/medicalservicetype']\">Medical Service Type </a>\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/settings/medicalservices']\">Medical Services</a>\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/reception/appointment']\">Nursing Appoinment</a>\r\n          </div>\r\n        </div>\r\n      </li>\r\n\r\n      <hr class=\"sidebar-divider d-none d-md-block\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseSettings\" aria-expanded=\"true\" aria-controls=\"collapseSettings\">\r\n          <i class=\"fas fa-fw fa-wrench\"></i>\r\n          <span>Settings</span>\r\n        </a>\r\n        <div id=\"collapseSettings\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\r\n          <div class=\"bg-white py-2 collapse-inner rounded\">\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/delivery']\">Delivery</a>\r\n             <a class=\"collapse-item\" [routerLink]=\"['/admin/settings/appsettings/add']\">General Settings</a> \r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/settings/banner']\">Discount Banners | APP</a>\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/settings/coupon']\">Coupons</a>\r\n            <a class=\"collapse-item\" [routerLink]=\"['/admin/settings/medicalservices']\">Medical Services</a>\r\n          </div>\r\n        </div>\r\n      </li>\r\n      <!-- Divider -->\r\n     \r\n      <!-- Divider -->\r\n      <hr class=\"sidebar-divider d-none d-md-block\">\r\n\r\n      <!-- Sidebar Toggler (Sidebar) -->\r\n      <div class=\"text-center d-none d-md-inline\">\r\n        <button class=\"rounded-circle border-0\" id=\"sidebarToggle\"></button>\r\n      </div>\r\n    </ul>\r\n    <!-- End of Sidebar -->\r\n    <!-- Content Wrapper -->\r\n    <div id=\"content-wrapper\" class=\"d-flex flex-column\">\r\n      <!-- Main Content -->\r\n      <div id=\"content\">\r\n        <!-- Topbar -->\r\n        <nav class=\"navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow\">\r\n          <!-- Sidebar Toggle (Topbar) -->\r\n          <button id=\"sidebarToggleTop\" class=\"btn btn-link d-md-none rounded-circle mr-3\">\r\n            <i class=\"fa fa-bars\"></i>\r\n          </button>\r\n\r\n          <!-- Topbar Search -->\r\n          <div class=\"d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100\">\r\n            <strong>Welcome to Mamji Hospital</strong> \r\n            \r\n          </div>\r\n\r\n          <!-- Topbar Navbar -->\r\n          <ul class=\"navbar-nav ml-auto\">\r\n            <!-- Nav Item - User Information -->\r\n            <li class=\"nav-item dropdown no-arrow\">\r\n              <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"userDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                <span class=\"mr-2 d-none d-lg-inline text-gray-600 small\">Administrator</span>\r\n                <img class=\"img-profile rounded-circle\" src=\"https://user-images.githubusercontent.com/16608864/35882949-bbe13aa0-0bab-11e8-859c-ceda3b213818.jpeg\">\r\n              </a>\r\n              <!-- Dropdown - User Information -->\r\n              <div class=\"dropdown-menu dropdown-menu-right shadow animated--grow-in\" aria-labelledby=\"userDropdown\">\r\n                <div class=\"dropdown-divider\"></div>\r\n                <a class=\"dropdown-item\" data-toggle=\"modal\" (click)=\"Logout()\">\r\n                  <i class=\"fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400\"></i> Logout\r\n                </a>\r\n              </div>\r\n            </li>\r\n\r\n          </ul>\r\n\r\n        </nav>\r\n        <!-- End of Topbar -->\r\n        <!-- Begin Page Content -->\r\n        <div class=\"container-fluid\">\r\n          <router-outlet></router-outlet>\r\n        </div>\r\n      </div>\r\n      <!-- End of Main Content -->\r\n      <!-- Footer -->\r\n      <footer class=\"sticky-footer bg-white\">\r\n        <div class=\"container my-auto\">\r\n          <div class=\"copyright text-center my-auto\">\r\n            <span>Copyright &copy; Mamji 2022</span>\r\n          </div>\r\n        </div>\r\n      </footer>\r\n      <!-- End of Footer -->\r\n\r\n    </div>\r\n    <!-- End of Content Wrapper -->\r\n\r\n  </div>\r\n</body>\r\n");

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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
let ExcelService = class ExcelService {
};
ExcelService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
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

/***/ "./src/app/_services/appointment.service.ts":
/*!**************************************************!*\
  !*** ./src/app/_services/appointment.service.ts ***!
  \**************************************************/
/*! exports provided: AppointmentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppointmentService", function() { return AppointmentService; });
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
    return data.patientName.toLowerCase().includes(term.toLowerCase());
}
let AppointmentService = class AppointmentService {
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
    loadDoctor() {
        return this.http.get(`api/doctor/all`);
    }
    loadSpecialities() {
        return this.http.get(`api/doctor/speciality`);
    }
    loadDay() {
        return this.http.get(`api/doctor/days`);
    }
    getById(id) {
        return this.http.get(`api/appointment/appointment/${id}`);
    }
    ExportList(doctorID) {
        return this.http.get('api/appointment/all/${appointmentID}');
    }
    getAllData() {
        const url = `api/appointment/all`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.appointments = res;
                this._data$.next(this.appointments);
                this._allData$.next(this.appointments);
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
        let sortedData = sort(this.appointments, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
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
        return this.http.post('api/appointment/insert', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(data) {
        return this.http.post('api/appointment/update', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(data) {
        return this.http.post('api/appointment/delete', data);
    }
};
AppointmentService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
AppointmentService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], AppointmentService);



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
    //  return data.minimumOrderAmount.toLowerCase().includes(term.toLowerCase())
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
    getById(id) {
        return this.http.get(`api/appsetting/${id}`);
    }
    getAllData() {
        debugger;
        const url = `api/appsetting/all`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                debugger;
                this.Appsetting = res;
                this._data$.next(this.Appsetting);
                this._allData$.next(this.Appsetting);
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
        let sortedData = sort(this.Appsetting, sortColumn, sortDirection);
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
        return this.http.post(`api/appsetting/insert`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        debugger;
        return this.http.post(`api/appsetting/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(updateData) {
        return this.http.post(`api/appsetting/delete`, updateData);
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
    getById(id) {
        return this.http.get(`api/banner/${id}`);
    }
    getAllData() {
        const url = `api/banner/all`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.Banner = res;
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

/***/ "./src/app/_services/coupon.service.ts":
/*!*********************************************!*\
  !*** ./src/app/_services/coupon.service.ts ***!
  \*********************************************/
/*! exports provided: CouponService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponService", function() { return CouponService; });
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
    return data.title.toLowerCase().includes(term.toLowerCase());
}
let CouponService = class CouponService {
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
    getById(id) {
        return this.http.get(`api/coupon/${id}`);
    }
    getAllData() {
        const url = `api/coupon/all`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.Coupon = res;
                this._data$.next(this.Coupon);
                this._allData$.next(this.Coupon);
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
        let sortedData = sort(this.Coupon, sortColumn, sortDirection);
        //// 2. filter
        sortedData = sortedData.filter(data => matches(data, searchTerm));
        const total = sortedData.length;
        // 3. paginate
        const data = sortedData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ data, total });
    }
    clear() {
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
        return this.http.post('api/coupon/insert', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/coupon/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(updateData) {
        return this.http.post(`api/coupon/delete`, updateData);
    }
};
CouponService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
CouponService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], CouponService);



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
        return this.http.get(`api/customer/all`);
    }
    getById(id) {
        return this.http.get(`api/customer/customer/${id}`);
    }
    getAllData() {
        const url = `api/customer/all`;
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
    delete(data) {
        debugger;
        return this.http.post(`api/customer/delete`, data);
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
/*! exports provided: DashboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardService", function() { return DashboardService; });
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



let DashboardService = class DashboardService {
    constructor(http) {
        this.http = http;
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._search$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._allData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
    }
    get loading$() { return this._loading$.asObservable(); }
    get data$() {
        return this._data$.asObservable();
    }
    get allData$() {
        return this._allData$.asObservable();
    }
    getAllData() {
        return this.http.get(`api/dashboard/all`);
    }
};
DashboardService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
DashboardService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], DashboardService);



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
        debugger;
        return this.http.get(`api/delivery/${id}`);
    }
    // getBrands(brandId) {
    //   return this.http.get<Delivery[]>(`api/delivery/settings/${brandId}`);
    // }
    getAllData() {
        const url = `api/delivery/all`;
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

/***/ "./src/app/_services/doctors.service.ts":
/*!**********************************************!*\
  !*** ./src/app/_services/doctors.service.ts ***!
  \**********************************************/
/*! exports provided: DoctorsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoctorsService", function() { return DoctorsService; });
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
let DoctorsService = class DoctorsService {
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
    getById(id) {
        return this.http.get(`api/doctor/doctor/${id}`);
    }
    ExportList(doctorID) {
        return this.http.get('api/doctor/all/${doctorID}');
    }
    getAllData() {
        const url = `api/doctor/all`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.doctors = res;
                this._data$.next(this.doctors);
                this._allData$.next(this.doctors);
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
        let sortedData = sort(this.doctors, sortColumn, sortDirection);
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
        return this.http.post('api/doctor/insert', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(data) {
        return this.http.post('api/doctor/update', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(data) {
        return this.http.post('api/doctor/delete', data);
    }
};
DoctorsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
DoctorsService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], DoctorsService);



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

/***/ "./src/app/_services/laboratory.service.ts":
/*!*************************************************!*\
  !*** ./src/app/_services/laboratory.service.ts ***!
  \*************************************************/
/*! exports provided: LaboratoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LaboratoryService", function() { return LaboratoryService; });
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
    return data.labReferenceNo.toLowerCase().includes(term.toLowerCase());
}
let LaboratoryService = class LaboratoryService {
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
    loadCustomer() {
        return this.http.get(`api/customer/all`);
    }
    ExportList(LaboratoryID) {
        return this.http.get(`api/Laboratory/all`);
    }
    getById(id) {
        return this.http.get(`api/Laboratory/Laboratory/${id}`);
    }
    getAllData() {
        const url = `api/Laboratory/all`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.laboratory = res;
                this._data$.next(this.laboratory);
                this._allData$.next(this.laboratory);
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
        let sortedData = sort(this.laboratory, sortColumn, sortDirection);
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
        return this.http.post('api/laboratory/insert', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/laboratory/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(data) {
        return this.http.post(`api/laboratory/delete`, data);
    }
};
LaboratoryService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
LaboratoryService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], LaboratoryService);



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
    getSelectedDoctor() {
        return JSON.parse(sessionStorage.getItem('_autheticatedUser'));
    }
    getSelectedPrescription() {
        return JSON.parse(sessionStorage.getItem('_autheticatedUser'));
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

/***/ "./src/app/_services/medical.service.ts":
/*!**********************************************!*\
  !*** ./src/app/_services/medical.service.ts ***!
  \**********************************************/
/*! exports provided: MedicalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicalService", function() { return MedicalService; });
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
let MedicalService = class MedicalService {
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
    ExportList(medicineID) {
        return this.http.get(`api/medicalservice/all`);
    }
    getById(id) {
        return this.http.get(`api/medicalservice/service/${id}`);
    }
    getAllData() {
        const url = `api/medicalservice/all`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.medical = res;
                this._data$.next(this.medical);
                this._allData$.next(this.medical);
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
        let sortedData = sort(this.medical, sortColumn, sortDirection);
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
        return this.http.post('api/medicalservice/insert', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/medicalservice/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(data) {
        return this.http.post(`api/medicalservice/delete`, data);
    }
    loadActiveTyp() {
        return this.http.get(`api/nursing/Alltype`);
    }
};
MedicalService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
MedicalService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], MedicalService);



/***/ }),

/***/ "./src/app/_services/medicalservicetype.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/_services/medicalservicetype.service.ts ***!
  \*********************************************************/
/*! exports provided: MedicalServiceTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicalServiceTypes", function() { return MedicalServiceTypes; });
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
    return data.type.toLowerCase().includes(term.toLowerCase());
}
let MedicalServiceTypes = class MedicalServiceTypes {
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
    ExportList(medicineID) {
        return this.http.get(`api/nursing/alltype`);
    }
    getById(id) {
        debugger;
        return this.http.get(`api/nursing/servicetype/${id}`);
    }
    getAllData() {
        debugger;
        const url = `api/nursing/Alltype`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.medical = res;
                this._data$.next(this.medical);
                this._allData$.next(this.medical);
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
        let sortedData = sort(this.medical, sortColumn, sortDirection);
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
        return this.http.post('api/nursing/inserttype', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/nursing/updatetype`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(data) {
        return this.http.post(`api/nursing/deletetype`, data);
    }
};
MedicalServiceTypes.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
MedicalServiceTypes = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], MedicalServiceTypes);



/***/ }),

/***/ "./src/app/_services/medicine.service.ts":
/*!***********************************************!*\
  !*** ./src/app/_services/medicine.service.ts ***!
  \***********************************************/
/*! exports provided: MedicineService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicineService", function() { return MedicineService; });
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
let MedicineService = class MedicineService {
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
    ExportList(medicineID) {
        return this.http.get(`api/medicine/all`);
    }
    getById(id) {
        return this.http.get(`api/medicine/medicine/${id}`);
    }
    getAllData() {
        debugger;
        const url = `api/medicine/all`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.medicine = res;
                this._data$.next(this.medicine);
                this._allData$.next(this.medicine);
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
        let sortedData = sort(this.medicine, sortColumn, sortDirection);
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
        return this.http.post('api/medicine/insert', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(updateData) {
        return this.http.post(`api/medicine/update`, updateData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(data) {
        debugger;
        return this.http.post(`api/medicine/delete`, data);
    }
};
MedicineService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
MedicineService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], MedicineService);



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
    return data.orderNo;
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
    getById(id) {
        return this.http.get(`api/orders/${id}`);
    }
    printorder(id, brandId) {
        return this.http.get(`api/orders/print/${id}`);
    }
    getAllData(fromDate, toDate) {
        const url = `api/orders/all/0/${fromDate}/${toDate}`;
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

/***/ "./src/app/_services/prescription.service.ts":
/*!***************************************************!*\
  !*** ./src/app/_services/prescription.service.ts ***!
  \***************************************************/
/*! exports provided: PrescriptionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrescriptionService", function() { return PrescriptionService; });
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
    return data.customerName.toLowerCase().includes(term.toLowerCase());
}
let PrescriptionService = class PrescriptionService {
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
    getById(id) {
        return this.http.get(`api/prescription/prescription/${id}`);
    }
    ExportList(prescriptionID) {
        return this.http.get('api/prescription/all/${prescriptionID}');
    }
    getAllData() {
        const url = `api/prescription/all`;
        console.log(url);
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => this._loading$.next(true)),
            this.http.get(url).subscribe(res => {
                this.prescription = res;
                this._data$.next(this.prescription);
                this._allData$.next(this.prescription);
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
        let sortedData = sort(this.prescription, sortColumn, sortDirection);
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
        return this.http.post('api/prescription/insert', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    update(data) {
        debugger;
        return this.http.post('api/prescription/update', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            console.log(res);
            return res;
        }));
    }
    delete(data) {
        return this.http.post('api/prescription/delete', data);
    }
};
PrescriptionService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
PrescriptionService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], PrescriptionService);



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
/* harmony import */ var src_app_services_dashboard_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/dashboard.service */ "./src/app/_services/dashboard.service.ts");
/* harmony import */ var src_app_models_Dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_models/Dashboard */ "./src/app/_models/Dashboard.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
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





let DashboardComponent = class DashboardComponent {
    constructor(service, ls, router) {
        this.service = service;
        this.ls = ls;
        this.router = router;
        this.dashboardSummary = new src_app_models_Dashboard__WEBPACK_IMPORTED_MODULE_2__["DashboardSummary"]();
        this.loading$ = service.loading$;
    }
    ngOnInit() {
        this.GetDashboard();
    }
    GetDashboard() {
        debugger;
        this.service.getAllData().subscribe((res) => {
            this.dashboardSummary = res[0];
        });
    }
};
DashboardComponent.ctorParameters = () => [
    { type: src_app_services_dashboard_service__WEBPACK_IMPORTED_MODULE_1__["DashboardService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
DashboardComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-dashboard',
        template: __importDefault(__webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/dashboard/dashboard.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./dashboard.component.css */ "./src/app/admin/dashboard/dashboard.component.css")).default]
    }),
    __metadata("design:paramtypes", [src_app_services_dashboard_service__WEBPACK_IMPORTED_MODULE_1__["DashboardService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], DashboardComponent);



/***/ }),

/***/ "./src/app/admin/laboratory/uploadreport/addreports/addreports.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/admin/laboratory/uploadreport/addreports/addreports.component.ts ***!
  \**********************************************************************************/
/*! exports provided: AddreportsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddreportsComponent", function() { return AddreportsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_laboratory_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/laboratory.service */ "./src/app/_services/laboratory.service.ts");
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







let AddreportsComponent = class AddreportsComponent {
    constructor(formBuilder, router, route, ls, ts, laboratoryService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.laboratoryService = laboratoryService;
        this.submitted = false;
        this.loading = false;
        this.loadingReport = false;
        this.ButtonText = "Save";
        this.CustomerList = [];
        this.selectedCustomerIds = [];
        this.createForm();
        this.loadCustomer();
    }
    ngOnInit() {
        this.setSelectedReport();
    }
    get f() { return this.reportForm.controls; }
    createForm() {
        this.reportForm = this.formBuilder.group({
            labReferenceNo: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            statusID: [true],
            customerID: 0,
            laboratoryID: [0],
            image: [''],
        });
    }
    editForm(obj) {
        this.f.customerID.setValue(obj.customerID);
        this.f.labReferenceNo.setValue(obj.labReferenceNo);
        this.f.image.setValue(obj.image);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.imgComp.imageUrl = obj.image;
    }
    setSelectedReport() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingReport = true;
                this.f.laboratoryID.setValue(sid);
                this.laboratoryService.getById(sid).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingReport = false;
                });
            }
        });
    }
    onSubmit() {
        debugger;
        this.reportForm.markAllAsTouched();
        this.submitted = true;
        if (this.reportForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.image.setValue(this.imgComp.imageUrl);
        if (parseInt(this.f.laboratoryID.value) === 0) {
            //Insert customer
            console.log(JSON.stringify(this.reportForm.value));
            this.laboratoryService.insert(this.reportForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/laboratory/uploadreport']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update customer
            this.laboratoryService.update(this.reportForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/laboratory/uploadreport']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
    loadCustomer() {
        this.laboratoryService.loadCustomer().subscribe((res) => {
            this.CustomerList = res;
        });
    }
};
AddreportsComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_laboratory_service__WEBPACK_IMPORTED_MODULE_5__["LaboratoryService"] }
];
AddreportsComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddreportsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addreports',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addreports.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/laboratory/uploadreport/addreports/addreports.component.html")).default,
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_laboratory_service__WEBPACK_IMPORTED_MODULE_5__["LaboratoryService"]])
], AddreportsComponent);



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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_laboratory_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/laboratory.service */ "./src/app/_services/laboratory.service.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
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







let UploadreportComponent = class UploadreportComponent {
    constructor(service, ls, excelService, ts, router) {
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.service.getAllData();
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
    Edit(medicine) {
        this.router.navigate(["admin/laboratory/uploadreport/edit", medicine]);
    }
    Delete(obj) {
        debugger;
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
UploadreportComponent.ctorParameters = () => [
    { type: src_app_services_laboratory_service__WEBPACK_IMPORTED_MODULE_3__["LaboratoryService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
];
UploadreportComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_2__["NgbdSortableHeader"],] }]
};
UploadreportComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-uploadreport',
        template: __importDefault(__webpack_require__(/*! raw-loader!./uploadreport.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/laboratory/uploadreport/uploadreport.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"]],
        styles: [__importDefault(__webpack_require__(/*! ./uploadreport.component.css */ "./src/app/admin/laboratory/uploadreport/uploadreport.component.css")).default]
    }),
    __metadata("design:paramtypes", [src_app_services_laboratory_service__WEBPACK_IMPORTED_MODULE_3__["LaboratoryService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
], UploadreportComponent);



/***/ }),

/***/ "./src/app/admin/managedoctor/doctor/adddoctors/adddoctors.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/managedoctor/doctor/adddoctors/adddoctors.component.ts ***!
  \******************************************************************************/
/*! exports provided: AdddoctorsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdddoctorsComponent", function() { return AdddoctorsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_doctors_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/doctors.service */ "./src/app/_services/doctors.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_appointment_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/_services/appointment.service */ "./src/app/_services/appointment.service.ts");
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








let AdddoctorsComponent = class AdddoctorsComponent {
    constructor(formBuilder, router, route, ls, ts, doctorService, appointmentService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.doctorService = doctorService;
        this.appointmentService = appointmentService;
        this.submitted = false;
        this.loading = false;
        this.loadingDoctor = false;
        this.ButtonText = "Save";
        this.DoctorDaysDetailList = [];
        this.selectedSpecialityList = [];
        this.selectedSpecialistIds = [];
        this.DoctorDaysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturdey', 'Sunday'];
        this.TimeList = ['10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '12:00 PM - 01:00 PM', '01:00 PM - 02:00 PM'];
        this.selectedDaysID = [];
        this.selectedTimeslot = [];
        this.createForm();
        // this.loadDay();
        this.loadSpecialitiesAll();
    }
    ngOnInit() {
        this.setSelectedDoctor();
    }
    get f() { return this.doctorForm.controls; }
    createForm() {
        this.doctorForm = this.formBuilder.group({
            firstName: [''],
            lastName: [''],
            fullName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            skills: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            education: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            imagePath: [''],
            statusID: [true],
            fees: [0],
            gender: [''],
            timeslot: [''],
            doctorID: [0],
            specialities: [],
            days: [],
            times: [],
        });
    }
    editForm(obj) {
        debugger;
        this.selectedSpecialityList = obj.doctorSpeciality;
        this.DoctorDaysDetailList = obj.DaysDetail;
        this.selectedTimeslot = obj.times;
        this.f.firstName.setValue(obj.firstName);
        this.f.lastName.setValue(obj.lastName);
        this.f.fullName.setValue(obj.fullName);
        this.f.email.setValue(obj.email);
        this.f.profile.setValue(obj.profile);
        this.f.skills.setValue(obj.skills);
        this.f.doctorID.setValue(obj.doctorID);
        this.f.imagePath.setValue(obj.imagePath);
        this.f.education.setValue(obj.education);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
    }
    setSelectedDoctor() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingDoctor = true;
                this.f.doctorID.setValue(sid);
                this.doctorService.getById(sid).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingDoctor = false;
                });
            }
        });
    }
    loadSpecialitiesAll() {
        debugger;
        this.appointmentService.loadSpecialities().subscribe((res) => {
            this.selectedSpecialityList = res;
        });
    }
    // loadDay() {
    //   debugger
    //   this.appointmentService.loadDay().subscribe((res: any) => {
    //     this.DoctorDaysList = res;
    //   });
    // }
    onSubmit() {
        debugger;
        this.doctorForm.markAllAsTouched();
        this.submitted = true;
        if (this.doctorForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.specialities.setValue(this.selectedSpecialistIds == undefined ? "" : this.selectedSpecialistIds.toString());
        // this.f.days.setValue(this.selectedDaysID == undefined ? "" : this.selectedDaysID.toString());
        this.f.days.setValue(this.selectedDaysID);
        this.f.times.setValue(this.selectedTimeslot == undefined ? "" : this.selectedTimeslot.toString());
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.imagePath.setValue(this.imgComp.imageUrl);
        if (parseInt(this.f.doctorID.value) === 0) {
            //Insert doctor
            console.log(JSON.stringify(this.doctorForm.value));
            this.doctorService.insert(this.doctorForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/doctor']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update doctor
            this.doctorService.update(this.doctorForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/managedoctor/doctor']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
    RemoveChild(obj) {
        // const index = this.OrderDetailList.indexOf(obj);
        // this.OrderDetailList.splice(index, 1);
    }
    AddChild(val) {
        debugger;
        var obj = this.selectedSpecialityList.find(element => element.doctorSpeciality == val.doctorSpeciality);
        if (val.specialistID != null) {
            if (!this.selectedSpecialityList.find(element => element.name == val.name)) {
                this.selectedSpecialityList.push({
                    name: obj.name,
                });
            }
            else {
                alert("Item already added in list");
            }
            //this.clear();
        }
    }
};
AdddoctorsComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_doctors_service__WEBPACK_IMPORTED_MODULE_5__["DoctorsService"] },
    { type: src_app_services_appointment_service__WEBPACK_IMPORTED_MODULE_7__["AppointmentService"] }
];
AdddoctorsComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AdddoctorsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-adddoctors',
        template: __importDefault(__webpack_require__(/*! raw-loader!./adddoctors.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/managedoctor/doctor/adddoctors/adddoctors.component.html")).default,
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_doctors_service__WEBPACK_IMPORTED_MODULE_5__["DoctorsService"],
        src_app_services_appointment_service__WEBPACK_IMPORTED_MODULE_7__["AppointmentService"]])
], AdddoctorsComponent);



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
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
/* harmony import */ var src_app_services_doctors_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/doctors.service */ "./src/app/_services/doctors.service.ts");
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
    constructor(service, ls, excelService, ts, router) {
        //this.selectedDoctor =this.ls.getSelectedDoctor().doctorID;
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    exportAsXLSX() {
        this.service.ExportList(this.selectedDoctor).subscribe((res) => {
            /*      this.excelService.exportAsExcelFile(res, 'Report_Export');*/
        }, error => {
            this.ts.showError("Error", "Failed to export");
        });
    }
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.service.getAllData();
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
    Edit(doctors) {
        this.router.navigate(["admin/managedoctor/doctor/edit", doctors]);
    }
    Delete(data) {
        this.service.delete(data).subscribe((res) => {
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
DoctorComponent.ctorParameters = () => [
    { type: src_app_services_doctors_service__WEBPACK_IMPORTED_MODULE_6__["DoctorsService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
DoctorComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
DoctorComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-doctor',
        template: __importDefault(__webpack_require__(/*! raw-loader!./doctor.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/managedoctor/doctor/doctor.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"]],
        styles: [__importDefault(__webpack_require__(/*! ./doctor.component.css */ "./src/app/admin/managedoctor/doctor/doctor.component.css")).default]
    }),
    __metadata("design:paramtypes", [src_app_services_doctors_service__WEBPACK_IMPORTED_MODULE_6__["DoctorsService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
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
            //  this.excelService.exportAsExcelFile(res, 'Report_Export');
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
            //  this.excelService.exportAsExcelFile(res, 'Report_Export');
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
            /*      this.excelService.exportAsExcelFile(res, 'Report_Export');*/
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
            /*      this.excelService.exportAsExcelFile(res, 'Report_Export');*/
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

/***/ "./src/app/admin/pharmacy/medicine/addmedicines/addmedicine.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/pharmacy/medicine/addmedicines/addmedicine.component.ts ***!
  \*******************************************************************************/
/*! exports provided: AddmedicineComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddmedicineComponent", function() { return AddmedicineComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_medicine_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/medicine.service */ "./src/app/_services/medicine.service.ts");
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







//import { debug } from 'console';
let AddmedicineComponent = class AddmedicineComponent {
    constructor(formBuilder, router, route, ls, ts, medicineService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.medicineService = medicineService;
        this.submitted = false;
        this.loading = false;
        this.loadingmedicine = false;
        this.ButtonText = "Save";
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedmedicine();
    }
    get f() { return this.medicineForm.controls; }
    createForm() {
        this.medicineForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            statusID: [true],
            brandDetails: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            price: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            quantityDescription: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            medicineID: [0],
            image: [''],
        });
    }
    editForm(obj) {
        debugger;
        this.f.name.setValue(obj.name);
        this.f.description.setValue(obj.description);
        this.f.brandDetails.setValue(obj.brandDetails);
        this.f.price.setValue(obj.price);
        this.f.quantityDescription.setValue(obj.quantityDescription);
        this.f.medicineID.setValue(obj.medicineID);
        this.f.image.setValue(obj.image);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
    }
    setSelectedmedicine() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingmedicine = true;
                this.f.medicineID.setValue(sid);
                this.medicineService.getById(sid).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingmedicine = false;
                });
            }
        });
    }
    onSubmit() {
        this.medicineForm.markAllAsTouched();
        this.submitted = true;
        if (this.medicineForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.image.setValue(this.imgComp.imageUrl);
        if (parseInt(this.f.medicineID.value) === 0) {
            //Insert medicine
            console.log(JSON.stringify(this.medicineForm.value));
            this.medicineService.insert(this.medicineForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/pharmacy/medicine']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update medicine
            this.medicineService.update(this.medicineForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/pharmacy/medicine']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AddmedicineComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_medicine_service__WEBPACK_IMPORTED_MODULE_5__["MedicineService"] }
];
AddmedicineComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddmedicineComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addmedicine',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addmedicine.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/medicine/addmedicines/addmedicine.component.html")).default
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_medicine_service__WEBPACK_IMPORTED_MODULE_5__["MedicineService"]])
], AddmedicineComponent);



/***/ }),

/***/ "./src/app/admin/pharmacy/medicine/medicine.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/pharmacy/medicine/medicine.component.ts ***!
  \***************************************************************/
/*! exports provided: MedicineComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicineComponent", function() { return MedicineComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_medicine_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/medicine.service */ "./src/app/_services/medicine.service.ts");
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







let MedicineComponent = class MedicineComponent {
    constructor(service, ls, excelService, ts, router) {
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    //exportAsXLSX(): void {
    //  this.service.ExportList(this.selectedBrand).subscribe((res: any) => {
    //    this.excelService.exportAsExcelFile(res, 'Report_Export');
    //  }, error => {
    //    this.ts.showError("Error", "Failed to export")
    //  });
    //}
    getData() {
        this.service.getAllData();
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
    Edit(medicine) {
        this.router.navigate(["admin/pharmacy/medicine/edit", medicine]);
    }
    Delete(obj) {
        debugger;
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
MedicineComponent.ctorParameters = () => [
    { type: src_app_services_medicine_service__WEBPACK_IMPORTED_MODULE_2__["MedicineService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
MedicineComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
MedicineComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-customers',
        template: __importDefault(__webpack_require__(/*! raw-loader!./medicine.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/medicine/medicine.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_medicine_service__WEBPACK_IMPORTED_MODULE_2__["MedicineService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], MedicineComponent);



/***/ }),

/***/ "./src/app/admin/pharmacy/orderdetails/orderdetails.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/admin/pharmacy/orderdetails/orderdetails.component.ts ***!
  \***********************************************************************/
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
        //this.selectedBrand = this.ls.getSelectedBrand().brandID;
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
        this.orderOrderCheckout = new src_app_models_Orders__WEBPACK_IMPORTED_MODULE_3__["Orders"]();
        this.orderCustomerInfo = new src_app_models_Orders__WEBPACK_IMPORTED_MODULE_3__["CustomerOrders"]();
    }
    ngOnInit() {
        this.setSelectedOrder();
    }
    setSelectedOrder() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.service.getById(sid).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                });
            }
        });
    }
    updateOrder(order, status) {
        order.statusID = status;
        //Update 
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
        template: __importDefault(__webpack_require__(/*! raw-loader!./orderdetails.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/orderdetails/orderdetails.component.html")).default,
        providers: []
    }),
    __metadata("design:paramtypes", [src_app_services_orders_service__WEBPACK_IMPORTED_MODULE_5__["OrdersService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_1__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
], OrderdetailsComponent);



/***/ }),

/***/ "./src/app/admin/pharmacy/orders/orders.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/pharmacy/orders/orders.component.ts ***!
  \***********************************************************/
/*! exports provided: OrdersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersComponent", function() { return OrdersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_orders_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/orders.service */ "./src/app/_services/orders.service.ts");
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










let OrdersComponent = class OrdersComponent {
    constructor(service, ls, excelService, ts, router) {
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.Locations = [];
        this.selectedLocations = [];
        this.locationID = 0;
        this.salesorders = [];
        this.loading$ = service.loading$;
        this.submit = false;
        // this.selectedBrand = this.ls.getSelectedBrand().brandID;
        // this.loadLocations();
    }
    ngOnInit() {
    }
    getData() {
        this.service.getAllData(this.parseDate(this._datepicker.fromDate), this.parseDate(this._datepicker.toDate));
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
    View(orders) {
        this.router.navigate(["admin/orders/view", orders]);
    }
    Print(sid) {
        this.service.printorder(sid, this.selectedBrand).subscribe((res) => {
            //Set Forms
            if (res.status == 1) {
                this.printout(res.html);
            }
            else
                this.ts.showError("Error", "Failed to print.");
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
                this.getData();
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
        this.getData();
    }
    printout(html) {
        var newWindow = window.open('_self');
        newWindow.document.write(html);
        newWindow.print();
    }
};
OrdersComponent.ctorParameters = () => [
    { type: src_app_services_orders_service__WEBPACK_IMPORTED_MODULE_6__["OrdersService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
OrdersComponent.propDecorators = {
    _datepicker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_8__["NgbdDatepickerRangePopup"], { static: true },] }],
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_2__["NgbdSortableHeader"],] }],
    drplocation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['locationDrp',] }]
};
OrdersComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-orders',
        template: __importDefault(__webpack_require__(/*! raw-loader!./orders.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/orders/orders.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_orders_service__WEBPACK_IMPORTED_MODULE_6__["OrdersService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], OrdersComponent);



/***/ }),

/***/ "./src/app/admin/pharmacy/prescription/add/addprescription.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/pharmacy/prescription/add/addprescription.component.ts ***!
  \******************************************************************************/
/*! exports provided: AddprescriptionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddprescriptionComponent", function() { return AddprescriptionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_prescription_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/prescription.service */ "./src/app/_services/prescription.service.ts");
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







let AddprescriptionComponent = class AddprescriptionComponent {
    constructor(formBuilder, router, route, ls, ts, prescriptionService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.prescriptionService = prescriptionService;
        this.submitted = false;
        this.loading = false;
        this.loadingPrescription = false;
        this.ButtonText = "Save";
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedPrescription();
    }
    get f() { return this.prescriptionForm.controls; }
    createForm() {
        this.prescriptionForm = this.formBuilder.group({
            customerName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            mobile: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            address: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            note: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            image: [''],
            statusID: [true],
            prescriptionID: 0,
        });
    }
    editForm(obj) {
        this.f.customerName.setValue(obj.customerName);
        this.f.mobile.setValue(obj.mobile);
        this.f.address.setValue(obj.address);
        this.f.note.setValue(obj.note);
        this.f.prescriptionID.setValue(obj.prescriptionID);
        this.f.image.setValue(obj.image);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
    }
    setSelectedPrescription() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingPrescription = true;
                this.f.prescriptionID.setValue(sid);
                this.prescriptionService.getById(sid).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingPrescription = false;
                });
            }
        });
    }
    onSubmit() {
        debugger;
        this.prescriptionForm.markAllAsTouched();
        this.submitted = true;
        if (this.prescriptionForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.image.setValue(this.imgComp.imageUrl);
        if (parseInt(this.f.prescriptionID.value) === 0) {
            //Insert doctor
            console.log(JSON.stringify(this.prescriptionForm.value));
            this.prescriptionService.insert(this.prescriptionForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/pharmacy/prescription']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update doctor
            this.prescriptionService.update(this.prescriptionForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/pharmacy/prescription']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AddprescriptionComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_prescription_service__WEBPACK_IMPORTED_MODULE_5__["PrescriptionService"] }
];
AddprescriptionComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddprescriptionComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addprescriptions',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addprescription.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/prescription/add/addprescription.component.html")).default,
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_prescription_service__WEBPACK_IMPORTED_MODULE_5__["PrescriptionService"]])
], AddprescriptionComponent);



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
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
/* harmony import */ var src_app_services_prescription_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/prescription.service */ "./src/app/_services/prescription.service.ts");
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
    constructor(service, ls, excelService, ts, router) {
        //this.selectedPrescription =this.ls.getSelectedPrescription().prescriptionID;
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    exportAsXLSX() {
        this.service.ExportList(this.selectedPrescription).subscribe((res) => {
            /*      this.excelService.exportAsExcelFile(res, 'Report_Export');*/
        }, error => {
            this.ts.showError("Error", "Failed to export");
        });
    }
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.service.getAllData();
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
    Edit(prescription) {
        this.router.navigate(["admin/pharmacy/prescription/edit", prescription]);
    }
    Delete(data) {
        this.service.delete(data).subscribe((res) => {
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
PrescriptionComponent.ctorParameters = () => [
    { type: src_app_services_prescription_service__WEBPACK_IMPORTED_MODULE_6__["PrescriptionService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
PrescriptionComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
PrescriptionComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-prescription',
        template: __importDefault(__webpack_require__(/*! raw-loader!./prescription.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/pharmacy/prescription/prescription.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"]],
        styles: [__importDefault(__webpack_require__(/*! ./prescription.component.css */ "./src/app/admin/pharmacy/prescription/prescription.component.css")).default]
    }),
    __metadata("design:paramtypes", [src_app_services_prescription_service__WEBPACK_IMPORTED_MODULE_6__["PrescriptionService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], PrescriptionComponent);



/***/ }),

/***/ "./src/app/admin/reception/appointment/addappointment/addappointment.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/admin/reception/appointment/addappointment/addappointment.component.ts ***!
  \****************************************************************************************/
/*! exports provided: AddappointmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddappointmentComponent", function() { return AddappointmentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_appointment_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/appointment.service */ "./src/app/_services/appointment.service.ts");
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







let AddappointmentComponent = class AddappointmentComponent {
    constructor(formBuilder, router, route, ls, ts, appointmentService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.appointmentService = appointmentService;
        this.submitted = false;
        this.loading = false;
        this.loadingAppointment = false;
        this.ButtonText = "Save";
        this.DoctorList = [];
        this.DoctorDaysList = [];
        this.selectedDaysID = [];
        this.SpecialityList = [];
        this.drpSpecialityList = [];
        this.selectedSpecialityList = [];
        this.drpDayList = [];
        this.createForm();
        this.loadDoctor();
        this.loadDay();
        this.loadSpecialitiesAll();
    }
    ngOnInit() {
        this.setSelectedAppointment();
    }
    get f() { return this.appointmentForm.controls; }
    createForm() {
        this.appointmentForm = this.formBuilder.group({
            appointmentNo: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            patientName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            age: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            gender: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fees: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            bookingDate: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            DoctorDaysList: [],
            timeslot: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            appointmentStatus: [''],
            statusID: [true],
            appointmentID: 0,
            doctorID: '',
            customerID: '',
            specialityID: '',
            daysID: '',
            fullname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
    }
    editForm(obj) {
        this.f.patientName.setValue(obj.patientName);
        this.f.age.setValue(obj.age);
        this.f.gender.setValue(obj.gender);
        this.f.fees.setValue(obj.fees);
        this.f.bookingDate.setValue(obj.bookingDate);
        this.f.day.setValue(obj.day);
        this.f.appointmentID.setValue(obj.appointmentID);
        this.f.timeslot.setValue(obj.timeslot);
        this.f.appointmentNo.setValue(obj.appointmentNo);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        if (obj.doctorID != "") {
            var stringToConvert = obj.doctor;
            this.selectedDoctorIds = stringToConvert.split(',').map(Number);
            this.f.doctorID.setValue(obj.doctor);
        }
        if (obj.specialities != "") {
            var stringToConvert = obj.specialities;
            this.selectedSpecialistIds = stringToConvert.split(',').map(Number);
            this.f.specialities.setValue(obj.specialities);
        }
    }
    setSelectedAppointment() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingAppointment = true;
                this.f.appointmentID.setValue(sid);
                this.appointmentService.getById(sid).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingAppointment = false;
                });
            }
        });
    }
    onSubmit() {
        this.appointmentForm.markAllAsTouched();
        this.submitted = true;
        if (this.appointmentForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        if (parseInt(this.f.appointmentID.value) === 0) {
            console.log(JSON.stringify(this.appointmentForm.value));
            this.appointmentService.insert(this.appointmentForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/reception/appointment']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update doctor
            this.appointmentService.update(this.appointmentForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/reception/appointment']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
    loadDoctor() {
        this.appointmentService.loadDoctor().subscribe((res) => {
            this.DoctorList = res;
        });
    }
    loadSpecialities() {
        debugger;
        this.appointmentService.loadSpecialities().subscribe((res) => {
            this.SpecialityList = res;
        });
    }
    loadSpecialitiesAll() {
        debugger;
        this.appointmentService.loadSpecialities().subscribe((res) => {
            this.selectedSpecialityList = res;
        });
    }
    loadDay() {
        debugger;
        this.appointmentService.loadDay().subscribe((res) => {
            this.DoctorDaysList = res;
        });
    }
    selectedSpeciality(id) {
        debugger;
        this.drpSpecialityList = this.SpecialityList.filter(x => x.DoctorID == id);
        this.f.doctorID.setValue(id);
        //enable the drp down
    }
    selectedDay(id) {
        this.drpDayList = this.DoctorDaysList.filter(x => x.SpecialityID == id);
        this.f.specialityID.setValue(id);
        //enable the drp down
    }
    selectedTime(id) {
        this.f.dayID.setValue(id);
        //enable the drp down
    }
    onChange(DoctorList) {
        console.log(this.drpSpecialityList);
    }
};
AddappointmentComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_appointment_service__WEBPACK_IMPORTED_MODULE_5__["AppointmentService"] }
];
AddappointmentComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddappointmentComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addappointment',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addappointment.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/appointment/addappointment/addappointment.component.html")).default,
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_appointment_service__WEBPACK_IMPORTED_MODULE_5__["AppointmentService"]])
], AddappointmentComponent);



/***/ }),

/***/ "./src/app/admin/reception/appointment/appointment.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/admin/reception/appointment/appointment.component.css ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3JlY2VwdGlvbi9hcHBvaW50bWVudC9hcHBvaW50bWVudC5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/admin/reception/appointment/appointment.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/admin/reception/appointment/appointment.component.ts ***!
  \**********************************************************************/
/*! exports provided: AppointmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppointmentComponent", function() { return AppointmentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
/* harmony import */ var src_app_services_appointment_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/appointment.service */ "./src/app/_services/appointment.service.ts");
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







let AppointmentComponent = class AppointmentComponent {
    constructor(service, ls, excelService, ts, router) {
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        //this.selectedDoctor =this.ls.getSelectedAppointment().appointmentID;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    //exportAsXLSX(): void {
    //  this.service.ExportList(this.selectedAppointment).subscribe((res: any) => {
    //    this.excelService.exportAsExcelFile(res, 'Report_Export');
    //  }, error => {
    //    this.ts.showError("Error", "Failed to export")
    //  });
    //}
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.service.getAllData();
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
    Edit(appointment) {
        this.router.navigate(["admin/reception/appointment/edit", appointment]);
    }
    Delete(data) {
        this.service.delete(data).subscribe((res) => {
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
AppointmentComponent.ctorParameters = () => [
    { type: src_app_services_appointment_service__WEBPACK_IMPORTED_MODULE_6__["AppointmentService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
AppointmentComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
AppointmentComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-appointment',
        template: __importDefault(__webpack_require__(/*! raw-loader!./appointment.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/appointment/appointment.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"]],
        styles: [__importDefault(__webpack_require__(/*! ./appointment.component.css */ "./src/app/admin/reception/appointment/appointment.component.css")).default]
    }),
    __metadata("design:paramtypes", [src_app_services_appointment_service__WEBPACK_IMPORTED_MODULE_6__["AppointmentService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], AppointmentComponent);



/***/ }),

/***/ "./src/app/admin/reception/customers/addcustomers/addcustomer.component.css":
/*!**********************************************************************************!*\
  !*** ./src/app/admin/reception/customers/addcustomers/addcustomer.component.css ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3JlY2VwdGlvbi9jdXN0b21lcnMvYWRkY3VzdG9tZXJzL2FkZGN1c3RvbWVyLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/admin/reception/customers/addcustomers/addcustomer.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/admin/reception/customers/addcustomers/addcustomer.component.ts ***!
  \*********************************************************************************/
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







//import { debug } from 'console';
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
            statusID: [true],
            mobile: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            customerID: 0,
            image: [''],
        });
    }
    editForm(obj) {
        debugger;
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
        debugger;
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingCustomer = true;
                this.f.customerID.setValue(sid);
                this.customerService.getById(sid).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingCustomer = false;
                });
            }
        });
    }
    onSubmit() {
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
                    this.router.navigate(['/admin/reception/customers']);
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
                    this.router.navigate(['/admin/reception/customers']);
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
        template: __importDefault(__webpack_require__(/*! raw-loader!./addcustomer.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/customers/addcustomers/addcustomer.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./addcustomer.component.css */ "./src/app/admin/reception/customers/addcustomers/addcustomer.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_customers_service__WEBPACK_IMPORTED_MODULE_5__["CustomersService"]])
], AddcustomerComponent);



/***/ }),

/***/ "./src/app/admin/reception/customers/customers.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/admin/reception/customers/customers.component.ts ***!
  \******************************************************************/
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
        //this.selectedBrand =this.ls.getSelectedBrand().brandID;
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    ngOnInit() {
        this.getData();
    }
    exportAsXLSX() {
        this.service.ExportList(this.selectedBrand).subscribe((res) => {
            //  this.excelService.exportAsExcelFile(res, 'Report_Export');
        }, error => {
            this.ts.showError("Error", "Failed to export");
        });
    }
    getData() {
        this.service.getAllData();
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
        this.router.navigate(["admin/reception/customers/edit", customers]);
    }
    Delete(obj) {
        debugger;
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
        template: __importDefault(__webpack_require__(/*! raw-loader!./customers.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/reception/customers/customers.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"]]
    }),
    __metadata("design:paramtypes", [src_app_services_customers_service__WEBPACK_IMPORTED_MODULE_2__["CustomersService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], CustomersComponent);



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
        //  this.excelService.exportAsExcelFile(this.salesCategoryWise, 'Report_Export');
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









//import { ExcelService } from 'src/ExportExcel/excel.service';
let SalescustomerwiseComponent = class SalescustomerwiseComponent {
    constructor(service, ls, ts, 
    /*    public excelService: ExcelService,*/
    router) {
        this.service = service;
        this.ls = ls;
        this.ts = ts;
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
        //  this.excelService.exportAsExcelFile(this.orders, 'Report_Export');
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
    }),
    __metadata("design:paramtypes", [src_app_services_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
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
        //  this.excelService.exportAsExcelFile(this.orderDetails, 'Report_Export');
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
        //  this.excelService.exportAsExcelFile(this.salesItemWise, 'Report_Export');
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
        //  this.excelService.exportAsExcelFile(this.salesUserWise, 'Report_Export');
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
        //  this.excelService.exportAsExcelFile(this.export, 'Report_Export');
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
        //this.loadBrands();
        //this.selectedBrand =this.ls.getSelectedBrand();
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
            //brandID: this.ls.getSelectedBrand().brandID,
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
            //this.selectedBrandIds = stringToConvert.split(',').map(Number);
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
        //this.f.brands.setValue(this.selectedBrandIds == undefined ? "" : this.selectedBrandIds.toString());
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

/***/ "./src/app/admin/settings/appsettings/addappsettings/addsettings.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/admin/settings/appsettings/addappsettings/addsettings.component.ts ***!
  \************************************************************************************/
/*! exports provided: AddsettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddsettingsComponent", function() { return AddsettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_appsetting_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/appsetting.service */ "./src/app/_services/appsetting.service.ts");
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







let AddsettingsComponent = class AddsettingsComponent {
    constructor(formBuilder, router, route, ls, ts, settingService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.settingService = settingService;
        this.submitted = false;
        this.loading = false;
        this.loadingSetting = false;
        this.ButtonText = "Save";
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedSetting();
    }
    get f() { return this.settingForm.controls; }
    createForm() {
        this.settingForm = this.formBuilder.group({
            discount: [0],
            deliveryCharges: [0],
            minimumOrderAmount: [0],
            tax: [0],
            statusID: [true],
            appSettingID: 1,
        });
    }
    editForm(obj) {
        this.f.discount.setValue(obj.discount);
        this.f.deliveryCharges.setValue(obj.deliveryCharges);
        this.f.appSettingID.setValue(obj.appSettingID);
        this.f.minimumOrderAmount.setValue(obj.minimumOrderAmount);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.f.tax.setValue(obj.tax);
    }
    setSelectedSetting() {
        this.loadingSetting = true;
        this.settingService.getById(1).subscribe(res => {
            //Set Forms
            this.editForm(res);
            this.loadingSetting = false;
        });
        // this.route.paramMap.subscribe(param => {
        //   const sid = +param.get('id');
        //   if (sid) {
        //     this.loadingSetting = true;
        //     this.f.appSettingID.setValue(sid);
        //     this.settingService.getById(sid).subscribe(res => {
        //       //Set Forms
        //       this.editForm(res);
        //       this.loadingSetting = false;
        //     });
        //   }
        // })
    }
    onSubmit() {
        debugger;
        this.settingForm.markAllAsTouched();
        this.submitted = true;
        if (this.settingForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        if (parseInt('1') === 0) {
            //Insert banner
            console.log(JSON.stringify(this.settingForm.value));
            this.settingService.insert(this.settingForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/settings/appsettings']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update 
            this.settingService.update(this.settingForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.setSelectedSetting();
                    this.router.navigate(['/admin/settings/appsettings/add']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AddsettingsComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_appsetting_service__WEBPACK_IMPORTED_MODULE_5__["AppsettingService"] }
];
AddsettingsComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddsettingsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-Addsettings',
        template: __importDefault(__webpack_require__(/*! raw-loader!./Addsettings.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/appsettings/addappsettings/Addsettings.component.html")).default,
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_appsetting_service__WEBPACK_IMPORTED_MODULE_5__["AppsettingService"]])
], AddsettingsComponent);



/***/ }),

/***/ "./src/app/admin/settings/appsettings/appsettings.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/admin/settings/appsettings/appsettings.component.ts ***!
  \*********************************************************************/
/*! exports provided: AppsettingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppsettingComponent", function() { return AppsettingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_appsetting_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/appsetting.service */ "./src/app/_services/appsetting.service.ts");
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






let AppsettingComponent = class AppsettingComponent {
    constructor(service, ls, ts, router) {
        /*this.selectedBrand =this.ls.getSelectedBrand().brandID;*/
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
        debugger;
        this.service.getAllData();
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
    Edit(appsetting) {
        this.router.navigate(["admin/settings/appsettings/edit", appsetting]);
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
AppsettingComponent.ctorParameters = () => [
    { type: src_app_services_appsetting_service__WEBPACK_IMPORTED_MODULE_5__["AppsettingService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
AppsettingComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
AppsettingComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-appsettings',
        template: __importDefault(__webpack_require__(/*! raw-loader!./appsettings.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/appsettings/appsettings.component.html")).default,
        providers: []
    }),
    __metadata("design:paramtypes", [src_app_services_appsetting_service__WEBPACK_IMPORTED_MODULE_5__["AppsettingService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], AppsettingComponent);



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
        this.NursingTypeActive = ['Header', 'Featured'];
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedCustomer();
    }
    get f() { return this.bannerForm.controls; }
    createForm() {
        this.bannerForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            type: [''],
            description: [''],
            statusID: [true],
            bannerID: 0,
            image: [''],
        });
    }
    editForm(obj) {
        this.f.name.setValue(obj.name);
        this.f.type.setValue(obj.type);
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
                this.bannerService.getById(sid).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingCustomer = false;
                });
            }
        });
    }
    onSubmit() {
        debugger;
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
                    this.router.navigate(['/admin/settings/banner']);
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
                    this.router.navigate(['/admin/settings/banner']);
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
        /*     this.selectedBrand =this.ls.getSelectedBrand().brandID;*/
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
        this.service.getAllData();
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
        this.router.navigate(["admin/settings/banner/edit", banner]);
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

/***/ "./src/app/admin/settings/coupon/addcoupon/addcoupon.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/admin/settings/coupon/addcoupon/addcoupon.component.ts ***!
  \************************************************************************/
/*! exports provided: AddCouponComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddCouponComponent", function() { return AddCouponComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_coupon_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/coupon.service */ "./src/app/_services/coupon.service.ts");
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







let AddCouponComponent = class AddCouponComponent {
    constructor(formBuilder, router, route, ls, ts, couponService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.couponService = couponService;
        this.submitted = false;
        this.loading = false;
        this.loadingCoupon = false;
        this.ButtonText = "Save";
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedCustomer();
    }
    get f() { return this.couponForm.controls; }
    createForm() {
        this.couponForm = this.formBuilder.group({
            title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            type: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            amount: [''],
            statusID: [true],
            couponID: 0,
            couponCode: [''],
        });
    }
    editForm(obj) {
        this.f.title.setValue(obj.title);
        this.f.type.setValue(obj.type);
        this.f.couponID.setValue(obj.couponID);
        this.f.couponCode.setValue(obj.couponCode);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.f.amount.setValue(obj.amount);
    }
    setSelectedCustomer() {
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingCoupon = true;
                this.f.couponID.setValue(sid);
                this.couponService.getById(sid).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingCoupon = false;
                });
            }
        });
    }
    onSubmit() {
        this.couponForm.markAllAsTouched();
        this.submitted = true;
        if (this.couponForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        if (parseInt(this.f.couponID.value) === 0) {
            //Insert banner
            console.log(JSON.stringify(this.couponForm.value));
            this.couponService.insert(this.couponForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/settings/coupon']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update banner
            this.couponService.update(this.couponForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/settings/coupon']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AddCouponComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: src_app_services_coupon_service__WEBPACK_IMPORTED_MODULE_5__["CouponService"] }
];
AddCouponComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddCouponComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addcoupon',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addcoupon.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/coupon/addcoupon/addcoupon.component.html")).default,
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        src_app_services_coupon_service__WEBPACK_IMPORTED_MODULE_5__["CouponService"]])
], AddCouponComponent);



/***/ }),

/***/ "./src/app/admin/settings/coupon/coupon.component.css":
/*!************************************************************!*\
  !*** ./src/app/admin/settings/coupon/coupon.component.css ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3NldHRpbmdzL2NvdXBvbi9jb3Vwb24uY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/admin/settings/coupon/coupon.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/settings/coupon/coupon.component.ts ***!
  \***********************************************************/
/*! exports provided: CouponComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponComponent", function() { return CouponComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/ExportExcel/excel.service */ "./src/ExportExcel/excel.service.ts");
/* harmony import */ var src_app_services_coupon_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/coupon.service */ "./src/app/_services/coupon.service.ts");
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







let CouponComponent = class CouponComponent {
    constructor(service, ls, excelService, ts, router) {
        /*    this.selectedCoupon =this.ls.getSelectedDoctor().doctorID;*/
        this.service = service;
        this.ls = ls;
        this.excelService = excelService;
        this.ts = ts;
        this.router = router;
        this.loading$ = service.loading$;
        this.submit = false;
    }
    // exportAsXLSX(): void {
    //  this.service.ExportList(this.selectedDoctor).subscribe((res: any) => {    
    //  //  this.excelService.exportAsExcelFile(res, 'Report_Export');
    //  }, error => {
    //    this.ts.showError("Error","Failed to export")
    //  });
    //}
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.service.getAllData();
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
    Edit(coupons) {
        this.router.navigate(["admin/settings/coupon/edit", coupons]);
    }
    Delete(data) {
        this.service.delete(data).subscribe((res) => {
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
CouponComponent.ctorParameters = () => [
    { type: src_app_services_coupon_service__WEBPACK_IMPORTED_MODULE_6__["CouponService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
CouponComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
CouponComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-coupon',
        template: __importDefault(__webpack_require__(/*! raw-loader!./coupon.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/coupon/coupon.component.html")).default,
        providers: [src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"]],
        styles: [__importDefault(__webpack_require__(/*! ./coupon.component.css */ "./src/app/admin/settings/coupon/coupon.component.css")).default]
    }),
    __metadata("design:paramtypes", [src_app_services_coupon_service__WEBPACK_IMPORTED_MODULE_6__["CouponService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_ExportExcel_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], CouponComponent);



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
        //this.selectedBrand =this.ls.getSelectedBrand().brandID;
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
        this.service.getAllData();
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

/***/ "./src/app/admin/settings/medicalservices/add/addservice.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/admin/settings/medicalservices/add/addservice.component.ts ***!
  \****************************************************************************/
/*! exports provided: AddServiceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddServiceComponent", function() { return AddServiceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var _services_medical_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../_services/medical.service */ "./src/app/_services/medical.service.ts");
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







let AddServiceComponent = class AddServiceComponent {
    constructor(formBuilder, router, route, ls, ts, services) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.services = services;
        this.submitted = false;
        this.loading = false;
        this.loadingService = false;
        this.ButtonText = "Save";
        this.NursingTypeActive = [];
        this.createForm();
        this.loadActiveType();
    }
    ngOnInit() {
        this.setSelectedCustomer();
    }
    get f() { return this.servicesForm.controls; }
    createForm() {
        this.servicesForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: [''],
            requirment: [''],
            fees: [0],
            statusID: [true],
            medicalServiceID: 0,
            nursingTypeID: 0,
            image: [''],
        });
    }
    editForm(obj) {
        debugger;
        this.f.name.setValue(obj.name);
        this.f.description.setValue(obj.description);
        this.f.requirment.setValue(obj.requirment);
        this.f.fees.setValue(obj.fees);
        this.f.medicalServiceID.setValue(obj.medicalServiceID);
        this.f.nursingTypeID.setValue(obj.nursingTypeID);
        this.f.image.setValue(obj.image);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
        this.imgComp.imageUrl = obj.image;
    }
    loadActiveType() {
        this.services.loadActiveTyp().subscribe((res) => {
            this.NursingTypeActive = res;
        });
    }
    setSelectedCustomer() {
        debugger;
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingService = true;
                this.f.medicalServiceID.setValue(sid);
                this.services.getById(sid).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingService = false;
                });
            }
        });
    }
    onSubmit() {
        debugger;
        this.servicesForm.markAllAsTouched();
        this.submitted = true;
        if (this.servicesForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        this.f.image.setValue(this.imgComp.imageUrl);
        if (parseInt(this.f.medicalServiceID.value) === 0) {
            //Insert banner
            console.log(JSON.stringify(this.servicesForm.value));
            this.services.insert(this.servicesForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/settings/medicalservices']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update banner
            this.services.update(this.servicesForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/settings/medicalservices']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AddServiceComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: _services_medical_service__WEBPACK_IMPORTED_MODULE_6__["MedicalService"] }
];
AddServiceComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddServiceComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addservice',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addservice.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/medicalservices/add/addservice.component.html")).default,
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        _services_medical_service__WEBPACK_IMPORTED_MODULE_6__["MedicalService"]])
], AddServiceComponent);



/***/ }),

/***/ "./src/app/admin/settings/medicalservices/service.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/admin/settings/medicalservices/service.component.ts ***!
  \*********************************************************************/
/*! exports provided: ServiceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceComponent", function() { return ServiceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var _services_medical_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_services/medical.service */ "./src/app/_services/medical.service.ts");
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






let ServiceComponent = class ServiceComponent {
    constructor(service, ls, ts, router) {
        /*     this.selectedBrand =this.ls.getSelectedBrand().brandID;*/
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
        this.service.getAllData();
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
    Edit(service) {
        this.router.navigate(["admin/settings/medicalservices/edit", service]);
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
ServiceComponent.ctorParameters = () => [
    { type: _services_medical_service__WEBPACK_IMPORTED_MODULE_5__["MedicalService"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
ServiceComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
ServiceComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-service',
        template: __importDefault(__webpack_require__(/*! raw-loader!./service.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/medicalservices/service.component.html")).default,
        providers: []
    }),
    __metadata("design:paramtypes", [_services_medical_service__WEBPACK_IMPORTED_MODULE_5__["MedicalService"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], ServiceComponent);



/***/ }),

/***/ "./src/app/admin/settings/medicalservicetype/add/addmedicalservicetype.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/admin/settings/medicalservicetype/add/addmedicalservicetype.component.ts ***!
  \******************************************************************************************/
/*! exports provided: AddMedicalServicetypeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddMedicalServicetypeComponent", function() { return AddMedicalServicetypeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/imageupload/imageupload.component */ "./src/app/imageupload/imageupload.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_medicalservicetype_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/medicalservicetype.service */ "./src/app/_services/medicalservicetype.service.ts");
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







let AddMedicalServicetypeComponent = class AddMedicalServicetypeComponent {
    constructor(formBuilder, router, route, ls, ts, services) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.ls = ls;
        this.ts = ts;
        this.services = services;
        this.submitted = false;
        this.loading = false;
        this.loadingService = false;
        this.ButtonText = "Save";
        this.createForm();
    }
    ngOnInit() {
        this.setSelectedType();
    }
    get f() { return this.servicesForm.controls; }
    createForm() {
        this.servicesForm = this.formBuilder.group({
            type: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            statusID: [true],
            nursingTypeID: 0,
        });
    }
    editForm(obj) {
        this.f.type.setValue(obj.type);
        this.f.nursingTypeID.setValue(obj.nursingTypeID);
        this.f.statusID.setValue(obj.statusID === 1 ? true : false);
    }
    setSelectedType() {
        debugger;
        this.route.paramMap.subscribe(param => {
            const sid = +param.get('id');
            if (sid) {
                this.loadingService = true;
                this.f.nursingTypeID.setValue(sid);
                this.services.getById(sid).subscribe(res => {
                    //Set Forms
                    this.editForm(res);
                    this.loadingService = false;
                });
            }
        });
    }
    onSubmit() {
        this.servicesForm.markAllAsTouched();
        this.submitted = true;
        if (this.servicesForm.invalid) {
            return;
        }
        this.loading = true;
        this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
        if (parseInt(this.f.nursingTypeID.value) === 0) {
            //Insert banner
            console.log(JSON.stringify(this.servicesForm.value));
            this.services.insert(this.servicesForm.value).subscribe(data => {
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record added successfully.");
                    this.router.navigate(['/admin/settings/medicalservicetype']);
                }
                this.loading = false;
            }, error => {
                this.ts.showError("Error", "Failed to insert record.");
                this.loading = false;
            });
        }
        else {
            //Update banner
            this.services.update(this.servicesForm.value).subscribe(data => {
                this.loading = false;
                if (data != 0) {
                    this.ts.showSuccess("Success", "Record updated successfully.");
                    this.router.navigate(['/admin/settings/medicalservicetype']);
                }
            }, error => {
                this.ts.showError("Error", "Failed to update record.");
                this.loading = false;
            });
        }
    }
};
AddMedicalServicetypeComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"] },
    { type: src_app_services_medicalservicetype_service__WEBPACK_IMPORTED_MODULE_6__["MedicalServiceTypes"] }
];
AddMedicalServicetypeComponent.propDecorators = {
    imgComp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [src_app_imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_2__["ImageuploadComponent"], { static: true },] }]
};
AddMedicalServicetypeComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-addservice',
        template: __importDefault(__webpack_require__(/*! raw-loader!./addmedicalservicetype.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/medicalservicetype/add/addmedicalservicetype.component.html")).default,
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_5__["ToastService"],
        src_app_services_medicalservicetype_service__WEBPACK_IMPORTED_MODULE_6__["MedicalServiceTypes"]])
], AddMedicalServicetypeComponent);



/***/ }),

/***/ "./src/app/admin/settings/medicalservicetype/medicalservicetype.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/admin/settings/medicalservicetype/medicalservicetype.component.ts ***!
  \***********************************************************************************/
/*! exports provided: MedicalServicetypeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicalServicetypeComponent", function() { return MedicalServicetypeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/sortable.directive */ "./src/app/_directives/sortable.directive.ts");
/* harmony import */ var src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/local-storage.service */ "./src/app/_services/local-storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/toastservice */ "./src/app/_services/toastservice.ts");
/* harmony import */ var src_app_services_medicalservicetype_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/medicalservicetype.service */ "./src/app/_services/medicalservicetype.service.ts");
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






let MedicalServicetypeComponent = class MedicalServicetypeComponent {
    constructor(service, ls, ts, router) {
        /*     this.selectedBrand =this.ls.getSelectedBrand().brandID;*/
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
        this.service.getAllData();
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
    Edit(service) {
        debugger;
        this.router.navigate(["admin/settings/medicalservicetype/edit", service]);
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
MedicalServicetypeComponent.ctorParameters = () => [
    { type: src_app_services_medicalservicetype_service__WEBPACK_IMPORTED_MODULE_5__["MedicalServiceTypes"] },
    { type: src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] },
    { type: src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
MedicalServicetypeComponent.propDecorators = {
    headers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [src_app_directives_sortable_directive__WEBPACK_IMPORTED_MODULE_1__["NgbdSortableHeader"],] }]
};
MedicalServicetypeComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-service',
        template: __importDefault(__webpack_require__(/*! raw-loader!./medicalservicetype.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/admin/settings/medicalservicetype/medicalservicetype.component.html")).default,
        providers: []
    }),
    __metadata("design:paramtypes", [src_app_services_medicalservicetype_service__WEBPACK_IMPORTED_MODULE_5__["MedicalServiceTypes"],
        src_app_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
        src_app_services_toastservice__WEBPACK_IMPORTED_MODULE_4__["ToastService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], MedicalServicetypeComponent);



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
/* harmony import */ var _admin_reception_customers_customers_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./admin/reception/customers/customers.component */ "./src/app/admin/reception/customers/customers.component.ts");
/* harmony import */ var _admin_reception_customers_addcustomers_addcustomer_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./admin/reception/customers/addcustomers/addcustomer.component */ "./src/app/admin/reception/customers/addcustomers/addcustomer.component.ts");
/* harmony import */ var _admin_company_locations_locations_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./admin/company/locations/locations.component */ "./src/app/admin/company/locations/locations.component.ts");
/* harmony import */ var _admin_company_locations_addlocation_addlocation_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./admin/company/locations/addlocation/addlocation.component */ "./src/app/admin/company/locations/addlocation/addlocation.component.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/__ivy_ngcc__/fesm2015/ng-select-ng-select.js");
/* harmony import */ var _admin_company_brands_addbrand_addbrand_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./admin/company/brands/addbrand/addbrand.component */ "./src/app/admin/company/brands/addbrand/addbrand.component.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/__ivy_ngcc__/fesm2015/ngx-toastr.js");
/* harmony import */ var _admin_company_brands_brands_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./admin/company/brands/brands.component */ "./src/app/admin/company/brands/brands.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _admin_report_summary_summary_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./admin/report/summary/summary.component */ "./src/app/admin/report/summary/summary.component.ts");
/* harmony import */ var _datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./datepicker-range/datepicker-range-popup */ "./src/app/datepicker-range/datepicker-range-popup.ts");
/* harmony import */ var _admin_settings_banner_banner_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./admin/settings/banner/banner.component */ "./src/app/admin/settings/banner/banner.component.ts");
/* harmony import */ var _admin_settings_banner_addbanner_addbanner_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./admin/settings/banner/addbanner/addbanner.component */ "./src/app/admin/settings/banner/addbanner/addbanner.component.ts");
/* harmony import */ var _admin_report_salesdetail_salesdetail_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./admin/report/salesdetail/salesdetail.component */ "./src/app/admin/report/salesdetail/salesdetail.component.ts");
/* harmony import */ var _admin_report_salesuserwise_salesuserwise_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./admin/report/salesuserwise/salesuserwise.component */ "./src/app/admin/report/salesuserwise/salesuserwise.component.ts");
/* harmony import */ var _admin_report_salescustomerwise_salescustomerwise_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./admin/report/salescustomerwise/salescustomerwise.component */ "./src/app/admin/report/salescustomerwise/salescustomerwise.component.ts");
/* harmony import */ var _admin_report_salescategorywise_salescategorywise_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./admin/report/salescategorywise/salescategorywise.component */ "./src/app/admin/report/salescategorywise/salescategorywise.component.ts");
/* harmony import */ var _admin_report_salesitemwise_salesitemwise_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./admin/report/salesitemwise/salesitemwise.component */ "./src/app/admin/report/salesitemwise/salesitemwise.component.ts");
/* harmony import */ var _admin_settings_offers_offers_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./admin/settings/offers/offers.component */ "./src/app/admin/settings/offers/offers.component.ts");
/* harmony import */ var _admin_settings_offers_addoffers_addoffers_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./admin/settings/offers/addoffers/addoffers.component */ "./src/app/admin/settings/offers/addoffers/addoffers.component.ts");
/* harmony import */ var _admin_menu_items_itemsettings_itemsettings_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./admin/menu/items/itemsettings/itemsettings.component */ "./src/app/admin/menu/items/itemsettings/itemsettings.component.ts");
/* harmony import */ var _admin_settings_delivery_delivery_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./admin/settings/delivery/delivery.component */ "./src/app/admin/settings/delivery/delivery.component.ts");
/* harmony import */ var _admin_settings_Delivery_adddelivery_adddelivery_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./admin/settings/Delivery/adddelivery/adddelivery.component */ "./src/app/admin/settings/Delivery/adddelivery/adddelivery.component.ts");
/* harmony import */ var _admin_settings_appsettings_appsettings_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./admin/settings/appsettings/appsettings.component */ "./src/app/admin/settings/appsettings/appsettings.component.ts");
/* harmony import */ var _admin_settings_appsettings_addappsettings_addsettings_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./admin/settings/appsettings/addappsettings/addsettings.component */ "./src/app/admin/settings/appsettings/addappsettings/addsettings.component.ts");
/* harmony import */ var _admin_menu_addons_addons_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./admin/menu/addons/addons.component */ "./src/app/admin/menu/addons/addons.component.ts");
/* harmony import */ var _admin_menu_addons_addaddons_addaddons_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./admin/menu/addons/addaddons/addaddons.component */ "./src/app/admin/menu/addons/addaddons/addaddons.component.ts");
/* harmony import */ var _admin_managedoctor_doctor_doctor_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./admin/managedoctor/doctor/doctor.component */ "./src/app/admin/managedoctor/doctor/doctor.component.ts");
/* harmony import */ var _admin_managedoctor_doctor_adddoctors_adddoctors_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./admin/managedoctor/doctor/adddoctors/adddoctors.component */ "./src/app/admin/managedoctor/doctor/adddoctors/adddoctors.component.ts");
/* harmony import */ var _admin_pharmacy_customerinquiry_customerinquiry_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./admin/pharmacy/customerinquiry/customerinquiry.component */ "./src/app/admin/pharmacy/customerinquiry/customerinquiry.component.ts");
/* harmony import */ var _admin_pharmacy_prescription_prescription_component__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./admin/pharmacy/prescription/prescription.component */ "./src/app/admin/pharmacy/prescription/prescription.component.ts");
/* harmony import */ var _admin_pharmacy_prescription_add_addprescription_component__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./admin/pharmacy/prescription/add/addprescription.component */ "./src/app/admin/pharmacy/prescription/add/addprescription.component.ts");
/* harmony import */ var _admin_reception_appointment_appointment_component__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./admin/reception/appointment/appointment.component */ "./src/app/admin/reception/appointment/appointment.component.ts");
/* harmony import */ var _admin_reception_appointment_addappointment_addappointment_component__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./admin/reception/appointment/addappointment/addappointment.component */ "./src/app/admin/reception/appointment/addappointment/addappointment.component.ts");
/* harmony import */ var _admin_laboratory_uploadreport_uploadreport_component__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./admin/laboratory/uploadreport/uploadreport.component */ "./src/app/admin/laboratory/uploadreport/uploadreport.component.ts");
/* harmony import */ var _admin_laboratory_uploadreport_addreports_addreports_component__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./admin/laboratory/uploadreport/addreports/addreports.component */ "./src/app/admin/laboratory/uploadreport/addreports/addreports.component.ts");
/* harmony import */ var _admin_pharmacy_deliverydetail_deliverydetail_component__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./admin/pharmacy/deliverydetail/deliverydetail.component */ "./src/app/admin/pharmacy/deliverydetail/deliverydetail.component.ts");
/* harmony import */ var _admin_settings_coupon_coupon_component__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./admin/settings/coupon/coupon.component */ "./src/app/admin/settings/coupon/coupon.component.ts");
/* harmony import */ var _admin_settings_coupon_addcoupon_addcoupon_component__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./admin/settings/coupon/addcoupon/addcoupon.component */ "./src/app/admin/settings/coupon/addcoupon/addcoupon.component.ts");
/* harmony import */ var _admin_pharmacy_medicine_medicine_component__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./admin/pharmacy/medicine/medicine.component */ "./src/app/admin/pharmacy/medicine/medicine.component.ts");
/* harmony import */ var _admin_pharmacy_medicine_addmedicines_addmedicine_component__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./admin/pharmacy/medicine/addmedicines/addmedicine.component */ "./src/app/admin/pharmacy/medicine/addmedicines/addmedicine.component.ts");
/* harmony import */ var _admin_pharmacy_orders_orders_component__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./admin/pharmacy/orders/orders.component */ "./src/app/admin/pharmacy/orders/orders.component.ts");
/* harmony import */ var _admin_pharmacy_orderdetails_orderdetails_component__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./admin/pharmacy/orderdetails/orderdetails.component */ "./src/app/admin/pharmacy/orderdetails/orderdetails.component.ts");
/* harmony import */ var _admin_settings_medicalservices_service_component__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./admin/settings/medicalservices/service.component */ "./src/app/admin/settings/medicalservices/service.component.ts");
/* harmony import */ var _admin_settings_medicalservices_add_addservice_component__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./admin/settings/medicalservices/add/addservice.component */ "./src/app/admin/settings/medicalservices/add/addservice.component.ts");
/* harmony import */ var _admin_settings_medicalservicetype_medicalservicetype_component__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./admin/settings/medicalservicetype/medicalservicetype.component */ "./src/app/admin/settings/medicalservicetype/medicalservicetype.component.ts");
/* harmony import */ var _admin_settings_medicalservicetype_add_addmedicalservicetype_component__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./admin/settings/medicalservicetype/add/addmedicalservicetype.component */ "./src/app/admin/settings/medicalservicetype/add/addmedicalservicetype.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























/*import { NgApexchartsModule } from 'ng-apexcharts';*/




























/*import { LaboratoryinquiryComponent } from './admin/reception/laboratoryinquiry/laboratoryinquiry.component';*/













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
            _admin_reception_customers_customers_component__WEBPACK_IMPORTED_MODULE_23__["CustomersComponent"],
            _admin_reception_customers_addcustomers_addcustomer_component__WEBPACK_IMPORTED_MODULE_24__["AddcustomerComponent"],
            _admin_company_brands_brands_component__WEBPACK_IMPORTED_MODULE_30__["BrandComponent"],
            _admin_company_brands_addbrand_addbrand_component__WEBPACK_IMPORTED_MODULE_28__["AddbrandComponent"],
            _admin_company_locations_locations_component__WEBPACK_IMPORTED_MODULE_25__["LocationsComponent"],
            _admin_company_locations_addlocation_addlocation_component__WEBPACK_IMPORTED_MODULE_26__["AddlocationComponent"],
            _imageupload_imageupload_component__WEBPACK_IMPORTED_MODULE_18__["ImageuploadComponent"],
            _admin_report_summary_summary_component__WEBPACK_IMPORTED_MODULE_32__["SummaryComponent"],
            _datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_33__["NgbdDatepickerRangePopup"],
            _admin_settings_banner_banner_component__WEBPACK_IMPORTED_MODULE_34__["BannerComponent"],
            _admin_settings_banner_addbanner_addbanner_component__WEBPACK_IMPORTED_MODULE_35__["AddbannerComponent"],
            _admin_settings_offers_offers_component__WEBPACK_IMPORTED_MODULE_41__["OffersComponent"],
            _admin_settings_offers_addoffers_addoffers_component__WEBPACK_IMPORTED_MODULE_42__["AddoffersComponent"],
            _admin_report_salesdetail_salesdetail_component__WEBPACK_IMPORTED_MODULE_36__["SalesdetailComponent"],
            _admin_report_salescategorywise_salescategorywise_component__WEBPACK_IMPORTED_MODULE_39__["SalescategorywiseComponent"],
            _admin_report_salescustomerwise_salescustomerwise_component__WEBPACK_IMPORTED_MODULE_38__["SalescustomerwiseComponent"],
            _admin_report_salesitemwise_salesitemwise_component__WEBPACK_IMPORTED_MODULE_40__["SalesitemwiseComponent"],
            _admin_report_salesuserwise_salesuserwise_component__WEBPACK_IMPORTED_MODULE_37__["SalesuserwiseComponent"],
            _admin_menu_items_itemsettings_itemsettings_component__WEBPACK_IMPORTED_MODULE_43__["ItemsettingsComponent"],
            _admin_settings_delivery_delivery_component__WEBPACK_IMPORTED_MODULE_44__["DeliveryComponent"],
            _admin_settings_Delivery_adddelivery_adddelivery_component__WEBPACK_IMPORTED_MODULE_45__["AdddeliveryComponent"],
            _admin_settings_appsettings_appsettings_component__WEBPACK_IMPORTED_MODULE_46__["AppsettingComponent"],
            _admin_menu_addons_addons_component__WEBPACK_IMPORTED_MODULE_48__["AddonsComponent"],
            _admin_menu_addons_addaddons_addaddons_component__WEBPACK_IMPORTED_MODULE_49__["AddaddonsComponent"],
            //ModalContentComponent,
            //NgbdModalContent,
            _admin_managedoctor_doctor_doctor_component__WEBPACK_IMPORTED_MODULE_50__["DoctorComponent"],
            _admin_managedoctor_doctor_adddoctors_adddoctors_component__WEBPACK_IMPORTED_MODULE_51__["AdddoctorsComponent"],
            _admin_settings_coupon_coupon_component__WEBPACK_IMPORTED_MODULE_60__["CouponComponent"],
            _admin_settings_coupon_addcoupon_addcoupon_component__WEBPACK_IMPORTED_MODULE_61__["AddCouponComponent"],
            _admin_pharmacy_customerinquiry_customerinquiry_component__WEBPACK_IMPORTED_MODULE_52__["CustomerinquiryComponent"],
            _admin_pharmacy_prescription_prescription_component__WEBPACK_IMPORTED_MODULE_53__["PrescriptionComponent"],
            _admin_pharmacy_prescription_add_addprescription_component__WEBPACK_IMPORTED_MODULE_54__["AddprescriptionComponent"],
            _admin_reception_appointment_appointment_component__WEBPACK_IMPORTED_MODULE_55__["AppointmentComponent"],
            _admin_reception_appointment_addappointment_addappointment_component__WEBPACK_IMPORTED_MODULE_56__["AddappointmentComponent"],
            /*    LaboratoryinquiryComponent,*/
            _admin_laboratory_uploadreport_uploadreport_component__WEBPACK_IMPORTED_MODULE_57__["UploadreportComponent"],
            _admin_laboratory_uploadreport_addreports_addreports_component__WEBPACK_IMPORTED_MODULE_58__["AddreportsComponent"],
            _admin_pharmacy_medicine_medicine_component__WEBPACK_IMPORTED_MODULE_62__["MedicineComponent"],
            _admin_pharmacy_medicine_addmedicines_addmedicine_component__WEBPACK_IMPORTED_MODULE_63__["AddmedicineComponent"],
            _admin_pharmacy_orders_orders_component__WEBPACK_IMPORTED_MODULE_64__["OrdersComponent"],
            _admin_pharmacy_orderdetails_orderdetails_component__WEBPACK_IMPORTED_MODULE_65__["OrderdetailsComponent"],
            _admin_settings_appsettings_addappsettings_addsettings_component__WEBPACK_IMPORTED_MODULE_47__["AddsettingsComponent"],
            _admin_settings_medicalservices_service_component__WEBPACK_IMPORTED_MODULE_66__["ServiceComponent"],
            _admin_settings_medicalservices_add_addservice_component__WEBPACK_IMPORTED_MODULE_67__["AddServiceComponent"],
            _admin_settings_medicalservicetype_medicalservicetype_component__WEBPACK_IMPORTED_MODULE_68__["MedicalServicetypeComponent"],
            _admin_settings_medicalservicetype_add_addmedicalservicetype_component__WEBPACK_IMPORTED_MODULE_69__["AddMedicalServicetypeComponent"],
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"].withServerTransition({ appId: 'ng-cli-universal' }),
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_27__["NgSelectModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_29__["ToastrModule"].forRoot(),
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_31__["BrowserAnimationsModule"],
            /*    NgApexchartsModule,*/
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
                        { path: 'item/settings', component: _admin_menu_items_itemsettings_itemsettings_component__WEBPACK_IMPORTED_MODULE_43__["ItemsettingsComponent"] },
                        { path: 'item/edit/:id', component: _admin_menu_items_additem_additem_component__WEBPACK_IMPORTED_MODULE_20__["AdditemsComponent"] },
                        { path: 'modifier', component: _admin_menu_modifiers_modifiers_component__WEBPACK_IMPORTED_MODULE_21__["ModifiersComponent"] },
                        { path: 'modifier/add', component: _admin_menu_modifiers_addmodifier_addmodifier_component__WEBPACK_IMPORTED_MODULE_22__["AddmodifierComponent"] },
                        { path: 'modifier/edit/:id', component: _admin_menu_modifiers_addmodifier_addmodifier_component__WEBPACK_IMPORTED_MODULE_22__["AddmodifierComponent"] },
                        { path: 'location', component: _admin_company_locations_locations_component__WEBPACK_IMPORTED_MODULE_25__["LocationsComponent"] },
                        { path: 'location/add', component: _admin_company_locations_addlocation_addlocation_component__WEBPACK_IMPORTED_MODULE_26__["AddlocationComponent"] },
                        { path: 'location/edit/:id', component: _admin_company_locations_addlocation_addlocation_component__WEBPACK_IMPORTED_MODULE_26__["AddlocationComponent"] },
                        { path: 'brand', component: _admin_company_brands_brands_component__WEBPACK_IMPORTED_MODULE_30__["BrandComponent"] },
                        { path: 'brand/add', component: _admin_company_brands_addbrand_addbrand_component__WEBPACK_IMPORTED_MODULE_28__["AddbrandComponent"] },
                        { path: 'brand/edit/:id', component: _admin_company_brands_addbrand_addbrand_component__WEBPACK_IMPORTED_MODULE_28__["AddbrandComponent"] },
                        { path: 'settings/banner', component: _admin_settings_banner_banner_component__WEBPACK_IMPORTED_MODULE_34__["BannerComponent"] },
                        { path: 'settings/banner/add', component: _admin_settings_banner_addbanner_addbanner_component__WEBPACK_IMPORTED_MODULE_35__["AddbannerComponent"] },
                        { path: 'settings/banner/edit/:id', component: _admin_settings_banner_addbanner_addbanner_component__WEBPACK_IMPORTED_MODULE_35__["AddbannerComponent"] },
                        { path: 'offers', component: _admin_settings_offers_offers_component__WEBPACK_IMPORTED_MODULE_41__["OffersComponent"] },
                        { path: 'offers/add', component: _admin_settings_offers_addoffers_addoffers_component__WEBPACK_IMPORTED_MODULE_42__["AddoffersComponent"] },
                        { path: 'offers/edit/:id', component: _admin_settings_offers_addoffers_addoffers_component__WEBPACK_IMPORTED_MODULE_42__["AddoffersComponent"] },
                        { path: 'report/summary', component: _admin_report_summary_summary_component__WEBPACK_IMPORTED_MODULE_32__["SummaryComponent"] },
                        { path: 'report/salesdetail', component: _admin_report_salesdetail_salesdetail_component__WEBPACK_IMPORTED_MODULE_36__["SalesdetailComponent"] },
                        { path: 'report/salesuserwise', component: _admin_report_salesuserwise_salesuserwise_component__WEBPACK_IMPORTED_MODULE_37__["SalesuserwiseComponent"] },
                        { path: 'report/salescustomerwise', component: _admin_report_salescustomerwise_salescustomerwise_component__WEBPACK_IMPORTED_MODULE_38__["SalescustomerwiseComponent"] },
                        { path: 'report/salescategorywise', component: _admin_report_salescategorywise_salescategorywise_component__WEBPACK_IMPORTED_MODULE_39__["SalescategorywiseComponent"] },
                        { path: 'report/salesitemwise', component: _admin_report_salesitemwise_salesitemwise_component__WEBPACK_IMPORTED_MODULE_40__["SalesitemwiseComponent"] },
                        { path: 'delivery', component: _admin_settings_delivery_delivery_component__WEBPACK_IMPORTED_MODULE_44__["DeliveryComponent"] },
                        { path: 'delivery/add', component: _admin_settings_Delivery_adddelivery_adddelivery_component__WEBPACK_IMPORTED_MODULE_45__["AdddeliveryComponent"] },
                        { path: 'delivery/edit/:id', component: _admin_settings_Delivery_adddelivery_adddelivery_component__WEBPACK_IMPORTED_MODULE_45__["AdddeliveryComponent"] },
                        { path: 'settings/appsettings', component: _admin_settings_appsettings_appsettings_component__WEBPACK_IMPORTED_MODULE_46__["AppsettingComponent"] },
                        { path: 'settings/appsettings/add', component: _admin_settings_appsettings_addappsettings_addsettings_component__WEBPACK_IMPORTED_MODULE_47__["AddsettingsComponent"] },
                        { path: 'settings/appsettings/edit/:id', component: _admin_settings_appsettings_addappsettings_addsettings_component__WEBPACK_IMPORTED_MODULE_47__["AddsettingsComponent"] },
                        { path: 'addons', component: _admin_menu_addons_addons_component__WEBPACK_IMPORTED_MODULE_48__["AddonsComponent"] },
                        { path: 'addons/add', component: _admin_menu_addons_addaddons_addaddons_component__WEBPACK_IMPORTED_MODULE_49__["AddaddonsComponent"] },
                        { path: 'addons/edit/:id', component: _admin_menu_addons_addaddons_addaddons_component__WEBPACK_IMPORTED_MODULE_49__["AddaddonsComponent"] },
                        { path: 'managedoctor/doctor', component: _admin_managedoctor_doctor_doctor_component__WEBPACK_IMPORTED_MODULE_50__["DoctorComponent"] },
                        { path: 'managedoctor/doctor/adddoctors', component: _admin_managedoctor_doctor_adddoctors_adddoctors_component__WEBPACK_IMPORTED_MODULE_51__["AdddoctorsComponent"] },
                        { path: 'managedoctor/doctor/edit/:id', component: _admin_managedoctor_doctor_adddoctors_adddoctors_component__WEBPACK_IMPORTED_MODULE_51__["AdddoctorsComponent"] },
                        { path: 'pharmacy/customerinquiry', component: _admin_pharmacy_customerinquiry_customerinquiry_component__WEBPACK_IMPORTED_MODULE_52__["CustomerinquiryComponent"] },
                        { path: 'pharmacy/prescription', component: _admin_pharmacy_prescription_prescription_component__WEBPACK_IMPORTED_MODULE_53__["PrescriptionComponent"] },
                        { path: 'pharmacy/prescription/addprescription', component: _admin_pharmacy_prescription_add_addprescription_component__WEBPACK_IMPORTED_MODULE_54__["AddprescriptionComponent"] },
                        { path: 'pharmacy/prescription/edit/:id', component: _admin_pharmacy_prescription_add_addprescription_component__WEBPACK_IMPORTED_MODULE_54__["AddprescriptionComponent"] },
                        { path: 'reception/customerinquiry', component: _admin_pharmacy_customerinquiry_customerinquiry_component__WEBPACK_IMPORTED_MODULE_52__["CustomerinquiryComponent"] },
                        { path: 'reception/customers', component: _admin_reception_customers_customers_component__WEBPACK_IMPORTED_MODULE_23__["CustomersComponent"] },
                        { path: 'reception/customers/addcustomers', component: _admin_reception_customers_addcustomers_addcustomer_component__WEBPACK_IMPORTED_MODULE_24__["AddcustomerComponent"] },
                        { path: 'reception/customers/edit/:id', component: _admin_reception_customers_addcustomers_addcustomer_component__WEBPACK_IMPORTED_MODULE_24__["AddcustomerComponent"] },
                        { path: 'reception/appointment', component: _admin_reception_appointment_appointment_component__WEBPACK_IMPORTED_MODULE_55__["AppointmentComponent"] },
                        { path: 'reception/appointment/addappointment', component: _admin_reception_appointment_addappointment_addappointment_component__WEBPACK_IMPORTED_MODULE_56__["AddappointmentComponent"] },
                        { path: 'reception/appointment/edit/:id', component: _admin_reception_appointment_addappointment_addappointment_component__WEBPACK_IMPORTED_MODULE_56__["AddappointmentComponent"] },
                        /*          { path: 'reception/laboratoryinquiry', component: LaboratoryinquiryComponent },*/
                        { path: 'laboratory/customerinquiry', component: _admin_pharmacy_customerinquiry_customerinquiry_component__WEBPACK_IMPORTED_MODULE_52__["CustomerinquiryComponent"] },
                        { path: 'laboratory/uploadreport', component: _admin_laboratory_uploadreport_uploadreport_component__WEBPACK_IMPORTED_MODULE_57__["UploadreportComponent"] },
                        { path: 'laboratory/uploadreport/addreports', component: _admin_laboratory_uploadreport_addreports_addreports_component__WEBPACK_IMPORTED_MODULE_58__["AddreportsComponent"] },
                        { path: 'laboratory/uploadreport/edit/:id', component: _admin_laboratory_uploadreport_addreports_addreports_component__WEBPACK_IMPORTED_MODULE_58__["AddreportsComponent"] },
                        { path: 'pharmacy/deliverydetail', component: _admin_pharmacy_deliverydetail_deliverydetail_component__WEBPACK_IMPORTED_MODULE_59__["DeliverydetailComponent"] },
                        { path: 'settings/coupon', component: _admin_settings_coupon_coupon_component__WEBPACK_IMPORTED_MODULE_60__["CouponComponent"] },
                        { path: 'settings/coupon/add', component: _admin_settings_coupon_addcoupon_addcoupon_component__WEBPACK_IMPORTED_MODULE_61__["AddCouponComponent"] },
                        { path: 'settings/coupon/edit/:id', component: _admin_settings_coupon_addcoupon_addcoupon_component__WEBPACK_IMPORTED_MODULE_61__["AddCouponComponent"] },
                        { path: 'pharmacy/medicine', component: _admin_pharmacy_medicine_medicine_component__WEBPACK_IMPORTED_MODULE_62__["MedicineComponent"] },
                        { path: 'pharmacy/medicine/addmedicines', component: _admin_pharmacy_medicine_addmedicines_addmedicine_component__WEBPACK_IMPORTED_MODULE_63__["AddmedicineComponent"] },
                        { path: 'pharmacy/medicine/edit/:id', component: _admin_pharmacy_medicine_addmedicines_addmedicine_component__WEBPACK_IMPORTED_MODULE_63__["AddmedicineComponent"] },
                        { path: 'pharmacy/orders', component: _admin_pharmacy_orders_orders_component__WEBPACK_IMPORTED_MODULE_64__["OrdersComponent"] },
                        { path: 'orders/view/:id', component: _admin_pharmacy_orderdetails_orderdetails_component__WEBPACK_IMPORTED_MODULE_65__["OrderdetailsComponent"] },
                        { path: 'settings/medicalservices', component: _admin_settings_medicalservices_service_component__WEBPACK_IMPORTED_MODULE_66__["ServiceComponent"] },
                        { path: 'settings/medicalservices/add', component: _admin_settings_medicalservices_add_addservice_component__WEBPACK_IMPORTED_MODULE_67__["AddServiceComponent"] },
                        { path: 'settings/medicalservices/edit/:id', component: _admin_settings_medicalservices_add_addservice_component__WEBPACK_IMPORTED_MODULE_67__["AddServiceComponent"] },
                        { path: 'settings/medicalservicetype', component: _admin_settings_medicalservicetype_medicalservicetype_component__WEBPACK_IMPORTED_MODULE_68__["MedicalServicetypeComponent"] },
                        { path: 'settings/medicalservicetype/add', component: _admin_settings_medicalservicetype_add_addmedicalservicetype_component__WEBPACK_IMPORTED_MODULE_69__["AddMedicalServicetypeComponent"] },
                        { path: 'settings/medicalservicetype/edit/:id', component: _admin_settings_medicalservicetype_add_addmedicalservicetype_component__WEBPACK_IMPORTED_MODULE_69__["AddMedicalServicetypeComponent"] },
                    ]
                }
            ]),
            _angular_service_worker__WEBPACK_IMPORTED_MODULE_13__["ServiceWorkerModule"].register('ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].production }),
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__["NgbModule"]
        ],
        providers: [],
        exports: [_datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_33__["NgbdDatepickerRangePopup"]],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _datepicker_range_datepicker_range_popup__WEBPACK_IMPORTED_MODULE_33__["NgbdDatepickerRangePopup"]]
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

module.exports = __webpack_require__(/*! D:\Project\Mamji\MamjiAdminGit\ClientApp\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map