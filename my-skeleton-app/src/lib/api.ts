import type { IFischart, IFisch, IRekord, IAngler } from './types';
const BASE_URL = 'https://nickot.pythonanywhere.com/api/';
const FISCHSTATS_URL = [
    "fischart",
    "angler",
    "fisch",
    "rekord",
]

export async function fetchFischart() {
    const response = await fetch(`${BASE_URL}${FISCHSTATS_URL[0]}/`);
    const data = await response.json();
    return data;
}

export async function createFischart(fischartData: unknown) {
    const response = await fetch(`${BASE_URL}${FISCHSTATS_URL[0]}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fischartData),
    });
    const data = await response.json();
    return data;
}

export async function fetchFisch() {
    const response = await fetch(`${BASE_URL}${FISCHSTATS_URL[2]}/`);
    const data = await response.json();
    return data;
}

export async function createFisch(fischData: IFisch) {
    const response = await fetch(`${BASE_URL}${FISCHSTATS_URL[2]}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fischData),
    });
    const data = await response.json();
    return data;
}

export async function patchAngler(anglerData: IAngler) {
    const response = await fetch(`${BASE_URL}${FISCHSTATS_URL[1]}/${anglerData.id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(anglerData),
    });
    const data = await response.json();
    return data;
}

export async function fetchRekord() {
    const response = await fetch(`${BASE_URL}${FISCHSTATS_URL[3]}/`);
    const data = await response.json();
    return data;
}

export async function createRekord(rekordData: unknown) {
    const response = await fetch(`${BASE_URL}${FISCHSTATS_URL[3]}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rekordData),
    });
    const data = await response.json();
    return data;
}

export async function fetchAngler() {
  const response = await fetch(`${BASE_URL}${FISCHSTATS_URL[1]}/`);
  const data = await response.json();
  return data;
}

export async function createAngler(anglerData: unknown) {
  const response = await fetch(`${BASE_URL}${FISCHSTATS_URL[1]}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(anglerData),
  });
  const data = await response.json();
  return data;
}

export async function deleteAngler(anglerId: number) {
    const response = await fetch(`${BASE_URL}${FISCHSTATS_URL[1]}/${anglerId}/`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}

export async function deleteFish(fischId: number) {
    const response = await fetch(`${BASE_URL}${FISCHSTATS_URL[2]}/${fischId}/`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}