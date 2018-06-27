import React, {Component} from 'react';
import '../style/RecipeList.css';

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {searchquery: ''};
        this.handleChange = this.handleChange.bind(this);   
    }

    handleChange(event){        
        this.setState({searchquery: event.target.value}, () => {
            this.props.handleSearchQueryChange(this.state.searchquery);            
        });                        
    };    

    render() {        
        return (   
            <div>
                <form>
                    <input 
                        name="searchInput"
                        type="text"
                        placeholder="Let's get cooking..."
                        value={this.state.searchquery}
                        onChange={this.handleChange}
                    />    
                </form>
            </div>
        );
    } 
}

export default SearchInput