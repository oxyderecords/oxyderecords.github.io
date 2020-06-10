// releaseFeed.js
// The react component which renders the feed of releases.
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

function TrackElement(props) {
    return React.createElement(
        "div",
        { className: "trackElement" },
        React.createElement(
            "h3",
            { className: "trackHeadline" },
            props.title,
            " - ",
            React.createElement(
                "a",
                { href: "/artists?id=" + props.artistId },
                props.artistName
            )
        ),
        React.createElement(
            "p",
            { className: "trackElementDesc" },
            props.desc
        ),
        React.createElement("iframe", { width: "100%", height: "100", scrolling: "no", frameBorder: "no", allow: "autoplay", src: props.ifsrc })
    );
}

var ReleaseFeed = function (_React$Component) {
    _inherits(ReleaseFeed, _React$Component);

    function ReleaseFeed(props) {
        _classCallCheck(this, ReleaseFeed);

        var _this = _possibleConstructorReturn(this, (ReleaseFeed.__proto__ || Object.getPrototypeOf(ReleaseFeed)).call(this, props));

        _this.state = { retreivedItems: false };
        return _this;
    }

    _createClass(ReleaseFeed, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch('/static/releases.json', { method: 'GET' }).then(function (res) {
                return res.json();
            }).then(function (resJson) {
                _this2.setState({ retreivedItems: true, releases: resJson });
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state.retreivedItems) {
                return React.createElement("div", { className: "loader" });
            } else {
                var tracks = this.state.releases.map(function (track) {
                    return React.createElement(TrackElement, {
                        title: track.title,
                        artistName: track.artistName,
                        artistId: track.artistId,
                        releaseDate: track.releaseDate,
                        desc: track.desc,
                        ifsrc: track.ifsrc
                    });
                });
                return React.createElement(
                    "div",
                    null,
                    tracks
                );
            }
        }
    }]);

    return ReleaseFeed;
}(React.Component);

var domContainer = document.querySelector('#releaseFeed');
ReactDOM.render(e(ReleaseFeed), domContainer);