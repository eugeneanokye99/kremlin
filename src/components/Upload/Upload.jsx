import { useState } from "react";
import axios from "axios";
import "./upload.css"; // Import your CSS file
import { toast, Toaster } from "react-hot-toast";
const Upload = () => {
	const [image, setImage] = useState("");
	const [predictionResult, setPredictionResult] = useState(null);
	// const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const value =
			e.target.type === "checkbox"
				? e.target.value
				: e.target.type === "file"
				? e.target.files[0]
				: e.target.value;
		setImage(value);
	};

	const handleClick = async () => {
		setPredictionResult(null);
		if (!image) {
      toast.error('Please select an image file.')
			return;
		}

		const reader = new FileReader();

		reader.onload = function (event) {
			const imageData = event.target.result;
			// setLoading(true);
			const load = toast.loading("Predicting...");
			// Send the binary image data using Axios
			axios
				.post(
					"https://dermadetect1-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/e32ce188-a6ce-4009-8697-0939a356e56a/classify/iterations/Iteration1/image",
					imageData,
					{
						headers: {
							"Prediction-Key": "ddaf23f01aa040caafad63b3840c60a6",
							"Content-Type": "application/octet-stream",
						},
					}
				)
				.then((response) => {
					toast.dismiss(load);
					toast.success("Success");
					console.log("Response:", response.data);
					predict(response?.data?.predictions);
				})
				.catch((error) => {
					toast.dismiss(load);

					toast.error("An error occured");
					console.error("Error:", error);
				})
				.finally(() => {
					toast.dismiss(load);
					// setLoading(false);
				});
		};

		reader.onerror = function (event) {
			console.error("Error reading the file:", event.target.error);
		};

		reader.readAsArrayBuffer(image);
	};

	const handleClearImage = () => {
		setImage(null);
		setPredictionResult(null);
	};

	const predict = (data) => {
		let bestTag;
		let highestProbability = 0;

		// Iterate through each prediction
		data?.forEach((prediction) => {
			// Check if the current prediction has a higher probability than the current highest probability
			if (prediction.probability > highestProbability) {
				// If so, update the best tag and highest probability
				bestTag = prediction.tagName;
				highestProbability = prediction.probability;
				console.log(bestTag, highestProbability);
				setPredictionResult(bestTag);
			}
		});
	};

	return (
			<>
      <Toaster />
      <h1 className="legend"> Kremlin Skin Cancer Detector</h1>
      <div className="background">
      <div className="drug-photo">
        {image ? (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="img-fluid h-100 w-100"
              style={{
                aspectRatio: "3 / 2",
                objectFit: "contain",
                mixBlendMode: "darken",
                pointerEvents: "none",
              }} />
            <button className="clear-button" onClick={handleClearImage}>
              Clear
            </button>
          </>
        ) : (
          <p className="small file_name">
            Drag and drop or click here to select image
          </p>
        )}
        <input
          type="file"
          className="drug_file"
          accept="image/*"
          name="picture"
          onChange={handleChange} />
      </div>
      <div className="container">
        <button className="button" onClick={handleClick}>
          Classify
        </button>

        {/* {loading && <p>Loading...</p>} */}

        {predictionResult && (
          <div className="prediction-container">
            <h2>Prediction Result:</h2>
            <p className="prediction">
              {predictionResult
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </p>
          </div>
        )}
      </div>
    </div></>
	);
};

export default Upload;
