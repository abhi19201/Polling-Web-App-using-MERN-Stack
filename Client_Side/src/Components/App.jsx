import React from 'react';
import Header from "../Structure/Header.jsx";
import Footer from "../Structure/Footer.jsx";
import Cards from "./Cards";
import { Switch, Route} from 'react-router-dom';
import Vote from "./Vote";
import Form from "./Form";
import Response from "./Response";
import CssBaseline from '@material-ui/core/CssBaseline';



function App(props){

    

    const ref = React.useRef(null);
    
    return (
        <div>
            <CssBaseline />
            <Header ref={ref}/>
            
                <Switch>
            
                    <Route exact path='/' render={props => (<Cards 
                        onClick = {()=>{ref.current.setAvatarState()}}
                    />)}/>
                    <Route path='/Vote' render={props => (<Vote />)}
                    />
                    <Route path='/Form' render={props => (<Form />)} 
                    />
                    <Route path='/Response' render={props => (<Response />)} 
                    />

                </Switch>
            <Footer />
            
        </div>
    );
}


export default App;