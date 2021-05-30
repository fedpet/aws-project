import React, { Component } from 'react';
import { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';


class UserList extends Component {
  state = {
        users: [],
        columns: [{
                dataField: 'email',
                text: 'Email',
                sort: true,
                filter: textFilter()
            },
            {
                dataField: 'role',
                text: 'Role',
                sort: true
            }
        ]
    }
    componentDidMount() {
        var obj = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }
        fetch("/api/account", {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token ,
            }

        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({users: json})
        });
    }

  render() {
      return (
        <div style={{ marginTop: 20 }}>
            <BootstrapTable
             striped
             hover keyField='email'
             data={ this.state.users }
             columns={ this.state.columns }
             filter={ filterFactory() }
             pagination={ paginationFactory() }/>
        </div>
      );
  }
}

export default UserList

