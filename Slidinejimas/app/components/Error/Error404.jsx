import React from 'react';
import ErrorImg from './images/error.png';
import Title from '../common/Title';

class Error404 extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return ( 
      <div className="content-wrapper">
        <title>Whoops!</title>
        <Title text={['Whooops, someone mistyped the url!']} />
        <img className="back" src={ErrorImg}/>
      </div>
    );
  }
}
export default Error404;