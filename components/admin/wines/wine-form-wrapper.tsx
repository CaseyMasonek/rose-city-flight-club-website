import {getWineFormOptions} from "@/lib/admin/wines/form-options-util";
import WineForm from "@/components/admin/wines/wine-form";
import { Wine } from "@/lib/types/wines";

export default async function WineFormWrapper({data}: {data?: Wine}) {
    const options = await getWineFormOptions()

    return <WineForm options={options} data={data} />
}