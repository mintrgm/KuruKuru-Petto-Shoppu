import React, { useEffect, useRef} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Octree } from "three/addons/math/Octree.js";
import { Capsule } from "three/addons/math/Capsule.js";
import { Howl } from "howler";
import gsap from "gsap";
import "./Home.css";

import g1 from '../assets/g1.jpeg';
import g2 from '../assets/g2.jpeg';
import g3 from '../assets/g3.jpeg';
import g4 from '../assets/g4.jpeg';
import g5 from '../assets/g5.jpeg';
import g6 from '../assets/g6.jpeg';
import g7 from '../assets/g7.jpeg';
import g8 from '../assets/g8.jpeg';
import g9 from '../assets/g9.jpeg';

const Home = () => {
  const isModalOpen = useRef(false);
  const canvasRef = useRef();
  const modalRef = useRef();
  const overlayRef = useRef();
  const firstIconRef = useRef();
  const secondIconRef = useRef();
  const firstIconTwoRef = useRef();
  const secondIconTwoRef = useRef();
  const isMutedRef = useRef(false);
  const sunRef = useRef();
  const lightRef = useRef();
  const loadingScreenRef = useRef();
  const touchHappenedRef = useRef(false); 
  const backgroundMusicRef = useRef(null);
  const modalLinkRef = useRef(null);

  // Audio container
  backgroundMusicRef.current = new Howl({
    src: ["./sfx/music.ogg"],
    loop: true,
    volume: 0.3,
    preload: true,
  });

  const sounds = {
    projectsSFX: new Howl({ src: ["./sfx/projects.ogg"], volume: 0.5 }),
    pokemonSFX: new Howl({ src: ["./sfx/pokemon.ogg"], volume: 0.5 }),
    jumpSFX: new Howl({ src: ["./sfx/jumpsfx.ogg"], volume: 1.0 }),
  };  

  // Audio helper
  const playSound = (soundId) => {
    if (!isMutedRef.current) {
      if (soundId === "backgroundMusic" && backgroundMusicRef.current && !backgroundMusicRef.current.playing()) {
        backgroundMusicRef.current.play();
      } else if (sounds[soundId]) {
        sounds[soundId].play();
      }
    }
  };  
  
  const stopSound = (soundId) => {
    if (soundId === "backgroundMusic" && backgroundMusicRef.current) {
      backgroundMusicRef.current.pause(); // Not stop()
    } else if (sounds[soundId]) {
      sounds[soundId].stop();
    }
  };  

  useEffect(() => {
    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaec972);

    const canvas = canvasRef.current;
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Physics Constants
    const GRAVITY = 30;
    const CAPSULE_RADIUS = 0.35;
    const CAPSULE_HEIGHT = 1;
    const JUMP_HEIGHT = 11;
    const MOVE_SPEED = 7;

    let character = {
      instance: null,
      isMoving: false,
      spawnPosition: new THREE.Vector3(),
    };
    let targetRotation = Math.PI / 2;

    const colliderOctree = new Octree();
    const playerCollider = new Capsule(
      new THREE.Vector3(0, CAPSULE_RADIUS, 0),
      new THREE.Vector3(0, CAPSULE_HEIGHT, 0),
      CAPSULE_RADIUS
    );

    let playerVelocity = new THREE.Vector3();
    let playerOnFloor = false;

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let intersectObject = "";
    const intersectObjects = [];
    const intersectObjectsNames = [
      "Project_1",
      "Project_2",
      "Project_3",
      "Picnic",
      "Squirtle",
      "Chicken",
      "Pikachu",
      "Bulbasaur",
      "Charmander",
      "Snorlax",
      "Chest",
    ];

    // Loading Screen Manager
    const loadingScreen = document.getElementById("loadingScreen");
    const loadingText = loadingScreenRef.current?.querySelector(".loading-text");
    const enterButton = loadingScreenRef.current?.querySelector(".enter-button");
    const instructions = loadingScreenRef.current?.querySelector(".instructions");    

    const manager = new THREE.LoadingManager();
    manager.onLoad = function () {
      const t1 = gsap.timeline();
      t1.to(loadingText, { opacity: 0, duration: 0 });
      t1.to(enterButton, { opacity: 1, duration: 0 });
    };

    enterButton.addEventListener("click", () => {
      gsap.to(loadingScreen, { opacity: 0, duration: 0 });
      gsap.to(instructions, {
        opacity: 0,
        duration: 0,
        onComplete: () => {
          if (loadingScreenRef.current) {
            loadingScreenRef.current.remove();
          }          
        },
      });

      if (!isMutedRef.current) {
        playSound("projectsSFX");
        playSound("backgroundMusic");
      }
    });

    const camera = new THREE.OrthographicCamera(
      (-sizes.width / sizes.height) * 50,
      (sizes.width / sizes.height) * 50,
      50,
      -50,
      1,
      1000
    );
    camera.position.set(-13, 39, -67);
    camera.zoom = 2.2;
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.7;

    const controls = new OrbitControls(camera, canvas);
    controls.update();

    // Resize
    const onResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.left = (-sizes.width / sizes.height) * 50;
      camera.right = (sizes.width / sizes.height) * 50;
      camera.top = 50;
      camera.bottom = -50;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener("resize", onResize);

    // Lights
    const sun = new THREE.DirectionalLight(0xffffff);
    sun.position.set(280, 200, -80);
    sun.castShadow = true;
    scene.add(sun);

    const ambientLight = new THREE.AmbientLight(0x404040, 2.7);
    scene.add(ambientLight);

    sunRef.current = sun;
    lightRef.current = ambientLight;

    // GLTF Loader with Manager
    const loader = new GLTFLoader(manager);
    loader.load("assets/Portfolio.glb", (glb) => {
      glb.scene.traverse((child) => {
        if (intersectObjectsNames.includes(child.name)) {
          intersectObjects.push(child);
        }
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.name === "Character") {
          character.spawnPosition.copy(child.position);
          character.instance = child;
          playerCollider.start.copy(child.position).add(new THREE.Vector3(0, CAPSULE_RADIUS, 0));
          playerCollider.end.copy(child.position).add(new THREE.Vector3(0, CAPSULE_HEIGHT, 0));
        }
        if (child.name === "Ground_Collider") {
          colliderOctree.fromGraphNode(child);
          child.visible = false;
        }
      });
      scene.add(glb.scene);
    });

        // Extended Lighting and Environment
        sun.castShadow = true;
        sun.position.set(280, 200, -80);
        sun.target.position.set(100, 0, -10);
        sun.shadow.mapSize.width = 4096;
        sun.shadow.mapSize.height = 4096;
        sun.shadow.camera.left = -150;
        sun.shadow.camera.right = 300;
        sun.shadow.camera.top = 150;
        sun.shadow.camera.bottom = -100;
        sun.shadow.normalBias = 0.2;
        scene.add(sun.target);

        ambientLight.intensity = 2.7;
    
        const cameraOffset = new THREE.Vector3(-13, 39, -67);
    
        // Character Interaction
        let isCharacterReady = true;
    
        function jumpCharacter(meshID) {
          if (!isCharacterReady) return;
    
          const mesh = scene.getObjectByName(meshID);
          const jumpHeight = 2;
          const jumpDuration = 0.5;
          const isSnorlax = meshID === "Snorlax";
    
          const currentScale = {
            x: mesh.scale.x,
            y: mesh.scale.y,
            z: mesh.scale.z,
          };
    
          const t1 = gsap.timeline();
    
          t1.to(mesh.scale, {
            x: isSnorlax ? currentScale.x * 1.2 : 1.2,
            y: isSnorlax ? currentScale.y * 0.8 : 0.8,
            z: isSnorlax ? currentScale.z * 1.2 : 1.2,
            duration: jumpDuration * 0.2,
            ease: "power2.out",
          });
    
          t1.to(mesh.scale, {
            x: isSnorlax ? currentScale.x * 0.8 : 0.8,
            y: isSnorlax ? currentScale.y * 1.3 : 1.3,
            z: isSnorlax ? currentScale.z * 0.8 : 0.8,
            duration: jumpDuration * 0.3,
            ease: "power2.out",
          });
    
          t1.to(
            mesh.position,
            {
              y: mesh.position.y + jumpHeight,
              duration: jumpDuration * 0.5,
              ease: "power2.out",
            },
            "<"
          );
    
          t1.to(mesh.scale, {
            x: isSnorlax ? currentScale.x * 1.2 : 1,
            y: isSnorlax ? currentScale.y * 1.2 : 1,
            z: isSnorlax ? currentScale.z * 1.2 : 1,
            duration: jumpDuration * 0.3,
            ease: "power1.inOut",
          });
    
          t1.to(
            mesh.position,
            {
              y: mesh.position.y,
              duration: jumpDuration * 0.5,
              ease: "bounce.out",
              onComplete: () => {
                isCharacterReady = true;
              },
            },
            ">"
          );
    
          if (!isSnorlax) {
            t1.to(mesh.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: jumpDuration * 0.2,
              ease: "elastic.out(1, 0.3)",
            });
          }
        }
    
        function showModal(id) {
          const content = {
            Project_1: {
              title: "Blog Posts & Tips",
              content: "Explore our latest blogs and wild thoughts about pets, play, and everything in between! Expect cute chaos.",
              link: "/blogs-events",
            },
            Project_2: {
              title: "Gallery Zone",
            },
            Project_3: {
              title: "Events & Happenings",
              content: "Stay in the loop! Discover upcoming paw-some events, community drives, and adorable meetups. Axolotl dance battle? Maybe.",
              link: "/blogs-events",
            },
            Chest: {
              title: "🧑‍🤝‍🧑 About Us - Mint & Dino",
              content: "We’re a duo of digital mischief. Mint, the magical UI/UX & 3D wizard 🌿, brought the visual vibes. Dino, the backend sorceress 🪄, made sure the magic actually worked. Together, we created Kurukuru Petto Shoppu to spread joy, fluff, and pixels. 🐾✨",
            },
            Picnic: {
              title: "🍷 Picnic Vibes 🧺",
              content: "Nothing beats a sunny day, pets snoozing beside you, and a basket of snacks. Maximum chill, minimum effort. This is what dreams are made of.",
            },
          }[id];
        
          if (!modalRef.current || !overlayRef.current || !content) return;
        
          modalRef.current.querySelector(".modal-title").textContent = content.title;
          const descriptionEl = modalRef.current.querySelector(".modal-project-description");
          descriptionEl.innerHTML = "";
        
          const visitButton = modalRef.current.querySelector(".modal-project-visit-button");

          if (id === "Project_2") {
            const galleryGrid = document.createElement("div");
            galleryGrid.className = "gallery-grid";

            const galleryImages = [g1, g2, g3, g4, g5, g6, g7, g8, g9];
            galleryImages.forEach((src) => {
              const img = document.createElement("img");
              img.src = src;
              img.alt = "Gallery";
              img.className = "gallery-item";
              galleryGrid.appendChild(img);
            });

            modalRef.current.querySelector(".modal-project-description").appendChild(galleryGrid);
            visitButton.style.display = "none"; 
          } else {
            modalRef.current.querySelector(".modal-project-description").textContent = content.content || "";
            if (content.link) {
              modalLinkRef.current = content.link;
              visitButton.style.display = "inline-block"; 
            } else {
              modalLinkRef.current = null;
              visitButton.style.display = "none";
            }
          }
        
          modalRef.current.classList.remove("hidden");
          overlayRef.current.classList.remove("hidden");
          isModalOpen.current = true;
        }                    

        function hideModal() {
          if (!modalRef.current || !overlayRef.current) return;
        
          modalRef.current.classList.add("hidden");
          overlayRef.current.classList.add("hidden");
          isModalOpen.current = false;
        
          if (!isMutedRef.current) {
            playSound("projectsSFX");
          }
        }
        
        function onClick() {
          if (touchHappenedRef.current) return;
          handleInteraction();
        }
    
        function handleInteraction() {
          if (isModalOpen.current) return;
    
          raycaster.setFromCamera(pointer, camera);
          const intersects = raycaster.intersectObjects(intersectObjects);
    
          if (intersects.length > 0) {
            intersectObject = intersects[0].object.parent.name;
          } else {
            intersectObject = "";
          }
    
          if (intersectObject !== "") {
            if ([
              "Bulbasaur",
              "Chicken",
              "Pikachu",
              "Charmander",
              "Squirtle",
              "Snorlax",
            ].includes(intersectObject)) {
              if (isCharacterReady) {
                if (!isMutedRef.current) playSound("pokemonSFX");
                jumpCharacter(intersectObject);
                isCharacterReady = false;
              }
            } else {
              showModal(intersectObject);
              if (!isMutedRef.current) playSound("projectsSFX");
            }
          }
        }
    
        function onMouseMove(event) {
          pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
          pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
          touchHappenedRef.current = (false);
        }
    
        function onTouchEnd(event) {
          pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
          pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
          touchHappenedRef.current = true;
          handleInteraction();
        }
    
        window.addEventListener("click", onClick, { passive: false });
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchend", onTouchEnd, { passive: false });
    
            // Movement and Gameplay functions
          function respawnCharacter() {
            character.instance.position.copy(character.spawnPosition);

            playerCollider.start
              .copy(character.spawnPosition)
              .add(new THREE.Vector3(0, CAPSULE_RADIUS, 0));
            playerCollider.end
              .copy(character.spawnPosition)
              .add(new THREE.Vector3(0, CAPSULE_HEIGHT, 0));

            playerVelocity.set(0, 0, 0);
            character.isMoving = false;
          }

          function playerCollisions() {
            const result = colliderOctree.capsuleIntersect(playerCollider);
            playerOnFloor = false;

            if (result) {
              playerOnFloor = result.normal.y > 0;
              playerCollider.translate(result.normal.multiplyScalar(result.depth));

              if (playerOnFloor) {
                character.isMoving = false;
                playerVelocity.x = 0;
                playerVelocity.z = 0;
              }
            }
          }

          function updatePlayer() {
            if (!character.instance) return;

            if (character.instance.position.y < -20) {
              respawnCharacter();
              return;
            }

            if (!playerOnFloor) {
              playerVelocity.y -= GRAVITY * 0.035;
            }

            playerCollider.translate(playerVelocity.clone().multiplyScalar(0.035));

            playerCollisions();

            character.instance.position.copy(playerCollider.start);
            character.instance.position.y -= CAPSULE_RADIUS;

            let rotationDiff =
              ((((targetRotation - character.instance.rotation.y) % (2 * Math.PI)) +
                3 * Math.PI) %
                (2 * Math.PI)) -
              Math.PI;
            let finalRotation = character.instance.rotation.y + rotationDiff;

            character.instance.rotation.y = THREE.MathUtils.lerp(
              character.instance.rotation.y,
              finalRotation,
              0.4
            );
          }

          const pressedButtons = {
            up: false,
            down: false,
            left: false,
            right: false,
          };

          function onKeyDown(event) {
            switch (event.code.toLowerCase()) {
              case "keyr":
                respawnCharacter();
                return;
              case "keyw":
              case "arrowup":
                pressedButtons.up = true;
                break;
              case "keys":
              case "arrowdown":
                pressedButtons.down = true;
                break;
              case "keya":
              case "arrowleft":
                pressedButtons.left = true;
                break;
              case "keyd":
              case "arrowright":
                pressedButtons.right = true;
                break;
              default:
                break;
            }
          }          

          function onKeyUp(event) {
            switch (event.code.toLowerCase()) {
              case "keyw":
              case "arrowup":
                pressedButtons.up = false;
                break;
              case "keys":
              case "arrowdown":
                pressedButtons.down = false;
                break;
              case "keya":
              case "arrowleft":
                pressedButtons.left = false;
                break;
              case "keyd":
              case "arrowright":
                pressedButtons.right = false;
                break;
              default:
                break;
            }
          }          

          window.addEventListener("keydown", onKeyDown);
          window.addEventListener("keyup", onKeyUp);

          const toggleTheme = () => {
            if (!isMutedRef.current) {
              playSound("projectsSFX");
            }
          
            const isDark = document.body.classList.contains("dark-theme");
          
            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");
          
            if (firstIconRef.current && secondIconRef.current) {
              firstIconRef.current.style.display = isDark ? "block" : "none";
              secondIconRef.current.style.display = isDark ? "none" : "block";
            }
          
            if (lightRef.current && sunRef.current) {
              gsap.to(lightRef.current.color, {
                r: isDark ? 1.0 : 0.25,
                g: isDark ? 1.0 : 0.31,
                b: isDark ? 1.0 : 0.78,
                duration: 1,
                ease: "power2.inOut",
              });
          
              gsap.to(lightRef.current, {
                intensity: isDark ? 0.8 : 0.9,
                duration: 1,
                ease: "power2.inOut",
              });
          
              gsap.to(sunRef.current, {
                intensity: isDark ? 1 : 0.8,
                duration: 1,
                ease: "power2.inOut",
              });
          
              gsap.to(sunRef.current.color, {
                r: isDark ? 1.0 : 0.25,
                g: isDark ? 1.0 : 0.41,
                b: isDark ? 1.0 : 0.88,
                duration: 1,
                ease: "power2.inOut",
              });
            }
          };
          
          const toggleAudio = () => {
            const newMute = !isMutedRef.current;
            isMutedRef.current = newMute;
          
            if (firstIconTwoRef.current && secondIconTwoRef.current) {
              firstIconTwoRef.current.style.display = newMute ? "none" : "block";
              secondIconTwoRef.current.style.display = newMute ? "block" : "none";
            }
          
            if (newMute) {
              stopSound("backgroundMusic");
            } else {
              playSound("backgroundMusic");
            }
          
            playSound("projectsSFX"); 
          };                       
          
          const mobileControls = {
            up: document.querySelector(".mobile-control.up-arrow"),
            left: document.querySelector(".mobile-control.left-arrow"),
            right: document.querySelector(".mobile-control.right-arrow"),
            down: document.querySelector(".mobile-control.down-arrow"),
          };
          
          function handleJumpAnimation() {
            if (!character.instance || !character.isMoving) return;
          
            const jumpDuration = 0.5;
          
            const t1 = gsap.timeline();
          
            t1.to(character.instance.scale, {
              x: 1.08,
              y: 0.9,
              z: 1.08,
              duration: jumpDuration * 0.2,
              ease: "power2.out",
            });
          
            t1.to(character.instance.scale, {
              x: 0.92,
              y: 1.1,
              z: 0.92,
              duration: jumpDuration * 0.3,
              ease: "power2.out",
            });
          
            t1.to(character.instance.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: jumpDuration * 0.3,
              ease: "power1.inOut",
            });
          
            t1.to(character.instance.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: jumpDuration * 0.2,
            });
          }
          
          function handleContinuousMovement() {
            if (!character.instance) return;
          
            if (
              Object.values(pressedButtons).some((pressed) => pressed) &&
              !character.isMoving
            ) {
              if (!isMutedRef.current) {
                playSound("jumpSFX");
              }
              if (pressedButtons.up) {
                playerVelocity.z += MOVE_SPEED;
                targetRotation = 0;
              }
              if (pressedButtons.down) {
                playerVelocity.z -= MOVE_SPEED;
                targetRotation = Math.PI;
              }
              if (pressedButtons.left) {
                playerVelocity.x += MOVE_SPEED;
                targetRotation = Math.PI / 2;
              }
              if (pressedButtons.right) {
                playerVelocity.x -= MOVE_SPEED;
                targetRotation = -Math.PI / 2;
              }
          
              playerVelocity.y = JUMP_HEIGHT;
              character.isMoving = true;
              handleJumpAnimation();
            }
          }
          
          Object.entries(mobileControls).forEach(([direction, element]) => {
            element.addEventListener("touchstart", (e) => {
              e.preventDefault();
              pressedButtons[direction] = true;
            });
          
            element.addEventListener("touchend", (e) => {
              e.preventDefault();
              pressedButtons[direction] = false;
            });
          
            element.addEventListener("mousedown", (e) => {
              e.preventDefault();
              pressedButtons[direction] = true;
            });
          
            element.addEventListener("mouseup", (e) => {
              e.preventDefault();
              pressedButtons[direction] = false;
            });
          
            element.addEventListener("mouseleave", (e) => {
              pressedButtons[direction] = false;
            });
          
            element.addEventListener("touchcancel", (e) => {
              pressedButtons[direction] = false;
            });
          });
          
          window.addEventListener("blur", () => {
            Object.keys(pressedButtons).forEach((key) => {
              pressedButtons[key] = false;
            });
          });

          // ✅ Add event listeners inside useEffect (at the end)
          const modalExitBtn = modalRef.current?.querySelector(".modal-exit-button");
          const overlay = overlayRef.current;
          const themeBtn = document.querySelector(".theme-mode-toggle-button");
          const audioBtn = document.querySelector(".audio-toggle-button");

          modalExitBtn?.addEventListener("click", hideModal);
          overlay?.addEventListener("click", hideModal);
          themeBtn?.addEventListener("click", toggleTheme);
          audioBtn?.addEventListener("click", toggleAudio);

          window.addEventListener("resize", onResize);
          window.addEventListener("click", onClick, { passive: false });
          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("touchend", onTouchEnd, { passive: false });
          window.addEventListener("keydown", onKeyDown);
          window.addEventListener("keyup", onKeyUp);

          // ✅ Animate loop
          function animate() {
            updatePlayer();
            handleContinuousMovement();

            if (character.instance) {
              const targetCameraPosition = new THREE.Vector3(
                character.instance.position.x + cameraOffset.x - 20,
                cameraOffset.y,
                character.instance.position.z + cameraOffset.z + 30
              );
              camera.position.copy(targetCameraPosition);
              camera.lookAt(
                character.instance.position.x + 10,
                camera.position.y - 39,
                character.instance.position.z + 10
              );
            }

            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObjects(intersectObjects);

            document.body.style.cursor = intersects.length > 0 ? "pointer" : "default";
            if (intersects.length > 0) {
              intersectObject = intersects[0].object.parent.name;
            }

            renderer.render(scene, camera);
          }

          renderer.setAnimationLoop(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
    };
  },);

  const toggleTheme = () => {
    if (!isMutedRef.current) {
      playSound("projectsSFX");
    }
  
    const isDark = document.body.classList.contains("dark-theme");
  
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
  
    if (firstIconRef.current && secondIconRef.current) {
      firstIconRef.current.style.display = isDark ? "block" : "none";
      secondIconRef.current.style.display = isDark ? "none" : "block";
    }
  
    if (lightRef.current && sunRef.current) {
      gsap.to(lightRef.current.color, {
        r: isDark ? 1.0 : 0.25,
        g: isDark ? 1.0 : 0.31,
        b: isDark ? 1.0 : 0.78,
        duration: 1,
        ease: "power2.inOut",
      });
  
      gsap.to(lightRef.current, {
        intensity: isDark ? 0.8 : 0.9,
        duration: 1,
        ease: "power2.inOut",
      });
  
      gsap.to(sunRef.current, {
        intensity: isDark ? 1 : 0.8,
        duration: 1,
        ease: "power2.inOut",
      });
  
      gsap.to(sunRef.current.color, {
        r: isDark ? 1.0 : 0.25,
        g: isDark ? 1.0 : 0.41,
        b: isDark ? 1.0 : 0.88,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  };
  
  const toggleAudio = () => {
    const isNowMuted = !isMutedRef.current;
    isMutedRef.current = isNowMuted;
  
    if (firstIconTwoRef.current && secondIconTwoRef.current) {
      firstIconTwoRef.current.style.display = isNowMuted ? "none" : "block";
      secondIconTwoRef.current.style.display = isNowMuted ? "block" : "none";
    }
  
    if (isNowMuted) {
      stopSound("backgroundMusic");
    } else {
      playSound("backgroundMusic");
      playSound("projectsSFX");
    }
  };  

  return (
    <div className="home">
      <canvas id="experience-canvas" ref={canvasRef}></canvas>

      <div className="loading-screen" id="loadingScreen" ref={loadingScreenRef}>
        <div className="loading-text">Loading...</div>
        <button className="enter-button">Explore KuruKuru Petto Shoppu</button>
        <div className="instructions">~ use arrow keys to move ~</div>
      </div>

      <div className="floating-buttons">
      <div className="theme-mode-toggle-button" onClick={toggleTheme}>
        <img
          ref={firstIconRef}
          src="/Other Stuff/newmoon.svg"
          alt="Dark Mode"
          className="icon"
        />
        <img
          ref={secondIconRef}
          src="/Other Stuff/newsun.svg"
          alt="Light Mode"
          className="icon"
          style={{ display: "none" }}
        />
      </div>

      <div className="audio-toggle-button" onClick={toggleAudio}>
        <img
          ref={firstIconTwoRef}
          src="/Other Stuff/soundon.svg"
          alt="Sound On"
          className="icon"
        />
        <img
          ref={secondIconTwoRef}
          src="/Other Stuff/soundoff.svg"
          alt="Sound Off"
          className="icon"
          style={{ display: "none" }}
        />
      </div>
      </div>

      <div className="modal-bg-overlay hidden" ref={overlayRef}></div>
      <div className="modal hidden" ref={modalRef}>
        <div className="modal-wrapper">
          <div className="modal-header">
            <h1 className="modal-title">Project One</h1>
            <button className="modal-exit-button">exit</button>
          </div>
          <div className="modal-content">
            <p className="modal-project-description">
              Sample description of the modal project.
            </p>
            <button
              className="modal-project-visit-button"
              onClick={() => {
                if (modalLinkRef.current) {
                  window.location.href = modalLinkRef.current;
                }
              }}
            >
              View Project
            </button>
          </div>
        </div>
      </div>
      {/* Mobile controls */}
      <div className="mobile-control up-arrow">
        <svg width="45" height="34" viewBox="0 0 45 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* svg rectangles here */}
        </svg>
      </div>

      <div className="mobile-control left-arrow">
        <svg width="45" height="34" viewBox="0 0 45 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* svg rectangles here */}
        </svg>
      </div>

      <div className="mobile-control right-arrow">
        <svg width="45" height="34" viewBox="0 0 45 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* svg rectangles here */}
        </svg>
      </div>

      <div className="mobile-control down-arrow">
        <svg width="45" height="34" viewBox="0 0 45 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* svg rectangles here */}
        </svg>
      </div>
    </div>
  );
};

export default Home;
