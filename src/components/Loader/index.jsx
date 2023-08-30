import React from 'react';
import ReactLoading from 'react-loading';

const Loader = () => {
	return (
		<div className="loader">
			<ReactLoading type="spinningBubbles" color="#2B81C0" />
			<p className="loader-text">Loading...</p>
		</div>
	);
};

export default Loader;
