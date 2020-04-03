import React from 'react';
import './popup.css'
i
import Routen from './Routen';

class TaskReport extends React.Component{
    render(){
        let data;
        let count=0,newcount=0,donecount=0;
        data=JSON.parse(localStorage.getItem(this.props.mail))
        return(
            <div >
                <Routen mail={this.props.mail}/>
                <table className='centre' border='1'>
                    <tr>
                        <th>BoardName</th>
                        <th>New Stage Task</th>
                        <th>WIP Stage Task</th>
                        <th>Done Stage Task</th>
                    </tr>
                    {data.Board.map((item,key)=>{
                        item.stages.map((item1,key1)=>{
                                    key1===0?newcount=item1.task.length:(key1===item.stages.length-1?donecount=item1.task.length:count=count+item1.task.length)
                        })
                        return( <tr>
                            <td>{item.boardname}</td>
                            <td>{newcount}</td>
                            <td>{count}</td>
                            <td>{donecount}</td>
                        </tr>)
                    })}
                </table>
            </div>
        )
    }
}

export default TaskReport;