// releaseFeed.js
// The react component which renders the feed of releases.
'use strict';

const e = React.createElement;

function TrackElement (props) {
    // Iterate over artists on track and add each one.
    var artists = []
    for (var i = 0; i < props.artistIds.length; i++) {
        if (i === (props.artistIds.length - 1)) {
            artists.push(<a key={props.artistIds} href={"/artists/?id=" + props.artistIds[i]}>{props.artistNames[i]}</a>)
        } else {
            artists.push(<span key={props.artistIds[i]}><a href={"/artists/?id=" + props.artistIds[i]}>{props.artistNames[i]}</a>, </span>)
        }
    }
    return(
        <div className="trackElement">
            <h3 className="trackHeadline">{props.title} - {artists}</h3>
            <p className="trackElementDesc">{props.desc}</p>
            <iframe width="100%" height="100" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${props.sctrackid}&color=%23d0021b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}></iframe>
        </div>
    )
}

class ReleaseFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { retreivedItems: false };
    }

    componentDidMount() {
        fetch('/static/data/releases.json', {method: 'GET'}).then(res => {
            return res.json();
        }).then(resJson => {
            this.setState({retreivedItems: true, releases: resJson});
        }).catch(error => {
            console.error(error);
        })
    }

    render() {
        if (!this.state.retreivedItems) {
            return (
                <div className="loader"></div>
            );
        } else {
            var tracks = [];
            this.state.releases.forEach((release, i) => {
                if (release.isOxydeReleased) {
                    tracks.push(
                        <TrackElement
                            title={release.title}
                            artistNames={release.artistNames}
                            artistIds={release.artistIds}
                            releaseDate={release.releaseDate}
                            desc={release.desc}
                            sctrackid={release.sctrackid}
                            key={release.title}
                        />
                    )
                }
            });
            return (
                <div>
                    {tracks.length > 0
                        ?
                        tracks
                        :
                        <h2 className="feedEmptyMessage">
                            Nothing to see here, yet! Check out what's <a href="/forthcoming">coming soon</a>, or listen to some of our <a href="/guestmixes">guest mixes</a>!
                        </h2>
                    }
                </div>
            )
        }
    }
}

const domContainer = document.querySelector('#releaseFeed');
ReactDOM.render(e(ReleaseFeed), domContainer);
