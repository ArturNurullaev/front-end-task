import React, { Component } from 'react';


import './NavigationRight.css';


export default function NavigationRight (props) {
	
	let right = props.nextPage ? <div className="navigation-right">	<div className="navigation-rightNumber">{props.nextPage}</div>	</div> : <div></div>
		
  return (
	  [right]
  );
	
	
}


