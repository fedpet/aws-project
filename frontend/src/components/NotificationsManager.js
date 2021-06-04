import React from 'react'

class NotificationsManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: []
        }
        this.pollingTimer = null
        this.onToggle = this.onToggle.bind(this)
    }

    componentDidMount() {
        this.fetchNotifications()
    }

    componentWillUnmount() {
        if (this.pollingTimer) {
            clearTimeout(this.pollingTimer)
            this.pollingTimer = null
        }
    }

    fetchNotifications() {
        fetch('/api/notifications', {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(notifications => {
                this.setState({ notifications: notifications })
            })
            .finally(() => {
                this.pollingTimer = setTimeout(()=> this.fetchNotifications(), 4000)
            })
    }

    onToggle() {
        this.state.notifications.filter(n => !n.read).forEach(notification => {
            fetch('/api/notifications/' + notification._id, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    read: true
                })
            })
        })
    }

    render() {
        let notifications = this.state.notifications
        let unreadCount = notifications.filter(n => !n.read).length
        return <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.onToggle}>
                <i className="fas fa-bell fa-fw"></i>
                {unreadCount > 0 ? <span className="badge badge-danger badge-counter">{unreadCount}</span> : ''}
            </a>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">Notifications Center</h6>
            {notifications.map(notification => {
                return (
                    <a className="dropdown-item d-flex align-items-center" key={notification._id} href="#">
                        <div className="mr-3">
                            <div className="icon-circle bg-primary">
                                <i className="fas fa-file-alt text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div className="small text-gray-500">{new Date(notification.date).toLocaleDateString()}</div>
                            {notification.read ? notification.message : <span className="font-weight-bold">{notification.message}</span>}
                        </div>
                    </a>
                )
            })}
            { notifications.length <= 0 ? <div className="dropdown-item text-center small text-gray-500">There are no notifications for you</div> : '' }
                <div className="dropdown-item text-center small text-gray-500"></div>
                {/*<a className="dropdown-item text-center small text-gray-500" href="#">Show All Notifications</a>*/}
            </div>
        </li>;
    }
}

export default NotificationsManager