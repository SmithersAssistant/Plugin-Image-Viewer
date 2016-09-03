'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = require('electron');

var _helpers = require('./helpers');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var IMAGE_COMPONENT = 'com.robinmalfait.image-viewer';

exports.default = function (robot) {
  var React = robot.dependencies.React;
  var Blank = robot.cards.Blank;
  var A = robot.UI.A;


  var Image = function Image(_ref) {
    var url = _ref.url;

    var other = _objectWithoutProperties(_ref, ['url']);

    return React.createElement(
      Blank,
      _extends({}, other, {
        title: React.createElement(
          A,
          { target: '_blank', href: url },
          url
        ),
        actions: (0, _actions2.default)(robot, url)
      }),
      React.createElement(
        'div',
        { style: { textAlign: 'center' } },
        React.createElement('img', { style: { maxWidth: '100%' }, src: url })
      )
    );
  };

  robot.registerComponent(Image, IMAGE_COMPONENT);

  robot.listen(/^img (.*)$/, {
    description: "View an image",
    usage: 'img <img>'
  }, function (res) {
    var url = res.matches[1];
    (0, _helpers.imageExists)(url, function (exists) {
      if (exists) {
        robot.addCard(IMAGE_COMPONENT, { url: url });
      } else {
        robot.notify("This does not look like a valid url...");
      }
    });
  });
};