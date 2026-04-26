declare module 'multer-storage-cloudinary' {
  import { StorageEngine } from 'multer';

  interface CloudinaryStorageOptions {
    cloudinary: any;
    folder?: string | ((req: any, file: any, cb: (err: any, folder: string) => void) => void);
    allowed_formats?: string[];
    public_id?: (req: any, file: any) => string;
    filename?: (req: any, file: any, cb: (err: any, filename: string) => void) => void;
    transformation?: any;
    format?: string | ((req: any, file: any, cb: (err: any, format: string) => void) => void);
    type?: string | ((req: any, file: any, cb: (err: any, type: string) => void) => void);
  }

  function CloudinaryStorage(options: CloudinaryStorageOptions): StorageEngine;
  export = CloudinaryStorage;
}
