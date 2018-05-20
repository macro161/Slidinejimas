import React from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
  const sites = [];
  props.sites.map(item => sites.push(<option key = {item.Id} value = {item.Id}>{item.Name}</option>));
  return (
    <div className='filter grey'>
      <label htmlFor="typeFilterDropdown">TYPE:</label>
      <select id="typeFilterDropdown" onChange = {props.onChangeType}>
        <option value=""></option>
        <option value="visiting">Visiting</option>
        <option value="delivery">Delivery</option>
      </select>
      <label htmlFor="timestampFilterDropdown">TIMESTAMP:</label>
      <select id="timestampFilterDropdown" onChange = {props.onChangeTime}>
        <option value=""></option>
        <option value={0}>Today</option>
        <option value={1}>Yesterday</option>
        <option value={7}>This Week</option>
        <option value={30}>This Month</option>        
      </select>
      <label htmlFor="locationFilterDropdown">LOCATION:</label>
      <select id="locationFilterDropdown" onChange = {props.onChangeLocation}>
        <option value=""></option>
        {sites.map(item => item)}
      </select>
    </div>
  );
};
Filter.propTypes = {
  onChangeLocation: PropTypes.any,
  onChangeTime: PropTypes.any,
  onChangeType: PropTypes.any,
  sites: PropTypes.any,
};
export default Filter;