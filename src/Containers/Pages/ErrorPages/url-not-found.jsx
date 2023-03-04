import React, { Component } from "react";

class UrlNotFoundErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="error_container">
        <div className="error_head">
          <img src="/img/logo.jpeg" className="ep_logo" alt="" id="qa_logo" />
        </div>
        <div className="error_body">
          <div className="error_col">
            <img
              src="/img/url_error.png"
              className="ep_icon"
              alt=""
              id="qa_url_error"
            />
            <h2 className="pb-1" id="qa_url_not_error">
              URL not found :(
            </h2>
            <div className="unauthorized_content">
              <p className="m-0" id="qa_req_url">
                Requested URL not found.
              </p>
              <p id="qa_for_further">
                For further support & assistance, please contact your
                Administrator
              </p>
            </div>
          </div>
        </div>
        <div className="error_footer" id="esm">
          © 2022 ESM
        </div>
      </div>
    );
  }
}

export default UrlNotFoundErrorPage;
