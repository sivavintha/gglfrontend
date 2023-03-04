import React, { Component } from "react";

class UnauthorizedErrorPage extends Component {
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
						<img src="/img/unauthorized.png" className="ep_icon" alt="" id="qa_unauthorized" />
						<h2 className="pb-1" id="qa_unauthorized_access">Unauthorized Access :(</h2>
						<div className="unauthorized_content">
							<p className="m-0" id="qa_it_appears">It appears that you don&apos;t have permission to access this page. Please make sure you&apos;re authorized to view this content.</p>
							<p id="qa_for_further_support">For further support & assistance, please contact your Systems Administrator</p>
						</div>
					</div>
				</div>
				{/* <div className="error_footer" id="esm">© 2022 ESM</div> */}
			</div>
		);
	}
}

export default UnauthorizedErrorPage;
