import React from 'react';

//styles
import './GoBack.css';

export default function GoBack(props) {
	return <div className="goBack" onClick={props.onClick} />;
}
