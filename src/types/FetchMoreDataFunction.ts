export type FetchMoreDataFunction = (
	page: number,
	setHasNextPage: (hasNextPage: boolean) => void
) => void;
