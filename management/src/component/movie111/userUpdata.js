import React,{Component,Lable} from 'react'

import { Input, Col, Row, Select, Button,message,Card,DatePicker} from 'antd';
import './userupdata.less'
const InputGroup = Input.Group;
const { Option } = Select;
class Userupdata extends Component{
  constructor(props){
    super(props)
    this.state={
      name:props.data.name,
      showtime:props.data.showtime,
      state:props.data.state,
      actor:props.data.actor,
      price:props.data.price,
      boxOffice:props.data.boxOffice,
      grade:props.data.grade,
      img:props.data.img,
      _id:props.data._id,
    }
  }
  
  submit=()=>{
    
    let {name,showtime,state,actor,price,boxOffice,grade,img,_id} =this.state
    console.log({name,showtime,state,actor,price,boxOffice,grade,img,_id})
    if(img !==''){
      // let query={name,showtime,state,actor,price,boxOffice,grade,img}
      let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZGFmMDI5MjRhMmQxZjI0YmJiY2EyZWYiLCJ1cyI6IndhbmciLCJpYXQiOjE1NzE3OTMyNDMsImV4cCI6MTU3MjM5ODA0M30.OIVi8bK1-xTIoAwfU0Nhpk33xc0Ni_q_n2dLdEHNkV0'
      // console.log(query)
      this.$axios.get(`http://39.96.45.250:3000/admin/food/revampFood?_id=${_id}&name=${name}&showtime=${showtime}&state=${state}&actor=${actor}&price=${price}&boxOffice=${boxOffice}&grade=${grade}&token=${token}&img=${img}`)
      .then((data)=>{
        console.log(data)
        if(data.data.err==0){
          message.success('修改成功')
          console.log(data)
          this.props.refresh()
          this.props.yinchang()
       
        }else{
          message.error('修改失败')
          console.log(data)
        }
        
        
      })
      
    }
    else{
      message.error('请上传图片')
    }
  }
  
  upload=()=>{
    let file=this.refs.file.files[0]
    var r = new FileReader();  //本地预览
    // 创建文件读取对象
    r.onload = ()=>{
      // 文件编译成base64成功后执行
       console.log(r.result);//图片的base64
       this.setState({img:r.result})
       
    }
    //通过读取对象读取一个文件
     r.readAsDataURL(file);//本地预览对象进行读取 

     //////////////////////////////////////////////
    let formdata=new FormData()
    formdata.append('img',file)
    let config={
      headers:{'Content-Type':'multipart/form-data'}
    }
    this.$axios.post('http://39.96.45.250:3000/admin/file/img',formdata,config)
    .then((data)=>{
      if(data.data.err===0){
        this.state.img=data.data.imgPath
        console.log(data)
        message.success('图片上传成功')

      }else{
        console.log(data)
        message.error('图片上传失败')
      }
    })
  }
  render(){
    let {name,showtime,state,actor,price,boxOffice,grade,img} =this.state
    return(
      <div className='userupdata-box'>
        
        <Card title='电影修改'>
        <div className='content'>
          
          <span>电影名:</span>
            
          <Input type='text' value={this.state.name} onChange={
          (e)=>{
            this.setState({name:e.target.value})
          }
          }></Input>
           <InputGroup compact>
          <Input style={{ width: '50%' }} defaultValue="上映时间" />
          <DatePicker style={{ width: '50%' }}  onOk={
          (e)=>{
            this.setState({showtime:e.target.value})
          }}/>
        </InputGroup>
          <span>演员:</span>
            
            <Input type='text' value={this.state.actor} onChange={
            (e)=>{
              this.setState({actor:e.target.value})
            }
            }></Input>
          <span>票价:</span>
            
            <Input type='text' value={this.state.price} onChange={
            (e)=>{
              this.setState({price:e.target.value})
            }
            }></Input>
          <span>票房:</span>
            
            <Input type='text' value={this.state.boxOffice} onChange={
            (e)=>{
              this.setState({boxOffice:e.target.value})
            }
            }></Input>
          <span>评分:</span>
            
            <Input type='text' value={this.state.grade} onChange={
            (e)=>{
              this.setState({grade:e.target.value})
            }
            }></Input>
            
              <span>
                放映状态&nbsp;
              </span>
            
          
            <select defaultValue="-1" Style={{ width: 120 }} value={state} onChange={(e)=>{
            this.setState({state:e.target.value})
          }}>
            <option >-1</option>
            <option >0</option>
            <option >1</option>
          </select><br/>
          
          
            
              <span>图片上传</span>
              <input type="file" ref='file' ></input>
          <Button type="primary" onClick={this.upload}>上传</Button>
          <img src={this.state.img} width='60' height='60' alt=""/><br/>
          
          <Button type="primary"  onClick={this.submit}>提交</Button>
          </div>
        </Card>
        
      </div>
    )
  }
}
export default Userupdata