export const initFileName = {
  img: "init_media_url",
  face: "init_theme_url",
};
export const appendUploadImage = (img, preFix, formData, is_init = true) => {
  var fileExtension = img?.type?.split("/")
    ? img.type?.split("/")?.at(1)
    : img.name?.split(".").pop();
  var filename = `${preFix}.${fileExtension || "jpg"}`;

  formData.append(filename, img, filename);
  // console.log({
  //   uri: img.path,
  //   name: filename,
  //   filename: filename,
  //   type:  img.file.type,
  //   is_init: true
  // })
  return formData;
};
export const bodyToFormData = (body, formData) => {
  for (const key in body) {
    if (Object.hasOwnProperty.call(body, key)) {
      const element = body[key];
      formData.append(key, element);
    }
  }
  return formData;
};
export const getFilenameFromUrl = (url = "") => {
  if (!url) return null;
  const parsedUrl = new URL(url);
  const pathname = parsedUrl.pathname;
  const segments = pathname?.split("/");
  const fileName = segments[segments.length - 1];
  const dotIndex = fileName.lastIndexOf(".");
  const name = fileName.slice(0, dotIndex);
  const extension = fileName.slice(dotIndex + 1);
  return {
    extension: extension,
    name: name,
    fileName,
  };
};
export const randomSeed = () => {
  return Math.floor(Math.random() * 1000000000);
};
