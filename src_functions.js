//[FUNCTION] Find the point in front of the camera
function getPointInFrontOfCamera(distance) {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    const point = new THREE.Vector3();
    point.copy(camera.position).add(direction.multiplyScalar(distance));
    return point;
}

//[FUNCTION] Get distance between two points
function getDistance(point1, point2) {
    return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y) + (point1.z - point2.z) * (point1.z - point2.z));
}

//[FUNCTION] Select an object at mouse down
function selectAtMouseDown() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const closestObject = intersects[0].object;
        if (closestObject.userData.selectable) {
            console.log("find object");
            closestObject.userData.selected = !closestObject.userData.selected;
            if (closestObject.userData.selected) {
                closestObject.material.color.set('gold');
                selectedObject = closestObject;
            } else {
                closestObject.material.color.set('crimson');
                selectedObject = null;
            }
        } else { selectedObject = null; }
    }
}

//[FUNCTION] Highlight the selected brush button
function highlightButton(buttonID) {
    const buttons = document.querySelectorAll('#toolbar button');
    buttons.forEach(button => button.classList.remove('active'));

    const selectedButton = document.getElementById(buttonID);
    selectedButton.classList.add('active');
}

//[FUNCTION] Move the selected object
function moveSelectedObject() {
    if (selectedObject) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            console.log("move object");
            const point = intersects[0].point;
            selectedObject.position.copy(point);
        }
    }
}

//[FUNCTION] Rotate the selected object
function rotateSelectedObject() {
    if (selectedObject) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            const point = intersects[0].point;
            const angle = Math.atan2(point.x - selectedObject.position.x, point.z - selectedObject.position.z);
            selectedObject.rotation.y = angle;
        }
    }
}

//[FUNCTION] Scale the selected object
function scaleSelectedObject() {
    if (selectedObject) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            const point = intersects[0].point;
            const distance = getDistance(selectedObject.position, point);
            selectedObject.scale.set(distance, distance, distance);
        }
    }
}

//[FUNCTION] Delete the selected object
function deleteSelectedObject() {
    if (selectedObject) {
        scene.remove(selectedObject);
        selectedObject = null;
    }
}

//[FUNCTION] Create a new object
function createObject() {
    const object = new THREE.Mesh(geometry, material);
    object.position.copy(getPointInFrontOfCamera(10));
    object.userData.selectable = true;
    object.userData.selected = false;
    scene.add(object);
}

//[FUNCTION] Add event listeners
function addEventListeners() {
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mouseup', onMouseUp, false);
    window.addEventListener('keydown', onKeyDown, false);
}

//[FUNCTION] Remove event listeners
function removeEventListeners() {
    window.removeEventListener('resize', onWindowResize, false);
    window.removeEventListener('mousedown', onMouseDown, false);
    window.removeEventListener('mousemove', onMouseMove, false);
    window.removeEventListener('mouseup', onMouseUp, false);
    window.removeEventListener('keydown', onKeyDown, false);
}