# 改用 GitHub 托管

2026-11-06，用户要求网页部署在GitHub而非ChatGPT。自此停止Sites新增发布与失败重试；旧部署记录仅作为历史，不是继续发布指令。

用户先批准网页公开、源码私有；GitHub API随后返回HTTP422，当前套餐不支持私有仓库Pages。用户进一步明确“那就不用考虑私有代码库了，公开吧”，因此最终方案为公开主仓库并直接部署Pages，无需额外发布仓库、升级套餐或创建跨仓库凭据。

## 发布流程

`.github/workflows/pages.yml`在main更新或手动触发时运行：先执行测试/构建并检查dist一致性，仅上传dist为Pages产物，再部署到github-pages环境。查询页使用相对CSS/JS/JSON路径，适配项目子路径。代码、研究资料与网页均公开；完整论文PDF及临时下载不在仓库中。

首次迁移只改托管方式，当时科学目录为0.1.8。实际网址、构建源提交和部署结果在研究日志登记，不能把启用Pages或合并工作流当成发布成功。

依据：[GitHub Pages可用计划](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)、[自定义发布工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 已完成发布

[公开查询页](https://selinlee.github.io/lens-evidence-atlas/)已上线，首次发布的科学目录为v0.1.8。首次Pages运行[42197556450](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42197556450)的build/deploy均成功，源b9e86424bd4158949d1ffc8c04532e3c616c9afd。本机独立Chrome无头访问实际HTTPS站点，核对搜索、样本弹窗、出处页和已有作者比较；线上catalog.json为33应用/21指标/67记录/87来源。仅桌面定向验收。

后续发布以GitHub Actions最新成功运行及实际站点为准。Sites旧站未删除，已停止更新；不再把旧站地址作为用户入口。

2026-11-06再次通过不携带登录凭据的GitHub API请求确认主仓库`private: false`、`visibility: public`，并将仓库首页链接设为上述GitHub Pages地址。README与Dot维护说明均以公开GitHub托管为准。
