import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

class NotFound extends Component {
    render() {
        return (
            <Fragment>
                <main className="container">
                    <div className="content-area">
                        <div>Whoa, how did you get here? Nothing to see here. Move along.</div>
                    </div>
                </main>
            </Fragment>
        );
    }
}

NotFound.propTypes = {
    auth: PropTypes.object
}

export default NotFound