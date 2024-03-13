import {useState}from 'react'
import './upload.css'
import axios from 'axios'
const Upload = () => {

    const [image ,setImage] = useState('')
    const [predictionResult, setPredictionResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const value =
          e.target.type === "checkbox"
            ? (e.target.value = e.target.checked
                ? e.target.name.toUpperCase()
                : "N/A")
            : e.target.type === "file"
            ? e.target.files[0]
            : e.target.value;
        setImage( value);
      };

      const handleClick = async() =>{
        setPredictionResult(null)
        if (!image) {
            alert('Please select an image file.');
            return;
          }
      
          const reader = new FileReader();
      
          reader.onload = function(event) {
            const imageData = event.target.result;
            setLoading(true);
            // Send the binary image data using Axios
          axios.post('https://dermadetect1-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/204238e1-544e-488d-b535-8fcdc25860bb/classify/iterations/DermaDetectIteration2/image', imageData, {
              headers: {
                'Prediction-Key': 'ddaf23f01aa040caafad63b3840c60a6',
                'Content-Type': 'application/octet-stream'
              }
            })
            .then((response) => {
              console.log('Response:', response.data);
              predict(response?.data?.predictions)
            })
            .catch((error) => {
              console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
              });
          };
      
          reader.onerror = function(event) {
            console.error('Error reading the file:', event.target.error);
          };
      
          reader.readAsArrayBuffer(image);
      }

      const predict = (data)=>{
        let bestTag ;
        let highestProbability = 0;
        
        // Iterate through each prediction
        data?.forEach(prediction => {
            // Check if the current prediction has a higher probability than the current highest probability
            if (prediction.probability > highestProbability) {
                // If so, update the best tag and highest probability
                bestTag = prediction.tagName;
                highestProbability = prediction.probability;
                console.log(bestTag,highestProbability)
                setPredictionResult(bestTag)
            }
        });
      }
    
  return (
    <><><div className="drug-photo">
          {image ? (
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
              // value={drugDetails.picture}
              onChange={handleChange} />
      </div>

          <button className="button" onClick={handleClick}>Classify</button></><div>
          { loading && <p>Loading...</p>}

              {predictionResult && (
                  <div>
                      <h2>Prediction Result</h2>
                      <p className='prediction'>{predictionResult}</p>
                  </div>
              )}
          </div>
          
          </>

  )
}

export default Upload