import { parse } from '../diff-parser';

describe('DiffParser', () => {
  describe('generateDiffJson', () => {
    // eslint-disable-next-line jest/expect-expect
    it('should parse unix with \n diff', () => {
      const diff =
        'diff --git a/sample b/sample\n' +
        'index 0000001..0ddf2ba\n' +
        '--- a/sample\n' +
        '+++ b/sample\n' +
        '@@ -1 +1 @@\n' +
        '-test\n' +
        '+test1r\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 1,
            "blocks": Array [
              Object {
                "header": "@@ -1 +1 @@",
                "lines": Array [
                  Object {
                    "content": "-test",
                    "lineno": 5,
                    "newNumber": undefined,
                    "oldNumber": 1,
                    "type": "delete",
                  },
                  Object {
                    "content": "+test1r",
                    "lineno": 6,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "0ddf2ba",
            "checksumBefore": "0000001",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "language": undefined,
            "newName": "sample",
            "oldName": "sample",
          },
        ]
      `);
    });

    // eslint-disable-next-line jest/expect-expect
    it('should parse windows with \r\n diff', () => {
      const diff =
        'diff --git a/sample b/sample\r\n' +
        'index 0000001..0ddf2ba\r\n' +
        '--- a/sample\r\n' +
        '+++ b/sample\r\n' +
        '@@ -1 +1 @@\r\n' +
        '-test\r\n' +
        '+test1r\r\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 1,
            "blocks": Array [
              Object {
                "header": "@@ -1 +1 @@",
                "lines": Array [
                  Object {
                    "content": "-test",
                    "lineno": 5,
                    "newNumber": undefined,
                    "oldNumber": 1,
                    "type": "delete",
                  },
                  Object {
                    "content": "+test1r",
                    "lineno": 6,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "0ddf2ba",
            "checksumBefore": "0000001",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "language": undefined,
            "newName": "sample",
            "oldName": "sample",
          },
        ]
      `);
    });

    // eslint-disable-next-line jest/expect-expect
    it('should parse old os x with \r diff', () => {
      const diff =
        'diff --git a/sample b/sample\r' +
        'index 0000001..0ddf2ba\r' +
        '--- a/sample\r' +
        '+++ b/sample\r' +
        '@@ -1 +1 @@\r' +
        '-test\r' +
        '+test1r\r';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 1,
            "blocks": Array [
              Object {
                "header": "@@ -1 +1 @@",
                "lines": Array [
                  Object {
                    "content": "-test",
                    "lineno": 5,
                    "newNumber": undefined,
                    "oldNumber": 1,
                    "type": "delete",
                  },
                  Object {
                    "content": "+test1r",
                    "lineno": 6,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "0ddf2ba",
            "checksumBefore": "0000001",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "language": undefined,
            "newName": "sample",
            "oldName": "sample",
          },
        ]
      `);
    });

    // eslint-disable-next-line jest/expect-expect
    it('should parse mixed eols diff', () => {
      const diff =
        'diff --git a/sample b/sample\n' +
        'index 0000001..0ddf2ba\r\n' +
        '--- a/sample\r' +
        '+++ b/sample\r\n' +
        '@@ -1 +1 @@\n' +
        '-test\r' +
        '+test1r\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 1,
            "blocks": Array [
              Object {
                "header": "@@ -1 +1 @@",
                "lines": Array [
                  Object {
                    "content": "-test",
                    "lineno": 5,
                    "newNumber": undefined,
                    "oldNumber": 1,
                    "type": "delete",
                  },
                  Object {
                    "content": "+test1r",
                    "lineno": 6,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "0ddf2ba",
            "checksumBefore": "0000001",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "language": undefined,
            "newName": "sample",
            "oldName": "sample",
          },
        ]
      `);
    });

    it('should parse diff with special characters', () => {
      const diff =
        'diff --git "a/bla with \ttab.scala" "b/bla with \ttab.scala"\n' +
        'index 4c679d7..e9bd385 100644\n' +
        '--- "a/bla with \ttab.scala"\n' +
        '+++ "b/bla with \ttab.scala"\n' +
        '@@ -1 +1,2 @@\n' +
        '-cenas\n' +
        '+cenas com ananas\n' +
        '+bananas';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 2,
            "blocks": Array [
              Object {
                "header": "@@ -1 +1,2 @@",
                "lines": Array [
                  Object {
                    "content": "-cenas",
                    "lineno": 5,
                    "newNumber": undefined,
                    "oldNumber": 1,
                    "type": "delete",
                  },
                  Object {
                    "content": "+cenas com ananas",
                    "lineno": 6,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+bananas",
                    "lineno": 7,
                    "newNumber": 2,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "e9bd385",
            "checksumBefore": "4c679d7",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "language": "scala",
            "mode": "100644",
            "newName": "bla with 	tab.scala",
            "oldName": "bla with 	tab.scala",
          },
        ]
      `);
    });

    it('should parse diff with prefix', () => {
      const diff =
        'diff --git "\tbla with \ttab.scala" "\tbla with \ttab.scala"\n' +
        'index 4c679d7..e9bd385 100644\n' +
        '--- "\tbla with \ttab.scala"\n' +
        '+++ "\tbla with \ttab.scala"\n' +
        '@@ -1 +1,2 @@\n' +
        '-cenas\n' +
        '+cenas com ananas\n' +
        '+bananas';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 2,
            "blocks": Array [
              Object {
                "header": "@@ -1 +1,2 @@",
                "lines": Array [
                  Object {
                    "content": "-cenas",
                    "lineno": 5,
                    "newNumber": undefined,
                    "oldNumber": 1,
                    "type": "delete",
                  },
                  Object {
                    "content": "+cenas com ananas",
                    "lineno": 6,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+bananas",
                    "lineno": 7,
                    "newNumber": 2,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "e9bd385",
            "checksumBefore": "4c679d7",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "language": "scala",
            "mode": "100644",
            "newName": "	bla with 	tab.scala",
            "oldName": "	bla with 	tab.scala",
          },
        ]
      `);
    });

    it('should parse diff with deleted file', () => {
      const diff =
        'diff --git a/src/var/strundefined.js b/src/var/strundefined.js\n' +
        'deleted file mode 100644\n' +
        'index 04e16b0..0000000\n' +
        '--- a/src/var/strundefined.js\n' +
        '+++ /dev/null\n' +
        '@@ -1,3 +0,0 @@\n' +
        '-define(() => {\n' +
        '-  return typeof undefined;\n' +
        '-});\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 0,
            "blocks": Array [
              Object {
                "header": "@@ -1,3 +0,0 @@",
                "lines": Array [
                  Object {
                    "content": "-define(() => {",
                    "lineno": 6,
                    "newNumber": undefined,
                    "oldNumber": 1,
                    "type": "delete",
                  },
                  Object {
                    "content": "-  return typeof undefined;",
                    "lineno": 7,
                    "newNumber": undefined,
                    "oldNumber": 2,
                    "type": "delete",
                  },
                  Object {
                    "content": "-});",
                    "lineno": 8,
                    "newNumber": undefined,
                    "oldNumber": 3,
                    "type": "delete",
                  },
                ],
                "newStartLine": 0,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "0000000",
            "checksumBefore": "04e16b0",
            "deletedFileMode": "100644",
            "deletedLines": 3,
            "isCombined": false,
            "isDeleted": true,
            "isGitDiff": true,
            "language": "js",
            "newName": "/dev/null",
            "oldName": "src/var/strundefined.js",
          },
        ]
      `);
    });

    it('should parse diff with new file', () => {
      const diff =
        'diff --git a/test.js b/test.js\n' +
        'new file mode 100644\n' +
        'index 0000000..e1e22ec\n' +
        '--- /dev/null\n' +
        '+++ b/test.js\n' +
        '@@ -0,0 +1,5 @@\n' +
        "+var parser = require('./source/git-parser');\n" +
        '+\n' +
        '+var patchLineList = [ false, false, false, false ];\n' +
        '+\n' +
        '+console.log(parser.parsePatchDiffResult(text, patchLineList));\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 5,
            "blocks": Array [
              Object {
                "header": "@@ -0,0 +1,5 @@",
                "lines": Array [
                  Object {
                    "content": "+var parser = require('./source/git-parser');",
                    "lineno": 6,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+",
                    "lineno": 7,
                    "newNumber": 2,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+var patchLineList = [ false, false, false, false ];",
                    "lineno": 8,
                    "newNumber": 3,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+",
                    "lineno": 9,
                    "newNumber": 4,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+console.log(parser.parsePatchDiffResult(text, patchLineList));",
                    "lineno": 10,
                    "newNumber": 5,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 0,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "e1e22ec",
            "checksumBefore": "0000000",
            "deletedLines": 0,
            "isCombined": false,
            "isGitDiff": true,
            "isNew": true,
            "language": "js",
            "newFileMode": "100644",
            "newName": "test.js",
            "oldName": "/dev/null",
          },
        ]
      `);
    });

    it('should parse diff with nested diff', () => {
      const diff =
        'diff --git a/src/offset.js b/src/offset.js\n' +
        'index cc6ffb4..fa51f18 100644\n' +
        '--- a/src/offset.js\n' +
        '+++ b/src/offset.js\n' +
        '@@ -1,6 +1,5 @@\n' +
        "+var parser = require('./source/git-parser');\n" +
        '+\n' +
        "+var text = 'diff --git a/components/app/app.html b/components/app/app.html\\nindex ecb7a95..027bd9b 100644\\n--- a/components/app/app.html\\n+++ b/components/app/app.html\\n@@ -52,0 +53,3 @@\\n+\\n+\\n+\\n@@ -56,0 +60,3 @@\\n+\\n+\\n+\\n'\n" +
        '+var patchLineList = [ false, false, false, false ];\n' +
        '+\n' +
        '+console.log(parser.parsePatchDiffResult(text, patchLineList));\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 6,
            "blocks": Array [
              Object {
                "header": "@@ -1,6 +1,5 @@",
                "lines": Array [
                  Object {
                    "content": "+var parser = require('./source/git-parser');",
                    "lineno": 5,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+",
                    "lineno": 6,
                    "newNumber": 2,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+var text = 'diff --git a/components/app/app.html b/components/app/app.html\\\\nindex ecb7a95..027bd9b 100644\\\\n--- a/components/app/app.html\\\\n+++ b/components/app/app.html\\\\n@@ -52,0 +53,3 @@\\\\n+\\\\n+\\\\n+\\\\n@@ -56,0 +60,3 @@\\\\n+\\\\n+\\\\n+\\\\n'",
                    "lineno": 7,
                    "newNumber": 3,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+var patchLineList = [ false, false, false, false ];",
                    "lineno": 8,
                    "newNumber": 4,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+",
                    "lineno": 9,
                    "newNumber": 5,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+console.log(parser.parsePatchDiffResult(text, patchLineList));",
                    "lineno": 10,
                    "newNumber": 6,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "fa51f18",
            "checksumBefore": "cc6ffb4",
            "deletedLines": 0,
            "isCombined": false,
            "isGitDiff": true,
            "language": "js",
            "mode": "100644",
            "newName": "src/offset.js",
            "oldName": "src/offset.js",
          },
        ]
      `);
    });

    it('should parse diff with multiple blocks', () => {
      const diff =
        'diff --git a/src/attributes/classes.js b/src/attributes/classes.js\n' +
        'index c617824..c8d1393 100644\n' +
        '--- a/src/attributes/classes.js\n' +
        '+++ b/src/attributes/classes.js\n' +
        '@@ -1,10 +1,9 @@\n' +
        ' define([\n' +
        '   "../core",\n' +
        '   "../var/rnotwhite",\n' +
        '-  "../var/strundefined",\n' +
        '   "../data/var/dataPriv",\n' +
        '   "../core/init"\n' +
        '-], function( jQuery, rnotwhite, strundefined, dataPriv ) {\n' +
        '+], function( jQuery, rnotwhite, dataPriv ) {\n' +
        ' \n' +
        ' var rclass = /[\\t\\r\\n\\f]/g;\n' +
        ' \n' +
        '@@ -128,7 +127,7 @@ jQuery.fn.extend({\n' +
        '         }\n' +
        ' \n' +
        '       // Toggle whole class name\n' +
        '-      } else if ( type === strundefined || type === "boolean" ) {\n' +
        '+      } else if ( value === undefined || type === "boolean" ) {\n' +
        '         if ( this.className ) {\n' +
        '           // store className if set\n' +
        '           dataPriv.set( this, "__className__", this.className );\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 2,
            "blocks": Array [
              Object {
                "header": "@@ -1,10 +1,9 @@",
                "lines": Array [
                  Object {
                    "content": " define([",
                    "lineno": 5,
                    "newNumber": 1,
                    "oldNumber": 1,
                    "type": "context",
                  },
                  Object {
                    "content": "   \\"../core\\",",
                    "lineno": 6,
                    "newNumber": 2,
                    "oldNumber": 2,
                    "type": "context",
                  },
                  Object {
                    "content": "   \\"../var/rnotwhite\\",",
                    "lineno": 7,
                    "newNumber": 3,
                    "oldNumber": 3,
                    "type": "context",
                  },
                  Object {
                    "content": "-  \\"../var/strundefined\\",",
                    "lineno": 8,
                    "newNumber": undefined,
                    "oldNumber": 4,
                    "type": "delete",
                  },
                  Object {
                    "content": "   \\"../data/var/dataPriv\\",",
                    "lineno": 9,
                    "newNumber": 4,
                    "oldNumber": 5,
                    "type": "context",
                  },
                  Object {
                    "content": "   \\"../core/init\\"",
                    "lineno": 10,
                    "newNumber": 5,
                    "oldNumber": 6,
                    "type": "context",
                  },
                  Object {
                    "content": "-], function( jQuery, rnotwhite, strundefined, dataPriv ) {",
                    "lineno": 11,
                    "newNumber": undefined,
                    "oldNumber": 7,
                    "type": "delete",
                  },
                  Object {
                    "content": "+], function( jQuery, rnotwhite, dataPriv ) {",
                    "lineno": 12,
                    "newNumber": 6,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": " ",
                    "lineno": 13,
                    "newNumber": 7,
                    "oldNumber": 8,
                    "type": "context",
                  },
                  Object {
                    "content": " var rclass = /[\\\\t\\\\r\\\\n\\\\f]/g;",
                    "lineno": 14,
                    "newNumber": 8,
                    "oldNumber": 9,
                    "type": "context",
                  },
                  Object {
                    "content": " ",
                    "lineno": 15,
                    "newNumber": 9,
                    "oldNumber": 10,
                    "type": "context",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
              Object {
                "header": "@@ -128,7 +127,7 @@ jQuery.fn.extend({",
                "lines": Array [
                  Object {
                    "content": "         }",
                    "lineno": 17,
                    "newNumber": 127,
                    "oldNumber": 128,
                    "type": "context",
                  },
                  Object {
                    "content": " ",
                    "lineno": 18,
                    "newNumber": 128,
                    "oldNumber": 129,
                    "type": "context",
                  },
                  Object {
                    "content": "       // Toggle whole class name",
                    "lineno": 19,
                    "newNumber": 129,
                    "oldNumber": 130,
                    "type": "context",
                  },
                  Object {
                    "content": "-      } else if ( type === strundefined || type === \\"boolean\\" ) {",
                    "lineno": 20,
                    "newNumber": undefined,
                    "oldNumber": 131,
                    "type": "delete",
                  },
                  Object {
                    "content": "+      } else if ( value === undefined || type === \\"boolean\\" ) {",
                    "lineno": 21,
                    "newNumber": 130,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "         if ( this.className ) {",
                    "lineno": 22,
                    "newNumber": 131,
                    "oldNumber": 132,
                    "type": "context",
                  },
                  Object {
                    "content": "           // store className if set",
                    "lineno": 23,
                    "newNumber": 132,
                    "oldNumber": 133,
                    "type": "context",
                  },
                  Object {
                    "content": "           dataPriv.set( this, \\"__className__\\", this.className );",
                    "lineno": 24,
                    "newNumber": 133,
                    "oldNumber": 134,
                    "type": "context",
                  },
                ],
                "newStartLine": 127,
                "oldStartLine": 128,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "c8d1393",
            "checksumBefore": "c617824",
            "deletedLines": 3,
            "isCombined": false,
            "isGitDiff": true,
            "language": "js",
            "mode": "100644",
            "newName": "src/attributes/classes.js",
            "oldName": "src/attributes/classes.js",
          },
        ]
      `);
    });

    it('should parse diff with multiple files', () => {
      const diff =
        'diff --git a/src/core/init.js b/src/core/init.js\n' +
        'index e49196a..50f310c 100644\n' +
        '--- a/src/core/init.js\n' +
        '+++ b/src/core/init.js\n' +
        '@@ -101,7 +101,7 @@ var rootjQuery,\n' +
        '     // HANDLE: $(function)\n' +
        '     // Shortcut for document ready\n' +
        '     } else if ( jQuery.isFunction( selector ) ) {\n' +
        '-      return typeof rootjQuery.ready !== "undefined" ?\n' +
        '+      return rootjQuery.ready !== undefined ?\n' +
        '         rootjQuery.ready( selector ) :\n' +
        '         // Execute immediately if ready is not present\n' +
        '         selector( jQuery );\n' +
        'diff --git a/src/event.js b/src/event.js\n' +
        'index 7336f4d..6183f70 100644\n' +
        '--- a/src/event.js\n' +
        '+++ b/src/event.js\n' +
        '@@ -1,6 +1,5 @@\n' +
        ' define([\n' +
        '   "./core",\n' +
        '-  "./var/strundefined",\n' +
        '   "./var/rnotwhite",\n' +
        '   "./var/hasOwn",\n' +
        '   "./var/slice",\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 1,
            "blocks": Array [
              Object {
                "header": "@@ -101,7 +101,7 @@ var rootjQuery,",
                "lines": Array [
                  Object {
                    "content": "     // HANDLE: $(function)",
                    "lineno": 5,
                    "newNumber": 101,
                    "oldNumber": 101,
                    "type": "context",
                  },
                  Object {
                    "content": "     // Shortcut for document ready",
                    "lineno": 6,
                    "newNumber": 102,
                    "oldNumber": 102,
                    "type": "context",
                  },
                  Object {
                    "content": "     } else if ( jQuery.isFunction( selector ) ) {",
                    "lineno": 7,
                    "newNumber": 103,
                    "oldNumber": 103,
                    "type": "context",
                  },
                  Object {
                    "content": "-      return typeof rootjQuery.ready !== \\"undefined\\" ?",
                    "lineno": 8,
                    "newNumber": undefined,
                    "oldNumber": 104,
                    "type": "delete",
                  },
                  Object {
                    "content": "+      return rootjQuery.ready !== undefined ?",
                    "lineno": 9,
                    "newNumber": 104,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "         rootjQuery.ready( selector ) :",
                    "lineno": 10,
                    "newNumber": 105,
                    "oldNumber": 105,
                    "type": "context",
                  },
                  Object {
                    "content": "         // Execute immediately if ready is not present",
                    "lineno": 11,
                    "newNumber": 106,
                    "oldNumber": 106,
                    "type": "context",
                  },
                  Object {
                    "content": "         selector( jQuery );",
                    "lineno": 12,
                    "newNumber": 107,
                    "oldNumber": 107,
                    "type": "context",
                  },
                ],
                "newStartLine": 101,
                "oldStartLine": 101,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "50f310c",
            "checksumBefore": "e49196a",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "language": "js",
            "mode": "100644",
            "newName": "src/core/init.js",
            "oldName": "src/core/init.js",
          },
          Object {
            "addedLines": 0,
            "blocks": Array [
              Object {
                "header": "@@ -1,6 +1,5 @@",
                "lines": Array [
                  Object {
                    "content": " define([",
                    "lineno": 18,
                    "newNumber": 1,
                    "oldNumber": 1,
                    "type": "context",
                  },
                  Object {
                    "content": "   \\"./core\\",",
                    "lineno": 19,
                    "newNumber": 2,
                    "oldNumber": 2,
                    "type": "context",
                  },
                  Object {
                    "content": "-  \\"./var/strundefined\\",",
                    "lineno": 20,
                    "newNumber": undefined,
                    "oldNumber": 3,
                    "type": "delete",
                  },
                  Object {
                    "content": "   \\"./var/rnotwhite\\",",
                    "lineno": 21,
                    "newNumber": 3,
                    "oldNumber": 4,
                    "type": "context",
                  },
                  Object {
                    "content": "   \\"./var/hasOwn\\",",
                    "lineno": 22,
                    "newNumber": 4,
                    "oldNumber": 5,
                    "type": "context",
                  },
                  Object {
                    "content": "   \\"./var/slice\\",",
                    "lineno": 23,
                    "newNumber": 5,
                    "oldNumber": 6,
                    "type": "context",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "6183f70",
            "checksumBefore": "7336f4d",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "language": "js",
            "mode": "100644",
            "newName": "src/event.js",
            "oldName": "src/event.js",
          },
        ]
      `);
    });

    it('should parse combined diff', () => {
      const diff =
        'diff --combined describe.c\n' +
        'index fabadb8,cc95eb0..4866510\n' +
        '--- a/describe.c\n' +
        '+++ b/describe.c\n' +
        '@@@ -98,20 -98,12 +98,20 @@@\n' +
        '   return (a_date > b_date) ? -1 : (a_date == b_date) ? 0 : 1;\n' +
        '  }\n' +
        '  \n' +
        '- static void describe(char *arg)\n' +
        ' -static void describe(struct commit *cmit, int last_one)\n' +
        '++static void describe(char *arg, int last_one)\n' +
        '  {\n' +
        ' + unsigned char sha1[20];\n' +
        ' + struct commit *cmit;\n' +
        '   struct commit_list *list;\n' +
        '   static int initialized = 0;\n' +
        '   struct commit_name *n;\n' +
        '  \n' +
        ' + if (get_sha1(arg, sha1) < 0)\n' +
        ' +     usage(describe_usage);\n' +
        ' + cmit = lookup_commit_reference(sha1);\n' +
        ' + if (!cmit)\n' +
        ' +     usage(describe_usage);\n' +
        ' +\n' +
        '   if (!initialized) {\n' +
        '       initialized = 1;\n' +
        '       for_each_ref(get_name);\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 9,
            "blocks": Array [
              Object {
                "header": "@@@ -98,20 -98,12 +98,20 @@@",
                "lines": Array [
                  Object {
                    "content": "   return (a_date > b_date) ? -1 : (a_date == b_date) ? 0 : 1;",
                    "lineno": 5,
                    "newNumber": 98,
                    "oldNumber": 98,
                    "type": "context",
                  },
                  Object {
                    "content": "  }",
                    "lineno": 6,
                    "newNumber": 99,
                    "oldNumber": 99,
                    "type": "context",
                  },
                  Object {
                    "content": "  ",
                    "lineno": 7,
                    "newNumber": 100,
                    "oldNumber": 100,
                    "type": "context",
                  },
                  Object {
                    "content": "- static void describe(char *arg)",
                    "lineno": 8,
                    "newNumber": undefined,
                    "oldNumber": 101,
                    "type": "delete",
                  },
                  Object {
                    "content": " -static void describe(struct commit *cmit, int last_one)",
                    "lineno": 9,
                    "newNumber": undefined,
                    "oldNumber": 102,
                    "type": "delete",
                  },
                  Object {
                    "content": "++static void describe(char *arg, int last_one)",
                    "lineno": 10,
                    "newNumber": 101,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "  {",
                    "lineno": 11,
                    "newNumber": 102,
                    "oldNumber": 103,
                    "type": "context",
                  },
                  Object {
                    "content": " + unsigned char sha1[20];",
                    "lineno": 12,
                    "newNumber": 103,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": " + struct commit *cmit;",
                    "lineno": 13,
                    "newNumber": 104,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "   struct commit_list *list;",
                    "lineno": 14,
                    "newNumber": 105,
                    "oldNumber": 104,
                    "type": "context",
                  },
                  Object {
                    "content": "   static int initialized = 0;",
                    "lineno": 15,
                    "newNumber": 106,
                    "oldNumber": 105,
                    "type": "context",
                  },
                  Object {
                    "content": "   struct commit_name *n;",
                    "lineno": 16,
                    "newNumber": 107,
                    "oldNumber": 106,
                    "type": "context",
                  },
                  Object {
                    "content": "  ",
                    "lineno": 17,
                    "newNumber": 108,
                    "oldNumber": 107,
                    "type": "context",
                  },
                  Object {
                    "content": " + if (get_sha1(arg, sha1) < 0)",
                    "lineno": 18,
                    "newNumber": 109,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": " +     usage(describe_usage);",
                    "lineno": 19,
                    "newNumber": 110,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": " + cmit = lookup_commit_reference(sha1);",
                    "lineno": 20,
                    "newNumber": 111,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": " + if (!cmit)",
                    "lineno": 21,
                    "newNumber": 112,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": " +     usage(describe_usage);",
                    "lineno": 22,
                    "newNumber": 113,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": " +",
                    "lineno": 23,
                    "newNumber": 114,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "   if (!initialized) {",
                    "lineno": 24,
                    "newNumber": 115,
                    "oldNumber": 108,
                    "type": "context",
                  },
                  Object {
                    "content": "       initialized = 1;",
                    "lineno": 25,
                    "newNumber": 116,
                    "oldNumber": 109,
                    "type": "context",
                  },
                  Object {
                    "content": "       for_each_ref(get_name);",
                    "lineno": 26,
                    "newNumber": 117,
                    "oldNumber": 110,
                    "type": "context",
                  },
                ],
                "newStartLine": 98,
                "oldStartLine": 98,
                "oldStartLine2": 98,
              },
            ],
            "checksumAfter": "fabadb8",
            "checksumBefore": Array [
              "cc95eb0",
              "4866510",
            ],
            "deletedLines": 2,
            "isCombined": true,
            "isGitDiff": true,
            "language": "c",
            "newName": "describe.c",
            "oldName": "describe.c",
          },
        ]
      `);
    });

    it('should parse diffs with copied files', () => {
      const diff =
        'diff --git a/index.js b/more-index.js\n' +
        'dissimilarity index 5%\n' +
        'copy from index.js\n' +
        'copy to more-index.js\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 0,
            "blocks": Array [],
            "changedPercentage": 5,
            "deletedLines": 0,
            "isCopy": true,
            "isGitDiff": true,
            "newName": "more-index.js",
            "oldName": "index.js",
          },
        ]
      `);
    });

    it('should parse diffs with moved files', () => {
      const diff =
        'diff --git a/more-index.js b/other-index.js\n' +
        'similarity index 86%\n' +
        'rename from more-index.js\n' +
        'rename to other-index.js\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 0,
            "blocks": Array [],
            "deletedLines": 0,
            "isGitDiff": true,
            "isRename": true,
            "newName": "other-index.js",
            "oldName": "more-index.js",
            "unchangedPercentage": 86,
          },
        ]
      `);
    });

    it('should parse diffs correct line numbers', () => {
      const diff =
        'diff --git a/sample b/sample\n' +
        'index 0000001..0ddf2ba\n' +
        '--- a/sample\n' +
        '+++ b/sample\n' +
        '@@ -1 +1,2 @@\n' +
        '-test\n' +
        '+test1r\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 1,
            "blocks": Array [
              Object {
                "header": "@@ -1 +1,2 @@",
                "lines": Array [
                  Object {
                    "content": "-test",
                    "lineno": 5,
                    "newNumber": undefined,
                    "oldNumber": 1,
                    "type": "delete",
                  },
                  Object {
                    "content": "+test1r",
                    "lineno": 6,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "0ddf2ba",
            "checksumBefore": "0000001",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "language": undefined,
            "newName": "sample",
            "oldName": "sample",
          },
        ]
      `);
    });

    it('should parse unified non git diff and strip timestamps off the headers', () => {
      const diffs = [
        // 2 hours ahead of GMT
        '--- a/sample.js  2016-10-25 11:37:14.000000000 +0200\n' +
          '+++ b/sample.js  2016-10-25 11:37:14.000000000 +0200\n' +
          '@@ -1 +1,2 @@\n' +
          '-test\n' +
          '+test1r\n' +
          '+test2r',
        // 2 hours behind GMT
        '--- a/sample.js 2016-10-25 11:37:14.000000000 -0200\n' +
          '+++ b/sample.js  2016-10-25 11:37:14.000000000 -0200\n' +
          '@@ -1 +1,2 @@\n' +
          '-test\n' +
          '+test1r\n' +
          '+test2r',
      ].join('\n');
      const result = parse(diffs);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 2,
            "blocks": Array [
              Object {
                "header": "@@ -1 +1,2 @@",
                "lines": Array [
                  Object {
                    "content": "-test",
                    "lineno": 3,
                    "newNumber": undefined,
                    "oldNumber": 1,
                    "type": "delete",
                  },
                  Object {
                    "content": "+test1r",
                    "lineno": 4,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+test2r",
                    "lineno": 5,
                    "newNumber": 2,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "deletedLines": 1,
            "isCombined": false,
            "language": "js",
            "newName": "sample.js",
            "oldName": "sample.js",
          },
          Object {
            "addedLines": 2,
            "blocks": Array [
              Object {
                "header": "@@ -1 +1,2 @@",
                "lines": Array [
                  Object {
                    "content": "-test",
                    "lineno": 9,
                    "newNumber": undefined,
                    "oldNumber": 1,
                    "type": "delete",
                  },
                  Object {
                    "content": "+test1r",
                    "lineno": 10,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+test2r",
                    "lineno": 11,
                    "newNumber": 2,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "deletedLines": 1,
            "isCombined": false,
            "language": "js",
            "newName": "sample.js",
            "oldName": "sample.js",
          },
        ]
      `);
    });

    it('should parse unified non git diff', () => {
      const diff =
        '--- a/sample.js\n' + '+++ b/sample.js\n' + '@@ -1 +1,2 @@\n' + '-test\n' + '+test1r\n' + '+test2r\n';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 2,
            "blocks": Array [
              Object {
                "header": "@@ -1 +1,2 @@",
                "lines": Array [
                  Object {
                    "content": "-test",
                    "lineno": 3,
                    "newNumber": undefined,
                    "oldNumber": 1,
                    "type": "delete",
                  },
                  Object {
                    "content": "+test1r",
                    "lineno": 4,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+test2r",
                    "lineno": 5,
                    "newNumber": 2,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "deletedLines": 1,
            "isCombined": false,
            "language": "js",
            "newName": "sample.js",
            "oldName": "sample.js",
          },
        ]
      `);
    });

    it('should parse unified diff with multiple hunks and files', () => {
      const diff =
        '--- sample.js\n' +
        '+++ sample.js\n' +
        '@@ -1 +1,2 @@\n' +
        '-test\n' +
        '@@ -10 +20,2 @@\n' +
        '+test\n' +
        '--- sample1.js\n' +
        '+++ sample1.js\n' +
        '@@ -1 +1,2 @@\n' +
        '+test1';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 1,
            "blocks": Array [
              Object {
                "header": "@@ -1 +1,2 @@",
                "lines": Array [
                  Object {
                    "content": "-test",
                    "lineno": 3,
                    "newNumber": undefined,
                    "oldNumber": 1,
                    "type": "delete",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
              Object {
                "header": "@@ -10 +20,2 @@",
                "lines": Array [
                  Object {
                    "content": "+test",
                    "lineno": 5,
                    "newNumber": 20,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 20,
                "oldStartLine": 10,
                "oldStartLine2": null,
              },
            ],
            "deletedLines": 1,
            "isCombined": false,
            "language": "js",
            "newName": "sample.js",
            "oldName": "sample.js",
          },
          Object {
            "addedLines": 1,
            "blocks": Array [
              Object {
                "header": "@@ -1 +1,2 @@",
                "lines": Array [
                  Object {
                    "content": "+test1",
                    "lineno": 9,
                    "newNumber": 1,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "deletedLines": 0,
            "isCombined": false,
            "language": "js",
            "newName": "sample1.js",
            "oldName": "sample1.js",
          },
        ]
      `);
    });

    it('should parse diff with --- and +++ in the context lines', () => {
      const diff =
        '--- sample.js\n' +
        '+++ sample.js\n' +
        '@@ -1,8 +1,8 @@\n' +
        ' test\n' +
        ' \n' +
        '-- 1\n' +
        '--- 1\n' +
        '---- 1\n' +
        ' \n' +
        '++ 2\n' +
        '+++ 2\n' +
        '++++ 2';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 3,
            "blocks": Array [
              Object {
                "header": "@@ -1,8 +1,8 @@",
                "lines": Array [
                  Object {
                    "content": " test",
                    "lineno": 3,
                    "newNumber": 1,
                    "oldNumber": 1,
                    "type": "context",
                  },
                  Object {
                    "content": " ",
                    "lineno": 4,
                    "newNumber": 2,
                    "oldNumber": 2,
                    "type": "context",
                  },
                  Object {
                    "content": "-- 1",
                    "lineno": 5,
                    "newNumber": undefined,
                    "oldNumber": 3,
                    "type": "delete",
                  },
                  Object {
                    "content": "--- 1",
                    "lineno": 6,
                    "newNumber": undefined,
                    "oldNumber": 4,
                    "type": "delete",
                  },
                  Object {
                    "content": "---- 1",
                    "lineno": 7,
                    "newNumber": undefined,
                    "oldNumber": 5,
                    "type": "delete",
                  },
                  Object {
                    "content": " ",
                    "lineno": 8,
                    "newNumber": 3,
                    "oldNumber": 6,
                    "type": "context",
                  },
                  Object {
                    "content": "++ 2",
                    "lineno": 9,
                    "newNumber": 4,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+++ 2",
                    "lineno": 10,
                    "newNumber": 5,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "++++ 2",
                    "lineno": 11,
                    "newNumber": 6,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "deletedLines": 3,
            "isCombined": false,
            "language": "js",
            "newName": "sample.js",
            "oldName": "sample.js",
          },
        ]
      `);
    });

    it('should parse diff without proper hunk headers', () => {
      const diff = '--- sample.js\n' + '+++ sample.js\n' + '@@ @@\n' + ' test';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 0,
            "blocks": Array [
              Object {
                "header": "@@ @@",
                "lines": Array [
                  Object {
                    "content": " test",
                    "lineno": 3,
                    "newNumber": 0,
                    "oldNumber": 0,
                    "type": "context",
                  },
                ],
                "newStartLine": 0,
                "oldStartLine": 0,
                "oldStartLine2": null,
              },
            ],
            "deletedLines": 0,
            "isCombined": false,
            "language": "js",
            "newName": "sample.js",
            "oldName": "sample.js",
          },
        ]
      `);
    });

    it('should parse binary file diff', () => {
      const diff =
        'diff --git a/last-changes-config.png b/last-changes-config.png\n' +
        'index 322248b..56fc1f2 100644\n' +
        '--- a/last-changes-config.png\n' +
        '+++ b/last-changes-config.png\n' +
        'Binary files differ';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 0,
            "blocks": Array [
              Object {
                "header": "Binary files differ",
                "lines": Array [],
                "newStartLine": 0,
                "oldStartLine": 0,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "56fc1f2",
            "checksumBefore": "322248b",
            "deletedLines": 0,
            "isCombined": false,
            "isGitDiff": true,
            "language": "png",
            "mode": "100644",
            "newName": "last-changes-config.png",
            "oldName": "last-changes-config.png",
          },
        ]
      `);
    });

    it('should parse diff with --find-renames', () => {
      const diff =
        'diff --git a/src/test-bar.js b/src/test-baz.js\n' +
        'similarity index 98%\n' +
        'rename from src/test-bar.js\n' +
        'rename to src/test-baz.js\n' +
        'index e01513b..f14a870 100644\n' +
        '--- a/src/test-bar.js\n' +
        '+++ b/src/test-baz.js\n' +
        '@@ -1,4 +1,32 @@\n' +
        ' function foo() {\n' +
        '-var bar = "Whoops!";\n' +
        '+var baz = "Whoops!";\n' +
        ' }\n' +
        ' ';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 1,
            "blocks": Array [
              Object {
                "header": "@@ -1,4 +1,32 @@",
                "lines": Array [
                  Object {
                    "content": " function foo() {",
                    "lineno": 8,
                    "newNumber": 1,
                    "oldNumber": 1,
                    "type": "context",
                  },
                  Object {
                    "content": "-var bar = \\"Whoops!\\";",
                    "lineno": 9,
                    "newNumber": undefined,
                    "oldNumber": 2,
                    "type": "delete",
                  },
                  Object {
                    "content": "+var baz = \\"Whoops!\\";",
                    "lineno": 10,
                    "newNumber": 2,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": " }",
                    "lineno": 11,
                    "newNumber": 3,
                    "oldNumber": 3,
                    "type": "context",
                  },
                  Object {
                    "content": " ",
                    "lineno": 12,
                    "newNumber": 4,
                    "oldNumber": 4,
                    "type": "context",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "f14a870",
            "checksumBefore": "e01513b",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "isRename": true,
            "language": "js",
            "mode": "100644",
            "newName": "src/test-baz.js",
            "oldName": "src/test-bar.js",
            "unchangedPercentage": 98,
          },
        ]
      `);
    });

    it('should parse diff with prefix 2', () => {
      const diff =
        'diff --git "\tTest.scala" "\tScalaTest.scala"\n' +
        'similarity index 88%\n' +
        'rename from Test.scala\n' +
        'rename to ScalaTest.scala\n' +
        'index 7d1f9bf..8b13271 100644\n' +
        '--- "\tTest.scala"\n' +
        '+++ "\tScalaTest.scala"\n' +
        '@@ -1,6 +1,8 @@\n' +
        ' class Test {\n' +
        ' \n' +
        '   def method1 = ???\n' +
        '+\n' +
        '+  def method2 = ???\n' +
        ' \n' +
        '   def myMethod = ???\n' +
        ' \n' +
        '@@ -10,7 +12,6 @@ class Test {\n' +
        ' \n' +
        '   def + = ???\n' +
        ' \n' +
        '-  def |> = ???\n' +
        ' \n' +
        ' }\n' +
        ' \n' +
        'diff --git "\ttardis.png" "\ttardis.png"\n' +
        'new file mode 100644\n' +
        'index 0000000..d503a29\n' +
        'Binary files /dev/null and "\ttardis.png" differ\n' +
        'diff --git a/src/test-bar.js b/src/test-baz.js\n' +
        'similarity index 98%\n' +
        'rename from src/test-bar.js\n' +
        'rename to src/test-baz.js\n' +
        'index e01513b..f14a870 100644\n' +
        '--- a/src/test-bar.js\n' +
        '+++ b/src/test-baz.js\n' +
        '@@ -1,4 +1,32 @@\n' +
        ' function foo() {\n' +
        '-var bar = "Whoops!";\n' +
        '+var baz = "Whoops!";\n' +
        ' }\n' +
        ' ';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 2,
            "blocks": Array [
              Object {
                "header": "@@ -1,6 +1,8 @@",
                "lines": Array [
                  Object {
                    "content": " class Test {",
                    "lineno": 8,
                    "newNumber": 1,
                    "oldNumber": 1,
                    "type": "context",
                  },
                  Object {
                    "content": " ",
                    "lineno": 9,
                    "newNumber": 2,
                    "oldNumber": 2,
                    "type": "context",
                  },
                  Object {
                    "content": "   def method1 = ???",
                    "lineno": 10,
                    "newNumber": 3,
                    "oldNumber": 3,
                    "type": "context",
                  },
                  Object {
                    "content": "+",
                    "lineno": 11,
                    "newNumber": 4,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": "+  def method2 = ???",
                    "lineno": 12,
                    "newNumber": 5,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": " ",
                    "lineno": 13,
                    "newNumber": 6,
                    "oldNumber": 4,
                    "type": "context",
                  },
                  Object {
                    "content": "   def myMethod = ???",
                    "lineno": 14,
                    "newNumber": 7,
                    "oldNumber": 5,
                    "type": "context",
                  },
                  Object {
                    "content": " ",
                    "lineno": 15,
                    "newNumber": 8,
                    "oldNumber": 6,
                    "type": "context",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
              Object {
                "header": "@@ -10,7 +12,6 @@ class Test {",
                "lines": Array [
                  Object {
                    "content": " ",
                    "lineno": 17,
                    "newNumber": 12,
                    "oldNumber": 10,
                    "type": "context",
                  },
                  Object {
                    "content": "   def + = ???",
                    "lineno": 18,
                    "newNumber": 13,
                    "oldNumber": 11,
                    "type": "context",
                  },
                  Object {
                    "content": " ",
                    "lineno": 19,
                    "newNumber": 14,
                    "oldNumber": 12,
                    "type": "context",
                  },
                  Object {
                    "content": "-  def |> = ???",
                    "lineno": 20,
                    "newNumber": undefined,
                    "oldNumber": 13,
                    "type": "delete",
                  },
                  Object {
                    "content": " ",
                    "lineno": 21,
                    "newNumber": 15,
                    "oldNumber": 14,
                    "type": "context",
                  },
                  Object {
                    "content": " }",
                    "lineno": 22,
                    "newNumber": 16,
                    "oldNumber": 15,
                    "type": "context",
                  },
                  Object {
                    "content": " ",
                    "lineno": 23,
                    "newNumber": 17,
                    "oldNumber": 16,
                    "type": "context",
                  },
                ],
                "newStartLine": 12,
                "oldStartLine": 10,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "8b13271",
            "checksumBefore": "7d1f9bf",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "isRename": true,
            "language": "scala",
            "mode": "100644",
            "newName": "	ScalaTest.scala",
            "oldName": "	Test.scala",
            "unchangedPercentage": 88,
          },
          Object {
            "addedLines": 0,
            "blocks": Array [
              Object {
                "header": "Binary file",
                "lines": Array [],
                "newStartLine": 0,
                "oldStartLine": 0,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "d503a29",
            "checksumBefore": "0000000",
            "deletedLines": 0,
            "isBinary": true,
            "isCombined": false,
            "isGitDiff": true,
            "isNew": true,
            "newFileMode": "100644",
            "newName": "	tardis.png",
            "oldName": "/dev/null",
          },
          Object {
            "addedLines": 1,
            "blocks": Array [
              Object {
                "header": "@@ -1,4 +1,32 @@",
                "lines": Array [
                  Object {
                    "content": " function foo() {",
                    "lineno": 36,
                    "newNumber": 1,
                    "oldNumber": 1,
                    "type": "context",
                  },
                  Object {
                    "content": "-var bar = \\"Whoops!\\";",
                    "lineno": 37,
                    "newNumber": undefined,
                    "oldNumber": 2,
                    "type": "delete",
                  },
                  Object {
                    "content": "+var baz = \\"Whoops!\\";",
                    "lineno": 38,
                    "newNumber": 2,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": " }",
                    "lineno": 39,
                    "newNumber": 3,
                    "oldNumber": 3,
                    "type": "context",
                  },
                  Object {
                    "content": " ",
                    "lineno": 40,
                    "newNumber": 4,
                    "oldNumber": 4,
                    "type": "context",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "f14a870",
            "checksumBefore": "e01513b",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "isRename": true,
            "language": "js",
            "mode": "100644",
            "newName": "src/test-baz.js",
            "oldName": "src/test-bar.js",
            "unchangedPercentage": 98,
          },
        ]
      `);
    });

    it('should parse binary with content', () => {
      const diff =
        'diff --git a/favicon.png b/favicon.png\n' +
        'deleted file mode 100644\n' +
        'index 2a9d516a5647205d7be510dd0dff93a3663eff6f..0000000000000000000000000000000000000000\n' +
        'GIT binary patch\n' +
        'literal 0\n' +
        'HcmV?d00001\n' +
        '\n' +
        'literal 471\n' +
        'zcmeAS@N?(olHy`uVBq!ia0vp^0wB!61|;P_|4#%`EX7WqAsj$Z!;#Vf<Z~8yL>4nJ\n' +
        'za0`Jj<E6WGe}IBwC9V-A&PAz-C7Jno3L%-fsSJk3`UaNzMkcGzh!g=;$beJ?=ckpF\n' +
        'zCl;kLIHu$$r7E~(7NwTw7iAYKI0u`(*t4mJfq_xq)5S5wqIc=!hrWj$cv|<b{x!c(\n' +
        'z;3r#y;31Y&=1q>qPVOAS4ANVKzqmCp=Cty@U^(7zk!jHsvT~YI{F^=Ex6g|gox78w\n' +
        'z+Sn2Du3GS9U7qU`1*NYYlJi3u-!<?H-eky}wyIIL;8VU@wCDrb0``&v(jQ*DWSR4K\n' +
        'zPq(3;isEyho{emNa=%%!jDPE`l3u;5d=q=<+v8kO-=C`*G#t-*AiE-D>-_B#8k9H0\n' +
        'zGl{FnZs<2$wz5^=Q2h-1XI^s{LQL1#T4epqNPC%Orl(tD_@!*EY++~^Lt2<2&!&%=\n' +
        'z`m>(TYj6uS7jDdt=eH>iOyQg(QMR<-Fw8)Dk^ZG)XQTuzEgl{`GpS?Cfq9818R9~=\n' +
        'z{&h9@9n8F^?|qusoPy{k#%tVHzu7H$t26CR`BJZk*Ixf&u36WuS=?6m2^ho-p00i_\n' +
        'I>zopr0Nz-&lmGw#\n' +
        'diff --git a/src/test-bar.js b/src/test-baz.js\n' +
        'similarity index 98%\n' +
        'rename from src/test-bar.js\n' +
        'rename to src/test-baz.js\n' +
        'index e01513b..f14a870 100644\n' +
        '--- a/src/test-bar.js\n' +
        '+++ b/src/test-baz.js\n' +
        '@@ -1,4 +1,32 @@\n' +
        ' function foo() {\n' +
        '-var bar = "Whoops!";\n' +
        '+var baz = "Whoops!";\n' +
        ' }\n' +
        ' ';
      const result = parse(diff);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "addedLines": 0,
            "blocks": Array [
              Object {
                "header": "GIT binary patch",
                "lines": Array [],
                "newStartLine": 0,
                "oldStartLine": 0,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "0000000000000000000000000000000000000000",
            "checksumBefore": "2a9d516a5647205d7be510dd0dff93a3663eff6f",
            "deletedFileMode": "100644",
            "deletedLines": 0,
            "isBinary": true,
            "isCombined": false,
            "isDeleted": true,
            "isGitDiff": true,
            "newName": "favicon.png",
            "oldName": "favicon.png",
          },
          Object {
            "addedLines": 1,
            "blocks": Array [
              Object {
                "header": "@@ -1,4 +1,32 @@",
                "lines": Array [
                  Object {
                    "content": " function foo() {",
                    "lineno": 26,
                    "newNumber": 1,
                    "oldNumber": 1,
                    "type": "context",
                  },
                  Object {
                    "content": "-var bar = \\"Whoops!\\";",
                    "lineno": 27,
                    "newNumber": undefined,
                    "oldNumber": 2,
                    "type": "delete",
                  },
                  Object {
                    "content": "+var baz = \\"Whoops!\\";",
                    "lineno": 28,
                    "newNumber": 2,
                    "oldNumber": undefined,
                    "type": "insert",
                  },
                  Object {
                    "content": " }",
                    "lineno": 29,
                    "newNumber": 3,
                    "oldNumber": 3,
                    "type": "context",
                  },
                  Object {
                    "content": " ",
                    "lineno": 30,
                    "newNumber": 4,
                    "oldNumber": 4,
                    "type": "context",
                  },
                ],
                "newStartLine": 1,
                "oldStartLine": 1,
                "oldStartLine2": null,
              },
            ],
            "checksumAfter": "f14a870",
            "checksumBefore": "e01513b",
            "deletedLines": 1,
            "isCombined": false,
            "isGitDiff": true,
            "isRename": true,
            "language": "js",
            "mode": "100644",
            "newName": "src/test-baz.js",
            "oldName": "src/test-bar.js",
            "unchangedPercentage": 98,
          },
        ]
      `);
    });
  });
});
