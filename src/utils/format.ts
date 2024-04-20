export function fileToBase64(file: File): Promise<string> {
  console.log("fileToBase64", file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      console.log("base64string", base64String);
      resolve(base64String.split(",")[1]); // Remove data url prefix
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
