import React, {Component} from "react";
import '../style/RecipeList.css';
import SearchInput from "./SearchInput";
import RecipeGraphQuery from "./RecipeGraphQuery";


class RecipeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {searchquery: ''};
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(searchQueryValue) {        
        this.setState({searchquery: searchQueryValue});
    }

    render() {       
        return (
            <div>
                <SearchInput handleSearchQueryChange={this.handleChange} />
                <RecipeGraphQuery searchQuery={this.state.searchquery} />
            </div>
        )
    }
}

export default RecipeSearch;