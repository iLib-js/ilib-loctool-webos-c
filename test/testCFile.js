/*
 * testCFile.js - test the c file handler object.
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

module.exports.cfile = {
    testCFileConstructor: function(test) {
        test.expect(1);

        var cf = new CFile({project: p});
        test.ok(cf);
        test.done();
    },
    testCFileConstructorParams: function(test) {
        test.expect(1);

        var cf = new CFile({
            project: p,
            pathName: "./testfiles/js/t1.c",
            type: cft
        });

        test.ok(cf);
        test.done();
    },
    testCFileConstructorNoFile: function(test) {
        test.expect(1);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);
        test.done();
    },
    testCFileMakeKey: function(test) {
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);
        test.equal(cf.makeKey("This is a test"), "This is a test");
        test.done();
    },
    testCFileMakeKey2: function(test) {
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);
        test.equal(cf.makeKey("This is a \"real\" test"), "This is a \"real\" test");
        test.done();
    },
    testCFileMakeKeyWithSpace: function(test) {
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);
        test.equal(cf.makeKey(" This is a test "), " This is a test ");
        test.done();
    },
    testCFileMakeKeyWithSpaces: function(test) {
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);
        test.equal(cf.makeKey("   This is a test   "), "   This is a test   ");
        test.done();
    },
    testCFileParseSimpleGetByKey: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, "OK");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "OK"
        });
        test.ok(r);

        test.equal(r[0].getSource(), "OK");
        test.equal(r[0].getKey(), "OK");

        test.done();
    },
    testCFileParseSimpleGetBySource: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('resBundle_getLocString(res_bundle, "OK");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");

        test.done();
    },
    testCFileParseSimpleGetBySourceWithSpace: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('resBundle_getLocString(res_bundle, " OK ");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource(" OK ");
        test.ok(r);
        test.equal(r.getSource(), " OK ");
        test.equal(r.getKey(), " OK ");

        test.done();
    },
    testCFileParseSimpleGetBySourceWithSpaces: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('resBundle_getLocString(res_bundle, "     OK   ");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("     OK   ");
        test.ok(r);
        test.equal(r.getSource(), "     OK   ");
        test.equal(r.getKey(), "     OK   ");

        test.done();
    },
    testCFileParseCSimple: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, "This is a test");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("This is a test");
        test.ok(r);
        test.equal(r.getSource(), "This is a test");
        test.equal(r.getKey(), "This is a test");

        test.done();
    },
    testCFileParseCSimple2: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, "This is a\n test");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("This is a\n test");
        test.ok(r);
        test.equal(r.getSource(), "This is a\n test");
        test.equal(r.getKey(), "This is a\n test");

        test.done();
    },
    testCFileParseCSimple3: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, "This is a   \t test");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("This is a   \t test");
        test.ok(r);
        test.equal(r.getSource(), "This is a   \t test");
        test.equal(r.getKey(), "This is a   \t test");

        test.done();
    },
    testCFileParseCSinglequotes: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, "Don\'t save");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Don't save");
        test.ok(r);
        test.equal(r.getSource(), "Don't save");
        test.equal(r.getKey(), "Don't save");

        test.done();
    },
    testCFileParseMoreComplex: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char* alert_msg=(char *)resBundle_getLocString(notification_getResBundle(),"[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
        test.ok(r);
        test.equal(r.getSource(), "[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
        test.equal(r.getKey(), "[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");

        test.done();
    },
    testCFileParseSimpleWithTranslatorComment: function(test) {
        test.expect(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n button');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");
        test.equal(r.getComment(), "button");

        test.done();
    },
    testCFileParseSimpleWithTranslatorComment2: function(test) {
        test.expect(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n OK button for Bluray player');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");
        test.equal(r.getComment(), "OK button for Bluray player");

        test.done();
    },
    testCFileParseSimpleWithTranslatorComment3: function(test) {
        test.expect(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); /* i18n button */');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");
        test.equal(r.getComment(), "button");

        test.done();
    },
    testCFileParseSimpleWithTranslatorComment4: function(test) {
        test.expect(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n : Power button');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");
        test.equal(r.getComment(), "Power button");

        test.done();
    },
    testCFileParseSimpleWithTranslatorComment5: function(test) {
        test.expect(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n  Connect WiSA Dongle');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");
        test.equal(r.getComment(), "Connect WiSA Dongle");

        test.done();
    },
    testCFileParseSimpleWithTranslatorComment6: function(test) {
        test.expect(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n : GUIDE button for Set-top box, used in screen remote');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");
        test.equal(r.getComment(), "GUIDE button for Set-top box, used in screen remote");

        test.done();
    },
    testCFileParseWithKey: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('const char* pPicture = resBundle_getLocStringWithKey(resBundle, "PictureMode.Standard", "Standard");');
        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "PictureMode.Standard"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Standard");
        test.equal(r[0].getKey(), "PictureMode.Standard");

        test.done();
    },
    testCFileParseWithKey2: function(test) {
        test.expect(8);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('const char* pPicture = resBundle_getLocStringWithKey(resBundle, "PictureMode.Standard", "Standard");const char* pPicture = resBundle_getLocStringWithKey(resBundle, "PictureMode.Block", "Block");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "PictureMode.Standard"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Standard");
        test.equal(r[0].getKey(), "PictureMode.Standard");

        var r = set.getBy({
            reskey: "PictureMode.Block"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Block");
        test.equal(r[0].getKey(), "PictureMode.Block");

        test.done();
    },
    testCFileParseWithKeyandComment: function(test) {
        test.expect(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('const char* pPicture = resBundle_getLocStringWithKey(resBundle,"PictureMode.Standard", "Standard"); // i18n button');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "PictureMode.Standard"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Standard");
        test.equal(r[0].getKey(), "PictureMode.Standard");
        test.equal(r[0].getComment(), "button");

        test.done();
    },
    testCFileParseMultiple: function(test) {
        test.expect(8);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char *screen_share_60 = (char *)resBundle_getLocString(res_bundle, "Block"); char *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Block");
        test.ok(r);
        test.equal(r.getSource(), "Block");
        test.equal(r.getKey(), "Block");

        r = set.getBySource("Cancel");
        test.ok(r);
        test.equal(r.getSource(), "Cancel");
        test.equal(r.getKey(), "Cancel");

        test.done();
    },
    testCFileParseMultiple2: function(test) {
        test.expect(9);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char *screen_share_60 = (char *)resBundle_getLocString(res_bundle, "Block"); char *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel"); // i18n Detail description');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Block");
        test.ok(r);
        test.equal(r.getSource(), "Block");
        test.equal(r.getKey(), "Block");

        r = set.getBySource("Cancel");
        test.ok(r);
        test.equal(r.getSource(), "Cancel");
        test.equal(r.getKey(), "Cancel");
        test.equal(r.getComment(), "Detail description");

        test.done();
    },
    testCFileParseMultipleWithKey: function(test) {
        test.expect(11);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char *screen_share_60 = (char *)resBundle_getLocStringWithKey(res_bundle, "Block.key", "Block"); a.parse("This is another test."); char *screen_share_67 = (char *)resBundle_getLocStringWithKey(res_bundle, "Cancel.key","Cancel"); // i18n messages');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "Block.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Block");
        test.ok(r[0].getAutoKey());
        test.equal(r[0].getKey(), "Block.key");

        r = set.getBy({
            reskey: "Cancel.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Cancel");
        test.ok(r[0].getAutoKey());
        test.equal(r[0].getKey(), "Cancel.key");
        test.equal(r[0].getComment(), "messages");

        test.done();
    },
    testCFileParseMultipleWithKey2: function(test) {
        test.expect(10);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char *screen_share_60 = (char *)resBundle_getLocStringWithKey(res_bundle, "Block.key", "Block");\ta.parse("This is another test.");\n\t\tchar *screen_share_67 = (char *)resBundle_getLocStringWithKey(res_bundle, "Cancel.key","Cancel");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "Block.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Block");
        test.ok(r[0].getAutoKey());
        test.equal(r[0].getKey(), "Block.key");

        r = set.getBy({
            reskey: "Cancel.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Cancel");
        test.ok(r[0].getAutoKey());
        test.equal(r[0].getKey(), "Cancel.key");

        test.done();
    },
    testCFileParseMultipleSameLine: function(test) {
        test.expect(12);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char *screen_share_60 = (char *)resBundle_getLocStringWithKey(res_bundle, "Block.key", "Block");\n\ta.parse("This is another test.");\n\t\tchar *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel"); \n\tchar *screen_share_70 = (char *)resBundle_getLocString(res_bundle, "Stop");');

        var set = cf.getTranslationSet();
        test.ok(set);

        test.equal(set.size(), 3);

        var r = set.getBySource("Block");
        test.ok(r);
        test.equal(r.getSource(), "Block");
        test.equal(r.getKey(), "Block.key");

        r = set.getBySource("Cancel");
        test.ok(r);
        test.equal(r.getSource(), "Cancel");
        test.equal(r.getKey(), "Cancel");

        r = set.getBySource("Stop");
        test.ok(r);
        test.equal(r.getSource(), "Stop");
        test.equal(r.getKey(), "Stop");

        test.done();
    },
    testCFileParseMultipleWithComments: function(test) {
        test.expect(10);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char *screen_share_60 = (char *)resBundle_getLocString(res_bundle, "Block");// i18n foo\n\ta.parse("This is another test.");\n\t\tchar *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel");  // i18n bar');
        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Block");
        test.ok(r);
        test.equal(r.getSource(), "Block");
        test.equal(r.getKey(), "Block");
        test.equal(r.getComment(), "foo");

        r = set.getBySource("Cancel");
        test.ok(r);
        test.equal(r.getSource(), "Cancel");
        test.equal(r.getKey(), "Cancel");
        test.equal(r.getComment(), "bar");

        test.done();
    },
    testCFileParseWithDups: function(test) {
        test.expect(9);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char* alert_btn_dup= (char *)resBundle_getLocString(notification_getResBundle(), "OK")char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "\tOK\n");\n\tchar* notifi_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK");');
        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");

        var r = set.getBySource("\tOK\n");
        test.ok(r);
        test.equal(r.getSource(), "\tOK\n");
        test.equal(r.getKey(), "\tOK\n");

        test.equal(set.size(), 2);

        test.done();
    },
    testCFileParseBogusNonStringParam: function(test) {
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), foobar);');

        var set = cf.getTranslationSet();
        test.equal(set.size(), 0);

        test.done();
    },
    testCFileParseEmptyParams: function(test) {
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char* alert_btn= (char *)resBundle_getLocString();');

        var set = cf.getTranslationSet();
        test.equal(set.size(), 0);

        test.done();
    },
    testCFileParseWholeWord: function(test) {
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('char* alert_btn= (char *)rresBundle_getLocString(notification_getResBundle(), "OK");');

        var set = cf.getTranslationSet();
        test.equal(set.size(), 0);

        test.done();
    },
    testCFileParsePunctuationBeforeRB: function(test) {
        test.expect(12);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);
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
        test.ok(set);

        test.equal(set.size(), 3);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");

        r = set.getBySource("The device cannot be connected to your TV.");
        test.ok(r);
        test.equal(r.getSource(), "The device cannot be connected to your TV.");
        test.equal(r.getKey(), "The device cannot be connected to your TV.");

        r = set.getBySource("Please try again. If the issue persists, please restart your TV or check your device.");
        test.ok(r);
        test.equal(r.getSource(), "Please try again. If the issue persists, please restart your TV or check your device.");
        test.equal(r.getKey(), "Please try again. If the issue persists, please restart your TV or check your device.");

        test.done();
    },
    testCFileExtractFile: function(test) {
        test.expect(14);

        var cf = new CFile({
            project: p,
            pathName: "./t1.c",
            type: cft
        });
        test.ok(cf);

        // should read the file
        cf.extract();
        var set = cf.getTranslationSet();
        test.equal(set.size(), 29);

        var r = set.getBySource("Decline");
        test.ok(r);
        test.equal(r.getSource(), "Decline");
        test.equal(r.getKey(), "Decline");

        var r = set.getBy({
            reskey: "Do you want to \naccept this request?"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Do you want to \naccept this request?");
        test.equal(r[0].getKey(), "Do you want to \naccept this request?");

        var r = set.getBy({
            reskey: "%s is blocked."
        });
        test.ok(r);
        test.equal(r[0].getSource(), "%s is blocked.");
        test.equal(r[0].getKey(), "%s is blocked.");

        var r = set.getBy({
            reskey: "\"Overlay Mode\" will be off now to start recording or Live Playback."
        });
        test.ok(r);
        test.equal(r[0].getSource(), "\"Overlay Mode\" will be off now to start recording or Live Playback.");
        test.equal(r[0].getKey(), "\"Overlay Mode\" will be off now to start recording or Live Playback.");

        test.done();
    },
    testCFileExtractUndefinedFile: function(test) {
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        // should attempt to read the file and not fail
        cf.extract();

        var set = cf.getTranslationSet();
        test.equal(set.size(), 0);
        test.done();
    },
    testCFileTest2: function(test) {
        test.expect(17);

        var cf = new CFile({
            project: p,
            pathName: "./t2.c",
            type: cft
        });
        test.ok(cf);

        cf.extract();
        var set = cf.getTranslationSet();
        test.equal(set.size(), 5);

        var r = set.getBySource("Please say \"Stop\" when you see the desired channel.");
        test.ok(r);
        test.equal(r.getSource(), "Please say \"Stop\" when you see the desired channel.");
        test.equal(r.getKey(), "Please say \"Stop\" when you see the desired channel.");

        var r = set.getBySource("You've declined the request from [{deviceName}].");
        test.ok(r);
        test.equal(r.getSource(), "You've declined the request from [{deviceName}].");
        test.equal(r.getKey(), "You've declined the request from [{deviceName}].");

        var r = set.getBySource("Hello\n\t there");
        test.ok(r);
        test.equal(r.getSource(), "Hello\n\t there");
        test.equal(r.getKey(), "Hello\n\t there");

        var r = set.getBySource("hi\n\t\t there \vwelcome");
        test.ok(r);
        test.equal(r.getSource(), "hi\n\t\t there \vwelcome");
        test.equal(r.getKey(), "hi\n\t\t there \vwelcome");

        var r = set.getBySource("Do you want to change the settings from \'Digital Sound Output\' to \'Pass Through\' to minimize audio delay while playing game?");
        test.ok(r);
        test.equal(r.getSource(), "Do you want to change the settings from 'Digital Sound Output' to 'Pass Through' to minimize audio delay while playing game?");
        test.equal(r.getKey(), "Do you want to change the settings from 'Digital Sound Output' to 'Pass Through' to minimize audio delay while playing game?");

        test.done();
    },
    testCFileTest3: function(test) {
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: "./t3.c",
            type: cft
        });
        test.ok(cf);
        // should attempt to read the file and not fail
        cf.extract();

        var set = cf.getTranslationSet();
        test.equal(set.size(), 4);

        test.done();
    },
    testCFileNotParseCommentLine: function(test) {
        test.expect(3);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('// char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n : Power button');

        var set = cf.getTranslationSet();
        test.ok(set);
        test.equal(set.size(), 0);

        test.done();
    },
    testCFileNotParseCommentLine2: function(test) {
        test.expect(3);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse(' char* btn= (char *)resBundle_getLocString(notification_getResBundle(), "CLICK"); /* char* btn2= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); */ ');

        var set = cf.getTranslationSet();
        test.ok(set);
        test.equal(set.size(), 1);

        test.done();
    },
};