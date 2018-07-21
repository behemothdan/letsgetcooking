import React, {Component} from "react";
import "./SearchInput.css";
import Input from "../FormComponents/Input/Input";
import PropTypes from "prop-types";

export default class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({[this.props.searchitem]: event.target.value}, () => {
            this.props.handleSearchQueryChange(this.state[this.props.searchitem]);
        });
    }

    render() {
        return (
            <div>
                <form>
                    <Input
                        name={this.props.name}
                        labelValue={this.props.labelValue}
                        required="true"
                        placeholder={this.props.placeholder}
                        value={this.state[this.props.searchitem]}
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

SearchInput.propTypes = {
    name: PropTypes.string.isRequired,
    searchitem: PropTypes.string, // Used to say what item it's being used to search (ie recipes, ingredients, etc)
    labelValue: PropTypes.string,
    placeholder:PropTypes.string,
    handleSearchQueryChange: PropTypes.func.isRequired
}