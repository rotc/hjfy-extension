# arXiv 翻译助手 - hjfy.top

一个 Chrome 扩展，一键翻译 arXiv 论文，基于 [hjfy.top](https://hjfy.top) 翻译服务。

## 功能特性

- **右键菜单**：在 arXiv 页面或 arXiv 链接上右键，一键跳转翻译
- **工具栏图标**：在任意 arXiv 页面（包括 PDF）点击扩展图标即可翻译
- **智能 URL 解析**：支持 `/abs/`、`/pdf/`、`/html/` 格式的 arXiv URL，兼容新旧论文 ID 格式

## 安装方法

1. 下载或克隆本仓库
2. 在 Chrome 中打开 `chrome://extensions/`
3. 开启右上角的 **开发者模式**
4. 点击 **加载已解压的扩展程序**，选择项目文件夹

## 使用方式

### 右键菜单
在 arXiv 链接上右键，可以看到翻译选项：

![右键菜单](assets/context-menu.png)

- 在 arXiv 摘要页/HTML 页面上右键，选择 **"翻译此论文 (hjfy.top)"**
- 在任意页面右键点击 arXiv 链接，选择 **"翻译此 arXiv 论文 (hjfy.top)"**

### 工具栏图标
在 arXiv 页面（包括 PDF）点击工具栏中的扩展图标：

![工具栏图标](assets/toolbar-icon.png)

- 在任意 arXiv 页面点击工具栏中的扩展图标
- 适用于 PDF 页面（PDF 页面无法使用右键菜单）

## 项目结构

```
arxiv-translator/
├── manifest.json              # 扩展配置文件 (Manifest V3)
├── assets/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── background/
    └── service-worker.js      # 核心逻辑：右键菜单和图标点击处理
```

## 权限说明

| 权限 | 用途 |
|---|---|
| `contextMenus` | 在右键菜单中添加翻译选项 |
| `activeTab` | 获取当前标签页的 URL |
| `tabs` | 创建新标签页打开翻译页面 |

## 许可证

MIT
