import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const CreateProduct = () => {

    return (
        <div className="max-w-[336px]">
            <Label>Name</Label>
            <Input placeholder="Name of the PRoduct you are creating..." />
            <Label>Description</Label>
            <Input placeholder="Description of the pROduct....." />
            <Label>Image</Label>
            <Input placeholder="Add the image address " />

        </div>
    )
}

export default CreateProduct