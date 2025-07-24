import WineDetailModalWrapper from "@/app/components/admin/wines/detail/wine-detail-modal-wrapper";
import WineDetailModalSkeleton from "@/app/components/admin/wines/detail/wine-detail-modal-skeleton";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  console.log("confusion")

  return (
    <Suspense fallback={<WineDetailModalSkeleton />}>
      <WineDetailModalWrapper params={params} />
    </Suspense>
    
  )
}
