import { error } from '@sveltejs/kit';
import { fetchFischart, fetchFisch, createFisch, fetchAngler, deleteAngler } from '$lib/api';

export async function load({ params }) {
    const fisches = await fetchFisch();
	const fische = fisches.find((f: unknown) => f.id === parseInt(params.id));


	return {
	};
}