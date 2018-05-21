import React from 'react';
import PropTypes from 'prop-types';

export default class AdminTableRow extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <tr>
        <th>{this.props.Pavadinimas}</th>
        <th>
          <img className='icon' src={'data:image/jpeg;base64,' + this.props.Paveiksliukas} onClick={handleClick} />
          
        </th>
       
      </tr>
    );
  }

  
}

function handleClick(e){
  e.preventDefault();
  alert('dasdsadasd');
    
}

AdminTableRow.propTypes = {
  Paveiksliukas: PropTypes.any,
  Pavadinimas: PropTypes.any,
};