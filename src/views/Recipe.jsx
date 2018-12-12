import React, { Component, Fragment } from 'react';
import RecipeSingle from 'components/RecipeSingle/RecipeSingle';
import PropTypes from "prop-types";

class Recipe extends Component {
    render() {
        return (
            <Fragment>
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