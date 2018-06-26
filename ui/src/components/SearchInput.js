import React, {Component} from 'react';
import '../style/RecipeList.css';

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);        
    }

    handleChange(e){
        this.props.onSearchQueryChange(e.target.value);
    };    

    render() {
        const searchquery = this.props.searchquery;
        return (   
            <div>
                <form>
                    <input 
                        name="searchInput"
                        type="text"
                        placeholder="Let's get cooking..."
                        value={searchquery}
                        onChange={this.handleChange}
                    />    
                </form>
            </div>
        );
    } 
}

export default SearchInput