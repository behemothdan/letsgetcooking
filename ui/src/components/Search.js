import React from 'react';
import '../style/RecipeList.css';
import RecipeList2 from './RecipeList2';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchquery: null};

        this.handleChange = (event) => {
            this.setState({ searchquery: event.target.searchquery })
        };
    }

    render() {
        return (   
            <div>
                <form>
                    <input 
                        type="text"
                        placeholder="Let's get cooking..."
                        value={this.state.searchquery}
                        onChange={this.handleChange}
                    />                
                </form>
            </div>
        )
    } 
}

export default Search