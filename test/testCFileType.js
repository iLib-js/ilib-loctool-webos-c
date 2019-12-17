/*
 * testCFileType.js - test the c file type handler object.
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

if (!CFileType) {
    var CFileType = require("../CFileType.js");
    var CustomProject =  require("loctool/lib/CustomProject.js");
}

var p = new CustomProject({
    id: "app",
    plugins: ["../."],
    sourceLocale: "en-US"
}, "./testfiles", {
    locales:["en-GB"]
});

module.exports.cfiletype = {
    testCFileTypeConstructor: function(test) {
        test.expect(1);

        var cft = new CFileType(p);
        test.ok(cft);
        test.done();
    },

    testCFileTypeHandlesJSTrue: function(test) {
        test.expect(2);

        var cft = new CFileType(p);
        test.ok(cft);
        test.ok(htf.handles("foo.c"));
        test.done();
    },

    testCFileTypeHandlesJSXTrue: function(test) {
        test.expect(2);

        var cft = new CFileType(p);
        test.ok(cft);
        test.ok(htf.handles("foo.jsx"));
        test.done();
    },

    testCFileTypeHandlesJSFalseClose: function(test) {
        test.expect(2);

        var cft = new CFileType(p);
        test.ok(cft);
        test.ok(!htf.handles("foojs"));
        test.done();
    }
};
