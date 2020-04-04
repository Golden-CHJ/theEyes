
import * as tf from '@tensorflow/tfjs'
import { img2x, file2img } from './utils'

const MODEL_PATH = 'http://127.0.0.1:8081'
const BRAND_CLASSES = ['O', 'R']

var fun = {
  load: async function loadModel (file) {
    const mobilenet = await tf.loadLayersModel(MODEL_PATH + '/mobilenet/web_model/model.json')
    mobilenet.summary()
    const layer = mobilenet.getLayer('conv_pw_13_relu')
    const truncatedMobilenet = tf.model({
      inputs: mobilenet.inputs,
      outputs: layer.output
    })

    console.log(1)
    const model = await tf.loadLayersModel(MODEL_PATH + '/mobilenet/web_model/model1.json')
    console.log(2)

    console.log(file.url)
    const img = await file2img(file)
    console.log(4)
    document.body.appendChild(img)
    const pred = tf.tidy(() => {
      console.log(5)
      const x = img2x(img)
      const input = truncatedMobilenet.predict(x)
      return model.predict(input)
    })
    console.log(6)
    const index = pred.argMax(1).dataSync()[0]
    setTimeout(() => {
      alert(`预测结果：${BRAND_CLASSES[index]}`)
    }, 0)
  }
}
export default fun
