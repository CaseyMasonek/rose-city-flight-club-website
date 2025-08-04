import { getColumn } from "@/lib/dal/dynamic";
import { uniqueStrings } from "@/lib/utils";
import { wineFormOptions } from "@/lib/types/form-options";

export async function getWineFormOptions(): Promise<wineFormOptions> {
  const tags = (await getColumn('wines', 'tags')).map((tagList: string) => JSON.parse(tagList));
  const uniqueTags = uniqueStrings(tags).sort();

  const varietals = (await getColumn('wines', 'varietals')).map((varietalList: string) => JSON.parse(varietalList));
  const uniqueVarietals = uniqueStrings(varietals);

  return {
    name: await getColumn('wines', 'name'),
    vintage: Array.from({ length: 100 }, (_, i) => (2025 - i).toString()).concat("NV"),
    type: ["White", "Red", "Rosé", "Sparkling", "Dessert", "Fortified", "Other"],
    producer: await getColumn('wines', 'producer'),
    varietals: uniqueVarietals,
    designation: await getColumn('wines', 'designation'),
    vineyard: await getColumn('wines', 'vineyard'),
    country: await getColumn('wines', 'country'),
    region: await getColumn('wines', 'region'),
    subregion: await getColumn('wines', 'subregion'),
    appellation: await getColumn('wines', 'appellation'),
    distributor: await getColumn('wines', 'distributor'),
    inventory_status: ["On Order", "In Stock", "Sold Out", "Archived", "TBD"],
    tags: uniqueTags,
    wholesale_cost: [],
    retail_cost: [],
  };
}