import React, { Component } from "react";
import api from '../../api'
import { TabContent, TabPane, Nav, NavItem, NavLink  } from 'reactstrap';
import classnames from 'classnames';
import { inject, observer } from "mobx-react";


function TableWrapper({children}) {
    return (
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}

@inject("user", 'home')
@observer
class GroupDetailView extends React.Component {
    state = {
        activeTab: '1',
        applied: {},
        current_group: undefined
    };

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentWillReceiveProps(nProps) {
        const { current_group } = nProps.home;
        this.setState({ current_group })
    }

    render() {
        const { users, getNonActiveUsers, getActiveUsers} = this.props.user;
        const { current_group, assignUserToGroup, removeUserFromGroup, isActiveUser } = this.props.home;
        return (
            <>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            All User
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Active Users
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Inactive Users
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <TableWrapper>
                            {users && users.length ? (
                                <>
                                    {users.slice(0, 100).map((usr, _id) => {
                                        return (
                                            <tr key={usr._id}>
                                                <th scope="row">{_id + 1}</th>
                                                <td>{usr.first_name}</td>
                                                <td>{usr.phone}</td>
                                                <td>
                                                    {isActiveUser(usr, this.state.current_group || current_group) ? (
                                                        <button onClick={() => removeUserFromGroup(usr, current_group)} className="btn--remove">Remove</button>
                                                    ) : (
                                                            <button onClick={() => assignUserToGroup(usr, current_group)} className="btn--add">Add</button>
                                                        )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            ) : null}
                        </TableWrapper>
                    </TabPane>
                    <TabPane tabId="2">
                        <TableWrapper>
                            {current_group && current_group.users_list_ids ?
                                (<>
                                    {getActiveUsers(current_group.users_list_ids).map((usr, _id) => (
                                        <tr key={usr._id}>
                                            <th scope="row">{_id + 1}</th>
                                            <td>{usr.first_name}</td>
                                            <td>{usr.phone}</td>
                                            <td>
                                                {isActiveUser(usr, current_group) ? (
                                                    <button onClick={() => removeUserFromGroup(usr, current_group)} className="btn--remove">Remove</button>
                                                ) : (
                                                        <button onClick={() => assignUserToGroup(usr, current_group)} className="btn--add">Add</button>
                                                    )}
                                            </td>
                                        </tr>
                                    ))}
                                </>) :
                                null
                            }
                        </TableWrapper>
                    </TabPane>
                    <TabPane tabId="3">
                        <TableWrapper>
                            {current_group && current_group.users_list_ids ?
                                (<>
                                    {getNonActiveUsers(current_group.users_list_ids).map((usr, _id) => (
                                        <tr key={usr._id}>
                                            <th scope="row">{_id + 1}</th>
                                            <td>{usr.first_name}</td>
                                            <td>{usr.phone}</td>
                                            <td>
                                                {isActiveUser(usr, current_group) ? (
                                                    <button onClick={() => removeUserFromGroup(usr, current_group)} className="btn--remove">Remove</button>
                                                ) : (
                                                        <button onClick={() => assignUserToGroup(usr, current_group)} className="btn--add">Add</button>
                                                    )}
                                            </td>
                                        </tr>
                                    ))}
                                </>) :
                                null
                            }
                        </TableWrapper>
                    </TabPane>
                </TabContent>
            </>
        );
    }
}

export default GroupDetailView;