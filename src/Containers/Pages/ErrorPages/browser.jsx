import React, { Component } from "react";

class BrowserErrorPage extends Component {
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
						<img src="/img/browser.png" className="ep_icon" alt="" id="qa_browser_logo" />
						<h2 className="pb-1" id="qa_not_support">Sorry, you are using a non supportive browser :(</h2>
						<p id="qa_suggested_browser">Please use the recent version of the suggested browser as given below!</p>
						<div className="browser_icon">
							<div>
								<img src="/img/chrome.png" alt="" id="qa_chrome_logo" />
								<p>Chrome</p>
							</div>
							<div>
								<img src="/img/firefox.png" alt="" id="qa_firefox_logo" />
								<p>Firefox</p>
							</div>
							<div>
								<img src="/img/opera.png" alt="" id="qa_opera_logo" />
								<p>Opera</p>
							</div>
							<div>
								<img src="/img/edge.png" alt="" id="qa_edge_logo" />
								<p>Edge</p>
							</div>
						</div>
					</div>
				</div>
				<div className="error_footer" id="esm">© 2022 ESM</div>
			</div>
		);
	}
}

export default BrowserErrorPage;
