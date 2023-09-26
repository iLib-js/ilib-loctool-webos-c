/*
 * CFileType.test.js - test the c file type handler object.
 *
 * Copyright (c) 2019-2021, 2023 JEDLSoft
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

describe("cfiletype", function() {
    test("CFileTypeConstructor", function() {
        expect.assertions(1);

        var cft = new CFileType(p);
        expect(cft).toBeTruthy();
    });
    test("CFileTypeHandlesCFileTrue", function() {
        expect.assertions(2);

        var cft = new CFileType(p);
        expect(cft).toBeTruthy();
        expect(cft.handles("foo.c")).toBeTruthy();
    });
    test("CFileTypeHandlesCFileTrue2", function() {
        expect.assertions(2);

        var cft = new CFileType(p);
        expect(cft).toBeTruthy();
        expect(cft.handles("foo/bar/test.c")).toBeTruthy();
    });
    test("CFileTypeHandlesJSXFalse", function() {
        expect.assertions(2);

        var cft = new CFileType(p);
        expect(cft).toBeTruthy();
        expect(!cft.handles("foo.jsx")).toBeTruthy();
    });
    test("CFileTypeHandlesCppFalse", function() {
        expect.assertions(2);

        var cft = new CFileType(p);
        expect(cft).toBeTruthy();
        expect(!cft.handles("foo.cpp")).toBeTruthy();
    });
    test("CFileTypeHandlesFalseClose", function() {
        expect.assertions(2);

        var cft = new CFileType(p);
        expect(cft).toBeTruthy();
        expect(!cft.handles("fooc")).toBeTruthy();
    });
});
