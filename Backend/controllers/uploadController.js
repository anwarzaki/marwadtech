export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No image uploaded"
    });
  }

  res.status(200).json({
    message: "Image uploaded successfully",
    filePath: `/uploads/${req.file.filename}`
  });
};
