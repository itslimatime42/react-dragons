import React, { Component } from 'react';
import War from './War'
import Home from './Home'
const dragonsUrl = "http://localhost:3001/dragons";

class App extends Component {

  constructor () {
    super()
    this.state = {
      dragons: [],
      search: ''
    }
  }

  homeDragons = () => {
    return this.state.dragons.filter(dragon => {
      return dragon.atWar === false
    })
  }

  warDragons = () => {
    return this.state.dragons.filter(dragon => {
      return dragon.atWar === true
    })
  }

  toggleAtWar = (dragonId) => {
    let dragonToToggle = this.state.dragons.find(dragon => {
      return dragon.id === parseInt(dragonId)
    })
    dragonToToggle.atWar = !dragonToToggle.atWar
    this.patchDragon(dragonToToggle)
  }

  getDragons = () => {
    fetch(dragonsUrl)
      .then(resp => resp.json())
      .then(dragons => {
        this.setState({
          dragons: dragons
        })
      })
  }

  patchDragon = (dragon) => {
    const patchUrl = dragonsUrl + '/' + dragon.id.toString()
    fetch(patchUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dragon)
    })
    .then(this.getDragons)
  }

  filterDragons = (dragons) => {
    return dragons.filter(dragon => {
      return dragon.name.toLowerCase().startsWith(this.state.search);
    })
  }

  handleSearchChange = (searchValue) => {
    console.log(searchValue)
    this.setState({
      search: searchValue
    })
  }

  componentDidMount = () => {
    this.getDragons()
  }

  render() {
    return (
      <div>
        <Home dragons={this.filterDragons(this.homeDragons())} toggleAtWar={this.toggleAtWar} nameSearch={this.handleSearchChange} />
        <War dragons={this.warDragons()} toggleAtWar={this.toggleAtWar} />
      </div>
    );
  }
}

export default App;
