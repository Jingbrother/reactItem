import React ,{Component} from 'react'
import { Table, Button,Card,Spin,Popconfirm,Input,message} from 'antd';


class Hot extends Component{
    constructor(){
        super()
         this.data = [
            {
              key: '0',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
            },
          ];
            
    }
    state = {
        filteredInfo: null,
        sortedInfo: null,
    
        updataData:null,
        value:''
      };
    
      handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
      };
    
      clearFilters = () => {
        this.setState({ filteredInfo: null });
      };
    
 
    
 
      componentDidMount(){
        this.refreshData()
    }
   
    refreshData=()=>{
      let token=  window.localStorage.getItem('token')
      console.log(this)
      this.$axios.get(`http://39.96.45.250:3000/admin/food/getFoodsByType?token=${token}&state=0`)
      .then((data)=>{
          this.data=data.data.list
          this.setState({}) 
      })
  }
ss(val){
  for (let i = 0; i < this.data.length; i++) { 
    if (this.data[i] == val) return i; 
    } 
    return -1;
}
    reset=()=>{
      this.refreshData()
      this.state.value=''
    }
    del=(data,d)=>{
      this.$axios.get(`http://39.96.45.250:3000/admin/food/updata?_id=${data}&state=1&token=${window.localStorage.getItem('token')}`)
      .then((data1)=>{
        if(data1.data.err===0){
          let index=this.ss(d)
          this.data.splice(index,1)
          this.setState({})
        }
      })
     
    }
  
    inquire=()=>{
      if(this.state.value==''){
          this.refreshData()
      }else{
        let token=  window.localStorage.getItem('token')
          this.$axios.get(`http://39.96.45.250:3000/admin/food/getDimFoods?token=${token}&name=${this.state.value}`)
          .then((data)=>{
              console.log(data)
               if(data.data.err===0){
                      this.data=data.data.list
                     message.success('查询成功')
              }else{
                 this.state.data=[]
                message.error('未找到相关用户，请重试')
             }
              this.setState({})
          })
      }
  }
    render(){
        let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
  
    const columns = [
      {
        title: '电影名',
        dataIndex: 'name',
        key: 'name',
        // filters: [{ text: 'name', value:'贞子大战菊花怪8' }, { text: 'Jim', value: 'Jim' }],
        filteredValue: filteredInfo.name || null,
        // onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '上映时间',
        dataIndex: 'showtime',
        key: 'showtime',
    
        sortOrder: sortedInfo.columnKey === 'showtime' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '图片',
        dataIndex: 'img',
        key: 'img',
        render(img){
          return(
              <img src={img} width='100' height='100' alt='' ></img>
          )
      }
    },
      
      {
        title: '演员',
        dataIndex: 'actor',
        key: 'actor',
        filters: [{ text: '古天乐', value: '古天乐' }, { text: '吴京', value: '吴京' },{ text: '威尔·史密斯', value: '威尔·史密斯' },{ text: '黄渤', value: '黄渤' },{ text: '周冬雨', value: '周冬雨' },{ text: '沈腾', value: '沈腾' },{ text: '张涵予', value: '周冬雨' }, { text: '袁泉', value: '袁泉' }],
        filteredValue: filteredInfo.actor || null,
        onFilter: (value, record) => record.actor.includes(value),
        sorter: (a, b) => a.actor.length - b.actor.length,
        sortOrder: sortedInfo.columnKey === 'actor' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        filters: [{ text: '10-20', value:1, }, { text: '20-30', value: 2 },{ text: '30-40', value: 3 },{ text: '40-50', value: 4 },{ text: '50-60', value: 5 }],
        filteredValue: filteredInfo.price || null,
        onFilter: (value, record) => record.price.includes(value),
        sorter: (a, b) =>a.price-b.price,
        sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '票房',
        dataIndex: 'boxOffice',
        key: 'boxOffice',
        filters: [{ text: '10-20亿', value:'1亿', }, { text: '20-30亿', value: '2亿' },{ text: '30-40亿', value: 3 },{ text: '40-50亿', value: 4 }],
        filteredValue: filteredInfo.boxOffice || null,
        onFilter: (value, record) => record.boxOffice.includes(value),
        sorter: (a, b) => a.boxOffice - b.boxOffice,
        sortOrder: sortedInfo.columnKey === 'boxOffice' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '评分',
        dataIndex: 'grade',
        key: 'grade',
        filters: [{ text: '1-2', value: 1 }, { text: '2-3', value: 2 },{ text: '3-4', value: 3 },{ text: 4-5, value: 4 },{ text: '5-6', value: 5},{ text: '6-7', value: 6 },{ text: '7-8', value: 7 },{ text: '8-9', value: 8 },{text:'9以上',value:9}],
        filteredValue: filteredInfo.grade || null,
        onFilter: (value, record) => record.grade.includes(value),
        sorter: (a, b) => a.grade - b.grade,
        sortOrder: sortedInfo.columnKey === 'grade' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '操作',
        dataIndex: 'state',
        width:150,
        fixed:'right',
        key:'state',
        render:(a,data,c)=> {
         
          return(
            <div>
              <Popconfirm 
                title='你确定要要将电影下架吗？'
                onConfirm={()=>{
                  this.del(data._id,data)
                }}
                >
              <Button size='small' type='danger'>下架</Button>
               
              </Popconfirm>
           <Button size='small' 
              >热映中</Button>
              
            </div>
          )
        },
      },
    ];
        return (
            <div className='Movieall'>
              <Input placeholder="Basic usage" style={{width:'300px',margin:'20px'}} placeholder='请输入电影名称' value={this.state.value} onChange={(e)=>{
                    this.state.value=e.target.value
                    this.setState({})
                }}/>
                <Button type="dashed" onClick={this.inquire}>查询</Button>
                <Button type="dashed" onClick={this.reset}>重置</Button>
                 
                <div className="table-operations">
              
                </div>
                 <Table columns={columns} dataSource={this.data} onChange={this.handleChange} pagination={{defaultPageSize:6}} />
            </div>
        )
    }
}
export default Hot

