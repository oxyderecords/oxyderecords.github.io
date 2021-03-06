// releaseFeed.js
// The react component which renders the feed of releases.
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

function TrackElement(props) {
    // Iterate over artists on track and add each one.
    var artists = [];
    for (var i = 0; i < props.artistIds.length; i++) {
        if (i === props.artistIds.length - 1) {
            artists.push(React.createElement(
                "a",
                { key: props.artistIds, href: "/artists/?id=" + props.artistIds[i] },
                props.artistNames[i]
            ));
        } else {
            artists.push(React.createElement(
                "span",
                { key: props.artistIds[i] },
                React.createElement(
                    "a",
                    { href: "/artists/?id=" + props.artistIds[i] },
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

            fetch('/static/data/releases.json', { method: 'GET' }).then(function (res) {
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
                var tracks = [];
                this.state.releases.forEach(function (release, i) {
                    if (release.isOxydeReleased) {
                        tracks.push(React.createElement(TrackElement, {
                            title: release.title,
                            artistNames: release.artistNames,
                            artistIds: release.artistIds,
                            releaseDate: release.releaseDate,
                            desc: release.desc,
                            sctrackid: release.sctrackid,
                            key: release.title
                        }));
                    }
                });
                return React.createElement(
                    "div",
                    null,
                    tracks.length > 0 ? tracks : React.createElement(
                        "h2",
                        { className: "feedEmptyMessage" },
                        "Nothing to see here, yet! Check out what's ",
                        React.createElement(
                            "a",
                            { href: "/forthcoming" },
                            "coming soon"
                        ),
                        ", or listen to some of our ",
                        React.createElement(
                            "a",
                            { href: "/guestmixes" },
                            "guest mixes"
                        ),
                        "!"
                    )
                );
            }
        }
    }]);

    return ReleaseFeed;
}(React.Component);

var domContainer = document.querySelector('#releaseFeed');
ReactDOM.render(e(ReleaseFeed), domContainer);