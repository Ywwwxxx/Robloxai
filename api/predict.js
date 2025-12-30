import * as tf from '@tensorflow/tfjs';

// Modeli model klasöründen yükle
const modelPromise = tf.loadLayersModel('file://./model/model.json');

export default async function handler(req, res) {
  try {
    const inputRaw = req.query.input;
    if (!inputRaw) {
      return res.status(400).json({ error: 'input parametresi gerekli' });
    }

    const input = JSON.parse(inputRaw); // örn: [1,0,0,1]
    const model = await modelPromise;

    const tensor = tf.tensor([input]); // [batch, features]
    const pred = model.predict(tensor);

    const result = Array.from(await pred.data());
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

