import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

interface CommonsDialogProps {
  dialogTrigger: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
  dialogContent?: React.ReactNode;
}

export const DialogModal = ({
  dialogTrigger,
  dialogTitle,
  dialogDescription,
  dialogContent,
}: CommonsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>

      <DialogContent>
        {(dialogTitle || dialogDescription) && (
          <DialogHeader>
            {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
            {dialogDescription && (
              <DialogDescription>{dialogDescription}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {dialogContent}
      </DialogContent>
    </Dialog>
  );
};
