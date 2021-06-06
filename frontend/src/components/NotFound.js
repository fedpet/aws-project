import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Topbar from '../components/Navigation/Topbar';
import PageHeading from '../components/PageHeading';

class NotFound extends Component {
    render() {
        return (
            <div id="wrapper">
                  {/* <!-- Content Wrapper --> */}
                  <div id="notFound-content-wrapper" className="d-flex flex-column">
                        {/* <!-- Main Content --> */}
                        <div id="content">
                              {/* <!-- Begin Page Content --> */}
                              <div className="container-fluid">
                                    {/* <!-- 404 Error Text --> */}
                                    <div className="text-center">
                                        <div className="error mx-auto" data-text="404">404</div>
                                        <p className="lead text-gray-800 mb-5">Page Not Found</p>
                                        <a href="/">&larr; Back to Dashboard</a>
                                    </div>
                              </div>
                              {/* <!-- /.container-fluid --> */}
                        </div>
                        {/* <!-- End of Main Content --> */}
                  </div>
                  {/* <!-- End of Content Wrapper --> */}
            </div>
        )
    }
}

export default withRouter(NotFound);