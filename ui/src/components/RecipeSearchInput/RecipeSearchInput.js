import React, {Component} from "react";
import "./RecipeSearchInput.css";

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
                    {/* I can probably get this to use the FormComponents/Input if I work on passing the state or using Redux */}
                    <input
                        name="searchInput"
                        type="text"
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