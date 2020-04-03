import React from 'react';
import './popup.css'
import moment from 'moment';

class Report extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
    
          date:new Date(),
            lastdate: moment().add(6, 'days'),
        }
      }
    render(){
        let data;
        
        data=JSON.parse(localStorage.getItem(this.props.mail))
        return(
            <div >
                <table className='centre' border='1'>
                <col width="130"/>
                <col width="80"/>
                <col width="200"/>
                    <tr>
                        <th>BoardName</th>
                        <th>EndDate</th>
                        <th>Task</th>
                    </tr>
                    {data.Board.map((item,key)=>{
                        return (
                            
                        item.stages.map((item1,key1)=>{
                                  return item1.task.map((item2,key2)=>{
                                     return   moment(item2.enddate).format('L')<=moment(this.state.lastdate).format('L') 
                                   && moment(item2.enddate).format('L')>=moment(this.state.date).format('L')?( 
                                  <tr> 
                                      <td style={{height:"100px",width:"100px"}}>{item.boardname}</td>
                                      <td>{item2.enddate}</td>
                                      <td>
                                          title:{item2.title}<br/>
                                          description:{item2.description}<br/>
                                          createdDate:{item2.created_date}<br/>
                                          StartDate:{item2.startdate}<br/>
                                          EndDate:{item2.enddate}<br/>
                                          </td>
                                    </tr> ):null
                                   })
                        })
                        )
                    })}
                </table>
            </div>
        )
    }
}

export default Report;