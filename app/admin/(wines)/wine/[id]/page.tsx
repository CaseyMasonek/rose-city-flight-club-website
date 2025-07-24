import WineDetailsWrapper from "@/app/components/admin/wines/detail/wine-details-wrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <WineDetailsWrapper params={params} />
}
