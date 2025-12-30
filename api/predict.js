const tf = require('@tensorflow/tfjs-node');

// model klasörünü kök dizinde tutuyorsun
let modelPromise = tf.loadLayersModel('file://model/model.json');

export default async function handler(req, res) {
  const { input } = req.query;
  const model = await modelPromise;
  const prediction = model.predict(tf.tensor([JSON.parse(input)])).dataSync();
  res.status(200).json({ result: prediction });
}