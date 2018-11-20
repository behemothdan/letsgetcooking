import React, { Component } from 'react';
import Header from 'components/Header/Header';
import UserMenu from 'components/UserMenu/UserMenu';
import PropTypes from "prop-types";

class NotFound extends Component {
    render() {
        return (
            <div>
                <Header userMenu={<UserMenu />} />
                <main className="container">
                    <div className="content-area">
                        <div>Whoa, how did you get here? Nothing to see here. Move along.</div>
                    </div>
                </main>
            </div>
        );
    }
}

NotFound.propTypes = {
    auth: PropTypes.object
}

export default NotFound