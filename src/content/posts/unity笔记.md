---
title: "unity笔记"
published: 2024-10-09
draft: false
description: "unity笔记"
tags: ["unity"]
category: "代码"
---

#### 创建节点

GameObject node = new GameObject();

#### 实例化组件

MeshRenderer comp = new MeshRenderer();

#### 实例化组件脚本

SimpleLogic script1 = new simpleLogic();

#### 生命周期：

Awake() -> Start() -> OnEnable() -> Update() -> OnDisable() -> OnDestroy()

#### 脚本运行顺序：

先执行所有组件的 Awake()方法。 调用顺序不确定，就是跟节点顺序无关。 如果要提高脚本执行顺序，可以设置脚本的 ExecuteIn Order 属性。最后一行点击+号。优先级越小越高。

#### 脚本参数 public

[ Tooltip("说明") ]
public float speed = 2.0f;

public GameObject Target;

public AudioClip[] clips;

设值顺序 初始化参数 -> 编辑器设置 -> Start -> Update

#### 数据类型

值类型：int, float, bool, string, enum, Vector2, Vector3, Vector4, Color, Quaternion, Rect, Bounds, Ray, Ray2D, Matrix4x4, AnimationCurve, Gradient
引用类型：GameObject, Transform, Component, ScriptableObject

#### 数组

int[] numbers = new int[5];
numbers[0] = 1;

#### 运行的时候是无法保存

可以先暂停游戏， 使用 copy Component 来保存数据
结束运行后用 paste Component 来恢复数据

#### 获取组件

AudioSource audio = this.GetComponent<AudioSource>();
audio.Play();

node.GetComponent<AudioSource>();

#### 鼠标输入事件

Input.GetMouseButtonDown(0); // 鼠标左键按下
Input.GetMouseButtonUp(0); // 鼠标左键松开
Input.GetMouseButton(0); // 鼠标左键按住

#### 消息调用

public GameObject target;
target.SendMessage("methodName", arg); // 调用节点上的 methodName 方法
BroadcastMessage("methodName"); // 调用场景中所有节点上的 methodName 方法

#### 获取父子级 Transform

Transform parent = transform.parent;
Transform child = transform.GetChild(0);

transform.find("childName"); // 查找子节点

foreach (Transform child in transform) {}

this.transform.SetParent(parent); // 设置父节点
this.transform.SetParent(null); // 一级节点

gameObject.activeSelf; // 是否显示
gameObject.setActive(true); // 显示节点

#### Random.Range()

Random.Range(0, 10); // 0-9 随机整数

#### 定时调用

Invoke("methodName", 2.0f); // 2 秒后调用 methodName 方法
CancelInvoke("methodName"); // 取消 methodName 方法的调用
CancelInvok(); // 取消所有调用
InvokeRepeating("methodName", delay, interval); // 每隔 0.5 秒调用 methodName 方法
isInvoking = true; // 是否正在调用

Invoke(nameof(CallMethodWithParameter), 2.0f);

#### Vector3
Vector3 v1 = new Vector3(1, 2, 3);
Vector3 v2 = new Vector3(4, 5, 6);
Vector3 v3 = v1 + v2; // 加法
Vector3 v4 = v1 - v2; // 减法
Vector3 v5 = v1 * 2.0f; // 乘法
Vector3 v6 = v1 / 2.0f; // 除法

v4.Normalize(); // 归一化

v4.magnitude; // 长度
float distance = Vector3.Distance(v1, v2); // 距离


#### 预制体
将节点拖到assets
右键可以导出预制体
右键可以解除预制体

覆盖编辑： Overrides (反向应用)

#### 动态创建实例
public GameObject bulletPrefab;
GameObject bullet = Instantiate(bulletPrefab, null);
bullet.transform.position = Vector3.zero;
bullet.transform.localEulerAngles = Vector3.zero;

Destroy(bullet, 2.0f); // 2 秒后销毁实例
Destroy(this.gameObject, 2.0f); // 2 秒后销毁实例

#### 物理系统
添加刚体组件 Rigidbody
添加碰撞体组件 Collider
assets添加物理材质 physic material 设置弹性系数 bounciness 摩擦力 friction

void onTriggerEnter(Collider other) {} // 碰撞体进入
void onTriggerStay(Collider other) {} // 碰撞体持续
void onTriggerExit(Collider other) {} // 碰撞体离开

#### 天空盒
Window -> Rendering -> Lighting -> Environment -> Skybox Material
