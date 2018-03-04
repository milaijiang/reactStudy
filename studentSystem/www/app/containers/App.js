import React, { Component } from 'react'
import Student from "../components";
import Logo from "../components/logoOrRegist/Logo.js";
import Regist from "../components/logoOrRegist/Resgist.js";
import Select from "../components/logoOrRegist/Select.js";

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            model: "select",
            IDS : null,
            people : null
        }
    }

    changeModel(e, ids = null) {
        this.setState({
            "model" : e,
            "IDS" : ids
        })
    }
    select(e) {
        this.setState({
            people : e
        })
    }

    showModel() {
        switch (this.state.model) {
            case "logo":
                return <Logo changeModel={this.changeModel.bind(this)}/>;
            case "student" : 
                return <Student IDS={this.state.IDS} people={this.state.people}/>
            case "regist":
                return <Regist changeModel={this.changeModel.bind(this)}/>
            case "select":
                return <Select changeModel={this.changeModel.bind(this)} select={this.select.bind(this)}/>
        }
    }
    render() {
        return (
            <div>
                {this.showModel()}
            </div>
        )
    }
}
