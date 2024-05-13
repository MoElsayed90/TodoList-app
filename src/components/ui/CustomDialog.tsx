
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./dialog"
import Button from "./Button";

const CustomDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger  asChild>
          <Button variant={"default"} size={"sm"} className="w-1/3">Edit </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {/* <DialogHeader>
            <DialogTitle>{CustomDialogTitle}</DialogTitle>
            <DialogDescription>
              {CustomDialogDescriptiona}
            </DialogDescription> 
          </DialogHeader> */}
          {/* <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor={LabelName1} className="text-right">
                {LabelName1}
              </label>
              <Input
                id={LabelName1}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor={LabelName2} className="text-right">
                {LabelName2}
              </label>
              <Input
                id={LabelName2}
                className="col-span-3"
              />
            </div>
          </div> */}
          {/* <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CustomDialog;