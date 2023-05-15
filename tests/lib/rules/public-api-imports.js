"use strict";

const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});

ruleTester.run("public-api-imports", rule, {
  valid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: []
    },
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\file.test.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [],
      options: [
        {
          alias: '@'
        }
      ]
    }
  ],

  invalid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/file.ts'",
      errors: [{ message: "Абсолютный импорт разрешен только из Public API (index.ts)" }],
      options: [
        {
          alias: '@'
        }
      ]
    },
  ],
});
