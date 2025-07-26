import WineDetails from "./wine-details";
import { getWine } from "@/lib/dal/wines";
import { getImage } from "@/lib/dal/common";

export default async function WineDetailsWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const wine = (await getWine(id))!;

  const images = {
    front: wine.image_url ? await getImage(wine.image_url) : null,
    back: wine.back_image_url ? await getImage(wine.back_image_url) : null,
  };

  return <WineDetails wine={wine} images={images} />;
}
