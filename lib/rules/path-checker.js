"use strict";

const path = require('path');


module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "feature sliced relative path checker",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
    ], // Add a schema if the rule has options
  },

  create(context) {
    const alias = context.options[0]?.alias ?? '';

    return {
      ImportDeclaration(node) {
        // example: app/entities/Article
        const value = node.source.value;
        const importTo = alias ? value.replace(`${alias}/`, '') : value;
        
        // example: C:\users\...\Desktop\javascript\...\index.tsx
        const fromFilename = context.getFilename();
        
        if (shouldBeRelative(fromFilename, importTo)) {
          context.report(node, 'В рамках одного слайса все пути должны быть относительными');
        }
      }
    };
  },
};

function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../')
}

const layers = {
  'entities': 'entities',
  'features': 'features',
  'shared': 'shared',
  'pages': 'pages',
  'widgets': 'widgets',
}

function shouldBeRelative(from, to) {
  if (isPathRelative(to)) {
    return false;
  }
  const toArray = to.split('/');
  const toLayer = toArray[0]; // entities
  const toSlice = toArray[1]; // Article
  
  if (!toLayer || !toSlice || !layers[toLayer]) {
    return false;
  }
  
  const fromNormalizedPath = path.toNamespacedPath(from);
  const isWindowsOS = fromNormalizedPath.includes('\\');
  const fromPath = fromNormalizedPath.split('src')[1];
  const fromArray = fromPath.split(isWindowsOS ? '\\' : '/'); // [ '', 'entities', 'Article' ]
  const fromLayer = fromArray[1]; // entities
  const fromSlice = fromArray[2]; // Article
  
  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }
  
  return fromSlice === toSlice && toLayer === fromLayer;
}
//
// console.log(shouldBeRelative('C:/Users/oleg/src/entities/Article', 'entities/Article/fasfasf'));
// console.log(shouldBeRelative('C:\\Users\\oleg\\src\\entities\\Article', 'entities/Articasdle/fasfasf'));
// console.log(shouldBeRelative('C:\\Users\\oleg\\src\\entities\\Article', 'entities/Article/fasfasf'));
// console.log(shouldBeRelative('C:/Users/oleg/src/entities/Article', 'entities/Articfdle/fasfasf'));
