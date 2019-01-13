import React, { Component } from 'react';


import './NavigationLeft.css';


export default function NavigationLeft (props) {
			
	let left = props.previousPage ? <div className="navigation-left">	<div className="navigation-leftNumber">{props.previousPage}</div>	</div> : <div></div>
		
  return (
	  [left]
  );
	
	
}


