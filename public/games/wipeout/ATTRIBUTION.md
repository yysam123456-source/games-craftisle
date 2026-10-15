# Attribution — wipEout

## 关于本站运行的版本

本站集成的是 **wipEout Rewrite 的 minimal WebAssembly 构建**
（无片头动画、无背景音乐，约 12MB），可直接在浏览器中游玩。

- 官方在线试玩（上游）：https://phoboslab.org/wipegame/
- 上游源码仓库：https://github.com/phoboslab/wipeout-rewrite
- 作者：Dominic Szablewski（phoboslab）
- 项目介绍博客：https://phoboslab.org/log/2023/08/rewriting-wipeout

## 文件来源

以下文件直接取自上游官方 Web 版 https://phoboslab.org/wipegame/ 的
minimal 版本构建产物（未做任何修改）：

| 文件 | 大小 | 说明 |
| --- | --- | --- |
| `index.html` | — | 入口页，基于上游页面模板改写 |
| `wipeout-minimal.js` | ~261 KB | Emscripten/Sokol 生成的 JS 胶水层 |
| `wipeout-minimal.wasm` | ~271 KB | WebAssembly 模块 |
| `wipeout-minimal.data` | ~11.7 MB | 游戏资源打包文件（虚拟文件系统镜像） |

`index.html` 相对上游原版的改动仅包括：移除 full/minimal 版本选择界面
（本站只提供 minimal 版）、移除外站链接、默认直接加载 minimal 版脚本。
游戏本体文件（js / wasm / data）与上游完全一致。

## 许可与版权说明（如实说明）

- **代码**：上游项目未声明任何许可证（"There is none."）。作者自述该
  重写版可能参考了 2022 年流出的 PC（ATI-Rage）版 wipEout 源码，版权状态
  属于灰色地带。上游明确要求：**不得用于商业发布**（包括在带广告的
  网站上托管）。
- **游戏资源**：PSX 版《wipEout》（1995）的纹理、3D 模型、音乐、音效等
  资源版权归 **Sony Computer Entertainment** 所有。上游仓库本身不包含
  这些资源（原作者从 archive.org 等处获取后打包进 Web 构建）。将这些
  资源随 Web 构建分发同样属于版权灰色地带。
- 本游戏为 1995 年的老作品，目前已无官方购买渠道；上游作者亦公开表示
  欢迎 Sony 联系合作官方重制。**用户已明确豁免此授权问题**，但仍在此
  如实披露上述情况，供站点运营方知悉。

## 操作方式

- 方向键 ←↑↓→：转向 / 俯仰（菜单中也可用 WASD 或 HJKL 导航）
- X：油门（加速）
- Z：发射武器
- C：左气刹 / V：右气刹
- A：切换视角
- Enter：开始 / 暂停；Esc：退出菜单；Backspace：返回
- 触屏设备：屏幕虚拟按键（方向键、X、Y、br-l、br-r、view、pause）

本构建为 Sokol 后端，**不支持游戏手柄**。
