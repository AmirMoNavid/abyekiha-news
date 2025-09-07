import path from 'path';
import { paths } from '../config/Paths.js';
import { bytesToMb } from "./byteToMb.js";

/** @NOTICE If no allowedTypes set, the destinationPath & allowedTypes will be set dynamically */
export const fileUploadHandler = async ({ file, allowedTypes, maxFileSize, destinationPath }) => {
    if(!file) return null;

    const fileSize = file?.data?.length;

    const VIDEOS_ALLOWED_TYPES = ['.mp4'];
    const IMAGES_ALLOWED_TYPES = ['.jpg', '.jpeg', '.png'];

    const ext = path.extname(file?.name).toLowerCase();

    try {
        switch (allowedTypes) {
            case "images":
                allowedTypes = IMAGES_ALLOWED_TYPES;
                break;
            case "videos":
                allowedTypes = VIDEOS_ALLOWED_TYPES;
                break;
            default:
                if(IMAGES_ALLOWED_TYPES.includes(ext)) {
                    destinationPath = '/images'
                    allowedTypes = IMAGES_ALLOWED_TYPES
                } 
                else if(VIDEOS_ALLOWED_TYPES.includes(ext)) {
                    destinationPath = '/videos'
                    allowedTypes = VIDEOS_ALLOWED_TYPES
                }
        }

        if (!allowedTypes.includes(ext)) {
            throw new Error(`نوع فایل مجاز نیست. فرمت‌های مجاز: ${allowedTypes.join(', ')}`);
        }

        if (fileSize > maxFileSize) {
            throw new Error(`حجم فایل نباید بیشتر از ${bytesToMb(maxFileSize)} مگابایت باشد.`);
        }

        const dateNow = Date.now();
        const fileName = `${dateNow}${ext}`;
        const filePath = path.join(paths.publicDir, destinationPath, fileName);

        await file.mv(filePath);

        return `/api/uploads${destinationPath}/${fileName}`;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};