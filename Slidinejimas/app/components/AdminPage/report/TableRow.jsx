import React from 'react';
import PropTypes from 'prop-types';
import Status from './components/Status';
import Action from './components/Action';
import NewWindow from 'react-new-window';
import moment from 'moment';

export default class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      pressed: false,
    };
    this.openWindow = this.openWindow.bind(this);
  }

  openWindow() {
    this.setState({
      pressed: true,
    });
  }
  closeWindow() {
    this.setState({
      pressed: false,    
    });
  }
  render() {
    const { data } = this.props;
    const site = this.props.sites.find(site => site.Id === data.Site);
    const { Name, Surname, CheckInTime, CheckOutTime, Awaiter, CompanyName, Img } = data;
    let statusName;
    if (CompanyName) statusName = 'Delivery';
    else if (CheckInTime && !CheckOutTime) statusName = 'Checked In';
    else statusName = 'Checked Out';
   
    const checkinDate = moment.utc(CheckInTime).toDate();
    const checkoutDate = moment.utc(CheckOutTime).toDate();

    const day = 24 * 60 * 60 * 1000; // milliseconds

    return (
      <tr>
        <td>{CheckInTime ? moment(checkinDate).local().format('YYYY-MM-DD HH:mm:ss') : '-'}</td>
        <td>{CheckOutTime ? moment(checkoutDate).local().format('YYYY-MM-DD HH:mm:ss') : '-'}</td>
        <td>{site ? site.Name : ''}</td>
        <td>{Name + ' ' + Surname}</td>
        <td>{CompanyName ? 'Delivery' : 'Visiting'}</td>
        <td>{Awaiter ? Awaiter : '-'}</td>
        <td>{CompanyName ? CompanyName : '-'}</td>
        {<td><Status status={statusName} /></td>}
        <td><img className='icon' src={Img} onClick={this.openWindow.bind(this)} /></td>
        {this.state.pressed ?
          <NewWindow onUnload = {this.closeWindow.bind(this)}><img src ={Img}/> </NewWindow>
          : null}
        <Action Name={Name}
          Surname={Surname}
          Site={data.Site}
          isEligibleForCheckOut={CheckInTime &&
          !CheckOutTime &&
          !CompanyName &&
          (new Date() - new Date(CheckInTime)) < day} // checks if the difference between the dates is less than one day
        />
       
      </tr>
    );
  }
}

TableRow.propTypes = {
  data: PropTypes.shape({
    timestamp: PropTypes.string,
    Name: PropTypes.string,
    Awaiter: PropTypes.string,
    CheckInTime: PropTypes.string,
    CompanyName: PropTypes.string,
    CheckOutTime: PropTypes.string,
    Site: PropTypes.string,
    Img: PropTypes.string,
  }),
  sites: PropTypes.any,
};