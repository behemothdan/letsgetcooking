import React, { Component } from 'react';
import Header from 'components/Header/Header';
import UserMenu from 'components/UserMenu/UserMenu';
import RecipeSingle from 'components/RecipeSingle/RecipeSingle';
import PropTypes from "prop-types";

class Recipe extends Component {
    render() {
        return (
            <div>
                <Header userMenu={<UserMenu />} />
                <main className="container">
                    <div className="content-area">
                        <RecipeSingle recipe={this.props.match.params.recipe} />
                    </div>
                </main>
            </div>
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