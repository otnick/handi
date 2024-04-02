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

export async function createFisch(fischData: unknown) {
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