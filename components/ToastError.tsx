import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function ToastDestructive() {
  const { toast } = useToast();

  return (
    <>
      {toast({
        variant: "destructive",
        title: "OOOOOPS! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })}
    </>
  );
}
