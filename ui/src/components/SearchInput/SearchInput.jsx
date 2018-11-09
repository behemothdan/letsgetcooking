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
            <div>
                <form>
                    <Input
                        name={this.props.name}
                        labelValue={this.props.labelValue}
                        required="true"
                        placeholder={this.props.placeholder}
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
    searchitem: PropTypes.string, // Used to say what item it's being used to search (ie recipes, ingredients, etc)
    labelValue: PropTypes.string,
    placeholder: PropTypes.string
}