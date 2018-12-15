import React, { Component } from 'react'
import Dragon from './Dragon'
import { Search } from "semantic-ui-react";
import _ from "lodash";

class Home extends Component{

    handleSearchChange = (searchValue) => {
        this.props.nameSearch(searchValue)
    }

    render(){
        // Note how style attributes are now passed as object instead of a string!!!
        return (
            <div style={{float:'left', width:'40%', padding:'5%', backgroundColor:'#00ffd8'}}>
                <h1>Home</h1>
                <div>
                    <h3>Search Dragons by Name:</h3>
                    <Search onSearchChange={_.debounce((e, input) => this.handleSearchChange(input.value), 500)} showNoResults={false} />
                </div>
                <br /><br />
                <div>
                    {this.props.dragons.map((dragon, index) => <Dragon {...dragon} toggleAtWar={this.props.toggleAtWar} key={index} />)}
                </div>
            </div>
        )
    }

}

export default Home