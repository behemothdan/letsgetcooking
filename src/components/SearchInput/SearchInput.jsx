import React, { Component } from 'react';
import Input from 'components/FormComponents/Input/Input';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { client } from 'client';
import { debounce } from 'lodash';
import './SearchInput.css';

export default class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    // This uses Apollo to create an entry in the link state which then can be referenced in other places.
    // Using the Apollo plugin for Chrome, you can see in the cache the existence of this entry (initialized as 'baked') along with the
    // inital loading of Difficulties, Mealtypes, and the prepopulated search results using 'baked'
    queryDatabase = debounce((text) => {
        client.writeQuery({
            query: gql`
                {
                    searchQuery {
                        query
                    }
                }
            `,
            data: {
                searchQuery: {
                    query: text,
                    __typename: 'searchQuery'
                }
            }
        });
    }, 500);

    handleChange = (text) => {
        this.setState({ [this.props.searchitem]: text });
        this.queryDatabase(text);
    };

    render() {
        return (
            <div className="searchInput">
                <form>
                    <Input
                        name={this.props.name}
                        labelValue={this.props.labelValue}
                        required={true}
                        value={this.state[this.props.searchitem]}
                        onChange={event => this.handleChange(event.target.value)}
                    />
                </form>
            </div>
        );
    }
}

SearchInput.propTypes = {
    name: PropTypes.string.isRequired,
    searchitem: PropTypes.string, // Say what item it's being used to search (ie recipes, ingredients, etc)
    labelValue: PropTypes.string,
    placeholder: PropTypes.string
}