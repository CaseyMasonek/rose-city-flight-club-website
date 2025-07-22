import { getColumn } from "@/app/lib/dal/dynamic";
import { uniqueStrings } from "@/app/lib/utils";
import { wineFormOptions } from "@/app/lib/types/form-options";

export async function getWineFormOptions(): Promise<wineFormOptions> {
  const tags = (await getColumn('wines', 'tags')).map((tagList: string) => JSON.parse(tagList));
  const uniqueTags = uniqueStrings(tags);

  const varietals = (await getColumn('wines', 'varietals')).map((varietalList: string) => JSON.parse(varietalList));
  const uniqueVarietals = uniqueStrings(varietals);

  const vintages = Array.from({ length: 100 }, (_, i) => (2025 - i).toString())
  
  return {
    name: await getColumn('wines', 'name'),
    vintage: ["NV", ...vintages],
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
    inventory_status: ["In Stock", "Out of Stock", "Archived", "TBD", "On Order"],
    tags: uniqueTags,
    wholesale_cost: [],
    retail_cost: [],
  };
}