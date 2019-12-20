/*
 * CFile.js - plugin to extract resources from a C source code file
 *
 * Copyright © 2019, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var fs = require("fs");
var path = require("path");
var log4js = require("log4js");

var logger = log4js.getLogger("loctool.plugin.CFile");

/**
 * Create a new java file with the given path name and within
 * the given project.
 *
 * @param {Project} project the project object
 * @param {String} pathName path to the file relative to the root
 * of the project file
 * @param {FileType} type the file type of this instance
 */
var CFile = function(props) {
    this.project = props.project;
    this.pathName = props.pathName;
    this.type = props.type;
    this.API = props.project.getAPI();

    this.set = this.API.newTranslationSet(this.project ? this.project.sourceLocale : "zxx-XX");
};

/**
 * Unescape the string to make the same string that would be
 * in memory in the target programming language.
 *
 * @static
 * @param {String} string the string to unescape
 * @returns {String} the unescaped string
 */
CFile.unescapeString = function(string) {
    var unescaped = string;

    unescaped = unescaped.
        replace(/\\\\n/g, "").                // line continuation
        replace(/\\\n/g, "").                // line continuation
        replace(/^\\\\/, "\\").             // unescape backslashes
        replace(/([^\\])\\\\/g, "$1\\").
        replace(/^\\'/, "'").               // unescape quotes
        replace(/([^\\])\\'/g, "$1'").
        replace(/^\\"/, '"').
        replace(/([^\\])\\"/g, '$1"');

    return unescaped;
};

/**
 * Clean the string to make a resource name string. This means
 * removing leading and trailing white space, compressing
 * whitespaces, and unescaping characters. This changes
 * the string from what it looks like in the source
 * code but increases matching.
 *
 * @static
 * @param {String} string the string to clean
 * @returns {String} the cleaned string
 */
CFile.cleanString = function(string) {
    var unescaped = CFile.unescapeString(string);

    unescaped = unescaped.
        replace(/\\[btnfr]/g, " ").
        replace(/[ \n\t\r\f]+/g, " ").
        trim();

    return unescaped;
};

/**
 * Make a new key for the given string. This must correspond
 * exactly with the code in htglob jar file so that the
 * resources match up. See the class IResourceBundle in
 * this project under the java directory for the corresponding
 * code.
 *
 * @private
 * @param {String} source the source string to make a resource
 * key for
 * @returns {String} a unique key for this string
 */
CFile.prototype.makeKey = function(source) {
    return CFile.unescapeString(source);
};

var reGetLocString = new RegExp(/\bresBundle_getLocString\((.*)\,\s*[\"|\'](.*)*[\"|\']\)\;/g);
var reGetLocStringWithKey = new RegExp(/\bresBundle_getLocStringWithKey\((.*)\,\s*[\"|\'](.*)[\"|\']\,\s*[\"|\'](.*)*[\"|\']\)/g);
var reI18nComment = new RegExp("//\\s*i18n\\s*\\s*(.*)$");

/**
 * Parse the data string looking for the localizable strings and add them to the
 * project's translation set.
 * @param {String} data the string to parse
 */
CFile.prototype.parse = function(data) {
    logger.debug("Extracting strings from " + this.pathName);
    this.resourceIndex = 0;

    var comment, match, key;

    // To extract resBundle_getLocString()
    reGetLocString.lastIndex = 0; // just to be safe
    var result = reGetLocString.exec(data);
    while (result && result.length > 1 && result[2]) {
        // different matches for single and double quotes
        match = result[2];

        if (match && match.length) {
            logger.trace("Found string key: " + this.makeKey(match) + ", string: '" + match + "'");

            var last = data.indexOf('\n', reGetLocString.lastIndex);
            last = (last === -1) ? data.length : last;
            var line = data.substring(reGetLocString.lastIndex, last);
            var commentResult = reI18nComment.exec(line);
            comment = (commentResult && commentResult.length > 1) ? commentResult[1] : undefined;

            var r = this.API.newResource({
                resType: "string",
                project: this.project.getProjectId(),
                key: CFile.unescapeString(match),
                sourceLocale: this.project.sourceLocale,
                source: CFile.cleanString(match),
                autoKey: true,
                pathName: this.pathName,
                state: "new",
                comment: comment,
                datatype: this.type.datatype,
                index: this.resourceIndex++
            });
            this.set.add(r);
        } else {
            logger.warn("Warning: Bogus empty string in get string call: ");
            logger.warn("... " + data.substring(result.index, reGetString.lastIndex) + " ...");
        }
        result = reGetLocString.exec(data);
    }

    // To extract resBundle_getLocStringWithKey()
    reGetLocStringWithKey.lastIndex = 0; // just to be safe
    var result = reGetLocStringWithKey.exec(data);
    while (result && result.length > 1 && result[2]) {
        // different matches for single and double quotes
        match = result[2];

        if (match && match.length) {
            logger.trace("Found string key: " + this.makeKey(match) + ", string: '" + match + "'");

            var last = data.indexOf('\n', reGetLocStringWithKey.lastIndex);
            last = (last === -1) ? data.length : last;
            var line = data.substring(reGetLocStringWithKey.lastIndex, last);
            var commentResult = reI18nComment.exec(line);
            comment = (commentResult && commentResult.length > 1) ? commentResult[1] : undefined;

            var r = this.API.newResource({
                resType: "string",
                project: this.project.getProjectId(),
                key: CFile.unescapeString(match),
                sourceLocale: this.project.sourceLocale,
                source: CFile.cleanString(match),
                autoKey: true,
                pathName: this.pathName,
                state: "new",
                comment: comment,
                datatype: this.type.datatype,
                index: this.resourceIndex++
            });
            this.set.add(r);
        } else {
            logger.warn("Warning: Bogus empty string in get string call: ");
            logger.warn("... " + data.substring(result.index, reGetString.lastIndex) + " ...");
        }
        result = reGetLocStringWithKey.exec(data);
    }
};

/**
 * Extract all the localizable strings from the java file and add them to the
 * project's translation set.
 */
CFile.prototype.extract = function() {
    logger.debug("Extracting strings from " + this.pathName);
    if (this.pathName) {
        var p = path.join(this.project.root, this.pathName);
        try {
            var data = fs.readFileSync(p, "utf8");
            if (data) {
                this.parse(data);
            }
        } catch (e) {
            logger.warn("Could not read file: " + p);
        }
    }
};

/**
 * Return the set of resources found in the current JavaScript file.
 *
 * @returns {TranslationSet} The set of resources found in the
 * current JavaScript file.
 */
CFile.prototype.getTranslationSet = function() {
    return this.set;
}

// we don't localize or write javascript source files
CFile.prototype.localize = function() {};
CFile.prototype.write = function() {};

module.exports = CFile;