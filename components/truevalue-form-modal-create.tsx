'use client'

import { Controller, useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
// import {
//     Select,
//     SelectTrigger,
//     SelectContent,
//     SelectItem,
//     SelectValue,
// } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createTruevalueModel, getAllTruevalueModels, getTruevalueModel, updateTruevalueModel } from "@/services/truevalue";
import AllImagesModal from "./all-images-modal-2";
import { getImages } from "@/services/media";
import { ImageOff } from "lucide-react";
import { TrueValueModel } from "./data-table-true-value";
// import { Textarea } from "./ui/textarea";

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    model?: TrueValueModel | null;
    setModel: React.Dispatch<React.SetStateAction<TrueValueModel | null>>;
    setTruevalueModels: React.Dispatch<React.SetStateAction<TrueValueModel[]>>;
}

type FormData = {
    modelName: string;
    description?: string | null;
    make?: string | null;
    year?: number | null;
    variant?: string | null;
    color?: string | null;
    imageId?: string | null;
};

export type Image = {
    id: string;
    url: string;
    alt?: string;
    createdAt: string;
}

export default function TruevalueFormModal({ isOpen, onClose, model, setModel, setTruevalueModels }: FormModalProps) {

    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<Image[]>([]);
    const [image, setImage] = useState<Image>();
    const [activeModelId, setActiveModelId] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm<FormData>();

    // ✅ fetchImages is now reusable
    const fetchImages = async () => {
        try {
            const response = await getImages()
            setImages(response.data)
        } catch (error) {
            console.error("Failed to fetch images", error)
        }
    }

    useEffect(() => {
        fetchImages()
    }, [])


    // clear form when modal closes
    // useEffect(() => {
    //     if (!isOpen) {
    //         reset(defaultValues);
    //         setImage(undefined);
    //     }
    // }, [isOpen, reset]);


    const handleSelectImage = (selected: string) => {
        if (!selected) return;
        setValue("imageId", selected, { shouldValidate: true });
        const selectedImage = images.find(img => img.id === selected);
        setImage(selectedImage ?? undefined);
    };


    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            if (model?.id) {
                await updateTruevalueModel(model.id, data);
                toast.success("Model updated successfully!");
            } else {
                await createTruevalueModel(data);
                toast.success("Model created successfully!");
            }
            // refetch updated list
            const response = await getAllTruevalueModels();
            setTruevalueModels(response.data);

            // reset(defaultValues);
            reset();
            setImage(undefined);
            setModel(null);
            onClose();
        } catch (error) {
            console.error("Failed to submit:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        // reset(defaultValues);
        // setImage(undefined);
        onClose();
    };


    return (
        // <Dialog open={isOpen} onOpenChange={onClose}>
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>True Value Form</DialogTitle>
                    <DialogDescription>
                        Fill the true value car model details
                    </DialogDescription>
                </DialogHeader>

                <form key={model?.id ?? "new"} onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
                    <div className="px-1 overflow-y-auto max-h-[calc(100vh-240px)] sm:max-h-[calc(100vh-360px)]">

                        {/* Name */}
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="modelName">Model Name *</Label>
                            <Input
                                id="modelName"
                                {...register("modelName", { required: "Model name is required" })}
                            />
                            {errors.modelName && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.modelName.message as string}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.description.message as string}
                                </p>
                            )}
                        </div>

                        {/* Make */}
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="make">Make *</Label>
                            <Input
                                id="make"
                                {...register("make", { required: "Make is required" })}
                            />
                            {errors.make && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.make.message as string}
                                </p>
                            )}
                        </div>

                        {/* Year */}
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="year">Year *</Label>
                            <Input
                                id="year"
                                {...register("year", { required: "Year is required" })}
                            />
                            {errors.year && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.year.message as string}
                                </p>
                            )}
                        </div>

                        {/* Variant */}
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="variant">Variant *</Label>
                            <Input
                                id="variant"
                                {...register("variant", { required: "Variant is required" })}
                            />
                            {errors.variant && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.variant.message as string}
                                </p>
                            )}
                        </div>

                        {/* Color */}
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="color">Color *</Label>
                            <Input
                                id="color"
                                {...register("color", { required: "Color is required" })}
                            />
                            {errors.color && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.color.message as string}
                                </p>
                            )}
                        </div>

                        <div className="relative border rounded-sm overflow-hidden">
                            {/* Top strip */}
                            <div className="absolute top-0 left-0 right-0 bg-white flex justify-between p-2">
                                {/* <div className="flex items-center justify-center w-6 h-6 border border-gray-400 rounded-full text-sm font-medium"> */}
                                {/* <div className="flex items-center justify-center border border-gray-400 rounded-sm text-xs font-medium px-2">
                                D-{banner.order ?? index + 1}
                            </div> */}

                                <AllImagesModal
                                    images={images}
                                    model={model || null}
                                    setModel={setModel}
                                    open={activeModelId === (model?.id || "new")}
                                    onOpenChange={(isOpen) => setActiveModelId(isOpen ? (model?.id || "new") : null)}
                                    onSelect={handleSelectImage}
                                    getAllImages={fetchImages}
                                />
                            </div>

                            {/* Image OR Icon */}
                            {image?.url ? (
                                <img
                                    src={image.url}
                                    alt={image?.alt}
                                    className="w-full h-54 object-cover"
                                />
                            ) : (
                                <div className="w-full h-54 flex items-center justify-center bg-gray-100">
                                    <ImageOff className="w-12 h-12 text-gray-400" />
                                </div>
                            )}
                        </div>
                        {/* Hidden field for imageId */}
                        <input type="hidden" {...register("imageId")} />

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                        {/* <Button variant="outline" type="button" onClick={onClose}> */}
                        <Button variant="outline" type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog >
    );
}
