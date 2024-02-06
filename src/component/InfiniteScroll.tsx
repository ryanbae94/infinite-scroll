import { useState } from 'react';
import { Item } from '../types/item';
import { PaginationResponse } from '../types/response';
import './InfiniteScroll.css';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { FetchMoreDataFunction } from '../types/fetchMoreData';
import Skeleton from './Skeleton';

export default function InfiniteScroll() {
	const [items, setItems] = useState<Item[]>([]);
	const [isFetching, setIsFetching] = useState(false);

	const fetchItems: FetchMoreDataFunction = async (page, setHasNextPage) => {
		setIsFetching(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const size = 10;
		const params = { page: page.toString(), size: size.toString() };
		const queryString = new URLSearchParams(params).toString();
		const reqUrl = `/api/items?${queryString}`;
		try {
			const response = await fetch(reqUrl);
			const data: PaginationResponse<Item> = await response.json();
			setItems((prevItems) => [...prevItems, ...data.contents]);
			setHasNextPage(!data.isLastPage);
		} catch (error) {
			console.error('Error fetching items:', error);
		} finally {
			setIsFetching(false);
		}
	};

	const { lastItemRef } = useInfiniteScroll(fetchItems);

	return (
		<div className='container'>
			<div>Infinity Scroll</div>
			{items.map((item, index) => (
				<div
					className='card'
					key={item.id}
					ref={index === items.length - 1 ? lastItemRef : undefined}
				>
					{item.name}
				</div>
			))}
			{isFetching ? <Skeleton /> : null}
		</div>
	);
}
