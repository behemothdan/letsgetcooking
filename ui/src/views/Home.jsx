import React, { Component,Fragment } from 'react';
import RecipeSearchQuery from "components/RecipeSearchQuery/RecipeSearchQuery";
import PropTypes from "prop-types";

class Home extends Component {
    render() {
        return (
            <Fragment>
                <main className="container">
                    <div className="content-area">
                        <RecipeSearchQuery />
                    </div>
                </main>
            </Fragment>
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object
}

export default Home