import React from 'react';
import AddIngredient from '../components/AddIngredient/AddIngredient';
import AddRecipe from '../components/CreateRecipe/CreateRecipe';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';

const Home = () => {
    return (
        <div>
            <Header />
            <div className="container">
            <div className="content-area">
                <Search />
                <AddIngredient />
                <AddRecipe />
            </div>
            </div>
        </div>
    )
};

export default Home