import React from 'react'
import { TrueValueModel } from './data-table-true-value';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    model?: TrueValueModel | null;
    handleTrueValueModelDelete: (id?: string) => Promise<void>;
}

export function ConfirmDeleteModelDialog({ isOpen, onClose, model, handleTrueValueModelDelete }: Props) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            {/* <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Do you really want to delete?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Once deleted this action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-red-600 hover:bg-red-500 text-white' onClick={() => handleTrueValueModelDelete(model?.id)}>
                        Delete
                        <Trash className="h-4 w-4 text-white" />
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

