import React, { Component } from "react";

class OfflineErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="error_container offline">
        <div className="error_head">
          <img src="/img/logo.jpeg" className="ep_logo" alt="" id="qa_logo" />
        </div>
        <div className="error_body">
          <div className="error_col">
            <img
              src="/img/resolution.png"
              className="ep_icon"
              alt=""
              id="qa_url_error"
            />
            <h2 className="pb-1" id="qa_url_not_error">
              There is no Internet Connection :(
            </h2>
            <div className="unauthorized_content">
              <p id="qa_for_further">
                Check your network settings and try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OfflineErrorPage;
