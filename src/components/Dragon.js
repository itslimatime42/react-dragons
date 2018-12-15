import React from 'react'

export default class Dragon extends React.Component {

    handleClick = (e) => {
        e.persist()
        this.props.toggleAtWar(e.target.id)
    }

    render() {
        return (
            <div>
                <img id={this.props.id} alt="dragon" src={this.props.image} onClick={this.handleClick} />
                <h4>{this.props.name}: {this.props.description}</h4>
                <br /><br />
            </div> 
        )
    }
}