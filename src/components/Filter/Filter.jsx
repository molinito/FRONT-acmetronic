import React from 'react';
import { useDispatch } from 'react-redux';
import { filterCategory } from '../../redux/actions';
import './Filter.css';

function Filter() {
	const dispatch = useDispatch();

	const handleCategory = (e) => {
		e.preventDefault();
		dispatch(filterCategory(e.target.value));
	};
	return (
		<div className='componentContainer'>
			<div className='textini'>
				<h1>List of Products</h1>
			</div>

			<div className='section'>
				<div className='filter'>
					<h2>Choose category :</h2>
					<div className='filter-container'>
						<div className='filter-item'>
							<div className='filter-item-container'>
								<div className='filter-item-item'>
									<input
										onClick={handleCategory}
										type='button'
										name='category'
										value='All'
										className='filter-input'
									></input>

									<input
										onClick={handleCategory}
										type='button'
										name='category'
										value='Headphones'
										className='filter-input'
									/>

									<input
										onClick={handleCategory}
										type='button'
										name='category'
										value='SmartWatch'
										className='filter-input'
									/>

									<input
										onClick={handleCategory}
										type='button'
										name='category'
										value='E-readers'
										className='filter-input'
									/>

									<input
										onClick={handleCategory}
										type='button'
										name='category'
										value='Tablets'
										className='filter-input'
									/>

									<input
										onClick={handleCategory}
										type='button'
										name='category'
										value='Laptops'
										className='filter-input'
									/>

									<input
										onClick={handleCategory}
										type='button'
										name='category'
										value='Smartphones'
										className='filter-input'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Filter;
