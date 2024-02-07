import { HttpResponse, http } from 'msw';
import { Item } from '../types/Item';
import { PaginationResponse } from '../types/PaginationResponse';

const generateItems = (page: number, size: number) => {
	const start = page * size;

	return Array.from({ length: size }, (_, i) => ({
		id: start + i,
		name: `Item ${start + i}`,
	}));
};

export const handlers = [
	http.get('/api/items', ({ request }) => {
		const url = new URL(request.url);
		const searchParams = url.searchParams;
		const size = Number(searchParams.get('size'));
		const page = Number(searchParams.get('page'));
		const items = generateItems(page, size);
		const totalCount = 50;
		const totalPages = Math.ceil(totalCount / size) - 1;

		const response: PaginationResponse<Item> = {
			contents: items,
			pageNumber: page,
			pageSize: size,
			totalPages,
			totalCount,
			isLastPage: totalPages <= page,
			isFirstPage: page === 0,
		};

		return HttpResponse.json(response);
	}),
];
