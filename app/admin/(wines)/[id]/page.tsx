import WineDetailsWrapper from "@/app/components/admin/wines/detail/wine-details-wrapper";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <WineDetailsWrapper params={params} />
}
