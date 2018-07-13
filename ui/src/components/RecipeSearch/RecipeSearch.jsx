import React, {Component} from "react";
import { debounce } from "lodash";
import RecipeSearchInput from "../RecipeSearchInput/RecipeSearchInput";
import RecipeSearchQuery from "../RecipeSearchQuery/RecipeSearchQuery";
import "./RecipeSearch.css";

class RecipeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {searchquery: 'baked'};
        this.handleChange = debounce(this.handleChange.bind(this), 500);
    }

    handleChange(searchQueryValue) {
        this.setState({searchquery: searchQueryValue});
    }

    render() {
        return (
            <div>
                <RecipeSearchInput handleSearchQueryChange={this.handleChange} />
                <RecipeSearchQuery searchQuery={this.state.searchquery} />
            </div>
        )
    }
}

export default RecipeSearch;