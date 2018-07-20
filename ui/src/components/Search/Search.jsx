import React, {Component} from "react";
import { debounce } from "lodash";
import SearchInput from "../SearchInput/SearchInput";
import RecipeSearchQuery from "../RecipeSearchQuery/RecipeSearchQuery";
import "./Search.css";
import Autosuggest from "react-autosuggest";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {searchingFor: 'baked'};
        this.handleChange = debounce(this.handleChange.bind(this), 500);
    }

    handleChange(searchQueryValue) {
        this.setState({searchingFor: searchQueryValue});
    }

    render() {
        return (
            <div>
                <SearchInput searchitem={this.state.searchingFor} name="searchInput" labelValue="What are we searching for?" placeholder="Let's get cooking!" handleSearchQueryChange={this.handleChange} />
                <RecipeSearchQuery searchQuery={this.state.searchingFor} />
            </div>
        )
    }
}

export default Search;