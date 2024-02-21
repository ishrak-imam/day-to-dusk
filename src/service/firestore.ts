import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export async function upload(file: File, url: string) {
  const storageRef = ref(storage, url);
  const result = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return {
    metadata: {
      bucket: result.metadata.bucket,
      name: result.metadata.name,
      downloadURL,
    },
  };
}
