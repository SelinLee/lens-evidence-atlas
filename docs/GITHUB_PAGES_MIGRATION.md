# 改用 GitHub 托管

2026-11-06，用户要求网页部署在GitHub而非ChatGPT。自此停止Sites新增发布与失败重试；旧部署记录仅作为历史，不是继续发布指令。

用户先批准网页公开、源码私有；GitHub API随后返回HTTP422，当前套餐不支持私有仓库Pages。用户进一步明确“那就不用考虑私有代码库了，公开吧”，因此最终方案为公开主仓库并直接部署Pages，无需额外发布仓库、升级套餐或创建跨仓库凭据。

## 发布流程

`.github/workflows/pages.yml`在main更新或手动触发时运行：先执行测试/构建并检查dist一致性，仅上传dist为Pages产物，再部署到github-pages环境。查询页使用相对CSS/JS/JSON路径，适配项目子路径。代码、研究资料与网页均公开；完整论文PDF及临时下载不在仓库中。

本批只改托管方式，科学目录保持0.1.8。实际网址、构建源提交和部署结果在研究日志登记，不能把启用Pages或合并工作流当成发布成功。

依据：[GitHub Pages可用计划](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)、[自定义发布工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
