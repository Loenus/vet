export default defineEventHandler(async (event) => {
  const { lat, lng, radius } = getQuery(event) as { lat: string; lng: string; radius: string };

  const query = `
    [out:json];
    node[shop=pet]["name"="Arcaplanet"](around:${radius},${lat},${lng});
    out;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Definiamo un tipo per gli elementi ricevuti
    type OverpassElement = {
      lat: number;
      lon: number;
      tags?: { name?: string };
    };

    return data.elements.map((el: OverpassElement) => ({
      lat: el.lat,
      lng: el.lon,
      name: el.tags?.name || "Negozio sconosciuto",
    }));
  } catch (error) {
    return { error: "Errore nel recupero dati" };
  }
});
