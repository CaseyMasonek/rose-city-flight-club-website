import {getWineFormOptions} from "@/app/lib/admin/wines/form-options-util";
import WineForm from "@/app/components/admin/wines/wine-form";
import { Wine } from "@/app/lib/types/wines";

export default async function WineFormWrapper({data}: {data?: Wine}) {
    const options = await getWineFormOptions()

    return <WineForm options={options} data={data} />
}