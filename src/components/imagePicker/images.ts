import prisma from "../../../prisma/client";

export const images = [
  { url: "/assets/images/imagePicker/image1.png" },
  { url: "/assets/images/imagePicker/image2.png" },
  { url: "/assets/images/imagePicker/image3.png" },
  { url: "/assets/images/imagePicker/image4.png" },
  { url: "/assets/images/imagePicker/image5.png" },
  { url: "/assets/images/imagePicker/image6.png" },
  { url: "/assets/images/imagePicker/image7.png" },
  { url: "/assets/images/imagePicker/image8.png" },
  { url: "/assets/images/imagePicker/image9.png" },
  { url: "/assets/images/imagePicker/image10.png" },
  { url: "/assets/images/imagePicker/image11.png" },
  { url: "/assets/images/imagePicker/image12.png" },
  { url: "/assets/images/imagePicker/image13.png" },
  { url: "/assets/images/imagePicker/image14.png" },
  { url: "/assets/images/imagePicker/image15.png" },
  { url: "/assets/images/imagePicker/image16.png" },
  { url: "/assets/images/imagePicker/image17.png" },
  { url: "/assets/images/imagePicker/image18.png" },
  { url: "/assets/images/imagePicker/image19.png" },
  { url: "/assets/images/imagePicker/image20.png" },
  { url: "/assets/images/imagePicker/image21.png" },
  { url: "/assets/images/imagePicker/image22.png" },
  { url: "/assets/images/imagePicker/image23.png" },
  { url: "/assets/images/imagePicker/image24.png" },
];

export async function getAllImages() {
  try {
    const allImages = await prisma.imageType.findMany();

    return allImages;
  } catch (error) {
    console.log(error);
  }
}

export async function filteredImages(chipType: string, searchInput: string) {
  try {
    const imageDetails = await prisma.imageType.findMany({
      where: {
        imageChipType: chipType,
        imageUrl: { contains: searchInput, mode: "insensitive" },
      },
    });

    return imageDetails;
  } catch (error) {
    console.log(error);
  }
}
// export async function genre() {
//   const imageType = await prisma.imageType.findMany();
//   return imageType;
// }

// console.log(genre);
