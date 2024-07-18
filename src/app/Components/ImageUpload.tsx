'use client';
import { Button } from "@radix-ui/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faMobile, faPerson, faPhone, faStar, faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { v4 } from "uuid"
import {
    ref,
    uploadBytesResumable,
    UploadTaskSnapshot,
    listAll,
    getDownloadURL
} from "firebase/storage"
import { storage } from "./firebase";
import { error } from "console";
import Image from "next/image";

export default function ImageUpload({ name , icon }: { name:string , icon: IconDefinition }) {
    const fileInRef = useRef<HTMLInputElement>(null)
    const [url, setUrl] = useState<string | null>(null);
    const [loading , setLoading] = useState(false);

    function upload(e: ChangeEvent<HTMLInputElement>) {
        setLoading(true);
        const input = e.target as HTMLInputElement;
        if (input && input.files?.length && input.files.length > 0) {
            handleUpload(input.files[0]);
        }
        setLoading(false);
    }

    function handleUpload(image: File) {
        if (image) {
            console.log(loading)
            const storageRef = ref(storage, `images/${image.name + v4()}`)

            const uploadTask = uploadBytesResumable(storageRef, image)

            uploadTask.on(
                "state_changed",
                (snapshot: UploadTaskSnapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log(`progress -> ${progress}`)
                },
                error => {
                    //error function
                    console.error(error.message)
                },
                () => {
                    //complete function
                    console.log("upload is Completed")
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrl(downloadURL)
                        // You can now use the download URL for further processing, like saving it to your Firestore database
                    });
                }
            )
            
        }
    }

    

    return (
        <>
            <div className="bg-gray-100 rounded-md size-24 inline-flex items-center justify-center">
                {loading && 
                <FontAwesomeIcon icon={faSpinner} className="text-gray-400 animate-spin" />
                }
                {url ?
                    <img src={url} alt="photo"  className="size-24" />
                    :
                    <FontAwesomeIcon icon={icon} className="text-gray-400" />
                }
            </div>
            <input type="hidden" value={url} name={name} />
            <div className="mt-2">
                <input
                    type="file"
                    ref={fileInRef}
                    className="hidden"
                    onChange={upload}
                />
                <Button
                    type="button"
                    variant="soft"
                    onClick={() => fileInRef.current?.click()}
                >Select File</Button>
            </div>
        </>
    )
}