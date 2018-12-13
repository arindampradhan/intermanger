import React, { Component } from "react";
import PropTypes from 'prop-types';
import api from '../../api';


export default function GroupList({ group,...props }) {
    let time = new Date().toDateString()
    if (group._id) {
        time = new Date(group._id).toDateString()
    }
    return (
        <div className="list">
            <h4 className="font-weight-light">{group.name}</h4>
            <span>Created at: {time}</span>
         
        </div>
    )
}