import React,{Component} from 'react'
import './index.less'
import {Card, message,Button,Select,Input,Upload,Icon,Cascader,Row,Col,Checkbox,AutoComplete, Form} from 'antd'
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class MovieAdd extends Component{
  
  constructor(){
    super()
    this.state={
      name:'',
      showtime:'',
      state:'',
      actor:'',
      price:'',
      boxOffice:'',
      grade:'',
      img:''
    }
  }
  
  submit=()=>{
    
    let {name,showtime,state,actor,price,boxOffice,grade,img} =this.state
    console.log({name,showtime,state,actor,price,boxOffice,grade,img})
    if(img !==''){
      // let query={name,showtime,state,actor,price,boxOffice,grade,img}
      let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZGFmMDI5MjRhMmQxZjI0YmJiY2EyZWYiLCJ1cyI6IndhbmciLCJpYXQiOjE1NzE3OTMyNDMsImV4cCI6MTU3MjM5ODA0M30.OIVi8bK1-xTIoAwfU0Nhpk33xc0Ni_q_n2dLdEHNkV0'
      // console.log(query)
      this.$axios.get(`http://39.96.45.250:3000/admin/food/addfood?name=${name}&showtime=${showtime}&state=${state}&actor=${actor}&price=${price}&boxOffice=${boxOffice}&grade=${grade}&token=${token}&img=${img}`)
      .then((data)=>{
        if(data.err==0){
          message.success('添加成功')
          console.log(data)
        }else{
          message.error('添加失败')
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
      if(data.err===0){
        this.state.img=data.imgPath
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
      <div className='movieadd-box'>
        
        <Card title='电影添加'>
        <div className='content'>
          <Form.Item
            label={
              <span>
                电影名&nbsp;
              </span>
            }
          >
            <Input type='text' value={this.state.name} onChange={
            (e)=>{
              this.setState({name:e.target.value})
            }
          }></Input>
          </Form.Item>
          <Form.Item
            label={
              <span>
                上映时间&nbsp;
              </span>
            }
          >
            <Input type='text' value={this.state.name} onChange={
            (e)=>{
              this.setState({name:e.target.value})
            }
          }></Input>
          </Form.Item>
          <Form.Item
            label={
              <span>
                演员&nbsp;
              </span>
            }
          >
            <Input type='text' value={this.state.name} onChange={
            (e)=>{
              this.setState({name:e.target.value})
            }
          }></Input>
          </Form.Item>
          <Form.Item
            label={
              <span>
                票价&nbsp;
              </span>
            }
          >
            <Input type='text' value={this.state.name} onChange={
            (e)=>{
              this.setState({name:e.target.value})
            }
          }></Input>
          </Form.Item>
          <Form.Item
            label={
              <span>
                票房&nbsp;
              </span>
            }
          >
            <Input type='text' value={this.state.name} onChange={
            (e)=>{
              this.setState({name:e.target.value})
            }
          }></Input>
          </Form.Item>
          <Form.Item
            label={
              <span>
                评分&nbsp;
              </span>
            }
          >
            <Input type='text' value={this.state.name} onChange={
            (e)=>{
              this.setState({name:e.target.value})
            }
          }></Input>
          </Form.Item>
          <Form.Item
            label={
              <span>
                放映状态&nbsp;
              </span>
            }
          >
            <select defaultValue="-1" Style={{ width: 120 }} value={state} onChange={(e)=>{
            this.setState({state:e.target.value})
          }}>
            <option >-1</option>
            <option >0</option>
            <option >1</option>
          </select>
          </Form.Item>
          <Form.Item
            label={
              <span>
                图片上传&nbsp;
              </span>
            }
          >
            <Input type="file" ref='file' />
          <Button type="primary" onClick={this.upload}>上传</Button>
          <img src={this.state.img} width='80' height='80' alt=""/>
          </Form.Item>
          <Button type="primary" onClick={this.submit}>提交</Button>
          </div>
        </Card>
        
      </div>
    )
  }
}


export default MovieAdd

