
import React ,{Component} from 'react'
import {Card,Carousel} from 'antd'
import './index.less'
class Home extends Component {
    constructor(){
        super()
        this.state={
            // option:{
            //     title : {
            //         text: '某站点用户访问来源',
            //         subtext: '纯属虚构',
            //         x:'center'
            //     },
            //     tooltip : {
            //         trigger: 'item',
            //         formatter: "{a} <br/>{b} : {c} ({d}%)"
            //     },
            //     legend: {
            //         orient: 'vertical',
            //         left: 'left',
            //         data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            //     },
            //     series : [
            //         {
            //             name: '访问来源',
            //             type: 'pie',
            //             radius : '55%',
            //             center: ['50%', '60%'],
            //             data:[
            //                 {value:335, name:'直接访问'},
            //                 {value:310, name:'邮件营销'},
            //                 {value:234, name:'联盟广告'},
            //                 {value:135, name:'视频广告'},
            //                 {value:1548, name:'搜索引擎'}
            //             ]
            //         }
            //     ]
            // }
        }
    }
    // componentDidMount(){
    //     console.log(this)
    //     this.$axios.get('/yapi/data')
    //     .then((data)=>{
    //         console.log(data)
    //         let option=this.state.option
    //         option.series[0].data=data.data.data
    //         this.setState({option})
    //     })
    // }
    render(){
        return(
            <Card className='home-box'>
                <Carousel autoplay>
                <div>
                <img src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2878238336,1778297185&fm=26&gp=0.jpg'/>
                </div>
                <div>
                <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572019799525&di=844dbbd32e7b58129451b4332596a3b5&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0198cd554481ab0000019ae9d7f152.jpg%401280w_1l_2o_100sh.jpg'/>
                </div>
                <div>
                <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572019799521&di=ec9dc514c3c2cb9d83dcace4bb5aec8d&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F575e600c6e7d1.jpg'/>
                </div>
                <div>
                <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572019844211&di=fd561db5badb86a456e5f45b0d9d6c70&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F010fa6590fd527a8012145507e36c6.jpg%401280w_1l_2o_100sh.jpg'/>
                </div>
            </Carousel>
            </Card>
        )
    }
}
export default Home