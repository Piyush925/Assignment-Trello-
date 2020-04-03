import React from 'react';
import './popup.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,Route,Switch } from 'react-router-dom'
import Routen from './Routen';
import TaskReport from './TaskReport';
import Report from './Report';
import OneReport from './OneReport';
class Board extends React.Component {

    data;
   toogle=false;
   tbutton=false;
   key=0;
    constructor(props) {
        super(props)
        this.state = {
            boardname: '',
            stages: [
                        {name:"New",task:[]},
                        {name:"Done",task:[]}
                    ]
        }
        this.handletoogle=this.handletoogle.bind(this);
        this.handleadd = this.handleadd.bind(this);
        this.handlename = this.handlename.bind(this);
        this.deleteboard=this.deleteboard.bind(this);
    }
    deleteboard(dkey){
        this.data=JSON.parse(localStorage.getItem(this.props.mail))
        this.data.Board.splice(dkey,1);
        localStorage.setItem(this.props.mail,JSON.stringify(this.data))
        this.setState({boardname:this.state.boardname})
    }
    handletoogle(){
        this.toogle=!this.toogle;
        this.setState({boardname:this.state.boardname})
    }
    handlename(e) {
        this.setState({ boardname: e.target.value })
    }
    handleadd() {
        this.data = JSON.parse(localStorage.getItem(this.props.mail));
        this.data.Board.push(this.state);
        localStorage.setItem(this.props.mail, JSON.stringify(this.data));
        this.setState({ boardname: this.state.boardname })

    }


    render() {
        this.data = JSON.parse(localStorage.getItem(this.props.mail)) 
     
        
        return (
          
            <div >
                
                <p className='centre'>
                    Username: {this.props.mail}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={this.props.onLogout} >Logout</button>
                </p><br />
              {  this.toogle===true? <Routen toogle={this.handletoogle} mail={this.props.mail}/>:<div  >
                   <div style={{float:"left"}} > <input value={this.state.boardname} onChange={this.handlename} placeholder="BoardName" /> <button  onClick={this.handleadd}>Add Board</button>
                  <Link to='/taskstatus' ><button  onClick={()=>{this.setState({ boardname: this.state.boardname });this.tbutton=!this.tbutton}}>Task Report</button></Link>
                  <Link to='/task1status' ><button  onClick={()=>{this.setState({ boardname: this.state.boardname });this.tbutton=!this.tbutton}}>Due Today Report</button></Link>
                  <Link to='/task7status' ><button  onClick={()=>{this.setState({ boardname: this.state.boardname });this.tbutton=!this.tbutton}}>Due 7Days Report</button></Link>
                   </div><br/>
                    {
                        this.data.Board.length > 0 ?
                            <div  class='col-md-6'>
                                <ul>
                                    {this.data.Board.map((item, key1) => {

                                        return (<li><Link to={"/" + item.boardname} onClick={()=>{this.key=key1;
                                        this.toogle=!this.toogle;
                                        this.setState({boardname:this.state.boardname})}}>
                                            {item.boardname}</Link>&nbsp;&nbsp;<button onClick={()=>{this.deleteboard(key1)}}>x</button></li>)
                                    })}
                                </ul>
                            </div>
                            : null
                    }
                  
                </div>}
                {
                    this.tbutton?
                    <Switch>
                    <Route exact path="/taskstatus"><TaskReport mail={this.props.mail}/> </Route>
                    <Route exact path="/task1status"><OneReport mail={this.props.mail}/> </Route>
                    <Route exact path="/task7status"><Report mail={this.props.mail}/> </Route>
                    </Switch> :null
                }
                
               
            </div>
           
        )
    }
}

export default Board;
