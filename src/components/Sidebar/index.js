

import { observer, inject } from "mobx-react";
import React, { Component } from "react";
import { Link } from 'react-router-dom';


function Sidebar({ home, user }) {
    return (
        <div className="sidenav">
            <div className="sidenav-header">
                <img src="/internation_logo.png" className="img-fluid" alt="internation logo" />
                <i className="text-primary">Intermanager</i>
            </div>
            <div className="profile text-center">
                <div className="padding-y-15">
                    <img src="/manager.png" className="img-fluid rounded-circle" alt="Manager" />
                </div>
                <h4>Manager</h4>
                <div className="row">
                    <div className="col-6">
                        <h5>{home.groups_count}</h5>
                        <span className="font-size-12">Groups</span>
                    </div>
                    <div className="col-6">
                        <h5>{user.users_count}</h5>
                        <span className="font-size-12">Users</span>
                    </div>
                </div>
            </div>
            <div className="gap-20"></div>
            <Link href="/" to="/">Groups</Link>
            <Link href="/users" to="/users">Users</Link>
            <Link href="#" to>Create User | TODO</Link>
            <Link href="#" to>Create Group | TODO</Link>
        </div>
    )
}

Sidebar.defaultProps = {
    home: {
        groups_count: 0,
    },
    user: {
        users_count: 0
    }
}

export default inject("home", 'user')(observer(Sidebar));