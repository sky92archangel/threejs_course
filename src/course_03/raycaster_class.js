
class _raycaster_ {
    constructor(_container, _scene, _camera) {
      this.container = _container;
      this.scene = _scene;
      this.camera = _camera; 
    }
  
    raycaster_init(e) {
      // 拿到鼠标在屏幕的坐标
      let mouseX = e.clientX;//鼠标单击位置横坐标
      let mouseY = e.clientY;//鼠标单击位置纵坐标 
      const rect = this.container.getBoundingClientRect();//拿到div相对屏幕坐标的偏移量
      //屏幕坐标转标准设备坐标
      const x = ((mouseX - rect.left) / this.container.clientWidth) * 2 - 1;
      const y = - ((mouseY - rect.top) / this.container.clientHeight) * 2 + 1;
      let standardVector = new THREE.Vector3(x, y);//标准设备坐标
  
      //标准设备坐标转世界坐标
      let worldVector = standardVector.unproject(this.camera);
      //射线投射方向单位向量(worldVector坐标减相机位置坐标)
      let ray = worldVector.sub(this.camera.position).normalize();
      //创建射线投射器对象 
      let raycaster = new THREE.Raycaster(this.camera.position, ray);
      raycaster.camera = this.camera//设置一下相机
  
      //返回射线选中的对象 //第一个参数是检测的目标对象 第二个参数是目标对象的子元素
      let intersects = raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0) {
        console.log("捕获到对象");
      } else {
        console.log("没捕获到对象");
      }
    }
  
  }
  

  export {_raycaster_}