import React, {Component} from "react";
import '../style/RecipeList.css';
import SearchInput from "./SearchInput";
import RecipeGraphQuery from "./RecipeGraphQuery";


class RecipeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {searchquery: ''};       
    }

    render() {
        const searchquery = this.state.searchquery;

        return (
            <div>
                <SearchInput onSearchQueryChange={this.searchquery} />
                <RecipeGraphQuery searchquery={searchquery} />
            </div>
        )
    }
}

export default RecipeSearch;