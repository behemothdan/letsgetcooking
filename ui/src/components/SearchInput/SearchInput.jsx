import React, {Component} from "react";
import "./SearchInput.css";
import Input from "../FormComponents/Input/Input";
import PropTypes from "prop-types";
import { client }  from '../../client';
import gql from "graphql-tag";

export default class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({[this.props.searchitem]: event.target.value}, () => {
            // We check for this prop for now in case this component is still embedded in the HOC Search component.
            // I imagine it will be stand-alone completely very soon so the pieces can live different places and still work.
            if(this.props.handleSearchQueryChange) {
                 this.props.handleSearchQueryChange(this.state[this.props.searchitem]);
            }
        });
        client.writeQuery({ // This can probably be moved to it's own GraphQL file to keep things consistent.
            query: gql`
                {
                    searchQuery {
                        query
                    }
                }
            `,
            data: {
                searchQuery: {
                    query: event.target.value,
                    __typename: 'searchQuery'
                }
            }
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
    handleSearchQueryChange: PropTypes.func
}