import React, { Component,Fragment } from 'react';
import Header from 'components/Header/Header';
import RecipeSearchQuery from "components/RecipeSearchQuery/RecipeSearchQuery";
import UserMenu from 'components/UserMenu/UserMenu';
import PropTypes from "prop-types";

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Header userMenu={<UserMenu />} />
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