import { getWineImageUrls, getWineData } from "@/app/lib/admin/wines/actions";
import WineDetailModal from "@/app/components/admin/wines/wine-detail-modal";
import { getWine } from "@/app/lib/dal/wines";
import { getImage } from "@/app/lib/dal/common";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const wine = (await getWine(id))!

  const images = {
    front: wine.image_url ? await getImage(wine.image_url) : null,
    back: wine.back_image_url ? await getImage(wine.back_image_url) : null
  }

  return <WineDetailModal wine={wine} images={images} />
}
