// guestmixFeed.js
// The react component which renders the feed of guestmixes.
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

function TrackElement(props) {
    // Iterate over artists on track and add each one.
    var artists = [];
    for (var i = 0; i < props.artistUrls.length; i++) {
        if (i === props.artistUrls.length - 1) {
            artists.push(React.createElement(
                "a",
                { href: props.artistUrls[i], key: props.artistNames[i] },
                props.artistNames[i]
            ));
        } else {
            artists.push(React.createElement(
                "span",
                { key: props.artistNames[i] },
                React.createElement(
                    "a",
                    { href: props.artistUrls[i] },
                    props.artistNames[i]
                ),
                ", "
            ));
        }
    }
    return React.createElement(
        "div",
        { className: "trackElement" },
        React.createElement(
            "h3",
            { className: "trackHeadline" },
            props.title,
            " - ",
            artists
        ),
        React.createElement(
            "p",
            { className: "trackElementDesc" },
            props.desc
        ),
        React.createElement("iframe", { width: "100%", height: "100", scrolling: "no", frameBorder: "no", allow: "autoplay", src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + props.sctrackid + "&color=%23d0021b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" })
    );
}

var GuestmixFeed = function (_React$Component) {
    _inherits(GuestmixFeed, _React$Component);

    function GuestmixFeed(props) {
        _classCallCheck(this, GuestmixFeed);

        var _this = _possibleConstructorReturn(this, (GuestmixFeed.__proto__ || Object.getPrototypeOf(GuestmixFeed)).call(this, props));

        _this.state = { retreivedItems: false };
        return _this;
    }

    _createClass(GuestmixFeed, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch('/static/data/guest_mixes.json', { method: 'GET' }).then(function (res) {
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
                        artistNames: track.artistNames,
                        artistUrls: track.artistUrls,
                        releaseDate: track.releaseDate,
                        desc: track.desc,
                        sctrackid: track.sctrackid,
                        key: track.title
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

    return GuestmixFeed;
}(React.Component);

var domContainer = document.querySelector('#guestmixFeed');
ReactDOM.render(e(GuestmixFeed), domContainer);