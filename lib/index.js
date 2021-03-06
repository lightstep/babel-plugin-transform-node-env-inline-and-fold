/*istanbul ignore next*/"use strict";

exports.__esModule = true;

exports.default = function ( /*istanbul ignore next*/_ref) {
  /*istanbul ignore next*/var t = _ref.types;

  return {
    visitor: { /*istanbul ignore next*/
      MemberExpression: function MemberExpression(path) {
        if (path.matchesPattern("process.env.NODE_ENV")) {
          path.replaceWith(t.valueToNode(process.env.NODE_ENV));

          if (path.parentPath.isBinaryExpression()) {
            var evaluated = path.parentPath.evaluate();
            if (evaluated.confident) {
              var value = evaluated.value;
              if (value === false && path.parentPath.parentPath.isIfStatement()) {
                // Drop the node if the value
                path.parentPath.parentPath.remove();
              } else {
                path.parentPath.replaceWith(t.valueToNode(value));
              }
            }
          }
        }
      }
    }
  };
};

/*istanbul ignore next*/module.exports = exports["default"];
