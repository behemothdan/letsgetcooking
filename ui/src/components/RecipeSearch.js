import React, {Component} from "react";
import { debounce } from 'lodash';
import SearchInput from "./SearchInput";
import RecipeGraphQuery from "./FetchRecipeQuery";
import '../style/RecipeList.css';


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
                <SearchInput  handleSearchQueryChange={this.handleChange} />
                <RecipeGraphQuery searchQuery={this.state.searchquery} />
            </div>
        )
    }
}

export default RecipeSearch;