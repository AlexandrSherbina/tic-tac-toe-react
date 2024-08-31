const getImages = async (
  arrImportImages: Promise<typeof import("*.jpg")>[]
) => {
  const images = await Promise.all(arrImportImages);
  return images.map((item) => item.default);
};

export default getImages;
