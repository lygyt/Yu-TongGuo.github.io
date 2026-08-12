# 中英文双语学术主页

适用于 GitHub Pages 的双语学术主页，含论文、项目、动态、教学和教育经历，以及基于 GitHub API 的网页管理端。

## 发布

1. 在 GitHub 新建公开仓库。个人主页建议命名为 `你的用户名.github.io`。
2. 将本项目全部文件上传到仓库的 `main` 分支。
3. 打开仓库 **Settings → Pages**，将 **Source** 设为 **GitHub Actions**。
4. 等待 Actions 完成，主页即发布。

## 管理内容

访问 `https://你的域名/admin/`。第一次使用时，填写仓库信息和 GitHub fine-grained personal access token；令牌只需该仓库的 **Contents: Read and write** 权限。管理页修改 `content/site.json` 并提交，GitHub Pages 会自动更新。

头像可放在 `public/portrait.jpg`，再将 `content/site.json` 中的 `profile.portrait` 改为 `portrait.jpg`。
