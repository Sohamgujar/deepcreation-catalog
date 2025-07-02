// admin.js

const db = firebase.database();

function addProduct() {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const imageFile = document.getElementById("productImage").files[0];

  if (!name || !price || !imageFile) {
    alert("Please fill all fields.");
    return;
  }

  const cloudName = "drs4hyvrp"; // ✅ Your Cloudinary cloud name
  const uploadPreset = "deepcreationcatalog"; // ✅ Your unsigned upload preset

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", uploadPreset);

  const uploadURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  axios.post(uploadURL, formData)
    .then(response => {
      const imageUrl = response.data.secure_url;

      const id = Date.now().toString();
      db.ref("products/" + id).set({
        id,
        name,
        price,
        image: imageUrl
      });

      alert("✅ Product added successfully!");
      document.getElementById("productName").value = "";
      document.getElementById("productPrice").value = "";
      document.getElementById("productImage").value = "";
    })
    .catch(error => {
      console.error("❌ Upload failed:", error);
      if (error.response) {
        console.error("⛔ Cloudinary error:", error.response.data.error.message);
      }
      alert("Image upload failed. Check console.");
    });
}
