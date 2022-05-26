import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
// import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json' // One way to import fonts but we're not gonna use this
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// scene.background = new THREE.Color( "rgb(41, 41, 41)" )

//! Axes Helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture1 = textureLoader.load('/textures/matcaps/5.png') // for text
const matcapTexture4 = textureLoader.load('/textures/matcaps/WaterDropletsMixedBubbled001_Sphere.jpg') // for donuts

// Background 
const backgroundTexture = textureLoader.load('/textures/galaxy.jpg')
scene.background = backgroundTexture

/**
 * Fonts
 */
const text = ['Donuts', 'are just', 'bagels', 'with sugar']
//create a group
const textGroup = new THREE.Group()
// textGroup.scale.y = 0.3
scene.add(textGroup)

const fontLoader = new FontLoader()
fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry1 = new TextGeometry(text[0], {
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 3
        })
        const textGeometry2 = new TextGeometry(text[1], {
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 3
        })
        const textGeometry3 = new TextGeometry(text[2], {
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 3
        })
        const textGeometry4 = new TextGeometry(text[3], {
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 3
        })
        textGeometry1.center()
        textGeometry2.center()
        textGeometry3.center()
        textGeometry4.center()
        
        const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture1})
        const textObject1 =new THREE.Mesh(textGeometry1, textMaterial)
        textObject1.position.y = 1.2
        const textObject2 =new THREE.Mesh(textGeometry2, textMaterial)
        textObject2.position.y = .6
        const textObject3 =new THREE.Mesh(textGeometry3, textMaterial)
        textObject3.position.y = 0
        const textObject4 =new THREE.Mesh(textGeometry4, textMaterial)
        textObject4.position.y = -.6
        textGroup.add(textObject1, textObject2, textObject3, textObject4)

        //! Center the textGeometry
        // by default, three.js is using sphere bounding. we are changing it to box bounding. 
        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     // exclude the bevel difference
        //     - (textGeometry.boundingBox.max.x - 0.02) / 2,
        //     - (textGeometry.boundingBox.max.y - 0.02) / 2,
        //     - (textGeometry.boundingBox.max.z - 0.03) / 2,
        // )
        
        //! A proper alternative
        // textGeometry.center()

        // const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture1})
        // textMaterial.wireframe = true
        // const text =new THREE.Mesh(textGeometry, textMaterial)
        // scene.add(text)


        //! Creating 100 Donuts
        // const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 32)
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 32)
        const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture4})

        for (let i = 0; i < 100; i++) {
            const donut = new THREE.Mesh(donutGeometry, donutMaterial)
            
            
            donut.position.x = (Math.random() - 0.5) * 10 // range from -5 ~ 5
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }

    }
)

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2
camera.position.y = 1
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

//! Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = e.clientY / sizes.height - 0.5
})

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    //! Update camera based on cursor position
    // camera.position.x = cursor.x * 10
    // camera.position.y = -cursor.y * 10
    // camera.position.x = Math.sin(elapsedTime * Math.PI) * 3
    // camera.position.z = Math.cos(elapsedTime * Math.PI) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(text.position)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()