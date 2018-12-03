import React, { Component, Fragment } from 'react';
import Header from 'components/Header/Header';
import UserMenu from 'components/UserMenu/UserMenu';
import RecipeSingle from 'components/RecipeSingle/RecipeSingle';
import PropTypes from "prop-types";

class Recipe extends Component {
    render() {
        return (
            <Fragment>
                <Header userMenu={<UserMenu />} />
                <main className="container">
                    <div className="content-area">
                        <RecipeSingle recipe={this.props.match.params.recipe} />
                    </div>
                </main>
            </Fragment>
        );
    }
}

Recipe.propTypes = {
    auth: PropTypes.object,
    recipe: PropTypes.string,
    match: PropTypes.object,
    params: PropTypes.object,
}

export default Recipe