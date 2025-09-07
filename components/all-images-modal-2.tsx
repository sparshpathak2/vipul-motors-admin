'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { LoaderCircle, Pencil, Trash, Upload } from 'lucide-react'
import { Button } from './ui/button';
import { deleteImage, uploadImage } from '@/services/media';
import { TrueValueModel } from './data-table-true-value';
import { getTruevalueModel } from '@/services/truevalue';

interface BannerImageDialogProps {
    images: { id: string; url: string; alt?: string | null }[];
    model: TrueValueModel | null;
    setModel: React.Dispatch<React.SetStateAction<TrueValueModel | null>>;
    screen?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (imageId: string) => void;
    getAllImages: () => void;
}

export default function AllImagesModal({
    images,
    onSelect,
    model,
    setModel,
    open,
    onOpenChange,
    getAllImages,
}: BannerImageDialogProps) {

    const [selected, setSelected] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    // 👇 Sync initial selection whenever dialog opens
    // useEffect(() => {
    //     if (open) {
    //         setSelected(currentImageId ?? null);
    //     }
    // }, [open, currentImageId]);
    // useEffect(() => {
    //     const fetchTruevalueModel = async () => {
    //         try {
    //             if (!model?.id) return;
    //             const response = await getTruevalueModel(model?.id);
    //             setModel(response.data);
    //         } catch (error) {
    //             console.error('Failed to fetch queries', error);
    //         }
    //     };
    //     fetchTruevalueModel();
    // }, []);

    useEffect(() => {
        const fetchTruevalueModel = async () => {
            try {
                if (!model?.id) return;
                const response = await getTruevalueModel(model?.id);
                setModel(response.data);
                setSelected(model?.imageId ?? null);
            } catch (error) {
                console.error('Failed to fetch queries', error);
            }
        };
        fetchTruevalueModel();
    }, [open]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            const uploaded = await uploadImage(formData);
            console.log("Uploaded image:", uploaded);

            // ✅ trigger parent refresh
            // onUploadSuccess();
            getAllImages();
            // you can now call createBanner with uploaded.imageId if needed
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
            e.target.value = ""; // reset input for same file re-upload
        }
    };

    const handleDelete = async () => {
        try {
            if (!selected) return;
            await deleteImage(selected);
            getAllImages(); // refresh the list or state after delete
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                {/* <Dialog> */}
                <DialogTrigger asChild>
                    <button className="p-1 rounded-sm border border-gray-400 bg-white hover:cursor-pointer">
                        <Pencil size={14} className="text-gray-600" />
                    </button>
                </DialogTrigger>
                <DialogContent className="lg:min-w-4xl w-full top-[80px] translate-y-0">
                    <DialogHeader>
                        <DialogTitle>All Images</DialogTitle>

                        {/* Image selection list */}
                        <div className="overflow-y-auto max-h-[calc(100vh-240px)] sm:max-h-[calc(100vh-400px)]">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                                {images.map((img) => (
                                    <div
                                        key={img.id}
                                        onClick={() => setSelected(img.id)}
                                        className={`relative overflow-hidden cursor-pointer border-3 transition 
                                            ${selected === img.id ? "border-blue-500" : "border-slate-200"}`}
                                    >
                                        {/* Image */}
                                        <img
                                            src={img.url}
                                            alt={img.alt ?? "Image"}
                                            title={img.alt || "No name available"}
                                            className="w-full h-36 object-cover"
                                        />

                                        {/* Trash icon overlay */}
                                        {selected === img.id && (
                                            <button
                                                onClick={handleDelete}
                                                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md border-1 border-red-500 hover:bg-red-100"
                                            >
                                                <Trash className="w-4 h-4 text-red-500" />
                                            </button>
                                        )}
                                    </div>

                                ))}
                            </div>
                        </div>

                        <div className="flex w-full justify-between gap-2 mt-2">
                            {/* Hidden file input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="flex items-center gap-2"
                                variant="outline"
                            >
                                {uploading ? (
                                    <>
                                        <LoaderCircle className="w-4 h-4 animate-spin" />
                                        Uploading
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4" />
                                        Upload
                                    </>
                                )}
                            </Button>
                            <div className='flex gap-2'>
                                <DialogClose asChild>
                                    <Button variant="ghost">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button
                                        onClick={() => selected && onSelect(selected)}
                                        disabled={!selected}
                                    >
                                        Select
                                    </Button>
                                </DialogClose>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div >
    )
}
