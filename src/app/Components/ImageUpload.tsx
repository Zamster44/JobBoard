'use client';
import { Button } from "@radix-ui/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEnvelope, faMobile, faPerson, faPhone, faStar, faUser, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useRef, useState , useEffect } from "react";
import {v4} from "uuid"
import {
    ref,
    uploadBytesResumable,
    UploadTaskSnapshot,
    listAll,
    getDownloadURL
} from "firebase/storage"
import { storage } from "./firebase";
import { error } from "console";

export default function ImageUpload({icon}: {icon:IconDefinition}) {
    const fileInRef = useRef<HTMLInputElement>(null)
    const [imageList , setImageList] = useState<string[]>([]);
    const imageListRef = ref(storage , '/images')
    const [url , setUrl] = useState<string | null>(null);

    function upload(e: ChangeEvent<HTMLInputElement>){
        const input = e.target as HTMLInputElement;
        if(input && input.files?.length  &&  input.files.length  > 0){
            handleUpload(input.files[0]);
        }
    }

    function handleUpload(image : File){
        if(image){
            const storageRef = ref(storage , `images/${image.name + v4() }`)

            const uploadTask = uploadBytesResumable(storageRef , image)

            uploadTask.on(
                "state_changed",
                (snapshot: UploadTaskSnapshot) =>{
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
                }
            )
        }
    }

    useEffect(() => {
        listAll(imageListRef).then.((response) => {
            response.item.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev , url])
                })
            })
        })
    }, [])

    return (
        <>
            <div className="bg-gray-100 rounded-md size-24 inline-flex items-center justify-center">
                {}
                <FontAwesomeIcon icon={icon} className="text-gray-400" />
            </div>
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