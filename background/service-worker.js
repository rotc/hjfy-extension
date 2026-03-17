// ============================================================
// arXiv 翻译助手 - Service Worker
// 1. 右键菜单：在 arXiv 页面或链接上一键跳转 hjfy.top 翻译
// 2. 点击图标：在 arXiv 页面点击扩展图标直接翻译（解决 PDF 页面无法右键的问题）
// ============================================================

const HJFY_BASE = 'https://hjfy.top';
const MENU_ID_PAGE = 'translate-arxiv-page';
const MENU_ID_LINK = 'translate-arxiv-link';

// arXiv URL 匹配正则
const ARXIV_URL_RE = /^https?:\/\/(?:www\.)?arxiv\.org\/(abs|pdf|html)\//;

// ============================================================
// 右键菜单注册（安装时执行一次）
// ============================================================
chrome.runtime.onInstalled.addListener(() => {
  // 菜单项 1：用户在 arXiv 页面上右键
  chrome.contextMenus.create({
    id: MENU_ID_PAGE,
    title: '翻译此论文 (hjfy.top)',
    contexts: ['page'],
    documentUrlPatterns: [
      'https://arxiv.org/abs/*',
      'https://arxiv.org/pdf/*',
      'https://arxiv.org/html/*',
      'https://www.arxiv.org/abs/*',
      'https://www.arxiv.org/pdf/*',
      'https://www.arxiv.org/html/*'
    ]
  });

  // 菜单项 2：用户在任意页面右键点击 arXiv 链接
  chrome.contextMenus.create({
    id: MENU_ID_LINK,
    title: '翻译此 arXiv 论文 (hjfy.top)',
    contexts: ['link'],
    targetUrlPatterns: [
      'https://arxiv.org/abs/*',
      'https://arxiv.org/pdf/*',
      'https://arxiv.org/html/*',
      'https://www.arxiv.org/abs/*',
      'https://www.arxiv.org/pdf/*',
      'https://www.arxiv.org/html/*'
    ]
  });
});

// ============================================================
// 右键菜单点击处理
// ============================================================
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let arxivUrl = null;

  if (info.menuItemId === MENU_ID_PAGE) {
    arxivUrl = info.pageUrl;
  } else if (info.menuItemId === MENU_ID_LINK) {
    arxivUrl = info.linkUrl;
  }

  if (arxivUrl) {
    openTranslation(arxivUrl);
  }
});

// ============================================================
// 点击扩展图标处理（解决 PDF 页面无法注入右键菜单的问题）
// ============================================================
chrome.action.onClicked.addListener((tab) => {
  if (tab.url && ARXIV_URL_RE.test(tab.url)) {
    openTranslation(tab.url);
  } else {
    // 非 arXiv 页面，打开 hjfy.top 首页让用户手动输入
    chrome.tabs.create({ url: HJFY_BASE });
  }
});

// ============================================================
// 核心函数：打开翻译页面
// ============================================================
function openTranslation(arxivUrl) {
  const arxivId = extractArxivId(arxivUrl);

  if (arxivId) {
    const translateUrl = `${HJFY_BASE}/arxiv/${arxivId}`;
    chrome.tabs.create({ url: translateUrl });
  } else {
    // 无法提取 ID，回退到首页
    chrome.tabs.create({ url: HJFY_BASE });
  }
}

// ============================================================
// 辅助函数：从 arXiv URL 中提取论文 ID
// 支持 /abs/、/pdf/、/html/ 路径，兼容新旧格式 ID 和版本号
// ============================================================
function extractArxivId(url) {
  const match = url.match(
    /arxiv\.org\/(?:abs|pdf|html)\/(\d{4}\.\d{4,5}(?:v\d+)?)(?:\.pdf)?/
  );
  return match ? match[1] : null;
}
