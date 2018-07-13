import React, {Component} from "react";
import "./RecipeSearchInput.css";
import Input from "../FormComponents/Input/Input";

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {searchquery: ''};
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event){
        this.setState({searchquery: event.target.value}, () => {
            this.props.handleSearchQueryChange(this.state.searchquery);
        });
    };

    render() {
        return (
            <div>
                <form>
                    <Input
                        name="searchInput"
                        labelValue="What are we searching for?"
                        required="true"
                        placeholder="Let's get cooking!"
                        value={this.state.searchquery}
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

export default SearchInput