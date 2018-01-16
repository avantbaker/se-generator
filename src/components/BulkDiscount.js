import React from 'react';


const BulkDiscount = ({ discountValidator }) => {
	let disable = discountValidator.filter((item) => { return item == true }).length < 2;
	return (
		<div className="bulk-discount-wrapper">
			<input type="checkbox" disabled={ disable } />
			<div className="discount-description">
				<h4 className={(disable ? 'disabled' : 'enabled')}>Bulk discount</h4>
				<p className={'smaller ' + (disable ? 'disabled' : 'enabled')}> Offer a discount for buying multiple Packages </p>
			</div>

			<div className="discount-input-wrapper">
				<input className="package-input" type="number" defaultValue="10" disabled={ disable } /><span className={(disable ? 'disabled' : 'enabled')}>%</span>
			</div>
		</div>
	);
}

export default BulkDiscount;
