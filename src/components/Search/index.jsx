import React from 'react';

const Search = ({value, onChange, handleSearchClick, searchVariables, onSearch}) => {
	return (
		<div>
			<div className="search">
				<input
					type="text"
					className="search-input"
					placeholder="Search..."
					value={value}
					onChange={onChange}
					onClick={handleSearchClick}
				/>
				<Search className="search-icon" />
			</div>
			<div className="dropdown">
				{searchVariables !== '' ? (
					searchVariables?.dashboard.length > 1 ? (
						searchVariables.dashboard
							.filter(item => {
								const searchTerm = value.toLowerCase();
								const companyName = item.company.toLowerCase();

								return searchTerm && companyName.startsWith(searchTerm) && companyName !== searchTerm;
							})
							.map(value => (
								<div
									className="dropdown-row"
									key={value.id}
									onClick={() => onSearch(value.company, value.id)}>
									{value.company}
								</div>
							))
					) : (
						<div></div>
					)
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Search;
