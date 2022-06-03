import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress});
  }
  apikey = process.env.REACT_APP_NEWS_API
  render() {
    return (
      <Router>
      <div>
        <Navbar/>
        <LoadingBar
        color='blue'
        height={3.5}
        progress={this.state.progress}
      />
        <Routes>
        <Route exact path="/" element = {<News setProgress= {this.setProgress} apikey={this.apikey} key="general" country = "in" category = "general"/>}/>
        <Route exact path="/business" element = {<News setProgress={this.setProgress} apikey={this.apikey} key="business" country = "in" category = "business"/>}/>
        <Route exact path="/entertainment" element = {<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" country = "in" category = "entertainment"/>}/>
        <Route exact path="/health" element = {<News setProgress={this.setProgress} apikey={this.apikey} key="health" country = "in" category = "health"/>}/>
        <Route exact path="/science" element = {<News setProgress={this.setProgress} apikey={this.apikey} key="science" country = "in" category = "science"/>}/>
        <Route exact path="/sports" element = {<News setProgress={this.setProgress} apikey={this.apikey} key="sports" country = "in" category = "sports"/>}/>
        <Route exact path="/technology" element = {<News setProgress={this.setProgress} apikey={this.apikey} key="technology" country = "in" category = "technology"/>}/>
        </Routes>
      </div>
      </Router>
    )
  }
}

export default App
