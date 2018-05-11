import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <header className="main-header">
            <LinkButton name="Test"/>
        </header>
    }
}