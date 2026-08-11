import { useState } from "react";
import { router } from "@inertiajs/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, X } from "lucide-react";

export default function CancelOrderDialog({ orderId, disabled}: { orderId: number, disabled: boolean | 'true' | 'false' }) {
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        setLoading(true);

        router.post(
            `/user/orders/${orderId}/cancel`,
            { reason },
            {
                onSuccess: () => {
                    setOpen(false);
                    setReason("");
                    setLoading(false);
                },
                onError: () => {
                    setLoading(false);
                }
            }
        );
    };

    return (
        <div className="rounded-x m-4 shadow-md">
            {/* BUTTON TO OPEN DIALOG */}
            <Button 
                variant="destructive"
                onClick={() => setOpen(true)}
                disabled={disabled === 'true'}
                className="rounded-xl cursor-pointer flex items-center gap-2"
            >
                <X className="h-4 w-4" />
                Cancel Order
            </Button>

            {/* DIALOG */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md bg-gray-600">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-500">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            Cancel Order
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3">
                        <p className="text-center text-gray-100">
                            Are you sure you want to cancel this order?  
                        
                        </p>

                        {/* <Textarea
                            placeholder="Write your cancellation reason..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="min-h-[100px]"
                        /> */}
                    </div>

                    <DialogFooter className="mt-4 flex justify-between">
                        <Button 
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="cursor-pointer"
                        >
                            Close
                        </Button>

                        <Button 
                            variant="destructive"
                            onClick={handleCancel}
                            disabled={loading}
                            className="cursor-pointer"
                        >
                            {loading ? "Cancelling..." : "Submit Cancellation"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
