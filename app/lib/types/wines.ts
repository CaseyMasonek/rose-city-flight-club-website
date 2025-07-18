import {Generated} from "kysely";
import dayjs from "dayjs";

export type Wine = {
    id: string
    created_at: Date
    vintage: string
    type: string
    name: string
    producer: string
    varietals: string
    designation: string
    vineyard: string
    country: string
    region: string
    subregion: string
    appellation: string
    distributor: string
    notes: string
    inventory_status: "In Stock" | "Out of Stock" | "Archived" | "TBD"
    tags: string
    image_url: string | null
}

export type WineFormData = {
  notes: string;
  name: string;
  vintage: string;
  type: string;
  varietals: string;
  country: string;
  region: string;
  subregion: string;
  appellation: string;
  vineyard: string;
  designation: string;
  distributor: string;
  producer: string;
  inventory_status: "In Stock" | "Out of Stock" | "TBD" | "Archived";
  tags: string;
  image_url: string | null;
};
