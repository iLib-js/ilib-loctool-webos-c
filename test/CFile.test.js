/*
 * CFile.test.js - test the c file handler object.
 *
 * Copyright (c) 2019-2021,2023 JEDLSoft
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

if (!CFile) {
    var CFile = require("../CFile.js");
    var CFileType = require("../CFileType.js");
    var CustomProject =  require("loctool/lib/CustomProject.js");
}

var p = new CustomProject({
    id: "app",
    plugins: ["../."],
    sourceLocale: "en-US"
}, "./test/testfiles", {
    locales:["en-GB"]
});

var cft = new CFileType(p);

describe("cfile", function() {
    test("CFileConstructor", function() {
        expect.assertions(1);

        var cf = new CFile({project: p});
        expect(cf).toBeTruthy();
    });
    test("CFileConstructorParams", function() {
        expect.assertions(1);

        var cf = new CFile({
            project: p,
            pathName: "./testfiles/js/t1.c",
            type: cft
        });

        expect(cf).toBeTruthy();
    });
    test("CFileConstructorNoFile", function() {
        expect.assertions(1);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();
    });
    test("CFileMakeKey", function() {
        expect.assertions(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();
        expect(cf.makeKey("This is a test")).toBe("This is a test");
    });
    test("CFileMakeKey2", function() {
        expect.assertions(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();
        expect(cf.makeKey("This is a \"real\" test")).toBe("This is a \"real\" test");
    });
    test("CFileMakeKeyWithSpace", function() {
        expect.assertions(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();
        expect(cf.makeKey(" This is a test ")).toBe(" This is a test ");
    });
    test("CFileMakeKeyWithSpaces", function() {
        expect.assertions(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();
        expect(cf.makeKey("   This is a test   ")).toBe("   This is a test   ");
    });
    test("CFileParseSimpleGetByKey", function() {
        expect.assertions(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, "OK");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBy({
            reskey: "OK"
        });
        expect(r).toBeTruthy();

        expect(r[0].getSource()).toBe("OK");
        expect(r[0].getKey()).toBe("OK");
    });
    test("CFileParseSimpleGetBySource", function() {
        expect.assertions(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('resBundle_getLocString(res_bundle, "OK");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("OK");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("OK");
        expect(r.getKey()).toBe("OK");
    });
    test("CFileParseSimpleGetBySourceWithSpace", function() {
        expect.assertions(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('resBundle_getLocString(res_bundle, " OK ");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource(" OK ");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe(" OK ");
        expect(r.getKey()).toBe(" OK ");
    });
    test("CFileParseSimpleGetBySourceWithSpaces", function() {
        expect.assertions(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('resBundle_getLocString(res_bundle, "     OK   ");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("     OK   ");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("     OK   ");
        expect(r.getKey()).toBe("     OK   ");
    });
    test("CFileParseCSimple", function() {
        expect.assertions(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, "This is a test");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("This is a test");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("This is a test");
        expect(r.getKey()).toBe("This is a test");
    });
    test("CFileParseCSimple2", function() {
        expect.assertions(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, "This is a\n test");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("This is a\n test");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("This is a\n test");
        expect(r.getKey()).toBe("This is a\n test");
    });
    test("CFileParseCSimple3", function() {
        expect.assertions(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, "This is a   \t test");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("This is a   \t test");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("This is a   \t test");
        expect(r.getKey()).toBe("This is a   \t test");
    });
    test("CFileParseCSinglequotes", function() {
        expect.assertions(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, "Don\'t save");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Don't save");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Don't save");
        expect(r.getKey()).toBe("Don't save");
    });
    test("CFileParseMoreComplex", function() {
        expect.assertions(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char* alert_msg=(char *)resBundle_getLocString(notification_getResBundle(),"[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
        expect(r.getKey()).toBe("[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
    });
    test("CFileParseSimpleWithTranslatorComment", function() {
        expect.assertions(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n button');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("OK");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("OK");
        expect(r.getKey()).toBe("OK");
        expect(r.getComment()).toBe("button");
    });
    test("CFileParseSimpleWithTranslatorComment2", function() {
        expect.assertions(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n OK button for Bluray player');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("OK");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("OK");
        expect(r.getKey()).toBe("OK");
        expect(r.getComment()).toBe("OK button for Bluray player");
    });
    test("CFileParseSimpleWithTranslatorComment3", function() {
        expect.assertions(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); /* i18n button */');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("OK");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("OK");
        expect(r.getKey()).toBe("OK");
        expect(r.getComment()).toBe("button");
    });
    test("CFileParseSimpleWithTranslatorComment4", function() {
        expect.assertions(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n : Power button');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("OK");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("OK");
        expect(r.getKey()).toBe("OK");
        expect(r.getComment()).toBe("Power button");
    });
    test("CFileParseSimpleWithTranslatorComment5", function() {
        expect.assertions(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n  Connect WiSA Dongle');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("OK");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("OK");
        expect(r.getKey()).toBe("OK");
        expect(r.getComment()).toBe("Connect WiSA Dongle");
    });
    test("CFileParseSimpleWithTranslatorComment6", function() {
        expect.assertions(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n : GUIDE button for Set-top box, used in screen remote');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("OK");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("OK");
        expect(r.getKey()).toBe("OK");
        expect(r.getComment()).toBe("GUIDE button for Set-top box, used in screen remote");
    });
    test("CFileParseWithKey", function() {
        expect.assertions(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('const char* pPicture = resBundle_getLocStringWithKey(resBundle, "PictureMode.Standard", "Standard");');
        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBy({
            reskey: "PictureMode.Standard"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Standard");
        expect(r[0].getKey()).toBe("PictureMode.Standard");
    });
    test("CFileParseWithKey2", function() {
        expect.assertions(8);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('const char* pPicture = resBundle_getLocStringWithKey(resBundle, "PictureMode.Standard", "Standard");const char* pPicture = resBundle_getLocStringWithKey(resBundle, "PictureMode.Block", "Block");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBy({
            reskey: "PictureMode.Standard"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Standard");
        expect(r[0].getKey()).toBe("PictureMode.Standard");

        var r = set.getBy({
            reskey: "PictureMode.Block"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Block");
        expect(r[0].getKey()).toBe("PictureMode.Block");
    });
    test("CFileParseWithKeyandComment", function() {
        expect.assertions(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('const char* pPicture = resBundle_getLocStringWithKey(resBundle,"PictureMode.Standard", "Standard"); // i18n button');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBy({
            reskey: "PictureMode.Standard"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Standard");
        expect(r[0].getKey()).toBe("PictureMode.Standard");
        expect(r[0].getComment()).toBe("button");
    });
    test("CFileParseMultiple", function() {
        expect.assertions(8);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char *screen_share_60 = (char *)resBundle_getLocString(res_bundle, "Block"); char *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Block");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Block");
        expect(r.getKey()).toBe("Block");

        r = set.getBySource("Cancel");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Cancel");
        expect(r.getKey()).toBe("Cancel");
    });
    test("CFileParseMultiple2", function() {
        expect.assertions(9);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char *screen_share_60 = (char *)resBundle_getLocString(res_bundle, "Block"); char *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel"); // i18n Detail description');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Block");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Block");
        expect(r.getKey()).toBe("Block");

        r = set.getBySource("Cancel");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Cancel");
        expect(r.getKey()).toBe("Cancel");
        expect(r.getComment()).toBe("Detail description");
    });
    test("CFileParseMultipleWithKey", function() {
        expect.assertions(11);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char *screen_share_60 = (char *)resBundle_getLocStringWithKey(res_bundle, "Block.key", "Block"); a.parse("This is another test."); char *screen_share_67 = (char *)resBundle_getLocStringWithKey(res_bundle, "Cancel.key","Cancel"); // i18n messages');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBy({
            reskey: "Block.key"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Block");
        expect(r[0].getAutoKey()).toBeTruthy();
        expect(r[0].getKey()).toBe("Block.key");

        r = set.getBy({
            reskey: "Cancel.key"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Cancel");
        expect(r[0].getAutoKey()).toBeTruthy();
        expect(r[0].getKey()).toBe("Cancel.key");
        expect(r[0].getComment()).toBe("messages");
    });
    test("CFileParseMultipleWithKey2", function() {
        expect.assertions(10);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char *screen_share_60 = (char *)resBundle_getLocStringWithKey(res_bundle, "Block.key", "Block");\ta.parse("This is another test.");\n\t\tchar *screen_share_67 = (char *)resBundle_getLocStringWithKey(res_bundle, "Cancel.key","Cancel");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBy({
            reskey: "Block.key"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Block");
        expect(r[0].getAutoKey()).toBeTruthy();
        expect(r[0].getKey()).toBe("Block.key");

        r = set.getBy({
            reskey: "Cancel.key"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Cancel");
        expect(r[0].getAutoKey()).toBeTruthy();
        expect(r[0].getKey()).toBe("Cancel.key");
    });
    test("CFileParseMultipleSameLine", function() {
        expect.assertions(12);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char *screen_share_60 = (char *)resBundle_getLocStringWithKey(res_bundle, "Block.key", "Block");\n\ta.parse("This is another test.");\n\t\tchar *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel"); \n\tchar *screen_share_70 = (char *)resBundle_getLocString(res_bundle, "Stop");');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        expect(set.size()).toBe(3);

        var r = set.getBySource("Block");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Block");
        expect(r.getKey()).toBe("Block.key");

        r = set.getBySource("Cancel");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Cancel");
        expect(r.getKey()).toBe("Cancel");

        r = set.getBySource("Stop");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Stop");
        expect(r.getKey()).toBe("Stop");
    });
    test("CFileParseMultipleWithComments", function() {
        expect.assertions(10);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char *screen_share_60 = (char *)resBundle_getLocString(res_bundle, "Block");// i18n foo\n\ta.parse("This is another test.");\n\t\tchar *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel");  // i18n bar');
        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Block");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Block");
        expect(r.getKey()).toBe("Block");
        expect(r.getComment()).toBe("foo");

        r = set.getBySource("Cancel");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Cancel");
        expect(r.getKey()).toBe("Cancel");
        expect(r.getComment()).toBe("bar");
    });
    test("CFileParseWithDups", function() {
        expect.assertions(9);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char* alert_btn_dup= (char *)resBundle_getLocString(notification_getResBundle(), "OK")char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "\tOK\n");\n\tchar* notifi_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK");');
        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("OK");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("OK");
        expect(r.getKey()).toBe("OK");

        var r = set.getBySource("\tOK\n");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("\tOK\n");
        expect(r.getKey()).toBe("\tOK\n");

        expect(set.size()).toBe(2);
    });
    test("CFileParseBogusNonStringParam", function() {
        expect.assertions(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), foobar);');

        var set = cf.getTranslationSet();
        expect(set.size()).toBe(0);
    });
    test("CFileParseEmptyParams", function() {
        expect.assertions(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char* alert_btn= (char *)resBundle_getLocString();');

        var set = cf.getTranslationSet();
        expect(set.size()).toBe(0);
    });
    test("CFileParseWholeWord", function() {
        expect.assertions(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('char* alert_btn= (char *)rresBundle_getLocString(notification_getResBundle(), "OK");');

        var set = cf.getTranslationSet();
        expect(set.size()).toBe(0);
    });
    test("CFileParsePunctuationBeforeRB", function() {
        expect.assertions(12);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();
        cf.parse('        \n'+
            '    bool ret = FALSE;\n' +
            '    struct json_object *jobj=NULL, *subjobj=NULL, *btnjobj=NULL, *pramjobj=NULL, *aryjobj=NULL, *closejobj=NULL;\n' +
            '    char msg[1024]={0,};\n' +
            '\n' +
            '    char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK");\n' +
            '    char* alert_msg_line1= (char *)resBundle_getLocString(notification_getResBundle(), "The device cannot be connected to your TV.");\n' +
            '    char* alert_msg_line2= (char *)resBundle_getLocString(notification_getResBundle(), "Please try again. If the issue persists, please restart your TV or check your device.");\n' +
            '\n' +
            '    jobj = json_object_new_object();\n' +
            '    aryjobj=json_object_new_array();\n' +
            '\n');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();

        expect(set.size()).toBe(3);

        var r = set.getBySource("OK");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("OK");
        expect(r.getKey()).toBe("OK");

        r = set.getBySource("The device cannot be connected to your TV.");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("The device cannot be connected to your TV.");
        expect(r.getKey()).toBe("The device cannot be connected to your TV.");

        r = set.getBySource("Please try again. If the issue persists, please restart your TV or check your device.");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Please try again. If the issue persists, please restart your TV or check your device.");
        expect(r.getKey()).toBe("Please try again. If the issue persists, please restart your TV or check your device.");
    });
    test("CFileExtractFile", function() {
        expect.assertions(14);

        var cf = new CFile({
            project: p,
            pathName: "./t1.c",
            type: cft
        });
        expect(cf).toBeTruthy();

        // should read the file
        cf.extract();
        var set = cf.getTranslationSet();
        expect(set.size()).toBe(29);

        var r = set.getBySource("Decline");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Decline");
        expect(r.getKey()).toBe("Decline");

        var r = set.getBy({
            reskey: "Do you want to \naccept this request?"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Do you want to \naccept this request?");
        expect(r[0].getKey()).toBe("Do you want to \naccept this request?");

        var r = set.getBy({
            reskey: "%s is blocked."
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("%s is blocked.");
        expect(r[0].getKey()).toBe("%s is blocked.");

        var r = set.getBy({
            reskey: "\"Overlay Mode\" will be off now to start recording or Live Playback."
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("\"Overlay Mode\" will be off now to start recording or Live Playback.");
        expect(r[0].getKey()).toBe("\"Overlay Mode\" will be off now to start recording or Live Playback.");
    });
    test("CFileExtractUndefinedFile", function() {
        expect.assertions(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        // should attempt to read the file and not fail
        cf.extract();

        var set = cf.getTranslationSet();
        expect(set.size()).toBe(0);
    });
    test("CFileTest2", function() {
        expect.assertions(17);

        var cf = new CFile({
            project: p,
            pathName: "./t2.c",
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.extract();
        var set = cf.getTranslationSet();
        expect(set.size()).toBe(5);

        var r = set.getBySource("Please say \"Stop\" when you see the desired channel.");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Please say \"Stop\" when you see the desired channel.");
        expect(r.getKey()).toBe("Please say \"Stop\" when you see the desired channel.");

        var r = set.getBySource("You've declined the request from [{deviceName}].");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("You've declined the request from [{deviceName}].");
        expect(r.getKey()).toBe("You've declined the request from [{deviceName}].");

        var r = set.getBySource("Hello\n\t there");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Hello\n\t there");
        expect(r.getKey()).toBe("Hello\n\t there");

        var r = set.getBySource("hi\n\t\t there \vwelcome");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("hi\n\t\t there \vwelcome");
        expect(r.getKey()).toBe("hi\n\t\t there \vwelcome");

        var r = set.getBySource("Do you want to change the settings from \'Digital Sound Output\' to \'Pass Through\' to minimize audio delay while playing game?");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Do you want to change the settings from 'Digital Sound Output' to 'Pass Through' to minimize audio delay while playing game?");
        expect(r.getKey()).toBe("Do you want to change the settings from 'Digital Sound Output' to 'Pass Through' to minimize audio delay while playing game?");
    });
    test("CFileTest3", function() {
        expect.assertions(2);

        var cf = new CFile({
            project: p,
            pathName: "./t3.c",
            type: cft
        });
        expect(cf).toBeTruthy();
        // should attempt to read the file and not fail
        cf.extract();

        var set = cf.getTranslationSet();
        expect(set.size()).toBe(4);
    });
    test("CFileNotParseCommentLine", function() {
        expect.assertions(3);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse('// char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n : Power button');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();
        expect(set.size()).toBe(0);
    });
    test("CFileNotParseCommentLine2", function() {
        expect.assertions(3);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        expect(cf).toBeTruthy();

        cf.parse(' char* btn= (char *)resBundle_getLocString(notification_getResBundle(), "CLICK"); /* char* btn2= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); */ ');

        var set = cf.getTranslationSet();
        expect(set).toBeTruthy();
        expect(set.size()).toBe(1);
    });
});