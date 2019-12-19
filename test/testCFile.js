/*
 * testCFile.js - test the c file handler object.
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
    
    testCFileParseSimpleSingleQuotes: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);
        
        cf.parse("resBundle_getLocString(res_bundle, 'OK');");

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");

        test.done();
    },

    testCFileParseJSSimpleSingleQuotes: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);
        
        cf.parse("char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, 'This is a test');");

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("This is a test");
        test.ok(r);
        test.equal(r.getSource(), "This is a test");
        test.equal(r.getKey(), "This is a test");

        test.done();
    },

    testCFileParseMoreComplexSingleQuotes: function(test) {
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
    
    testCFileParseSimpleRightSize: function(test) {
        test.expect(4);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        var set = cf.getTranslationSet();
        test.equal(set.size(), 0);

        cf.parse("char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, 'This is a test');");

        test.ok(set);

        test.equal(set.size(), 1);

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

    testCFileParseWithKey: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('const char* pPicture = resBundle_getLocStringWithKey(resBundle,"PictureMode.Standard", "Standard");');
        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "unique_id"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Standard");
        test.equal(r[0].getKey(), "PictureMode.Standard");

        test.done();
    },

    testCFileParseWithKeyandComment: function(test) {
        test.expect(5);

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

    testCFileParseWithKeySingleQuotes: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse("const char* pPicture = resBundle_getLocStringWithKey(resBundle,'PictureMode.Standard', 'Standard');");

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "Standard"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Standard");
        test.equal(r[0].getKey(), "PictureMode.Standard");

        test.done();
    },

    testCFileParseJSWithKeySingleQuotes: function(test) {
        test.expect(5);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse("const char* pPicture = resBundle_getLocStringWithKey(resBundle,'PictureMode.Standard', 'Standard');");

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "Standard"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Standard");
        test.equal(r[0].getKey(), "PictureMode.Standard");

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

        cf.parse('RB.getString("This is a test");\n\ta.parse("This is another test.");\n\t\tRB.getString("This is also a test");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("This is a test");
        test.ok(r);
        test.equal(r.getSource(), "This is a test");
        test.equal(r.getKey(), "This is a test");

        r = set.getBySource("This is also a test");
        test.ok(r);
        test.equal(r.getSource(), "This is also a test");
        test.equal(r.getKey(), "This is also a test");

        test.done();
    },

    testCFileParseMultipleWithKey: function(test) {
        test.expect(10);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('RB.getString("This is a test", "x");\n\ta.parse("This is another test.");\n\t\tRB.getString("This is a test", "y");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "x"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "This is a test");
        test.ok(!r[0].getAutoKey());
        test.equal(r[0].getKey(), "x");

        r = set.getBy({
            reskey: "y"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "This is a test");
        test.ok(!r[0].getAutoKey());
        test.equal(r[0].getKey(), "y");

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

        cf.parse('RB.getString("This is a test"), RB.getString("This is a second test"), RB.getString("This is a third test")');

        var set = cf.getTranslationSet();
        test.ok(set);

        test.equal(set.size(), 3);

        var r = set.getBySource("This is a test");
        test.ok(r);
        test.equal(r.getSource(), "This is a test");
        test.equal(r.getKey(), "This is a test");

        r = set.getBySource("This is a second test");
        test.ok(r);
        test.equal(r.getSource(), "This is a second test");
        test.equal(r.getKey(), "This is a second test");

        r = set.getBySource("This is a third test");
        test.ok(r);
        test.equal(r.getSource(), "This is a third test");
        test.equal(r.getKey(), "This is a third test");

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

        cf.parse('RB.getString("This is a test");   // i18n: foo\n\ta.parse("This is another test.");\n\t\tRB.getString("This is also a test");\t// i18n: bar');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("This is a test");
        test.ok(r);
        test.equal(r.getSource(), "This is a test");
        test.equal(r.getKey(), "This is a test");
        test.equal(r.getComment(), "foo");

        r = set.getBySource("This is also a test");
        test.ok(r);
        test.equal(r.getSource(), "This is also a test");
        test.equal(r.getKey(), "This is also a test");
        test.equal(r.getComment(), "bar");

        test.done();
    },

    testCFileParseMultipleWithUniqueIdsAndComments: function(test) {
        test.expect(10);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('RB.getString("This is a test", "asdf");   // i18n: foo\n\ta.parse("This is another test.");\n\t\tRB.getString("This is also a test", "kdkdkd");\t// i18n: bar');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "asdf"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "This is a test");
        test.equal(r[0].getKey(), "asdf");
        test.equal(r[0].getComment(), "foo");

        r = set.getBy({
            reskey: "kdkdkd"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "This is also a test");
        test.equal(r[0].getKey(), "kdkdkd");
        test.equal(r[0].getComment(), "bar");

        test.done();
    },

    testCFileParseWithDups: function(test) {
        test.expect(6);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('RB.getString("This is a test");\n\ta.parse("This is another test.");\n\t\tRB.getString("This is a test");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("This is a test");
        test.ok(r);
        test.equal(r.getSource(), "This is a test");
        test.equal(r.getKey(), "This is a test");

        test.equal(set.size(), 1);

        test.done();
    },

    testCFileParseDupsDifferingByKeyOnly: function(test) {
        test.expect(8);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('RB.getString("This is a test");\n\ta.parse("This is another test.");\n\t\tRB.getString("This is a test", "unique_id");');

        var set = cf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("This is a test");
        test.ok(r);
        test.equal(r.getSource(), "This is a test");
        test.equal(r.getKey(), "This is a test");

        r = set.getBy({
            reskey: "unique_id"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "This is a test");
        test.equal(r[0].getKey(), "unique_id");

        test.done();
    },

    testCFileParseBogusConcatenation: function(test) {
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('RB.getString("This is a test" + " and this isnt");');

        var set = cf.getTranslationSet();

        test.equal(set.size(), 0);

        test.done();
    },

    testCFileParseBogusConcatenation2: function(test) {
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('RB.getString("This is a test" + foobar);');

        var set = cf.getTranslationSet();
        test.equal(set.size(), 0);

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

        cf.parse('RB.getString(foobar);');

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

        cf.parse('RB.getString();');

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

        cf.parse('EPIRB.getString("This is a test");');

        var set = cf.getTranslationSet();
        test.equal(set.size(), 0);

        test.done();
    },

    testCFileParseSubobject: function(test) {
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse('App.RB.getString("This is a test");');

        var set = cf.getTranslationSet();
        test.equal(set.size(), 1);

        test.done();
    },

    testCFileParsePunctuationBeforeRB: function(test) {
        test.expect(9);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse(
            "        <%\n" +
            "        var listsOver4 = false;\n" +
            "        var seemoreLen = 0;\n" +
            "        var subcats = [RB.getStringJS('Personal'), RB.getStringJS('Smart Watches')];\n" +
            "        _.each(subcats, function(subcat, j){\n" +
            "            var list = topic.attribute.kb_attribute_relationships[subcat] || [];\n" +
            "            if (list.length > 0) {\n" +
            "        %>\n");

        var set = cf.getTranslationSet();
        test.ok(set);

        test.equal(set.size(), 2);

        var r = set.getBySource("Personal");
        test.ok(r);
        test.equal(r.getSource(), "Personal");
        test.equal(r.getKey(), "Personal");

        r = set.getBySource("Smart Watches");
        test.ok(r);
        test.equal(r.getSource(), "Smart Watches");
        test.equal(r.getKey(), "Smart Watches");

        test.done();
    },

    testCFileParseEmptyString: function(test) {
        test.expect(3);

        var cf = new CFile({
            project: p,
            pathName: undefined,
            type: cft
        });
        test.ok(cf);

        cf.parse("var subcats = [RB.getStringJS(''), RB.getString(''), RB.getStringJS('', 'foo'), RB.getStringJS('foo', '')];\n");

        var set = cf.getTranslationSet();
        test.ok(set);

        test.equal(set.size(), 0);

        test.done();
    },

    testCFileExtractFile: function(test) {
        test.expect(8);

        var cf = new CFile({
            project: p,
            pathName: "./js/t1.js",
            type: cft
        });
        test.ok(cf);

        // should read the file
        cf.extract();
        var set = cf.getTranslationSet();
        test.equal(set.size(), 4);

        var r = set.getBySource("This is a test");
        test.ok(r);
        test.equal(r.getSource(), "This is a test");
        test.equal(r.getKey(), "This is a test");

        var r = set.getBy({
            reskey: "id1"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "This is a test with a unique id");
        test.equal(r[0].getKey(), "id1");

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
        test.expect(2);

        var cf = new CFile({
            project: p,
            pathName: "./js/t2.c",
            type: cft
        });
        test.ok(cf);

        // should attempt to read the file and not fail
        cf.extract();

        var set = cf.getTranslationSet();
        test.equal(set.size(), 10);
        test.done();
    }
};
