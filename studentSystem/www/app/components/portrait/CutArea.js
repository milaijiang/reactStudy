import React, { Component } from 'react'
import { connect } from 'dva';

class CutArea extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        //设置边界盒子的宽度、高度和bigImg宽度高度一样
		var self = this;

		var fangX = 0;
		var fangY = 0;
		var fangW = 100;
		var picw = 0;
		var pich = 0;

		//当图片加载完毕之后，给盒子设置宽度、高度
		$(this.refs.bigImg).bind("load",function(){
			picw = $(self.refs.bigImg).width();
			pich = $(self.refs.bigImg).height();

			$(self.refs.bigImgBound).css({
				width : picw,
                height : pich,
                top : "50%",
                left : "50%",
                marginLeft : -picw / 2,
                marginTop : -pich / 2,
			});
        });
        
        //让fang可以被拖拽
		$(this.refs.fang).draggable({
			containment : "parent" ,
			drag : function(event , ui){
				fangX = ui.position.left;
				fangY = ui.position.top;

				setYulan();

				$(self.refs.fang).find("img").css({
					"left" : -fangX,
					"top" : -fangY
				});
			}
        });
        
        //让fang可以被改变尺寸
		$(this.refs.fang).resizable({
			aspectRatio: 1 / 1 ,
			containment: "parent" ,
			resize : function(event , ui){
                fangW = ui.size.width;
                console.log(ui.size);
                alert("长度为:"+ui.size.width+"宽度为:"+ ui.size.height)
				setYulan();
			}
        });
        
        //设置预览。大家之前受到的DOM的训练现在依然可以用
		const setYulan = () => {

            var w = $(this.refs.yulan).data("w");
            $(this.refs.yulan).find("img").css({
                "top" : -fangY / fangW * w,
                "left" : -fangX / fangW * w,
                "width" :  picw/fangW  * w,
                "height" : pich/fangW   * w
            })
        }
        
        // 点击裁剪并发送请求
        $(this.refs.btn).click(function(){
            $.post("/cut", {
                picurl : self.props.imgurl,
                fangX,
                fangY,
                fangW,
                picw,
                pich
            }, function(data) {
                if(data == "1") {
                    // 调用index的函数
                    self.props.dispatch({"type": "user/change","url" : self.props.imgurl})
                    self.props.changeShow(false,self.props.imgurl);
                }
            })
        })
    }
    render() {
        return (
            <div className="cutarea">
               <div className="left_box">
                    <div className="bigImgBound" ref="bigImgBound">
                            <img 
                                className="bigImg"
                                ref="bigImg"
                                src={`/upload/${this.props.imgurl}`} alt=""
                            />
                            <div ref="fang" className="fang">
                                <img 
                                    className="bigImg"
                                    src={`/upload/${this.props.imgurl}`} 
                                    alt=""
                                />
                            </div>
                            <div className="mask_cover"></div>
                    </div>
               </div>
                <div className="right_box">
                    <div className="yulan" ref="yulan" data-w="200">
                        <img src={`/upload/${this.props.imgurl}`}  alt=""/>
                    </div>
                    <div className="btn" ref="btn">裁剪</div>
                </div>
            </div>
        )
    }
}
export default connect()(CutArea);
