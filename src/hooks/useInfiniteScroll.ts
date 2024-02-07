import { useCallback, useEffect, useRef, useState } from 'react';
import { FetchMoreDataFunction } from '../types/FetchMoreDataFunction';

const useInfiniteScroll = (fetchMoreData: FetchMoreDataFunction) => {
	const [page, setPage] = useState(0);
	const [hasNextPage, setHasNextPage] = useState(true);
	const observer = useRef<IntersectionObserver | null>(null);

	const lastItemRef = useCallback(
		(node: Element | null) => {
			if (observer.current) observer.current.disconnect();
			if (!hasNextPage) return;
			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasNextPage) {
						setPage((prev) => prev + 1);
					}
				},
				{ threshold: 0.5 }
			);
			if (node) observer.current.observe(node);
		},
		[hasNextPage]
	);

	useEffect(() => {
		fetchMoreData(page, setHasNextPage);
	}, [page]);
	return { lastItemRef, page };
};

export default useInfiniteScroll;
