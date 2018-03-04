import React, { Component } from 'react'
import CutArea from "./CutArea.js";

export default class CutPortrait extends Component {
    constructor(){
        super()
        this.state = {
            isfinish : false,
            imgurl : ""
        }
    }
    componentDidMount(){
        var self = this;
        window.finish = function(url) {
            self.setState({
                isfinish : true,
                imgurl : url
            })
        }
    }
    
    
    render() {
        return (
            <div >
               {
                    !this.state.isfinish
                    ?
                    <div className="cutportrait">
                        <iframe 
                            src="/iframes/form.html" 
                            frameBorder="0"
                            width="700"
                            height="360"
                        >
                        </iframe>
                    </div>
                    :
                    <CutArea 
                        imgs={this.props.imgs}
                        changeShow={this.props.changeShow}
                        imgurl={this.state.imgurl}
                    />
               }
            </div>
        )
    }
}
