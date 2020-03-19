/**
 * @fileoverview Suggest replace _.map to native Array.map
 * @author Ilya Chudin
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Suggest replace _.map to native Array.map",
      category: "lodash",
      recommended: false
    },
    fixable: "code",
    schema: [],
    messages: {
      useNativeMap: "Use native Array.map instead of _.map"
    }
  },

  create: context => {
    const sourceCode = context.getSourceCode();

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function isArrayIsArrayExpression(node, identifier) {
      return (
        node &&
        node.type === "CallExpression" &&
        node.callee.object.name === "Array" &&
        node.callee.property.name === "isArray" &&
        node.arguments[0].name === identifier
      );
    }

    function findIfStatement(node) {
      let n = node;
      while (n && n.type !== "FunctionDeclaration") {
        if (n.type === "IfStatement") {
          return n;
        }
        n = n.parent;
      }
      return undefined;
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      "CallExpression[callee.object.name=_][callee.property.name=map][arguments.length=2]": node => {
        const [arg1, arg2] = node.arguments;
        if (arg1.type === "Identifier") {
          const ifStatement = findIfStatement(node.parent);
          const alreadyChecked =
            (ifStatement && isArrayIsArrayExpression(ifStatement.test, arg1.name)) ||
            (node.parent.type === "ConditionalExpression" && isArrayIsArrayExpression(node.parent.test, arg1.name));
          if (!alreadyChecked) {
            const needParentheses = node.parent.type === "MemberExpression" || node.parent.type === "LogicalExpression";
            context.report({
              node,
              messageId: "useNativeMap",
              fix(fixer) {
                const arg1Text = sourceCode.getText(arg1);
                const arg2Text = sourceCode.getText(arg2);
                const nodeText = sourceCode.getText(node);
                const text = `Array.isArray(${arg1Text}) ? ${arg1Text}.map(${arg2Text}) : ${nodeText}`;
                return fixer.replaceText(node, needParentheses ? `(${text})` : text);
              }
            });
          }
        }
      }
    };
  }
};