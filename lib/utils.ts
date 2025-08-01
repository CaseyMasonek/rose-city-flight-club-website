import { PixelCrop } from "react-image-crop";

export function titleCase(s:string) {
    return s.toLowerCase()
        .replaceAll(/_/g," ")
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export function uniqueStrings(arrays: string[][]): string[] {
    const flat = arrays.flat(); // Flatten into one array
    const unique = new Set(flat); // Use Set to deduplicate
    return Array.from(unique); // Convert Set back to array
}

export const urlToObject = async(image:string) => {
  const response = await fetch(image);
  const blob = await response.blob();
  const file = new File([blob], 'image.jpg', {type: blob.type});
  
  console.log(file)

  return file
}

export function getCroppedImg(
  image: HTMLImageElement,
  crop: PixelCrop,
): Promise<File> {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width * 10;
  canvas.height = crop.height * 10;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No 2D context');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * 10,
    crop.height * 10,
  );

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error('Canvas is empty'));
        const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
        resolve(file);
      },
      'image/jpeg',
      1,
    );
  });
}
