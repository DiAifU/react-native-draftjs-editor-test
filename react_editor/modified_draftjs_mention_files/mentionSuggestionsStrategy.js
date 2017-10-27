'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findWithRegex = require('find-with-regex');

var _findWithRegex2 = _interopRequireDefault(_findWithRegex);

var _lodash = require('lodash.escaperegexp');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (trigger, regExp) {
  return function (contentBlock, callback) {
    var reg = new RegExp(String.raw({
      raw: '(\\s|^)' + (0, _lodash2.default)(trigger) + regExp // eslint-disable-line no-useless-escape
    }), 'g');
    (0, _findWithRegex2.default)(reg, contentBlock, callback);
  };
};